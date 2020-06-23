var errorMsg = document.getElementById("errorMsg").textContent;

if (errorMsg.includes("Forbidden")) {
    document.getElementById('withoutButton').style.display = 'block';
    //Clear vouch/okta sessions
    setTimeout(function () {
        //Logout URL on dev "https://testvouch.tapaas.com/logout";
        (function () {
            (new Image()).src = "https://" + window.location.hostname + "/logout";
        })();
        console.log("Vouch session cleared: " + "https://" + window.location.hostname + "/logout");
        
        //Okta signout URL on dev ""https://id.tapaas.com/login/signout?fromURI=https://demo15.tapaas.com/dashboard"";
        (function () {
            (new Image()).src = "https://id.tapaas.com/login/signout";
        })();
        console.log("IDP session cleared: " + "https://id.tapaas.com/login/signout");

    }, 500); // Wait a bit for the cookie to get set before clearing it
} else {
    document.getElementById('showButton').style.display = 'block';
}

function clearSession() {
    var url = window.location.href;
    var redirectURL = url.substring(url.indexOf("?") + 1).split("&")[0];
    //window.location.href = "https://" + window.location.hostname + "/logout?" + redirectURL;

    (function () {
        (new Image()).src = "https://id.tapaas.com/login/signout";
    })();
    console.log("IDP session cleared: " + "https://id.tapaas.com/login/signout");

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