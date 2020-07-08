jQuery(function(s){"use strict";var a,i,t;function o(e,i){s(".js-ocdi-ajax-response").empty(),i.siblings(".js-ocdi-gl-item").fadeOut(500),i.animate({opacity:0},500,"swing",function(){i.animate({opacity:1},500)}),i.closest(".js-ocdi-gl").find(".js-ocdi-gl-header").fadeOut(500),i.parent().prepend("<h3>"+ocdi.texts.selected_import_title+"</h3>"),i.find(".js-ocdi-gl-import-data").remove();var o=new FormData;o.append("action","ocdi_import_demo_data"),o.append("security",ocdi.ajax_nonce),o.append("selected",e),d(o)}function d(o){s.ajax({method:"POST",url:ocdi.ajax_url,data:o,contentType:!1,processData:!1,beforeSend:function(){s(".js-ocdi-ajax-loader").show()}}).done(function(e){if(void 0!==e.status&&"newAJAX"===e.status)d(o);else if(void 0!==e.status&&"customizerAJAX"===e.status){(i=new FormData).append("action","ocdi_import_customizer_data"),i.append("security",ocdi.ajax_nonce),!0===ocdi.wp_customize_on&&i.append("wp_customize","on"),d(i)}else if(void 0!==e.status&&"afterAllImportAJAX"===e.status){var i;(i=new FormData).append("action","ocdi_after_import_data"),i.append("security",ocdi.ajax_nonce),d(i)}else void 0!==e.message?(s(".js-ocdi-ajax-response").append("<p>"+e.message+"</p>"),s(".js-ocdi-ajax-loader").hide(),s(document).trigger("ocdiImportComplete")):(s(".js-ocdi-ajax-response").append('<div class="notice  notice-error  is-dismissible"><p>'+e+"</p></div>"),s(".js-ocdi-ajax-loader").hide(),s(document).trigger("reycore/ocdi/failed_import"))}).fail(function(e){s(".js-ocdi-ajax-response").append('<div class="notice  notice-error  is-dismissible"><p>Error: '+e.statusText+" ("+e.status+")</p></div>"),s(".js-ocdi-ajax-loader").hide(),s(document).trigger("reycore/ocdi/failed_import")})}s(".js-ocdi-import-data").on("click",function(){s(".js-ocdi-ajax-response").empty();var e=new FormData;e.append("action","ocdi_import_demo_data"),e.append("security",ocdi.ajax_nonce),e.append("selected",s("#ocdi__demo-import-files").val()),s("#ocdi__content-file-upload").length&&e.append("content_file",s("#ocdi__content-file-upload")[0].files[0]),s("#ocdi__widget-file-upload").length&&e.append("widget_file",s("#ocdi__widget-file-upload")[0].files[0]),s("#ocdi__customizer-file-upload").length&&e.append("customizer_file",s("#ocdi__customizer-file-upload")[0].files[0]),s("#ocdi__redux-file-upload").length&&(e.append("redux_file",s("#ocdi__redux-file-upload")[0].files[0]),e.append("redux_option_name",s("#ocdi__redux-option-name").val())),s("#ocdi__rey-file-upload").length&&(e.append("redux_file",s("#ocdi__rey-file-upload")[0].files[0]),e.append("redux_option_name","-")),d(e)}),s(".js-ocdi-gl-import-data").on("click",function(){var e=s(this).val(),i=s(this).closest(".js-ocdi-gl-item");ocdi.import_popup?function(i,o){var e=s("#js-ocdi-modal-content"),t=(ocdi.import_files[i].import_preview_image_url||ocdi.theme_screenshot,ocdi.import_files[i].import_notice||""),d="",a=s.extend({dialogClass:"wp-dialog",resizable:!1,height:"auto",modal:!0},ocdi.dialog_options,{buttons:[{text:ocdi.texts.dialog_no,click:function(){s(this).dialog("close")}},{text:ocdi.texts.dialog_yes,class:"button  button-primary",click:function(e){s(document).trigger("reycore/ocdi/import_demo",[i,o,s(this),s(e.currentTarget),ocdi.import_files])}}]});""!==t&&(d='<div class="ocdi__modal-notice">'+t+"</div>");e.prop("title",ocdi.texts.dialog_title),e.html('<p class="ocdi__modal-item-title">'+ocdi.import_files[i].import_file_name+"</p>"+d),e.dialog(a)}(e,i):o(e,i)}),a=s(".js-ocdi-gl-item-container").find(".js-ocdi-gl-item"),i="ocdi-is-fadeout",t=function(t){var e,d=jQuery.Deferred();return(e=jQuery.Deferred(),a.addClass(i),setTimeout(function(){a.removeClass(i).hide(),e.resolve()},200),e.promise()).done(function(){var e,i,o;i=d,o=(e=t)?'[data-categories*="'+e+'"]':"div","all"===e&&(o="div"),a.filter(o).show().addClass("ocdi-is-fadein"),setTimeout(function(){a.removeClass("ocdi-is-fadein"),i.resolve()},200)}),d},s(".js-ocdi-nav-link").on("click",function(e){e.preventDefault(),s(this).parent().siblings().removeClass("active"),s(this).parent().addClass("active");var i=this.hash.slice(1),o=s(".js-ocdi-gl-item-container");o.css("min-width",o.outerHeight()),t(i).done(function(){o.removeAttr("style")})}),s(".js-ocdi-gl-search").on("keyup",function(e){0<s(this).val().length?(s(".js-ocdi-gl-item-container").find(".js-ocdi-gl-item").hide(),s(".js-ocdi-gl-item-container").find('.js-ocdi-gl-item[data-name*="'+s(this).val().toLowerCase()+'"]').show()):s(".js-ocdi-gl-item-container").find(".js-ocdi-gl-item").show()}),s.ocdiGridLayoutImport=function(e,i){o(e,i)}});