!function(l){"use strict";l(document).ready(function(){var e=l(".rey-siteHeader.header-pos--side");if(e.length){l("> .elementor > .elementor-inner > .elementor-section-wrap > .elementor-section",e).addClass("sideHeader-section");var t=function(e){return l.reyHelpers.is_desktop&&void 0!==l.reyHelpers.sprintf?l.reyHelpers.sprintf("calc( %s - var(--side-header--width) )",e):e},i=function(e){return l.reyHelpers.is_desktop?"0px":e};void 0!==l.reyHelpers.addFilter&&(l.reyHelpers.addFilter("rey/siteWidth",t),l.reyHelpers.addFilter("rey/headerHeight",i)),void 0!==wp.hooks&&(wp.hooks.addFilter("rey_siteWidth","reymodule/side_header",t),wp.hooks.addFilter("rey_headerHeight","reymodule/side_header",i))}}),l(document).on("rey/account_panel/open",function(e,t,i){var d=t,r=l(".rey-siteHeader.header-pos--side"),o=d.$buttonInUse;if(r.length){var s=function(){if(!1!==o){var e=o[0].getBoundingClientRect(),t=l(window).width(),i=e.top+o.height(),r=e.left+o.width()+20,s=t-(e.left+o.width()+20),n=i;l.reyHelpers.is_desktop&&(n=i-d.$panel.height()),d.$panel.css("top",n+"px"),l.reyHelpers.is_mobile?d.$panel.css({left:"",right:""}):r<t/2?d.$panel.css({left:r+"px",right:""}):d.$panel.css({right:s+"px",left:""})}};s(),l(window).on("resize",l.reyHelpers.debounce(s,500))}});function e(e){this.options=l.extend({},e||{}),this.elements={$body:l(document.body)},this.init=function(){this.initVars(),this.events()},this.initVars=function(){this.elements.$wrapper=l(".rey-className-wrapper"),this.elements.$el=l(".rey-className",this.elements.$wrapper)},this.events=function(){},this.init()}l(window).load(function(){new e})}(jQuery);