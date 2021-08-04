/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxForm","",{});a.extend(a.jqx._jqxForm.prototype,{defineInstance:function(){var b={padding:{left:5,top:5,right:5,bottom:5},backgroundColor:"#F5F5F5",borderColor:"#E5E5E5",value:{},template:[{type:"text",label:"TextBox 1"},{type:"text",label:"TextBox 2"},]};a.extend(true,this,b)},createInstance:function(c){var b=this;b._isInitialized=false;var d=b.host;d.addClass(b.toThemeProperty("jqx-widget"));b._renderAndInit();this._setValue(this.value);this._prevValue=this._getValue();b._isInitialized=true},destroy:function(){this._destroyElements();this.host.removeData();this.host.remove();delete this.host;delete this.set;delete this.get;delete this.call;delete this.element},_destroyElements:function(){for(var c=0;c<this.template.length;c++){if(a.isArray(this.template[c].columns)){for(var b=0;b<this.template[c].columns.length;b++){var d=c+"_"+b;this._getComponentById(d).off();this.host.find("#rowWrap_el_"+d).remove()}}this._getComponentById(c).off();this._getComponentLabelById(c).off();this._getComponentLabelById(c).removeData();this.host.find("#rowWrap_el_"+c).remove()}this.host.find("#formWrap").remove()},val:function(b){if(undefined==b){return this._getValue()}else{this._setValue(b)}},_onChangeHandler:function(f){if(!this.isInitialized||this._suppressEvents){return}var c=this._getValue();if(this._prevValue&&JSON.stringify(c)==JSON.stringify(this._prevValue)){return}var d=new a.Event("formDataChange");d.args={value:c,previousValue:this._prevValue};d.owner=this;var b=this.host.trigger(d);if(d.cancel){this._setValue(this._prevValue)}else{this._prevValue=c}return b},_onButtonClick:function(c,d){if(!this.isInitialized){return}var e=new a.Event("buttonClick");e.args={name:d.name,text:c.val()};e.owner=this;var b=this.host.trigger(e);return b},submit:function(f,k,b){var l=this;var d=l._getValue(true);var h="<form id='jqx_fromToSubmit'";if(f){h+=' action="'+f+'"'}if(k){h+=' target="'+k+'"'}if(b&&b.toString().toLowerCase()==="get"){h+=' method="GET"'}else{h+=' method="POST"'}h+=">";for(var g=0;g<d.length;g++){var e=d[g].value;var j=d[g].tool;var c=j.name;if(c==undefined){c=j.id}if(c==undefined){c=j.bind}if(j.type=="button"||j.type=="label"){if(!j.submit||j.submit==false){continue}}if(j.submit==false){continue}if(c!==undefined){h+='<input type="hidden" ';h+=' name="'+c+'"';h+=' value="'+e+'"';h+=">"}}h+="</form>";l.host.find("#formSubmit").html(h);l.host.find("#jqx_fromToSubmit").submit()},_getValue:function(c){var e={};var d=[];for(var h=0;h<this.template.length;h++){var k=this.template[h];var l="el_"+this.element.id+h;if(a.isArray(k.columns)){for(var g=0;g<k.columns.length;g++){var f=k.columns[g];var p=l+"."+g;if(f.type=="option"&&f.component!="jqxDropDownList"){var o=this._radioGroupGetValue(f,p);if(f.bind==undefined){}else{this._setObjectProperty(e,f.bind,o)}if(c){d.push({tool:f,value:o})}continue}var b=this._getComponentById(h+"_"+g);var n=b.val();if(n===undefined){n=null}if(f.bind==undefined){}else{this._setObjectProperty(e,f.bind,n)}if(c){d.push({tool:f,value:n})}}continue}if(k.type=="option"&&k.component!="jqxDropDownList"){var o=this._radioGroupGetValue(k,l);if(k.bind==undefined){}else{this._setObjectProperty(e,k.bind,o)}if(c){d.push({tool:k,value:o})}continue}var m=this._getComponentById(h);var n=m.val();if(n===undefined){n=null}if(k.bind==undefined){}else{this._setObjectProperty(e,k.bind,n)}if(c){d.push({tool:k,value:n})}}if(c){return d}return a.extend({},this._prevValue,e)},_getObjectProperty:function(f,d){if(typeof(f)!=="object"||f===undefined||d===undefined||d==""){return f}var e=d.split(".");var g=f;for(var c=0;c<e.length;c++){g=g[e[c]]}return g},_setObjectProperty:function(g,d,e){if(undefined===g){return}if(undefined==d||d==""){g=e;return}var f=d.split(".");var c=0;while(c<f.length-1){if(undefined==g[f[c]]){g[f[c]]={}}c++}g[f[c]]=e},_setValue:function(c){this._suppressEvents=true;for(var g=0;g<this.template.length;g++){var h=this.template[g];var k="el_"+this.element.id+g;var d=undefined;if(a.isArray(h.columns)){for(var f=0;f<h.columns.length;f++){var e=h.columns[f];var m=k+"."+f;if(!e.bind){continue}d=this._getObjectProperty(c,e.bind);if(e.type=="option"&&e.component!="jqxDropDownList"){this._radioGroupSetValue(e,m,d);continue}var b=this._getComponentById(g+"_"+f);if(c!==undefined){b.val(d)}}continue}if(!h.bind){continue}d=this._getObjectProperty(c,h.bind);if(h.type=="option"&&h.component!="jqxDropDownList"){this._radioGroupSetValue(h,k,d);continue}var l=this._getComponentById(g);if(h.type=="label"){l.html(d);continue}if(c!==undefined){l.val(d)}}this._prevValue=c;this._suppressEvents=false},_radioGroupGetValue:function(b,f){for(var c=0;c<b.options.length;c++){var e=f+"_option_"+c;var d=this.host.find("#"+e);if(d.length>0){var g=d.jqxRadioButton("val");if(g==true){if(b.options[c].value!==undefined){return b.options[c].value}return b.options[c].label}}}return undefined},_radioGroupSetValue:function(b,f,g){for(var c=0;c<b.options.length;c++){if(b.options[c].value!==undefined){if(g!==b.options[c].value){continue}}else{if(g!==b.options[c].label){continue}}var e=f+"_option_"+c;var d=this.host.find("#"+e);if(d.length>0){d.jqxRadioButton("val",true)}}},_getToolStyle:function(b){var c="display: block;";