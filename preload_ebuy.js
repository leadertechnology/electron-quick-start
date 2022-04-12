const { ipcRenderer } = require('electron');

window.onload = function () {
    window.$ = window.jQuery = require('./jquery-3.6.0.min.js');
    $(document).ready(function () {
        console.log("ebuy ready");
    });
};

ipcRenderer.on("setFocus", function (event, id) {
    $("#"+id).focus();
});

ipcRenderer.on("clickElement", function (event, id) {
    $("#"+id).click();
});

ipcRenderer.on("setValue", function (event, id, data) {
    $("#"+id).val(data);
});


ipcRenderer.on("getPhoneStatus", function (event, id) {
    var inputgroup = [];

    $("body").find(".input-group").each(function(){
        if($(this).html().indexOf("澳門手機號碼") > -1){
            inputgroup.push($(this).html());
        }
    })

    ipcRenderer.sendToHost(JSON.stringify(inputgroup));
});
