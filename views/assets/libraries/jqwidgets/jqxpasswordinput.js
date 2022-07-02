/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxPasswordInput","",{});a.extend(a.jqx._jqxPasswordInput.prototype,{defineInstance:function(){var b={width:null,height:null,disabled:false,rtl:false,placeHolder:null,showStrength:false,showStrengthPosition:"right",maxLength:null,minLength:null,showPasswordIcon:true,strengthTypeRenderer:null,passwordStrength:null,changeType:null,hint:true,localization:{passwordStrengthString:"Password strength",tooShort:"Too short",weak:"Weak",fair:"Fair",good:"Good",strong:"Strong",showPasswordString:"Show Password"},strengthColors:{tooShort:"rgb(170, 0, 51)",weak:"rgb(170, 0, 51)",fair:"rgb(255, 204, 51)",good:"rgb(45, 152, 243)",strong:"rgb(118, 194, 97)"}};if(this===a.jqx._jqxPasswordInput.prototype){return b}a.extend(true,this,b);return b},createInstance:function(){var b=this;b._inDOM=document.body.contains(b.element);b.render()},render:function(){var e=this;var d=a.jqx.browser.browser;var g=a.jqx.browser.version;this._browserCheck=d!="msie"||(g!="7.0"&&g!="8.0");this.widgetID=e.element.id;var b="Invalid input type. Please set the type attribute of the input element to password.";if(this.element.getAttribute("type")!="password"){throw b}this.input=this.element;if(e.isMaterialized()){var j=a("<div></div>");j.addClass(e.toThemeProperty("jqx-input-group"));this.host.after(j);var i=this.element;var c=this.host.data();j.append(i);var h=a("<label></label");if(this.hint){h[0].innerHTML=this.placeHolder}h.addClass(e.toThemeProperty("jqx-input-label"));j.append(h);var f=a("<span></span>");j.append(f);f.addClass(e.toThemeProperty("jqx-input-bar"));j[0].id=this.element.id;this.element.removeAttribute("id");j[0].style.cssText=this.element.style.cssText;e.input=e.element;this.element.style.cssText="";this.bar=f;this.label=h;this.host=j;this.element=j[0];this.host.data(c);var e=this;if(e.template){e.bar.addClass(e.toThemeProperty("jqx-"+e.template));e.label.addClass(e.toThemeProperty("jqx-"+e.template))}}e._hidden=true;e._setTheme();e._setAttributes();e._showPassword();e._showStrength();a.jqx.utilities.resize(this.host,function(){if(!e._inDOM){var k=e.element.parentNode;if(e.element.nextSibling){k.insertBefore(e.icon,e.element.nextSibling)}else{k.appendChild(e.icon)}e._inDOM=true;return}if(e.element===document.activeElement||e.isMaterialized()){e._positionIcon();if(e.showStrength){e.host.jqxTooltip("close")}}})},refresh:function(c){var b=this;if(c){return}b.removeHandler(b.host,"change.passwordinput"+b.widgetID);b.removeHandler(b.host,"focus.passwordinput"+b.widgetID);b.removeHandler(b.host,"blur.passwordinput"+b.widgetID);b.removeHandler(b.host,"click.passwordinput"+b.widgetID);b.removeHandler(b.host,"keyup.passwordinput"+b.widgetID);b.removeHandler(b.icon,"mousedown.passwordinput"+b.widgetID);b.removeHandler(a(document),"mouseup.passwordinput"+b.widgetID);b.removeHandler(a(document),"mousedown.passwordinput"+b.widgetID);b._setAttributes();b._setTheme();b._showPassword();b._showStrength()},val:function(d){var c=this,e=c.input.value,b="placeholder" in c.input;if(a.isEmptyObject(d)&&d!==""){if(!b&&e===c.placeHolder){e=""}return e}else{if(b&&d===e){return}if(!b){if(d===""){if(e!==c.placeHolder){c.input.value=c.placeHolder;c.input.setAttribute("type","text")}return}else{c.input.setAttribute("type","password")}}c.input.value=d;if(b&&c.isMaterialized()){c._refreshPlaceHolder()}if(c.showStrength===true){c._evaluateStrength()}}},propertyChangedHandler:function(b,c,e,d){if(c==="theme"){a.jqx.utilities.setTheme(e,d,b.host);return}if(c=="disabled"){if(b.disabled){b.element.setAttribute("disabled","disabled");b.element.className+=" "+b.toThemeProperty("jqx-fill-state-disabled")}else{b.host.removeAttr("disabled");b.host.removeClass(b.toThemeProperty("jqx-fill-state-disabled"))}return}if(c=="placeHolder"){i