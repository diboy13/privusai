var glob_pubkeys={},orders={},myservers={},cards_html=``,customer_vat_rate=0,customer_vat_rates={},cbi={country:"",vat_id:""}, allow_fiat=false
var use_paypal = false, disable_saving_cards = false, use_paypal_for_payouts=false,allowed_features=[]
var ui_version=1, v2_ui_show_fiat = false, global_transactions_var = {}, glob_mfa_active=false
let user_email = ''
let show_expired_state = false
let PoH_info = {}
var ixx=setInterval(async function(){
    try{
    let html_loaded = false
    if($ && getCookie && QRCode && call_api && $("#currencies").html()){
        html_loaded=true
    }else if($ && getCookie && QRCode && call_api && ($(".balance__cnt").html() || $(".ui-version-2-flag").html() !== undefined)){
        html_loaded=true
        ui_version=2
    }
    if($ && getCookie && QRCode && call_api && html_loaded){ // jquery loaded
        clearInterval(ixx)
        if(getCookie("clore_token")){
            let cerr=''
            try{
                if(window.location.search[0]=='?'){
                    let searchParams = new URLSearchParams(window.location.search)
                    if(searchParams.get("connect_account") && searchParams.get("app")){
                        add_connection(searchParams.get("app") , searchParams.get("connect_account"))
                    }
                }
            }catch(ei){console.error("Querystring check failure",ei)}
            let api_res={}, poh_res={}, transactions={}, tg_account={}
            try {
                [api_res, transactions, glob_pubkeys, orders, myservers] = await Promise.all([
                    call_api("balances").catch(err => { cerr = err; return null }),
                    call_api("transactions", { sort_by: "completed", sort_order: "desc" }).catch(err => { cerr = err; return null }),
                    call_api("pubkeys").catch(err => { cerr = err; return null }),
                    call_api('marketplace/orders', {
                        rc: show_expired_state
                    }).catch(err => { cerr = err; return null }),
                    call_api("myservers").catch(err => { cerr = err; return null })
                ]);
                await call_tg_api("account/info").then(res => tg_account = res).catch(err => console.error(err))
                await call_poh_api("poh/user/info").then(res => poh_res = res).catch(err => console.error(err))
            } catch (err) {
                cerr=err
            }
            if(!cerr){
                PoH_info = {
                    active: orders['PoH_active'],
                    balance: orders['PoH_balance'],
                    rates: orders['PoH_rates'],
                }
                user_email = api_res['email'];
                //console.log(api_res)
                if(api_res["connections"] && api_res["connections"].length>0){
                    let connections_html=''
                    api_res["connections"].forEach(connection => {
                        connections_html +=`<li>
    <img src="${connection['logo']}" alt="${connection['name']} logo" class="connection-logo"><span>${connection['account_email']}</span><div class="delete-keys" onclick="remove_connection('${connection['disconnect-id']}', '${connection['name']}', '${connection['account_email']}')"></div></li>`
                    })
                    $(".account_connections").css("display", "initial")
                    $(".thirdparty_connection_list").html(connections_html)
                }
                if(api_res["enable_fiat"] && (ui_version==1 || v2_ui_show_fiat)) {
                    if(api_res["paypal"]){
                        use_paypal=true
                        if(api_res["disable_saving_cards"]) disable_saving_cards=true
                    }
                    if(api_res["paypal_payouts"]) use_paypal_for_payouts=true
                    allow_fiat=true
                    $(".billing-info").css("display","flex");
                }
                var cs=false
                if($(".ui-version-2-flag").html() !== undefined && api_res["email"]){
                    const twofaDesc = $('.js-twofa-desc');
                    const twofaBtn = $('.js-twofa-btn');

                    let mfa_active = api_res["mfa_active"]

                    if (mfa_active) {
                        glob_mfa_active = true;

                        if (twofaBtn) twofaBtn.html("Disable 2FA");
                    }

                    if (twofaDesc) twofaDesc.html(
                        `${mfa_active ? "Disable" : "Enable"} Google two-factor authentication (2fa) for user <a href="mailto:${api_res['email']}" class="aero-link">${api_res["email"]}</a> login and withdraw`
                    );
                }else if(api_res["email"] && ui_version==2){
                    let mfa_active=api_res["mfa_active"]
                    if(mfa_active) {
                        glob_mfa_active=true
                        $(".mfa_config_btn").html("Disable 2FA")
                    }
                    $(".2fa-message-enable").html(`${mfa_active?"Disable":"Enable"} Google two-factor authentication (2fa) for user ${api_res["email"]} login and withdraw`)
                }
                if(api_res["vat_rates"]){
                    customer_vat_rates=api_res["vat_rates"]
                }else{
                    location.reload()
                }
                if(api_res["email"] && smartsupp) smartsupp("email",api_res["email"].toString())
                if(glob_pubkeys["dockerhub_auth"] && glob_pubkeys["dockerhub_auth"].split(':').length==2){
                    $("#docker-a-f").val(glob_pubkeys["dockerhub_auth"].split(':')[0])
                    $("#docker-password").val(glob_pubkeys["dockerhub_auth"].split(':')[1])
                }
                allowed_features=api_res["allowed_features"]
                if(allowed_features.includes("private-containers")){
                    $(".docker-auth").css("display","flex")
                    $(".docker-auth-line").css("display","block")
                }
                var smartsupp_vars={}
                if(Object.keys(api_res).includes("airdrop")) render_airdrop_info(api_res["airdrop"])
                if(api_res["billing_info"]){
                    let render_billing_info = (ui_version == 1 || v2_ui_show_fiat)
                    if(render_billing_info && api_res["billing_info"]["first_name"] && api_res["billing_info"]["last_name"] && smartsupp) smartsupp("name", `${api_res["billing_info"]["first_name"]} ${api_res["billing_info"]["last_name"]}`)
                    if(render_billing_info && api_res["billing_info"]["first_name"]) $("#fname").val(api_res["billing_info"]["first_name"]);
                    if(render_billing_info && api_res["billing_info"]["last_name"]) $("#lname").val(api_res["billing_info"]["last_name"]);
                    if(render_billing_info && api_res["billing_info"]["address1"]) $("#address").val(api_res["billing_info"]["address1"]);
                    if(render_billing_info && api_res["billing_info"]["address2"]) $("#address2").val(api_res["billing_info"]["address2"]);
                    if(render_billing_info && api_res["billing_info"]["city"]) $("#city").val(api_res["billing_info"]["city"]);
                    if(render_billing_info && api_res["billing_info"]["zip"]) $("#zip-code").val(api_res["billing_info"]["zip"]);
                    if(render_billing_info && api_res["billing_info"]["company"]) $("#company").val(api_res["billing_info"]["company"]);
                    if(render_billing_info && api_res["billing_info"]["vat_id"]) $("#vat-id").val(api_res["billing_info"]["vat_id"]);
                    if(api_res["billing_info"]["invite_code"]){
                        const ref_link = `${location.protocol+"//"+location.host+`?ref_id=`+api_res["billing_info"]["invite_code"]}`;
                        const referalLink = document.getElementById('referal-link');
                        const referalCopyBtn = document.getElementById('referal-copy-btn');

                        $(".referral-program").css("display", "flex");
                        $(".ref-link").val(ref_link);
                        referalLink?.setAttribute('href', ref_link);
                        referalCopyBtn?.addEventListener('click', () => {
                            copyText(ref_link, '.copy-icon-referal', 'icon-grey');
                        });

                        if(api_res["billing_info"]["invite_cnt"]) $("#rf-ucnt").html(api_res["billing_info"]["invite_cnt"]);
                        if(api_res["billing_info"]["rp"]){
                            if(api_res["billing_info"]["rp"]["bitcoin"]) $("#rf-btc").html(api_res["billing_info"]["rp"]["bitcoin"].toFixed(8))
                            if(api_res["billing_info"]["rp"]["CLORE-Blockchain"] && document.getElementById("rf-CLORE-Blockchain")) $("#rf-CLORE-Blockchain").html(api_res["billing_info"]["rp"]["CLORE-Blockchain"].toFixed(8))
                            if(render_billing_info && api_res["billing_info"]["rp"]["usd"]  && document.getElementById("rf-usd")) $("#rf-usd").html(api_res["billing_info"]["rp"]["usd"].toFixed(4))
                        }
                    }
                    if(api_res["billing_info"]["country"]){
                        cs=true
                        smartsupp_vars["set_country"]=api_res["billing_info"]["country"]
                        cbi["country"] = api_res["billing_info"]["country"];
                        cbi["vat_id"] = api_res["billing_info"]["vat_id"];
                        if(render_billing_info) $("#country").countrySelect({ defaultCountry: api_res["billing_info"]["country"] });
                    }
                }
                if(api_res["user_id"] && smartsupp){
                    smartsupp_vars["User_ID"] = api_res["user_id"];
                    smartsupp("variables",smartsupp_vars)
                }
                if(api_res["cards_info"]){
                    let spec_c=''
                    for(var i=0;i<api_res["cards_info"].length;i++){
                        let c_card=api_res["cards_info"][i]
                        spec_c+=`<div class="my-card"${i>0?` style="border-top: 1px solid #ffffff4d;"`:``}>
                            <img src="/assets/cards/${c_card["card_brand"]}.svg">
                            <div class="card-details">
                                <span class="card-detail-1">${c_card["card_brand"]=="visa"?`Visa`:(c_card["card_brand"]=="mastercard"?`Mastercard`:(c_card["card_brand"]=="amex"?"American Express":(c_card["card_brand"]=="unionpay"?`UnionPay`:c_card["card_brand"])))} •••• ${c_card["last4"]}</span><div class="flexbreak"></div>
                                <span>Expires ${c_card.exp_month>9?c_card.exp_month:(`0${c_card.exp_month}`)}/${c_card.exp_year.toString().substring(2)}</span>
                            </div>
                            <div class="card-default-btn${c_card["default"]?` card-default`:``} card-i-${i}" ${c_card["default"]?'':`onclick="set_card_default('${c_card.exp_month}','${c_card.exp_year}','${c_card["last4"]}','${c_card["unique_id"]}',${i})"`}>
                                <span>${c_card["default"]?`<i class="fa-solid fa-check"></i> Default`:`Set default`}</span>
                            </div>
                            <div class="card-default-btn rm-btn card-r-${i}" onclick="rm_card('${c_card.exp_month}','${c_card.exp_year}','${c_card["last4"]}','${c_card["unique_id"]}',${i})">
                                <span>Remove</span>
                            </div>
                        </div>`
                    }
                    if(api_res["cards_info"].length==0){
                        spec_c=`<div class="my-card">
                        <div class="ydnc">
                            <span>You don't have any card added yet</span>
                        </div>
                        </div>`
                    }
                    cards_html+=`<div class="my-cards"${disable_saving_cards?` style="display:none"`:''}>
                        ${spec_c}
                    </div>`
                }
                if(!cs && (ui_version==1 || v2_ui_show_fiat)){
                    $("#country").countrySelect({ defaultCountry: "us" });
                }
                //console.log(transactions)
                calculate_vat_rate()
                render_pubkeys()
                render_api_keys()
                let v2_config={
                    "per_page":15,
                    "page":0
                }
                global_transactions_var=transactions;

                renderTransactions(transactions["txs"], transactions["currency_explorer"]);
                render_transactions(transactions["txs"],transactions["currency_explorer"], v2_config);
                render_currencies(/*[{name:"Bitcoin",icon:"btc.png",deposit:"tb1q6erw7v02t7hakgmlcl4wfnlykzqj05alndruwr",balance:0.12345678}]*/api_res["wallets"], poh_res);
                render_statistics(orders);
                render_tg_account(tg_account)
                render_my_servers(myservers)
            }
        }
    }}catch(e){console.error(e)}
},10)
var can_rp_fl=true
function show_rp_floating_notification(bg_color, text,duration){
    if(!can_rp_fl) return;
    $(".referral-notification-abs").html(`<span>${text}</span>`);
    $(".referral-notification-abs").css("background-color", bg_color);
    can_rp_fl = false;
    $(".referral-notification-overlay").addClass("show_flrf");
    $(".referral-notification-overlay").animate({opacity:'100%'},333)
    setTimeout(function(){
        $(".referral-notification-overlay").animate({ opacity: "0%" }, 333);
        setTimeout(function(){
            $(".referral-notification-overlay").removeClass("show_flrf");
            can_rp_fl = true;
        },330)
    },duration?duration:2000)
}
function copy_ref_link(){
    cptxt("copy-rl");
    show_rp_floating_notification("rgb(0, 200, 0)", `<i class="fa-solid fa-circle-check"></i> Copied`, 800);
}
var vr_working=false
async function withdraw_referral(currency, balance_obj) {
    if (vr_working) return;
    const alertTimeout = 1600;
    const alertContainer = '.referal-alert';

    let cerr='', i_bal = $(balance_obj?balance_obj:`#rf-${currency=="CLORE-Blockchain"?`CLORE-Blockchain`:`btc`}`).html();

    $(balance_obj ? balance_obj : `#rf-${currency=="CLORE-Blockchain" ? `CLORE-Blockchain` : `btc`}`).html(`<i class="fa-solid fa-circle-notch fa-spin"></i>`);

    vr_working=true;

    let api_res=await call_api(`referral/withdraw/${currency}`).catch(function (err) {cerr=err});

    if (cerr) {
        aero_alert(alertContainer, "Connection error", "danger", alertTimeout);
    }else if(api_res.error=="min-payout"){
        const errText = `Minimum payout is ${parseFloat(api_res.amount.toFixed(8))} ${currency=="CLORE-Blockchain"?"CLORE":"BTC"}`;
        aero_alert(alertContainer, errText, "danger", alertTimeout);
    }else if(api_res.error){
        aero_alert(alertContainer, "Database error", "danger", alertTimeout);
    }else{
        location.reload();
    }

    vr_working=false;

    $(balance_obj ? balance_obj : `#rf-${currency=="CLORE-Blockchain"?`CLORE-Blockchain`:`btc`}`).html(i_bal);
}
function calculate_vat_rate(){
    if(cbi["country"]){
        if(customer_vat_rates[cbi["country"]]){
            customer_vat_rate=customer_vat_rates[cbi["country"]][cbi["vat_id"]?`vat_business_percent`:`vat_customer_percent`]
        }else{
            customer_vat_rate=0
        }
    }else{

    }
}
function render_paypal(id){
    $(".environment").css("display","none")
    $("#paypal-button-container").css("display","block")
    paypal.Buttons({
        // Order is created on the server and the order id is returned
        createOrder() {
            return id
        },
        onApprove: function(data) {
            // Authorize the transaction
            return fetch('/webapi/authorize_paypal', {
              method: 'post',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                orderID: data.orderID,
                token: getCookie("clore_token")
              })
            })
            .then(response => response.json())
            .then((authorizePayload) => {
                // Get the authorization id from your payload
                // Optional message given to purchaser
                setTimeout(function(){
                    location.replace("/payment_ok")
                },200)

                // Later you can use your server to validate and capture the transaction
              });
            },
        onCancel: function (data) {
          location.reload()
        }}).render('#paypal-button-container');
}
async function pay_paypal(){
    alert("Card payments are under technical maintenance")
    return;
    let cerr=''
    $(".card-pay-btn").html(`<i class="fa-solid fa-cog fa-spin"></i>`)
    let apires = await call_api("paypal/pay", {
      vat_rate: customer_vat_rate,
      amount: parseInt($("#card-add-amount").val())
    }).catch(function (err) {
      cerr = err;
    });
    $(".pay-card-1").html(`<span>Pay with card</span>`);
    if(cerr){
        alert("connection error")
    }else{
        if(apires["error"]){
            if(apires["error"]=="bad-ip"){
                alert("This service is blocked when using a VPN")
            }else if(apires["error"]=="no_default_card"){
                $(".payment-processing").css("display", "flex");
                $(".payment-processing").html(`<div class="payment-processing-window">
        <div class="topbar"><i class="fa-solid fa-xmark" onclick="$('.payment-processing').css('display','none');"></i></div>
        <div class="dinfo-rest">
            <span class="payment-failed" style="color: orange;">
                <i class="fa-solid fa-triangle-exclamation"></i> Please select one of your cards as default
            </span>
        </div>
    </div>`)
            }else if(apires["error"]=="billing_info_not_set"){
                $(".payment-processing").css("display", "flex");
                $(".payment-processing")
                  .html(`<div class="payment-processing-window">
        <div class="topbar"><i class="fa-solid fa-xmark" onclick="$('.payment-processing').css('display','none');"></i></div>
        <div class="dinfo-rest">
            <span class="payment-failed" style="color: orange;">
                <i class="fa-solid fa-triangle-exclamation"></i> Please fill your billing info before making a payment
            </span>
        </div>
    </div>`);
            }else if(apires["error"]=="not_launched"){
                $(".payment-processing").css("display", "flex");
                $(".payment-processing").html(`<div class="payment-processing-window">
        <div class="topbar"><i class="fa-solid fa-xmark" onclick="$('.payment-processing').css('display','none');"></i></div>
        <div class="dinfo-rest">
            <span class="payment-failed" style="color: orange;">
                <i class="fa-solid fa-triangle-exclamation"></i> Card payments didn't launched yet, launch is expected on April 3 @ 21:00 UTC
            </span>
        </div>
    </div>`)
            }else{
                $(".payment-processing").css("display", "flex");
                $(".payment-processing").html(`<div class="payment-processing-window">
        <div class="topbar"><i class="fa-solid fa-xmark" onclick="$('.payment-processing').css('display','none');"></i></div>
        <div class="dinfo-rest">
            <span class="payment-failed" style="color: orange;">
                <i class="fa-solid fa-triangle-exclamation"></i> Backend error
            </span>
        </div>
    </div>`)
            }
        }else if(apires["ID"]){
            render_paypal(apires["ID"])
            //console.log(apires)
        }else{

        }
    }
}
async function pay_card(){
    let cerr=''
    $(".pay-card-1").html(`<span><i class="fa-solid fa-cog fa-spin"></i></span>`);
    let apires = await call_api("stripe/pay", {
      vat_rate: customer_vat_rate,
      amount: parseInt($("#card-add-amount").val())
    }).catch(function (err) {
      cerr = err;
    });
    $(".pay-card-1").html(`<span>Pay with card</span>`);
    if(cerr){
        alert("connection error")
    }else{
        if(apires["error"]){
            if(apires["error"]=="bad-ip"){
                alert("This service is blocked when using a VPN")
            }else if(apires["error"]=="no_default_card"){
                $(".payment-processing").css("display", "flex");
                $(".payment-processing").html(`<div class="payment-processing-window">
        <div class="topbar"><i class="fa-solid fa-xmark" onclick="$('.payment-processing').css('display','none');"></i></div>
        <div class="dinfo-rest">
            <span class="payment-failed" style="color: orange;">
                <i class="fa-solid fa-triangle-exclamation"></i> Please select one of your cards as default
            </span>
        </div>
    </div>`)
            }else if(apires["error"]=="billing_info_not_set"){
                $(".payment-processing").css("display", "flex");
                $(".payment-processing")
                  .html(`<div class="payment-processing-window">
        <div class="topbar"><i class="fa-solid fa-xmark" onclick="$('.payment-processing').css('display','none');"></i></div>
        <div class="dinfo-rest">
            <span class="payment-failed" style="color: orange;">
                <i class="fa-solid fa-triangle-exclamation"></i> Please fill your billing info before making a payment
            </span>
        </div>
    </div>`);
            }else if(apires["error"]=="not_launched"){
                $(".payment-processing").css("display", "flex");
                $(".payment-processing").html(`<div class="payment-processing-window">
        <div class="topbar"><i class="fa-solid fa-xmark" onclick="$('.payment-processing').css('display','none');"></i></div>
        <div class="dinfo-rest">
            <span class="payment-failed" style="color: orange;">
                <i class="fa-solid fa-triangle-exclamation"></i> Card payments didn't launched yet, launch is expected on April 3 @ 21:00 UTC
            </span>
        </div>
    </div>`)
            }else{
                $(".payment-processing").css("display", "flex");
                $(".payment-processing").html(`<div class="payment-processing-window">
        <div class="topbar"><i class="fa-solid fa-xmark" onclick="$('.payment-processing').css('display','none');"></i></div>
        <div class="dinfo-rest">
            <span class="payment-failed" style="color: orange;">
                <i class="fa-solid fa-triangle-exclamation"></i> Backend error
            </span>
        </div>
    </div>`)
            }
        }else if(apires["url"]){
            location.replace(apires["url"])
        }else if(apires["status"]=="ok"){
            $(".payment-processing").css("display","flex");
            $(".payment-processing").html(`<div class="payment-processing-window">
        <span class="ypbp">Your payment is being processed</span>
        <div class="pbp-l">
            <i class="fa-solid fa-circle fa-bounce"></i>
            <i class="fa-solid fa-circle fa-bounce"></i>
            <i class="fa-solid fa-circle fa-bounce"></i>
        </div>
    </div>`)
            let loop = setInterval(async function(){
                try{
                    let nr = await get_payment_status(apires["pi"])
                    if(nr["status"]){
                        if(nr["status"]=="failed"){
                            clearInterval(loop)
                            $(".payment-processing").html(`<div class="payment-processing-window">
        <div class="topbar"><i class="fa-solid fa-xmark" onclick="$('.payment-processing').css('display','none');"></i></div>
        <div class="dinfo-rest">
            <span class="payment-failed">
                <i class="fa-regular fa-face-frown"></i> Payment has failed
            </span><div class="flexbreak"></div>
            <span class="payment-failed" style="font-size: 18px;">
                Maybe you don't have enough balance on your card
            </span>
        </div>
    </div>`)
                        }else if(nr["status"]=="completed"){
                            clearInterval(loop)
                            $(".payment-processing").html(`<div class="payment-processing-window">
        <div class="topbar"><i class="fa-solid fa-xmark" onclick="location.reload()"></i></div>
        <div class="dinfo-rest">
            <span class="payment-success">
                <i class="fa-solid fa-circle-check"></i> Payment has succeeded
            </span>
        </div>
    </div>`)
                        }
                    }
                }catch(e){}
            },1500)
        }
        //console.log(apires)
    }
}
function get_payment_status(pi){
    return new Promise(async(resolve, reject) => {
        let cerr = "";
        let apires = await call_api("stripe/get_payment_info", { pi }).catch(
          function (err) {
            cerr = err;
          }
        );
        if(cerr){
            reject('fail')
        }else{
            resolve(apires)
        }
    })
}
async function set_card_default(exp_month,exp_year,last4, unique_id,i){
    $(`.card-i-${i}`).html(`<i class="fa-solid fa-cog fa-spin"></i>`);
    let cerr = "";
    let apires = await call_api("stripe/set_card_default", {
      exp_month,
      exp_year,
      last4,
      unique_id
    }).catch(function (err) {
      cerr = err;
    });
    if(cerr){
        setTimeout(function(){
            set_card_default(exp_month, exp_year, last4, unique_id, i);
        },750)
    }else if(apires["status"]){
        location.reload()
    }else if(apires["error"]=="card_dont_exist"){
        location.reload()
    }else{
        setTimeout(function(){
            set_card_default(exp_month, exp_year, last4, unique_id, i);
        },750)
    }
}
async function rm_card(exp_month,exp_year,last4, unique_id,i){
    $(`.card-r-${i}`).html(`<i class="fa-solid fa-cog fa-spin"></i>`);
    let cerr = "";
    let apires = await call_api("stripe/remove_card", {
      exp_month,
      exp_year,
      last4,
      unique_id,
    }).catch(function (err) {
      cerr = err;
    });
    if(cerr){
        setTimeout(function(){
            rm_card(exp_month, exp_year, last4, unique_id, i);
        },750)
    }else if(apires["status"]){
        location.reload()
    }else{
        setTimeout(function(){
            rm_card(exp_month, exp_year, last4, unique_id, i);
        },750)
    }
}
var all_fiat_a = ["fiat-a-25", "fiat-a-50", "fiat-a-100"];
function set_fiat_a(amount,ns){
    if(!ns){
        $("#card-add-amount").val(amount);
    }
    for(var i=0;i<all_fiat_a.length;i++){
        if(all_fiat_a[i].substring(7)==amount.toString()){
            $(`.${all_fiat_a[i]}`).addClass(`afiat-selected`);
        }else{
            $(`.${all_fiat_a[i]}`).removeClass(`afiat-selected`);
        }
    }
    if(!ns) handle_c_price()
}
function handle_c_price(){
    let v = $("#card-add-amount").val();
    let hf='';
    v=parseInt(v)

    if(isNaN(v) && $("#card-add-amount").val()!=0){
        v=0
    }
    if(v<10){
        hf = `Minimum amount is $10`;
    }else if(v>2000){
        hf = `Maximum amount is $2000`;
    }
    if(v<0) v=0
    if(v>2000) v=2000
    set_fiat_a(v,true)
    if(hf){
        $(".card-bal-fail").css("display","inline-flex");
        $(".c-fail-a").html(hf);
        $(".charge-card-amount").addClass("rb-cp");
        $(".cc-a-t").addClass("rb-c2");
    }else{
        $(".cc-a-t").removeClass("rb-c2");
        $(".charge-card-amount").removeClass("rb-cp");
        $(".card-bal-fail").css("display","none");
    }
    $("#card-add-amount").val(v);
    render_fiat_vat()
}
function ofw(){
    let r = $(".fiat-payout").css("display") == "none" ? "flex" : "none";
    $(".fiat-payout").css("display",r);
}
var add_api_key_working=false
function render_currencies(currencies, poh){
    let htmlcode='',htmlcode_v2='',wallets_html='',fiat_code='',fiat_earn_code='',clore_deposit_warning_html=`<div class="min-clore-deposit">
        <span>Minimum deposit: <span style="color: #fb0056;">75 CLORE</span></span>
    </div>
    <div class="flexbreak"></div>`
    let coins_name_map = {
        "bitcoin":"Bitcoin",
        "CLORE-Blockchain":"CLORE Blockchain"
    }
    for(let c=0;c<currencies.length;c++){
        let c_coin=currencies[c]
        if(c_coin["name"]=="usd-earnings"){
            var stripe_connected=false
            fiat_earn_code+=`<div class="currency"${/*c>0*/true?` style="margin-top:10px;"`:``} id="curr-${c_coin["name"]}">
            <div class="currency-name noselect">
                <div class="fiat-sign" style="background-color: #fb0056;">
                    <i class="fa-solid fa-dollar-sign"></i>
                </div><span>Hosting provider earnings (USD)</span>
            </div>
            <div class="currency-buttons noselect">
                <div class="provider-gift-button" onclick="usd_provider_give()">
                    <span><i class="fa-solid fa-hand-holding-dollar"></i> Give</span>
                </div>
                <div class="withdraw-btn" onclick="ofw()">
                    <span><i class="fa-regular fa-paper-plane"></i> Withdraw</span>
                </div>
            </div>
            <div class="flexbreak"></div>
            <div class="fiat-payout">
                ${stripe_connected?'':`
                <div class="stripe-connect-1">
                    <div class="stripe-withdrawal-err"></div><div class="flexbreak"></div>
                    <span class="stripe-connect-1-s">We have partnered with ${use_paypal_for_payouts?"PayPal":"Stripe"} to offer cheap and fast payouts</span><div class="flexbreak"></div>
                    <div class="withdraw-usd-p">
                    <div class="cc-w-extra">
                        <div class="cc-a-t2 noselect cc-w-e2">
                            <span>Amount</span>
                        </div>
                    </div>
                        <div class="cc-a-t-ds">
                            <span><i class="fa-solid fa-dollar-sign"></i></span>
                        </div>
                        <div class="w-w-stripe">
                            <input type="number" id="stripe-withdraw-amount" name="withdraw-usd" min="20" max="2000" value="20" oninput="handle_usd_withdraw_amount()">
                        </div>
                        <div class="w-w-send" onclick="${use_paypal_for_payouts?`paypal_do_withdrawal()`:`stripe_do_withdrawal()`}">
                            <span><i class="fa-regular fa-paper-plane"></i> Send</span>
                        </div>
                    </div><div class="flexbreak"></div>
                    <div class="card-bal-fail2 noselect">
                        <span class="c-fail-a">Minimum amount is $10</span>
                    </div><div class="flexbreak"></div>

                    <div class="withdraw-paypal-email">
                        <div class="cc-w-extra">
                            <div class="pp-acc-mail noselect cc-w-pp">
                                <span>PayPal account email</span>
                            </div>
                        </div>
                        <div class="cc-a-t-ds">
                            <span><i class="fa-solid fa-envelope"></i></span>
                        </div>
                        <div class="w-mail-paypal">
                            <input type="text" id="paypal-withdraw-email" name="withdraw-paypal-email" placeholder="email of your paypal account" oninput="handle_paypal_payout_email()">
                        </div>
                    </div>

                    ${use_paypal_for_payouts?``:`<a href="#" class="stripe-connect slate" onclick="connect_stripe_payouts()"><div class="connect-wait"><i class="fa-solid fa-cog fa-spin"></i></div><span>Connect with</span></a>`}
                </div>
                `}
                <!--<span class="fp1">To request USD payout</span><div class="flexbreak"></div>
                <span class="fp2">send email to:</span><div class="flexbreak"></div>
                <span class="fp3">accountant@clore.ai</span><div class="flexbreak"></div>-->
            </div>
            <div class="currency-balance" id="show-bal-${c_coin["name"]}"><span><span class="noselect">Balance: </span><b id="balance_${c_coin["name"]}">${(c_coin["balance"]/100).toFixed(4)} <i class="fa-solid fa-dollar-sign"></i></b>${(c_coin["name"]=="bitcoin")?`<span class="noselect"> </span><i class="fa-solid fa-bitcoin-sign"></i>`:``}</span></div>
        </div>`
        }else if(c_coin["name"]=="usd"){
            fiat_code+=`<div class="currency"${/*c>0*/false?` style="margin-top:10px;"`:``} id="curr-${c_coin["name"]}">
            <div class="currency-name noselect">
                <div class="fiat-sign">
                    <i class="fa-solid fa-dollar-sign"></i>
                </div><span>${c_coin["name"]=="usd"?`US Dollar`:`Euro`}</span>
            </div>
            <div class="currency-buttons noselect">
                <div class="deposit-btn" onclick="redeem_giftcode()">
                    <span>Redeem code</span>
                </div>
                <div class="deposit-btn${disable_saving_cards?` disabled_deposit`:''}"${disable_saving_cards?'':` onclick="add_card()"`}>
                    <span><i class="fa-regular fa-credit-card"></i> Add card</span>
                </div>
            </div>
            <div class="flexbreak"></div>
            <div id="deposit-${c_coin["name"]}" class="curr-deposit">
                <span class="center-txt dtxt">Deposit ${c_coin["name"]}</span>
                <div id="deposit-qr-${c_coin["name"]}" class="deposit-qr"></div><div class="flexbreak"></div>
                <div class="deposit-address">
                    <input type="text" value="${c_coin["deposit"]}" id="address-${c_coin["name"]}" readonly>
                    <div onclick="cptxt('address-${c_coin["name"]}')">
                        <i class="fa-regular fa-copy"></i>
                    </div>
                </div>
            </div>${cards_html}
            <div class="charge-card-menu">
                <div class="fiat-amount-selector">
                    <div class="afiat-amount afiat-left fiat-a-25" onclick="set_fiat_a(25)">
                        <span><i class="fa-solid fa-dollar-sign"></i>25</span>
                    </div>
                    <div class="afiat-amount fiat-a-50 afiat-selected" onclick="set_fiat_a(50)">
                        <span><i class="fa-solid fa-dollar-sign"></i>50</span>
                    </div>
                    <div class="afiat-amount afiat-right fiat-a-100" onclick="set_fiat_a(100)">
                        <span><i class="fa-solid fa-dollar-sign"></i>100</span>
                    </div>
                </div>
                <div class="charge-card-amount">
                    <div class="cc-a-t noselect">
                        <span>Amount</span>
                    </div><div class="flexbreak"></div>
                    <div class="cc-a-t-ds">
                        <span><i class="fa-solid fa-dollar-sign"></i></span>
                    </div>
                    <div class="cc-a-t-input">
                        <input type="number" id="card-add-amount" name="add-amount" min="10" max="2000" value="50" oninput="handle_c_price()">
                    </div>
                </div>
                <div class="card-pay-btn noselect pay-card-1" onclick="${use_paypal?`pay_paypal()`:`pay_card()`}">
                    <span>Pay with card</span>
                </div>                
                <div class="flexbreak"></div>
                <div class="card-bal-fail noselect">
                    <span class="c-fail-a"></span>
                </div>
                <div class="flexbreak"></div>
                    <div class="fiat-vat-rate-render">
                    
                    </div>
                <div class="flexbreak"></div>
                <div class="card-pay-btn noselect pay-card-2" onclick="${use_paypal?`pay_paypal()`:`pay_card()`}">
                    <span>Pay with card</span>
                </div>  
            </div>
            <div class="currency-balance" id="show-bal-${c_coin["name"]}"><span><span class="noselect">Balance: </span><b id="balance_${c_coin["name"]}">${(c_coin["balance"]/100).toFixed(4)} <i class="fa-solid fa-dollar-sign"></i></b>${(c_coin["name"]=="bitcoin")?`<span class="noselect"> </span><i class="fa-solid fa-bitcoin-sign"></i>`:``}</span></div>
            </div>`
        }else{
            htmlcode+=`<div class="currency"${/*c>0*/true?` style="margin-top:10px;"`:``} id="curr-${c_coin["name"]}">
            <div class="currency-name noselect">
                <img src="/assets/img/${c_coin["icon"]}" height="25px" width="auto"><span>${first_uppercase(c_coin["name"].replace('-',' '))}
                ${(c_coin["name"]=="CLORE-Blockchain" && c_coin["show-poh"])?`<div class="flexbreak"></div><a href="/proof-of-holding" class="poh-btn"><i class="fa-solid fa-arrow-up-right-from-square"></i>Proof of Holding</a>`:''}
            </div>
            <div class="currency-buttons noselect">
                <div class="deposit-btn${c_coin["deposit"]==''?` disabled_deposit`:``}" onclick="deposit_toggle('${c_coin["name"]}'${c_coin["deposit"]==''?`,true`:``})">
                    <span><i class="fa-solid fa-arrow-down"></i> Deposit</span>
                </div>
                <div class="flexbreak"></div>
                <div class="withdraw-btn" onclick="withdrawal_toggle('${c_coin["name"]}')">
                    <span><i class="fa-regular fa-paper-plane"></i> Withdraw</span>
                </div>
            </div>
            <div class="flexbreak"></div>
            <div id="deposit-${c_coin["name"]}" class="curr-deposit">
                <span class="center-txt dtxt">Deposit ${c_coin["name"]=="CLORE-Blockchain"?"CLORE Blockchain":c_coin["name"]}</span>
                <div id="deposit-qr-${c_coin["name"]}" class="deposit-qr"></div><div class="flexbreak"></div>
                ${c_coin["name"]=="CLORE-Blockchain"?clore_deposit_warning_html:''}
                <div class="deposit-address">
                    <input type="text" value="${c_coin["deposit"]}" id="address-${c_coin["name"]}" readonly>
                    <div onclick="cptxt('address-${c_coin["name"]}')">
                        <i class="fa-regular fa-copy"></i>
                    </div>
                </div>
            </div>
            <div id="withdraw-${c_coin["name"]}" class="curr-withdrawal">
                <span class="center-txt dtxt"><b>Withdraw ${c_coin["name"].replace('-',' ')}</b></span><div class="flexbreak"></div>
                <div class="alert-div alert-c-${c_coin["name"]}"></div><div class="flexbreak"></div>
                <input placeholder="your ${c_coin["name"].replace('-',' ')} address" id="ywa-${c_coin["name"]}">
                <div class="withdraw-amount-box">
                    <span>
                        Withdrawal amount:<br>
                        balance: <span class="cw-a" onclick="set_wa(${c_coin["balance"].toFixed(8)},0.0002,'${c_coin["name"]}')">${(c_coin["name"]=="CLORE-Blockchain"?(c_coin["balance"]>9?(c_coin["balance"]>1000?(c_coin["balance"]>1000000?c_coin["balance"].toFixed(0):c_coin["balance"].toFixed(2)):c_coin["balance"].toFixed(4)):c_coin["balance"]):c_coin["balance"])}</span>
                    </span>
                    <input id="wia-${c_coin["name"]}" type="number" step="0.00000001" oninput="validate_wia('${c_coin["name"]}',${c_coin["withdrawal_fee"]},${c_coin["balance"]})" placeholder="withdrawal amount">
                </div><div class="flexbreak"></div>
                <span class="withdrawal-fee-txt">Withdrawal fee: <span class="redn">-${c_coin["withdrawal_fee"].toFixed(8)} ${c_coin["name"]=="bitcoin"?`<i class="fa-solid fa-bitcoin-sign"></i>`:``}</span></span><div class="flexbreak"></div>
                <span class="withdrawal-fee-txt">Final amount: <span class="fw500 frc-${c_coin["name"]}">0.00000000</span> ${c_coin["name"]=="bitcoin"?`<i class="fa-solid fa-bitcoin-sign"></i>`:``}</i></span><div class="flexbreak"></div>
                <div class="acc-send-btn noselect wth-btn-${c_coin["name"]}" onclick="do_withdraw('${c_coin["name"]}')">
                    <span><i class="fa-regular fa-paper-plane"></i> Send</span>
                </div>
            </div>
            <div class="currency-balance" id="show-bal-${c_coin["name"]}"><span><span class="noselect">Balance: </span><b id="balance_${c_coin["name"]}">${c_coin["balance"].toFixed(8)}</b>${(c_coin["name"]=="bitcoin")?`<span class="noselect"> </span><i class="fa-solid fa-bitcoin-sign"></i>`:``}</span></div>
        </div>`
            wallets_html+= `<div class="wallet-wrapper">
              <div class="left-side-wallet">
                 <p class="currency-name-wrapper">${c_coin['name'] === 'CLORE-Blockchain' ?
              `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                  <path fill="#fff" fill-opacity=".6"
                        d="M17 3.514C15.547 2.568 14.276 2.126 12.34 2c-1.817 1.766-1.756 5.36 0 7 .726-3.027 2.42-4.667 4.66-5.486ZM19.517 5.004C16.414 4.878 14 7.471 14 10c2.552-1.58 5.517-1.644 8-.38-.414-2.023-1.197-3.09-2.483-4.616ZM22 12.299c-1.782-1.832-5.282-1.649-7 .061 2.806.654 4.327 1.893 5.6 4.64.972-1.539 1.4-2.686 1.4-4.701ZM19 19.448c-.19-3.31-2.25-5.257-5-5.448 1.423 2.713 1.709 5.241.443 8 1.89-.564 2.975-1.103 4.557-2.552ZM11.643 22c1.749-1.829 1.87-4.793 0-7-.724 3.09-2.291 4.667-4.643 5.55 1.62 1.033 2.671 1.266 4.643 1.45ZM4.353 19C7.173 18.727 9 16.812 9 14c-1.75 1.438-4.707 1.625-7 .563.64 1.941 1.15 2.956 2.353 4.437ZM2.001 11.65c1.59 1.674 4.9 1.922 6.999 0-2.99-.682-4.742-2.4-5.536-4.65-.89 1.302-1.491 3.1-1.463 4.65ZM5 4.62c.443 3.311 2.089 5.104 5 5.38-1.47-2.648-1.582-5.172-.506-8C7.405 2.552 6.3 3.312 5 4.62Z" />
              </svg>
              <span class="aero-b4">
                CLORE
              </span>`
              :
              `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                  <path stroke="#A4A4A4" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M6 6h8a3 3 0 0 1 0 6m0 0a3 3 0 0 1 0 6H6m8-6H8m0-6v12M9 3v3m4-3v3M9 18v3m4-3v3" />
              </svg>
              <span class="aero-b4">
                BTC
              </span>`}</p>  
                 <p class="currency-balance-wrapper">
                    <span class="aero-caption">Balance</span>   
                    <span class="aero-b3">${toFixed(c_coin['balance'], c_coin['name'] === 'bitcoin' ? 8 : 2)} ${c_coin['name'] === 'CLORE-Blockchain' ? 'CLORE' : 'BTC'}</span>          
                </p>           
              </div>
              <div class="right-side-wallet">
                <button class="aero-btn-secondary" onclick=${c_coin['name'] === 'bitcoin' ? "open_modal_deposit_bitcoin()" : "open_modal_deposit_clore()"}>Deposit</button>               
                <button class="aero-btn-primary" onclick="open_withdraw('${c_coin['name']}')">Withdraw</button>               
              </div>
            </div>`
            htmlcode_v2 += `<div class="balance__box">
    <div class="balance__top">
        <div class="balance__coin coin_logo_m">
            <img src="/assets/img/${c_coin['icon']}" alt="icon">
            <strong>${coins_name_map[c_coin['name']] ? coins_name_map[c_coin['name']] : c_coin['name']}</strong>
        </div>
        <div class="balance__price">
            <span>${c_coin['balance'].toFixed(8)}</span>
            <small>Balance</small>
        </div>
    </div>
    <div class="balance__bottom">
        ${c_coin['name'] == 'CLORE-Blockchain' ? `<a href="/marketplace#proof-of-holding" class="proof-holding">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                <g clip-path="url(#clip0_0_171)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4105 0.153654C12.1015 0.205435 11.6731 0.344123 11.3993 0.480998C10.8723 0.744435 10.7335 0.865216 9.16045 2.42903C8.13685 3.44659 7.6302 3.97194 7.59082 4.05659C7.51313 4.22347 7.51648 4.37381 7.60157 4.54034C7.69701 4.72719 7.86629 4.85665 8.04085 4.87631C8.3297 4.90887 8.31138 4.92397 9.90626 3.33972C11.4352 1.82093 11.6068 1.67131 12.0156 1.5004C12.4221 1.33047 12.548 1.30722 13.0625 1.30722C13.577 1.30722 13.7029 1.33047 14.1094 1.5004C14.6938 1.74475 15.2276 2.29303 15.4698 2.8979C15.6051 3.2359 15.6552 3.50234 15.6552 3.88472C15.6552 4.26087 15.6071 4.52303 15.4763 4.85994C15.2922 5.33384 15.1991 5.44012 13.2681 7.37947C12.2699 8.38203 11.3527 9.28362 11.23 9.383C10.9326 9.62381 10.7297 9.73609 10.3744 9.8564C10.1169 9.94353 10.0249 9.9585 9.67188 9.97053C8.9222 9.99606 8.38835 9.8075 7.81079 9.31315C7.69813 9.21672 7.56713 9.12306 7.5197 9.105C7.40845 9.06272 7.1847 9.063 7.07235 9.10556C6.77566 9.21797 6.63076 9.62094 6.78107 9.91559C6.89104 10.1312 7.4312 10.5525 7.89929 10.7879C8.73007 11.2055 9.79404 11.2814 10.7304 10.9897C11.0363 10.8944 11.5612 10.6238 11.8241 10.4259C12.1066 10.2132 15.8136 6.50906 16.0607 6.1925C16.6946 5.38043 16.9646 4.30315 16.7955 3.26056C16.5386 1.67631 15.2671 0.40806 13.6773 0.150216C13.3265 0.09331 12.7613 0.0948413 12.4105 0.153654ZM7.54204 5.26259C7.12088 5.30015 6.78713 5.39315 6.27279 5.61625C5.78816 5.82644 5.48151 6.10006 3.49704 8.09284C1.58123 10.0167 1.4922 10.1171 1.22129 10.659C0.705352 11.6912 0.719227 12.9992 1.25723 14.0508C1.90526 15.3175 3.1946 16.1033 4.62501 16.1033C5.47626 16.1033 6.27776 15.8316 6.93173 15.3213C7.08101 15.2048 7.76091 14.5492 8.44263 13.8643C9.49076 12.8114 9.68738 12.5998 9.71591 12.4941C9.75766 12.3394 9.75782 12.3047 9.71738 12.1591C9.62645 11.8317 9.2542 11.6476 8.94432 11.777C8.8661 11.8096 8.41466 12.2367 7.56251 13.0842C6.18741 14.4517 6.03188 14.5807 5.54445 14.7571C5.17507 14.8907 4.92598 14.9265 4.48745 14.9088C4.17076 14.8961 4.0612 14.8774 3.81251 14.7938C3.00473 14.5223 2.42798 13.9454 2.15332 13.1341C2.0662 12.8767 2.05123 12.7846 2.0392 12.4316C2.02335 11.9664 2.06329 11.7211 2.21763 11.3357C2.40695 10.8629 2.50291 10.7529 4.31029 8.93653C5.24823 7.99393 6.12813 7.13169 6.26563 7.0204C6.75513 6.62428 7.2621 6.44325 7.89063 6.44009C8.59776 6.43656 9.15082 6.64209 9.67188 7.10209C9.77501 7.19312 9.90463 7.28694 9.95995 7.31053C10.27 7.4429 10.6612 7.24584 10.7511 6.91194C10.8156 6.67244 10.7175 6.4454 10.4478 6.21012C9.95176 5.77728 9.38091 5.48234 8.75916 5.33762C8.58579 5.29728 7.93898 5.2219 7.85938 5.23278C7.8422 5.23515 7.69938 5.24856 7.54204 5.26259Z" fill="#525252"></path>
                </g>
                <defs>
                    <clipPath id="clip0_0_171">
                        <rect width="16" height="16" fill="white" transform="translate(0.84375 0.103516)"></rect>
                    </clipPath>
                </defs>
            </svg>
            <span>Proof of Holding</span>
        </a>`:``}
        <div class="balance__btn">
            <button data-val="deposit-${c_coin["name"]}" class="open-modal btn-liner${c_coin["deposit"]==''?' opacity-btn" disabled=""':'"'}>
                <svg style="margin-top: 2px;" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                    <path d="M11.2304 1.57019C7.81762 1.57019 4.85609 3.52295 3.39867 6.3698C3.35016 6.45588 3.31954 6.55087 3.30865 6.64907C3.29777 6.74727 3.30684 6.84666 3.33531 6.94127C3.36379 7.03588 3.4111 7.12377 3.47438 7.19964C3.53767 7.27552 3.61564 7.33782 3.7036 7.38282C3.79156 7.42782 3.88771 7.45457 3.98627 7.46149C4.08484 7.4684 4.18378 7.45533 4.27716 7.42305C4.37055 7.39078 4.45645 7.33997 4.52971 7.27367C4.60297 7.20737 4.66208 7.12696 4.70349 7.03725C5.91833 4.66423 8.37619 3.03686 11.2304 3.03686C15.2891 3.03686 18.5638 6.31153 18.5638 10.3702C18.5638 14.4288 15.2891 17.7035 11.2304 17.7035C8.37619 17.7035 5.91833 16.0762 4.70349 13.7031C4.66208 13.6134 4.60297 13.533 4.52971 13.4667C4.45645 13.4004 4.37055 13.3496 4.27716 13.3173C4.18378 13.2851 4.08484 13.272 3.98627 13.2789C3.88771 13.2858 3.79156 13.3126 3.7036 13.3576C3.61563 13.4026 3.53767 13.4649 3.47438 13.5407C3.4111 13.6166 3.36379 13.7045 3.33531 13.7991C3.30684 13.8937 3.29777 13.9931 3.30865 14.0913C3.31954 14.1895 3.35016 14.2845 3.39867 14.3706C4.85609 17.2174 7.81762 19.1702 11.2304 19.1702C16.0818 19.1702 20.0304 15.2215 20.0304 10.3702C20.0304 5.51885 16.0818 1.57019 11.2304 1.57019ZM10.4899 6.69636C10.3441 6.6964 10.2015 6.73994 10.0805 6.82143C9.95949 6.90291 9.86553 7.01863 9.81064 7.15379C9.75574 7.28896 9.7424 7.43742 9.77232 7.5802C9.80225 7.72298 9.87407 7.8536 9.97862 7.95535L11.6601 9.63686H3.16377C3.0666 9.63548 2.97012 9.65343 2.87994 9.68967C2.78976 9.72591 2.70769 9.77971 2.63848 9.84794C2.56928 9.91617 2.51433 9.99748 2.47682 10.0871C2.43931 10.1768 2.41999 10.273 2.41999 10.3702C2.41999 10.4674 2.43931 10.5636 2.47682 10.6532C2.51433 10.7429 2.56928 10.8242 2.63848 10.8924C2.70769 10.9607 2.78976 11.0145 2.87994 11.0507C2.97012 11.0869 3.0666 11.1049 3.16377 11.1035H11.6601L9.97862 12.785C9.90823 12.8526 9.85204 12.9335 9.81333 13.0231C9.77462 13.1127 9.75417 13.2091 9.75318 13.3066C9.75219 13.4042 9.77067 13.501 9.80755 13.5913C9.84443 13.6816 9.89896 13.7637 9.96795 13.8327C10.0369 13.9017 10.119 13.9562 10.2093 13.9931C10.2997 14.03 10.3965 14.0484 10.494 14.0474C10.5916 14.0465 10.688 14.026 10.7775 13.9873C10.8671 13.9486 10.948 13.8924 11.0156 13.822L13.8845 10.9531C13.9743 10.8846 14.0471 10.7962 14.0972 10.6949C14.1472 10.5936 14.1732 10.4821 14.1731 10.3691C14.1729 10.2561 14.1467 10.1447 14.0964 10.0435C14.0461 9.94232 13.9731 9.85413 13.883 9.78582L11.0156 6.91837C10.9473 6.84812 10.8655 6.79228 10.7752 6.75415C10.685 6.71602 10.5879 6.69637 10.4899 6.69636Z" fill="#F73737"></path>
                </svg>
                <span>Deposit</span>
            </button>
            <button data-val="withdraw-${c_coin["name"]}" class="open-modal btn-liner">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3501 1.53705C11.1458 1.611 10.8981 1.83092 10.8026 2.02329C10.7242 2.18116 10.7204 2.40751 10.6997 8.15626L10.6782 14.1253L8.77703 12.3789C7.73135 11.4184 6.80279 10.5952 6.7135 10.5497C6.0184 10.195 5.24088 10.6746 5.24363 11.4563C5.24547 11.9875 5.02328 11.7473 8.36062 14.8257C10.8017 17.0773 10.8851 17.1441 11.3927 17.253C11.8272 17.3461 12.4034 17.2209 12.765 16.9548C12.9225 16.8388 17.7155 12.4225 17.985 12.1451C18.2578 11.8642 18.3376 11.3279 18.1583 10.9812C17.9099 10.5007 17.2351 10.2766 16.7666 10.5189C16.6949 10.5559 15.7695 11.3829 14.71 12.3565L12.7837 14.1268L12.7622 8.15699C12.7416 2.42474 12.7375 2.18073 12.6599 2.02466C12.5568 1.81712 12.2944 1.5921 12.0808 1.52812C11.8706 1.46512 11.5377 1.46921 11.3501 1.53705ZM2.75049 13.9097C2.52903 13.9799 2.22009 14.3076 2.15551 14.5409C2.11507 14.687 2.1051 15.3106 2.11473 17.0974L2.12745 19.4607L2.24174 19.7045C2.45216 20.1533 2.8806 20.523 3.34913 20.66C3.55869 20.7213 4.41326 20.7282 11.731 20.7282C20.6469 20.7282 20.0832 20.7438 20.5243 20.4858C20.7777 20.3376 21.085 19.9929 21.2193 19.7063L21.3345 19.4607L21.3472 17.0974C21.3568 15.3106 21.3469 14.687 21.3064 14.5409C21.2377 14.2928 20.9303 13.9786 20.685 13.9057C20.2647 13.781 19.8772 13.8686 19.593 14.1528C19.4762 14.2697 19.3776 14.418 19.346 14.5242C19.3079 14.6524 19.2935 15.2466 19.2935 16.6834V18.6657H11.731H4.16846V16.6834C4.16846 15.2466 4.15402 14.6524 4.11595 14.5242C4.04686 14.2917 3.73001 13.9748 3.49746 13.9057C3.28494 13.8427 2.95653 13.8444 2.75049 13.9097Z" fill="#F73737"></path>
                </svg>
                <span>Withdraw</span>
            </button>
        </div>
    </div>
</div>`

            if(document.getElementById(`deposit-${c_coin["name"]}`)) {
                $(`#deposit-title-${c_coin['name']}`).html(`${c_coin['name'] === 'bitcoin' ? 'Deposit Bitcoin' : 'Deposit CLORE'}`);
                if (c_coin['name'] === 'CLORE-Blockchain') {
                    $('#min-deposit').html(`
                        <span class="aero-b3 left">Minimum deposit</span>
                        <span class="aero-b3 right">75 CLORE</span>
                    `);
                }
                $(`#deposit-key-${c_coin['name']}`).val(c_coin['deposit']);
                $(`#deposit-btn-${c_coin['name']}`).click(function() {
                    copyText(c_coin['deposit']);
                });
            }

            if(document.getElementById(`withdraw-${c_coin["name"]}`)) {
                $(`#withdraw-title-${c_coin['name']}`).html(`${c_coin['name'] === 'bitcoin' ? 'Withdraw Bitcoin' : 'Withdraw CLORE Blockchain'}`);
                $(`#withdraw-balance-${c_coin['name']}`).html(`
                <div class="balance-wrapper">
                  <span class="aero-caption">Balance</span>
                  <button onclick="set_wa(${c_coin["balance"].toFixed(8)},${c_coin["withdrawal_fee"]},'${c_coin["name"]}')"><span class="aero-b3">${c_coin["balance"].toFixed(8)} ${c_coin['name'] === 'bitcoin' ? 'BTC' : 'CLORE'}</span></button>
                </div>
                <div>${c_coin['name'] === 'bitcoin' ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" fill="none"><path stroke="#A4A4A4" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 6.5h8a3 3 0 0 1 0 6m0 0a3 3 0 0 1 0 6H6m8-6H8m0-6v12m1-15v3m4-3v3m-4 12v3m4-3v3"/></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" fill="none"><path fill="#fff" fill-opacity=".6" d="M17 4.014c-1.453-.946-2.724-1.388-4.66-1.514-1.817 1.766-1.756 5.36 0 7 .726-3.027 2.42-4.667 4.66-5.486ZM19.517 5.504C16.414 5.378 14 7.971 14 10.5c2.552-1.58 5.517-1.644 8-.38-.414-2.023-1.197-3.09-2.483-4.616ZM22 12.799c-1.782-1.832-5.282-1.649-7 .061 2.806.654 4.327 1.893 5.6 4.64.972-1.539 1.4-2.686 1.4-4.701ZM19 19.948c-.19-3.31-2.25-5.257-5-5.448 1.423 2.713 1.709 5.241.443 8 1.89-.564 2.975-1.103 4.557-2.552ZM11.643 22.5c1.749-1.829 1.87-4.793 0-7-.724 3.09-2.291 4.667-4.643 5.55 1.62 1.033 2.671 1.266 4.643 1.45ZM4.353 19.5C7.173 19.227 9 17.312 9 14.5c-1.75 1.438-4.707 1.625-7 .563.64 1.941 1.15 2.956 2.353 4.437ZM2.001 12.15c1.59 1.674 4.9 1.922 6.999 0-2.99-.682-4.742-2.4-5.536-4.65-.89 1.302-1.491 3.1-1.463 4.65ZM5 5.12c.443 3.311 2.089 5.104 5 5.38-1.47-2.648-1.582-5.172-.506-8C7.405 3.052 6.3 3.812 5 5.12Z"/></svg>'}</div>
                `)
                $(`#withdraw-amount-${c_coin['name']}`).html(`
                    <label class="aero-input-sign">Withdraw amount</label>
                    <input class="aero-input" id="wia-${c_coin["name"]}" oninput="validate_wia('${c_coin["name"]}',${c_coin["withdrawal_fee"]},${c_coin["balance"]})" type="number" step="0.00000001" placeholder="0"/>
                `)
                $(`#withdraw-address-${c_coin['name']}`).html(`
                    <label class="aero-input-sign">Your ${c_coin['name'] === 'bitcoin' ? 'Bitcoin' : 'CLORE Blockchain'} address</label>
                    <input class="aero-input" id="ywa-${c_coin["name"]}" type="text" placeholder="0"/>
                `)
                $(`#withdraw-total-${c_coin['name']}`).html(`
                    <div class="withdrawal-total-wrapper">
                        <p class="aero-b4">Withdrawal fee:</p>
                        <p class="aero-b4">
                          <span>-${c_coin["withdrawal_fee"].toFixed(8)}</span>
                          <span>${c_coin['name'] === 'bitcoin' ? 'BTC' : 'CLORE'}</span>
                        </p>
                    </div>
                    <div class="withdrawal-total-wrapper">
                        <p class="aero-b4">Final amount:</p>
                        <p class="aero-b4 withdrawal-final-amount">
                          <span class="frc-${c_coin["name"]}">0.0000000</span>
                          <span>${c_coin['name'] === 'bitcoin' ? 'BTC' : 'CLORE'}</span>
                        </p>
                    </div>
                `)
                $(`#withdraw-btn-${c_coin['name']}`).click(function() {
                    do_withdraw(c_coin["name"])
                })
            }

                if (ui_version == 2) {
                if (!document.getElementById(`deposit-${c_coin['name']}`)){
                    $("body").append(`<div id="deposit-${c_coin["name"]}" class="modal">
    <div class="modal-content">
        <div class="modal-deposit">
            <div class="close"></div>
            <h2>Deposit ${coins_name_map[c_coin["name"]] ? coins_name_map[c_coin["name"]] : c_coin["name"]}</h2>
            <div id="deposit-qr-${c_coin["name"]}" class="modal-deposit__qr deposit-qr"></div>
            ${c_coin["name"]=="CLORE-Blockchain"?`<div class="mod-minimum-deposit">
    <span>Minimum deposit:</span>
    <strong>75 Clore</strong>
</div>`:``}
            <a class="modal-deposit__copy" onclick="cptxt('address-${c_coin["name"]}')">
                <span><input type="text" value="${c_coin["deposit"]}" id="address-${c_coin["name"]}" readonly=""></span>
                <img src="../images/icon/traced-cop.svg" alt="icon">
            </a>
        </div>
    </div>
</div>`)
                }
                if(!document.getElementById(`withdraw-${c_coin["name"]}`)){
                    $("body").append(`<div id="withdraw-${c_coin["name"]}" class="modal">
    <div class="modal-content">
        <div class="modal-deposit">
            <div class="close"></div>
            <h2>Withdraw ${coins_name_map[c_coin["name"]] ? coins_name_map[c_coin["name"]] : c_coin["name"]}</h2>
            <form>
                <div style="color:white;" class="alert-div alert-c-${c_coin["name"]}"></div>
                <div class="withdrawal__flex">
                    <div class="withdrawal__balance">
                        <strong style="cursor:pointer;font-weight:600;" onclick="set_wa(${c_coin["balance"].toFixed(8)},${c_coin["withdrawal_fee"]},'${c_coin["name"]}')">${c_coin["balance"].toFixed(8)}</strong>
                        <small>Balance</small>
                    </div>
                    <div class="withdrawal-amount">
                        <label>
                            <input id="wia-${c_coin["name"]}" type="number" step="0.00000001" oninput="validate_wia('${c_coin["name"]}',${c_coin["withdrawal_fee"]},${c_coin["balance"]})" placeholder="Withdrawal amount">
                        </label>
                    </div>
                </div>
                <div class="withdrawal__flex">
                        <!--<div class="withdrawal__balance">
                            <strong>Your CLORE Blockchain</strong>
                            <small>Address</small>
                        </div>-->
                        <div class="withdrawal-amount v2_withdrawal-amount">
                            <label>
                                <input type="text" placeholder="your ${coins_name_map[c_coin["name"]] ? coins_name_map[c_coin["name"]] : c_coin["name"]} address" id="ywa-${c_coin["name"]}">
                            </label>
                        </div>
                    </div>
                <div class="withdrawal-fee__cnt"${glob_mfa_active?` style="margin-bottom: 20px;"`:``}>
                    <div class="withdrawal-fee">
                        <p>Withdrawal fee:</p>
                        <span>-${c_coin["withdrawal_fee"].toFixed(8)}</span>
                    </div>
                    <div class="withd-final-amount">
                        <p>Final amount:</p>
                        <span class="frc-${c_coin["name"]}">0.0000000</span>
                    </div>
                </div>${glob_mfa_active ?`<div class="mfa-code-title-input">
  <span>Input your authenticator token</span>
</div><div class="mfa-code-parent">
  <div class="auth-input-mfa-parent-withdrawal" style="display: none;">
    <div class="auth-input-mfa-loader">
      <i class="fa-solid fa-circle-notch fa-spin"></i>
    </div>
  </div>
  <div class="auth-input-wrapper">
    <input type="text" inputmode="numeric" maxlength="1" class="digit-input-withdrawal digit-input-withdrawal-${c_coin["name"]}" autofocus="">
    <input type="text" inputmode="numeric" maxlength="1" class="digit-input-withdrawal digit-input-withdrawal-${c_coin["name"]}">
    <input type="text" inputmode="numeric" maxlength="1" class="digit-input-withdrawal digit-input-withdrawal-${c_coin["name"]}">
    <input type="text" inputmode="numeric" maxlength="1" class="digit-input-withdrawal digit-input-withdrawal-${c_coin["name"]}">
    <input type="text" inputmode="numeric" maxlength="1" class="digit-input-withdrawal digit-input-withdrawal-${c_coin["name"]}">
    <input type="text" inputmode="numeric" maxlength="1" class="digit-input-withdrawal digit-input-withdrawal-${c_coin["name"]}">
  </div>
</div>`:''}
                <div class="btn-red-modal noselect v2-withdraw-btn-${c_coin["name"]}" style="cursor:pointer" onclick="do_withdraw('${c_coin["name"]}')">Create</div>
            </form>
        </div>
    </div>
</div>`)
                    if(glob_mfa_active) setup_withdrawal_2fa(`digit-input-withdrawal-${c_coin["name"]}`)
                }
            }
        }
    }

    $("#overview-currencies").html(`
        <p class="aero-b1 greeting">Hi${user_email ? `, ${user_email}` : ''}</p>
        <div class="wallets-wrapper">
          ${wallets_html}
        </div>
        <div class="wallet-wrapper poh-wrapper">
          <div class="left-side-wallet">
            <p class="poh-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#F73737" d="M17 3.514C15.547 2.568 14.276 2.126 12.34 2c-1.817 1.766-1.756 5.36 0 7 .726-3.027 2.42-4.667 4.66-5.486ZM19.517 5.004C16.414 4.878 14 7.471 14 10c2.552-1.58 5.517-1.644 8-.38-.414-2.023-1.197-3.09-2.483-4.616ZM22 12.299c-1.782-1.832-5.282-1.649-7 .061 2.806.654 4.327 1.893 5.6 4.64.972-1.539 1.4-2.686 1.4-4.701ZM19 19.448c-.19-3.31-2.25-5.257-5-5.448 1.423 2.713 1.709 5.241.443 8 1.89-.564 2.975-1.103 4.557-2.552ZM11.643 22c1.749-1.829 1.87-4.793 0-7-.724 3.09-2.291 4.667-4.643 5.55 1.62 1.033 2.671 1.266 4.643 1.45ZM4.353 19C7.173 18.727 9 16.812 9 14c-1.75 1.438-4.707 1.625-7 .563.64 1.941 1.15 2.956 2.353 4.437ZM2.001 11.65c1.59 1.674 4.9 1.922 6.999 0-2.99-.682-4.742-2.4-5.536-4.65-.89 1.302-1.491 3.1-1.463 4.65ZM5 4.62c.443 3.311 2.089 5.104 5 5.38-1.47-2.648-1.582-5.172-.506-8C7.405 2.552 6.3 3.312 5 4.62Z"/></svg>
              <span class="aero-b4">POH Rent Wallet (CLORE)</span>
            </p>
            <div class="poh-totals">
               <p class="total-wrapper">
                <span class="total-title aero-caption">Total holding</span>
                <span class="total-value aero-b3">${poh.balance?.total ? toFixed(poh.balance.total) : 0} CLORE</span>
              </p>
              <p class="total-wrapper">
                <span class="total-title aero-caption total-title-with-svg">
                  Total reward calculation
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none"><path fill="#46CA93" d="M8.195 5.362a.667.667 0 0 1 .88-.056l.063.056 4 4 .055.062.036.052.036.064.011.024.018.044.022.072.006.036.007.04.003.038.001.04-.001.038-.004.04-.005.04-.007.034-.022.072-.018.044-.046.088-.043.06-.05.054-.062.056-.051.036-.064.036-.024.011-.045.018-.072.021-.035.007-.04.007-.038.002-.04.002h-8a.667.667 0 0 1-.522-1.082l.051-.056 4-4Z"/></svg>
                </span>
                <span class="total-value aero-b3">${poh.balance?.reward_amount ? toFixed(poh.balance.reward_amount) : 0} CLORE</span>
              </p>
              <p class="total-wrapper">
                <span class="total-title aero-caption">Total borrowed</span>
                <span class="total-value aero-b3">${poh.balance?.offers?.['rented_amount'] ? toFixed(poh.balance.offers['rented_amount']) : 0} CLORE</span>
              </p>
              <p class="total-wrapper">
                <span class="total-title aero-caption">Total rented</span>
                <span class="total-value aero-b3">${poh.balance?.offers?.['leased_amount'] ? toFixed(poh.balance.offers['leased_amount']) : 0} CLORE</span>
              </p>
            </div>
          </div>
          <div class="right-side-wallet">
            <a class="aero-btn-secondary" href="https://clore.ai/marketplace#proof-of-holding">About POH</a>
            <a class="aero-btn-primary" href="https://clore.ai/poh-marketplace">POH Rent</a>
          </div>
        </div>
    `)

    //console.log("html_code",htmlcode)
    if(ui_version==1){
        $("#currencies").html((allow_fiat?fiat_code:'') + (allow_fiat?fiat_earn_code:'') + htmlcode);
    }else if(ui_version==2){
        $(".balance__cnt").html(htmlcode_v2)
        $(".v2-acc-body-hidden").css("display","initial")
        $('.open-modal').on('click', function () {
            var attr = $(this).attr('data-val');
            if(attr=='add-ssh-key'){
                document.getElementById("new-ssh-key").value = ''
                clear_beautiful_alert('#ak-alert')
            }else if(attr=="add-api-key" && !add_api_key_working){
                add_api_key_working=true
                $(".add_api_key_btn_v2").html(`<i class="fa-solid fa-circle-notch fa-spin"></i>`)
                api_create()
            }else if(attr=="save-dockerhub"){
                save_dockerhub_login()
            }else if(attr.substring(0,9)=="withdraw-"){
                clear_2FA(`.digit-input-withdrawal-${attr.substring(9)}`)
            }
            var modal = $('#' + attr);
            modal.removeClass('out');
            modal.fadeIn();
        });
        $('.close').on('click', function () {
            var prt = $(this).parents('.modal');
            prt.addClass('out')
            setTimeout(function () {
                prt.fadeOut();
            }, 20);
        });
    }

    render_fiat_vat()
    for(let c=0;c<currencies.length;c++){
        let c_coin=currencies[c]
        if(c_coin["name"]=="usd" || c_coin["name"]=="usd-earnings"){

        }else{
            if(document.getElementById("deposit-qr-"+c_coin["name"])){
                let qrcode = new QRCode(document.getElementById("deposit-qr-"+c_coin["name"]), {
                    text: (c_coin["name"].toLowerCase()=="bitcoin")?(`bitcoin:${c_coin["deposit"]}`):(`${c_coin["name"].toLowerCase()}:${c_coin["deposit"]}`),
                    width: 200,
                    height: 200,
                    colorDark : "#000000",
                    colorLight : "#e6e6e6",
                    correctLevel : QRCode.CorrectLevel.H
                });
            }else{
                let loop_cnt=0
                let intie = setInterval(function(){
                    console.log("LOOPING",c_coin)
                    loop_cnt++
                    if(document.getElementById("deposit-qr-"+c_coin["name"])){
                        clearInterval(intie)
                        try{
                            let qrcode = new QRCode(document.getElementById("deposit-qr-"+c_coin["name"]), {
                                text: (c_coin["name"].toLowerCase()=="bitcoin")?(`bitcoin:${c_coin["deposit"]}`):``,
                                width: 200,
                                height: 200,
                                colorDark : "#000000",
                                colorLight : "#e6e6e6",
                                correctLevel : QRCode.CorrectLevel.H
                            });
                        }catch(e){}
                    }else if(loop_cnt>60){
                        clearInterval(intie)
                    }
                }, 333)
            }
        }
    }
}

