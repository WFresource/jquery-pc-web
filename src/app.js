require('./vendor/skin/less/theme.less')

// require('./vendor/js/utility/jquery/jquery_ui/jquery-ui.min.js');
var Core = require('./vendor/js/main.js');
var modelRoutes = require('./routes.js');
var Menus = require('./menus.js');
var API = _DSJ_CONFIG_._API_
var ROOT = _DSJ_CONFIG_._ROOT_;
$(function () {

    "use strict";

    // Init Theme Core
    Core.init();

    //菜单默参数
    var defaults = {
        sbl: "sb-l-o",
        sbState: "save",
        collapse: "sb-l-m",
        siblingRope: true

    };
    //路由配置
    var currentMod;
    var tpl;
    var injectTpl = function (tpl, callback) {
        console.log('tpl', tpl)
        $.get(tpl, function (res) {
            console.log(res)
            $("#carrier").html(res)
            callback()
        })

    };
    var routeBefore = function (a) {

        var _routeHash = location.hash.replace("#", "")
        console.log(_routeHash)
        // alert($('#main-menu a[data-href="'+ _routeHash +'"]').length)
        // $('#main-menu').find(".accordion-toggle").removeClass("menu-open")
        $('#main-menu a').removeClass("active").removeClass("menu-open")


        openMenu($('#main-menu a[data-href="' + _routeHash + '"]')
            .addClass("active"))
    };

    var openMenu = function (menuNode) {


        var node = menuNode.parents('.sub-nav')
        console.log(menuNode, node, node.length)
        node.parent("li").children('.accordion-toggle').addClass("menu-open")
    };

    var routes = {};
    _.forEach(modelRoutes, function (modelRoute) {console.log('routes',routes)
        routes[modelRoute.route] = {
            before: routeBefore,
            on: function (a) {
                console.log('a',a)
                require.ensure([], function (require) {
                    currentMod = require("./models/" + modelRoute.model + "/");
                    tpl = require("./models/" + modelRoute.model + "/" + modelRoute.model + ".html")
                    injectTpl(tpl, function () {
                        currentMod.init()
                    })

                }, modelRoute.model);
            }
        };
    });

    var renderMenu = function (menuTree) {
        var temp = "";
        _.forEach(menuTree, function (item) {
            if (item.children) {
                temp += ('<li >' +
                '<a class="accordion-toggle">' +
                '<span>' +
                '<i class="menu-icon ' + item.iconName + '"></i>' +
                '<span class="sidebar-title">' + item.title + '</span>' +
                '</span>' +
                '<span class="fa fa-angle-down arrow"></span>' +
                '</a>' +
                '<ul class="nav sub-nav">' +
                renderMenu(item.children)
                + '</ul>' +
                '</li>')
            } else {
                temp += ('<li>' +
                '<a data-href="' + item.path + '" href="#' + item.path + '" class="accordion-toggle">' +
                '<span>' +
                '<i class="menu-icon ' + item.iconName + '"></i>' +
                '<span class="sidebar-title">' + item.title + '</span>' +
                '</span>' +
                '</a>' +
                '</li>')
            }
        })
        return temp
    };


    //渲染导航
    function drawMenus() {
        $("#main-menu").html(renderMenu(Menus.menus));
    }

    $.restPost(API.userInfo).done(function (msg, res) {
        // console.log(res)
        $("body").addClass("default-theme")
        sessionStorage.setItem('user', JSON.stringify(res))

        $("#user").text(res.realname)

        drawMenus();

        var router = director.Router(routes);
        router.init();

        $('#preloader').delay(350).fadeOut();
        Core.runSideMenu(defaults)

    })

    $("#logOut").on("click", function () {
        $.restPost(API.logout).done(function () {
            sessionStorage.removeItem('user')

            location.href = ROOT + "login.html"
        })
    })


})
