/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxMenu","",{});a.extend(a.jqx._jqxMenu.prototype,{defineInstance:function(){var b={items:new Array(),mode:"horizontal",width:null,height:null,minimizeWidth:"auto",easing:"easeInOutSine",animationShowDuration:200,animationHideDuration:200,autoCloseInterval:0,animationHideDelay:100,animationShowDelay:10,menuElements:new Array(),autoSizeMainItems:false,autoCloseOnClick:true,autoCloseOnMouseLeave:true,enableRoundedCorners:true,disabled:false,autoOpenPopup:true,enableHover:true,autoOpen:true,autoGenerate:true,clickToOpen:false,showTopLevelArrows:false,touchMode:"auto",source:null,popupZIndex:1000,rtl:false,keyboardNavigation:false,lockFocus:false,title:"",events:["shown","closed","itemclick","initialized","open","close"]};if(this===a.jqx._jqxMenu.prototype){return b}a.extend(true,this,b);return b},createInstance:function(c){var b=this;this.host.attr("role","menubar");a.jqx.utilities.resize(this.host,function(){b.refresh()},false,this.mode!="popup");if(this.minimizeWidth!="auto"&&this.minimizeWidth!=null&&this.width&&this.width.toString().indexOf("%")==-1){a(window).resize(function(){b.refresh()})}if(b.isMaterialized()){var g=window.getComputedStyle(this.element);var f=g.getPropertyValue("--jqx-dropdown-animation");if(f){this.animationType=f.trim();if(this.animationType==="transform"){this.animationShowDuration=0;this.animationHideDuration=0;this.animationShowDelay=0}}}this.host.css("outline","none");if(this.source){if(this.source!=null){var d=this.loadItems(this.source);this.element.innerHTML=d}}this._tmpHTML=this.element.innerHTML;if(this.element.innerHTML.indexOf("UL")){var e=this.host.find("ul:first");if(e.length>0){this._createMenu(e[0])}}this.host.data("autoclose",{});this._render();this._setSize();if(a.jqx.browser.msie&&a.jqx.browser.version<8){this.host.attr("hideFocus",true)}},focus:function(){try{if(this.mode==="popup"&&this.keyboardNavigation){var d=this.host.closest("div.jqx-menu-wrapper");d.focus()}if(this.keyboardNavigation){this.host.focus();var c=this;var e=function(){if(!a.jqx.isHidden(a(c.items[0].element))){a(c.items[0].element).addClass(c.toThemeProperty("jqx-fill-state-focus"));c.activeItem=c.items[0]}else{var f=c._nextVisibleItem(c.items[0],0);if(f){a(f.element).addClass(c.toThemeProperty("jqx-fill-state-focus"));c.activeItem=f}}};if(!this.activeItem){e()}else{if(!a.jqx.isHidden(a(this.activeItem.element))){a(this.activeItem.element).addClass(this.toThemeProperty("jqx-fill-state-focus"))}else{a(this.activeItem.element).removeClass(this.toThemeProperty("jqx-fill-state-focus"));e()}}}}catch(b){}},loadItems:function(c,e){if(c==null){return}if(c.length==0){return""}var b=this;this.items=new Array();var d='<ul class="jqx-menu-ul">';if(e){d='<ul class="jqx-menu-ul" style="width:'+e+';">'}a.map(c,function(f){if(f==undefined){return null}d+=b._parseItem(f)});d+="</ul>";return d},_parseItem:function(f){var c="";if(f==undefined){return null}var b=f.label;if(!f.label&&f.html){b=f.html}if(!b){b="Item"}if(typeof f==="string"){b=f}var e=false;if(f.selected!=undefined&&f.selected){e=true}var d=false;if(f.disabled!=undefined&&f.disabled){d=true}c+="<li";if(d){c+=' item-disabled="true" '}if(f.label&&!f.html){c+=' item-label="'+b+'" '}if(f.value!=null){c+=' item-value="'+f.value+'" '}if(f.id!=undefined){c+=' id="'+f.id+'" '}c+=">"+b;if(f.items){if(f.subMenuWidth){c+=this.loadItems(f.items,f.subMenuWidth)}else{c+=this.loadItems(f.items)}}c+="</li>";return c},_setSize:function(){if(this.width!=null&&this.width.toString().indexOf("%")!=-1){this.host.width(this.width)}else{if(this.width!=null&&this.width.toString().indexOf("px")!=-1){this.host.width(this.width)}else{if(this.width!=undefined&&!isNaN(this.width)){this.host.width(this.width)}}}if(this.height!=null&&this.height.toString().indexOf("%")!=-1){this.host.height(this.height)}else{if(this.height!=null&&this.height.toString().indexOf("px")!=-1){this.host.height(this.height)}else{if(this.height!=undefined&&!isNaN(this.height)){this.host.height(this.height)}}}if(this.height===null){this.host.height("auto")}var g=this;if(this.minimizeWidth!=null&&this.mode!="popup"){var f=a(window).width();if(!a.jqx.response){var e=false;if(navigator.userAgent.match(/Windows|Linux|MacOS/)){var b=navigator.userAgent.indexOf("Windows Phone")>=0||navigator.userAgent.indexOf("WPDesktop")>=0||navigator.userAgent.indexOf("IEMobile")>=0||navigator.userAgent.indexOf("ZuneWP7")>=0;if(!b){e=true}}var c=this.minimizeWidth;if(e&&this.minimizeWidth=="auto"){return}}if(this.minimizeWidth=="auto"&&a.jqx.response){var d=new a.jqx.response();if(d.device.type=="Phone"||d.device.type=="Tablet"){if(!this.minimized){this.minimize()}}}else{if((f<c)&&!this.minimized){this.minimize()}else{if(this.minimized&&f>=c){this.restore()}}}}},minimize:function(){if(this.minimized){return}var e=this;this.host.addClass(this.toThemeProperty("jqx-menu-minimized"));this.minimized=true;this._tmpMode=this.mode;this.mode="simple";var h=this.host.closest("div.jqx-menu-wrapper");h.remove();a("#menuWrapper"+this.element.id).remove();a.each(this.items,function(){var k=this;var j=a(k.element);var i=a(k.subMenuElement);var l=i.closest("div.jqx-menu-popup");l.remove()});if(this.source){var d=this.loadItems(this.source);this.element.innerHTML=d;this._tmpHTML=this.element.innerHTML}this.element.innerHTML=this._tmpHTML;if(this.element.innerHTML.indexOf("UL")){var g=this.host.find("ul:first");if(g.length>0){this._createMenu(g[0])}}this._render();var c=this.host.find("ul:first");c.wrap('<div class="jqx-menu-wrapper" style="z-index:'+this.popupZIndex+'; padding: 0px; display: none; margin: 0px; height: auto; width: auto; position: absolute; top: 0; left: 0; display: block; visibility: visible;"></div>');var h=c.closest("div.jqx-menu-wrapper");h[0].id="menuWrapper"+this.element.id;h.detach();h.appendTo(a(document.body));h.addClass(this.toThemeProperty("jqx-widget"));h.addClass(this.toThemeProperty("jqx-menu"));h.addClass(this.toThemeProperty("jqx-menu-minimized"));h.addClass(this.toThemeProperty("jqx-widget-header"));c.children().hide();h.hide();h.find("ul").addClass(this.toThemeProperty("jqx-menu-ul-minimized"));this.minimizedItem=a("<div></div>");this.minimizedItem.addClass(this.toThemeProperty("jqx-item"));this.minimizedItem.addClass(this.toThemeProperty("jqx-menu-item-top"));this.addHandler(h,"keydown",function(i){return e.handleKeyDown(i)});this.minimizedItem.addClass(this.toThemeProperty("jqx-menu-minimized-button"));this.minimizedItem.prependTo(this.host);this.titleElement=a("<div>"+this.title+"</div>");this.titleElement.addClass(this.toThemeProperty("jqx-item"));this.titleElement.addClass(this.toThemeProperty("jqx-menu-title"));this.titleElement.prependTo(this.host);a("<div style='clear:both;'></div>").insertAfter(this.minimizedItem);e.minimizedHidden=true;var b=function(j){e.minimizedHidden=true;e.minimizedItem.show();var i=false;if(e.minimizedItem.css("float")=="right"){i=true}h.animate({left:!i?-h.outerWidth():e.host.coord().left+e.host.width()+h.width(),opacity:0},e.animationHideDuration,function(){h.find("ul:first").children().hide();h.hide()})};var f=function(k){if(e.minimizedHidden){h.find("ul:first").children().show();e.minimizedHidden=false;h.show();h.css("opacity",0);h.css("left",-h.outerWidth());var j=false;var i=h.width();if(e.minimizedItem.css("float")=="right"){h.css("left",e.host.coord().left+e.host.width()+i);j=true}h.css("top",e.host.coord().top+e.host.height());h.animate({left:!j?e.host.coord().left:e.host.coord().left+e.host.width()-i,opacity:0.95},e.animationShowDuration,function(){})}else{b(k)}e._raiseEvent("2",{type:"mouse",item:e.minimizedItem[0],event:k});e._setSize()};this.addHandler(a(window),"orientationchange.jqxmenu"+this.element.id,function(i){setTimeout(function(){if(!e.minimizedHidden){var j=h.width();var k=false;var j=h.width();if(e.minimizedItem.css("float")=="right"){k=true}h.css("top",e.host.coord().top+e.host.height());h.css({left:!k?e.host.coord().left:e.host.coord().left+e.host.width()-j})}},25)});this.addHandler(this.minimizedItem,"click",function(i){f(i)})},restore:function(){if(!this.minimized){return}this.host.find("ul").removeClass(this.toThemeProperty("jqx-menu-ul-minimized"));this.host.removeClass(this.toThemeProperty("jqx-menu-minimized"));this.minimized=false;this.mode=this._tmpMode;if(this.minimizedItem){this.minimizedItem.remove()}var d=a("#menuWrapper"+this.element.id);d.remove();if(this.source){var b=this.loadItems(this.source);this.element.innerHTML=b;this._tmpHTML=b}this.element.innerHTML=this._tmpHTML;if(this.element.innerHTML.indexOf("UL")){var c=this.host.find("ul:first");if(c.length>0){this._createMenu(c[0])}}this._setSize();this._render()},isTouchDevice:function(){if(this._isTouchDevice!=undefined){return this._isTouchDevice}var b=a.jqx.mobile.isTouchDevice();if(this.touchMode==true){b=true}else{if(this.touchMode==false){b=false}}if(b){this.host.addClass(this.toThemeProperty("jqx-touch"));a(".jqx-menu-item").addClass(this.toThemeProperty("jqx-touch"))}this._isTouchDevice=b;return b},refresh:function(b){if(!b){this._setSize()}},resize:function(c,b){this.width=c;this.height=b;this.refresh()},_closeAll:function(f){var d=f!=null?f.data:this;var b=d.items;a.each(b,function(){var e=this;if(e.hasItems==true){if(e.isOpen){d._closeItem(d,e)}}});if(d.mode=="popup"){if(f!=null){var c=d._isRightClick(f);if(!c){d.close()}}}},closeItem:function(e){if(e==null){return false}var b=e;var c=document.getElementById(b);var d=this;a.each(d.items,function(){var f=this;if(f.isOpen==true&&f.element==c){d._closeItem(d,f);if(f.parentId){}}});return true},openItem:function(e){if(e==null){return false}var b=e;var c=document.getElementById(b);var d=this;a.each(d.items,function(){var f=this;if(f.isOpen==false&&f.element==c){d._openItem(d,f);if(f.parentId){d.openItem(f.parentId)}}});return true},_getClosedSubMenuOffset:function(c){var b=a(c.subMenuElement);var f=-b.outerHeight();var e=-b.outerWidth();var d=c.level==0&&this.mode=="horizontal";if(d){e=0}else{f=0}switch(c.openVerticalDirection){case"up":case"center":f=b.outerHeight();break}switch(c.openHorizontalDirection){case this._getDir("left"):if(d){e=0}else{e=b.outerWidth()}break;case"center":if(d){e=0}else{e=b.outerWidth()}break}return{left:e,top:f}},_closeItem:function(l,o,g,c){if(l==null||o==null){return false}var j=a(o.subMenuElement);var b=o.level==0&&this.mode=="horizontal";var f=this._getClosedSubMenuOffset(o);var m=f.top;var e=f.left;var i=a(o.element);var k=j.closest("div.jqx-menu-popup");if(k!=null){k.removeClass("show");var h=l.animationHideDelay;if(c==true){h=0}if(j.data("timer")&&j.data("timer").show!=null){clearTimeout(j.data("timer").show);j.data("timer").show=null}var n=function(){o.isOpen=false;if(b){j.stop().animate({top:m},l.animationHideDuration,function(){a(o.element).removeClass(l.toThemeProperty("jqx-fill-state-pressed"));a(o.element).removeClass(l.toThemeProperty("jqx-menu-item-top-selected"));a(o.element).removeClass(l.toThemeProperty("jqx-rc-b-expanded"));k.removeClass(l.toThemeProperty("jqx-rc-t-expanded"));var p=a(o.arrow);if(p.length>0&&l.showTopLevelArrows){p.removeClass();if(o.openVerticalDirection=="down"){p.addClass(l.toThemeProperty("jqx-menu-item-arrow-down"));p.addClass(l.toThemeProperty("jqx-icon-arrow-down"))}else{p.addClass(l.toThemeProperty("jqx-menu-item-arrow-up"));p.addClass(l.toThemeProperty("jqx-icon-arrow-up"))}}a.jqx.aria(a(o.element),"aria-expanded",false);k.css({display:"none"});if(l.animationHideDuration==0){j.css({top:m})}l._raiseEvent("1",o)})}else{if(!a.jqx.browser.msie){}j.stop().animate({left:e},l.animationHideDuration,function(){if(l.animationHideDuration==0){j.css({left:e})}if(o.level>0){a(o.element).removeClass(l.toThemeProperty("jqx-fill-state-pressed"));a(o.element).removeClass(l.toThemeProperty("jqx-menu-item-selected"));var p=a(o.arrow);if(p.length>0){p.removeClass();if(o.openHorizontalDirection!="left"){p.addClass(l.toThemeProperty("jqx-menu-item-arrow-"+l._getDir("right")));p.addClass(l.toThemeProperty("jqx-icon-arrow-"+l._getDir("right")))}else{p.addClass(l.toThemeProperty("jqx-menu-item-arrow-"+l._getDir("left")));p.addClass(l.toThemeProperty("jqx-icon-arrow-"+l._getDir("left")))}}}else{a(o.element).removeClass(l.toThemeProperty("jqx-fill-state-pressed"));a(o.element).removeClass(l.toThemeProperty("jqx-menu-item-top-selected"));var p=a(o.arrow);if(p.length>0){p.removeClass();if(o.openHorizontalDirection!="left"){p.addClass(l.toThemeProperty("jqx-menu-item-arrow-top-"+l._getDir("right")));p.addClass(l.toThemeProperty("jqx-icon-arrow-"+l._getDir("right")))}else{p.addClass(l.toThemeProperty("jqx-menu-item-arrow-top-"+l._getDir("left")));p.addClass(l.toThemeProperty("jqx-icon-arrow-"+l._getDir("left")))}}}a.jqx.aria(a(o.element),"aria-expanded",false);k.css({display:"none"});l._raiseEvent("1",o)})}};if(h>0){if(j.data("timer")){j.data("timer").hide=setTimeout(function(){n()},h)}}else{n()}if(g!=undefined&&g){var d=j.children();a.each(d,function(){if(l.menuElements[this.id]&&l.menuElements[this.id].isOpen){var p=a(l.menuElements[this.id].subMenuElement);l._closeItem(l,l.menuElements[this.id],true,true)}})}}},getSubItems:function(i,h){if(i==null){return false}var g=this;var c=new Array();if(h!=null){a.extend(c,h)}var d=i;var f=this.menuElements[d];var b=a(f.subMenuElement);var e=b.find(".jqx-menu-item");a.each(e,function(){c[this.id]=g.menuElements[this.id];var j=g.getSubItems(this.id,c);a.extend(c,j)});return c},disable:function(g,d){if(g==null){return}var c=g;var f=this;if(this.menuElements[c]){var e=this.menuElements[c];e.disabled=d;var b=a(e.element);e.element.disabled=d;a.each(b.children(),function(){this.disabled=d});if(d){b.addClass(f.toThemeProperty("jqx-menu-item-disabled"));b.addClass(f.toThemeProperty("jqx-fill-state-dis