!function(e,s,t){"use strict";var i=function(e,n){this.init=function(){this.$scope=e,this.$boxesWrapper=n(".rey-toggleBoxes",this.$scope),this.settings=n.extend({target_type:"",tabs_target:!1,parent_trigger:"click",$boxes:n(".rey-toggleBox",this.$boxesWrapper),$target:!1,$targetContainer:document},JSON.parse(this.$boxesWrapper.attr("data-config")||"{}"));var t=this.$scope.closest(".rey-mega-gs");t.length&&(this.settings.$targetContainer=t),this.connect_the_dots()},this.connect_the_dots=function(){var s=this;switch(this.settings.target_type){case"":s=this;this.settings.$boxes.on("mouseenter",function(t){s.settings.$boxes.removeClass("--active"),n(this).addClass("--active")});break;case"carousel":if(this.settings.carousel_target){if(this.settings.$target=n('.swiper-container[data-carousel-id="'+this.settings.carousel_target+'"]',this.settings.$targetContainer),!this.settings.$target.length||!this.settings.$boxes.length)return;if("undefined"==typeof Swiper)return;var t=function(){var e=s.settings.$target[0].swiper;void 0!==e?(e.slideTo(0),s.settings.$boxes.eq(0).addClass("--active"),s.settings.$boxes.on(s.settings.parent_trigger,function(t){s.settings.$boxes.removeClass("--active"),n(this).addClass("--active"),e.slideTo(n(this).index())})):setTimeout(t,500)};t()}break;case"tabs":if(this.settings.tabs_target){if(this.settings.$target=n('.elementor-section[data-tabs-id="'+this.settings.tabs_target+'"]',this.settings.$targetContainer),!this.settings.$target.length||!this.settings.$boxes.length)return;s.tabs__go_to_tab(0),this.settings.$boxes.eq(0).addClass("--active"),this.settings.$boxes.on(this.settings.parent_trigger,function(t){var e=n(this).index();s.tabs__go_to_tab(e)})}break;case"parent":if(this.settings.$target=this.$scope.closest(".elementor-section.elementor-top-section").children(".rey-section-slideshow"),!this.settings.$target.length||!this.settings.$boxes.length)return;this.slider_type=!1,this.slider__get_slider_type(),this.slider__toggle_active_class(),this.settings.$boxes.on(this.settings.parent_trigger,function(t){s.slider__go_to_slide(n(t.currentTarget).index())})}this.force_active_url(),n(document).on("keydown",function(t){9!==t.keyCode&&-1!==[13,32].indexOf(t.keyCode)&&(t.preventDefault(),n(".rey-toggleBox:focus",s.$boxesWrapper).trigger(s.settings.parent_trigger))})},this.slider__toggle_active_class=function(){var n=this;"slick"==this.slider_type&&this.settings.$target.on("beforeChange",function(t,e,s,i){n.settings.$boxes.removeClass("--active"),0<n.settings.$boxes.eq(i).length&&n.settings.$boxes.eq(i).addClass("--active")})},this.slider__go_to_slide=function(t){"slick"==this.slider_type&&this.settings.$target.slick("slickGoTo",t)},this.slider__get_slider_type=function(){this.settings.$target.hasClass("slick-initialized")&&(this.slider_type="slick")},this.tabs__go_to_tab=function(t){this.settings.$target.hasClass("--tabs-loaded")||this.settings.$target.addClass("--tabs-loaded"),this.settings.$boxes.removeClass("--active"),this.settings.$boxes.eq(t).addClass("--active");var e=this.settings.$target.children(".elementor-container").children(".elementor-row").children(".elementor-column");e.removeClass("--active-tab"),e.eq(t).addClass("--active-tab")},this.force_active_url=function(){this.settings.$boxes.each(function(t,e){var s=n(e);if(s.is("a")){var i=s.attr("href");-1!==window.location.href.indexOf(i)&&(s.addClass("--active"),s.siblings().removeClass("--active"))}})},this.init()};e(window).on("elementor/frontend/init",function(){var t=function(t,e){new i(t,e)};e.each({"reycore-toggle-boxes.default":t,"reycore-toggle-boxes.stacks":t},function(t,e){s.hooks.addAction("frontend/element_ready/"+t,e)})})}(jQuery,window.elementorFrontend,window.elementorModules);