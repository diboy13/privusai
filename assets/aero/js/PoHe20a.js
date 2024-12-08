// var pohInt=setInterval(async function(){
//     try{
//     if($ && getCookie && call_api){ // jquery loaded
//         clearInterval(pohInt)
//         // if(getCookie("clore_token")){
//         //     render_PoH()
//         // }else{
//         //     location.replace("/login")
//         // }
//     }}catch(e){console.error(e)}
// },10)
var glob_wallets=0, rew_calc={}, GPU_CAPACITY={}
function render_PoH(){
    return new Promise(async(resolve, reject) => {
        let cerr=''
        let poh_err = ''
        let api_res=await call_api("proof_of_holding").catch(function (err) {cerr=err})
        let poh_res=await call_poh_api("poh/user/info").catch(function (err) {poh_err=err})
        if(cerr){
            reject('fail')
        }else if(api_res["status"]){
            GPU_CAPACITY = api_res?.GPU_CAPACITY
            var fee_lowering_html='', default_fees={
                "bitcoin":{
                    "spot":2.5,
                    "on-demand":10
                },
                "usd":{
                    "spot":12,
                    "on-demand":19.5
                }
            }
            if(api_res["not_launched"]) $(".poh-launch-info").css("display","flex");
            rew_calc = api_res["rew_calc"];
            for(var i=0;i<Object.keys(api_res["fees"]).length;i++){
                let c_key = Object.keys(api_res["fees"])[i]
                var c_currency_obj = api_res["fees"][c_key], c_table_body=''
                for(var x=-1;x<Object.keys(c_currency_obj).length;x++){
                    var c_s = c_currency_obj[Object.keys(c_currency_obj)[x]]
                    c_table_body+=`<tr>
                        <td class="amount-td">${x<0?'0':Object.keys(c_currency_obj)[x]+"+"}</td>
                        <td class="demand-fee-td"><div>${parseFloat(x<0?default_fees[c_key]["on-demand"].toFixed(2):(default_fees[c_key]["on-demand"]-(c_s["on-demand"]/1)).toFixed(2))}%</div></td>
                        <td class="spot-fee-td"><div>${c_key=="usd"?'-':(parseFloat(x<0?default_fees[c_key]["spot"].toFixed(2):(default_fees[c_key]["spot"]-(c_s["spot"]/1)).toFixed(2)))+"%"}</div></td>
                    </tr>`
                }
                fee_lowering_html += `
                <table id=table-${c_key}>
                    <thead>
                        <tr>
                            <th class="aero-h5 amount-th"><div>$CLORE amount</div></th>
                            <th class="aero-h5 demand-fee-th"><div>On demand fee</div></th>
                            <th class="aero-h5 spot-fee-th"><div>SPOT fee</div></th>
                        </tr>

                    </thead>
                    <tbody>
                       ${c_table_body} 
                    </tbody>
                </table>`;
            }
            $(".PoH-tables").html(fee_lowering_html);
            var desired_html='',total_holding=0,total_one_max=0,total_wallets=0
            //TODO: удалить моки
            // api_res["PoH"] = [
            //     {status: "valid", balance: "15020250", address: "ANJ2jnfakR1n34nmksjggq232g", created: 1722937081, unique: "1sD1QIJWa4PmvDojAyCkEUR1r7jfF6XH"},
            //     {status: "valid", balance: "16235", address: "ANJ2jnfakR1n34nmksjggq232g", created: 1722937291, unique: "iOUqalWGwEkZcApz2xNTveZHrXo0rLFd"}
            // ]

            for(var i=0;i<api_res["PoH"].length;i++){
                let c_addr = api_res["PoH"][i]
                if(c_addr["status"]=="valid" && Object.keys(c_addr).includes("balance")) {
                    desired_html+=`<div class="poh-address aero-b3">
                      <div class="wallet-info">
                        <div class="wallet-address-wrapper">
                            <div class="poh-col-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                  <path d="M9 13.5L11 15.5L15 10.5M21 12.5C21 17.4706 16.9706 21.5 12 21.5C7.02944 21.5 3 17.4706 3 12.5C3 7.52944 7.02944 3.5 12 3.5C16.9706 3.5 21 7.52944 21 12.5Z" stroke="#46CA93" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div class="poh-col-2">
                                <span>${c_addr["address"]?c_addr["address"]:'⚠️ Invalid Address'}</span>
                            </div>
                        </div>
                        <div class="poh-col-3">
                            <span>${c_addr["status"]=="valid"?(!Object.keys(c_addr).includes("balance")?`<i class="fa-solid fa-circle-notch fa-spin"></i>`:Math.floor(c_addr["balance"])):(c_addr["status"]=="fail")?'N/A':`<i class="fa-solid fa-circle-notch fa-spin"></i>`}</span> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                              <path d="M15.3173 2.00943C13.7984 1.06604 12.4693 0.625786 10.4441 0.5C8.5454 2.261 8.60868 5.84588 10.4441 7.48112C11.2035 4.46226 12.9756 2.82704 15.3173 2.00943Z" fill="#F73737"/>
                              <path d="M17.5318 3.70755C14.6838 3.58176 12.4688 6.16037 12.4688 8.67609C14.8104 7.10375 17.5318 7.04089 19.8102 8.29874C19.4305 6.28616 18.7122 5.22524 17.5318 3.70755Z" fill="#F73737"/>
                              <path d="M20.0007 10.8777C18.2286 8.99087 14.7477 9.17956 13.0389 10.9406C15.8295 11.6141 17.3426 12.8902 18.6083 15.7204C19.5747 14.1352 20.0007 12.9531 20.0007 10.8777Z" fill="#F73737"/>
                              <path d="M16.8359 17.9214C16.646 14.9025 14.5861 13.1266 11.8361 12.9528C13.2594 15.4266 13.5449 17.7327 12.2791 20.2484C14.1686 19.7342 15.2536 19.2421 16.8359 17.9214Z" fill="#F73737"/>
                              <path d="M9.55779 20.4997C11.3932 18.6758 11.5197 15.7198 9.55779 13.5186C8.79833 16.6003 7.15284 18.1726 4.68457 19.0531C6.38435 20.0838 7.48808 20.3164 9.55779 20.4997Z" fill="#F73737"/>
                              <path d="M2.59619 17.2926C5.55283 17.0181 7.46943 15.0913 7.46943 12.2611C5.63403 13.7077 2.5329 13.8964 0.12793 12.8272C0.799543 14.781 1.33363 15.8026 2.59619 17.2926Z" fill="#F73737"/>
                              <path d="M0.000957802 10.0594C1.58318 11.7575 4.87418 12.0091 6.96272 10.0594C3.98814 9.36755 2.2459 7.62538 1.4566 5.34239C0.57065 6.66315 -0.0272619 8.48776 0.000957802 10.0594Z" fill="#F73737"/>
                              <path d="M3.16504 3.14182C3.60807 6.16068 5.25357 7.79588 8.16484 8.04747C6.69538 5.63272 6.58262 3.3305 7.65852 0.751892C5.57002 1.25504 4.46553 1.94834 3.16504 3.14182Z" fill="#F73737"/>
                            </svg> 
                            <span>CLORE</span>
                        </div>
                      </div>
                      <button class="aero-btn-secondary" onclick="remove_poh_wallet(\`${c_addr["created"]}-${c_addr["address"]}\`)">Delete</button>
                    </div>`
                    total_holding += Math.floor(c_addr["balance"]);
                    total_wallets++;
                    if(Math.floor(c_addr["balance"])>total_one_max) total_one_max=Math.floor(c_addr["balance"])
                }
            }
            desired_html=desired_html.replace(/<div class="poh-col-3">/g,`<div class="poh-col-3 ${total_one_max<10000000?`up-to-10m`:`up-to-100m`}">`)
            if (desired_html) {
                $('.poh-addresses').html(`<div class="poh-addresses-wrapper">${desired_html}</div>`);
            } else {
                $('.poh-addresses').html(`<div class="poh-addresses-empty"><span class="aero-b1">You don't have any wallets yet</span></div>`)
            }
            $("#PoH-total-holding").html(`${total_holding} CLORE`);
            if(total_holding>0) {
                $("#poh-calc-holding").val(total_holding);
            }else{
                $(".poh-info").css("border-top","0px solid white;");
            }
            $("#total-PoH-wallets").html(`You have ${total_wallets}/10 wallets`);
            glob_wallets = total_wallets;
            //console.log(api_res)
            resolve(true)

            if (poh_res) {
                const rented_amount = poh_res.balance?.offers?.['rented_amount'];
                const leased_amount = poh_res.balance?.offers?.['leased_amount'];
                const reward_amount = poh_res.balance?.reward_amount;
                if (rented_amount) {
                    $("#PoH-total-earn").html(`${toFixed(rented_amount)} CLORE`);
                }
                if (leased_amount) {
                    $("#PoH-total-borrow").html(`${toFixed(leased_amount)} CLORE`);
                }
                if (reward_amount) {
                    $("#PoH-total-reward").html(`${toFixed(reward_amount)} CLORE`);
                }
            }
            if (Object.keys(gpu_calculator_machines).length == 0){
                add_poh_calc_machine()
            }
        }
    })
}

