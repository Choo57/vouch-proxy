var errorMsg = document.getElementById("errorMsg").textContent;
var clearButton = document.getElementById("clearButton");

if (errorMsg.includes("Forbidden")) {
    document.getElementById('forbidden').style.display = 'block';
    //Clear vouch/okta sessions
    setTimeout(function () {        
        clearSessions(false); // Do not redirect to id.tapaas.com if account is not permissioned
    }, 500); // Add a short delay before clearing cookie
} else {
    document.getElementById('showButton').style.display = 'block';
}

function clearSessionButton(redirect) {
    clearSessions();
    clearButton.innerHTML = "Session Cleared!"

    // Expected URL in address bar: https://testvouch.tapaas.com/login?url=https://demo.tapaas.com/dashboard/&vouch-failcount=&X-Vouch-Token=&error=
    // URL after login page timeout: https://testvouch.tapaas.com/auth?code=dfdsfdsfmAdRRK (no url= parameter)
    if (redirect) {
        var redirectURL = "url=https://id.tapaas.com"
        setTimeout(function () {
            console.log("redirecting to: https://" + window.location.hostname + "/logout?" + redirectURL);     
        }, 1000); // Wait to get cookie cleared before redirecting
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