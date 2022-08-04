/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxResponsivePanel","",{});a.extend(a.jqx._jqxResponsivePanel.prototype,{defineInstance:function(){var b={width:null,height:null,collapseBreakpoint:1000,collapseWidth:null,toggleButton:null,toggleButtonSize:30,animationType:"fade",animationDirection:"left",animationShowDelay:"fast",animationHideDelay:"fast",autoClose:true,initContent:null,_collapsed:false,_opened:false,_init:false,_ie7:(a.jqx.browser.msie&&a.jqx.browser.version<8),events:["collapse","expand","open","close"]};if(this===a.jqx._jqxResponsivePanel.prototype){return b}a.extend(true,this,b);retu