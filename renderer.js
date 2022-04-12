// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

window.$ = window.jQuery = require('./jquery-3.6.0.min.js');


var webview = document.getElementById("ebuy");

// When everything is ready, trigger the events without problems
webview.addEventListener("dom-ready", function () {
    // Show devTools if you want
    //webview.openDevTools();
    console.log("DOM-Ready, triggering events !");
    $("#setMobileButton").click(function () {
        // alert-something
        webview.send("setValue", "mobile", "66617276");
        webview.send("setValue", "password", "66617276");
        webview.send("clickElement", "captcha");

        setTimeout(() => {
            webview.send("getPhoneStatus");
        }, 1000)
    });
});

function enterCode(code){
    console.log("enter code", code);
    webview.send("setValue", "authcode", code);
}

// Process the data from the webview
webview.addEventListener('ipc-message', function (event) {
    //console.log("ebuy", event);
    //console.info(event.channel);

    var inputgroup = JSON.parse(event.channel);
    var mobileNoExists = false;
    for (var i = 0; i < inputgroup.length; i++) {
        console.log("inputgroup", inputgroup[i]);
        if (inputgroup[i].indexOf("澳門手機號碼") > -1) {
            if (inputgroup[i].indexOf('<span class="input-group-addon addon-success">') > -1) {
                mobileNoExists = true;
                webview.send("clickElement", "captcha");
                alert("mobileNoExists");
            }
        }
    }
});