const email_validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var cr_enabled = true, is_login_instance = location.pathname.substring(0, 6) == "/login", global_session_token=''
async function clore_reg(version){
    version=version?version:1
    if(!cr_enabled) return;
    let email=document.getElementById("email-form02-4")?$("#email-form02-4").val():$("#email-form02-c").val(),pass=document.getElementById("password-form02-4")?$("#password-form02-4").val():$("#password-form02-c").val(),pass2=$("#password2-form02-4").val(), is_chechked=false
    let fi = $("#fill-info")
    if(document.getElementById("vehicle3-form02-4")){
        if(document.getElementById("vehicle3-form02-4").checked) is_chechked=true
    }else if($(".register__checkbox").is(":checked")){
        is_chechked=true
    }
    if(!is_chechked){
        fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">It is required for you to agree with our Terms of Service & Privacy Policy</div>`);slowly_hide('fill-info',4000)
    }else if(email.match(email_validRegex)){
        //console
        if(pass!=pass2){
            fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">Passwords are not the same</div>`);slowly_hide('fill-info',2000)
        }else if(pass.length<8){
            fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">Password needs to be at least 8 characters long</div>`);slowly_hide('fill-info',2000)
        }else if(grecaptcha.getResponse()==''){
            fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">You need to fill recaptcha</div>`);slowly_hide('fill-info',2000)
        }else{
            var c_err='', r = getCookie('ref-id')
            var sres = await send_post(webapi("reg"),{email,pass,rtoken:grecaptcha.getResponse(),ref_id:r?r:false}).catch(function (err) {c_err=err})
            cr_enabled=true
            if(c_err){
                fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">Connection error</div>`);slowly_hide('fill-info',2000)
            }else if(sres["error"]=="recaptcha_invalid"){
                grecaptcha.reset();
                fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">Connection error, please fill the recaptcha again</div>`);slowly_hide('fill-info',2000)
            }else if(sres["error"]=="not_verified_email"){
                fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">You have received verification email, please click on verification link</div>`);slowly_hide('fill-info',2500)
            }else if(sres["error"]=="already_registered"){
                fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">You are already registered</div>`);slowly_hide('fill-info',2000)
            }else if(sres["error"]){
                fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">Database error</div>`);slowly_hide('fill-info',2000)
            }else{
                $(version==2?".register__wrapper":".form-wrap").html(version==2?`<div class="col-md-12 specific-reg">
                <h4 class="mbr-fonts-style mb-2 mbr-fonts-style display-5 reg-ct" style="font-size:26px;"><strong><i class="fa-solid fa-envelope-circle-check"></i> Verify your email</strong></h4>
                <p class="mb-4 form-text mbr-fonts-style display-7">To prevent spam we have sent you verification email, please click on link inside it</p>
</div> <a class="col-md-12 input-group-btn mt-2" href="/login"><a href="/login" style="width:100%" class="btn v2-rc-btn btn-primary btn-form btn-bgr display-4">Go to login</a></a>`:`<div class="col-md-12 specific-reg">
                <h4 class="mbr-fonts-style mb-2 mbr-fonts-style display-5 reg-ct"><strong><i class="fa-solid fa-envelope-circle-check"></i> Verify your email</strong></h4>
                <p class="mb-4 form-text mbr-fonts-style display-7">To prevent spam we have sent you verification email, please click on link inside it</p>
</div> <a class="col-md-12 input-group-btn mt-2" href="/login"><a href="/login" style="width:100%" class="btn btn-primary btn-form btn-bgr display-4">Go to login</a></a>`)
                //fi.html(`<div  data-form-alert class="alert alert-success col-12">Welcome to CLORE.AI!</div>`)
            }
        }
        //$("#fill-info").html(`<div  data-form-alert class="alert alert-success col-12">Thanks for filling out the form!</div>`)
    }else{
        fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">You have entered invalid email</div>`)
        slowly_hide('fill-info',2000)
    }
}