function close_add_wallet(){
    $(".add-wallet-bg").css("display","none");
}

function PoH_initializeSelect(id, defaultValue, { data, onChange }) {
    const options = { data, onChange, defaultValue };
    const selects = document.querySelectorAll(`[data-id="${id}"]`);

    if (selects) {
        selects.forEach((select) => {
            new AeroSelect(select, options);
        });
    } else {
        console.error(`Select ${id} not found`);
    }
}

async function submit_poh_address(){
    let cerr = "",
      init_json = {
        address: $("#poh-address").val(),
        message: $("#poh-message").val(),
        signature: $("#poh-signature").val(),
      };
    if(!$("#poh-address").val() || !$("#poh-message").val() || !$("#poh-signature").val()){
        console.error("f*ck")
        return;
    }
    $(".add-wallet-input").html(`<div class="poh-add-loading">
                <i class="fa-solid fa-circle-notch fa-spin fa-2x"></i>
            </div>`);
    let api_res=await call_api("create_proof_of_holding",init_json).catch(function (err) {cerr=err})
    if(cerr){

    }else{
        console.log(api_res)
        if(api_res["error"]=="rate_limited"){
            //submit_poh_address()
        }else if(api_res["status"]){
            let compl_status = await wait_for_PoH_initialization(api_res["time"],api_res["unique"])
            console.log(compl_status)
            if(compl_status=="valid"){
                $("#rs-top-txt").html("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\">\n" +
                  "  <path d=\"M11.1111 16L14.7778 19.6667L20.8889 12.3333M27 16C27 22.0751 22.0751 27 16 27C9.92487 27 5 22.0751 5 16C5 9.92487 9.92487 5 16 5C22.0751 5 27 9.92487 27 16Z\" stroke=\"#46CA93\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n" +
                  "</svg><span>Successful</span>");
                    render_PoH()
                    $(".add-wallet-input").html(`<div class="poh-add-info">
                            <span class="aero-b1">Your wallet was successfully added</span>
                        </div>`);
            } else {
                $("#rs-top-txt").html("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\">\n" +
                  "  <path d=\"M11.6787 11.6793L15.9999 16.0005M15.9999 16.0005L20.3211 20.3217M15.9999 16.0005L20.3211 11.6793M15.9999 16.0005L11.6787 20.3217M27 16C27 22.0751 22.0751 27 16 27C9.92487 27 5 22.0751 5 16C5 9.92487 9.92487 5 16 5C22.0751 5 27 9.92487 27 16Z\" stroke=\"#FF0E0E\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n" +
                  "</svg><span>Uh oh...</span>");
                if(compl_status=="backend-offline"){
                    $(".add-wallet-input").html(`<div class="poh-add-info">
                <span class="aero-b1">Backend issue appeared, please try again later</span>
            </div>`);
                }else if(compl_status=="already_assigned"){
                    $(".add-wallet-input").html(`<div class="poh-add-info">
                <span class="aero-b1">This wallet is already assigned to an clore.ai account</span>
            </div>`);
                }else{
                    $(".add-wallet-input").html(`<div class="poh-add-info">
                <span class="aero-b1">Invalid signature</span>
            </div>`);
                }
            }
        }else if(api_res["error"]=="reached_limit"){

        }else{

        }
    }
}

