!function(t){"use strict";function e(e){this.options=t.extend({},e||{}),this.entryTimeline=!1,this.elements={$body:t(document.body),$wrapper:t("#js-fsNav-panelWrapper")},this.init=function(){this.initVars(),this.events()},this.initVars=function(){this.elements.$panel=t(".rey-fsNav-panel",this.elements.$wrapper),this.elements.$btn=t(".rey-fsNav-mobileBtn"),this.elements.$panel.length&&(this.type=t(".rey-fsNav-panelContent",this.elements.$panel).attr("data-panel-type")||"menu",t(document).trigger("reymodule/fullscreen_nav/loaded",[this.type]),"undefined"!=typeof anime&&(this.entryTimeline=anime.timeline({easing:"easeInOutQuart",duration:400,autoplay:!1}).add({targets:this.elements.$panel[0],scaleY:[0,1]}).add({targets:this.elements.$panel[0].querySelectorAll(".rey-fsNav-panelMask"),scaleY:[1,0],delay:function(e,n){return 250*n}})),"gs"===this.type&&t(".elementor-column-wrap.elementor-element-populated",this.elements.$panel).each(function(e,n){t(n).css("transition-delay",150*e+"ms")}))},this.events=function(){var n=this;this.elements.$btn.on("click",function(e){e.preventDefault(),n.open()}),t(".rey-fsNav-panelClose",this.elements.$wrapper).on("click",function(e){e.preventDefault(),n.close()}),t(document).on("keyup",function(e){27==e.keyCode&&n.isOpened()&&n.close()}),t(document).on("reymodule/fullscreen_nav/open_animation_complete",function(e){n.elements.$panel.addClass("--active-panel"),setTimeout(function(){n.elements.$panel.removeClass("--menu-items-fix")},500)}),t(document).on("reymodule/fullscreen_nav/close_animation_start",function(e){n.elements.$panel.removeClass("--active-panel"),n.elements.$panel.addClass("--menu-items-fix")}),t(".menu-item > a[href*='#']:not([href='#'])",this.elements.$panel).on("click",function(e){e.preventDefault(),n.close()})},this.isOpened=function(){return this.elements.$body.hasClass("--fsNav--active")},this.open=function(){this.elements.$body.addClass("--fsNav--active"),this.entryTimeline&&(this.entryTimeline.reversed&&(this.entryTimeline.reverse(),this.entryTimeline.completed=!1),this.entryTimeline.play(),this.entryTimeline.complete=function(){t(document).trigger("reymodule/fullscreen_nav/open_animation_complete")})},this.close=function(){var e=this;t(document).trigger("reymodule/fullscreen_nav/close_animation_start"),this.entryTimeline&&setTimeout(function(){e.entryTimeline.begin=function(){e.elements.$panel.addClass("--zindex-fix")},e.entryTimeline.complete=function(){e.elements.$body.removeClass("--fsNav--active"),e.elements.$panel.removeClass("--zindex-fix")},e.entryTimeline.reverse(),e.entryTimeline.completed=!1,e.entryTimeline.play()},300)},this.init()}t(window).load(function(){new e})}(jQuery);