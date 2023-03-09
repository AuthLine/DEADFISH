/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxValidator","",{});a.extend(a.jqx._jqxValidator.prototype,{defineInstance:function(){var b={rules:null,scroll:true,focus:true,scrollDuration:300,scrollCallback:null,position:"right",arrow:true,animation:"fade",animationDuration:150,closeOnClick:true,onError:null,onSuccess:null,ownerElement:null,_events:["validationError","validationSuccess"],hintPositionOffset:5,_inputHint:[],rtl:false,hintType:"tooltip"};if(this===a.jqx._jqxValidator.prototype){return b}a.extend(true,this,b);return b},createInstance:function(){if(this.hintType=="label"&&this.animationDuration==150){this.animationDuration=0}this._configureInputs();this._removeEventListeners();this._addEventListeners()},destroy:function(){this._removeEventListeners();this.hide()},validate:function(q){var b=true,p,f=Infinity,j,h,c,k=[],o;this.updatePosition();var l=this;var d=0;for(var g=0;g<this.rules.length;g+=1){if(typeof this.rules[g].rule==="function"){d++}}this.positions=new Array();for(var g=0;g<this.rules.length;g+=1){var n=a(this.rules[g].input);if(typeof this.rules[g].rule==="function"){var m=function(s,r){p=s;if(false==p){b=false;var i=a(r.input);c=a(r.input);k.push(c);var t=c.offset();if(t){j=t.top;if(f>j){f=j;h=c}}}d--;if(d==0){if(typeof q==="function"){l._handleValidation(b,f,h,k);if(q){q(b)}}}};this._validateRule(this.rules[g],m)}else{p=this._validateRule(this.rules[g])}if(false==p){b=false;c=a(this.rules[g].input);k.push(c);var e=c.offset();if(e){j=e.top;if(f>j){f=j;h=c}}}}if(d==0){this._handleValidation(b,f,h,k);return b}else{return undefined}},validateInput:function(b){var e=this._getRulesForInput(b),d=true;for(var c=0;c<e.length;c+=1){if(!this._validateRule(e[c])){d=false}}return d},hideHint:function(b){var d=this._getRulesForInput(b);for(var c=0;c<d.length;c+=1){this._hideHintByRule(d[c])}},hide:function(){var c;for(var b=0;b<this.rules.length;b+=1){c=this.rules[b];this._hideHintByRule(this.rules[b])}},updatePosition:function(){var c;this.positions=new Array();for(var b=0;b<this.rules.length;b+=1){c=this.rules[b];if(c.hint){this._hintLayout(c.hint,a(c.input),c.position,c)}}},_getRulesForInput:function(b){var d=[];for(var c=0;c<this.rules.length;c+=1){if(this.rules[c].input===b){d.push(this.rules[c])}}return d},_validateRule:function(f,i){var b=a(f.input),h,e=true;var d=this;var g=function(k){if(!k){var j=d.animation;d.animation=null;if(f.hint){d._hideHintByRule(f)}if(a(b).css("display")=="none"){d._hideHintByRule(f);return}if(a(b).parents().length==0){d._hideHintByRule(f);return}h=f.hintRender.apply(d,[f.message,b]);d._hintLayout(h,b,f.position,f);d._showHint(h);f.hint=h;d._removeLowPriorityHints(f);if(i){i(false,f)}d.animation=j}else{d._hideHintByRule(f);if(i){i(true,f)}}};var c=false;if(typeof f.rule==="function"){c=f.rule.call(this,b,g);if(c==true&&i){i(true,f)}}if(typeof f.rule==="function"&&c==false){if(typeof f.hintRender==="function"&&!f.hint&&!this._higherPriorityActive(f)&&b.is(":visible")){h=f.hintRender.apply(this,[f.message,b]);this._removeLowPriorityHints(f);this._hintLayout(h,b,f.position,f);this._showHint(h);f.hint=h}e=false;if(i){i(false,f)}}else{this._hideHintByRule