function wait_for_PoH_initialization(time,unique){
    return new Promise(async(resolve, reject) => {
        let completed = false, status=''
        while(!completed){
            let cerr=''
            let api_res=await call_api("proof_of_holding").catch(function (err) {cerr=err})
            if(!cerr){
                try{
                    if(api_res["status"]){
                        let cpl=false
                        for(var i=0;(i<api_res["PoH"].length && !cpl);i++){
                            let cPoH=api_res["PoH"][i]
                            if(cPoH["created"]==time && cPoH["unique"]==unique && cPoH["status"]!="pending"){
                                cpl=true
                                status=cPoH["status"]
                                completed=true
                            }
                        }
                    }
                }catch(e){}
            }
            await sync_timeout(1500)
        }
        resolve(status)
    })
}

function add_wallet(){
    var reached_max_wallets = glob_wallets>9?true:false
    if(reached_max_wallets){
        $(".add-wallet-bg").css("display", "flex");
        $("#rs-top-txt").html("You have reached limit ");
        $(".add-wallet-input").html(`<div class="poh-add-info">
                <span class="aero-b1">Maximum available wallets: 10</span>
            </div>`);
    }else{
        $(".add-wallet-bg").css("display", "flex");
        $("#rs-top-txt").html("Add wallet");
        $(".add-wallet-input").html(`<div class="aero-input-wrapper">
                <label for="poh-address" class="aero-input-sign">Wallet Address</label>
                <input type="input" class="aero-input" placeholder=" " name="poh-address" id="poh-address" required="">
            </div>
            <div class="aero-input-wrapper">
                <label for="poh-message" class="aero-input-sign">Message</label>
                <input type="input" class="aero-input" placeholder=" " name="poh-message" id="poh-message" required="">
            </div>
            <div class="aero-input-wrapper">
                <label for="poh-signature" class="aero-input-sign">Signature</label>
                <input type="input" class="aero-input" placeholder=" " name="poh-signature" id="poh-signature" required="">
            </div>
            <div class="submit-parent">
                <div class="aero-btn-primary" onclick="submit_poh_address()">
                    <span>Submit</span>
                </div>
            </div>`);
    }
}

