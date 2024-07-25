

function signIn(){
    let oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth"
     
    let form = document.createElement('form')
    form.setAttribute('method','GET')
    form.setAttribute('action',oauth2Endpoint)
    let params ={
        "client_id":"your client id",
        "redirect_uri":"your profile.html link",
        "response_type":"token",
        "scope":"https://mail.google.com",
        "include_granted_scopes":"true",
        "state":"pass-through-value"
    }
    for(var p in params){
        let input = document.createElement('input')
        input.setAttribute('type','hidden')
        input.setAttribute('name',p)
        input.setAttribute('value',params[p])
        form.appendChild(input)
    }
    document.body.appendChild(form)
    form.submit()
}