function poh_get_fee(coin, clore_blockchain_balances, order_type) {
    //console.log(coin,clore_blockchain_balances,order_type)
    if (PoH_info['rates'][coin]) {
        const cs = PoH_info['rates'][coin];
        let category = '0';
        const cs_keys = Object.keys(cs);
        for (let i = 0; i < cs_keys.length; i++) {
            let c_key = cs_keys[i];
            if (
              clore_blockchain_balances >= parseInt(c_key) &&
              clore_blockchain_balances >= parseInt(category)
            )
                category = c_key;
        }
        if (category !== '0') {
            let c_cat = cs[category];
            if (c_cat[order_type]) {
                return c_cat[order_type];
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    } else {
        return 0;
    }
}

const is24Hours = (start, finish) => {
    const startDate = dayjs(start);
    const finishDate = dayjs(finish);
    return finishDate.diff(startDate, 'hour') === 24;
};

function render_statistics (orders, period = "last-24h") {
    let per_day_total_spending_btc = 0;
    let per_day_total_spending_clore = 0;
    let order_count = 0;

    const today = new Date();
    const date30DaysAgo = dayjs().subtract(30, 'day').startOf('day').toISOString()
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);

    const date24Hours = new Date(today);
    date24Hours.setHours(today.getHours() - 24);

    let defaultStartDate = today;
    let defaultEndDate = today;

    function set_btns_callback (value, selectedDates = []) {
        let isRandom = false;
        
        if (selectedDates.length) {
            check_available_periods(selectedDates[0], selectedDates[1], value);
            isRandom = true
        } else {
            check_available_periods(defaultStartDate, defaultEndDate, value);
        }

        $("#date-picker-btn-left").prop("onclick", null).off('click');
        $("#date-picker-btn-left").click(function() {
            handle_change_selected_days(-value);
        });

        $("#date-picker-btn-right").prop("onclick", null).off('click');
        $("#date-picker-btn-right").click(function() {
            handle_change_selected_days(value, isRandom);
        });
    }

    switch (period) {
        case 'last-24h':
            defaultStartDate = date24Hours;
            defaultEndDate = today;
            set_btns_callback(1)
            break;
        case 'month':
            defaultStartDate = date30DaysAgo;
            defaultEndDate = today;
            break;
        case 'week':
            defaultStartDate = weekAgo;
            defaultEndDate = today;
            set_btns_callback(7)
            break;
        default:
            defaultStartDate = today;
            defaultEndDate = today;
            break;
    }

    function getDisplayValue(start, end, instance) {
        const formattedStartDay = instance.formatDate(start, "j");
        const formattedStartMonth = instance.formatDate(start, "M");
        const formattedEndDay = instance.formatDate(end, "j");
        const formattedEndMonth = instance.formatDate(end, "M");
        const formattedYear = instance.formatDate(start, "Y");


        if (start.getTime() === end.getTime()) {
            return `${formattedStartDay} ${formattedStartMonth}, ${formattedYear}`;
        } else if (formattedStartMonth === formattedEndMonth) {
            return `${formattedStartDay}-${formattedEndDay} ${formattedStartMonth}, ${formattedYear}`;
        } else {
            return `${formattedStartDay} ${formattedStartMonth} - ${formattedEndDay} ${formattedEndMonth}, ${formattedYear}`;
        }
    }

    async function checkLast24h(selectedDates, instance) {
        const { timestamp_start, timestamp_finish } = formatFiltersForLast24h();

        instance.altInput.value = getDisplayValue(
            selectedDates[0],
            selectedDates[1] || selectedDates[0],
            instance
        );

        await render_chart({
            timestamp_start,
            timestamp_finish
        });
    }

    async function checkDateRange(selectedDates, dateStr, instance) {
        instance.altInput.value = getDisplayValue(
            selectedDates[0],
            selectedDates[1] || selectedDates[0],
            instance
        );

        if (dateStr.includes('to')) {
            await render_chart(formatFiltersForRange(dateStr));
        } else {
            await render_chart(formatFiltersForToday(dateStr));
        }
    }

    const flatpickrInstance = flatpickr("#date-picker-btn", {
        mode: "range",
        altInput: true,
        dateFormat: "Y-m-d",
        locale: {
            firstDayOfWeek: 1,
            weekdays: {
                shorthand: ['S', 'M', 'T', 'W', 'T', 'F', 'S'], // Однобуквенные обозначения дней
                longhand: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] // Полные названия
            }
        },
        monthSelectorType: "static",
        static: true,
        defaultDate: [defaultStartDate, defaultEndDate],
        maxDate: today,
        minDate: date30DaysAgo,
        onDayCreate: function(dObj, dStr, fp, dayElem) {
            const date = dayElem.dateObj;
            const day = date.getDay();
            if (day === 6 || day === 0) {
                dayElem.classList.add('weekend');
            }
        },
        onReady: async function (selectedDates, dateStr, instance) {
            if (selectedDates.length > 0) {
                if (is24Hours(selectedDates[0], selectedDates[1])) {
                    await checkLast24h(selectedDates, instance);
                } else {
                    await checkDateRange(selectedDates, dateStr, instance);
                }
            }
        },
        onChange: async function (selectedDates, dateStr, instance) {
            if (selectedDates.length > 0) {
                await checkDateRange(selectedDates, dateStr, instance);

                document.querySelectorAll('.period-btn').forEach(btn => {
                    btn.classList.remove('select-period-btn');
                });
            }
        },
        onClose: async function (selectedDates, dateStr, instance) {
            if (selectedDates.length === 1) {
                selectedDates[1] = selectedDates[0];
                const calendarDays = instance.calendarContainer.querySelectorAll(".flatpickr-day");
                calendarDays.forEach(day => {
                    day.classList.remove("startRange", "endRange", "inRange");
                });
                const dayToSelect = instance.calendarContainer.querySelector(`[aria-label="${instance.formatDate(selectedDates[0], 'F j, Y')}"]`);
                if (dayToSelect) {
                    dayToSelect.classList.add("selected");
                }
                instance.altInput.value = getDisplayValue(selectedDates[0], selectedDates[0], instance);
            }
            set_btns_callback(1, selectedDates)
        }
    });

    function check_available_periods (startDate, endDate, value) {
        const start = dayjs(startDate).subtract(Math.abs(value), 'day').toDate();
        const end = dayjs(endDate).add(Math.abs(value), 'day').toDate();

        const minDate = dayjs().subtract(30, 'day').startOf('day');
        const maxDate = dayjs().endOf('day');

        $('#date-picker-btn-left').prop('disabled', false);
        $('#date-picker-btn-right').prop('disabled', false);

        if (dayjs(start).isBefore(minDate)) {
            $('#date-picker-btn-left').prop('disabled', true);
        }
        if (dayjs(end).isAfter(maxDate)) {
            $('#date-picker-btn-right').prop('disabled', true);
        }
    }

    function handle_change_selected_days (value, isRandom = false) {
        const selectedDates = flatpickrInstance.selectedDates;
        let [startDate, endDate] = selectedDates;

        if (value === 1) {
            if (isRandom) {
                startDate = dayjs(endDate).add(1, 'day').startOf('day').toDate();
            } else {
                startDate = dayjs(startDate).add(1, 'day').startOf('day').toDate();
            }
                endDate = startDate;

        } else if (value === -1) {
            startDate = dayjs(startDate).subtract(1, 'day').startOf('day').toDate();
            endDate = startDate;
        } else  {
            startDate = dayjs(startDate).add(value, 'day').startOf('day').toDate();
            endDate = dayjs(endDate).add(value, 'day').toDate();
        }

        check_available_periods(startDate, endDate, value)
        flatpickrInstance.setDate([startDate, endDate], true);
    }

    //TODO: удалить моки
    // const test = {
    //   error: false,
    //   PoH_active: true,
    //   PoH_balance: 100,
    //   PoH_rates: { rate1: 0.1, rate2: 0.2 },
    //   orders: [
    //     {
    //       id: 1,
    //       mon_container: 0,
    //       instance_status: 'running',
    //       expired: false,
    //       currency: 'bitcoin',
    //       order_end: null,
    //       online: true,
    //       price: 0.0001,
    //       oc_price: 0.00005,
    //       spot: true,
    //       paused: false,
    //       specs: {
    //         ram: 8192,
    //         backend_version: 3,
    //         cpu: '4 cores',
    //         disk: '50GB',
    //         gpu: 'NVIDIA GTX 1080',
    //         oc: true,
    //       },
    //       tcp_ports: ['80:8080'],
    //       pub_cluster: ['1.2.3.4'],
    //       ct: 1625097600,
    //       p: 1,
    //       secure_cloud: false,
    //       auto_login: '@(URL)',
    //       si: 456,
    //       spend: 0.0015,
    //       creation_fee: 0.0001,
    //       mrl: 7200,
    //       http_port: 80,
    //       image: 'Ubuntu 20.04',
    //       my_past_rating: 4,
    //       allowed_orders_features: ['reset'],
    //     },
    //     {
    //       id: 2,
    //       mon_container: 1,
    //       instance_status: 'paused',
    //       expired: true,
    //       currency: 'CLORE-Blockchain',
    //       order_end: null,
    //       online: true,
    //       price: 50,
    //       oc_price: 25,
    //       spot: false,
    //       paused: true,
    //       specs: {
    //         ram: 8192,
    //         backend_version: 3,
    //         cpu: '4 cores',
    //         disk: '50GB',
    //         gpu: 'NVIDIA GTX 1080',
    //         oc: true,
    //       },
    //       tcp_ports: ['80:8080'],
    //       pub_cluster: ['1.2.3.4'],
    //       ct: 1625097600,
    //       p: 1,
    //       secure_cloud: false,
    //       auto_login: '@(URL)',
    //       si: 456,
    //       spend: 0.0015,
    //       creation_fee: 0.0001,
    //       mrl: 7200,
    //       http_port: 80,
    //       image: 'Ubuntu 20.04',
    //       my_past_rating: 4,
    //       allowed_orders_features: ['reset'],
    //     },
    //     {
    //       id: 3,
    //       mon_container: 0,
    //       instance_status: 'running',
    //       expired: false,
    //       currency: 'bitcoin',
    //       order_end: null,
    //       online: true,
    //       price: 0.0002,
    //       oc_price: 0.0001,
    //       spot: false,
    //       paused: false,
    //       specs: {
    //         ram: 8192,
    //         backend_version: 3,
    //         cpu: '4 cores',
    //         disk: '50GB',
    //         gpu: 'NVIDIA GTX 1080',
    //         oc: true,
    //       },
    //       tcp_ports: ['80:8080'],
    //       pub_cluster: ['1.2.3.4'],
    //       ct: 1625097600,
    //       p: 1,
    //       secure_cloud: false,
    //       auto_login: '@(URL)',
    //       si: 456,
    //       spend: 0.0015,
    //       creation_fee: 0.0001,
    //       mrl: 7200,
    //       http_port: 80,
    //       image: 'Ubuntu 20.04',
    //       my_past_rating: 4,
    //       allowed_orders_features: ['reset'],
    //     },
    //   ],
    //   allowed_features: ['reset'],
    //   http_endpoint_by_proxy: 'http://example.com',
    //   eo: true,
    //   ol: 32,
    // };
    // orders = test;

    $(".active-orders").css("display", "flex")
    $(".statistics-wrapper").css("display", "flex")

    if (orders['ol']) {
        $("#order-count-total").html(`/ ${orders['ol']}`)
    }

    if (orders['orders'] && orders['orders'].length) {
        let poh_discount_spot = poh_get_fee('bitcoin', orders['PoH_balance'], 'spot');
        let poh_discount_on_demand = poh_get_fee('bitcoin', orders['PoH_balance'], 'on-demand');
        for (let i = 0; i < orders['orders'].length; i++) {
            if (!orders['orders'][i]['expired']) {
                order_count++;

                try {
                    let h_order = orders['orders'][i];
                    if (
                      h_order['currency'] === 'bitcoin' &&
                      !Object.keys(h_order).includes('order_end') &&
                      h_order['online'] &&
                      h_order['price']
                    ) {
                        let poh_discount_percent = h_order['spot'] ? poh_discount_spot : poh_discount_on_demand;
                        per_day_total_spending_btc +=
                          h_order['price'] * (1 - poh_discount_percent / 100) +
                          (h_order['oc_price'] ? h_order['oc_price'] : 0);
                    } else if (
                      h_order['currency'] === 'CLORE-Blockchain' &&
                      !Object.keys(h_order).includes('order_end') &&
                      h_order['online'] &&
                      h_order['price']
                    ) {
                        let poh_discount_percent = h_order['spot'] ? poh_discount_spot : poh_discount_on_demand;
                        per_day_total_spending_clore +=
                          h_order['price'] * (1 - poh_discount_percent / 100) +
                          (h_order['oc_price'] ? h_order['oc_price'] : 0);
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        }

        $("#order-count").html(order_count)
        $("#btc-total-cost").html(per_day_total_spending_btc.toFixed(8))
        $("#core-total-cost").html(per_day_total_spending_clore.toFixed(2))
    }
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function handle_paypal_payout_email(){
    let c_email_val = $("#paypal-withdraw-email").val()
    if(emailRegex.test(c_email_val)){
        $(".withdraw-paypal-email").removeClass("rb-cp");
        $(".pp-acc-mail").removeClass("rb-c2")
    }else{
        $(".withdraw-paypal-email").addClass("rb-cp");
        $(".pp-acc-mail").addClass("rb-c2")
    }
}
function paypal_do_withdrawal(){
    let paypal_email = $("#paypal-withdraw-email").val()
    if(emailRegex.test(paypal_email)){
        $(".paypal-payout-verify").css("display","flex")
        $(".ppv-initial").css("display","initial")
        $("#ppv-mb").val(paypal_email)
    }else{
        $(".payment-processing").css("display", "flex");
                    $(".payment-processing").html(`<div class="payment-processing-window">
            <div class="topbar"><i class="fa-solid fa-xmark" onclick="$('.payment-processing').css('display','none');"></i></div>
            <div class="dinfo-rest">
                <span class="payment-failed" style="color: orange;">
                    <i class="fa-solid fa-triangle-exclamation"></i> ${paypal_email.length==0?`Your PayPal email can't be empty`:`You must provide a valid email address`}
                </span>
            </div>
        </div>`)
    }
}
async function paypal_confirm_payout(){
    $('.paypal-payout-verify').css('display','none')
    if($("#stripe-withdraw-amount").val()<20){

        return;
    }
    let cerr=''
    let apires = await call_api("paypal/payout", {amount:parseFloat($("#stripe-withdraw-amount").val()),email:$("#paypal-withdraw-email").val()}).catch(function (err) {
      cerr = err;
    });
    if(cerr){
        beautiful_alert(".stripe-withdrawal-err", `Connection error`,false,6)
    }else if(apires.status){
        beautiful_alert(".stripe-withdrawal-err", `Your payout is on its way`,"success",6);
        setTimeout(function(){
            location.reload()
        },1000)
    }else if(apires.error=="not_connected"){
        beautiful_alert(".stripe-withdrawal-err", `Please firstly setup stripe connect`,false,6);
    }else if(apires.error=="balance_too_low" || apires.error=="bad_amount"){
        beautiful_alert(".stripe-withdrawal-err", `Your balance is too low`,false,6);
    }else if(apires.error=="limit_rr"){
        beautiful_alert(".stripe-withdrawal-err", `Maximum payout amount is ${(apires.max_usd_payout/100).toFixed(2)} USD. To request increase you can contact us`,false,6);
    }else if(apires.error=="rate_limited"){
        beautiful_alert(".stripe-withdrawal-err", `Your can request one payout in 24 hours`,false,6);
    }else if(apires.error=="no_tax_id"){
        beautiful_alert(".stripe-withdrawal-err", `Please fill your VAT/TAX ID`,false,6);
    }else{
        beautiful_alert(".stripe-withdrawal-err", `Database error`,false,6);
    }
}
function redeem_giftcode(){
    $(".gift-code-write").css("display", "initial");
    $(".gift-code-complete").css("display","none");
    $(".usd-redeem").css("display","flex");
}
function close_redeem_gift(){
    if(c_apply_completed){
        location.reload()
    }else{
        $(".usd-redeem").css("display","none");
    }
}
function show_confetti(){
    $("#confetti-canvas").css("display","initial");
    const canvas = document.getElementById("confetti-canvas");
    const jsConfetti = new JSConfetti({ canvas });
    jsConfetti.addConfetti({
      emojis: ["🎁", "⚡️", "💥", "✨", "🚀", "💰"],
    });
    setTimeout(function(){
        $("#confetti-canvas").css("display", "none");
    },2500)
}
var c_apply_completed=false
async function do_redeem_code(){
    var rcode = $("#redeem-input-element").val();
    if(!rcode){
        beautiful_alert(".redeem-alert", `Invalid gift code`, false, 6);
    }else{
        let cerr=''
        let apires = await call_api("credit/redeem_code", {code:rcode}).catch(function (err) {
          cerr = err;
        });
        if(cerr){
            beautiful_alert(".redeem-alert", `Connection error`, false, 6);
        }else if(apires.error=="invalid_code"){
            beautiful_alert(".redeem-alert", `Invalid code, please recheck`, false, 6);
        }else if(apires.status){
            $(".gift-code-write").css("display","none");
            $(".applied-amount").html(`<span>${(apires["amount"]/100).toFixed(2)} USD</span>`);
            $(".gift-code-complete").css("display","flex");
            c_apply_completed=true
            show_confetti()
        }else{
            beautiful_alert(".redeem-alert", `Database error`, false, 6);
        }
    }
}
function usd_provider_give(){
    $(".gc-initial").css("display","initial");
    $(".gc-complete").css("display","none");
    $(".usd-gifts").css("display","flex");
}
function close_gift(){
    $(".usd-gifts").css("display","none");
}
function handle_give_amount(){
    var ga=$("#give-amount").val(),ok=true,nga
    if(isNaN(ga)){
        ok=false
    }else if(parseFloat(ga)<0 && ga!=''){
        nga=5
    }else if(parseFloat(ga)<5){
        ok=false
    }else if(ga.toString().split('.').length>1){
        if(ga.toString().split('.')[1].length>2) nga=parseFloat(ga).toFixed(2)
    }
    //console.log(ok)
    if(nga) $("#give-amount").val(nga)
}
function render_fiat_vat(){
    $(".fiat-vat-rate-render").html(customer_vat_rate==0?'':`<div class="ifall-div">
        <div class="vat-i-box"><span>VAT(${customer_vat_rate.toFixed(0)}%): <b>${parseFloat((parseInt($("#card-add-amount").val())*(customer_vat_rate/100)).toFixed(2))}$</b></span></div>
        <div class="vat-i-box"><span>Total: <b>${parseFloat((parseInt($("#card-add-amount").val())*((100+customer_vat_rate)/100)).toFixed(2))}$</b></span></div>
    </div>`);
    if(customer_vat_rate==0){
        $(".fiat-vat-rate-render").css("display","none");
    }else{
        $(".fiat-vat-rate-render").css("display", "flex");
    }
}
function validate_wia(coin,fee,max){
    let cval = $("#wia-"+coin).val()
    if(cval.toString().includes('.')) if(cval.split('.')[1].length>8) cval=parseFloat(cval).toFixed(8)
    if(!(cval==0 && $("#wia-"+coin).val()=='0')) $("#wia-"+coin).val(cval)
    if(cval==0){
        $(`.frc-${coin}`).html('0.00000000')
    }else if(parseFloat(cval)<0.0001 && coin=="bitcoin"){
        $(`.frc-${coin}`).html((0.0001-fee).toFixed(8))
        $("#wia-"+coin).val(0.0001.toFixed(8))
    }else if(parseFloat(cval)<0.002 && coin=="CLORE-Blockchain"){
        $(`.frc-${coin}`).html((0.002-fee).toFixed(8))
        $("#wia-"+coin).val(0.002.toFixed(8))
    }else if(parseFloat(cval)>max){
        $("#wia-"+coin).val(max.toFixed(8))
        $(`.frc-${coin}`).html((parseFloat(max)-fee).toFixed(8))
    }else{
        $(`.frc-${coin}`).html((parseFloat(cval)-fee).toFixed(8))
    }
}
var ln_vat_id_t=0,gc_vat_id='',vat_countries=['at','be','bg','hr','cy','cz','dk','ee','fi','fr','de','gr','hu','ie','it','lv','lt','lu','mt','nl','no','pl','ro','sk','si','es','se']
function handle_new_vat_id(){
    if(vat_countries.includes($("#country").countrySelect("getSelectedCountryData")["iso2"])){
        $(".vat-id-label").html(`VAT/TAX ID (optional) <i class="fa-solid fa-cog fa-spin"></i>`)
    }else{
        $(".vat-id-label").html(`VAT/TAX ID (optional)`)
        return;
    }
    let clvt = Date.now(),ci_vat_id=$("#vat-id").val();
    if(!ci_vat_id) {
        $(".vat-id-label").html(`VAT/TAX ID (optional)`);
        return;
    }
    if(isNaN(ci_vat_id[0]) && isNaN(ci_vat_id[1])){
        let dic_country = ci_vat_id.substring(0,2).toLowerCase()
        //console.log(dic_country)
        if(vat_countries.includes(dic_country)){
            $("#country").countrySelect("selectCountry", dic_country);
        }
        ci_vat_id=ci_vat_id.substring(2)
    }
    ln_vat_id_t=clvt
    gc_vat_id=ci_vat_id
    setTimeout(async function(){
        if(ln_vat_id_t==clvt){
            let cerr=''
            let apires = await call_api("marketplace/validate_vat_id", {
              vat_id: ci_vat_id,
              country:$("#country").countrySelect("getSelectedCountryData")["iso2"]
            }).catch(function (err) {
              cerr = err;
            });
            if(cerr){
                //console.error('selhání')
                handle_new_vat_id()
            }else{
                $(".vat-id-label").html(`VAT/TAX ID (optional)`)
                if(apires["status"]=="ok"){
                    if(apires["valid"]){
                        $("#company").val(apires["company"]);
                        clear_beautiful_alert(".bi-alert");
                        $(".vat-id-label").html(`<span style="color:lime;">VAT/TAX ID (optional) <i class="fa-solid fa-circle-check"></i></span>`)
                    }else{
                        beautiful_alert(".bi-alert",`Invalid VAT/TAX ID`);
                    }
                }else{
                    if(apires["error"]=="europa.eu api error"){
                        beautiful_alert(".bi-alert",`europa.eu API not working, please try again later`);
                    }else{
                        handle_new_vat_id()
                    }
                }
                console.log(apires)
            }
        }
    },1750)
}
function change_country(){
    handle_new_vat_id()
}
async function add_card(){
    let cerr=''
    let apires = await call_api("stripe/add_card", {}).catch(function (err) {
      cerr = err;
    });
    if(cerr){
        setTimeout(function(){
            add_card()
        },750)
    }else{
        if(apires["error"]){
            if(apires["error"]=="bad-ip"){
                alert("This service is blocked when using a VPN")
            }else if(apires["error"]=="reached_max_cards"){

            }else if(apires["error"]=="not_launched"){
                $(".payment-processing").css("display", "flex");
                $(".payment-processing")
                  .html(`<div class="payment-processing-window">
        <div class="topbar"><i class="fa-solid fa-xmark" onclick="$('.payment-processing').css('display','none');"></i></div>
        <div class="dinfo-rest">
            <span class="payment-failed" style="color: orange;">
                <i class="fa-solid fa-triangle-exclamation"></i> Card payments didn't launched yet, launch is expected on April 3 @ 21:00 UTC
            </span>
        </div>
    </div>`);
            }else{
                setTimeout(function(){
                    add_card()
                },750)
            }
        }else if(apires["url"]){
            location.replace(apires["url"])
        }else{
            setTimeout(function(){
                add_card()
            },750)
        }
    }
}
async function give_credit(isEarnings){
    var init_a = parseFloat($("#give-amount").val());
    if (init_a < 5) return;
    let cerr=''
    let apires = await call_api("credit/give",{from:isEarnings?`earnings`:`normal`, amount: init_a}).catch(function (err) {
      cerr = err;
    });
    if(cerr){
        beautiful_alert(".give-alert",`Connection error`, false, 6);
    }else if(apires.error=="balance_too_low"){
        beautiful_alert(".give-alert", `Not enough balance to generate gift code`, false, 6);
    }else if(apires.error=="limit_rr"){
        beautiful_alert(".give-alert", `Maximum gift code value is ${(apires.max_usd_payout/100).toFixed(2)} USD`, false, 6);
    }else if(apires.status){ //apires.credit_code is present
        gc_complete(apires.credit_code, init_a);
    }else{
        beautiful_alert(".give-alert", `Database error`, false, 6);
    }
    console.log(apires)
}
function gc_complete(code, amount){
    $("#give-code-s").val(code);
    $(".gcc-amount").html(`<span>${amount.toFixed(2)} USD</span>`);
    $(".gc-initial").css("display","none");
    $(".gc-complete").css("display","flex");
}
async function connect_stripe_payouts(){
    $(".connect-wait").css("display","flex");
    let cerr=''
    let apires = await call_api("stripe/setup_connect", {}).catch(function (err) {
      cerr = err;
    });
    if(cerr){
        beautiful_alert(".stripe-withdrawal-err", `Connection error`, false, 6);
        $(".connect-wait").css("display","none")
    }else if(apires.status && apires.url.url){
        location.replace(apires.url.url)
    }else if(apires.error=="connect_not_allowed"){
        beautiful_alert(".stripe-withdrawal-err", `Stripe connect is not allowed on your account, for more info email support@clore.ai`, false, 6);
        $(".connect-wait").css("display", "none");
    }
}
async function stripe_do_withdrawal(){
    if($("#stripe-withdraw-amount").val()<10){

        return;
    }
    let cerr=''
    let apires = await call_api("stripe/withdraw_connect", {amount:parseFloat($("#stripe-withdraw-amount").val())}).catch(function (err) {
      cerr = err;
    });
    if(cerr){
        beautiful_alert(".stripe-withdrawal-err", `Connection error`,false,6)
    }else if(apires.status){
        beautiful_alert(".stripe-withdrawal-err", `Your payout is on its way`,"success",6);
        setTimeout(function(){
            location.reload()
        },1000)
    }else if(apires.error=="not_connected"){
        beautiful_alert(".stripe-withdrawal-err", `Please firstly setup stripe connect`,false,6);
    }else if(apires.error=="balance_too_low" || apires.error=="bad_amount"){
        beautiful_alert(".stripe-withdrawal-err", `Your balance is too low`,false,6);
    }else if(apires.error=="limit_rr"){
        beautiful_alert(".stripe-withdrawal-err", `Maximum payout amount is ${(apires.max_usd_payout/100).toFixed(2)} USD. To request increase you can contact us`,false,6);
    }else if(apires.error=="rate_limited"){
        beautiful_alert(".stripe-withdrawal-err", `Your can request one payout in 24 hours`,false,6);
    }else if(apires.error=="no_tax_id"){
        beautiful_alert(".stripe-withdrawal-err", `Please fill your VAT/TAX ID`,false,6);
    }else{
        beautiful_alert(".stripe-withdrawal-err", `Database error`,false,6);
    }
}
function handle_usd_withdraw_amount(){
    var iw = $("#stripe-withdraw-amount").val();
    if(isNaN(iw)){
        iw=20
        $("#stripe-withdraw-amount").val(iw);
    }else if(iw!='' && parseFloat(iw)<0){
        iw=20
        $("#stripe-withdraw-amount").val(iw);
    }else if(iw!='' && parseFloat(iw)>350){
        $("#stripe-withdraw-amount").val(350);
    }else if(iw.includes('.')){
        if(iw.split('.')[1].toString().length>2) iw=parseFloat(iw).toFixed(2)
        $("#stripe-withdraw-amount").val(iw);
    }
    if(iw<20){
        $(".withdraw-usd-p").addClass("rb-cp");
        $(".cc-a-t2").addClass("rb-c2");
        $(".card-bal-fail2").css("display","inline-flex");
    }else{
        $(".withdraw-usd-p").removeClass("rb-cp");
        $(".cc-a-t2").removeClass("rb-c2");
        $(".card-bal-fail2").css("display","none");
    }
}
async function save_billing_info(){
    $(".bsb").html(`<span><i class="fa-solid fa-cog fa-spin"></i></span>`);
    let ci = $("#country").countrySelect("getSelectedCountryData");
    var input_data = {
      fn: $("#fname").val(),
      ln: $("#lname").val(),
      ad1: $("#address").val(),
      ad2: $("#address2").val(),
      city: $("#city").val(),
      zip: $("#zip-code").val(),
      company: $("#company").val(),
      "vat-id": $("#vat-id").val(),
      country: ci["iso2"]
    };
    if(!input_data["fn"]){
        beautiful_alert(".bi-alert", `First Name field can't be empty`);
        $(".bsb").html(`<span>Save</span>`);
        return;
    }
    if (!input_data["ln"]) {
      beautiful_alert(".bi-alert", `Last Name field can't be empty`);
      $(".bsb").html(`<span>Save</span>`);
      return;
    }
    if (!input_data["ad1"]) {
      beautiful_alert(".bi-alert", `Address field can't be empty`);
      $(".bsb").html(`<span>Save</span>`);
      return;
    }
    if (!input_data["city"]) {
      beautiful_alert(".bi-alert", `City field can't be empty`);
      $(".bsb").html(`<span>Save</span>`);
      return;
    }
    if (!input_data["zip"]) {
      beautiful_alert(".bi-alert", `Zip/Postal code field can't be empty`);
      $(".bsb").html(`<span>Save</span>`);
      return;
    }
    if(isNaN(input_data["vat-id"][0]) && isNaN(input_data["vat-id"][1])){
        input_data["vat-id"]=input_data["vat-id"].substring(2)
    }
    //input_data["vat-id"]=parseInt(input_data["vat-id"])
    //console.log(input_data)
    let cerr=''
    let apires = await call_api("marketplace/save_billing_info", {info:input_data}).catch(function (err) {
      cerr = err;
    });
    if(cerr){
        beautiful_alert(".bi-alert", `Connection error`);
        $(".bsb").html(`<span>Save</span>`);
    }else{
        if(apires["error"]){
            if(apires["error"]=="bad-country"){
                beautiful_alert(".bi-alert", `Invalid VAT/TAX ID`);
                $(".bsb").html(`<span>Save</span>`);
            }else if(apires["error"]=="bad-company-name"){
                if($("#company").val()==apires["n"]){
                    save_billing_info()
                }else{
                    beautiful_alert(".bi-alert",`Bad company name, expected: <b id="ecn__x"></b>`);
                    $(".bsb").html(`<span>Save</span>`);
                    document.getElementById("ecn__x").innerText=apires["n"].toString();
                }
            }else if(apires["error"]=="europa.eu api error"){
                beautiful_alert(".bi-alert",`europa.eu API not working, please try again later`);
                $(".bsb").html(`<span>Save</span>`);
            }else{
                beautiful_alert(".bi-alert",`Database error`);
                $(".bsb").html(`<span>Save</span>`);
            }
        }else if(apires["status"]){
            $(".bsb").html(`<span>Save</span>`);
            cbi["country"]=input_data["country"]
            cbi["vat_id"]=input_data["vat-id"]
            calculate_vat_rate()
            render_fiat_vat()
            beautiful_alert(".bi-alert", `<i class="fa-solid fa-check"></i> Billing informations updated`,"success");
        }
    }
}
function set_wa(balance,fee,coin){
    $("#wia-"+coin).val(balance)
    document.getElementById("wia-"+coin).dispatchEvent(new Event('input'));
}
function deposit_toggle(name,disabled){
    if(disabled) return;
    let obs = (document.getElementById(`deposit-${name}`).style.display=='')?"none":document.getElementById(`deposit-${name}`).style.display
    document.getElementById(`withdraw-${name}`).style.display="none"
    if(obs=="none"){
        document.getElementById(`deposit-${name}`).style.display="flex"
        document.getElementById(`show-bal-${name}`).style.display="none"
    }else{
        document.getElementById(`deposit-${name}`).style.display="none"
        document.getElementById(`show-bal-${name}`).style.display="flex"
    }
}
function withdrawal_toggle(name){
    let obs = (document.getElementById(`withdraw-${name}`).style.display=='')?"none":document.getElementById(`withdraw-${name}`).style.display
    document.getElementById(`deposit-${name}`).style.display="none"
    if(obs=="none"){
        document.getElementById(`withdraw-${name}`).style.display="flex"
        document.getElementById(`show-bal-${name}`).style.display="none"
    }else{
        document.getElementById(`withdraw-${name}`).style.display="none"
        document.getElementById(`show-bal-${name}`).style.display="flex"
    }
}
var enabled_do_withdrawal=true
async function do_withdraw(coin){
    if(!enabled_do_withdrawal) return;
    enabled_do_withdrawal=false
    $(ui_version==2?`.v2-withdraw-btn-${coin}`:`.wth-btn-${coin}`).html(`<i class="fa-solid fa-cog fa-spin"></i>`)
    if(parseFloat($(`.frc-${coin}`).html())==0){
        console.log("cc",coin)
        aero_alert(`#withdraw-alert-${coin}`,`Can't withdraw 0 ${(coin=="bitcoin")?"BTC":"CLORE"}`, "danger", 5000)
        enabled_do_withdrawal=true
        if(ui_version==2){
            $(`.v2-withdraw-btn-${coin}`).html(`Create`)
        }else{
            $(`.wth-btn-${coin}`).html(`<span><i class="fa-regular fa-paper-plane"></i> Send</span>`)
        }
    }else if(WAValidator.validate($(`#ywa-${coin}`).val(),coin=="bitcoin"?"bitcoin":"auroracoin")){
        let cerr=''
        let mfa_code = ''
        if(glob_mfa_active){
            mfa_code=get_2FA(`.digit-input-withdrawal-${coin}`)
            if(mfa_code.length!=6){
                aero_alert(`#withdraw-alert-${coin}`, "Invalid 2FA CODE", "danger")
                if (ui_version == 2) {
                    $(`.v2-withdraw-btn-${coin}`).html(`Create`)
                } else {
                    $(`.wth-btn-${coin}`).html(`<span><i class="fa-regular fa-paper-plane"></i> Send</span>`)
                }
                enabled_do_withdrawal=true
                return
            }
        }
        let apires=await call_api("withdraw",{amount:parseFloat($(`.frc-${coin}`).html()),address:$(`#ywa-${coin}`).val(),coin, mfa_code}).catch(function (err) {cerr=err})
        if(cerr){
            aero_alert(`#withdraw-alert-${coin}`,"Connection error", "danger", 5000)
            if (ui_version == 2) {
                $(`.v2-withdraw-btn-${coin}`).html(`Create`)
            } else {
                $(`.wth-btn-${coin}`).html(`<span><i class="fa-regular fa-paper-plane"></i> Send</span>`)
            }
            enabled_do_withdrawal=true
        }else if(apires["error"]){
            if(apires["error"]=="invalid_2fa"){
                aero_alert(`#withdraw-alert-${coin}`,"Invalid 2FA CODE", "danger", 5000)
            }else if(apires["error"]=="amount_too_high"){
                aero_alert(`#withdraw-alert-${coin}`,`Maximum withdrawal amount is ${apires["max_withdraw_amount"]}`, "danger", 5000)
            }else{
                aero_alert(`#withdraw-alert-${coin}`,"Database error", "danger", 5000)
            }
            if(ui_version==2){
                $(`.v2-withdraw-btn-${coin}`).html(`Create`)
            }else{
                $(`.wth-btn-${coin}`).html(`<span><i class="fa-regular fa-paper-plane"></i> Send</span>`)
            }
            enabled_do_withdrawal=true
        }else{
            location.reload()
        }
    }else{
        aero_alert(`#withdraw-alert-${coin}`,"Invalid withdrawal address", "danger", 5000)
        if (ui_version == 2) {
            $(`.v2-withdraw-btn-${coin}`).html(`Create`)
        } else {
            $(`.wth-btn-${coin}`).html(`<span><i class="fa-regular fa-paper-plane"></i> Send</span>`)
        }
        enabled_do_withdrawal=true
    }
}
function cptxt(name) {
    var copyText = document.getElementById(name);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
  }
function first_uppercase(txt){
    return txt.substring(0,1).toUpperCase()+txt.substring(1)
}
function open_tx_details(identifier){
    let open = document.getElementById(`oc-${identifier}`).innerHTML.includes(`<i class="fa-solid fa-circle-chevron-down"></i>`)
    console.log("f", open, `oc-${identifier}`,document.getElementById(`oc-${identifier}`).innerHTML);
    if(open){
        $(`#oc-${identifier}`).html(`<i class="fa-solid fa-circle-chevron-up"></i>`)
        $(`#details-${identifier}`).css("display","none")
    }else{
        //console.log("top")
        $(`#oc-${identifier}`).html(`<i class="fa-solid fa-circle-chevron-down"></i>`)
        $(`#details-${identifier}`).css("display","initial")
    }
}
function update_tx_render_page(page) {
    renderTransactions(global_transactions_var["txs"], global_transactions_var["currency_explorer"]);
    render_transactions(true, global_transactions_var["txs"], global_transactions_var["currency_explorer"], {
        "per_page": 15,
        "page": page
    })
}
function render_transactions(init, txs, explorer, v2_config) {
    let txhtml='';
    let page=0;
    let per_page=999;

    if (v2_config) {
        per_page=v2_config["per_page"];
        page=v2_config["page"];
        last_pg_no=0;

        if (ui_version==2 && txs.length > per_page) {
            let page_count = Math.ceil(txs.length/per_page);
            let pages_inner = '';

            if (page_count > 5) {
                for (var i=1; i < page_count-1; i++) {
                    if (i==page-1 || i==page || i==page+1) {
                        if (pages_inner=='' && i>1){
                            pages_inner+='<li>-</li>'
                        }
                        pages_inner+=`<li${page==i?` class="page_v2_selected"`:''} onclick="update_tx_render_page(${i})"><a>${i+1}</a></li>`
                        last_pg_no=i+1
                    }
                }
            } else {
                for (var i=1; i < page_count-1; i++) {
                    pages_inner+=`<li${page==i?` class="page_v2_selected"`:''} onclick="update_tx_render_page(${i})"><a>${i+1}</a></li>`
                    last_pg_no=i+1
                }
            }

            $(".pagination-block").html(`
                <ul>
                    <li>
                        <a${page==0?` class="page_v2_selected"`:''} onclick="update_tx_render_page(0)">1</a>
                    </li>
                    ${pages_inner}${last_pg_no<page_count-1?`<li>-</li>`:``}
                    <li>
                        <a${page==page_count-1?` class="page_v2_selected"`:''} onclick="update_tx_render_page(${page_count-1})">${page_count}</a>
                    </li>
                </ul>`)
        } else {
            $(".pagination-block").html('')
        }
    }

    let passing_pos=0;

    for (var i=txs.length-1; i >= 0; i--) {
        let ctx=txs[i];
        let can_render_v2=false;

        passing_pos++;

        if (passing_pos > page*per_page && passing_pos <= (page+1)*per_page){
            can_render_v2=true;
        }

        if (ui_version==2 && can_render_v2){
            let is_airdrop = ctx["txid"].substring(0,7)==`airdrop`;

            txhtml+=`<div class="accordion__block">
                        <div class="accordion__box link">
                            <div class="transactions__name${ctx["completed"]?``:' pending_tx_v2'}">
                                <strong>${ctx["completed"]?`Success`:'Pending'}</strong>
                                <span>${parse_receive_time(ctx, true)}</span>
                                <p>${ctx["amount"]>0?`+`:`-`} ${Math.abs((ctx["coin"]=="usd" || ctx["coin"]=="usd-earnings")?ctx["amount"]/100:ctx["amount"])} ${ctx["coin"]=="bitcoin"?"BTC":(ctx["coin"]=="CLORE-Blockchain"?"CLORE":((ctx["coin"]=="usd" || ctx["coin"]=="usd-earnings")?"USD":''))}</p>
                            </div>
                        </div>
                        <div class="submenu">
                            <div class="transactions__info">
                                <div class="transactions__flex">
                                    <div class="actions__title">
                                        <span>Type:</span>
                                        <span>${is_airdrop?`Airdrop Reward: <b>${ctx["txid"].includes("competition")?"Competition":(ctx["txid"].includes("points")?`points`:`PoH`)}</b>`:(ctx["txid"].includes("ref_")?`Referral earnings`:(first_uppercase(ctx["rgift"]?`Claimed gift code`:ctx["gift"]?`Create gift code`:ctx["type"]=="withdraw"?(ctx["coin"]=="usd-earnings" && !(ctx["gift"] || ctx["rgift"]) ?`Payout`:"withdrawal"):ctx["type"])))}</span>
                                    </div>
                                    <div class="actions__title completed-color">
                                        <span>Confirmations:</span>
                                        <span>${(ctx["confirming"] ? ctx["confirming"] : (ctx["completed"] ? "Completed" : "Soon Will Be Completed"))}</span>
                                    </div>
                                    <div class="actions__title">
                                        <span>Amount: </span>
                                        <span>${Math.abs((ctx["coin"]=="usd" || ctx["coin"]=="usd-earnings")?ctx["amount"]/100:ctx["amount"])} ${ctx["coin"]=="bitcoin"?"BTC":(ctx["coin"]=="CLORE-Blockchain"?"CLORE":((ctx["coin"]=="usd" || ctx["coin"]=="usd-earnings")?"USD":''))}</span>
                                    </div>
                                    <div class="actions__title received-color">
                                        <span>Time ${ctx["type"]=="withdraw"?`requested`:`received`}: </span>
                                        <span>${parse_receive_time(ctx,false)}</span>
                                    </div>
                                    <div class="actions__hash"${(ctx["coin"]=="usd" || ctx["coin"]=="usd-earnings" || ctx["txid"].includes("ref_") || is_airdrop)?` style="display:none;"`:``}>
                                        <span>Hash:</span>
                                        <a class="blocklink" ${(ctx["txid"]=='' || ctx["coin"]=="usd-earnings" || ctx["coin"]=="usd")?``:`href="${explorer[ctx["coin"]].replace("{id}",ctx["txid"])}"`} target="_blank">${ctx["txid"]==''?"to be generated":ctx["txid"]}</a>
                                    </div>
                                    <div style="color: white;">
                                    ${ctx["invoice"]?`<span><i class="fa-solid fa-file-invoice-dollar"></i> Invoice: ${ctx["invoice"]=="pending"?`Pending creation`:`<a class="blocklink" href="${ctx["invoice"]}"  target="_blank">Open</a>`}</span><br>`:''}
                                    ${ctx["gift"]?`<i class="fa-solid fa-hand-holding-dollar"></i> Gift code: <input class="gift-tx-input" value="${ctx["gift"]}" readonly>`:''}
                                    ${ctx["rgift"]?`<i class="fa-solid fa-hand-holding-dollar"></i> Gift code: <input class="gift-tx-input" value="${ctx["txid"]}" readonly>`:''}
                                    ${ctx["payout_invoice"]?`<span><i class="fa-solid fa-file-invoice-dollar"></i> Invoice: <a class="blocklink" onclick="generate_payout_invoice(\`${JSON.stringify(ctx["payout_invoice"]).replace(/\"/g,'\'')}\`)">Download</a></span><br>`:''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
        } else if (init && ui_version==1) {
            let is_airdrop = ctx["txid"].substring(0,7)==`airdrop`;

            console.log("ss",is_airdrop);

            txhtml+=`<div id="transaction-${ctx["coin"]}-${ctx["txid"]?ctx["txid"]:ctx["fiat_id"]}" class="whole-tx">
                        <div class="transaction" onclick="open_tx_details('${ctx["coin"]}-${ctx["txid"]?ctx["txid"]:ctx["fiat_id"]}')">
                            <div class="tx-icon">
                                ${(ctx["txid"]?ctx["txid"]:'').substring(0,7)=="airdrop"?`<i class="fa-solid fa-gift"></i>`:(ctx["type"]=="withdraw"?`<i class="fa-regular fa-paper-plane"></i>`:`<i class="fa-solid fa-arrow-down"></i>`)}
                            </div>
                            <div class="tx-time">
                                <span>${parse_receive_time(ctx,true)}</span>
                            </div>
                            <div class="tx-amount">
                                <span>${ctx["amount"]>0?`+`:`-`} ${Math.abs((ctx["coin"]=="usd" || ctx["coin"]=="usd-earnings")?ctx["amount"]/100:ctx["amount"])} ${ctx["coin"]=="bitcoin"?"BTC":(ctx["coin"]=="CLORE-Blockchain"?"CLORE":((ctx["coin"]=="usd" || ctx["coin"]=="usd-earnings")?"USD":''))}</span>
                            </div>
                            <div class="tx-open" id="oc-${ctx["coin"]}-${ctx["txid"]?ctx["txid"]:ctx["fiat_id"]}">
                                <i class="fa-solid fa-circle-chevron-up"></i>
                            </div>
                        </div>
                        <div class="flexbreak"></div>
                        <div class="tx-info" id="details-${ctx["coin"]}-${ctx["txid"]?ctx["txid"]:ctx["fiat_id"]}">
                            <span><i class="fa-solid fa-circle-info"></i> Type: ${is_airdrop?`Airdrop Reward: <b>${ctx["txid"].includes("competition")?"Competition":(ctx["txid"].includes("points")?`points`:`PoH`)}</b>`:(ctx["txid"].includes("ref_")?`Referral earnings`:(first_uppercase(ctx["rgift"]?`Claimed gift code`:ctx["gift"]?`Create gift code`:ctx["type"]=="withdraw"?(ctx["coin"]=="usd-earnings" && !(ctx["gift"] || ctx["rgift"]) ?`Payout`:"withdrawal"):ctx["type"])))}</span><br>
                            ${(ctx["type"]=="withdraw" || ctx["rgift"] || ctx["txid"].includes("ref_") || is_airdrop)?'':`<span><i class="fa-solid fa-circle-check"></i> Confirmations: ${(ctx["confirming"]?ctx["confirming"]:(ctx["completed"]?"Completed":"Soon Will Be Completed"))}</span><br>`}
                            <span><i class="fa-solid fa-sack-dollar"></i> Amount: ${Math.abs((ctx["coin"]=="usd" || ctx["coin"]=="usd-earnings")?ctx["amount"]/100:ctx["amount"])} ${ctx["coin"]=="bitcoin"?"BTC":(ctx["coin"]=="CLORE-Blockchain"?"CLORE":((ctx["coin"]=="usd" || ctx["coin"]=="usd-earnings")?`USD`:''))}</span><br>
                            ${ctx["fee"]?`<span><i class="fa-solid fa-sack-dollar"></i> Fee: ${parseFloat(ctx["fee"])} ${ctx["coin"]=="bitcoin"?"BTC":(ctx["coin"]=="CLORE-Blockchain"?"CLORE":'')}</span><br>`:``}
                            <span><i class="fa-solid fa-clock"></i> Time ${ctx["type"]=="withdraw"?`requested`:`received`}: ${parse_receive_time(ctx,false)}</span><br${(ctx["coin"]=="usd" || ctx["coin"]=="usd-earnings" || is_airdrop)?` style="display:none;"`:``}>
                            <span${(ctx["coin"]=="usd" || ctx["coin"]=="usd-earnings" || ctx["txid"].includes("ref_") || is_airdrop)?` style="display:none;"`:``}><i class="fa-solid fa-fingerprint"></i> Hash: <a class="blocklink" ${(ctx["txid"]=='' || ctx["coin"]=="usd-earnings" || ctx["coin"]=="usd")?``:`href="${explorer[ctx["coin"]].replace("{id}",ctx["txid"])}"`} target="_blank">${ctx["txid"]==''?"to be generated":ctx["txid"]}</a></span>${ctx["txid"].includes("ref_")?'':`<br>`}
                            ${ctx["invoice"]?`<span><i class="fa-solid fa-file-invoice-dollar"></i> Invoice: ${ctx["invoice"]=="pending"?`Pending creation`:`<a class="blocklink" href="${ctx["invoice"]}"  target="_blank">Open</a>`}</span><br>`:''}
                            ${ctx["gift"]?`<i class="fa-solid fa-hand-holding-dollar"></i> Gift code: <input class="gift-tx-input" value="${ctx["gift"]}" readonly>`:''}
                            ${ctx["rgift"]?`<i class="fa-solid fa-hand-holding-dollar"></i> Gift code: <input class="gift-tx-input" value="${ctx["txid"]}" readonly>`:''}
                            ${ctx["payout_invoice"]?`<span><i class="fa-solid fa-file-invoice-dollar"></i> Invoice: <a class="blocklink" onclick="generate_payout_invoice(\`${JSON.stringify(ctx["payout_invoice"]).replace(/\"/g,'\'')}\`)">Download</a></span><br>`:''}
                        </div>
                    </div>`
        } else {

        }
    }

    if (ui_version==2) {
        $(".v2_tx_list").html(txhtml);

        $(function () {
            let Accordion = function (el, multiple) {
                this.el = el || {};
                this.multiple = multiple || false;
                let links = this.el.find('.link');
                links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown)
            };

            Accordion.prototype.dropdown = function (e) {
                let $el = e.data.el;
                $this = $(this),
                    $next = $this.next();
                $next.slideToggle();
                if (!e.data.multiple) {

                    $el.find('.submenu').not($next).slideUp();
                }
                if (!$this.hasClass('open')) {
                    $('.link').each(function () {
                        $(this).removeClass('open')
                    })
                    $this.addClass('open')
                } else {
                    $this.removeClass('open')
                }
            }

            let accordion = new Accordion($('.accordion'), false);
        });
    } else {
        if(init) $("#txs").html(txhtml);

        $(".gift-tx-input").map(function() {
            $(this).attr("size", $(this).val().length);
        })
    }
}

function renderTransactions(transactions, explorer) {
    const iconSuccess = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <path stroke="#46CA93" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m8 12 3 3 5-6m5 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /> </svg>';
    const iconPlus = '<svg class="trns-header-btn-icon-plus" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 10h12m-6-6v12" /> </svg>';
    const iconMinus = '<svg class="trns-header-btn-icon-minus" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 21"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 10.5h12" /> </svg>';
    const iconLink = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m9 15 6-6m-4-3 .463-.536a5 5 0 0 1 7.071 7.072L18 13m-5 5-.397.534a5.068 5.068 0 0 1-7.127 0 4.972 4.972 0 0 1 0-7.071L6 11" /> </svg>';
    const iconPending = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-opacity=".6" stroke-width="1.5" d="M3 12a9 9 0 1 0 9-9m5 9a5 5 0 1 0-5 5"/></svg>';

    const createTrnsParamItem = (title, value, valueStatus) => {
        const trnsParamItem = createElement('div', ['trns-params-item']);
        const trnsParamItemTitle = createElement('span', ['trns-params-item-title']);
        const trnsParamItemValue = createElement('span', ['trns-params-item-value']);

        if (valueStatus) {
            trnsParamItemValue.classList.add(valueStatus);
        }

        trnsParamItemTitle.innerHTML = title;
        trnsParamItemValue.innerHTML = value;
        trnsParamItem.appendChild(trnsParamItemTitle);
        trnsParamItem.appendChild(trnsParamItemValue);

        return trnsParamItem;
    }

    const getTrnsTime = (timestamp) => {
        if (!timestamp || isNaN(parseInt(timestamp))) return '';

        const date = new Date(timestamp * 1000);
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const year = date.getFullYear() < 10 ? `0${date.getFullYear()}` : date.getFullYear();
        const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

        return `${day}.${month}.${year} | ${hours}:${minutes}:${seconds}`;
    }

    const transactionsList = document.getElementById('transactions-list');

    if (transactionsList && transactions.length > 0) {
        transactionsList.innerHTML = ''
        transactionsList?.classList.remove('empty');

    } else {
        transactionsList?.classList.add('empty');
    };

    const trnsList = createElement('ul', ['trns-list']);

    for (let i = transactions.length - 1; i >= 0; i--) {
        const transaction = transactions[i];
        const transactionId = `trns-${transaction['txid']}-${i}`;
        const trnsListItem = createElement('li', ['trns-list-item', 'js-trns-item']);
        const trnsHeader = createElement('div', ['trns-header']);
        const trnsHeaderLeft = createElement('div', ['trns-header-left']);
        const trnsHeaderRight = createElement('div', ['trns-header-right']);
        const trnsIcon = createElement('div', ['trns-icon']);
        const trnsStatus = createElement('div', ['trns-status']);
        const trnsStatusTitle = createElement('span', ['trns-status-title']);
        const trnsStatusDate = createElement('span', ['trns-status-date']);
        const trnsHeaderAmount = createElement('span', ['trns-header-amount']);
        const trnsHeaderBtn = createElement('button', ['trns-header-btn']);
        const trnsBody = createElement('div', ['trns-body']);
        const trnsParamsCard = createElement('div', ['trns-params-card']);
        const trnsParams = createElement('div', ['trns-params']);
        const trnsHash = createElement('div', ['trns-hash']);
        const trnsHashInputWrapper = createElement('div', ['aero-input-wrapper', 'aero-input-icon-left']);
        const trnsHashInputLink = createElement('a', ['aero-input-icon', 'left']);
        const trnsHashInputLabel = createElement('label', ['aero-input-sign']);
        const trnsHashInput = createElement('input', ['aero-input']);
        const trnsAdditional = createElement('div', ['trns-additional']);

        const isAirdrop = transaction["txid"].substring(0,7) === 'airdrop';
        const hasReferral = transaction["txid"].includes("ref_");
        const hasRGift = transaction["rgift"];
        const hasGift = transaction["gift"];
        const hasInvoice = transaction["invoice"];
        const hasPayout = transaction["payout_invoice"];
        const isWithdraw = transaction["type"] === "withdraw";
        const isUSDEarings = transaction["coin"] === "usd-earnings";
        const notGift = !(transaction["gift"] || transaction["rgift"]);

        const transactionTypeAirdrop = `Airdrop Reward: ${transaction["txid"].includes("competition") ? "Competition" : (transaction["txid"].includes("points") ? `points` : `PoH`)}`;
        const transactionTypeReferral = 'Referral reward';
        const transactionTypeRGift = 'Claimed gift code';
        const transactionTypeGift = 'Create gift code';
        const transactionTypePayout = 'Payout';
        const transactionTypeWithdraw = 'Withdrawal';

        const transactionType = `${isAirdrop ? transactionTypeAirdrop : (hasReferral ? transactionTypeReferral : (first_uppercase(hasRGift ? transactionTypeRGift : hasGift ? transactionTypeGift : isWithdraw ? (isUSDEarings && notGift ? transactionTypePayout : transactionTypeWithdraw) : transaction["type"])))}`;

        const transactionAmountSign = transaction["amount"] > 0 ? '+' : '-';
        const transactionAmountNumber = `${Math.abs((transaction["coin"]=="usd" || transaction["coin"]=="usd-earnings") ? transaction["amount"] / 100 : transaction["amount"])}`;
        const transactionAmountCurrency = `${transaction["coin"]=="bitcoin" ? "BTC" : (transaction["coin"]=="CLORE-Blockchain" ?"CLORE" : ((transaction["coin"]=="usd" || transaction["coin"]=="usd-earnings") ? "USD" : ''))}`;

        const transactionAmount = `${transactionAmountSign} ${transactionAmountNumber} ${transactionAmountCurrency}`;

        const transactionTimeTitle = `${isWithdraw ? `requested` : `received`}`;
        const transactionTime = transaction['completed'] ? getTrnsTime(transaction['completed']) : 'Not yet';

        const transactionConfirmation = `${(transaction["confirming"] ? transaction["confirming"] : (transaction["completed"] ? "Completed" : "Soon Will Be Completed"))}`;
        const transactionConfirmationStatus = transactionConfirmation === 'Completed' && 'success';

        const linkHrefCondition = transaction["txid"] === '' || transaction["coin"] === "usd-earnings" || transaction["coin"] === "usd";
        const hashHref = `${linkHrefCondition ? `` : `${explorer[transaction["coin"]].replace("{id}",transaction["txid"])}`}`;
        const transactionHashValue = `${transaction["txid"] === '' ? "to be generated" : transaction["txid"]}`

        const transactionInvoce = `${hasInvoice ? `<div class="aero-input-wrapper">
                                                        <label class="aero-input-sign"><i class="fa-solid fa-file-invoice-dollar"></i> Invoice:</label>
                                                        ${transaction["invoice"]=="pending" ? `<span>Pending creation</span>` : `<a class="blocklink" href="${transaction["invoice"]}" target="_blank">Open</a>`}
                                                    </div>` : ''}`;
        const transitionGift = `${hasGift ? `<div class="aero-input-wrapper">
                                                <label class="aero-input-sign"><i class="fa-solid fa-hand-holding-dollar"></i> Gift code:</label>
                                                <input class="aero-input" value="${transaction["gift"]}" readonly>
                                            </div>` : ''}`;
        const transitionRGift = `${hasRGift ? `<div class="aero-input-wrapper">
                                                    <label class="aero-input-sign"><i class="fa-solid fa-hand-holding-dollar"></i> Gift code:</label>
                                                    <input class="aero-input" value="${transaction["txid"]}" readonly>
                                                </div>` : ''}`;
        const transitionPayout = `${hasPayout ? `<div class="aero-input-wrapper">
                                                    <label class="aero-input-sign"><i class="fa-solid fa-hand-holding-dollar"></i> Invoice:</label>
                                                    <a class="blocklink" onclick="generate_payout_invoice(\`${JSON.stringify(transaction["payout_invoice"]).replace(/\"/g,'\'')}\`)">Download</a>
                                                </div>` : ''}`;

        trnsListItem.id = transactionId;
        trnsIcon.innerHTML = transaction['completed'] ? iconSuccess : iconPending;
        trnsStatusTitle.innerHTML = transaction['completed'] ? 'Success' : 'Pending';
        trnsStatusDate.innerHTML = transactionTime;
        trnsHeaderAmount.innerHTML = transactionAmount;
        trnsHeaderBtn.innerHTML = iconPlus + iconMinus;
        trnsHeaderBtn.addEventListener('click', () => {
            toggleTransaction(transactionId);
        });
        trnsParams.appendChild(createTrnsParamItem('Type', transactionType));
        trnsParams.appendChild(createTrnsParamItem('Amount', transactionAmount));
        trnsParams.appendChild(createTrnsParamItem(`Time ${transactionTimeTitle}`, transactionTime));
        trnsParams.appendChild(createTrnsParamItem('Confirmations', transactionConfirmation, transactionConfirmationStatus));
        trnsHashInputLink.setAttribute('target', '_blank');
        trnsHashInputLink.setAttribute('href', hashHref);
        trnsHashInputLink.innerHTML = iconLink;
        trnsHashInputLabel.innerHTML = 'Hash';
        trnsHashInput.setAttribute('type', 'text');
        trnsHashInput.setAttribute('readonly', 'readonly');
        trnsHashInput.setAttribute('value', transactionHashValue);
        trnsAdditional.innerHTML = `${transactionInvoce}${transitionGift}${transitionRGift}${transitionPayout}`;

        trnsHashInputWrapper.addEventListener('click', () => {
            if (hashHref) {
                window.open(hashHref, '_blank');
            }
        });

        trnsStatus.appendChild(trnsStatusTitle);
        trnsStatus.appendChild(trnsStatusDate);
        trnsHeaderLeft.appendChild(trnsIcon);
        trnsHeaderLeft.appendChild(trnsStatus);
        trnsHeaderRight.appendChild(trnsHeaderAmount);
        trnsHeaderRight.appendChild(trnsHeaderBtn);
        trnsHeader.appendChild(trnsHeaderLeft);
        trnsHeader.appendChild(trnsHeaderRight);
        trnsHashInputWrapper.appendChild(trnsHashInputLink);
        trnsHashInputWrapper.appendChild(trnsHashInputLabel);
        trnsHashInputWrapper.appendChild(trnsHashInput);
        trnsHash.appendChild(trnsHashInputWrapper);
        trnsParamsCard.appendChild(trnsParams);
        trnsParamsCard.appendChild(trnsHash);
        trnsParamsCard.appendChild(trnsAdditional);
        trnsBody.appendChild(trnsParamsCard);
        trnsListItem.appendChild(trnsHeader);
        trnsListItem.appendChild(trnsBody);
        trnsList.appendChild(trnsListItem);
    }

    if (transactionsList) {
        transactionsList.appendChild(trnsList);
    }
}

function parse_receive_time(tx,up){
    if(tx["completed"]){
        if(!isNaN(parseInt(tx["completed"]))){
            let date = new Date(parseInt(parseInt(tx["completed"]))*1000)
            return up
            ?
            `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
            :
            `${date.getHours()<10?'0'+date.getHours():date.getHours()}:${date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()}:${date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds()} ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
        }
    }else{
        return up?`<i class="fas fa-sync fa-spin"></i> Working`:"Not yet"
    }
}
function add_key(){
    $(".add-key").css("display","flex")
    $(".my_keys").css("display","none")
    document.getElementById("new-ssh-key").value=''
}
function clone_nk(){
    $(".add-key").css("display","none")
    $(".my_keys").css("display","block")
}

async function delete_pubkey(key){
    let cerr=''
    let api_res=await call_api("rm_pubkey",{key}).catch(function (err) {cerr=err})
    if(cerr){
        aero_alert("#remove-alert","Connection error","danger",5000)
    }else if(api_res["error"]){
        aero_alert("#remove-alert","Database error","danger",5000)
    }else if(api_res["status"]=="key_dont_exist"){
        aero_alert("#remove-alert","Key is already deleted","danger",5000)
    }else{
        let ri = glob_pubkeys["keys"].indexOf(key)
        if(ri >= 0) glob_pubkeys["keys"].splice(ri,1)
        render_pubkeys()
        const modalRemoveKey = new AeroModal('remove-key-modal');
        modalRemoveKey.closeModal()
    }
}

async function remove_api_key(key,rs){
    let cerr=''
    await call_api("rm_api_key",{key,rs}).catch(function (err) {cerr=err})
    location.reload()
}

function open_modal_remove_key(key_type, key, rs) {
    const removeButton = document.getElementById('modal-key-remove-btn');
    removeButton.onclick = null;

    if (key_type === 'ssh') {
        $('#modal-key-title').html('Delete SSH public key')
        $('#key-name').html(`${key}`)
        removeButton.onclick = function() {
            delete_pubkey(key);
        };
    } else if (key_type === 'api') {
        $('#modal-key-title').html('Delete API key')
        $('#key-name').html(`${key}...`)
        removeButton.onclick = function() {
            remove_api_key(key, rs);
        };
    }

    const modalRemoveKey = new AeroModal('remove-key-modal');
    modalRemoveKey.openModal();
}

function open_modal_add_ssh_key () {
    if (glob_pubkeys["keys"].length < 3) {
        const modalAddSSHKey = new AeroModal('add-ssh-key-modal',
          { closeCallback: () => document.getElementById("new-ssh-key-form").value = '' })
        modalAddSSHKey.openModal();
    } else {
        const modalKeyLimit = new AeroModal('key-limit-modal');
        modalKeyLimit.openModal()
    }
}

async function open_modal_add_api_key () {
    if (glob_pubkeys["api_keys"].length < 3) {
        const modalAddSSHKey = new AeroModal('add-api-key-modal',
          { closeCallback: () => document.getElementById("new-api-key-form").value = '' })
        await api_create();
        const copyButton = document.getElementById('add-api-key-btn');
        copyButton.onclick = null;
        copyButton.onclick = function() {
            copyText($('#new-api-key-form').val());
        };
        modalAddSSHKey.openModal();
    } else {
        const modalKeyLimit = new AeroModal('key-limit-modal');
        modalKeyLimit.openModal()
    }
}

function open_modal_deposit_bitcoin () {
        const modalDepositBtc = new AeroModal('deposit-bitcoin');
    modalDepositBtc.openModal()
}
function open_modal_deposit_clore () {
        const modalDepositClore = new AeroModal('deposit-CLORE-Blockchain');
    modalDepositClore.openModal()
}

function open_withdraw(coin){
    $(`#withdraw-${coin}`).css("display", "flex")
}

function render_pubkeys() {
    let keys_quantity = 0;
    let keys_list = ''

    if (glob_pubkeys["keys"]) {
        keys_quantity = glob_pubkeys["keys"].length;

        for (let i = 0; i < glob_pubkeys["keys"].length; i++) {
            let item = glob_pubkeys["keys"][i];
            const key_index = `ssh-key-${[i]}`;
            keys_list += `<li>
                            <div class="key-control-wrapper">
                              <div class="key-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" fill="none"><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-opacity=".6" stroke-width="1.5" d="M14.667 9.833h.009m1.373-4.584 3.202 3.202a2.557 2.557 0 0 1 0 3.617l-2.35 2.35a2.557 2.557 0 0 1-3.617 0l-.267-.268-5.83 5.83a1.778 1.778 0 0 1-1.1.513l-.156.007H4.889a.89.89 0 0 1-.883-.785L4 19.611V18.57c0-.417.147-.821.415-1.141l.106-.116.368-.368h1.778v-1.777h1.777v-1.778l1.906-1.906-.267-.268a2.558 2.558 0 0 1 0-3.616l2.35-2.35a2.558 2.558 0 0 1 3.616 0Z"/></svg>
                                <p class="aero-b2 key-name" id=${key_index}>${item.split(' ')[item.split(' ').length - 1]}</p>
                              </div>
                              <button class="copy-key-button" onclick="copyText('${item}', '.copy-icon-${key_index}', 'icon-grey')" title="Copy">
                                <svg class="copy-icon-${key_index}" xmlns="http://www.w3.org/2000/svg" width="24" height="25" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 8.5h-6a2 2 0 0 0-2 2v6m8-8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-2m8-8v-2a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>
                              </button>
                            </div>
                            <button class="aero-btn-secondary" onclick="open_modal_remove_key('ssh', '${item}')">Remove</button>
                        </li>`

        }
        $("#SSH-keys-list").html(keys_list)
    }

    $("#SSH-keys-quantity").html(keys_quantity)
}

function render_api_keys() {
    let keys_quantity = 0;
    let keys_list = ''

    if (glob_pubkeys["api_keys"]) {
        keys_quantity = glob_pubkeys["api_keys"].length;

        for (let i = 0; i < glob_pubkeys["api_keys"].length; i++) {
            let item = glob_pubkeys["api_keys"][i]

            keys_list += `<li>
                            <div class="key-control-wrapper">
                              <div class="key-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" fill="none"><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-opacity=".6" stroke-width="1.5" d="M14.667 9.833h.009m1.373-4.584 3.202 3.202a2.557 2.557 0 0 1 0 3.617l-2.35 2.35a2.557 2.557 0 0 1-3.617 0l-.267-.268-5.83 5.83a1.778 1.778 0 0 1-1.1.513l-.156.007H4.889a.89.89 0 0 1-.883-.785L4 19.611V18.57c0-.417.147-.821.415-1.141l.106-.116.368-.368h1.778v-1.777h1.777v-1.778l1.906-1.906-.267-.268a2.558 2.558 0 0 1 0-3.616l2.35-2.35a2.558 2.558 0 0 1 3.616 0Z"/></svg>
                                <p class="aero-b2 key-name">${item["key"]}...</p>
                              </div>
                            </div>
                            <button class="aero-btn-secondary" onclick="open_modal_remove_key('api','${item["key"]}','${item["rs"]}')">Remove</button>
                        </li>`
        }

        $("#API-keys-list").html(keys_list)
    }

    $("#API-keys-quantity").html(keys_quantity)
}
async function save_key(){
    let itxt = document.getElementById("new-ssh-key-form").value
    while(itxt[itxt.length-1]==' '){
        itxt=itxt.substring(0,itxt.length-1)
    }
    while(itxt[0]==' '){
        itxt=itxt.substring(1)
    }
    if(itxt.split(' ').length==3){
        let test=/^[a-zA-Z0-9\s-=.@+/]+$/
        if(test.test(itxt)){
            if(itxt.length>1536){
                aero_alert("#add-ssh-alert","Key is too long", "danger", 5000)
            }else{
                let cerr=''
                let api_res=await call_api("add_pubkey",{key:itxt}).catch(function (err) {cerr=err})
                if(cerr){
                    aero_alert("#add-ssh-alert","Connection error","danger", 5000)
                }else if(api_res["error"]=="key_aleready_saved"){
                    aero_alert("#add-ssh-alert","You have this key already saved","danger", 5000)
                }else if(api_res["error"]=="reached_key_limit"){
                    aero_alert("#add-ssh-alert",`You have reached maximum key limit, user can have maximally ${api_res["limit"]} keys.`,"danger", 5000)
                }else if(api_res["error"]){
                    aero_alert("#add-ssh-alert","Database error","danger", 5000)
                }else{
                    location.reload()
                }
                console.log("ok")
            }
        }else{
            aero_alert("#add-ssh-alert","Invalid SSH key","danger", 5000)
        }
    }else{
        aero_alert("#add-ssh-alert","Invalid SSH key","danger", 5000)
    }
}
var w_api_create=false
async function api_create() {
    if (w_api_create) return;
    w_api_create = true
    let cerr = ''
    let api_res=await call_api("create_api_key",{}).catch(function (err) {cerr=err})
    if (cerr) {
        aero_alert("#add-api-alert", `Connection error`, "danger", 5000)
    } else if (api_res["error"] == "reached_limit") {
        aero_alert("#add-api-alert", `User can have max 3 api keys`, "danger", 5000)
    } else if (api_res["error"]) {
        aero_alert("#add-api-alert", `Database error`, "danger", 5000)
    } else {
        $("#new-api-key-form").val(api_res["new_api_key"])
        glob_pubkeys=await call_api("pubkeys").catch(function (err) {cerr=err})
        if (!cerr) render_api_keys()
    }
    add_api_key_working = false
    w_api_create = false
}

async function save_dockerhub_login() {
    const alertTimeout = 3000;
    const alertContainer = '.a-dockerhub-alert';
    const formData = {
        'username': $("#docker-a-f").val(),
        'docker_token': $("#docker-password").val()
    }
    let cerr='';
    let r = await call_api("save_dockerhub_login", formData).catch((err) => cerr = err);

    if (cerr){
        aero_alert(alertContainer, 'Connection error', 'danger', alertTimeout);
    } else {
        if (r.status) {
            aero_alert(alertContainer, 'DockerHub authentication saved', 'success', alertTimeout);
        } else if(r.error=="bad-username"){
            aero_alert(alertContainer, 'The username you inputed is not valid dockerhub username', 'danger', alertTimeout);
        } else if(r.error=="bad-token"){
            aero_alert(alertContainer, 'The token you inputed is not valid dockerhub token', 'danger', alertTimeout);
        } else{
            aero_alert(alertContainer, 'Database error', 'danger', alertTimeout);
        }
    }
}

function toggle_top_notification(){
    let is_open = $(".tn-rb").html().includes("fa-angle-down")?true:false
    $(".tn-rb").html(`<i class="fa-solid fa-angle-${is_open?"up":"down"}"></i>`);
    $(".top-notify").css("transition", `0s`);
    $(".top-notify").css("border-bottom-left-radius", `${is_open?10:0}px`);
    $(".top-notify").css("border-bottom-right-radius", `${is_open?10:0}px`);
    $(".airdrop-stats").css("display",is_open?"none":"flex");
    setTimeout(function(){
        $(".top-notify").css("transition", `0.26s`);
    },10)
}
function render_airdrop_info(json){
    if(json["ending"]) $(".tn-txt").html(`<span>$CLORE Airdrop has ended</span>`)
    $(".top-notify").css("display","flex");
    $(".airdrop-stats").html(`<div class="airdrop-stats-line">
        <span>🔗 <a style="font-weight:bold; color:white;text-decoration:underline;" href="/competition">Participate</a></span>
    </div><div class="airdrop-stats-line">
        <span><b>Proof of holding system: </b>${json["poh"]?json["poh"]:0} points</span>
    </div><div class="airdrop-stats-line">
        <span><b>Adding a server: </b>${json["srv"]?json["srv"]:0} points</span>
    </div><div class="airdrop-stats-line">
        <span><b>Someone else's mining farm: </b>${json["sef"]?json["sef"]:0} points</span>
    </div><div class="airdrop-stats-line">
        <span><b>Invitation: </b>${json["inv"]?json["inv"]:0} points</span>
    </div>${json["social"]?`<div class="airdrop-stats-line">
        <span><b>Sharing on social media: </b>${json["social"]?json["social"]:0} points</span>
    </div>`:''}`);
}
let mfa_runned=false
function get_2FA(custom_class){
    let full_code = '';

    document.querySelectorAll(custom_class?custom_class:'.digit-input').forEach((input, index, inputs) => {
        full_code+=input.value
    });

    return full_code;
}

const TG_BOT_LINK = 'https://t.me/clorenotification_bot'

function linkAccount(){
    window.location.href = TG_BOT_LINK
}

async function unlinkAccount() {
    try {
        const {success} = await call_tg_api("account/unlink");
        if (success) {
            $(".tg-content-linked").css("display", "none");
            $(".tg-content-unlinked").css("display", "flex");
        }
    } catch (e) {
        aero_modal_alert('account-alert', {text: "Connection error, please try latter"});
    }
}

function render_tg_account(account) {
    const {chat_id, active_notifications} = account?.tg ?? {}

    const $tg_linked = $(".tg-content-linked")
    const $tg_unlinked = $(".tg-content-unlinked")
    const $tg_link = $(".tg-input-link")

    $tg_link.attr('href', TG_BOT_LINK);

    if (!!chat_id && active_notifications) {
        $tg_linked.css("display", "flex");
        $tg_unlinked.css("display", "none");
    } else {
        $tg_linked.css("display", "none");
        $tg_unlinked.css("display", "flex");
    }
}

function clear_2FA(custom_class) {
    const sendButton = document.getElementById('twofa-send');

    sendButton?.setAttribute('disabled', 'disabled');
    document.querySelectorAll(custom_class?custom_class:'.digit-input').forEach((input, index, inputs) => {
        input.value = '';
    })
}
function setup_withdrawal_2fa(element_class){
    document.querySelectorAll(`.${element_class}`).forEach((input, index, inputs) => {
        input.addEventListener('keydown', (e) => {
            // Handle numeric input and auto-advance
            if (e.key >= '0' && e.key <= '9') {
                console.log("IN")
                if (input.nextElementSibling && input.value) {
                    input.nextElementSibling.focus();
                }
            }
            // Handle backspace for back-navigation and deletion
            else if (e.key === 'Backspace') {
                if (input.previousElementSibling && !input.value) {
                    input.previousElementSibling.focus();
                }
            }
            // Allow navigation with arrow keys
            else if (e.key === 'ArrowRight') {
                if (input.nextElementSibling) {
                    input.nextElementSibling.focus();
                }
                e.preventDefault(); // Prevent default to avoid jumping the caret position unnaturally
            }
            else if (e.key === 'ArrowLeft') {
                if (input.previousElementSibling) {
                    input.previousElementSibling.focus();
                }
                e.preventDefault(); // Prevent default to keep the UX consistent
            }
        });

        input.addEventListener('input', (e) => {
            const nonNumeric = /[^0-9]/g;
            try_complete_2FA_setup()
            input.value = input.value.replace(nonNumeric, ''); // Strip non-numeric characters
            if (input.nextElementSibling && input.value) {
                input.nextElementSibling.focus();
            }
        });
    });
}
function try_complete_2FA_setup () {
    const sendButton = document.getElementById('twofa-send');
    const mfa_code = get_2FA();

    if (mfa_code.length === 6) {
        sendButton?.removeAttribute('disabled');
    } else {
        sendButton?.setAttribute('disabled', 'disabled');
    }
}

async function send_2FA() {
    const alertContainer = '.twofa-modal-alert';
    const mfa_code = get_2FA();

    if (mfa_code.length === 6) {
        let cerr='';
        let r = await call_api(glob_mfa_active?"disable_2fa":"enable_2fa", {"activation_code" : mfa_code }).catch(function (err) { cerr = err });

        clear_2FA();

        if (cerr) {
            aero_alert(alertContainer, 'Connection error', 'danger', 1800);
        } else if (r["status"]){
            aero_alert(alertContainer, `${glob_mfa_active?"2FA DISABLED":"2FA CONFIGURED"}`, 'success', 1800);

            setTimeout(function () {
                location.reload()
            }, 1800);
        } else if (r["error"] && r["error"]=="not_valid"){
            aero_alert(alertContainer, 'Invalid Code', 'danger', 1800);
        } else {
            aero_alert(alertContainer, 'Setup Failure', 'danger', 1800);
        }
    }
}

async function setup2FA() {
    $(".auth-input-mfa-parent").css("display","none");

    document.getElementById("mfa-setup-qr").innerHTML = '';

    if (!mfa_runned) {
        mfa_runned=true;

        document.querySelectorAll('.digit-input').forEach((input, index, inputs) => {
            input.addEventListener('keydown', (e) => {
                // Handle numeric input and auto-advance
                if (e.key >= '0' && e.key <= '9') {
                    if (input.nextElementSibling && input.value) {
                        input.nextElementSibling.focus();
                    }
                }
                // Handle backspace for back-navigation and deletion
                else if (e.key === 'Backspace') {
                    if (input.previousElementSibling && !input.value) {
                        input.previousElementSibling.focus();
                    }
                }
                // Allow navigation with arrow keys
                else if (e.key === 'ArrowRight') {
                    if (input.nextElementSibling) {
                        input.nextElementSibling.focus();
                    }
                    e.preventDefault(); // Prevent default to avoid jumping the caret position unnaturally
                }
                else if (e.key === 'ArrowLeft') {
                    if (input.previousElementSibling) {
                        input.previousElementSibling.focus();
                    }
                    e.preventDefault(); // Prevent defaul do_withdrawt to keep the UX consistent
                }
            });

            input.addEventListener('input', (e) => {
                const nonNumeric = /[^0-9]/g;
                try_complete_2FA_setup();

                input.value = input.value.replace(nonNumeric, ''); // Strip non-numeric characters

                if (input.nextElementSibling && input.value) {
                    input.nextElementSibling.focus();
                }
            });
        });
    }

    let cerr = '';
    let any_fail = false;

    if (glob_mfa_active) {
        $(".mfa-popup-title").html("Disable two-factor authentication")
        $(".mfa-popup-test").html(`Do you really want to disable 2FA? Proceed by writing your current token`)
    } else {
        let r = await call_api("enable_2fa", {}).catch(function (err) {cerr=err});

        if (cerr) {
            any_fail=true;
        } else {
            if (r.status) {
                if (r.status=="setup-ready") {
                    if (document.getElementById("mfa-setup-qr")) {
                        let qrcode = new QRCode(document.getElementById("mfa-setup-qr"), {
                            text: r["new_2fa"],
                            width: 200,
                            height: 200,
                            colorDark: "#000000",
                            colorLight: "#e6e6e6",
                            correctLevel: QRCode.CorrectLevel.H
                        });
                    } else {
                        any_fail=true;
                    }
                } else {
                    any_fail=true;
                }
            } else {
                any_fail=true;
            }
        }
    }

    if (any_fail) {

    } else {
        // document.getElementById("setup-2fa-window").style.display = "block"
    }
}

function showModalTwoFactor() {
    const twoFactorModal = new AeroModal('two-factor-modal');

    twoFactorModal.openModal();
    setup2FA();
}

function remove_connection(disconnect_id, name, email){
    $(".connection_box_title").html("Disconnect")
    $(".connect_popup_body").html(`<div class="mod-minimum-deposit">
    <span>Are you sure you want to disconnect from ${name} account <b>${email}</b>?</span>
    <div class="flexbreak"></div>
    <div class="button-group">
        <button class="btn-style yes-button" onclick="confirm_remove_connection('${disconnect_id}')">Yes</button>
        <button class="btn-style no-button" onclick="$('.close_connection_box').click()">No</button>
    </div>
</div>`)
    $("#connection_box").css("display", "flex")
}
let last_conn_name='', last_connect_id=''
async function add_connection(name, connect_id){
    last_conn_name=name.toLowerCase()
    last_connect_id=connect_id
    $(".connection_box_title").html("Connect")
    $(".connect_popup_body").html(`<div class="mod-minimum-deposit">
    <span class="add_connection_loader"><i class="fa-solid fa-circle-notch fa-spin"></i></span>
</div>`)
    $("#connection_box").css("display", "flex")
    let cerr=''
    let api_res=await call_api("connections/get", {
        connect_id,
        "service": name.toLowerCase()
    }).catch(function (err) {cerr=err})
    if(!cerr && api_res["error"] && api_res["error"] == "already_connected"){
        $(".connect_popup_body").html(`<div class="mod-minimum-deposit">
    <span class="add_connection_loader add_connection_fail_text">Your account is already connected to ${name}</span>
</div>`)
    }else if(cerr || (api_res["error"] && api_res["error"] != "invalid_connect_id")){
        $(".connect_popup_body").html(`<div class="mod-minimum-deposit">
    <span class="add_connection_loader add_connection_fail_text">Connection error, please refresh</span>
</div>`)
    }else if(api_res["error"] && api_res["error"] == "invalid_connect_id"){
        $(".connect_popup_body").html(`<div class="mod-minimum-deposit">
    <span class="add_connection_loader add_connection_fail_text">This request is not valid anymore</span>
</div>`)
    }else{
        $(".connect_popup_body").html(`<div class="mod-minimum-deposit">
    <span>Are you sure you want to connect ${name} account <b>${api_res["acc_email"]}</b>?</span>
    <div class="flexbreak"></div>
    <div class="button-group">
        <button class="btn-style yes-button" onclick="confirm_add_connection()">Yes</button>
        <button class="btn-style no-button" onclick="$('.close_connection_box').click();location.search=''">No</button>
    </div>
</div>`)
    }
}
async function confirm_add_connection(){
    $(".connect_popup_body").html(`<div class="mod-minimum-deposit">
    <span class="add_connection_loader"><i class="fa-solid fa-circle-notch fa-spin"></i></span>
</div>`)
    $("#connection_box").css("display", "flex")
    let cerr=''
    let api_res=await call_api("connections/connect", {
        "connect_id": last_connect_id,
        "service": last_conn_name
    }).catch(function (err) {cerr=err})
    if(!cerr && api_res["error"] && api_res["error"] == "already_connected"){
        $(".connect_popup_body").html(`<div class="mod-minimum-deposit">
    <span class="add_connection_loader add_connection_fail_text">Your account is already connected to ${name}</span>
</div>`)
    }else if(cerr || (api_res["error"] && api_res["error"] != "invalid_connect_id")){
        $(".connect_popup_body").html(`<div class="mod-minimum-deposit">
    <span class="add_connection_loader add_connection_fail_text">Connection error, please refresh</span>
</div>`)
    }else if(api_res["error"] && api_res["error"] == "invalid_connect_id"){
        $(".connect_popup_body").html(`<div class="mod-minimum-deposit">
    <span class="add_connection_loader add_connection_fail_text">This request is not valid anymore</span>
</div>`)
        location.search = ''
    }else{
        $(".connect_popup_body").html(`<div class="mod-minimum-deposit">
    <span class="add_connection_loader add_connection_fail_text" stlye="color: lime;">Connection success</span>
</div>`)
        setTimeout(function () {
            location.search=''
        }, 1350)
    }
}
async function confirm_remove_connection(disconnect_id){
    $(".connect_popup_body").html(`<div class="mod-minimum-deposit">
    <span class="add_connection_loader"><i class="fa-solid fa-circle-notch fa-spin"></i></span>
</div>`)
    $("#connection_box").css("display", "flex")
    let cerr=''
    let api_res=await call_api("connections/disconnect", {
        disconnect_id
    }).catch(function (err) {cerr=err})
    if(cerr || (api_res["error"] && api_res["error"] != "invalid_connect_id")){
        $(".connect_popup_body").html(`<div class="mod-minimum-deposit">
    <span class="add_connection_loader add_connection_fail_text">Connection error, please refresh</span>
</div>`)
    }else if(api_res["error"] && api_res["error"] == "invalid_connect_id"){
        $(".connect_popup_body").html(`<div class="mod-minimum-deposit">
    <span class="add_connection_loader add_connection_fail_text">This request is not valid anymore</span>
</div>`)
        location.search=''
    }else{
        $(".connect_popup_body").html(`<div class="mod-minimum-deposit">
    <span class="add_connection_loader add_connection_fail_text" stlye="color: lime;">Disconnection success</span>
</div>`)
        setTimeout(function(){
            location.search=''
        }, 1350)
    }
}

function select_tab (tab) {
    const tabs = document.getElementsByClassName('tab-btn');
    for (const tab of tabs) {
        tab.classList.remove('select-tab-btn')
    }

    document.querySelector(`[data-tab=${tab}]`).classList.add('select-tab-btn');

    if (tab === 'tab-btn-1') {
        $("#tab-btn-1").css('display', 'flex');
        $("#tab-btn-2").css('display', 'none');
    } else if (tab === 'tab-btn-2') {
        $("#tab-btn-1").css('display', 'none');
        $("#tab-btn-2").css('display', 'flex');
    }
}

/**
 * Toggle transaction item
 * @param {string} id - The id of the transaction element
 */
function toggleTransaction(id) {
    const transactions = document.querySelectorAll('.js-trns-item');
    const currentTransaction = document.getElementById(id);

    transactions.forEach((transaction) => {
        if (transaction.id !== id) {
            transaction.classList.remove('open');
        }
    });

    if (currentTransaction) {
        currentTransaction.classList.toggle('open');
    }
}

function number_format(num) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "B" },
        { value: 1e12, symbol: "T" },
    ];
    const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
    const item = lookup.findLast(item => num >= item.value);
    return item ? (num / item.value).toFixed(1).replace(regexp, "").concat(item.symbol) : "0";
}

function number_format_decimals(value) {
    return value.toFixed(3).replace('.', ',');
}

const render_chart = async (filters) => {
    if (filters.timestamp_start && filters.timestamp_finish) {
        const isOneDay = dayjs(filters.timestamp_start).isSame(filters.timestamp_finish, 'day');

        let error;
        let user_revenue_res = await call_api(`user/revenue`, {
            filters
        }).catch(function (err) {
            error = err;
        });

        if (!error && user_revenue_res.status === 'ok' && user_revenue_res.data) {
            const data = user_revenue_res.data;

            if (data.revenue.length === 0) {
                document.getElementById('revenue-chart-empty').style.display = 'flex';
            } else {
                document.getElementById('revenue-chart-empty').style.display = 'none';
            }

            let reward_clore, payment_clore, payment_bitcoin, labels;

            if (isOneDay || is24Hours(filters.timestamp_start, filters.timestamp_finish)) {
                const hoursWithSums ={}
                const revenueHours = data.revenue.map(revenue => {
                    const {timestamp_start, timestamp_finish}= revenue
                    return ({
                        ...revenue,
                        timestamp_start: dayjs(timestamp_start).format("H:mm"),
                        timestamp_finish: dayjs(timestamp_finish).format("H:mm"),
                        date_start: dayjs(timestamp_start).format("DD.MM"),
                        date_finish: dayjs(timestamp_finish).format("DD.MM")
                    })
                })
                    .map(hour => {
                        hoursWithSums[hour.timestamp_finish] = {
                            timestamp_start: hour.timestamp_start,
                            timestamp_finish: hour.timestamp_finish,
                            date_start: hour.date_start,
                            date_finish: hour.date_finish
                        };
                        return hour;
                    })
                    .forEach(hour => {
                        hoursWithSums[hour.timestamp_finish][`${hour.currency}_payment_sum`]
                            ? hoursWithSums[hour.timestamp_finish][`${hour.currency}_payment_sum`] += (hour.payment_amount ? +hour.payment_amount : 0)
                            : hoursWithSums[hour.timestamp_finish][`${hour.currency}_payment_sum`] = (hour.payment_amount ? +hour.payment_amount : 0);

                        hoursWithSums[hour.timestamp_finish][`total_reward_sum_clore`]
                            ? hoursWithSums[hour.timestamp_finish][`total_reward_sum_clore`] += (hour.reward_amount ? +hour.reward_amount : 0)
                            : hoursWithSums[hour.timestamp_finish][`total_reward_sum_clore`] = (hour.reward_amount ? +hour.reward_amount : 0);
                    });


                reward_clore = Object.values(hoursWithSums).map(day => day['total_reward_sum_clore'] * data.coin_prices_in_usd['CLORE-Blockchain'] ?? 0);
                payment_clore = Object.values(hoursWithSums).map(day => day['CLORE-Blockchain_payment_sum'] * data.coin_prices_in_usd['CLORE-Blockchain']);
                payment_bitcoin = Object.values(hoursWithSums).map(day => day['bitcoin_payment_sum'] * data.coin_prices_in_usd.bitcoin);

                labels = Object.values(hoursWithSums).map(revenue => `${revenue.timestamp_start}-${revenue.timestamp_finish}`)

                if (is24Hours(filters.timestamp_start, filters.timestamp_finish)) {
                    labels = Object.values(hoursWithSums).map(revenue => 
                        `${revenue.date_start} ${revenue.timestamp_start}-${revenue.timestamp_finish}`
                    );
                } else {
                    labels = Object.values(hoursWithSums).map(revenue => 
                        `${revenue.timestamp_start}-${revenue.timestamp_finish}`
                    );
                }
            } else {
                const daysWithSums = {};

                data.revenue.map(revenue => {
                    const {timestamp_start, timestamp_finish}= revenue
                    return ({
                        ...revenue,
                        timestamp_start: dayjs(timestamp_start).format("YYYY-MM-DD"),
                        timestamp_finish: dayjs(timestamp_finish).format("YYYY-MM-DD"),
                    });
                })
                .map(day => {
                    daysWithSums[day.timestamp_finish] = {};
                    return day;
                })
                .forEach(day => {
                    daysWithSums[day.timestamp_finish][`${day.currency}_payment_sum`]
                      ? daysWithSums[day.timestamp_finish][`${day.currency}_payment_sum`] += (day.payment_amount ? +day.payment_amount : 0)
                      : daysWithSums[day.timestamp_finish][`${day.currency}_payment_sum`] = (day.payment_amount ? +day.payment_amount : 0);

                    // daysWithSums[day.timestamp_finish][`${day.currency}_reward_sum`]
                    //   ? daysWithSums[day.timestamp_finish][`${day.currency}_reward_sum`] += (day.reward_amount ? +day.reward_amount : 0)
                    //   : daysWithSums[day.timestamp_finish][`${day.currency}_reward_sum`] = (day.reward_amount ? +day.reward_amount : 0);

                    daysWithSums[day.timestamp_finish][`total_reward_sum_clore`]
                      ? daysWithSums[day.timestamp_finish][`total_reward_sum_clore`] += (day.reward_amount ? +day.reward_amount : 0)
                      : daysWithSums[day.timestamp_finish][`total_reward_sum_clore`] = (day.reward_amount ? +day.reward_amount : 0);
                });

                // const reward_clore = Object.values(daysWithSums).map(day => (currency === 'usd'
                //   ? day['CLORE-Blockchain_reward_sum'] * data.coin_prices_in_usd['CLORE-Blockchain']
                //   : day['CLORE-Blockchain_reward_sum']) || 0)

                reward_clore = Object.values(daysWithSums).map(day => day['total_reward_sum_clore'] * data.coin_prices_in_usd['CLORE-Blockchain'] ?? 0);
                payment_clore = Object.values(daysWithSums).map(day => day['CLORE-Blockchain_payment_sum'] * data.coin_prices_in_usd['CLORE-Blockchain']);

                // const reward_bitcoin = Object.values(daysWithSums).map(day => currency === 'usd'
                //   ? day['bitcoin_reward_sum'] * data.coin_prices_in_usd.bitcoin
                //   : day['bitcoin_reward_sum']
                // )

                payment_bitcoin = Object.values(daysWithSums).map(day => day['bitcoin_payment_sum'] * data.coin_prices_in_usd.bitcoin);

                labels = Object.keys(daysWithSums);
            }

            let chartStatus = Chart.getChart('revenue-chart');

            if (chartStatus !== undefined) {
                chartStatus.destroy();
            }

            let revenue = 0;

            if (document.getElementById('payment-reward')) {
                const reward = user_revenue_res.data.revenue.reduce((acc, revenue) => acc + +(revenue.reward_amount ?? 0), 0);
                document.getElementById('payment-reward').innerText = `${toFixed(reward)} CLORE`
                document.getElementById('payment-reward-usd').innerText = `${toFixed(reward * data.coin_prices_in_usd['CLORE-Blockchain'])} USD`
                revenue += reward * data.coin_prices_in_usd['CLORE-Blockchain']
            }

            if (document.getElementById('payment-clore')) {
                const payment = user_revenue_res.data.revenue
                    .filter(revenue => revenue.currency === 'CLORE-Blockchain')
                    .reduce((acc, revenue) => acc + +(revenue.payment_amount ?? 0), 0);
                document.getElementById('payment-clore').innerText = `${toFixed(payment)} CLORE`
                document.getElementById('payment-clore-usd').innerText = `${toFixed(payment * data.coin_prices_in_usd['CLORE-Blockchain'])} USD`
                revenue += payment * data.coin_prices_in_usd['CLORE-Blockchain']
            }

            if (document.getElementById('payment-btc')) {
                const payment = user_revenue_res.data.revenue
                    .filter(revenue => revenue.currency === 'bitcoin')
                    .reduce((acc, revenue) => acc + +(revenue.payment_amount ?? 0), 0);
                document.getElementById('payment-btc').innerText = `${toFixed(payment, 8)} BTC`
                document.getElementById('payment-btc-usd').innerText = `${toFixed(payment * data.coin_prices_in_usd.bitcoin)} USD`
                revenue += payment * data.coin_prices_in_usd.bitcoin
            }

            if (document.getElementById('revenue-total')) {
                document.getElementById('revenue-total').innerText = `${toFixed(revenue)} $`
            }

            if (document.getElementById('revenue-chart')) {
                const canvas = document.getElementById('revenue-chart').getContext('2d');

                const config = {
                    type: 'bar',
                    data: {
                      labels,
                      datasets: [
                        {
                          data: reward_clore,
                          backgroundColor: '#46CA93',
                          hoverBackgroundColor: '#31AA78',
                          barPercentage: 0.93,
                          typeOfCurrency: 'reward-CLORE-Blockchain',
                          categoryPercentage: 1
                        },
                        {
                          data: payment_clore,
                          backgroundColor: '#292929',
                          hoverBackgroundColor: '#F63737',
                          barPercentage: 0.93,
                          typeOfCurrency: 'payment-CLORE-Blockchain', 
                          categoryPercentage: 1
                        },
                        {
                          data: payment_bitcoin,
                          backgroundColor: '#A4A4A4',
                          hoverBackgroundColor: '#F7931A',
                          barPercentage: 0.93,
                          typeOfCurrency: 'payment-Bitcoin',
                          categoryPercentage: 1
                        }
                      ].reverse()
                    },
                    options: {
                      maintainAspectRatio: false,
                      events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
                      interaction: {
                        intersect: true,
                      },
                      plugins: {
                          legend: { display: false },
                          tooltip: {
                            usePointStyle: true,
                            position: 'nearest',
                            bodyFont: {
                              size: 14
                            },
                            bodyColor: '#15141A',
                            backgroundColor: '#ECECEC',
                            callbacks: {
                              labelPointStyle: function (context) {
                                return {
                                  pointStyle: 'triangle',
                                  rotation: 0
                                };
                              },
                              title: () => '',
                              label: (tooltipItems) => {
                                const itemInfo = tooltipItems.parsed.y;
                                const itemInfoNumber = Number(itemInfo);
                                return itemInfoNumber ? itemInfoNumber.toFixed(8) : itemInfo;
                              }
                            }
                          }
                      },
                      scales: {
                        x: {
                          stacked: true,
                          grid: {
                            display: false,
                            drawOnChartArea: false,
                            drawTicks: false
                          },
                          border: {
                            color: 'rgba(255, 255, 255, 0.16)'
                          },
                          ticks: {
                            padding: 12,
                            font: {
                              size: 10
                            },
                            color: 'rgba(255, 255, 255, 0.6)'
                          }
                        },
                        y: {
                          stacked: true,
                          beginAtZero: true,
                          grid: {
                            color: 'rgba(255, 255, 255, 0.16)',
                            drawTicks: false
                          },
                          border: {
                            color: 'rgba(255, 255, 255, 0.16)'
                          },
                          ticks: {
                            padding: 8,
                            font: {
                              size: 10
                            },
                            color: 'rgba(255, 255, 255, 0.6)',
                            callback: function (value) {
                              const handler = isOneDay ? number_format_decimals : number_format;
                              return handler(value);
                            }
                          }
                        }
                      },
                      onHover: function(event, chartElement) {
                        const wrapper = document.querySelector('.payment-info-wrapper');
                        const rewardIcon = wrapper.querySelector('.icon-reward');
                        const paymentCLoreIcon = wrapper.querySelector('.icon-payment-clore');
                        const paymentBtcIcon = wrapper.querySelector('.icon-payment-btc');
        
                        if (chartElement.length > 0) {
                            const datasetIndex = chartElement[0].datasetIndex;
                            const typeOfCurrency = config.data.datasets[datasetIndex].typeOfCurrency;
        
                            if (typeOfCurrency === 'reward-CLORE-Blockchain') {
                                rewardIcon.querySelector('circle').setAttribute('fill', '#31AA78');
                            } else if (typeOfCurrency === 'payment-CLORE-Blockchain') {
                                paymentCLoreIcon.querySelector('circle').setAttribute('fill', '#F63737');
                            } else if (typeOfCurrency === 'payment-Bitcoin') {
                                paymentBtcIcon.querySelector('circle').setAttribute('fill', '#F7931A');
                            }
                        } else {
                            rewardIcon.querySelector('circle').setAttribute('fill', '#46CA93'); 
                            paymentCLoreIcon.querySelector('circle').setAttribute('fill', '#292929'); 
                            paymentBtcIcon.querySelector('circle').setAttribute('fill', '#A4A4A4');
                        }
                     },
                    }
                  };
                  
                new Chart(canvas, config);
            }
        } else {
            document.getElementById('revenue-chart-empty').style.display = 'flex';
        }
    }
}


//TODO: вынести в отдельный файл
function formatFiltersForToday(dateString) {
    const localeString = dayjs(dateString);
    const today = dayjs();

    const timestamp_start = localeString.toISOString()
    const timestamp_finish = dayjs(dateString).isSame(today, 'day') ? dayjs().minute(0).second(0).millisecond(0).toISOString()  : localeString.endOf('day').toISOString()

    return { timestamp_start, timestamp_finish};
}

function formatFiltersForRange(dateString) {
    const dates = dateString.split(' to ').map(date => dayjs(date));
    const newDates = dates.length === 1
      ? [dates[0], dates[0]]
      : dates;

    return ({
        timestamp_start: newDates[0].toISOString(),
        timestamp_finish: newDates[1].endOf('day').toISOString()
    })
}

function formatFiltersForLast24h() {
    const now = dayjs().startOf('hour').add(1, 'hour'); 
    const hours24Ago = now.subtract(24, 'hour');

    return {
        timestamp_start: hours24Ago.toISOString(),
        timestamp_finish: now.toISOString()
    };
}

function getMaxValueFromArrays(...arrays){
    return Math.max(...arrays.flat(2).filter(value => value !== undefined));
}

function handle_change_payment_currency() {
    if ($('#payment-currency').prop('checked')) {
        document.getElementById('payment-reward').style.display = 'none';
        document.getElementById('payment-clore').style.display = 'none';
        document.getElementById('payment-btc').style.display = 'none';
        document.getElementById('payment-reward-usd').style.display = 'inline';
        document.getElementById('payment-clore-usd').style.display = 'inline';
        document.getElementById('payment-btc-usd').style.display = 'inline';
    } else {
        document.getElementById('payment-reward').style.display = 'inline';
        document.getElementById('payment-clore').style.display = 'inline';
        document.getElementById('payment-btc').style.display = 'inline';
        document.getElementById('payment-reward-usd').style.display = 'none';
        document.getElementById('payment-clore-usd').style.display = 'none';
        document.getElementById('payment-btc-usd').style.display = 'none';
    }
}

function render_doughnut (online_servers, offline_servers, rented_servers) {
    let chartStatus = Chart.getChart('server-status-chart');

    if (chartStatus !== undefined) {
        chartStatus.destroy();
    }

    const is_servers_empty = online_servers === 0 && offline_servers === 0 && rented_servers === 0;

    const canvas = document.getElementById('server-status-chart').getContext('2d');

    const all_online_servers_rented = online_servers === rented_servers;
    const online_servers_without_rented = online_servers - rented_servers

    const doughnut_data = all_online_servers_rented ? [rented_servers, offline_servers] : [rented_servers, online_servers_without_rented, offline_servers];
    const doughnut_colors = all_online_servers_rented ? ['#346a54', '#F73737'] : ['#346a54', '#46CA93', '#F73737']

    const config = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: is_servers_empty ? [1] : doughnut_data,
                backgroundColor: is_servers_empty ? ['#8F889A'] : doughnut_colors,
                borderColor: 'transparent',
                hoverOffset: 4,
                borderRadius: 5,
                spacing: 3
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            const dataset = tooltipItem.dataset;
                            const index = tooltipItem.dataIndex;
                            const value = dataset.data[index];

                            let label;
                            if (all_online_servers_rented) {
                                label = index === 0 ? `Rented: ${value}` : `Offline: ${value}`;
                            } else {
                                if (index === 0) {
                                    label = `Rented: ${value}`;
                                } else if (index === 1) {
                                    label = `Online: ${value}`;
                                } else {
                                    label = `Offline: ${value}`;
                                }
                            }
                            return label;
                        }
                    },
                    displayColors: false,
                    caretSize: 0,
                    borderRadius: 8,
                    borderColor: 'rgba(80, 80, 80, 0.46)',
                    borderWidth: 1,
                    backgroundColor: '#15141A',
                    padding: {
                        top: 4,
                        right: 8,
                        bottom: 4,
                        left: 8
                    },
                    bodyFont: {
                        family: 'TT Firs Neue',
                        size: 14
                    },
                    enabled: !is_servers_empty
                }
            }
        }
    };

    new Chart(canvas, config);
}

