
    var iiii=setInterval(function(){
        try{
        if(($(".navbar-nav").html() || $(".nav__login-wrapper").html()) && getCookie && setCookie){ // jquery loaded
            let search_obj={}
            if(location.search.includes('?')){
                let cs = location.search.replace(/\?/,'').split('&')
                for(var i=0;i<cs.length;i++){
                    search_obj[cs[i].split('=')[0]]=cs[i].split('=')[1]
                }
            }
            let vs = (search_obj["ref_id"]?search_obj["ref_id"]:'').length==8?search_obj["ref_id"]:false, v2_design_login=false
            if(getCookie("clore_token") && !vs){
                //console.log("finance")
                if($(".navbar-nav").html()) $(".navbar-nav").html(`
                <li class="nav-item"><a class="nav-link link text-primary display-5" href="/marketplace">Marketplace <i class="fa-solid fa-store top-icon-pos"></i></a></li>
                <li class="nav-item"><a class="nav-link link text-primary display-5" href="/account">Account <i class="fa-regular fa-user top-icon-pos"></i></a></li>
                <li class="nav-item"><a class="nav-link link text-primary display-5" href="#" aria-expanded="false" onclick=\"logout(true)\">Log Out <i class="fa-solid fa-right-from-bracket top-icon-pos"></i></a></li>
                `)
                v2_design_login=true
            }else if(vs){
                setCookie("ref-id", vs, 60);
                location.href = location.href.split('?')[0]
            }
            if(v2_design_login && $(".nav__login-wrapper").html()){
                $(".nav__login-wrapper").html(`
          <a class="info-user__main" href="/account">
            <img src="../../images/icon/icon-user.svg" alt="icon">
          </a>
          <a class="logaut-btn" onclick="logout(true)" href="#">
            <img src="../../images/icon/logaut.svg" alt="icon">
          </a>
          <button class="burger-btn">
            <img class="burger-btn__icon" src="../../images/burger-icon.svg" alt="icon">
          </button>`)
                listen_burger()
                $(`.nav__login-btn`).attr("href", v2_design_login ? "/account" : "/login")
            }else if($(".nav__login-wrapper").html()){
                $(".nav__login-wrapper").html(`
          <a class="nav__login-btn" href="/login"><img class="nav__login-wrapper-icon" src="../../images/login-icon.svg" alt="icon">Log in</a>
          <button class="burger-btn">
            <img class="burger-btn__icon" src="../../images/burger-icon.svg" alt="icon">
          </button>`)
                $(`.nav__login-btn`).attr("href",v2_design_login?"/account":"/login")
                $(`.nav__login-btn`).html(
                  v2_design_login
                    ? `<img class="nav__login-wrapper-icon" src="../../images/login-icon.svg" alt="icon"> Account`
                    : `<img class="nav__login-wrapper-icon" src="../../images/login-icon.svg" alt="icon">Log in`
                );
                listen_burger()
            }
            //beautiful_alert("#ak-alert",`You have reached maximum key limit, user can have maximally 3 keys.`,"success")
            clearInterval(iiii)
        }}catch(e){console.error(e)}
    },10)
var last_burger_state=0
function listen_burger(){
    try{
        const burgerBtn = document.querySelectorAll('.burger-btn');
        const burgerMenu = document.querySelectorAll('.burger-menu');
    
        burgerBtn.forEach((item) => {
            item.addEventListener('click', () => {
                burgerMenu.forEach(menu => {
                    if (last_burger_state==1){
                        menu.classList.remove('burger-menu-active')
                    }else{
                        console.log("A")
                        menu.classList.add('burger-menu-active')
                    }
                });
                last_burger_state++
                if(last_burger_state>1) last_burger_state=0
            });
        });
    }catch(e){}
}

function beautiful_alert(obj,html,type,margin_bottom){
    $(obj).html(`<div ${margin_bottom?(margin_bottom<0?`style="margin-top:${Math.abs(margin_bottom)}px" `:`style="margin-bottom:${margin_bottom}px" `):''}class="ba-fd${(type=="success"?` ba-green`:"")}">
        <div class="ba-td">
            <span>${html}</span>
        </div>
        <div class="ba-close">
            <i onclick="clear_beautiful_alert('${obj}')" class="fa-solid fa-xmark"></i>
        </div>
    </div>`)
}
function clear_beautiful_alert(obj){
    $(obj).html('')
}
function hide_show_field(obj){
    let btn_obj = $(`${obj} .sh-btn-parent`),
        input_obj = $(`${obj} #docker-password`)
    let hide = btn_obj.html().includes('-slash')
    btn_obj.html(hide?btn_obj.html().replace(/fa-eye-slash/g,`fa-eye`):btn_obj.html().replace(/fa-eye/g,'fa-eye-slash'))
    input_obj.attr("type",hide?"text":"password")
}
function hide_show_field_v2(obj){
    let btn_obj = $(`.v2-eye-btn-parent`),
        input_obj = $(`#docker-password`)
    let hide = btn_obj.html().includes('-slash')
    btn_obj.html(hide?btn_obj.html().replace(/fa-eye-slash/g,`fa-eye`):btn_obj.html().replace(/fa-eye/g,'fa-eye-slash'))
    input_obj.attr("type",hide?"text":"password")
}
