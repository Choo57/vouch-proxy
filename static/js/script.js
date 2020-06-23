var errorMsg = document.getElementById("errorMsg").textContent;

if (errorMsg.includes("Forbidden")) {
    document.getElementById('withoutButton').style.display = 'block';
    //Still clear the session   
    setTimeout(function () {
        (function () {
            //Logout URL on dev "https://testvouch.tapaas.com/logout";
            (new Image()).src = "https://" + window.location.hostname + "/logout";
        })();
        console.log("Session cleared: " + "https://" + window.location.hostname + "/logout")
    }, 1000); // Wait a bit for the cookie to get set before clearing it
} else {
    document.getElementById('showButton').style.display = 'block';
}

function clearSession() {
    var url = window.location.href;
    var redirectURL = url.substring(url.indexOf("?") + 1).split("&")[0];
    //window.location.href = "https://" + window.location.hostname + "/logout?" + redirectURL;

    // First logout silently without a redirect
    // Button click inherently has a delay, so no need to execute /logout inside a settimeout function like above
    (function () {
        (new Image()).src = "https://" + window.location.hostname + "/logout";
        setTimeout(function () {
            window.location.href = redirectURL.split("=")[1]; // Redirect to the url= parameter in the address bar
            console.log("redirecting to: https://" + window.location.hostname + "/logout?" + redirectURL);
        }, 1000); // Wait to get cookie cleared before redirecting
    })();
}