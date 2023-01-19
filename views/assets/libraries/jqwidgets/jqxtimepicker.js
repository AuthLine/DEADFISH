/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxTimePicker","",{});a.extend(a.jqx._jqxTimePicker.prototype,{defineInstance:function(){var b={autoSwitchToMinutes:false,footer:false,footerTemplate:null,format:"12-hour",minuteInterval:1,selection:"hour",value:new Date(),view:"portrait",width:500,height:500,animation:true,disabled:false,readonly:false,unfocusable:false,name:"",_events:["change"]};if(this===a.jqx._jqxTimePicker.prototype){return b}a.extend(true,this,b);return b},createInstance:function(){var b=this;b._createTimePicker()},_createTimePicker:function(){this.widgetID=this.element.id;var c=this;var b='<div class="'+c.toThemeProperty("jqx-container jqx-rc-all jqx-widget")+'"><div class="'+c.toThemeProperty("jqx-header jqx-unselectable jqx-widget-header")+'"><div class="'+c.toThemeProperty("jqx-hour-minute-container")+'"><div class ="'+c.toThemePro