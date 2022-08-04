/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxResponsivePanel","",{});a.extend(a.jqx._jqxResponsivePanel.prototype,{defineInstance:function(){var b={width:null,height:null,collapseBreakpoint:1000,collapseWidth:null,toggleButton:null,toggleButtonSize:30,animationType:"fade",animationDirection:"left",animationShowDelay:"fast",animationHideDelay:"fast",autoClose:true,initContent:null,_collapsed:false,_opened:false,_init:false,_ie7:(a.jqx.browser.msie&&a.jqx.browser.version<8),events:["collapse","expand","open","close"]};if(this===a.jqx._jqxResponsivePanel.prototype){return b}a.extend(true,this,b);return b},createInstance:function(){var b=this;if(b.initContent&&b._init===false){b.initContent();b._init=true}b._render(true)},_render:function(c){var d=this;if(c===true&&d.toggleButton){d._toggleButton=a(d.toggleButton);if(d._toggleButton.length===0){throw new Error('jqxResponsivePanel: Invalid toggleButton selector: "'+d.toggleButton+'".')}var b=a('<div class="'+d.toThemeProperty("jqx-menu-minimized-button")+" "+d.toThemeProperty("jqx-responsive-panel-button-inner")+'"></div>');d._toggleButton.append(b)}d._setSize();d._addClasses();if(c===false){d._removeHandlers()}d._addHandlers();d._checkWindowSize()},render:function(){this._render(false)},refresh:function(b){if(b!==true){this._checkWindowSize()}},destroy:function(b){var c=this;c._removeHandlers();c.host.remove();if(b!==true&&c.toggleButton){c._toggleButton.remove()}},propertyChangedHandler:function(b,c,e,d){if(d!==e&&c!=="toggleButton"&&c!=="initContent"){switch(c){case"width":case"height":b.host.css(c,d);break;case"collapseBreakpoint":b._checkWindowSize();break;case"toggleButtonSize":if(b.toggleButton){b._toggleButton.css({width:d,height:d})}break;default:b.render()}}},open:function(){var b=this;if(b._collapsed===true&&b._opened===false){function d(){b.host.show();b._opened=true;b._raiseEvent("2");if(b.initContent&&b._init===false){b.initContent();b._init=true}}if(b._ie7===true){d();return}switch(b.animationType){case"fade":b.host.fadeIn(b.animationShowDelay,function(){b._raiseEvent("2");b._opened=true;if(b.initContent&&b._init===false){b.initContent();b._init=true}});break;case"slide":var c=b.animationDirection;if(c==="top"){c="up"}else{if(c==="bottom"){c="down"}}b._slide(b.host,{mode:"show",direction:c,duration:b.animationShowDelay});break;case"none":d();break}}},close:function(){var b=this;if(b._collapsed===true&&b._opened===true){if(b._ie7===true){b.host.hide();b._opened=false;b._raiseEvent("3");return}switch(b.animationType){case"fade":b.host.fadeOut(b.animationHideDelay,function(){b._opened=false;b._raiseEvent("3")});break;case"slide":var c=b.animationDirection;if(c==="top"){c="up"}else{if(c==="bottom"){c="down"}}b._slide(b.host,{mode:"hide",direction:c,duration:b.animationHideDelay});break;case"none":b.host.hide();b._opened=false;b._raiseEvent("3");break}}},_raiseEvent:function(f,c){if(c===undefined){c={owner:null}}var d=this.events[f];c.owner=this;var e=new a.Event(d);e.owner=this;e.args=c;if(e.preventDefault){e.preventDefault()}var b=this.host.trigger(e);return b},_setSize:function(){var b=this;b.host.css("width",b.width);b.host.css("height",b.height);if(b.toggleButton){b._toggleButton.css({width:b.toggleButtonSize,height:b.toggleButtonSize})}},_addClasses:function(){var b=this;b.host.addClass(b.toThemeProperty("jqx-responsive-panel"));b.host.addClass(b.toThemeProperty("jqx-widget"));b.host.addClass(b.toThemeProperty("jqx-widget-content"));b.host.addClass(b.toThemeProperty("jqx-rc-all"));if(b.toggleButton){b._toggleButton.addClass(b.toThemeProperty("jqx-responsive-panel-button"));b._toggleButton.addClass(b.toThemeProperty("jqx-fill-state-normal"));b._toggleButton.addClass(b.toThemeProperty("jqx-rc-all"))}},isCollapsed:function(){return this._collapsed},isOpened:function(){return this._opened},_addHandlers:function(){var b=this,c=b.element.id;b.addHandler(b.host,"click.jqxResponsivePanel"+c,function(d){d.stopPropagation()});b.addHandler(a(document),"click.jqxResponsivePanel"+c,function(){if(b._collapsed===true&&b.autoClose===true){b.close()}});b.addHandler(a(window),"resize.jqxResponsivePanel"+c,function(){setTimeout(function(){b._checkWindowSize()},0)});if(b.toggleButton){b.addHandler(b._toggleButton,"mouseenter.jqxResponsivePanel"+c,function(){b._toggleButton.addClass(b.toThemeProperty("jqx-fill-state-hover"))});b.addHandler(b._toggleButton,"mouseleave.jqxResponsivePanel"+c,function(){b._toggleButton.removeClass(b.toThemeProperty("jqx-fill-state-hover"))});b.addHandler(b._toggleButton,"mousedown.jqxResponsivePanel"+c,function(){b._toggleButton.addClass(b.toThemeProperty("jqx-fill-state-pressed"))});b.addHandler(a(document),"mouseup.jqxResponsivePanel"+c,function(){b._toggleButton.removeClass(b.toThemeProperty("jqx-fill-state-pressed"))});b.addHandler(b._toggleButton,"click.jqxResponsivePanel"+c,function(d){d.stopPropagation();if(b._opened===true){b.close()}else{b.open()}})}},_removeHandlers:function(){var b=this,c=b.element.id;b.removeHandler(b.host,"click.jqxResponsivePanel"+c);b.removeHandler(a(document),"click.jqxResponsivePanel"+c);b.removeHandler(a(window),"resize.jqxResponsivePanel"+c);if(b.toggleButton){b.removeHandler(b._toggleButton,"mouseenter.jqxResponsivePanel"+c);b.removeHandler(b._toggleButton,"mouseleave.jq