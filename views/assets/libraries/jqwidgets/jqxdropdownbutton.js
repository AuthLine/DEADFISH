/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxDropDownButton","",{});a.extend(a.jqx._jqxDropDownButton.prototype,{defineInstance:function(){var b={disabled:false,width:null,height:null,arrowSize:17,enableHover:true,openDelay:250,closeDelay:300,animationType:"default",placeHolder:"",enableBrowserBoundsDetection:false,dropDownHorizontalAlignment:"left",dropDownVerticalAlignment:"bottom",popupZIndex:1500,dropDownContainer:"default",autoOpen:false,rtl:false,initContent:null,dropDownWidth:null,dropDownHeight:null,focusable:true,template:"default",touchMode:false,hint:true,aria:{"aria-disabled":{name:"disabled",type:"boolean"}},events:["open","close","opening","closing"]};if(this===a.jqx._jqxDropDownButton.prototype){return b}a.extend(true,this,b);return b},createInstance:function(k){var h=this;if(!h.width){h.width=200}if(!h.height){h.height=25}h.isanimating=false;var c=a("<div style='background-color: transparent; -webkit-appearance: none; outline: none; width:100%; height: 100%; padding: 0px; margin: 0px; border: 0px; position: relative;'><div id='dropDownButtonWrapper' style='outline: none; background-color: transparent; border: none; f