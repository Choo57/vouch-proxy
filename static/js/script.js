var errorMsg = document.getElementById("errorMsg").textContent;

if (errorMsg.includes("Forbidden")) {
    document.getElementById('withoutButton').style.display = 'block';
    (function(){
        (new Image()).src = "https://testvouch.tapaas.com/logout";
    })(); //Still clear the session   
} else {
    document.getElementById('showButton').style.display = 'block';
}

function clearSession() {
    var url = window.location.href; 
    var redirectURL = url.substring(url.indexOf("?")+1).split("&")[0];
    //window.location.href = "https://" + window.location.hostname + "/logout?" + redirectURL;

    // Logout silently without a redirect
    (function(){
        (new Image()).src = "https://testvouch.tapaas.com/logout";
        setTimeout(function(){ 
            window.location.href = redirectURL.split("=")[1]; 
            console.log("redirecting to: https://" + window.location.hostname + "/logout?" + redirectURL);
        }, 1500); // Wait to get cookie cleared before redirecting
    })();   
}