/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxForm","",{});a.extend(a.jqx._jqxForm.prototype,{defineInstance:function(){var b={padding:{left:5,top:5,right:5,bottom:5},backgroundColor:"#F5F5F5",borderColor:"#E5E5E5",value:{},template:[{type:"text",label:"TextBox 1"},{type:"text",label:"TextBox 2"},]};a.extend(true,this,b)},createInstance:function(c){var b=this;b._isInitialized=false;var d=b.host;d.addClass(b.toThemeProperty("jqx-widget"));b._renderAndInit();this._setValue(this.value);this._prevValue=this._getValue();b._isInitialized=true