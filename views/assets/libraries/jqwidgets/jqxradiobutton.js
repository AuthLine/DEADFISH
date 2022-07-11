/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxRadioButton","",{});a.extend(a.jqx._jqxRadioButton.prototype,{defineInstance:function(){var b={animationShowDelay:300,animationHideDelay:300,width:null,height:null,boxSize:"16px",checked:false,hasThreeStates:false,disabled:false,enableContainerClick:true,locked:false,groupName:"",rtl:false,changeType:null,_canFocus:true,aria:{"aria-checked":{name:"checked",type:"boolean"},"aria-disabled":{name:"disabled",type:"boolean"}},events:["checked","unchecked","indeterminate","change"]};if(this===a.jqx._jqxRadioButton.prototype){return b}a.extend(true,this,b);return b},createInstance:function(b){var c=this;c._createFromInput("RadioButton");c.render()},_createFromInput:function(c){var j=this;if(j.element.nodeName.toLowerCase()=="input"){j.field=j.element;if(j.field.className){j._className=j.field.className}var l={title:j.field.title};if(j.field.value){l.value=j.field.value}if(j.field.checked){l.checked=true}if(j.field.id.length){l.id=j.field.id.replace(/[^\w]/g,"_")+"_"+c}else{l.id=a.jqx.utilities.createId()+"_"+c}var e=j.element.nextSibling;var h=false;if(e&&(e.nodeNam