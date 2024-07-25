
let params = getParamsFromURL(location.href);
let redirect_url = "Your index URL";

function getParamsFromURL(url) {
    let params = {};
    let regex = /([^&=]+)=([^&]*)/g, m
    while(m=regex.exec(url)){
        params[decodeURIComponent(m[1])]= decodeURIComponent(m[2])
    }
    return params;
}

let messageData ={}

let divResult =document.getElementById('show')
let button = document.getElementById("logout")
console.log(params);

saveOAuth2Info(params,"profile.html","info")
function saveOAuth2Info(params, redirectPage, storageKey) {
    if (Object.keys(params).length>0) {
        localStorage.setItem(storageKey, JSON.stringify(params));
        window.location.href = redirectPage;
    }
}
let info = JSON.parse(localStorage.getItem("info"))
console.log(info)   
let ACCESS_TOKEN = info['access_token']
let number = 5

getMessages(number)
function getMessages(number){
    fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults="+ number,{
        method:'GET',
        headers: new Headers({Authorization: `Bearer ${ACCESS_TOKEN}`})
    })
    .then((data)=>data.json())
    .then((info)=>{
        console.log(info)
        Array.from(info.messages).forEach((message)=>{
            fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`,{
                method:'GET',
                headers:new Headers({Authorization:`Bearer ${ACCESS_TOKEN}`})
            })
            .then((data)=> data.json())
            .then((info)=>{
            console.log(info)
            
            divResult.innerHTML+=`<div>${info.snippet} <br></br></div>`
            
            })

        })
        
    })
}
button.onclick = logout1;

function logout1(){
    logout(ACCESS_TOKEN,redirect_url);
}
async function logout(accessToken, redirectUrl) {
    // Revoke the token
    await fetch(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    });


}