function create_PoH(){

}

function remove_poh_wallet(identifier){
    $("#rs-top-txt").html("Do you really want to remove<br/>your wallet?");
    $(".add-wallet-bg").css("display", "flex");
    $(".add-wallet-input").html(`<div class="poh-rm-wallet-wi">
        <span class="aero-b1">${identifier.split("-")[1]}</span>
        <div class="poh-rm-btns noselect">
            <div class="aero-btn-primary" onclick="do_rm_poh('${identifier}')">
                <span>Remove</span>
            </div>
            <div class="aero-btn-secondary" onclick="close_add_wallet()">
                <span>Cancel</span>
            </div>
        </div>
    </div>`);
    console.log(identifier)
}

async function do_rm_poh(identifier){
    let cerr=''
    let api_res=await call_api("remove_proof_of_holding",{
        creation_time:parseInt(identifier.split('-')[0]),
        address:identifier.split('-')[1]
    }).catch(function (err) {cerr=err})
    if(cerr){

    }else{
        console.log(api_res)
    }
    await render_PoH().catch(function (err) {})
    close_add_wallet()
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
        $("#tab-btn-3").css('display', 'none')
    } else if (tab === 'tab-btn-2') {
        $("#tab-btn-1").css('display', 'none');
        $("#tab-btn-2").css('display', 'flex');
        $("#tab-btn-3").css('display', 'none')
    } else if (tab === 'tab-btn-3') {
        $("#tab-btn-1").css('display', 'none');
        $("#tab-btn-2").css('display', 'none');
        $("#tab-btn-3").css('display', 'flex')

    }
}

function handle_change_currency() {
    if ($('#fee-currency').prop('checked')) {
        $('#table-usd').css('display', 'table');
        $('#table-bitcoin').css('display', 'none');
    } else {
        $('#table-usd').css('display', 'none');
        $('#table-bitcoin').css('display', 'table');
    }
}

var gpu_calculator_machines = {

}