function render_my_servers (myservers) {
    let servers_list = ''
    let offline_servers = 0
    let online_servers = 0
    let rented_servers = 0
    const max_servers_to_show = 7
    // const servers_length = myservers["servers"].length > max_servers_to_show ? max_servers_to_show : myservers["servers"].length;

    if (myservers["servers"].length) {
        for(var i=0;i<myservers["servers"].length;i++){
            const server = myservers["servers"][i];

            if (server["online"]) {
                online_servers++
            } else {
                offline_servers++
            }

            if (server["rented"]) {
                rented_servers++
            }

            if(i < max_servers_to_show){
                servers_list += `<li class="server-item">
                    ${server["online"] ? '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" fill="none"><circle cx="4" cy="4.5" r="4" fill="#46CA93"/></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" fill="none"><circle cx="4" cy="4.5" r="4" fill="#F73737"/></svg>'}
                    <span class="aero-b2">${server["name"]}</span>
                    ${server["rented"] ? '<p class="rented-label aero-caption">Rented</p>' : ''}
                </li>`
            }
        }
    }

    const is_servers_empty = online_servers === 0 && offline_servers === 0 && rented_servers === 0;

    $("#my-servers").html(`
        <div class="my-servers-wrapper">
            <p class="servers-header-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path stroke="#F73737" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.657 16C4.085 16 2 13.993 2 11.517c0-2.475 2.085-4.482 4.657-4.482.393-1.762 1.794-3.2 3.675-3.773 1.88-.572 3.956-.193 5.444 1 1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486 0 1.927-1.551 3.487-3.465 3.487H6.657M12 16v5m4-5v4a1 1 0 0 0 1 1h4M8 16v4a1 1 0 0 1-1 1H3"/></svg>
              <span class="aero-b4">All your servers</span>
            </p>
            <ul id="servers-list">
              ${is_servers_empty ? `<li class="aero-b1">You don't have any servers yet</li>` : servers_list}
            </ul>
            <a class="aero-btn-secondary" href="https://clore.ai/marketplace#myservers"><span class="aero-b3">See all servers</span></a>
        </div>
    `)

    if (is_servers_empty) {
        $("#servers-list").addClass('empty-wrapper')
    }

    $("#server-status").html(`
        <div class="server-status-wrapper">
          <p class="server-status-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path stroke="#F73737" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.657 16C4.085 16 2 13.993 2 11.517c0-2.475 2.085-4.482 4.657-4.482.393-1.762 1.794-3.2 3.675-3.773 1.88-.572 3.956-.193 5.444 1 1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486 0 1.927-1.551 3.487-3.465 3.487H6.657M12 16v5m4-5v4a1 1 0 0 0 1 1h4M8 16v4a1 1 0 0 1-1 1H3"/></svg>
            <span class="aero-b4">Servers status</span>
          </p>
          <div class="server-status-content">
            <div class="server-status-doughnut">
              <canvas id="server-status-chart"></canvas>
              <div class="servers-count">
                <p class="aero-caption">Servers</p>
                <p class="aero-b3">${myservers["servers"].length}</p>
              </div>
            </div>
            <div class="server-status-legend">
            ${is_servers_empty ? 
               `<div class="server-status-legend-wrapper">
                <div class="server-status-legend-item empty-server-status">
                  <p class="server-status-legend-item-info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" fill="none"><circle cx="6" cy="6.5" r="6" fill="#8F889A"/></svg>
                    <span class="aero-caption">Your servers</span>
                  </p>
                  <span class="aero-caption">0</span>
                </div>
              </div>` 
              :
              `<div class="server-status-legend-wrapper">
                <div class="server-status-legend-item">
                  <p class="server-status-legend-item-info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" fill="none"><circle cx="6" cy="6.5" r="6" fill="#F73737"/></svg>
                    <span class="aero-caption">Offline servers</span>
                  </p>
                  <span class="aero-caption">${offline_servers}</span>
                </div>
              </div>
              <div class="server-status-legend-wrapper">
                <div class="server-status-legend-item">
                  <p class="server-status-legend-item-info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" fill="none"><circle cx="6" cy="6.5" r="6" fill="#46CA93"/></svg>
                    <span class="aero-caption">Online servers</span>
                  </p>
                  <span class="aero-caption">${online_servers}</span>
                </div>
                <div class="server-status-legend-item">
                  <p class="server-status-legend-item-info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" fill="none"><circle cx="6" cy="6.5" r="6" fill="#346a54"/></svg>
                    <span class="aero-caption">Of which rented</span>
                  </p>
                  <span class="aero-caption">${rented_servers}</span>
                </div>
              </div>`
            }
            </div>
          </div>
        </div>
    `)

    if (is_servers_empty) {
        $(".server-status-legend").css("justify-content", "center")
    }

    render_doughnut(online_servers, offline_servers, rented_servers)
}

function select_calendar_period(period) {
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.classList.remove('select-period-btn')
    });
    $(`[data-period=${period}]`).addClass('select-period-btn');
    render_statistics(orders, period);
    set_calendar_arrows(period);
}

function set_calendar_arrows (period) {
    if (period === 'month') {
        $('#date-picker-btn-left').prop('disabled', true);
        $('#date-picker-btn-right').prop('disabled', true);
    }
}
