!function(d){"use strict";var r={widgets:{},$widgets:{},init:function(){"undefined"!=typeof reyajaxfilter_params&&(d(".reyajfilter-ajax-term-filter").each(function(e,t){r.widgets[e]=d(t).attr("id"),r.$widgets[e]=d(t)}),this.$shopLoopContainer=d(reyajaxfilter_params.shop_loop_container),this.$shopLoopEmptyContainer=d(reyajaxfilter_params.not_found_container),this.getApplyFilterBtn(),this.applyFilterBtnID=this.applyFilterBtn.parent().attr("id")||"",this.isActiveFilterEnabled=this.applyFilterBtn.length,this.applyFilterBtnID&&(r.widgets[Object.keys(r.widgets).length]=this.applyFilterBtnID),this.events(),this.dropDownFilter(),this.initScrollbarContainer(),this.initOrder(),this.priceSlider(),this.stickyActiveFilter(),this.alphabeticMenu(),this.accordionItems(),this.changeVariableProductImage(),this.stickyTopFilter())},getApplyFilterBtn:function(){this.applyFilterBtn=d(".js-rey-applyFilters-btn")},setHistory:function(e){e.replace("?reynotemplate=1",""),e.replace("&reynotemplate=1",""),history.pushState({},"",e)},beforeUpdate:function(){var e,t,r=0;(this.$shopLoopContainer.length?e=this.$shopLoopContainer:this.$shopLoopEmptyContainer.length&&(e=this.$shopLoopEmptyContainer),e.length&&"default"===reyajaxfilter_params.animation_type)&&(void 0!==reyajaxfilter_params.scroll_to_top&&1==reyajaxfilter_params.scroll_to_top&&(t=void 0!==reyajaxfilter_params.scroll_to_top_offset?parseInt(reyajaxfilter_params.scroll_to_top_offset):100,(r=e.offset().top-t)<0&&(r=0),d("html, body").animate({scrollTop:r},"slow",function(e){return--e*e*e+1})))},filterProducts:function(e){if(!this.isActiveFilterEnabled||e){var n=this;d(document).trigger("reycore/ajaxfilters/started"),this.beforeUpdate();var t="";d("body").hasClass("elementor-page")||(t=(-1!==window.location.href.indexOf("?")?"&":"?")+"reynotemplate=1"),d.get(window.location.href+t,function(e){var i=jQuery(e),t=i.find(reyajaxfilter_params.shop_loop_container),r=i.find(reyajaxfilter_params.not_found_container);d.each(n.widgets,function(e,t){var r=i.find("#"+t),a=d(r).attr("class");d("#"+t).attr("class",a),d("#"+t).html(r.html())});var a=!1;reyajaxfilter_params.shop_loop_container==reyajaxfilter_params.not_found_container?a=d(reyajaxfilter_params.shop_loop_container).html(t.html()):d(reyajaxfilter_params.not_found_container).length?t.length?a=d(reyajaxfilter_params.not_found_container).html(t.html()):r.length&&(a=d(reyajaxfilter_params.not_found_container).html(r.html())):d(reyajaxfilter_params.shop_loop_container).length&&(t.length?a=d(reyajaxfilter_params.shop_loop_container).html(t.html()):r.length&&(a=d(reyajaxfilter_params.shop_loop_container).html(r.html()))),n.getApplyFilterBtn(),n.initOrder(),n.dropDownFilter(),n.initScrollbarContainer(),n.stickyActiveFilter(),n.topActiveFilter(i),n.alphabeticMenu(),n.accordionItems(),n.changeVariableProductImage(a),d(document).trigger("reycore/ajaxfilters/finished",[a,i,n.widgets])})}},getUrlVars:function(e){for(var t,r={},a=(e=void 0===e?window.location.href:e).slice(e.indexOf("?")+1).split("&"),i=0;i<a.length;i++)r[(t=a[i].split("="))[0]]=t[1];return r},fixPagination:function(){var e,t=window.location.href,r=this.getUrlVars(t);return(e=parseInt(t.replace(/.+\/page\/([0-9]+)+/,"$1")))?1<e&&(t=t.replace(/page\/([0-9]+)/,"page/1")):void 0!==r.paged&&1<(e=parseInt(r.paged))&&(t=t.replace("paged="+e,"paged=1")),t},updateQueryStringParameter:function(e,t,r,a){void 0===r&&(r=!0),this.isActiveFilterEnabled&&this.applyFilterBtn.removeClass("--disabled"),void 0===a&&(a=this.fixPagination());var i,n=new RegExp("([?&])"+e+"=.*?(&|$)","i"),l=-1!==a.indexOf("?")?"&":"?";return i=a.match(n)?a.replace(n,"$1"+e+"="+t+"$2"):a+l+e+"="+t,!0===r?this.setHistory(i):i},removeQueryStringParameter:function(e,t){void 0===t&&(t=this.fixPagination()),this.isActiveFilterEnabled&&this.applyFilterBtn.removeClass("--disabled");var r,a=this.getUrlVars(t),i=Object.keys(a).length,n="?",l=t.indexOf(n),s=t.indexOf(e);1<i?r=n+(a=(1<s-l?t.replace("&"+e+"="+a[e],""):t.replace(e+"="+a[e]+"&","")).split(n))[1]:r=t.replace(n+e+"="+a[e],"");return r},singleFilter:function(e,t){var r,a=this.getUrlVars();r=void 0!==a[e]&&a[e]==t?this.removeQueryStringParameter(e):this.updateQueryStringParameter(e,t,!1),this.setHistory(r),this.filterProducts()},makeParameters:function(e,t,r){var a,i,n=!1;if(void 0!==(a=void 0!==r?this.getUrlVars(r):this.getUrlVars())[e]){var l=a[e],s=l.split(",");if(0<l.length){var o=jQuery.inArray(t,s);0<=o?(s.splice(o,1),0==s.length&&(n=!0)):s.push(t),i=1<s.length?s.join(","):s}else i=t}else i=t;if(0==n)this.updateQueryStringParameter(e,i);else{var c=this.removeQueryStringParameter(e);this.setHistory(c)}this.filterProducts()},initOrder:function(){var r=this;void 0!==reyajaxfilter_params.sorting_control&&reyajaxfilter_params.sorting_control.length&&1==reyajaxfilter_params.sorting_control&&d(reyajaxfilter_params.shop_loop_container).find(".woocommerce-ordering").each(function(e){d(this).on("submit",function(e){e.preventDefault()}),d(this).on("change","select.orderby",function(e){e.preventDefault();var t=d(this).val();r.updateQueryStringParameter("orderby",t),r.filterProducts(!0)})})},dropDownFilter:function(){var l=this;d(".reyajfilter-select2").each(function(e,t){var r=d(t),a="select2-reyStyles",i=r.is('[data-checkboxes="true"]'),n={templateResult:l.formatState,minimumResultsForSearch:-1,allowClear:!0,containerCssClass:a,dropdownCssClass:a,dropdownAutoWidth:!0,placeholder:r.attr("data-placeholder")||"Choose"};r.is('[data-search="true"]')&&(n.minimumResultsForSearch=parseInt(reyajaxfilter_params.dd_search_threshold)),i&&(n.containerCssClass+=" --checkboxes",n.dropdownCssClass+=" --checkboxes"),l.isActiveFilterEnabled&&(n.closeOnSelect=!1),r.is("[data-ddcss]")&&(n.dropdownAutoWidth=!1,n.dropdownCss=JSON.parse(r.attr("data-ddcss")||"{}")),r.hasClass("reyajfilter-select2-single")?r.select2(n):r.hasClass("reyajfilter-select2-multiple")&&(i?(n.templateSelection=function(e,t){return n.placeholder?n.placeholder:"Selected "+e.length+" of "+t},r.select2MultiCheckboxes(n)):r.select2(n))}),d(".select2-dropdown").css("display","none")},initScrollbarContainer:function(e){var t=e||d(document);d(".reyajfilter-layered-nav[data-height]",t).each(function(e,t){var r=d(t),a=d(".reyajfilter-layered-navInner",r),i=r.attr("data-height")||0;if(d(".reyajfilter-layered-list",a).height()<parseFloat(i))return a.css("height",""),void d(".reyajfilter-customHeight-all",r).hide();a.length&&"undefined"!=typeof SimpleScrollbar&&SimpleScrollbar.initEl(a[0])})},priceSlider:function(){var e=document.getElementById("reyajfilter-noui-slider"),t=d(e),l=this;if(t.length&&"undefined"!=typeof noUiSlider){var s=parseInt(t.attr("data-min")),o=parseInt(t.attr("data-max")),r=parseInt(t.attr("data-set-min")),a=parseInt(t.attr("data-set-max"));if(r||(r=s),a||(a=o),r===a)return void t.closest(".reyajfilter-price-filter-widget").hide();noUiSlider.create(e,{start:[r,a],step:1,connect:!0,margin:5,tooltips:!0,format:wNumb({decimals:0}),range:{min:s,max:o}}),e.noUiSlider.on("change",function(e,t){l.getUrlVars();if(t){var r=parseInt(e[t]),a="max-price";if(r==o){var i=l.removeQueryStringParameter(a);l.setHistory(i)}else l.updateQueryStringParameter(a,r)}else{var n=parseInt(e[t]);a="min-price";if(n==s){i=l.removeQueryStringParameter(a);l.setHistory(i)}else l.updateQueryStringParameter(a,n)}l.filterProducts()})}},handlePriceSelect2:function(e){var t=d(e.target),a=t.val(),r=d('option[value="'+a+'"]',t),i=[{key:r.attr("data-key-min")||"min-price",val:r.attr("data-value-min")},{key:r.attr("data-key-max")||"max-price",val:r.attr("data-value-max")}],n=this;d.each(i,function(e,t){if(a)n.updateQueryStringParameter(t.key,t.val);else{var r=n.removeQueryStringParameter(t.key);n.setHistory(r)}}),this.filterProducts()},handleDefaultSelect2:function(e){var t=d(e.target).attr("name"),r=d(e.target).val();if(r)r=r.toString(),this.updateQueryStringParameter(t,r);else{var a=this.removeQueryStringParameter(t);this.setHistory(a)}this.filterProducts()},formatState:function(e){if(void 0!==e.loading)return e.text;var t="",r=d(e.element);if(r.is("[data-depth]")){var a=r.attr("data-depth");a&&(t+='<span class="__depth __depth--'+a+'"></span>')}if(r.parent("select").is("[data-checkboxes]")&&"true"==r.parent("select").attr("data-checkboxes")&&(t+='<span class="__checkbox"></span>'),t+='<span class="__text">'+e.text+"</span>",r.is("[data-count]")){var i=r.attr("data-count");i&&(t+='<span class="__count">'+i+"</span>")}return d(t)},objDiff:function(r,e){var a=this,i={};return _.each(e,function(e,t){null!=r[t]?Array.isArray(e)?i[t]=_.difference(e,r[t]):"object"==typeof e?i[t]=a.objDiff(r[t],e):null==r||null!=r[t]&&r[t]==e||(i[t]=e):i[t]=e}),i},stickyActiveFilter:function(){if(reyajaxfilter_params.apply_filter_fixed&&d.reyHelpers.is_desktop){var e=this.applyFilterBtn.closest(".rey-sidebar.shop-sidebar");this.applyFilterBtn.closest(".rey-filterPanel");if(e.length){var r,a,i,n,l=d(".rey-applyFilters-btn-wrapper",e),t=function(){r=d(window).height(),n=e.offset().top,i=n+e.height(),a=e.height(),l.css("width",l.width())},s=function(){var e=window.pageYOffset||document.documentElement.scrollTop,t=r<a&&r+e<i&&n<e+r;l.toggleClass("--sticky",t)};t(),s(),d(window).on("resize",d.reyHelpers.debounce(function(){t(),s()},400)),d(window).on("scroll",s)}}},topActiveFilter:function(e){d(".rey-filterTop-head",document).html(d(".rey-filterTop-head",e).html())},alphabeticMenu:function(){d.each(this.$widgets,function(e,t){var r,a=d(".reyajfilter-alphabetic",t),i=[];a.length&&(d("li[data-letter]",t).each(function(e,t){i.push(d(this).attr("data-letter"))}),r=i.filter(function(e,t,r){return r.indexOf(e)===t}).sort(),d.each(r,function(e,t){d('<span data-letter="'+t+'">'+t+"</span>").appendTo(a)}))})},accordionItems:function(){d(".reyajfilter-layered-nav.--accordion").each(function(e,t){var r=d(t);d(".__toggle",r).each(function(e,t){d(t).addClass("--collapsed"),d(t).nextAll("ul.children").addClass("--hidden")}),d(".chosen",r).each(function(e,t){var r=d(t).parents("ul");r.siblings(".__toggle").removeClass("--collapsed"),r.removeClass("--hidden")}),d(document).trigger("reycore/ajaxfilters/accordion_loaded",[r.parent()])})},stickyTopFilter:function(){if(d.reyHelpers.is_desktop){var t=d(".filters-top-sidebar.rey-filterSidebar.--sticky");if(t.length){var r=t.offset().top,e=50;void 0!==d.reyHelpers.applyFilter&&(e=d.reyHelpers.applyFilter("reycore/ajaxfilter/top_sidebar/sticky_debounce",e));var a=function(){t.toggleClass("--is-sticked",(window.pageYOffset||document.documentElement.scrollTop)>r)};a(),d(window).on("scroll",d.reyHelpers.debounce(function(e){a()},e)),d(window).on("resize",d.reyHelpers.debounce(function(e){r=t.offset().top},500))}}},changeVariableProductImage:function(e){e=e||d(".reyajfilter-before-products ul.products"),d("li.product .rey-productVariations",e).each(function(e,t){var r=d(t),a=r.attr("data-attribute-name");if(a){var i=d('.reyajfilter-layered-nav[data-taxonomy="'+a.replace("attribute_","")+'"] li.chosen > a');if(i.length){var n=i.first().attr("data-slug")||"";if(n&&$productsAttributes.length){var l=d('span[data-slug="'+n+'"]',r);setTimeout(function(){l.parent("li").trigger("click")},100)}}}}),d("li.product .wvs-archive-variation-wrapper",e).each(function(e,t){var r=d("li:first-child > select",t),a=r.attr("data-attribute_name");if(a){var i=d('.reyajfilter-layered-nav[data-taxonomy="'+a.replace("attribute_","")+'"] li.chosen > a');if(i.length){var n=i.first().attr("data-slug")||"";if(n){var l=r.next("ul.variable-items-wrapper");d('li[data-value="'+n+'"]',l).trigger("click"),r.val(n).trigger("change").trigger("click").trigger("focusin"),l.trigger("wvs-selected-item",[n,r,d(t)])}}}})},events:function(){var c=this;if(d(document).on("reycore/woocommerce/filter_panel/open",function(){c.stickyActiveFilter()}),d(".reyajfilter-ajax-term-filter").not(".reyajfilter-price-filter-widget").on("click","li a",function(e){e.preventDefault();var t=d(this),r=t.parent(),a=t.closest("ul"),i=t.attr("data-key"),n=t.attr("data-value"),l=t.attr("data-multiple-filter"),s=t.prevAll(".__toggle"),o=d(e.target);!s.length||o.is("span.__checkbox")?(c.isActiveFilterEnabled&&(1==l?r.toggleClass("chosen"):r.hasClass("chosen")?r.removeClass("chosen"):(a.children().removeClass("chosen"),r.addClass("chosen"))),1==l?c.makeParameters(i,n):c.singleFilter(i,n)):s.trigger("click")}),d(".reyajfilter-price-filter-widget.reyajfilter-ajax-term-filter").on("click","li a",function(e){e.preventDefault();var t,r=d(this),a=r.attr("data-key-min"),i=r.attr("data-value-min"),n=r.attr("data-key-max"),l=r.attr("data-value-max");r.parent().hasClass("chosen")?(t=c.removeQueryStringParameter(a),""==(t=c.removeQueryStringParameter(n,t))&&(t=window.location.href.split("?")[0]),c.setHistory(t)):(t=c.updateQueryStringParameter(a,i,!1),t=c.updateQueryStringParameter(n,l,!0,t)),c.filterProducts()}),0<reyajaxfilter_params.pagination_container.length){var e=reyajaxfilter_params.pagination_container+" a";d(document).on("click",e,function(e){e.preventDefault();var t=d(this).attr("href");c.setHistory(t),c.filterProducts(!0)})}d(window).bind("popstate",function(e){d(reyajaxfilter_params.shop_loop_container).length&&c.filterProducts()}),d(document).on("click",".reyajfilter-active-filters a:not(.reset)",function(e){e.preventDefault();var t=d(this),r=t.attr("data-key"),a=t.attr("data-value");if(void 0===a){var i=c.removeQueryStringParameter(r);if(c.setHistory(i),d("#reyajfilter-noui-slider").length&&jQuery().noUiSlider){var n=document.getElementById("reyajfilter-noui-slider"),l=parseInt(d(n).attr("data-min")),s=parseInt(d(n).attr("data-max"));l&&s&&("min-price"===r?n.noUiSlider.set([l,null]):"max-price"===r&&n.noUiSlider.set([null,s]))}c.filterProducts()}else c.makeParameters(r,a)}),d(document).on("click",".reyajfilter-active-filters a.reset",function(e){e.preventDefault();var t=d(this).attr("data-location");c.setHistory(t),c.filterProducts(!0)}),d(document).on("change",'.js-reyajfilter-check-filter input[type="checkbox"]',function(e){e.preventDefault();var t=d(this),r=t.attr("data-key"),a=t.val();if(t.prop("checked"))c.updateQueryStringParameter(r,a);else{var i=c.removeQueryStringParameter(r);c.setHistory(i)}c.filterProducts()}),d(document).on("change",".reyajfilter-select2",function(e){e.preventDefault(),d(this).hasClass("reyajfilter-select2--prices")?c.handlePriceSelect2(e):c.handleDefaultSelect2(e)}),d(document).on("click",".js-rey-applyFilters-btn",function(e){e.preventDefault(),d(this).addClass("--loading"),c.filterProducts(!0)}),d(document).on("click",".reyajfilter-layered-nav[data-height] .reyajfilter-customHeight-all",function(e){e.preventDefault();var t=d(this).closest(".reyajfilter-layered-nav"),r=t.find(".reyajfilter-layered-navInner");if(t.hasClass("--reset-height"))return r.css("height",t.attr("data-height")),void t.removeClass("--reset-height");r.css("height",""),t.addClass("--reset-height")}),d(document).on("input",".js-reyajfilter-searchbox input",d.reyHelpers.debounce(function(e){e.preventDefault();var t=d(this).closest(".widget").find(".reyajfilter-layered-list"),r=d("li > a",t),a=new RegExp(e.target.value,"gi");r.parent().addClass("--hidden"),r.filter(function(){var e=d(this).closest("li").attr("data-rey-tooltip");return d(this).text().match(a)||(e?e.match(a):"")}).parents("li").removeClass("--hidden")},400)),d(document).on("click",".reyajfilter-alphabetic span",function(e){e.preventDefault();var t=d(this),r=t.parent(),a=t.attr("data-letter")||"",i=r.nextAll(".reyajfilter-layered-nav").find("li[data-letter]");if(t.hasClass("reyajfilter-alphabetic-all")){if(t.hasClass("--reset-filter")&&t.is("[data-key]")){var n=c.removeQueryStringParameter(t.attr("data-key"));c.setHistory(n),c.filterProducts()}return r.children().removeClass("--active"),t.addClass("--active"),i.removeClass("--hidden"),void c.initScrollbarContainer(r)}r.children().removeClass("--active"),t.addClass("--active"),i.addClass("--hidden");var l=i.filter('[data-letter="'+a+'"]');l.removeClass("--hidden"),l.parents("li[data-letter]").removeClass("--hidden"),c.initScrollbarContainer(r)}),d(document).on("click",".js-rey-filter-reset",function(e){e.preventDefault();var t=d(this).attr("data-location");c.setHistory(t),c.filterProducts(!0)}),d(document).on("reycore/ajaxfilters/started",function(e){d(".--anim-default .is-animated-entry").animate({visibility:"hidden",opacity:0},40),d("body").addClass("--is-filtering")}),d(document).on("click",".reyajfilter-layered-nav.--accordion .__toggle",function(e){e.preventDefault(),d(this).toggleClass("--collapsed"),d(this).nextAll("ul.children").toggleClass("--hidden")})}};d(document).ready(function(){r.init()})}(jQuery);