function add_poh_calc_machine(){
    let gpu_calc_machine_ids = Object.keys(gpu_calculator_machines).map(Number);

    for(var i=0;i<1024;i++){
        if(!gpu_calc_machine_ids.includes(i)){
            gpu_calculator_machines[i] = {
                "gpu_variants": [],
                "rental_price": 0,
                "mfp": 0,
                "machine_count": 1
            }
            let gpu_type_selector_inner = ''
            Object.keys(GPU_CAPACITY).forEach(gpu_type => {
                gpu_type_selector_inner += `<li class="a-select-dropdown-item">
  <button class="a-select-dropdown-button js-a-select-dropdown-button" data-value="${gpu_type}">
    <span data-line-clamp="">${(gpu_type.toLocaleLowerCase().includes('nvidia') || gpu_type=='default')?'':'NVIDIA '}${gpu_type=="default"?'Other':gpu_type}</span>
  </button>
</li>`
            })
            $('.PoH-calc-machines').append(`<div class="PoH-calc-machine PoH-calc-machine-id-${i}">
  <div class="PoH-calc-machine-top">
    <span class="machine_type_if_poh-calc">Machine type #${i}</span>
    <button class="aero-btn-primary" onclick="poh_calc_remove_machine(${i})">
        <i class="fa-solid fa-trash"></i>
        <span>Remove</span>
      </button>
  </div><div class="flexbreak"></div>
  <div class="PoH-calc-machine-${i}-gpus PoH-machine-universal"></div>
  <div class="PoH-calc-machine-prices">
    <div class="PoH-calc-machine-rental-price">
      <span>Your rental price<br>USD/day</span>
      <input min="0" max="200" type="number" id="PoH-calc-price-${i}" value="0" oninput="calculate_clore_rewards()">
    </div>
    <div class="PoH-calc-machine-mfp">
      <span>Max. fair price<br>USD/day</span>
      <input min="0" max="200" type="number" id="PoH-calc-mfp-${i}" value="0" oninput="calculate_clore_rewards()">
    </div>
    <div class="PoH-calc-machine-cnt">
      <span>Amount of machines</span>
      <input min="0" max="1000" type="number" id="PoH-calc-machine-cnt-${i}" value="1" oninput="calculate_clore_rewards()">
    </div>
    <div class="PoH-calc-machine-add-gpu">
      <button class="aero-btn-primary" onclick="add_poh_calc_gpu(${i})">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
          <path
            d="M12 6.5C12 6.69096 11.9241 6.87409 11.7891 7.00912C11.6541 7.14414 11.471 7.22 11.28 7.22H6.72V11.78C6.72 11.971 6.64414 12.1541 6.50912 12.2891C6.37409 12.4241 6.19096 12.5 6 12.5C5.80904 12.5 5.62591 12.4241 5.49088 12.2891C5.35586 12.1541 5.28 11.971 5.28 11.78V7.22H0.72C0.529044 7.22 0.345909 7.14414 0.210883 7.00912C0.0758569 6.87409 0 6.69096 0 6.5C0 6.30904 0.0758569 6.12591 0.210883 5.99088C0.345909 5.85586 0.529044 5.78 0.72 5.78H5.28V1.22C5.28 1.02904 5.35586 0.845909 5.49088 0.710883C5.62591 0.575857 5.80904 0.5 6 0.5C6.19096 0.5 6.37409 0.575857 6.50912 0.710883C6.64414 0.845909 6.72 1.02904 6.72 1.22V5.78H11.28C11.471 5.78 11.6541 5.85586 11.7891 5.99088C11.9241 6.12591 12 6.30904 12 6.5Z"
            fill="white"></path>
        </svg>
        <span>Add GPU</span>
      </button>
    </div>
  </div>
</div>`);
            add_poh_calc_gpu(i)
            break
        }
    }
}

function poh_capacity_curve(provider_poh, capacity) {
    if (!capacity || isNaN(provider_poh) || isNaN(capacity)) return 0
    if (capacity >= provider_poh) {
        return provider_poh
    } else {
        let final_poh = capacity + Math.min(
            capacity,
            (provider_poh - capacity) * 0.5
        )
        if (final_poh < 0) final_poh = 0
        return final_poh
    }
}

function get_capacity_from_gpu_variants(gpu_variants){
    ttl_capacity = 0
    gpu_variants.forEach(variant => {
        ttl_capacity += variant.gpu_count * (GPU_CAPACITY[variant.gpu_type] || GPU_CAPACITY["default"])
    })
    return ttl_capacity
}

const mfp_poh_percent_limit = 2.5

