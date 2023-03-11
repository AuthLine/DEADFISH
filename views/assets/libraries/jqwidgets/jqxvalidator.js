/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxValidator","",{});a.extend(a.jqx._jqxValidator.prototype,{defineInstance:function(){var b={rules:null,scroll:true,focus:true,scrollDuration:300,scrollCallback:null,position:"right",arrow:true,animation:"fade",animationDuration:150,closeOnClick:true,onError:null,onSuccess:null,ownerElement:null,_events:["validationError","validationSuccess"],hintPositionOffset:5,_inputHint:[],rtl:false,hintType:"tooltip"};if(this===a.jqx._jqxValidator.prototype){return b}a.extend(true,this,b);return b},createInstance:function(){if(this.hintType=="label"&&this.animationDuration==150){this.animationDuration=0}this._configureInputs();this._removeEventListeners();this._addEventListeners()},destroy:function(){this._removeEventListeners();this.hide()},validate:function(q){var b=true,p,f=Infinity,j,h,c,k=[],o;this.updatePosition();var l=this;var d=0;for(var g=0;g<this.rules.length;g+=1){if(typeof this.rules[g].rule==="function"){d++}}this.positions=new Array();for(var g=0;g<this.rules.length;g+=1){var n=a(this.rules[g].input);if(typeof this.rules[g].rule==="function"){var m=function(s,r){p=s;if(false==p){b=false;var i=a(r.input);c=a(r.input);k.push(c);var t=c.offset();if(t){j=t.top;if(f>j){f=j;h=c}}}d--;if(d==0){if(typeof q==="function"){l._handleValidation(b,f,h,k);if(q){q(b)}}}};this._validateRule(this.rules[g],m)}else{p=this._validateRule(this.rules[g])}if(false==p){b=false;c=a(this.rules[g].input);k.push(c);var e=c.offset();if(e){j=e.top;if(f>j){f=j;h=c}}}}if(d==0){this._handleValidation(b,f,h,k);return b}else{return undefined}},validateInput:function(b){var e=this._getRulesForInput(b),d=true;for(var c=0;c<e.length;c+=1){if(!this._validateRule(e[c])){d=false}}return d},hideHint:function(b){var d=this._getRulesForInput(b);for(var c=0;c<d.length;c+=1){this._hideHintByRule(d[c])}},hide:function(){var c;for(var b=0;b<this.rules.length;b+=1){c=this.rules[b];this._hideHintByRule(this.rules[b])}},updatePosition:function(){var c;this.positions=new Array();for(var b=0;b<this.rules.length;b+=1){c=this.rules[b];if(c.hint){this._hintLayout(c.hint,a(c.input),c.position,c)}}},_getRulesForInput:function(b){var d=[];for(var c=0;c<this.rules.length;c+=1){if(this.rules[c].input===b){d.push(this.rules[c])}}return d},_validateRule:function(f,i){var b=a(f.input),h,e=true;var d=this;var g=function(k){if(!k){var j=d.animation;d.animation=null;if(f.hint){d._hideHintByRule(f)}if(a(b).css("display")=="none"){d._hideHintByRule(f);return}if(a(b).parents().length==0){d._hideHintByRule(f);return}h=f.hintRender.apply(d,[f.message,b]);d._hintLayout(h,b,f.position,f);d._showHint(h);f.hint=h;d._removeLowPriorityHints(f);if(i){i(false,f)}d.animation=j}else{d._hideHintByRule(f);if(i){i(true,f)}}};var c=false;if(typeof f.rule==="function"){c=f.rule.call(this,b,g);if(c==true&&i){i(true,f)}}if(typeof f.rule==="function"&&c==false){if(typeof f.hintRender==="function"&&!f.hint&&!this._higherPriorityActive(f)&&b.is(":visible")){h=f.hintRender.apply(this,[f.message,b]);this._removeLowPriorityHints(f);this._hintLayout(h,b,f.position,f);this._showHint(h);f.hint=h}e=false;if(i){i(false,f)}}else{this._hideHintByRule(f)}return e},_hideHintByRule:function(e){var c=a(e.input);var b=this,f;var d=function(){if(b.hintType!="label"){return}var g=b;if(g.position=="top"||g.position=="left"){if(c.prev().hasClass(".jqx-validator-error-label")){return}}else{if(c.next().hasClass(".jqx-validator-error-label")){return}}if(c[0].nodeName.toLowerCase()!="input"){if(c.find("input").length>0){if(c.find(".jqx-input").length>0){c.find(".jqx-input").removeClass(g.toThemeProperty("jqx-validator-error-element"))}else{if(c.find(".jqx-text-area").length>0){c.find(".jqx-text-area").removeClass(g.toThemeProperty("jqx-validator-error-element"))}else{if(c.is(".jqx-checkbox")){c.find(".jqx-checkbox-default").removeClass(g.toThemeProperty("jqx-validator-error-element"))}}}if(c.is(".jqx-radiobutton")){c.find(".jqx-radiobutton-default").removeClass(g.toThemeProperty("jqx-validator-error-element"))}else{c.removeClass(g.toThemeProperty("jqx-validator-error-element"))}}else{c.removeClass(g.toThemeProperty("jqx-validator-error-element"))}}else{c.removeClass(g.toThemeProperty("jqx-validator-error-element"))}};if(e){f=e.hint;if(f){if(this.positions){if(this.positions[Math.round(f.offset().top)+"_"+Math.round(f.offset().left)]){this.positions[Math.round(f.offset().top)+"_"+Math.round(f.offset().left)]=null}}if(this.animation==="fade"){f.fadeOut(this.animationDuration,function(){f.remove();d()})}else{f.remove();d()}}e.hint=null}},_handleValidation:function(b,e,d,c){if(!b){this._scrollHandler(e);if(this.focus){d.focus()}this._raiseEvent(0,{invalidInputs:c});if(typeof this.onError==="function"){this.onError(c)}}else{this._raiseEvent(1);if(typeof this.onSuccess==="function"){this.onSuccess()}}},_scrollHandler:function(c){if(this.scroll){var b=this;a("html,body").animate({scrollTop:c},this.scrollDuration,function(){if(typeof b.scrollCallback==="function"){b.scrollCallback.call(b)}})}},_higherPriorityActive:function(d){var e=false,c;for(var b=this.rules.length-1;b>=0;b-=1){c=this.rules[b];if(e&&c.input===d.input&&c.hint){return true}if(c===d){e=true}}return false},_removeLowPriorityHints:function(d){var e=false,c;for(var b=0;b<this.rules.length;b+=1){c=this.rules[b];if(e&&c.input===d.input){this._hideHintByRule(c)}if(c===d){e=true}}},_getHintRuleByInput:function(b){var d;for(var c=0;c<this.rules.length;c+=1){d=this.rules[c];if(a(d.input)[0]===b[0]&&d.hint){return d}}return null},_removeEventListeners:function(){var f,b,e;for(var d=0;d<this.rules.length;d+=1){f=this.rules[d];e=f.action.split(",");b=a(f.input);for(var c=0;c<e.length;c+=1){this.removeHandler(b,a.trim(e[c])+".jqx-validator")}}},_addEventListeners:function(){var f,c;if(this.host.parents(".jqx-window").length>0){var b=this;var g=function(){b.updatePosition()};var e=this.host.parents(".jqx-window");this.addHandler(e,"closed",function(){b.hide()});this.addHandler(e,"moved",g);this.addHandler(e,"moving",g);this.addHandler(e,"resized",g);this.addHandler(e,"resizing",g);this.addHandler(a(document.parentWindow),"scroll",function(){if(b.scroll){g()}})}for(var d=0;d<this.rules.length;d+=1){f=this.rules[d];c=a(f.input);this._addListenerTo(c,f)}},_addListenerTo:function(c,h){var b=this,f=h.action.split(",");var e=false;if(this._isjQWidget(c)){e=true}for(var d=0;d<f.length;d+=1){var g=a.trim(f[d]);if(e&&(g=="blur"||g=="focus")){if(c&&c[0].nodeName.toLowerCase()!="input"){c=c.find("input")}}this.addHandler(c,g+".jqx-validator",function(i){b._validateRule(h)})}},_configureInputs:function(){var b,d;this.rules=this.rules||[];for(var c=0;c<this.rules.length;c+=1){this._handleInput(c)}},_handleInput:function(b){var c=this.rules[b];if(!c.position){c.position=this.position}if(!c.message){c.message="Validation Failed!"}if(!c.action){c.action="blur"}if(!c.hintRender){c.hintRender=this._hintRender}if(!c.rule){c.rule=null}else{this._handleRule(c)}},_handleRule:function(f){var c=f.rule,e,d,b=false;if(typeof c==="string"){if(c.indexOf("=")>=0){c=c.split("=");d=c[1].split(",");c=c[0]}e=this["_"+c];if(e){f.rule=function(g,h){return e.apply(this,[g].concat(d))}}else{b=true}}else{if(typeof c!=="function"){b=true}else{f.rule=c}}if(b){throw new Error("Wrong parameter!")}},_required:function(b){switch(this._getType(b)){case"jqx-input-inner":if(b.find("input").length>0){return a.trim(b.find("input").val())!==""}break;case"textarea":case"password":case"jqx-input":case"jqx-text-area":case"text":var d=a.data(b[0]);if(d.jqxMaskedInput){var e=b.jqxMaskedInput("promptChar"),c=b.jqxMaskedInput("value");return c&&c.indexOf(e)<0}else{if(d.jqxNumberInput){return b.jqxNumberInput("inputValue")!==""}else{if(d.jqxDateTimeInput){return true}else{return a.trim(b.val())!==""}}}case"checkbox":return b.is(":checked");case"radio":return b.is(":checked");case"jqx-check-box":case"jqx-radio-button":return b[0].val();case"jqxCheckBox":