function clearSession() {
    var url = window.location.href; 
    var redirectURL = url.substring(url.indexOf("?")+1).split("&")[0];
    console.log("https://" + window.location.hostname + "/logout?" + redirectURL);
    //window.location.href = "https://" + window.location.hostname + "/logout?" + redirectURL;

    // Logout silently without a redirect
    (function(){
        (new Image()).src = "https://testvouch.tapaas.com/logout";
        setTimeout(function(){ 
            window.location.href = redirectURL.split("=")[1]; 
        }, 1500); // Wait to get cookie cleared before redirecting
    })();   
}