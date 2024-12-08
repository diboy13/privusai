function send_post(url, body) {
  return new Promise(async (resolve, reject) => {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body?body:{}),
    }).catch(function (err) {reject(err)})
    const content = await rawResponse.json().catch(function (err) {reject(err)})

    resolve(content)
  });
}

function webapi(t){
    return location.protocol+"//"+location.host+"/webapi/"+(t?t:'')
}

function pohapi(t){
  return location.protocol+"//"+location.host+"/poh-api/"+(t?t:'')
}

//TODO refactor this code, make getApi function with api parameter and remove webapi, pohapi and botapi
function botapi(t){
  return location.protocol+"//"+location.host+"/bot-api/"+(t?t:'')
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + ((location.protocol=="https:")?";secure":'');
}

function call_api(method,body = {},without_token,ignore_bad_token){
  return new Promise(async (resolve, reject) => {
    let cerr='', token= getCookie("clore_token")

    if(token || without_token){
      let init_body= isJSON(body)?body:{}
      if(!without_token) init_body["token"] = token
      let api_res = await send_post(webapi(method),init_body).catch(function (err) {cerr=err})
      if(cerr){
        reject(cerr)
      }else if((api_res.error=="invalid_token" || api_res.error=="token_expired") && !ignore_bad_token){ // LOGIN TIMED OUT
        logout(false)
      }else{
        resolve(api_res)
      }
    }else{
      logout(false)
    }
  })
}

//TODO refactor this code, join call_api, call_tg_api and call_poh_api passing allowed api parameter
function call_tg_api(endpoint, body) {
  return new Promise(async (resolve, reject) => {
    let cerr = '', token = getCookie("clore_token")

    if (token) {
      let init_body = isJSON(body) ? body : {}

      const url = botapi(endpoint)

      let api_res = await send_post(url, {...init_body, token}).catch(function (err) {
        cerr = err
      })

      if (cerr) {
        reject(cerr)
      } else if ((api_res.error === "Invalid token" || api_res.error === "Token expired")) {
        logout(false)
      } else {
        resolve(api_res)
      }
    } else {
      logout(false)
    }
  })
}

function call_poh_api(method,body,without_token,ignore_bad_token){
  return new Promise(async (resolve, reject) => {
    let cerr='', token= getCookie("clore_token")

    if(token || without_token){
      let init_body= isJSON(body)?body:{}
      if(!without_token) init_body["token"] = token
      let api_res = await send_post(pohapi(method) ,init_body).catch(function (err) {cerr=err})
      if(cerr){
        reject(cerr)
      }else if((api_res.error=="invalid_token" || api_res.error=="token_expired") && !ignore_bad_token){ // LOGIN TIMED OUT
        logout(false)
      }else{
        resolve(api_res)
      }
    }else{
      logout(false)
    }
  })
}

function isJSON(obj){
  try{
    if(Object.keys(obj).length>0){
      return true
    }else{
      return false
    }
  }catch(e){
    return false
  }
}
function add_class_to_object(object_id,classname){
  document.getElementById(object_id).classList.add(classname)
}
function rm_class_from_object(object_id,classname){
  document.getElementById(object_id).classList.remove(classname)
}
function logout(send_rm_token){
  if(send_rm_token){

  }
  setCookie("clore_token",'',0)
  location.replace('/login')
}
function sync_timeout(ms){
  return new Promise(async (resolve, reject) => {
    setTimeout(function(){
      resolve("done")
    },ms)
  })
}
var is_shaking={}
async function shake(element_id){
  if(is_shaking[element_id]) return;
  is_shaking[element_id]=true
  let element=document.getElementById(element_id)
  for(var x=0;x<=2;x++){
    for(var i=0;i<=80;i++){
      await sync_timeout(2)
      if(i<=20){
        element.style.left=`${i}px`
      }else if(i<=60){
        element.style.left=`${40-i}px`
      }else if(i<=80){
        element.style.left=`${i-80}px`
      }
    }
  }
  delete is_shaking[element_id]
}
function unix_timestamp(){
  return Math.floor(Date.now() / 1000)
}