function calculate_clore_rewards(){
    let set_poh_amount = parseFloat($("#poh-calc-holding").val() || 0)
    let machines = []
    let total_rental_price = 0, total_rental_mfp_limited_price = 0, total_poh_capacity = 0, too_much_machines = false
    Object.keys(gpu_calculator_machines).map(Number).forEach(machine_type_id => {
        let machine_cnt = parseInt($(`#PoH-calc-machine-cnt-${machine_type_id}`).val() || 0)
        for(var i=0;i<machine_cnt;i++){
            let gpu_variants = gpu_calculator_machines[machine_type_id].gpu_variants
            if (Array.isArray(gpu_variants)){
                let machine = {
                    "rental_price": parseFloat($(`#PoH-calc-price-${machine_type_id}`).val() || 0),
                    "mfp": parseFloat($(`#PoH-calc-mfp-${machine_type_id}`).val() || 0),
                    "poh_capacity": get_capacity_from_gpu_variants(gpu_variants)
                }
                if(machine.rental_price > 0){
                    total_poh_capacity += machine?.poh_capacity
                    total_rental_mfp_limited_price += (machine.rental_price > machine.mfp ? machine.mfp : machine.rental_price)
                    total_rental_price += machine.rental_price
                    machines.push(machine)
                    if(machines.length > 1000){
                        too_much_machines=true
                        break
                    }
                }
            }
        }
    })

    if (too_much_machines){
        $(`.poh-acc-r`).html(`Too much machines inputed`)
        return
    }

    set_poh_amount = poh_capacity_curve(set_poh_amount, total_poh_capacity)

    let pure_price_part = total_rental_price / rew_calc?.current_orders_ttl_price_usd * rew_calc.pr.only_price * rew_calc.pmr * 60 * 24,
        mfp_part = total_rental_mfp_limited_price / rew_calc?.current_orders_ttl_fair_price_usd * rew_calc.pr.max_fair_price * rew_calc.pmr * 60 * 24

    let only_price_PoH_difficulty_usd_part = 0,
        mfp_PoH_part = 0
    
    machines.forEach(machine => {
        only_price_PoH_difficulty_usd_part += ((set_poh_amount / 1000) * machine.rental_price) * (machine.rental_price / total_rental_price) / rew_calc?.only_price_PoH_difficulty_usd * rew_calc.pr.only_price_PoH * rew_calc.pmr * 60 * 24
        let mfp_poh_difficulty_rise = ((machine.rental_price > machine.mfp ? machine.mfp : machine.rental_price) / total_rental_mfp_limited_price) * (set_poh_amount/1000) * (machine.rental_price > machine.mfp ? machine.mfp : machine.rental_price)
        let clore_mfp_poh_earnings = (mfp_poh_difficulty_rise / rew_calc.mfp_PoH_difficulty_usd) * rew_calc.poh_mfp_bonus * rew_calc.pr.max_fair_price_PoH * rew_calc.pmr * 60 * 24
        let usd_mfp_poh_earnings_24h = clore_mfp_poh_earnings * rew_calc?.usd_rates?.["CLORE-Blockchain"]
        let usd_mfp_poh_earnings_limites = machine.mfp * mfp_poh_percent_limit > usd_mfp_poh_earnings_24h ? usd_mfp_poh_earnings_24h : machine.mfp * mfp_poh_percent_limit
        mfp_PoH_part += usd_mfp_poh_earnings_limites / rew_calc?.usd_rates?.["CLORE-Blockchain"]
    })

    /*console.log({
        pure_price_part,
        mfp_part,
        only_price_PoH_difficulty_usd_part,
        mfp_PoH_part
    })*/

    let all_r = [pure_price_part,
        mfp_part,
        only_price_PoH_difficulty_usd_part,
        mfp_PoH_part]
    let all_r_num = 0
    all_r.forEach(item => {
        if(!isNaN(item)){
            all_r_num+=item
        }
    })

    $(`.poh-acc-r`).html(`${all_r_num.toFixed(8)} CLORE/day`)

    if(!rew_calc?.usd_rates?.["CLORE-Blockchain"]){
        // show 0 as can't get data
    }
}

let last_gpu_dropdown_z_index = 6000000

function splitOnLastTwoUnderscores(str) {
    const parts = str.split('_');

    if (parts.length < 3) {
        return false
    }

    const lastTwo = parts.slice(-2);
    const rest = parts.slice(0, -2);

    return [rest.join('_'), ...lastTwo];
}

