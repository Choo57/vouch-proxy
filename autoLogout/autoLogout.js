// Log users out at 00:00 local PC time every Saturday if the dashboard was left open over the weekend
// Only logout on a Saturday
console.log("Tapaas Autologout initiated");

var freq = 900000  // Frequency in ms to check if autologout time has arrived (900000 ms = 15 minutes). Should be less than 1 hour so the 00:00 - 00:59 timewindow to logout is not missed

var loggedout = localStorage.getItem('firstOpenedOn');
if (loggedout == null) { // First time access, no loggedout key in local storage
    loggedout = false;
    localStorage.setItem('loggedout', loggedout); //Store loggedout value as false fir the first login
}

var periodicCheck = setInterval(checkDate, freq); // Check to logout freq milliseconds

function checkDate() {
    now = new Date();
    today = now.getDay(); // Sundey = 0, Monday = 1
    time = now.getHours();  // Hour now between 0 - 23
    console.log("today: " + today);
    console.log("time: " + time);
    if ((today == 6) && (time == 0)){ // Only sign users out if they leave their dashboards running on Saturday between 00:00 - 00:59 local time. 
        if (!loggedout) {
            autologout(); // If already logged out once today, do not sign the user out again
        }        
    } else {
        loggedout = false;
        localStorage.setItem('loggedout', loggedout); //Store loggedout value as false for the first login
    }
}

function autologout() {
    loggedout = true;
    localStorage.setItem('loggedout', loggedout); //Store loggedout value as true so user is not logged out mutliple times during the logout time window
    console.log("Logging user out");
    (function () { (new Image()).src = "https://id.tapaas.com/login/signout"; })();
    console.log("IDP session cleared: " + "https://id.tapaas.com/login/signout");
    (function () { (new Image()).src = "https://testvouch.tapaas.com" + "/logout"; })();
    console.log("Vouch session cleared: " + "https://testvouch.tapaas.com" + "/logout");
    setTimeout(function () { window.location.href = "https://" + window.location.hostname + "/signedout/" }, 1000); // Wait to get cookie cleared before redirecting
}