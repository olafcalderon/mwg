!function(e,n,t){"use strict";e(window).on("elementor/frontend/init",function(){n.hooks.addAction("frontend/element_ready/reycore-carousel-uno.default",function(e,a){var n=a(".rey-carouselUno",e),t=a(".cUno-slides",e),s=a(".cUno-slide",t),i=(a(".cUno-captions",n),a(".cUno-caption",n)),o=a(".cUno-arrows",n),r=a(".cUno-nav",n),c=a.extend({autoplay:!1,autoplaySpeed:5e3,speed:700,arrows:!1,swipe:!0,touchMove:!0,draggable:!0,pauseOnHover:!0,pauseOnFocus:!0,waitForAnimate:!0,pauseOnDotsHover:!0,fade:!1,rows:0,cssEase:"cubic-bezier(0.215, 0.61, 0.355, 1)",responsive:[{breakpoint:1025,settings:{swipe:!0,touchMove:!0,draggable:!0,arrows:!1,dots:!1}}]},JSON.parse(n.attr("data-slider-settings")||"{}"));o.length&&(c.arrows=!0,c.nextArrow=a(".rey-arrowSvg.rey-arrowSvg--right",n),c.prevArrow=a(".rey-arrowSvg.rey-arrowSvg--left",n));var d=a.reyVideosHelper({containers:s});d.init();var l=function(){t.slick(c)};0<a.reyHelpers.$sitePreloader.length?a(document).on("rey/site_loaded",function(){l()}):n.imagesLoaded(function(){l()});var u,v=function(e,n){var t=a("video",s.eq(e));t.length&&t[0][n]()};r.length&&r.children("button").on("click",function(e){e.preventDefault(),t.slick("slickGoTo",parseInt(a(this).attr("data-index")))}),c.sync||""===c.syncId||(u=a("."+c.syncId)),t.on("init",function(){n.removeClass("--loading").addClass("--init"),s.eq(0).addClass("--active"),"outside"===c.contentPosition&&i.eq(0).addClass("--active"),r.length&&r.each(function(e,n){a(n).children("button").eq(0).addClass("--active")}),v(0,"play"),d.changeState(0,"play")}),t.on("beforeChange",function(e,n,t,o){u&&setTimeout(function(){u.slick("slickGoTo",o)},400),s.removeClass("--active"),s.eq(o).addClass("--active"),"outside"===c.contentPosition&&(i.removeClass("--active"),i.eq(o).addClass("--active")),r.length&&r.each(function(e,n){a(n).children("button").removeClass("--active"),a(n).children("button").eq(o).addClass("--active")}),v(t,"pause"),d.changeState(t,"")}),t.on("afterChange",function(e,n,t){v(t,"play"),d.changeState(t,"play")})})})}(jQuery,window.elementorFrontend,window.elementorModules);