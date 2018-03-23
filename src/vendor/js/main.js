'use strict';
require('./utility/multiselect/bootstrap-multiselect');
require('./utility/fullscreen/jquery.fullscreen');
require('./utility/nanoScroller/jquery.nanoscroller');
require('./utility/helpers/jquery-scrollLock')
require('./utility/helpers/jquery.smooth-scroll.min')





   // 全局变量
   var Window = $(window);
   var Body = $('body');
   var Navbar = $('.navbar');
   var Topbar = $('#topbar');

   // 恒定的高度
   var windowH = Window.height();
   var bodyH = Body.height();
   var navbarH = 0;
   var topbarH = 0;

   // Variable Heights
   if (Navbar.is(':visible')) { navbarH = Navbar.height(); }
   if (Topbar.is(':visible')) { topbarH = Topbar.height(); }

   // 计算内容内部元素的高度
   var contentHeight = windowH - (navbarH + topbarH);

   // SideMenu Functions
   var runSideMenu = function(options) {

      // If Nano scrollbar exist and element is fixed, init plugin
      if ($('.nano.affix').length) {
          $(".nano.affix").nanoScroller({
             preventPageScrolling: true
          });
      }

      // Sidebar state naming conventions:
      // "sb-l-o" - SideBar Left Open
      // "sb-l-c" - SideBar Left Closed
      // "sb-l-m" - SideBar Left Minified
      // Same naming convention applies to right sidebar

      // 侧边栏左切换功能
      var sidebarLeftToggle = function() {


          /*我们检查用户是否已经关闭了整个左侧菜单。
          如果我们重新打开它，这将导致菜单重新设置为一个缩小的状态。
          第二次点击将会完全扩展菜单。*/
         if (Body.hasClass('sb-l-c') && options.collapse === "sb-l-m") {
            Body.removeClass('sb-l-c');
         }

         // Toggle sidebar state(open/close)
         Body.toggleClass(options.collapse)
         triggerResize();
      };

      // Sidebar Left Collapse Entire Menu event
      $('.sidebar-toggle-mini').on('click', function(e) {
         e.preventDefault();

         // If sidebar is set to Horizontal we return
         if ($('body.sb-top').length) { return; }   

         // Close Menu
         Body.addClass('sb-l-c');
         triggerResize();

          setTimeout(function() {
              Body.toggleClass('sb-l-m sb-l-o');
          }, 250);
      });

      // Check window size on load
      // Adds or removes "mobile-view" class based on window size
      var sbOnLoadCheck = function() {

         // If sidebar menu is set to Horizontal we add
         // unique custom mobile css classes
         if ($('body.sb-top').length) {            
            // If window is < 1080px wide collapse both sidebars and add ".mobile-view" class
            if ($(window).width() < 900) {
               Body.addClass('sb-top-mobile').removeClass('sb-top-collapsed');
            }
            return; 
         }

         // Check Body for classes indicating the state of Left and Right Sidebar.
         // If not found add default sidebar settings(sidebar left open, sidebar right closed).
         if (!$('body.sb-l-o').length && !$('body.sb-l-m').length && !$('body.sb-l-c').length) {
            $('body').addClass(options.sbl);
         }


         if (Body.hasClass('sb-l-m')) { Body.addClass('sb-l-disable-animation'); }
         else { Body.removeClass('sb-l-disable-animation'); }

         // If window is < 1080px wide collapse both sidebars and add ".mobile-view" class
         if ($(window).width() < 1080) {
            Body.addClass('sb-l-m');
         }

         resizeBody();
      };


      // Check window size on resize
      // Adds or removes "mobile-view" class based on window size
      var sbOnResize = function() {

         // If sidebar menu is set to Horizontal mode we return
         // as the menu operates using pure CSS
         if ($('body.sb-top').length) {            
            // If window is < 1080px wide collapse both sidebars and add ".mobile-view" class
            if ($(window).width() < 900 && !Body.hasClass('sb-top-mobile')) {
               Body.addClass('sb-top-mobile');
            } else if ($(window).width() > 900) {
               Body.removeClass('sb-top-mobile');
            }
            return; 
         }

         // If window is < 1080px wide collapse both sidebars and add ".mobile-view" class
         /*if ($(window).width() < 1080 && !Body.hasClass('mobile-view')) {
            Body.removeClass('sb-r-o').addClass('mobile-view sb-l-m sb-r-c');
         } else if ($(window).width() > 1080) {
            Body.removeClass('mobile-view');
         } else {
            return;
         }*/

         resizeBody();
      };

      // Function to set the min-height of content
      // to that of the body height. Ensures trays
      // and content bgs span to the bottom of the page
      var resizeBody = function() {
         var sidebarH = $('#sidebar_left').outerHeight();
         var cHeight = (topbarH + navbarH + sidebarH);

         Body.css('min-height', cHeight);
      };  

      // Most CSS menu animations are set to 300ms. After this time
      // we trigger a single global window resize to help catch any 3rd 
      // party plugins which need the event to resize their given elements
      var triggerResize = function() {
         setTimeout(function() {

            $(window).trigger('resize');

            if(Body.hasClass('sb-l-m')) {
               Body.addClass('sb-l-disable-animation');
            }
            else {
               Body.removeClass('sb-l-disable-animation');
            }
         }, 300)
      };

      // Functions Calls
      sbOnLoadCheck();
      $("#toggle_sidemenu_l").on('click', sidebarLeftToggle);

      // Attach debounced resize handler
      var rescale = function() {
         sbOnResize();
      }
      var lazyLayout = _.debounce(rescale, 300);
      $(window).resize(lazyLayout);




      // 3. LEFT MENU LINKS TOGGLE
      $('.sidebar-menu li a.accordion-toggle').on('click', function(e) {
         // e.preventDefault();

         // If the clicked menu item is minified and is a submenu (has sub-nav parent) we do nothing
         if ($('body').hasClass('sb-l-m') && !$(this).parents('ul.sub-nav').length) { return; }

         // If the clicked menu item is a dropdown we open its menu
         if (!$(this).parents('ul.sub-nav').length) {

            // If sidebar menu is set to Horizontal mode we return
            // as the menu operates using pure CSS
            if ($(window).width() > 900) {
               if ($('body.sb-top').length) { return; }
            }

            $('a.accordion-toggle.menu-open').next('ul').slideUp('fast', 'swing', function() {
               $(this).attr('style', '').prev().removeClass('menu-open');
            });
         }
         // If the clicked menu item is a dropdown inside of a dropdown (sublevel menu)
         // we only close menu items which are not a child of the uppermost top level menu
         else {
            var activeMenu = $(this).next('ul.sub-nav');
            var siblingMenu = $(this).parent().siblings('li').children('a.accordion-toggle.menu-open').next('ul.sub-nav')

            activeMenu.slideUp('fast', 'swing', function() {
               $(this).attr('style', '').prev().removeClass('menu-open');
            });
            siblingMenu.slideUp('fast', 'swing', function() {
               $(this).attr('style', '').prev().removeClass('menu-open');
            });
         }

         // Now we expand targeted menu item, add the ".open-menu" class
         // and remove any left over inline jQuery animation styles
         if (!$(this).hasClass('menu-open')) {
            $(this).next('ul').slideToggle('fast', 'swing', function() {
               $(this).attr('style', '').prev().toggleClass('menu-open');
            });
         }

      });
   }

   // Footer Functions
   var runFooter = function() {

      // Init smoothscroll on page-footer "move-to-top" button if exist
      var pageFooterBtn = $('.footer-return-top');
      if (pageFooterBtn.length) {
        pageFooterBtn.smoothScroll({offset: -55});
      }
      
   }



   // Header Functions
   var runHeader = function() {



      // Init jQuery Multi-Select for navbar user dropdowns
      if ($("#user-status").length) {
          $('#user-status').multiselect({
            buttonClass: 'btn btn-default btn-sm',
            buttonWidth: 100,
            dropRight: false
         });
      }
      if ($("#user-role").length) {
          $('#user-role').multiselect({
            buttonClass: 'btn btn-default btn-sm',
            buttonWidth: 100,
            dropRight: true
         });
      }

      // Dropdown Multiselect Persist. Prevents a menu dropdown
      // from closing when a child multiselect is clicked
      $('.dropdown-menu').on('click', function(e) {

         e.stopPropagation();
         var Target  = $(e.target);
         var TargetGroup = Target.parents('.btn-group');
         var SiblingGroup = Target.parents('.dropdown-menu').find('.btn-group');

         // closes all open multiselect menus. Creates Toggle like functionality
         if (Target.hasClass('multiselect') || Target.parent().hasClass('multiselect')) {
           SiblingGroup.removeClass('open');
           TargetGroup.addClass('open');
         }
         else { SiblingGroup.removeClass('open'); }

      });
     
      // Sliding Topbar Metro Menu
      var menu = $('#topbar-dropmenu');
      var items = menu.find('.metro-tile');
      var metroBG = $('.metro-modal');

      // Toggle menu and active class on icon click
      $('.topbar-menu-toggle').on('click', function() {

         // If dropmenu is using alternate style we don't show modal
         if (menu.hasClass('alt')) {
            // Toggle menu and active class on icon click
            menu.slideToggle(230).toggleClass('topbar-menu-open');
            metroBG.fadeIn();
         }
         else {
            menu.slideToggle(230).toggleClass('topbar-menu-open');
            $(items).addClass('animated animated-short fadeInDown').css('opacity', 1);

            // Create Modal for hover effect
            if (!metroBG.length) {
               metroBG = $('<div class="metro-modal"></div>').appendTo('body');
            }
            setTimeout(function() {
               metroBG.fadeIn();
            }, 380);
         }

      });

      // If modal is clicked close menu
      $('body').on('click', '.metro-modal', function() {
         metroBG.fadeOut('fast');
         setTimeout(function() {
            menu.slideToggle(150).toggleClass('topbar-menu-open');
         }, 250);
      });
   }


   //全屏模式
    var runFullscreenDemo = function() {

        // If browser is IE we need to pass the fullsreen plugin the 'html' selector
        // rather than the 'body' selector. Fixes a fullscreen overflow bug
        var selector = $('html');

        var ua = window.navigator.userAgent;
        var old_ie = ua.indexOf('MSIE ');
        var new_ie = ua.indexOf('Trident/');
        if ((old_ie > -1) || (new_ie > -1)) { selector = $('body'); }

        // Fullscreen Functionality
        var screenCheck = $.fullscreen.isNativelySupported();

        // Attach handler to navbar fullscreen button
        $('.request-fullscreen').on('click', function() {

            // Check for fullscreen browser support
            if (screenCheck) {
                if ($.fullscreen.isFullScreen()) {
                    $.fullscreen.exit();
                }
                else {
                    selector.fullscreen({
                        overflow: 'auto'
                    });
                }
            } else {
                alert('Your browser does not support fullscreen mode.')
            }
        });

    }

 module.exports = {
      init: function(options) {

         // Set Default Options
         var defaults = {
            sbl: "sb-l-o",
            sbState: "save",
            collapse: "sb-l-m",
            siblingRope: true

         };

         // Extend Default Options.
         var options = $.extend({}, defaults, options);

         // Call Core Functions
         // runHelpers();
         // runAnimations();
         runHeader();
         // runSideMenu(options);
         runFooter();
         // runTrays();
          runFullscreenDemo();
      },
      runSideMenu:runSideMenu


   }


