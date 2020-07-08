!function(y){"use strict";jQuery.migrateMute=!0,y.reyVideosHelper=function(e){var i={};return void 0!==e.containers&&""!=e.containers||console.error("error"),i.config=y.extend({containers:"",lazyLoad:!0},e||"{}"),i.htmlVideosLoaded=!1,i.videos={youtube:{},hosted:{}},i.$players={youtube:{},hosted:{}},i.currentIndex=0,i.loadYoutubeAPI=function(){!1===y.reyHelpers.youTubeApiLoaded&&(y("script:first").before(y("<script>",{src:"https://www.youtube.com/iframe_api"})),y.reyHelpers.youTubeApiLoaded=!0)},i.calcYTVideosSize=function(e){var t=e.parent().outerWidth(),s=e.parent().outerHeight(),a="16:9".split(":"),o=a[0]/a[1],i=o<t/s;return{width:i?t:s*o,height:i?t/o:s}},i.changeYTVideoSize=function(e){var t=this.calcYTVideosSize(e);e.width(t.width).height(t.height)},i.init=function(){var r=this;this.config.containers.each(function(e,n){y(".rey-hostedVideo[data-video-params]",y(n)).each(function(e,t){var s=y(t);if(y.reyHelpers.is_desktop||!s.hasClass("elementor-hidden-phone")){var a=y(n).index(),o=JSON.parse(s.attr("data-video-params")||"{}"),i=void 0!==o.src&&o.src;i&&y.reyHelpers.matchYoutubeUrl(i)||(r.$players.hosted[a]={el:s,playerVars:o})}}),y(".rey-youtubeVideo[data-video-params]",y(n)).each(function(e,t){var s=y(t);if(y.reyHelpers.is_desktop||!s.hasClass("elementor-hidden-phone")){var a=y(n).index(),o=s.attr("data-video-id")||"";if(o){if(y.reyHelpers.isValidURL(o)){if(!y.reyHelpers.matchYoutubeUrl(o))return;o=y.reyHelpers.matchYoutubeUrl(o)}r.$players.youtube[a]={el:s.children()[0],videoId:o,playerVars:JSON.parse(s.attr("data-video-params")||"{}")};var i=s.next(".rey-youtubePreview").children("img");i.length&&120===i[0].naturalWidth&&i.attr("src",i.attr("data-default-src"))}}})});var e=!y.isEmptyObject(this.$players.youtube),t=!y.isEmptyObject(this.$players.hosted);(t||e)&&(t&&(this.config.lazyLoad||this.add_html5_videos()),e&&(this.config.lazyLoad||this.add_youtube_videos()),this.events())},i.events=function(){var s=this;y(window).on("resize",y.reyHelpers.debounce(function(){y.each(s.videos.youtube,function(e,t){void 0!==t&&void 0!==t.a&&t.a&&s.changeYTVideoSize(y(t.a))})},600))},i.add_youtube_videos=function(){var s=this;this.loadYoutubeAPI(),"undefined"==typeof YT||"object"==typeof YT&&!YT.loaded?setTimeout(function(){s.add_youtube_videos()},350):y.each(this.$players.youtube,function(t,e){void 0!==e&&(s.videos.youtube[t]=new YT.Player(e.el,{videoId:e.videoId,playerVars:e.playerVars,events:{onStateChange:function(e){y(e.target.getIframe().parentNode).attr("data-player-state",e.data)},onReady:function(e){s.changeYTVideoSize(y(e.target.getIframe())),s.config.lazyLoad?"object"==typeof s.currentIndex&&-1!==s.currentIndex.indexOf(parseInt(t))?e.target.playVideo():parseInt(t)==s.currentIndex?e.target.playVideo():e.target.pauseVideo():e.target.playVideo(),setInterval(function(){e.target.getCurrentTime()>=e.target.getDuration()-.5&&e.target.seekTo(0)},250)}}}))})},i.add_html5_videos=function(){var a=this;y.each(a.$players.hosted,function(t,s){void 0!==s&&y("<video />").attr(s.playerVars).prop("muted",!0).appendTo(s.el).on("canplay",function(e){a.config.lazyLoad?"object"==typeof a.currentIndex&&-1!==a.currentIndex.indexOf(parseInt(t))?event.target.play():parseInt(t)==a.currentIndex?e.currentTarget.play():e.currentTarget.pause():e.currentTarget.play(),s.el.attr("data-player-state",1),a.videos.hosted[t]=e.currentTarget})}),a.htmlVideosLoaded=!0},i.changeState=function(e,a){i.currentIndex=e;var o=this,t={hosted:{play:"play",pause:"pause",method:"hostedChangeState"},youtube:{play:"playVideo",pause:"pauseVideo",method:"youtubeChangeState"}},s=function(s){y.each(t,function(e,t){void 0!==o.$players[e][s]&&o[t.method](s,t[a])})};"object"==typeof e?y.each(e,function(e,t){s(t)}):s(e)},i.hostedChangeState=function(e,t){this.htmlVideosLoaded||!this.config.lazyLoad?void 0!==this.videos.hosted[e]&&this.videos.hosted[e][t]():this.add_html5_videos()},i.youtubeChangeState=function(e,t){var s=void 0!==this.videos.youtube[e];!this.config.lazyLoad||s?s&&this.videos.youtube[e][t]():this.add_youtube_videos()},i.pauseAll=function(){},i};var e=function(){this.init=function(){this.misc(),this.initHeaderSearch(),this.stickyGlobalSections(),this.megaMenuGs(),this.megamenu_panel_width(),this.loadMorePosts(),this.reyModalApp(),this.doTooltips(),this.refreshCss(),this.events()},this.elements={$body:y(document.body),$header:y(".rey-siteHeader"),$headerOverlay:y(".rey-overlay.rey-overlay--header"),$siteOverlay:y(".rey-overlay.rey-overlay--site")},this.events=function(){var o=this;y('.js-scroll-to[data-target^="#"], .js-scroll-to[href^="#"]').on("click",function(e){e.preventDefault();var t=y(this),s=t.attr("data-target")||t.attr("href")||"";if(y(s).length){var a=y(s).offset().top;o.elements.$header.hasClass("header-pos--fixed")&&(a-=o.elements.$header.height()),a-=50,y("html, body").animate({scrollTop:a},{duration:250,easing:"swing"})}}),y(document).on("reycore/ajaxfilters/finished",function(e,t,s){o.loadMorePosts()}),y(window).on("scroll",y.reyHelpers.debounce(function(){o.elements.$body.toggleClass("--at-top",0<!(window.pageYOffset||document.documentElement.scrollTop))},200)).trigger("scroll")},this.misc=function(){y(".rey-mobileNav-footer").children().length||y(".rey-mobileNav-footer").addClass("--empty"),y('a[href="#scrolltotop"]').on("click",function(e){e.preventDefault(),y("html, body").animate({scrollTop:0},"slow")})},this.initHeaderSearch=function(){var s=this;y(".js-rey-headerSearch").each(function(e,t){Object.create(s.searchPanel).init(y(t),s)})},this.searchPanel={class:"is-opened",$app:y.reyTheme,$rc_app:!1,$searchPanel:y(".rey-searchPanel"),isOpen:!1,init:function(e,t){this.$searchPanel.length&&(this.$rc_app=t,this.$searchPanelWrapper=e,this.$searchBtn=y(".js-rey-headerSearch-toggle",this.$searchPanelWrapper),this.$searchField=y("input[type='search']",this.$searchPanel),this.panelStyle=this.$searchPanel.attr("data-style"),this.fromSticky=this.$searchBtn.hasClass("js-from-sticky"),this.$headerSource=this.fromSticky?y('.rey-stickyContent[data-align="top"] > .elementor'):y(".rey-siteHeader"),this.$searchLogo=y("img.custom-logo[data-search-logo]",this.$headerSource),this.events())},events:function(){var s=this;this.$searchBtn.on("click",function(e){e.preventDefault(),y.reyHelpers.is_global_section_mode||(s.isOpen?s.close():s.open())}),y(".js-rey-searchPanel-close",this.$searchPanel).on("click",function(e){e.preventDefault(),s.isOpen&&s.close()}),y(document).on("rey/close_panels",function(e,t){"search-panel"!==t&&s.isOpen&&s.close()})},addTopPosition:function(){var e,t=this,s=function(){e=t.$headerSource.outerHeight()+y.reyHelpers.adminBar,t.$searchPanel.css({top:e+"px","max-height":"calc(100vh - "+e+"px)"}),t.$rc_app.elements.$siteOverlay.css("top",e+"px"),y.reyHelpers.is_desktop||t.$searchPanel.css("height",y(window).height()-e+"px")};s(),y(window).on("resize",y.reyHelpers.debounce(function(){t.isOpen&&s()},500))},open:function(){var e=this;this.isOpen=!0,y(document).trigger("rey/close_panels",["search-panel"]),y.reyHelpers.overlay("site","open"),"wide"===this.panelStyle&&(this.$searchBtn.addClass(this.class),this.$searchLogo.length&&this.$searchLogo.attr({"data-initial-src":this.$searchLogo.attr("src"),src:this.$searchLogo.attr("data-search-logo")})),"side"!==this.panelStyle&&"wide"!==this.panelStyle||y.reyHelpers.doScroll.disable(),this.$searchPanel.show(0,function(){e.$searchPanel.addClass(e.class),e.$searchField.focus(),y("body").addClass("search-panel--"+e.class),y("body").addClass("search-panel--"+e.panelStyle),"wide"===e.panelStyle&&e.addTopPosition()})},close:function(){var e=this;this.isOpen=!1,this.$rc_app.elements.$siteOverlay.css("top",""),this.$searchPanel.css("height",""),"side"!==this.panelStyle&&"wide"!==this.panelStyle||y.reyHelpers.doScroll.enable(),this.$searchPanel.length&&("wide"===this.panelStyle&&this.$searchLogo.length&&this.$searchLogo.attr("data-initial-src")&&this.$searchLogo.attr({src:this.$searchLogo.attr("data-initial-src")}),this.$searchPanel.removeClass(this.class),this.$searchBtn.removeClass(this.class),y("body").removeClass("search-panel--"+this.class),y("body").removeClass("search-panel--"+this.panelStyle),y.reyHelpers.overlay("site","close"),setTimeout(function(){e.$searchPanel.hide(0)},300))}},this.megaMenuGs=function(){y(".rey-mainNavigation--mobile .rey-mega-gs").siblings("a").on("click",function(e){var t=y(this);if(!t.closest(".elementor-widget-reycore-header-navigation").hasClass("--disable-mega-gs")){var s=t.nextAll(".rey-mega-gs");s.is(":animated")||(e.preventDefault(),s.slideToggle())}})},this.megamenu_panel_width=function(){var a=y(".rey-siteHeader .rey-mainNavigation--desktop, .rey-stickyContent .rey-mainNavigation--desktop, .rey-pbTemplate--gs .rey-mainNavigation--desktop");if(a.length){var o=function(){a.closest(".elementor-top-section > .elementor-container, .rey-siteHeader-container").each(function(e,t){var s=y(t);if(s.is(":visible")){var l=s.width(),d=parseFloat(s.css("padding-left")),c=(parseFloat(s.css("padding-right")),s.offset());y(".menu-item.depth--0.--is-mega",a).each(function(e,t){var s=y(t),a=s.offset(),o=s.children(".rey-mega-gs, ul.sub-menu");if(s.hasClass("--mega-boxed"))o.css({"max-width":l,transform:"translateX("+-1*Math.round(a.left-(c.left+d))+"px)"});else if(s.hasClass("--mega-full"))o.css("transform","translateX("+-1*Math.round(a.left)+"px)");else if(s.hasClass("--mega-custom")){var i=s.children().first(),n=parseInt(i.attr("data-panel-width"))||800,r=Math.floor(a.left/y("body").prop("clientWidth")*100);r<33?o.css({transform:"translateX("+.15*n*-1+"px)"}):34<=r&&r<=66?o.css({transform:"translateX("+n/2*-1+"px)"}):67<r&&o.css({transform:"translateX("+.75*n*-1+"px)"}),o.css("max-width",n+"px")}o.addClass("--visible")})}})};this.elements.$header.on("lazyloaded",function(e){o()}),y(window).on("LazyLoad::Initialized",function(e){o()}),y(window).on("resize",y.reyHelpers.debounce(function(){o()},500));var i=a.closest(".elementor-section.elementor-top-section");i.hasClass("rey-animate-el")?y(document).on("rey/elementor_section/animation_complete",function(e,t,s){t.id==i.attr("data-id")&&o()}):o()}},this.loadMorePosts=function(){var h=!1,p=!1,e=y(".js-rey-infiniteLoadMore"),t=y(".js-rey-ajaxLoadMore"),s=e.length,a=function(e){var i=y(e),n=i.attr("href"),r=i.attr("data-target"),l=i.attr("data-history")||"1",d=y(r),c=i.attr("data-post-type")||"posts";i.addClass("--loading"),h=!0;var t="";y("body").hasClass("elementor-page")||(t=(-1!==window.location.href.indexOf("?")?"&":"?")+"reynotemplate=1"),y.get(n+t,function(e){var t=y(e),s=y(r,t),a=y(".rey-ajaxLoadMore a",t),o=!1;d.length&&s.length&&(o=s.children().appendTo(d)),a.length?i.attr("href",a.attr("href")):(p=!0,i.addClass("--disabled").text(i.attr("data-end-text"))),u(a),h=!1,i.removeClass("--loading"),"1"===l&&window.history.pushState(null,"",n),y(document).trigger("rey/"+c+"/loaded",[o,t])})},u=function(e){var t=y(".rey-ajaxLoadMore a[data-count]");if(t.length&&t.is("[data-count]")){var s=t.attr("data-count");if(e)return s=e.attr("data-count"),void y(".rey-ajaxLoadMore-counter",t).text(s);y('<span class="rey-ajaxLoadMore-counter">'+s+"</span>").appendTo(t)}};u(),t.on("click",function(e){e.preventDefault(),y(e.currentTarget).hasClass("--disabled")||h||p||a(e.currentTarget)}),s&&"undefined"!=typeof ScrollOut&&ScrollOut({targets:e[0],once:!1,onShown:function(e,t,s){y(e).hasClass("--disabled")||h||p||a(e)}})},this.stickyGlobalSections=function(){var t=y(".rey-stickyContent"),s=t.children(".elementor").attr("data-elementor-id"),e=t.is("[data-close]"),a=t.attr("data-close")||"",o=t.is('[data-align="top"]'),i={};if(!(o&&this.elements.$body.hasClass("--prevent-top-sticky")||!o&&this.elements.$body.hasClass("--prevent-bottom-sticky"))&&t.length){if(""!==a){var n=y.reyHelpers.ls.get("top-sticky-"+s);if(e&&!0===n)return}if(t.hasClass("--always-visible"))t.addClass("--visible");else{var r=function(){t.each(function(e,t){var s=y(t),a=s.attr("data-offset")||y(".rey-siteHeader").height(),o=s.attr("data-align")||"top";i[o]={},i[o].ob=s,isNaN(parseInt(a))?y(a).length&&(i[o].offset=y(a).first().offset().top):i[o].offset=parseInt(a)})};if(r(),y(window).on("scroll",y.reyHelpers.debounce(function(){if(0<Object.keys(i).length){var s=window.pageYOffset||document.documentElement.scrollTop;y.each(i,function(e,t){s>t.offset?t.ob.addClass("--visible"):t.ob.removeClass("--visible")})}},reyCoreParams.js_params.sticky_debounce)).on("resize",y.reyHelpers.debounce(r,200)).trigger("scroll"),e)y('<button class="btn rey-stickyContent-close">'+this.addSvgIcon("rey-icon-close")+"</button>").appendTo(t.children(".elementor")).on("click",function(e){e.preventDefault(),t.removeClass("--visible"),""!==a&&y.reyHelpers.ls.set("top-sticky-"+s,!0,y.reyHelpers.expiration[a])});var l=function(){y.reyHelpers.is_desktop||y.each(y(".rey-mainNavigation.rey-mainNavigation--mobile",t),function(e,t){y(t).css("height",window.innerHeight+"px")})};l(),y(window).on("resize",y.reyHelpers.debounce(l,200))}}},this.reyModalApp=function(){var e={activeClass:"--active",$body:y("body"),$instance:[],init:function(e){return this.options=y.extend({removeLoadingOnOpen:!0,width:500,height:"",zIndex:!1,title:"",content:"",wrapperClass:"",contentClass:"",closeInside:!0,onInit:function(){},onOpen:function(){},onClose:function(){},openOnDemand:!1,iframe:"",videoTime:"",id:null},e),this.createModal(),this.events(),this.handleClose(),this.options.openOnDemand||this.open(),this.options.onInit(this),this},createModal:function(){if(this.$instance=y("#"+this.options.id+"-modal",this.$body),this.options.iframe&&(this.options.content=this.getIframe(),this.options.wrapperClass+="--iframe",this.options.closeInside=!1),this.options.id&&this.$instance.length)this.$modal=this.$instance;else{var e=wp.template("reycore-modal-tpl");this.$modal=y(e(this.options)).appendTo(this.$body),this.options.id&&this.$modal.attr("id",this.options.id+"-modal")}this.options.zIndex&&this.$modal.css("z-index",this.options.zIndex),this.$modalInner=y(".rey-modalInner",this.$modal).css({maxWidth:this.options.width,height:this.options.height,minHeight:this.options.minHeight}),this.$content=y(".rey-modalContent",this.$modal),this.$loader=y(".rey-modalLoader",this.$modal),this.$closeBtn=y(".rey-modalClose",this.$modal),this.$instance.length||(this.$newContent=this.$content.html(this.options.content),this.$newContent.children().removeClass("--hidden"))},events:function(){var t=this;y(".rey-modalOverlay, .rey-modalClose, [data-close-modal]",this.$modal).on("click",function(e){e.preventDefault(),t.close()}),y(document).on("keyup",function(e){27==e.keyCode&&t.close()}),y(window).on("resize",y.reyHelpers.debounce(function(){t.handleClosePos()},500))},handleClose:function(){var t=this;this.options.closeInside||(this.$modal.addClass("--closeOutside"),this.$closeOutsideBtn=this.$closeBtn.clone().appendTo(this.$modal),this.$closeOutsideBtn.on("click",function(e){e.preventDefault(),t.close()}))},handleClosePos:function(){this.options.closeInside||this.$closeOutsideBtn.css({left:y(window).width()/2+this.$modalInner.outerWidth()/2+30,top:y(window).height()/2-this.$modalInner.outerHeight()/2-30})},open:function(){var e=this;this.$body.css("overflow","hidden"),this.$modal.css("display","flex"),setTimeout(function(){e.handleClosePos(),e.$modal.addClass(e.activeClass),e.options.onOpen(e),e.options.removeLoadingOnOpen&&e.$loader.fadeOut("fast")},100)},close:function(){var e=this;this.$modal.removeClass(this.activeClass),this.$body.css("overflow",""),this.options.iframe&&y("iframe",this.$modal).attr("src",""),setTimeout(function(){e.$modal.css("display",""),e.options.onClose(e)},100)},closeAll:function(){var s=this;y(".rey-modal").each(function(e,t){y(t).removeClass(s.activeClass),s.$body.css("overflow",""),setTimeout(function(){y(t).css("display","")},100)})},getIframe:function(){var e=this,t=this.options.iframe;return y.each({youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1&rel=0",time:"&t="},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1",time:"#t="},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}},function(){if(-1<t.indexOf(this.index))return this.id&&(t="string"==typeof this.id?t.substr(t.lastIndexOf(this.id)+this.id.length,t.length):this.id.call(this,t),e.options.videoTime&&this.time&&(t+=this.time+parseFloat(e.options.videoTime))),t=this.src.replace("%id%",t),!1}),'<div class="embed-responsive embed-responsive-16by9"><iframe class="rey-modalIframe" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" src="'+t+'" frameborder="0" allowfullscreen></iframe></div>'}};this.reyModal=Object.create(e);var s=this;y(document).on("click","[data-reymodal]",function(e){var t=JSON.parse(y(this).attr("data-reymodal")||"{}");!y.isEmptyObject(t)&&"undefined"!==t.content&&t.content&&(t.content=y(t.content)),s.reyModal.init(t)})},this.LazyLoadCompatibility=function(){var s=this;this.lazyLoad={verlok:!1},"undefined"!=typeof LazyLoad&&(this.lazyLoad.verlok=new LazyLoad({elements_selector:"[data-lazyloaded]"})),this.lazyLoad.updateLazy=function(e){var t=[];if(!1!==s.lazyLoad.verlok){if(!(t=e[0].querySelectorAll('img[data-lazyloaded="1"]')).length)return;t.forEach(function(e){s.lazyLoad.verlok.load(e)})}}},this.addSvgIcon=function(e,t){var s="#";reyCoreParams.svg_icons_version&&(s="?"+reyCoreParams.svg_icons_version+s);var a=reyParams.icons_path+s+e;return t&&("reycore"===t?a=reyCoreParams.icons_path+s+e:"social"===t&&(a=reyCoreParams.social_icons_path+s+e)),void 0!==y.reyHelpers.applyFilter&&(a=y.reyHelpers.applyFilter("reycore/reycore/svg_icon",a,e,t,reyParams.icons_path)),'<svg class="rey-icon"><use href="'+a+'" xlink:href="'+a+'"></use></svg>'},this.doTooltips=function(){y("[data-rey-tooltip]").on("mouseenter",function(e){if(!y(".rey-tooltip").length){var t=!0,s=y(this),a=s.attr("data-rey-tooltip");try{var o=JSON.parse(a)}catch(e){t=!1}t&&(a=s.hasClass(o.switcher_class)?o.active_text:o.text),y('<div class="rey-tooltip"></div>').text(a).appendTo("body").fadeIn("fast")}}).on("mousemove",function(e){var t=document.querySelector(".rey-tooltip"),s=t.offsetWidth,a=t.offsetHeight,o=y(window).width(),i=y(window).height(),n=s/2,r=a+15;e.pageX>.8*o&&(n=s),e.pageY<.2*i&&(r=-1*a),y(".rey-tooltip").css({top:e.pageY-r,left:e.pageX-n})}).on("mouseleave",function(e){y(".rey-tooltip").remove()})},this.refreshCss=function(){y(".qm-refresh-css > .ab-item").on("click",function(e){e.preventDefault();var t=y(this);t.addClass("--loading"),y.ajax({method:"post",url:y.reyHelpers.params.ajaxurl,data:{action:"_refresh_dynamic_css",security:y.reyHelpers.params.ajax_url},success:function(e){t.removeClass("--loading"),e?e.success&&(t.text("Reloading page.."),setTimeout(function(){window.location.reload()},1500)):console.error("Response cannot be retrieved")},error:function(e,t,s){console.error(e),console.error(t),console.error(s)}})})},this.init()};y(document).ready(function(){y.reyCore=new e})}(jQuery);