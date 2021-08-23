/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxFormattedInput","",{});a.extend(a.jqx._jqxFormattedInput.prototype,{defineInstance:function(){var b={width:null,height:null,radix:10,decimalNotation:"default",value:"0",min:"-9223372036854775808",max:"9223372036854775807",upperCase:false,spinButtons:true,spinButtonsStep:1,dropDown:false,dropDownWidth:null,popupZIndex:20000,placeHolder:"",roundedCorners:true,disabled:false,rtl:false,changeType:null,template:"",hint:true,_opened:false,$popup:a("<ul></ul>"),item:'<li><a href="#"></a></li>',events:["open","close","change","radixChange"]};if(this===a.jqx._jqxFormattedInput.prototype){return b}a.extend(true,this,b);return b},createInstance:function(){var b=this;b._Long();b._regex={2:new RegExp(/([0-1])/),8:new RegExp(/([0-7])/),10:new RegExp(/([0-9\-])/),16:new RegExp(/([0-9]|[a-f])/i)};b.render()},render:function(){var e=this;e._radixNumber=e._getRadix(e.radix);if(e.value!==""){e._number=new e.longObj.math.Long.fromString((e.value).toString(),e._radixNumber)}if(this.element instanceof HTMLInputElement){var g=a("<div></div>");g.addClass(e.toThemeProperty("jqx-input-group"));this.host.after(g);var b=this.element;var f=this.host.data();g.append(b);g[0].id=this.element.id;this.element.removeAttribute("id");this.element.setAttribute("hint",true);g[0].style=this.element.style;e.input=e.element;if(!(this.input instanceof HTMLInputElement)){this.input=this.host.find("input");if(this.input.length>0){this.input=this.input[0]}a(this.input).addClass(this.toThemeProperty("jqx-input-widget"))}this.element.style=""}if(e.baseHost){e.host=e.baseHost;e.element=e.host[0]}if(this.element.nodeName.toLowerCase()==="div"){this.baseHost=this.element;var b=this.host.find("input");var d=false;a.each(b,function(){var h=this.type;if(h===null||h==="text"||h==="textarea"){b=a(this);d=true;return false}});if(!d){throw new Error("jqxFormattedInput: Missing Text Input in the Input Group")}if(b.length>0){this.baseHost=a(this.element);var f=this.host.data();this.host=b;this.element=b[0];this.host.data(f);this.baseHost.addClass(this.toThemeProperty("jqx-widget"));this.baseHost.addClass(this.toThemeProperty("jqx-rc-all"));this.baseHost.addClass(this.toThemeProperty("jqx-input-group"));this.baseHost.addClass(this.toThemeProperty("jqx-formattedinput"));var c=this.baseHost.children();a.each(c,function(h){a(this).addClass(e.toThemeProperty("jqx-input-group-addon"));a(this).removeClass(e.toThemeProperty("jqx-rc-all"));if(h===0){a(this).addClass(e.toThemeProperty("jqx-rc-l"))}if(h===c.length-1){a(this).addClass(e.toThemeProperty("jqx-rc-r"))}if(this!==e.element){a(this).addClass(e.toThemeProperty("jqx-fill-state-normal"))}if(this.nodeName.toLowerCase()==="div"){e.appendSpinButtons=function(k){e._spinButtonsContainer=a(k);e._spinButtonsContainer.addClass(e.toThemeProperty("jqx-formatted-input-spin-buttons-container"));var j='<div class="'+e.toThemeProperty("jqx-fill-state-normal jqx-formatted-input-spin-button")+'"><div class="'+e.toThemeProperty("jqx-input-icon")+'"></div></div>';e._upbutton=a(j);e._spinButtonsContainer.append(e._upbutton);e._downbutton=a(j);e._spinButtonsContainer.append(e._downbutton);e._upArrow=e._upbutton.find("div");e._upArrow.addClass(e.toThemeProperty("jqx-icon-arrow-up"));e._downArrow=e._downbutton.find("div");e._downArrow.addClass(e.toThemeProperty("jqx-icon-arrow-down"));if(e.template){e._upbutton.addClass(e.toThemeProperty("jqx-"+e.template));e._downbutton.addClass(e.toThemeProperty("jqx-"+e.template))}e._spinButtonsStepLong=new e.longObj.math.Long.fromNumber(e.spinButtonsStep)};var i=function(j){e._addon=a(j);e._addon.addClass(e.toThemeProperty("jqx-formatted-input-addon"));if(!e._arrow){e._arrow=a('<div class="'+e.toThemeProperty("jqx-icon")+" "+e.toThemeProperty("jqx-icon-arrow-down")+'"></div>');e._arrow.appendTo(e._addon)}if(e.template){e._addon.addClass(e.toThemeProperty("jqx-"+e.template))}};if(e.rtl===false){if(!e._spinButtonsContainer&&e.spinButtons===true){e.appendSpinButtons(this)}else{if(!e._addon&&e.dropDown===true&&((h===2)||(h===1&&e.spinButtons===false))){i(this)}}}else{if(!e._addon&&e.dropDown===true){i(this);if(e.spinButtons===true){e._addon.addClass(e.toThemeProperty("jqx-formatted-input-addon-rtl"))}}else{if(!e._spinButtonsContainer&&e.spinButtons===true&&((h===1)||(h===0&&e.dropDown===false))){e.appendSpinButtons(this);e._spinButtonsContainer.addClass(e.toThemeProperty("jqx-formatted-input-spin-buttons-container-rtl"));if(e.dropDown===true){e._addon.addClass(e.toThemeProperty("jqx-formatted-input-addon-rtl"))}}}}}})}}e._inputAndAddon=e.host;if(e.baseHost){if(e._spinButtonsContainer){e._inputAndAddon=e._inputAndAddon.add(e._spinButtonsContainer)}if(e._addon){e._inputAndAddon=e._inputAndAddon.add(e._addon)}}e.removeHandlers();this.addHandlers();if(this.rtl){this.host.addClass(this.toThemeProperty("jqx-rtl"))}this.host.attr("role","textbox");a.jqx.aria(this,"aria-autocomplete","both");a.jqx.aria(this,"aria-disabled",this.disabled);a.jqx.aria(this,"aria-readonly",false);a.jqx.aria(this,"aria-multiline",false);a.jqx.aria(this,"aria-haspopup",true);if(e.value!==""&&e.value!==null){if(e.upperCase===true){e.host.addClass(e.toThemeProperty("jqx-formatted-input-upper-case"))}else{e.host.addClass(e.toThemeProperty("jqx-formatted-input-lower-case"))}if(e._radixNumber===10&&e.decimalNotation==="exponential"){e.element.value=e._getDecimalNotation("exponential")}else{e.element.value=e.value}}else{if(e._spinButtonsContainer){e._spinButtonsContainer.addClass(e.toThemeProperty("jqx-fill-state-disabled"))}}if(e._radixNumber!==10&&e.min.toString()==="-9223372036854775808"){e._minLong=new e.longObj.math.Long.fromNumber(e.min)}else{e._setMinMax("min")}if(e._radixNumber!==10&&e.max.toString()==="9223372036854775807"){e._maxLong=new e.longObj.math.Long.fromNumber(e.max)}else{e._setMinMax("max")}this._addBarAndLabel((this.baseHost&&a(this.baseHost.children()[this.baseHost.children.length-1]))||this.host);if(e.isMaterialized()){setTimeout(function(){if(e.hint){e.label[0].innerHTML=e.placeHolder}if(!e.baseHost){if(e.element.value.length===0){e.element.removeAttribute("hint")}else{e.element.setAttribute("hint",true)}e.bar.css("top","");return}if(e.element.value.length===0){e.baseHost[0].removeAttribute("hint")}else{e.baseHost[0].setAttribute("hint",true)}})}},_refreshClasses:function(c){var b=c?"addClass":"removeClass";this.host[b](this.toThemeProperty("jqx-widget-content"));this.host[b](this.toThemeProperty("jqx-input"));this.host[b](this.toThemeProperty("jqx-formatted-input"));this.host[b](this.toThemeProperty("jqx-widget"));this.$popup[b](this.toThemeProperty("jqx-popup"));if(a.jqx.browser.msie){this.$popup[b](this.toThemeProperty("jqx-noshadow"))}this.$popup[b](this.toThemeProperty("jqx-input-popup"));this.$popup[b](this.toThemeProperty("jqx-menu"));this.$popup[b](this.toThemeProperty("jqx-menu-vertical"));this.$popup[b](this.toThemeProperty("jqx-menu-dropdown"));this.$popup[b](this.toThemeProperty("jqx-widget"));this.$popup[b](this.toThemeProperty("jqx-widget-content"));if(this.roundedCorners){this.host[b](this.toThemeProperty("jqx-rc-all"));this.$popup[b](this.toThemeProperty("jqx-rc-all"));if(this.baseHost){this.baseHost[b](this.toThemeProperty("jqx-rc-all"));if(this.rtl===false){this.host[b](this.toThemeProperty("jqx-rc-l"));if(this._addon){this._addon[b](this.toThemeProperty("jqx-rc-r"))}}else{this.host[b](this.toThemeProperty("jqx-rc-r"));if(this._addon){this._addon[b](this.toThemeProperty("jqx-rc-l"))}}}}else{this.host.removeClass(this.toThemeProperty("jqx-rc-all"));this.$popup.removeClass(this.toThemeProperty("jqx-rc-all"));if(this.baseHost){this.baseHost.removeClass(this.toThemeProperty("jqx-rc-all"));if(this.rtl===false){this.host.removeClass(this.toThemeProperty("jqx-rc-l"));if(this.dropDown){this._addon.removeClass(this.toThemeProperty("jqx-rc-r"))}else{if(this.spinButtons){this._spinButtonsContainer.removeClass(this.toThemeProperty("jqx-rc-r"))}}}else{this.host.removeClass(this.toThemeProperty("jqx-rc-r"));if(this.dropDown){this._addon.removeClass(this.toThemeProperty("jqx-rc-l"))}else{if(this.spinButtons){this._spinButtonsContainer.removeClass(this.toThemeProperty("jqx-rc-l"))}}}}}if(this.disabled){this.host[b](this.toThemeProperty("jqx-fill-state-disabled"));if(this.baseHost){if(this._spinButtonsContainer){this._spinButtonsContainer[b](this.toThemeProperty("jqx-fill-state-disabled"))}if(this._addon){this._addon[b](this.toThemeProperty("jqx-fill-state-disabled"))}}}else{this.host.removeClass(this.toThemeProperty("jqx-fill-state-disabled"));if(this.baseHost&&this.value!==""&&this.value!==null){if(this._spinButtonsContainer){this._spinButtonsContainer.removeClass(this.toThemeProperty("jqx-fill-state-disabled"))}if(this._addon){this._addon.removeClass(this.toThemeProperty("jqx-fill-state-disabled"))}}}},selectAll:function(){var b=this.host;setTimeout(function(){if("selectionStart" in b[0]){b[0].focus();b[0].setSelectionRange(0,b[0].value.length)}else{var c=b[0].createTextRange();c.collapse(true);c.moveEnd("character",b[0].value.length);c.moveStart("character",0);c.select()}},10)},selectLast:function(){var b=this.host;this.selectStart(b[0].value.length)},selectFirst:function(){this.selectStart(0)},selectStart:function(c){var b=this.host;setTimeout(function(){if("selectionStart" in b[0]){b[0].focus();b[0].setSelectionRange(c,c)}else{var d=b[0].createTextRange();d.collapse(true);d.moveEnd("character",c);d.moveStart("character",c);d.select()}},10)},focus:function(){try{this.host.focus();var c=this;setTimeout(function(){c.host.focus()},25)}catch(b){}},refresh:function(){var f=this;this._refreshClasses(false);this._refreshClasses(true);if(!this.baseHost){if(this.width){this.host.width(this.width)}if(this.height){this.host.height(this.height)}}else{if(this.width){this.baseHost.width(this.width)}if(this.height){this.baseHost.height(this.height);var e=0;var j=this.baseHost.height()-2;if(a.jqx.browser.msie&&a.jqx.browser.version<8){this.baseHost.css("display","inline-block")}a.each(this.baseHost.children(),function(){if(this.className.indexOf("jqx-input-bar")>=0){return true}if(this.className.indexOf("jqx-input-label")>=0){return true}a(this).css("height","100%");if(a.jqx.browser.msie&&a.jqx.browser.version<8){a(this).css("height",j+"px")}if(this!==f.element){e+=a(this).outerWidth()}});var c=(typeof f.width==="string"&&f.width.charAt(f.width.length-1)==="%")?1:0;this.host.css("width",this.baseHost.width()-e-c+"px");if(a.jqx.browser.msie&&a.jqx.browser.version<9){if(f._spinButtonsContainer){if(f.rtl===false||f.rtl===true&&f._addon){f._spinButtonsContainer.css("border-left-width","0")}}if(f._addon){if(f.rtl===false){f._addon.css("border-left-width","0")}else{if(!f._spinButtonsContainer){f._addon.css("border-right-width","0")}}}var h=0;if(a.jqx.browser.version<8){var g=0;var d=parseInt(f.host.css("border-left-width"),10)+parseInt(f.host.css("border-right-width"),10);var i=parseInt(f.host.css("padding-left"),10)+parseInt(f.host.css("padding-right"),10);if(f._spinButtonsContainer){d+=parseInt(f._spinButtonsContainer.css("border-left-width"),10)+parseInt(f._spinButtonsContainer.css("border-right-width"),10);i+=parseInt(f._spinButtonsContainer.css("padding-left"),10)+parseInt(f._spinButtonsContainer.css("padding-right"),10);if(!f._addon){g=2}}if(f._addon){d+=parseInt(f._addon.css("border-left-width"),10)+parseInt(f._addon.css("border-right-width"),10);i+=parseInt(f._addon.css("padding-left"),10)+parseInt(f._addon.css("padding-right"),10);if(!f._spinButtonsContainer){g=2}}f.host.width(f.host.width()-(i+d)-g);h=6}f.host.height(f.baseHost.height()-(parseInt(f.host.css("border-top-width"),10)+parseInt(f.host.css("border-bottom-width"),10)+parseInt(f.host.css("padding-top"),10)+parseInt(f.host.css("padding-bottom"),10)+h));var b=f.host.height()+"px";f.host.css("min-height",b);f.host.css("line-height",b)}}if(f.baseHost&&f.bar){f.bar.css("top",1+f.host.outerHeight())}}this.host.attr("disabled",this.disabled);if(!this.host.attr("placeholder")){this._refreshPlaceHolder()}},_refreshPlaceHolder:function(){var b=this;if(this.isMaterialized()&&this.hint){this.label[0].innerHTML=this.placeHolder;return}if("placeholder" in this.element){this.host.attr("placeHolder",this.placeHolder)}else{var b=this;if(this.element.value===""){this.element.value=this.placeHolder;this.host.focus(function(){if(b.element.value===b.placeHolder){b.element.value=""}});this.host.blur(function(){if(b.element.value===""||b.element.value===b.placeHolder){b.element.value=b.placeHolder}})}}},destroy:function(){this.removeHandlers();if(this.baseHost){a.jqx.utilities.resize(this.baseHost,null,true);this.baseHost.remove()}else{a.jqx.utilities.resize(this.host,null,true);this.host.remove()}if(this.$popup){this.$popup.remove()}},propertyChangedHandler:function(b,d,g,f){if(d==="placeHolder"){b._refreshPlaceHolder();return}if(d=="template"){if(b.template){b._upbutton.removeClass(b.toThemeProperty("jqx-"+g));b._downbutton.removeClass(b.toThemeProperty("jqx-"+g));b._addon.removeClass(b.toThemeProperty("jqx-"+g));b._upbutton.addClass(b.toThemeProperty("jqx-"+b.template));b._downbutton.addClass(b.toThemeProperty("jqx-"+b.template));b._addon.addClass(b.toThemeProperty("jqx-"+b.template))}}if(d==="theme"){a.jqx.utilities.setTheme(g,f,b.host);return}if(d==="disabled"){a.jqx.aria(b,"aria-disabled",b.disabled)}if(d==="value"&&g.toString().toUpperCase()!==f.toString().toUpperCase()){b.val(f);return}if(g!==f&&d==="radix"){b._changeRadix(f);return}if(g!==f&&d==="decimalNotation"&&b._radixNumber===10){if(f==="exponential"){b.element.value=b._getDecimalNotation("exponential")}else{b.element.value=b._number.toString(10)}}if(g!==f&&(d==="min"||d==="max")){b._setMinMax(d);b._validateValue(b.value,true);b.value=b.element.value;return}if(g!==f&&(d==="upperCase")&&b.element.value!==""){if(f===true){b.host.removeClass(b.toThemeProperty("jqx-formatted-input-lower-case"));b.host.addClass(b.toThemeProperty("jqx-formatted-input-upper-case"))}else{b.host.removeClass(b.toThemeProperty("jqx-formatted-input-upper-case"));b.host.addClass(b.toThemeProperty("jqx-formatted-input-lower-case"))}return}function c(i,j){var k=b.host.width();var h=i.outerWidth();if(j===false){b.host.width(k+h);i.hide();if(b.rtl===true){if(b.spinButtons===true){b._spinButtonsContainer.addClass(b.toThemeProperty("jqx-formatted-input-spin-buttons-container-rtl-border"))}if(b.dropDown===true){b._addon.removeClass(b.toThemeProperty("jqx-formatted-input-addon-rtl"))}}}else{b.host.width(k-h);i.show();if(b.rtl===true&&b.spinButtons===true&&b.dropDown===true){b._spinButtonsContainer.removeClass(b.toThemeProperty("jqx-formatted-input-spin-buttons-container-rtl-border"));b._addon.addClass(b.toThemeProperty("jqx-formatted-input-addon-rtl"))}}}function e(j,l){if(l===true){var k=a("<div></div>");if(b.baseHost){var h=b.baseHost.children("div");if((b.rtl===false&&j==="spinButtons")||(b.rtl===true&&j==="dropDown")){h.before(k)}else{h.after(k)}b.render();b.host.width(b.host.width()-k.outerWidth())}else{var n=b.element.id;b.host.removeAttr("id");b.host.wrap('<div id="'+n+'" style="display: inline-block;"></div>');var m=a("#"+n);if(b.rtl===false){m.append(k)}else{m.prepend(k)}var i=b.host.data();i.jqxFormattedInput.host=m;i.jqxFormattedInput.element=m[0];b.baseHost=m;b.baseHost.data(i);b.render();b.refresh()}}}if(d==="spinButtons"){if(g!==f){if(b._spinButtonsContainer){c(b._spinButtonsContainer,f)}else{e("spinButtons",f)}return}else{return}}if(g!==f&&d==="spinButtonsStep"){b._spinButtonsStepLong=new b.longObj.math.Long.fromNumber(f)}if(d==="dropDown"){if(g!==f){if(b._addon){c(b._addon,f)}else{e("dropDown",f)}return}else{return}}b.refresh()},select:function(d,e,b){var c=this;if(!b){b=c.$popup.find(".jqx-fill-state-pressed").attr("data-value")}c._changeRadix(parseInt(b,10));c._setMaxLength(true);c.close()},val:function(g){var f=this;if((g||g==="")&&!(typeof g==="object"&&a.isEmptyObject(g)===true)&&g!=="binary"&&g!=="octal"&&g!=="decimal"&&g!=="exponential"&&g!=="scientific"&&g!=="engineering"&&g!=="hexadecimal"){g=g.toString();if(g.toUpperCase()!==f.element.value.toString().toUpperCase()){var b=f.element.value;if(f.upperCase===true){g=g.toUpperCase()}var e=g.split("");for(var c=0;c<e.length;c++){if(!f._regex[""+f._radixNumber+""].test(e[c])){return}}var h=f._validateValue(g,true);f._raiseEvent("2",{value:h,oldValue:b,radix:f._radixNumber});f.value=h;return h}else{return g}}else{if(g&&!(typeof g==="object"&&a.isEmptyObject(g)===true)){if(g==="exponential"||g==="scientific"||g==="engineering"){return f._getDecimalNotation(g)}else{var d=f._getRadix(g);return f._number.toString(d)}}else{return f.element.value}}},_changeRadix:function(d){var f=this;var e=f._getRadix(d);var g=f.value!==""?f._number.toString(e):"";var b=f.radix;var c=f.value;f.radix=d;f._radixNumber=e;f.element.value=g;f.value=g;this._raiseEvent("3",{radix:d,oldRadix:b,value:g,oldValue:c})},_raiseEvent:function(f,c){if(c===undefined){c={owner:null}}var d=this.events[f];c.owner=this;var e=new a.Event(d);e.owner=this;if(f==2){c.type=this.changeType;this.changeType=null}e.args=c;if(e.preventDefault){e.preventDefault()}var b;if(this.baseHost){b=this.baseHost.trigger(e)}else{b=this.host.trigger(e)}return b},open:function(){var f=this;f._setPopupOptions();f._render(f._popupOptions);if(a.jqx.isHidden(this.host)){return}var c;if(f.baseHost){c=a.extend({},f.baseHost.coord(true),{height:f.baseHo