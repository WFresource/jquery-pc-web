require('./vendor/skin/less/theme.less')

var API = _DSJ_CONFIG_._API_;
var ROOT = _DSJ_CONFIG_._ROOT_;

$(function () {


    /*var user = {
     empNumber:"010431",
     password:'888888'
     }*/


    $.post(API.userInfo).done(function (res) {
        /*if(res.code != -1){

         location.href = ROOT
         }*/

    });

    $("#submit-login").on("click", function () {

        var $username = $("#username")
        var $password = $("#password")

        var loginReq = {
            empNumber: $username.val(),
            password: $password.val()
        };
        $.restPost(API.login, loginReq).done(function (msg, res) {
            console.log(res)

            location.href = ROOT


        })
    });


})