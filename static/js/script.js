var errorMsg = document.getElementById("errorMsg").textContent;
var clearButton = document.getElementById("clearButton");

if (errorMsg.includes("Forbidden")) {
    document.getElementById('forbidden').style.display = 'block';
    //Clear vouch/okta sessions
    setTimeout(function () {        
        clearSessions();
    }, 500); // Add a short delay before clearing cookie
} else {
    document.getElementById('showButton').style.display = 'block';
}

function clearSessionButton() {
    clearSessions();
    clearButton.innerHTML = "Session Cleared!"

    // Expected URL in address bar: https://testvouch.tapaas.com/login?url=https://demo.tapaas.com/dashboard/&vouch-failcount=&X-Vouch-Token=&error=
    // URL after login page timeout: https://testvouch.tapaas.com/auth?code=dfdsfdsfmAdRRK (no url= parameter)
    var url = window.location.href;
    var urlParamIndex = url.indexOf("url=");

    if (urlParamIndex > 0) {
        //var redirectURL = url.substring(urlParamIndex + 1).split("&")[0];
        var redirectURL = "url=https://id.tapaas.com"
        //window.location.href = "https://" + window.location.hostname + "/logout?" + redirectURL;

        // Do not attempt to redirect if the URL does not include a url= parameter to a tapaas domain
        if (redirectURL.includes("tapaas.com")) { 
            setTimeout(function () {
                window.location.href = redirectURL.split("=")[1]; // Redirect to the url= parameter in the address bar
                console.log("redirecting to: https://" + window.location.hostname + "/logout?" + redirectURL);     
            }, 1000); // Wait to get cookie cleared before redirecting
        }
    }
}

function clearSessions() {
    (function () {
        (new Image()).src = "https://id.tapaas.com/login/signout";
    })();
    console.log("IDP session cleared: " + "https://id.tapaas.com/login/signout");

    //Logout URL on dev "https://testvouch.tapaas.com/logout";
    (function () {
        (new Image()).src = "https://" + window.location.hostname + "/logout";
    })();
    console.log("Vouch session cleared: " + "https://" + window.location.hostname + "/logout");
}