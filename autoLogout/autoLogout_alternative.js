// Log users out at 00:00 local PC time every Saturday if the dashboard was left open over the weekend
// Only logout on a Saturday
console.log("Tapaas Autologout initiated");

var freq = 900000  // Frequency in ms to check if autologout time has arrived (900000 ms = 15 minutes)
var logout = false;
var delta = 0;
var numberOfDaysToAdd = 0;

var firstOpenedOn = localStorage.getItem('firstOpenedOn');
if (firstOpenedOn == null) { // First time access, no dates in local storage
    firstOpenedOn = new Date();
    localStorage.setItem('firstOpenedOn', firstOpenedOn); //Store first login time in local timezone of the user
}

// Check if firstOpenedOn is more than 1 week ago (should not be possible as cookie have long been cleared)
delta = DifferenceInTime(firstOpenedOn);
if ( delta < -604800000) {// DifferenceInTime originally intended to check if Saturday expired, so passing firstOpenedOn will return a negative sign
    autologout();       
}

if (!logout){ // If not logged out already (i.e. Saturday have not already passed), check periodically
    // Calculate next Saturday
    var nextSaturday = new Date(firstOpenedOn);
    var firstOpenedDay = new Date(firstOpenedOn).getDay(); //Get day of the date dashboards were first accessed (Sunday = 0, Saturday = 6)
    if (firstOpenedDay < 6) { // i.e. if it is not Saturday
        numberOfDaysToAdd = 6 - firstOpenedDay;
    } else {
        numberOfDaysToAdd = 7; // If firstOpenedDAy was a Saturday, logout will be next week, 7 days later
    }
    nextSaturday.setDate(new Date(firstOpenedOn).getDate() + numberOfDaysToAdd); // Find the Saturday the session will be logged out
    nextSaturday.setHours(0,0,0); // Always timeout at 00:00:00
    localStorage.setItem('nextSaturday', nextSaturday); //Store nextSaturday

    // Was first login more than 1 week old? Should not be possible but still check.
    delta = DifferenceInTime(nextSaturday); // Find difference between now and the "logout Saturday"
    if (delta <= 0) {  // Check if logout Saturday is inb the past already
        autologout();
    }
}

if (!logout){ // If not logged out already (i.e. Saturday have not already passed), check periodically
    var periodicCheck = setInterval(checkDate, freq); // Check to logout freq milliseconds
}

function checkDate() {
    today = new Date().getDay();
    nextSaturday = localStorage.getItem('nextSaturday');
    delta = DifferenceInTime(nextSaturday);
    if (delta <= 0 && today == 6) {  // Only sign users out if they leave their dashboards running on Saturday at 00:00 local time
        autologout();
    }
}

function DifferenceInTime(saturday) {
    var dateNow = new Date();
    var DifferenceInTime = new Date(saturday).getTime() - new Date(dateNow).getTime();
    //return (DifferenceInTime / 86400000);
    return DifferenceInTime;
}

function autologout() {
    logout = true;
    console.log("Logging user out");
    localStorage.clear();
    (function () { (new Image()).src = "https://id.tapaas.com/login/signout"; })();
    console.log("IDP session cleared: " + "https://id.tapaas.com/login/signout");
    (function () { (new Image()).src = "https://testvouch.tapaas.com" + "/logout"; })();
    console.log("Vouch session cleared: " + "https://testvouch.tapaas.com" + "/logout");
    setTimeout(function () { window.location.href = "https://" + window.location.hostname + "/signedout/" }, 1000); // Wait to get cookie cleared before redirecting
}