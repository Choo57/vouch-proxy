function clearSession() {
    var url = window.location.href; 
    var redirectURL = url.substring(url.indexOf("?")+1).split("&")[0];
    window.location.href = "https://" + window.location.hostname + "/logout?" + redirectURL;
}