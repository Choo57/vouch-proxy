clearSession() {
    var url = window.location.href; 
    var redirectURL = url.substring(url.indexOf("?")+1).split("&")[0];
    window.location.href = "http://" + window.location.hostname + "/logout?" + redirectURL;
}