function add_poh_calc_gpu(machine_id){
    if (gpu_calculator_machines[machine_id]){
        gpu_calculator_machines[machine_id]["gpu_variants"].push(
            {
                "gpu_count": 1,
                "gpu_type": "default"
            }
        )
        let gpu_type_selector_inner = ''
        Object.keys(GPU_CAPACITY).forEach(gpu_type => {
            gpu_type_selector_inner += `<li class="a-select-dropdown-item">
  <button class="a-select-dropdown-button js-a-select-dropdown-button" data-value="${gpu_type}_${machine_id}_${gpu_calculator_machines[machine_id]["gpu_variants"].length-1}">
    <span data-line-clamp="">${(gpu_type.toLocaleLowerCase().includes('nvidia') || gpu_type == 'default') ? '' : 'NVIDIA '}${gpu_type == "default" ? 'Other' : gpu_type}</span>
  </button>
</li>`
        })
        last_gpu_dropdown_z_index -= 1
        if(last_gpu_dropdown_z_index < 120000) last_gpu_dropdown_z_index=6000000
        let x = `<div class="PoH-calc-gpu-cnt">
  <span>GPU count</span>
  <input min="0" max="19" value="1" oninput="poh_calc_update_gpu_cnt(${machine_id}, ${gpu_calculator_machines[machine_id]["gpu_variants"].length - 1})" type="number" id="PoH-calc-gpu-cnt-${machine_id}-${gpu_calculator_machines[machine_id]["gpu_variants"].length-1}" oninput>
</div>
<!-- -------------------->
<div class="PoH-calc-machine-gpu-input">
  <div data-id="poh-calculator-machines-${machine_id}-${gpu_calculator_machines[machine_id]["gpu_variants"].length-1}" class="a-select js-a-select" style="z-index: ${last_gpu_dropdown_z_index}">
    <label for="sort" class="a-select-wrapper js-a-select-label">
      <div class="a-select-group">
        <div class="a-select-label" data-line-clamp="">GPU Type</div>
        <div class="a-select-selected js-a-select-selected" data-line-clamp="">Default</div>
      </div>
      <div class="a-select-icon js-a-select-icon">
        <svg viewBox="0 0 16 16" class="a-select-icon-svg-plus">
          <path fill="currentColor"
            d="M14 8a.72.72 0 0 1-.72.72H8.72v4.56a.72.72 0 1 1-1.44 0V8.72H2.72a.72.72 0 0 1 0-1.44h4.56V2.72a.72.72 0 0 1 1.44 0v4.56h4.56A.72.72 0 0 1 14 8Z">
          </path>
        </svg>
        <svg viewBox="0 0 16 16" class="a-select-icon-svg-minus">
          <path fill="currentColor"
            d="M14 8c0 .265-.076.52-.21.707-.136.188-.319.293-.51.293H2.72c-.191 0-.374-.105-.51-.293A1.224 1.224 0 0 1 2 8c0-.265.076-.52.21-.707.136-.188.319-.293.51-.293h10.56c.191 0 .374.105.51.293.134.187.21.442.21.707Z">
          </path>
        </svg>
      </div>
    </label>
    <ul class="a-select-dropdown js-a-select-dropdown ps">
      ${gpu_type_selector_inner}
      <div class="ps__rail-x" style="left: 0px; bottom: 0px;">
        <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
      </div>
      <div class="ps__rail-y" style="top: 0px; right: 0px;">
        <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div>
      </div>
    </ul>
    <input type="hidden" name="sort" class="a-select-input js-a-select-input" value="default">
  </div>
</div>
<!-- -------------------->
<div class="flexbreak"></div>`
        $(`.PoH-calc-machine-${machine_id}-gpus`).append(x)
        PoH_initializeSelect(`poh-calculator-machines-${machine_id}-${gpu_calculator_machines[machine_id]["gpu_variants"].length-1}`, "default", {
            data: [],
            defaultValue: 'default',
            onChange: (value) => poh_calc_configure_machine_gpu(value)
        })
    }
    calculate_clore_rewards()
}

function poh_calc_configure_machine_gpu(value) {
    let gt = splitOnLastTwoUnderscores(value)
    //console.log(gt)
    if(Array.isArray(gt) && gt.length==3){
        let [gpu_type, machine_id, gpu_pos] = gt
        machine_id = parseInt(machine_id)
        gpu_pos = parseInt(gpu_pos)
        
        try{
            gpu_calculator_machines[machine_id]["gpu_variants"][gpu_pos].gpu_type = gpu_type
        }catch(e){}
    }
    calculate_clore_rewards()
}

function poh_calc_update_gpu_cnt(machine_id, gpu_pos){
    try{
        gpu_calculator_machines[machine_id]["gpu_variants"][gpu_pos].gpu_count = parseInt($(`#PoH-calc-gpu-cnt-${machine_id}-${gpu_pos}`).val() || 0)
    }catch(e){}
    calculate_clore_rewards()
}

function poh_calc_remove_machine(machine_id){
    delete gpu_calculator_machines[machine_id]
    $(`.PoH-calc-machine-id-${machine_id}`).remove()
    calculate_clore_rewards()
}