function slowly_hide(obj,init_timeout){
    setTimeout(function(){
        var si = setInterval(function(){
            document.getElementById(obj).style.opacity=(document.getElementById(obj).style.opacity?document.getElementById(obj).style.opacity:1)-0.05
            if(document.getElementById(obj).style.opacity<=0.05){
                clearInterval(si)
                document.getElementById(obj).style.opacity=1
                $(`#${obj}`).html('')
            }
        },20)
    },init_timeout)
}
var identifier='', spawn_mfa_ever_run = false
function get_2FA(){
    let full_code=''
    document.querySelectorAll('.digit-input').forEach((input, index, inputs) => {
        full_code+=input.value
    })
    return full_code
}
function clear_2FA(){
    document.querySelectorAll('.digit-input').forEach((input, index, inputs) => {
        input.value=''
    })
}
async function try_submit_login_mfa(){
    let mfa_code=get_2FA()
    if(mfa_code.length==6){
        $(".auth-input-mfa-parent").css("display", "initial")
        $(".auth-input-mfa-parent").html(`<div class="auth-input-mfa-loader"><i class="fa-solid fa-circle-notch fa-spin"></i></div>`)
        let cerr=''
        let r = await send_post(webapi("submit_login_2fa"),{"activation_code":mfa_code, "login_token":global_session_token}).catch(function (err) {c_err=err})
        clear_2FA()
        if(cerr){
            $(".auth-input-mfa-parent").html(`<div class="auth-input-mfa-loader full-clore-col"><span>Connection error</span></div>`)
            setTimeout(function(){
                $(".auth-input-mfa-parent").css("display", "none")
            }, 1800)
        }else if(r["status"]){
            $(".auth-input-mfa-parent").html(`<div class="auth-input-mfa-loader full-clore-green"><span><i class="fa fa-check-circle" aria-hidden="true"></i> CODE IS VALID</span></div>`)
            setCookie("clore_token", global_session_token, (365 * 2))
            setTimeout(function () {
                location.replace('/account')
            }, 1500)
        }else if(r["error"] && r["error"]=="invalid-authenticator"){
            $(".auth-input-mfa-parent").html(`<div class="auth-input-mfa-loader full-clore-col"><span>Invalid Code</span></div>`)
            setTimeout(function () {
                $(".auth-input-mfa-parent").css("display", "none")
            }, 1800)
        }else{
            $(".auth-input-mfa-parent").html(`<div class="auth-input-mfa-loader full-clore-col"><span>Database failure</span></div>`)
            setTimeout(function () {
                $(".auth-input-mfa-parent").css("display", "none")
            }, 1800)
        }
    }
}
function prepare_mfa_window(){
    if (!spawn_mfa_ever_run) {
        spawn_mfa_ever_run = true
        $('.close').on('click', function () {
            var prt = $(this).parents('.modal');
            prt.addClass('out')
            setTimeout(function () {
                prt.fadeOut();
            }, 20);
        });
        document.querySelectorAll('.digit-input').forEach((input, index, inputs) => {
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
                try_submit_login_mfa()
                input.value = input.value.replace(nonNumeric, ''); // Strip non-numeric characters
                if (input.nextElementSibling && input.value) {
                    input.nextElementSibling.focus();
                }
            });
        });
    }
}
async function clore_login(version){
    version = version?version:1
    let email=$("#email-form02-c").val(),pass=$("#password-form02-c").val()
    if(document.getElementById("email-form02-2k")){
        email = $("#email-form02-2k").val();
    }
    if(document.getElementById("email-form02-2n")){
        email = $("#email-form02-2n").val()
    }
    let fi = $("#fill-info")
    if(email.match(email_validRegex)){
        if(location.pathname.includes("do-reset-password")){
            let psw1 = $("#password-form02-2n").val(), psw2 = $("#password2-form02-2n").val();
            if(psw1!=psw2){
                fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">Passwords must be the same</div>`);slowly_hide('fill-info',2000)
            }else if(psw1.length<8){
                fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">Password needs to be at least 8 characters long</div>`);slowly_hide('fill-info',2000)
            }else{
                var c_err=''
                var sres = await send_post(webapi("do_psw_reset"),{email,identifier,newpassword:psw1}).catch(function (err) {c_err=err})
                if(c_err){
                    fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">Connection error</div>`);slowly_hide('fill-info',2000)
                }else if(sres["error"]=="nv"){
                    fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">This password reset request is not valid</div>`);slowly_hide('fill-info',2000)
                }else if(sres["error"]){
                    fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">Database error</div>`);slowly_hide('fill-info',2000)
                }else{
                    $(".dragArea").html(`<div class="pr-one1">
                        <span><i class="fa-solid fa-circle-check"></i> Password reseted</span>
                    </div>
                    <div class="pw-one-redir">
                        <span>You will be redirected to login in 2 seconds...</span>
                    </div>`);
                    setTimeout(function(){
                        location.replace('/login')
                    },2000)
                }
            }
        }else if(location.pathname.includes("forgot_password")){
            if(grecaptcha.getResponse()==''){
                fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">You need to fill recaptcha</div>`);slowly_hide('fill-info',2000)
            }else{
                var c_err=''
                var sres = await send_post(webapi("psw_reset"),{email,rtoken:grecaptcha.getResponse()}).catch(function (err) {c_err=err})
                if(c_err){
                    fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">Connection error</div>`);slowly_hide('fill-info',2000)
                }else if(sres["error"]=="recaptcha_invalid"){
                    grecaptcha.reset();
                    fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">Connection error, please fill the recaptcha again</div>`);slowly_hide('fill-info',2000)
                }else if(sres["error"]=="invalid_credentials" || sres["not_verified_email"]=="not_verified_email"){
                    fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">Invalid email</div>`);slowly_hide('fill-info',2000)
                }else if(sres["error"]=="exceeded_rate"){
                    fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">You can request password reset maximum every 12 hours</div>`);slowly_hide('fill-info',2000)
                }else if(sres["error"]){
                    fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">Database error</div>`);slowly_hide('fill-info',2000)
                }else{
                    $(version==2?".register__wrapper":".form-wrap").html(`<div class="reset-s">
                        <span><i class="fa-solid fa-circle-check"></i> Success</span>
                    </div>
                    <div class="pwr-mail">
                        <span>📨 You will receive email regarding your password reset in few minutes</span>
                    </div>`);
                }
            }
        }else if(pass.length<8){
            fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">Invalid email or password</div>`);slowly_hide('fill-info',2000);
        }else if(grecaptcha.getResponse()==''){
            fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">You need to fill recaptcha</div>`);slowly_hide('fill-info',2000)
        }else{
            var c_err=''
            var sres = await send_post(webapi("login"),{email,pass,rtoken:grecaptcha.getResponse()}).catch(function (err) {c_err=err})
            if(c_err){
                fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">Connection error</div>`);slowly_hide('fill-info',2000)
            }else if(sres["error"]=="recaptcha_invalid"){
                grecaptcha.reset();
                fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">Connection error, please fill the recaptcha again</div>`);slowly_hide('fill-info',2000)
            }else if(sres["error"]=="not_verified_email"){
                fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">You have received verification email, please click on verification link</div>`);slowly_hide('fill-info',2500)
            }else if(sres["error"]=="invalid_credentials"){
                fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">Invalid email or password</div>`);slowly_hide('fill-info',2000);
            }else if(sres["error"]){
                fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">Database error</div>`);slowly_hide('fill-info',2000)
            }else if(sres["ban_reason"]){
                fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">${sres["ban_reason"]}</div>`);slowly_hide('fill-info',2000)
            }else{
                if(sres["mfa_required"]){
                    global_session_token=sres["token"]
                    prepare_mfa_window()
                    document.getElementById("setup-2fa-window").style.display = "block"
                }else{
                    setCookie("clore_token",sres["token"],(365*2))
                    location.replace('/account')
                }
            }
        }
    }else{
        if(location.pathname.includes("forgot_password")){
            fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">Invalid email</div>`);slowly_hide('fill-info',2000);
        }else{
            fi.html(`<div data-form-alert-danger class="alert alert-danger col-12">Invalid email or password</div>`);slowly_hide('fill-info',2000);
        }
    }
}
if(getCookie("clore_token") && (location.pathname.includes("login") || location.pathname.includes("register"))) location.replace("/account")
if(location.pathname.includes("do-reset-password")){
    let lh=location.hash
    var z=setInterval(function(){
        if(document.getElementById("email-form02-2n")){
            clearInterval(z)
            if(lh.split(':').length==2){
                //console.log(lh.split(":")[1]);
                identifier=lh.split(':')[0].substring(1)
                document.getElementById("email-form02-2n").value=lh.split(':')[1]
            }else{
                location.replace('/')
            }
        }
    },25)
}