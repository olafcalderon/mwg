!function(h,p,e){!!window.MSInputMethodContext&&document.documentMode;var i={frontend:function(){this.init=function(){this.general_html(),this.editSectionIframeLink(),this.modals(),this.scroll_decorations(),this.clippingSections(),this.jsOpenSettings()},this.editSectionIframeLink=function(){h(".js-rey-gs-editSection__url").on("click",function(e){window.parent.open(h(e.currentTarget).attr("href"),"_blank")})},this.jsOpenSettings=function(){h(".rey-openPageSettings").on("click",function(e){e.preventDefault(),"undefined"!=typeof elementor&&elementor.getPanelView().setPage("page_settings").activateTab("settings")})},this.modals=function(){var e=h('a[data-rey-inline-modal][href^="#"]:not([href="#"]), a[href^="#modal-"]'),o=function(e){e.css("display","flex"),setTimeout(function(){e.addClass("--active")},100)},t=function(e){e.removeClass("--active"),setTimeout(function(){h.reyHelpers.ls.set(e.attr("data-rey-modal-id"),!0,h.reyHelpers.expiration.day),e.css("display","")},100)};e.each(function(e,t){h(t).on("click",function(e){e.preventDefault();var t=h(this),s=h('.rey-modalSection[data-rey-modal-id="'+t.attr("href")+'"]');if(s.is("[data-rey-modal-close-color]")&&h(".rey-modalSection-close",s).css("color",s.attr("data-rey-modal-close-color")),t.is("[data-modal-replacements]")){var i=JSON.parse(t.attr("data-modal-replacements")||"{}");h.each(i,function(i,o){var e=h("#"+i,s);e.length&&(e.is("input")?e.val(o):e.html(function(e,t){return t.replace(i,o)}))})}o(s)})}),h(".rey-modalSection-overlay, .rey-modalSection-close").on("click",function(e){e.preventDefault(),t(h(this).closest(".rey-modalSection"))}),h(document).on("keyup",function(e){27==e.keyCode&&t(h(".rey-modalSection.--active"))});var s={didShow:!1,height:!1,scrollDistance:!1,init:function(e,t,i){this.$el=e,this.distance=t,i||(this.didShow=h.reyHelpers.ls.get(e.attr("data-rey-modal-id"))),this.calculateHeight(),this.doScroll()},getDocHeight:function(){var e=document.body,t=document.documentElement;this.height=Math.max(e.scrollHeight,e.offsetHeight,t.clientHeight,t.scrollHeight,t.offsetHeight)},calculateHeight:function(){this.getDocHeight(),this.scrollDistance=parseInt(this.distance)/100*this.height},doScroll:function(){var i=this;h(window).on("scroll",function(e){var t=window.pageYOffset||document.documentElement.scrollTop;!i.didShow&&t>i.scrollDistance&&(o(i.$el),i.didShow=!0)})}},r={didShow:!1,time:!1,init:function(e,t,i){i||(this.didShow=h.reyHelpers.ls.get(e.attr("data-rey-modal-id"))),this.didShow||setTimeout(function(){o(e),self.didShow=!0},1e3*t)}},n={didShow:!1,time:!1,init:function(t,e){e||(this.didShow=h.reyHelpers.ls.get(t.attr("data-rey-modal-id"))),this.didShow||h(document).on("mouseleave",function(e){e.clientY<0&&o(t)})}};h(".rey-modalSection[data-rey-modal-splash]").each(function(e,t){var i=h(t),o=JSON.parse(i.attr("data-rey-modal-splash")||{});switch(o.type){case"scroll":s.init(i,o.distance,o.nag);break;case"time":r.init(i,o.time,o.nag);break;case"exit":n.init(i,o.nag)}})},this.scroll_decorations=function(){var t=this;h(".rey-scrollDeco").on("click",function(e){e.preventDefault(),t.scroll_to(h(this))})},this.scroll_to=function(e){var t=e.attr("data-target"),i=0;if(t&&"next"==t){var o=e.closest(".elementor-section.elementor-top-section").nextAll(".elementor-section").first();o.length&&(i=o.offset().top)}h("html, body").animate({scrollTop:i},"slow",function(e){return--e*e*e+1})},this.clippingSections=function(){h.reyHelpers.is_desktop&&"undefined"!=typeof ScrollOut&&h.each(h(".elementor-section.rey-sectionScroll:not(.rey-sectionScroll--sticky)"),function(e,t){var i={targets:t,cssProps:!0,threshold:.5,cssProps:{visible:!0}},o=h.reyHelpers.getProperty("--clip-threshold",t,!0);o&&(i.threshold=parseFloat(o)),ScrollOut(i)})},this.general_html=function(){h.each({column:".elementor-column",section:".elementor-top-section"},function(e,t){h(".el-parent-trigger--"+e).closest(t).addClass(e+"-parent-trigger")})},this.init()},elements:function(){this.init=function(){var e={global:this.global,widget:this.widget,section:this.section,column:this.column,"heading.default":this.heading,"reycore-product-grid.default":this.product_grid_default,"reycore-product-grid.carousel":this.product_grid_carousel,"reycore-product-grid.carousel-section":this.product_grid_carousel_section,"reycore-menu.product-categories":this.menu_product_categories,"reycore-menu.default":this.menu_dropdown,"reycore-menu.product-categories":this.menu_dropdown,"reycore-text-scroller.default":this.text_scroller,"reycore-basic-post-grid.default":this.posts_grid,"reycore-basic-post-grid.basic2":this.posts_grid,"reycore-basic-post-grid.inner":this.posts_grid,"image-carousel.carousel_links":this.carousel_links,"reycore-header-navigation.default":this.header_navigation_menu,"woocommerce-product-images.default":this.epro_product_images_gallery};h.each(e,function(e,t){p.hooks.addAction("frontend/element_ready/"+e,t)}),this.slider_nav(h(document),h),this.slider_nav_bullets(h(document),h)},this.global=function(e,t){},this.column=function(c){if(reyElementorFrontendParams.compatibilities.column_video&&c.hasClass("rey-colbg--video")){var o=h.reyVideosHelper({containers:c,lazyLoad:!1});c.hasClass("rey-animate-el")&&h.reyHelpers.is_desktop&&!h.reyHelpers.is_edit_mode?h(document).on("rey/elementor_column/animation_complete",function(e,t,i){h(i).attr("data-id")===c.attr("data-id")&&o.init()}):o.init()}if(!h.reyHelpers.elementor_edit_mode&&c.hasClass("--sticky-col")&&h.reyHelpers.is_desktop){var d=c.closest(".elementor-section.elementor-top-section"),u=d.children(".elementor-container");d.imagesLoaded(function(){var t=c.children(".elementor-column-wrap");if(d.length&&t.length){d.addClass("elementor-section-content-top");var i,o,e,s,r,n=h.reyHelpers.is_desktop,a=(parseInt(c.attr("data-top-offset"))||0)+h.reyHelpers.adminBar,l=function(){n=h.reyHelpers.is_desktop,o=d.offset().top,e=u.height(),s=e+o+a,r=e-t.outerHeight(),t.css("width",c.width()),n?c.css({"min-height":"100vh","max-height":"100vh"}):(t.css({position:"static",top:"auto"}),c.css({"min-height":"auto","max-height":"auto"}))};l(),0<r&&h(window).on("scroll",function(){var e=window.pageYOffset||document.documentElement.scrollTop;n?e<o?("top"!=i&&t.css({position:"absolute",top:"auto"}),i="top"):o<e&&e<s&&e+window.innerHeight<s?("in"!=i&&t.css({position:"fixed",top:a}),i="in"):e+window.innerHeight>s&&("end"!=i&&t.css({position:"absolute",top:r}),i="end"):t.css({position:"static",top:"auto"})}).on("resize",h.reyHelpers.debounce(l,200)).trigger("scroll")}})}h(document).on("click","body:not(.elementor-editor-active) .elementor-column[data-column-link]",function(e){var t=h(this),i=JSON.parse(t.attr("data-column-link")||"{}");if(i.url&&!h(e.target).filter("a, a *, .no-link, .no-link *").length)if(e.preventDefault(),i.url.match("^#elementor-action")){var o=i.url;((o=decodeURIComponent(o)).includes("elementor-action:action=popup:open")||o.includes("elementor-action:action=lightbox"))&&(h("#rey-colLink-dynamic",t).length||h('<a id="rey-colLink-dynamic" class="--hidden" href="'+i.url+'"></a>').appendTo(t).trigger("click"))}else if(i.url.match("^#")){o=i.url;h("html, body").animate({scrollTop:h(o).offset().top},800,function(){window.location.hash=o})}else window.open(i.url,i.target)})},this.section=function(c,d){var e,t,o,i,s,r,n,a=c.attr("data-settings")||"{}",l=JSON.parse(a);if(c.hasClass("rey-section-bg--rey_slideshow")){e=d(".rey-section-slideshow",c),t=e.attr("data-rey-slideshow-effect"),o=d.extend({autoplay:!1,autoplaySpeed:5e3,speed:500,arrows:!1,swipe:!1,touchMove:!1,draggable:!1,pauseOnHover:!1,pauseOnFocus:!1,waitForAnimate:!1,pauseOnDotsHover:!0,mobile:!1,rows:0,cssEase:"cubic-bezier(0.215, 0.61, 0.355, 1)"},JSON.parse(e.attr("data-rey-slideshow-settings")||"{}")),(d.reyHelpers.is_desktop||!1!==o.mobile)&&("fade"!=t&&"scaler"!=t||(o.fade=!0),d.reyHelpers.is_desktop&&!d.reyHelpers.is_edit_mode&&c.hasClass("rey-animate-el")?d(document).on("rey/elementor_section/animation_complete",function(e,t,i){d(".rey-section-slideshow",d(i)).slick(o)}):e.slick(o))}if(c.hasClass("rey-section-bg--video")&&c.is("[data-rey-video-link]")){var u=function(e,t,i){if(i||(i=c),d(i).attr("data-id")===c.attr("data-id")){var o=p.elementsHandler.getHandlers("section");l.background_video_link=d(i).attr("data-rey-video-link"),c.attr("data-settings",JSON.stringify(l)).data("settings",l),new o(c)}};c.hasClass("rey-animate-el")&&d.reyHelpers.is_desktop?d(document).on("rey/elementor_section/animation_complete",u):u()}if(void 0!==l.sticky&&c.closest(".rey-siteHeader").removeClass("--lock-zindex"),void 0===l.sticky&&!d.reyHelpers.elementor_edit_mode&&c.hasClass("rey-sectionScroll--sticky")){!function(){var t=JSON.parse(c.attr("data-sticky-config")||"{}");if(!d.isEmptyObject(t)&&void 0!==t.breakpoints){var e={desktop:d.reyHelpers.is_desktop,tablet:d.reyHelpers.is_tablet,mobile:d.reyHelpers.is_mobile};for(var i in e){var o=e[i];if(-1===t.breakpoints.indexOf(i)&&o)return}c.imagesLoaded(function(){var o,i,s=0,r=c.width(),n=c.hasClass("rey-section-stretched"),a=parseInt(t.offset||0)+d.reyHelpers.adminBar,l=d('<div class="rey-sectionScroll--stickyHelper --hidden"></div>').css({height:c.outerHeight(!0)+"px"}).insertAfter(c),e=function(){s=0;var e=d(".rey-siteHeader.header-pos--fixed");if(e.length&&(!d.reyHelpers.is_mobile||!e.hasClass("--not-mobile"))){var i=e.height();a+=i,d(document).on("reycore/header_shrink/on",function(e,t){s||(s=i-t.height())})}var t=d('.rey-stickyContent[data-align="top"] > .elementor');t.length&&(a+=t.height()),r=c.width(),o=c.offset().top-parseFloat(a)};e(),d(window).on("scroll",function(){var e=window.pageYOffset||document.documentElement.scrollTop;if(o+s<e){if(!i){var t={width:r+"px",top:a-s+"px","margin-top":"0px","margin-bottom":"0px"};n&&(t.left=0),c.addClass("--sticked").css(t),l.removeClass("--hidden"),i=!0,c.trigger("reycore/sticky_section/sticked")}}else i&&(c.removeClass("--sticked").css({width:"",top:"","margin-top":"","margin-bottom":"",left:""}),l.addClass("--hidden"),i=!1,c.trigger("reycore/sticky_section/unsticked"))}).on("resize",d.reyHelpers.debounce(e,300)).trigger("scroll")})}}()}if(c.is("[data-rey-hod-settings]")){s=c.attr("data-rey-hod-settings")||"{}",r=JSON.parse(s),n="section-hod-"+c.attr("data-id"),!d.reyHelpers.elementor_edit_mode&&d.reyHelpers.ls.get(n)||(c.addClass("--hod-visible"),"icon"===r.hide_type?($icon="<span>&times;</span>",void 0!==d.reyCore.addSvgIcon&&($icon=d.reyCore.addSvgIcon("rey-icon-close")),i=d('<button class="btn rey-hod-close --pos-'+r.close_position+'">'+$icon+"</button>").appendTo(c)):"custom"===r.hide_type&&(i=d('a[href*="#close-section"]').first()),!i||i&&!i.length||i.on("click",function(e){e.preventDefault(),d.reyHelpers.elementor_edit_mode||(c.removeClass("--hod-visible"),d.reyHelpers.ls.set(n,!0,d.reyHelpers.expiration[r.store_state]))}))}},this.widget=function(e,t){i.handleDisabledElement.init(e,t)},this.heading=function(e,t){if(e.hasClass("el-parent-animation--show")||e.hasClass("el-parent-animation--hide")){var i=t(".elementor-heading-title",e),o=function(){i[0].style.setProperty("--el-height",i.outerHeight()+"px")};o(),t(window).on("resize",t.reyHelpers.debounce(o,200))}},this.product_grid_default=function(e,t){t("ul.products",t(".reyEl-productGrid",e)).length&&void 0!==t.reyThemeWooCommerce&&t.reyThemeWooCommerce.doLoopItemSlideshows(t(".rey-productSlideshow",e))},this.product_grid_carousel=function(e,t){var i=t(".reyEl-productGrid",e),o=t("ul.products",i);if(o.length){var s=JSON.parse(i.attr("data-carousel-settings")||"{}"),r=p.config.breakpoints,n=+s.slides_to_show||1,a=1===n?1:2,l={slidesToShow:n,slidesToScroll:+s.slides_to_scroll||n||1,autoplay:"yes"===s.autoplay,autoplaySpeed:+s.autoplay_speed,infinite:"yes"===s.infinite,pauseOnHover:"yes"===s.pause_on_hover,speed:+s.speed,rtl:"rtl"===s.direction,fade:"fade"===s.effect,rows:1,arrows:!1,dots:!1,responsive:[{breakpoint:r.lg,settings:{slidesToShow:+s.slides_to_show_tablet||a,slidesToScroll:+s.slides_to_scroll_tablet||a}},{breakpoint:r.md,settings:{slidesToShow:+s.slides_to_show_mobile||1,slidesToScroll:+s.slides_to_scroll_mobile||1,infinite:!1}}],cssEase:"cubic-bezier(0.215, 0.61, 0.355, 1)"};s.arrows&&(l.arrows=!0,l.appendArrows=s.appendArrows,l.prevArrow=t(".reyEl-productGrid-carouselNav .rey-arrowSvg--left",i),l.nextArrow=t(".reyEl-productGrid-carouselNav .rey-arrowSvg--right",i)),o.slick(l)}},this.product_grid_carousel_section=function(t,o){var e=o(".reyEl-productGrid",t),r=o("ul.products",e),i=t.closest(".elementor-section.elementor-top-section");if(r.length){var n=JSON.parse(e.attr("data-carousel-section-settings")||"{}"),s={slidesToShow:1,slidesToScroll:1,autoplay:"yes"===n.autoplay,autoplaySpeed:n.autoplay_speed,speed:n.speed,pauseOnHover:!0,fade:!0,rows:0,arrows:!1,dots:!1,cssEase:"cubic-bezier(0.215, 0.61, 0.355, 1)"},a=function(i){if(""!==n.dots){var e=o(".reyEl-productGrid-cs-dots",t),s=o("button",e);e.addClass("--visible"),s.first().addClass("--active"),s.on("click",function(e){e.preventDefault();var t=o(this).index();r.slick("slickGoTo",t),i.slick("slickGoTo",t)}),r.on("beforeChange",function(e,t,i,o){s.removeClass("--active"),0<s.eq(o).length&&s.eq(o).addClass("--active")})}};r.slick(s);var l=i.children(".rey-section-slideshow");if(l.length)return l.slick("slickSetOption","asNavFor",r),l.slick("slickSetOption","fade",!0),void a(l);var c=o.extend({},s),d=o("#tmpl-slideshow-tpl-"+t.attr("data-id"),t).removeClass("rey-section-slideshow--template").addClass("rey-section-slideshow").prependTo(i);c.asNavFor=r,d.slick(c),a(d)}},this.menu_dropdown=function(e,t){var i=t(".reyEl-menu.--dd-menu",e);if(i.length){var o=t(".reyEl-menuTitle",i),s=t(".reyEl-menu-navWrapper",i);o.on("click",function(e){i.hasClass("--dd-menu--mobiles")&&!t.reyHelpers.is_mobile||(t(this).toggleClass("--active"),s.toggleClass("--active"))})}},this.menu_product_categories=function(i,o){var t="product-cato",e=new URL(window.location.href).searchParams.get(t),s=function(e){o('.reyEl-menu-nav.wcapf-ajax-term-filter a[data-key="'+t+'"][data-value="'+e+'"], .reyEl-menu-nav.reyajfilter-ajax-term-filter a[data-key="'+t+'"][data-value="'+e+'"]',i).parent().addClass("current-menu-item")};if(e)if(-1<e.indexOf(",")){var r=e.split(",");o.each(r,function(e,t){0==e&&o(".menu-item",i).removeClass("current-menu-item"),s(t)})}else o(".menu-item",i).removeClass("current-menu-item"),s(e);o(document).on("wcapf_finished reycore/ajaxfilters/finished",function(){var e=new URL(window.location.href).searchParams.get(t);o(".menu-item",i).removeClass("current-menu-item"),e&&s(e)})},this.text_scroller=function(e,t){var i=t(".rey-textScroller-items",e),o=JSON.parse(i.attr("data-slick")||"{}");o.responsive=[{breakpoint:767,settings:{arrows:!1}}],i.slick(o)},this.slider_nav=function(e,t){var i=!1,o=t(".rey-sliderNav.rey-sliderNav--arrows",e);if(o.hasClass("rey-sliderNav--parent"))i=o.closest(".rey-section-bg--rey_slideshow").find(".rey-section-slideshow");else{var s=o.attr("data-slider-id");s&&(i=t("."+s))}if(i&&i.length&&o.length){var r=t(".rey-arrowSvg--left",e),n=t(".rey-arrowSvg--right",e),a=t(".rey-sliderNav-counter",e);if(a.length)var l=t(".rey-sliderNav-counterCurrent",a),c=t(".rey-sliderNav-counterTotal",a),d=function(e){return(e<10?"0":"")+e};i.on("init",function(e,t){r.length&&r.on("click",function(){t.$slider.slick("slickPrev")}),n.length&&n.on("click",function(){t.$slider.slick("slickNext")}),a.length&&l.length&&l.text(d(t.currentSlide+1)),a.length&&c.length&&c.text(d(t.slideCount))}),i.on("beforeChange",function(e,t,i,o){a.length&&l.length&&l.text(d(o+1))})}},this.slider_nav_bullets=function(e,t){var i=!1,o=t(".rey-sliderNav.rey-sliderNav--bullets",e);if(o.hasClass("rey-sliderNav--parent"))i=o.closest(".rey-section-bg--rey_slideshow").find(".rey-section-slideshow");else{var s=o.attr("data-slider-id");s&&(i=t("."+s))}if(i&&o.length&&i.length){var r={dots:!0,appendDots:o};i.on("init",function(e,t){t.slickSetOption(r,!0)})}},this.posts_grid=function(e,r){var n=r(".reyEl-bPostGrid",e);if(n.length){var t;t=!1,void 0!==p&&p.isEditMode()||n.hasClass("--masonry")&&(void 0===r.fn.masonry&&void 0===r.fn.imagesLoaded||n.imagesLoaded(function(){t||((t=n.masonry({itemSelector:".reyEl-bPostGrid-item",percentPosition:!0,transitionDuration:0,isInitLayout:!1})).on("layoutComplete",function(){t.addClass("--msnry-initialised")}),t.masonry())}));!function(){if(void 0!==r.fn.slick||void 0!==r.fn.imagesLoaded){var e=JSON.parse(n.attr("data-carousel-settings")||"{}");if(!r.isEmptyObject(e)){var t=p.config.breakpoints,i=+e.slides_to_show||1,o=1===i?1:2,s={slidesToShow:i,slidesToScroll:+e.slides_to_scroll||i||1,autoplay:"yes"===e.autoplay,autoplaySpeed:+e.autoplay_speed,infinite:"yes"===e.infinite,pauseOnHover:"yes"===e.pause_on_hover,speed:+e.speed,rtl:"rtl"===e.direction,fade:"fade"===e.effect,rows:1,arrows:!1,dots:!1,responsive:[{breakpoint:t.lg,settings:{slidesToShow:+e.slides_to_show_tablet||o,slidesToScroll:+e.slides_to_scroll_tablet||o}},{breakpoint:t.md,settings:{slidesToShow:+e.slides_to_show_mobile||1,slidesToScroll:+e.slides_to_scroll_mobile||1}}],cssEase:"cubic-bezier(0.215, 0.61, 0.355, 1)"};n.imagesLoaded(function(){n.slick(s)})}}}()}},this.carousel_links=function(e,t){p.elementsHandler.getHandlers()["image-carousel.default"](e)},this.header_navigation_menu=function(e,t){t.reyHelpers.is_edit_mode&&t.reyCore&&void 0!==t.reyCore.megamenu_panel_width&&t.reyCore.megamenu_panel_width(),!t.reyHelpers.is_edit_mode&&e.hasClass("--hbg-hover-yes")&&(t(".rey-mainNavigation-mobileBtn",e).on("mouseenter",function(e){t(this).trigger("click")}),e.hasClass("--hbg-hover-close-yes")&&t(".rey-mainNavigation--mobile",e).on("mouseleave",function(e){t(".js-rey-mobileMenu-close",this).trigger("click")}))},this.epro_product_images_gallery=function(e,t){t.reyHelpers.is_edit_mode&&t(".woocommerce-product-gallery",e).removeClass("--is-loading")},this.init()},handleDisabledElement:{$parent:!1,init:function(e,i){var o=this;"undefined"!=typeof elementor&&(this.$scope=e,this.$link=i(".js-click-activate-element",this.$scope),this.$parent=this.$link.parent(),this.$link.on("click",function(e){var t=i(this).attr("data-element");o.$parent.addClass("--disabled"),i.ajax({method:"post",url:reyElementorFrontendParams.ajax_url,data:{action:"rey_activate_element",security:reyElementorFrontendParams.ajax_nonce,element:t},success:function(e){e&&e.success&&o.reloadElementor(t)},error:function(e,t,i){console.error(e),console.error(t),console.error(i)}})}))},reloadElementor:function(e){if(this.$parent){this.$parent.removeClass("--disabled"),elementor.reloadPreview();var t='<style>.elementor-element[data-widget-type="'+e+'"]:before {display: none}</style>';elementor.getPanelView().$el.closest("#elementor-editor-wrapper").after(t)}}}};h(document).ready(function(){i.frontend()}),h(window).on("elementor/frontend/init",function(){h.reyHelpers.elementor_edit_mode=p.config.environmentMode.edit,h.reyHelpers.is_edit_mode=h.reyHelpers.elementor_edit_mode||h.reyHelpers.customizer_preview,i.elements()})}(jQuery,window.elementorFrontend,window.elementorModules);