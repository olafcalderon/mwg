!function(e,t,i){"use strict";var n={settings:{},elements:{},timeline:!1,init:function(t){var n=this;if(this.$el=t,this.elements.$parentSection=this.$el.closest(".elementor-top-section"),this.elements.$imageContainer=e(".hbDist-imgs",this.$el),this.images=JSON.parse(this.$el.attr("data-images")||"{}"),this.totalImages=this.images.length,!(this.totalImages<2)&&"undefined"!=typeof THREE&&"undefined"!=typeof anime&&"undefined"!==ReyDistortionApp){var s=function(){n.settings=e.extend({transitionDuration:1200,intensity1:.8,intensity2:"",effect:"",easing:"easeInOutCubic",vertical:!1},JSON.parse(n.$el.attr("data-box-settings")||"{}")),n.settings.transitionDuration=parseInt(n.settings.transitionDuration),n.settings.intensity1=parseFloat(n.settings.intensity1),""===n.settings.intensity2?n.settings.intensity2=n.settings.intensity1:n.settings.intensity2=parseFloat(n.settings.intensity2),"random"===n.settings.effect?n.settings.effect=reyThreeConfig.displacements[e.reyHelpers.getRandomInt(15)]:""!==n.settings.effect&&(n.settings.effect=reyThreeConfig.displacements[n.settings.effect]),n.activateBox()};this.elements.$parentSection.hasClass("rey-animate-el")?e(document).on("rey/elementor_section/animation_complete",function(t,e,i){e.id==n.elements.$parentSection.attr("data-id")&&s()}):e("body").hasClass("--lazyload-enabled")?e("img",this.elements.$imageContainer).last().on("lazyloaded",function(){s()}):this.$el.imagesLoaded(function(){s()})}},activateBox:function(){this.elements.$overlayBg=e(".hbDist-imgsBg",this.$el),this.elements.$captions=e(".cDistortion-captionItem",this.$el);var t=this.elements.$imageContainer.children("img").first();this.imgWidth=parseInt(t.attr("width")||1e3),this.imgHeight=parseInt(t.attr("height")||1e3),this.distortionApp=new ReyDistortionApp({imgWidth:this.imgWidth,imgHeight:this.imgHeight,effect:this.settings.effect,intensity1:this.settings.intensity1,intensity2:this.settings.intensity2,vertical:this.settings.vertical,$images:this.images,nextImage:1,$el:this.$el}),this.$el.append(this.distortionApp.renderer.domElement),this.createTimeline(),this.events()},events:function(){var e=this;this.$el.on("mouseenter",function(t){e.timeline&&(e.timeline.reversed&&e.timeline.reverse(),e.timeline.play())}),this.$el.on("mouseleave",function(t){e.timeline&&(e.timeline.reversed||(e.timeline.reverse(),e.timeline.completed=!1),e.timeline.play())})},createTimeline:function(){this.timeline=anime.timeline({autoplay:!1}),this.timeline.add({targets:this.distortionApp.mat.uniforms.dispFactor,value:1,easing:this.settings.easing,duration:this.settings.transitionDuration})},activateCaption:function(){var t=this;this.elements.$captions.removeClass(this.activeCssClass),setTimeout(function(){t.elements.$captions.eq(t.activeSlide).addClass(t.activeCssClass)},this.settings.transitionDuration/4)}};e(window).on("elementor/frontend/init",function(){t.hooks.addAction("frontend/element_ready/reycore-hoverbox-distortion.default",function(t,e){n.init(e(".rey-hoverBox-distortion",t))})})}(jQuery,window.elementorFrontend,window.elementorModules);