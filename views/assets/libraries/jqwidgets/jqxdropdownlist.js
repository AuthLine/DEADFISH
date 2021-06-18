/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxDropDownList","",{});a.extend(a.jqx._jqxDropDownList.prototype,{defineInstance:function(){var b={disabled:false,width:null,height:null,items:new Array(),selectedIndex:-1,source:null,scrollBarSize:15,arrowSize:17,enableHover:true,enableSelection:true,autoItemsHeight:false,visualItems:new Array(),groups:new Array(),equalItemsWidth:true,itemHeight:-1,visibleItems:new Array(),emptyGroupText:"Group",checkboxes:false,openDelay:250,closeDelay:300,dropDownContainer:"default",animationType:"default",autoOpen:false,dropDownWidth:"auto",dropDownHeight:"200px",autoDropDownHeight:false,keyboardSelection:true,enableBrowserBoundsDetection:false,dropDownHorizontalAlignment:"left",dropDownVerticalAlignment:"bottom",displayMember:"",valueMember:"",groupMember:"",searchMember:"",searchMode:"startswithignorecase",incrementalSearch:true,incrementalSearchDelay:700,renderer:null,placeHolder:"",promptText:"Please Choose:",emptyString:"",rtl:false,selectionRenderer:null,listBox:null,popupZIndex:2000,renderMode:"default",touchMode:"auto",_checkForHiddenParent:true,autoBind:true,ready:null,focusable:true,filterable:false,filterHeight:27,filterPlaceHolder:"Looking for",filterDelay:100,hint:true,template:"default",aria:{"aria-disabled":{name:"disabled",type:"boolean"}},events:["open","close","select","unselect","change","checkChange","bindingComplete","itemAdd","itemRemove","itemUpdate"]};if(this===a.jqx._jqxDropDownList.prototype){return b}a.extend(true,this,b);return b},createInstance:function(b){var d=this;if(d.isMaterialized()){var f=window.getComputedStyle(this.element);var e=f.getPropertyValue("--jqx-dropdown-animation");var c=f.getPropertyValue("--jqx-list-item-height");if(e&&this.animationType=="default"){this.animationType=e.trim()}if(c&&this.itemHeight===-1){this.itemHeight=parseInt(c)}}this.render()},render:function(){var o=this;if(!o.width){o.width=200}if(!o.height){o.height=25}o.host.addClass(o.toThemeProperty("jqx-dropdownlist"));var b=o.element.nodeName.toLowerCase();if(b=="select"||b=="ul"||b=="ol"){o.field=o.element;if(o.field.className){o._className=o.field.className}var h={title:o.field.title};if(o.field.id.length){h.id=o.field.id.replace(/[^\w]/g,"_")+"_jqxDropDownList"}else{h.id=a.jqx.utilities.createId()+"_jqxDropDownList"}var f=a("<div></div>",h);if(!o.width){o.width=a(o.field).width()}if(!o.height){o.height=a(o.field).outerHeight()}f[0].style.cssText=o.field.style.cssText;a(o.field).hide().after(f);var u=o.host.data();o.host=f;o.host.data(u);o.element=f[0];o.element.id=o.field.id;o.field.id=h.id;if(o._className){o.host.addClass(o._className);a(o.field).removeClass(o._className)}if(o.field.tabIndex){var d=o.field.tabIndex;o.field.tabIndex=-1;o.element.tabIndex=d}var k=a.jqx.parseSourceTag(o.field);o.source=k.items;if(o.selectedIndex==-1){o.selectedIndex=k.index}}else{if(o.host.find("li").length>0||o.host.find("option").length>0){var k=a.jqx.parseSourceTag(o.element);o.source=k.items}}o.element.innerHTML="";o.isanimating=false;o.id=o.element.id||a.jqx.utilities.createId();o.host.attr("role","combobox");a.jqx.aria(o,"aria-autocomplete","both");a.jqx.aria(o,"aria-readonly",false);var m="<div style='background-color: transparent; -webkit-appearance: none; outline: none; width:100%; height: 100%; padding: 0px; margin: 0px; border: 0px; position: relative;'><div id='dropdownlistWrapper' style='overflow: hidden; outline: none; background-color: transparent; border: none; float: left; width:100%; height: 100%; position: relative;'><div id='dropdownlistContent' unselectable='on' style='outline: none; background-color: transparent; border: none; float: left; position: relative;'></div><div id='dropdownlistArrow' unselectable='on' style='background-color: transparent; border: none; float: right; position: relative;'><div unselectable='on'></div></div></div></div>";if(a.jqx._jqxListBox==null||a.jqx._jqxListBox==undefined){throw new Error("jqxDropDownList: Missing reference to jqxlistbox.js.")}if(o.host.attr("tabindex")){}else{o.host.attr("tabindex",0)}var t=o;o.touch=a.jqx.mobile.isTouchDevice();o.comboStructure=m;o.element.innerHTML=m;o.dropdownlistWrapper=a(o.element.firstChild.firstChild);o.dropdownlistArrow=a(o.dropdownlistWrapper[0].firstChild.nextSibling);o.arrow=a(o.dropdownlistArrow[0].firstChild);o.dropdownlistContent=a(o.dropdownlistWrapper[0].firstChild);o.dropdownlistContent.addClass(o.toThemeProperty("jqx-dropdownlist-content jqx-disableselect"));if(o.rtl){o.dropdownlistContent.addClass(o.toThemeProperty("jqx-rtl jqx-dropdownlist-content-rtl"))}o.addHandler(o.dropdownlistWrapper,"selectstart",function(){return false});o.dropdownlistWrapper[0].id="dropdownlistWrapper"+o.element.id;o.dropdownlistArrow[0].id="dropdownlistArrow"+o.element.id;o.dropdownlistContent[0].id="dropdownlistContent"+o.element.id;o._addInput();var j=a("<label></label");if(this.hint){j[0].innerHTML=this.placeHolder}j.addClass(o.toThemeProperty("jqx-input-label"));o.dropdownlistWrapper.append(j);o.label=j;var r=a("<span></span>");o.dropdownlistWrapper.append(r);r.addClass(o.toThemeProperty("jqx-input-bar"));o.bar=r;o.bar.css("top",this.host.height());var i=this;if(i.template){i.bar.addClass(i.toThemeProperty("jqx-"+i.template));i.label.addClass(i.toThemeProperty("jqx-"+i.template))}if(o.promptText!="Please Choose:"){o.placeHolder=o.promptText}var c=o.toThemeProperty("jqx-widget")+" "+o.toThemeProperty("jqx-dropdownlist-state-normal")+" "+o.toThemeProperty("jqx-rc-all")+" "+o.toThemeProperty("jqx-fill-state-normal");o.element.className+=" "+c;o._firstDiv=a(o.element.firstChild);try{var q="listBox"+o.id;var g=a(a.find("#"+q));if(g.length>0){g.remove()}a.jqx.aria(o,"aria-owns",q);a.jqx.aria(o,"aria-haspopup",true);var l=a("<div style='overflow: hidden; background-color: transparent; border: none; position: absolute;' id='listBox"+o.id+"'><div id='innerListBox"+o.id+"'></div></div>");l.hide();l.addClass(o.toThemeProperty("jqx-listbox-container"));if(o.dropDownContainer=="element"){l.appendTo(o.host)}else{l.appendTo(document.body)}o.container=l;o.listBoxContainer=a(a.find("#innerListBox"+o.id));var p=o.width;if(o.dropDownWidth!="auto"){p=o.dropDownWidth}if(p==null){p=o.host.width();if(p==0){p=o.dropDownWidth}}if(o.dropDownHeight==null){o.dropDownHeight=200}var t=o;o.container.width(parseInt(p)+25);o.container.height(parseInt(o.dropDownHeight)+25);o._ready=false;o.addHandler(o.listBoxContainer,"bindingComplete",function(e){if(!o.listBox){o.listBox=a.data(o.listBoxContainer[0],"jqxListBox").instance}if(o.selectedIndex!=o.listBoxContainer.jqxListBox("selectedIndex")){o.listBox=a.data(o.listBoxContainer[0],"jqxListBox").instance;o.listBoxContainer.jqxListBox({selectedIndex:o.selectedIndex});o.renderSelection("mouse")}else{o.renderSelection("mouse")}if(!o._ready){if(o.ready){o.ready()}o._ready=true}o._raiseEvent("6")});o.addHandler(o.listBoxContainer,"itemAdd",function(e){o._raiseEvent("7",e.args)});o.addHandler(o.listBoxContainer,"itemRemove",function(e){o._raiseEvent("8",e.args)});o.addHandler(o.listBoxContainer,"itemUpdate",function(e){o._raiseEvent("9",e.args)});o.listBoxContainer.jqxListBox({filterHeight:o.filterHeight,filterPlaceHolder:o.filterPlaceHolder,filterDelay:o.filterDelay,autoItemsHeight:o.autoItemsHeight,filterable:o.filterable,allowDrop:false,allowDrag:false,autoBind:o.autoBind,_checkForHiddenParent:false,focusable:o.focusable,touchMode:o.touchMode,checkboxes:o.checkboxes,rtl:o.rtl,_renderOnDemand:true,emptyString:o.emptyString,itemHeight:o.itemHeight,width:p,searchMode:o.searchMode,incrementalSearch:o.incrementalSearch,incrementalSearchDelay:o.incrementalSearchDelay,groupMember:o.groupMember,searchMember:o.searchMember,displayMember:o.displayMember,valueMember:o.valueMember,height:o.dropDownHeight,autoHeight:o.autoDropDownHeight,scrollBarSize:o.scrollBarSize,selectedIndex:o.selectedIndex,source:o.source,theme:o.theme,rendered:function(){if(o.selectedIndex!=o.listBoxContainer.jqxListBox("selectedIndex")){o.listBox=a.data(o.listBoxContainer[0],"jqxListBox").instance;o.listBoxContainer.jqxListBox({selectedIndex:o.selectedIndex});o.renderSelection("mouse")}else{o.renderSelection("mouse")}},renderer:o.renderer,filterChange:function(e){if(o.autoDropDownHeight){o.container.height(o.listBoxContainer.height()+25)}}});if(o.dropDownContainer==="element"){o.listBoxContainer.css({position:"absolute",top:0,left:0})}else{o.listBoxContainer.css({position:"absolute",zIndex:o.popupZIndex,top:0,left:0})}if(o.template){o.listBoxContainer.addClass(o.toThemeProperty("jqx-"+o.template+"-item"))}o.listBox=a.data(o.listBoxContainer[0],"jqxListBox").instance;o.listBox.enableSelection=o.enableSelection;o.listBox.enableHover=o.enableHover;o.listBox.equalItemsWidth=o.equalItemsWidth;o.listBox.selectIndex(o.selectedIndex);o.listBox._arrange();o.listBoxContainer.addClass(o.toThemeProperty("jqx-popup"));if(a.jqx.browser.msie){o.listBoxContainer.addClass(o.toThemeProperty("jqx-noshadow"))}o.addHandler(o.listBoxContainer,"unselect",function(e){o._raiseEvent("3",{index:e.args.index,type:e.args.type,item:e.args.item})});o.addHandler(o.listBoxContainer,"change",function(e){if(e.args){if(e.args.type!="keyboard"){o._raiseEvent("4",{index:e.args.index,type:e.args.type,item:e.args.item})}else{if(e.args.type=="keyboard"){if(!o.isOpened()){o._raiseEvent("4",{index:o.selectedIndex,type:"keyboard",item:o.getItem(o.selectedIndex)})}}}}});if(o.animationType=="none"){o.container.css("display","none")}else{o.container.hide()}}catch(s){if(console){console.log(s)}}var o=o;o.propertyChangeMap.disabled=function(e,w,v,x){if(x){e.host.addClass(o.toThemeProperty("jqx-dropdownlist-state-disabled"));e.host.addClass(o.toThemeProperty("jqx-fill-state-disabled"));e.dropdownlistContent.addClass(o.toThemeProperty("jqx-dropdownlist-content-disabled"))}else{e.host.removeClass(o.toThemeProperty("jqx-dropdownlist-state-disabled"));e.host.removeClass(o.toThemeProperty("jqx-fill-state-disabled"));e.dropdownlistContent.removeClass(o.toThemeProperty("jqx-dropdownlist-content-disabled"))}a.jqx.aria(e,"aria-disabled",e.disabled)};if(o.disabled){o.host.addClass(o.toThemeProperty("jqx-dropdownlist-state-disabled"));o.host.addClass(o.toThemeProperty("jqx-fill-state-disabled"));o.dropdownlistContent.addClass(o.toThemeProperty("jqx-dropdownlist-content-disabled"))}if(o.dropDownVerticalAlignment=="top"){o.arrow.addClass(o.toThemeProperty("jqx-icon-arrow-up"))}else{o.arrow.addClass(o.toThemeProperty("jqx-icon-arrow-down"))}o.arrow.addClass(o.toThemeProperty("jqx-icon"));if(o.renderMode==="simple"){o.arrow.remove();o.host.removeClass(o.toThemeProperty("jqx-fill-state-normal"));o.host.removeClass(o.toThemeProperty("jqx-rc-all"))}if(o.template){o.host.addClass(o.toThemeProperty("jqx-"+o.template))}o._updateHandlers();o._setSize();o._arrange();if(o.listBox){o.renderSelection()}if(a.jqx.browser.msie&&a.jqx.browser.version<8){if(o.host.parents(".jqx-window").length>0){var n=o.host.parents(".jqx-window").css("z-index");l.css("z-index",n+10);o.listBoxContainer.css("z-index",n+10)}}},resize:function(c,b){this.width=c;this.height=b;this._setSize();this._arrange()},val:function(c){if(!this.dropdownlistContent){return""}var d=function(f){for(var e in f){if(f.hasOwnProperty(e)){return false}}if(typeof c=="number"){return false}if(typeof c=="date"){return false}if(typeof c=="boolean"){return false}if(typeof c=="string"){return false}return true};if(this.input&&(d(c)||arguments.length==0)){return this.input.val()}var b=this.getItemByValue(c);if(b!=null){this.selectItem(b)}if(this.input){return this.input.val()}},focus:function(){try{var d=this;var c=function(){if(d.host){d.host.focus();if(d._firstDiv){d._firstDiv.focus()}}};c();setTimeout(function(){c()},10)}catch(b){}},_addInput:function(){var b=this.host.attr("name");this.input=a("<input type='hidden'/>");this.host.append(this.input);if(b){this.input.attr("name",b)}},getItems:function(){if(!this.listBox){return new Array()}return this.listBox.items},getVisibleItems:function(){return this.listBox.getVisibleItems()},_setSize:function(){var b=window.getComputedStyle(this.element);var c=parseInt(b.borderLeftWidth)*2;var h=b.boxSizing;if(this.element.offsetWidth===0){c=2}if(h==="border-box"||isNaN(c)){c=0}if(this.width!=null&&this.width.toString().indexOf("px")!=-1){this.element.style.width=parseInt(this.width)-c+"px"}else{if(this.width!=undefined&&!isNaN(this.width)){this.element.style.width=parseInt(this.width)-c+"px"}}if(this.height!=null&&this.height.toString().indexOf("px")!=-1){this.element.style.height=parseInt(this.height)-c+"px"}else{if(this.height!=undefined&&!isNaN(this.height)){this.element.style.height=parseInt(this.height)-c+"px"}}var g=false;if(this.width!=null&&this.width.toString().indexOf("%")!=-1){g=true;this.element.style.width=this.width;if(c>0){this.host.css("box-sizing","border-box");this.listBoxContainer.css("box-sizing","border-box")}}if(this.height!=null&&this.height.toString().indexOf("%")!=-1){g=true;this.element.style.height=this.height}var e=this;var f=function(){e._arrange();if(e.dropDownWidth=="auto"){var i=e.host.width()+2;e.listBoxContainer.jqxListBox({width:i});e.container.width(parseInt(i)+25)}};if(g){var d=this.host.width()+2;if(this.dropDownWidth!="auto"){d=this.dropDownWidth}this.listBoxContainer.jqxListBox({width:d});this.container.width(parseInt(d)+25)}a.jqx.utilities.resize(this.host,function(){f()},false,this._checkForHiddenParent)},isOpened:function(){var c=this;var b=a.data(document.body,"openedJQXListBox"+this.id);if(b!=null&&b==c.listBoxContainer){return true}return false},_updateHandlers:function(){var c=this;var d=false;this.removeHandlers();if(!this.touch){this.addHandler(this.host,"mouseenter",function(){if(!c.disabled&&c.enableHover&&c.renderMode!=="simple"){d=true;c.host.addClass(c.toThemeProperty("jqx-dropdownlist-state-hover"));if(c.dropDownVerticalAlignment=="top"){c.arrow.addClass(c.toThemeProperty("jqx-icon-arrow-up-hover"))}else{c.arrow.addClass(c.toThemeProperty("jqx-icon-arrow-down-hover"))}c.host.addClass(c.toThemeProperty("jqx-fill-state-hover"))}});this.addHandler(this.host,"mouseleave",function(){if(!c.disabled&&c.enableHover&&c.renderMode!=="simple"){c.host.removeClass(c.toThemeProperty("jqx-dropdownlist-state-hover"));c.host.removeClass(c.toThemeProperty("jqx-fill-state-hover"));c.arrow.removeClass(c.toThemeProperty("jqx-icon-arrow-down-hover"));c.arrow.removeClass(c.toThemeProperty("jqx-icon-arrow-up-hover"));d=false}})}if(this.host.parents()){this.addHandler(this.host.parents(),"scroll.dropdownlist"+this.element.id,function(e){var f=c.isOpened();if(f){c.close()}})}var b="mousedown";if(this.touch){b=a.jqx.mobile.getTouchEventName("touchstart")}this.addHandler(this.dropdownlistWrapper,b,function(f){if(!c.disabled){var e=c.container.css("display")=="block";if(!c.isanimating){if(e){c.hideListBox();return false}else{c.showListBox();if(!c.focusable){if(f.preventDefault){f.preventDefault()}}else{c.focus()}}}}});if(c.autoOpen){this.addHandler(this.host,"mouseenter",function(){var e=c.isOpened();if(!e&&c.autoOpen){c.open();c.host.focus()}});a(document).on("mousemove."+c.id,function(e){var l=c.isOpened();if(l&&c.autoOpen){var i=c.host.coord();var j=i.top;var h=i.left;var f=c.container.coord();var m=f.left;var k=f.top;var g=true;if(e.pageY>=j&&e.pageY<=j+c.host.height()){if(e.pageX>=h&&e.pageX<h+c.host.width()){g=false}}if(e.pageY>=k&&e.pageY<=k+c.container.height()){if(e.pageX>=m&&e.pageX<m+c.container.width()){g=false}}if(g){c.close()}}})}if(this.touch){this.addHandler(a(document),a.jqx.mobile.getTouchEventName("touchstart")+"."+this.id,c.closeOpenedListBox,{me:this,listbox:this.listBox,id:this.id})}else{this.addHandler(a(document),"mousedown."+this.id,c.closeOpenedListBox,{me:this,listbox:this.listBox,id:this.id})}this.addHandler(this.host,"keydown",function(f){var e=c.container.css("display")=="block";if(c.host.css("display")=="none"){return true}if(f.keyCode=="13"||f.keyCode=="9"){if(!c.isanimating){if(e){c.renderSelection();if(f.keyCode=="13"&&c.focusable){c._firstDiv.focus()}c.hideListBox();if(!c.keyboardSelection){c._raiseEvent("2",{index:c.selectedIndex,type:"keyboard",item:c.getItem(c.selectedIndex)})}if(f.keyCode=="13"){c._raiseEvent("4",{index:c.selectedIndex,type:"keyboard",item:c.getItem(c.selectedIndex)})}}if(e&&f.keyCode!="9"){return false}return true}}if(f.keyCode==115){if(!c.isanimating){if(!c.isOpened()){c.showListBox()}else{if(c.isOpened()){c.hideListBox()}}}return false}if(f.altKey){if(c.host.css("display")=="block"){if(f.keyCode==38){if(c.isOpened()){c.hideListBox();return true}}else{if(f.keyCode==40){if(!c.isOpened()){c.showListBox();return true}}}}}if(f.keyCode=="27"){if(!c.ishiding){if(c.isOpened()){c.hideListBox();if(c.tempSelectedIndex!=undefined){c.selectIndex(c.tempSelectedIndex)}}return true}}if(!c.disabled){c._kbnavigated=c.listBox._handleKeyDown(f);return c._kbnavigated}});this.addHandler(this.listBoxContainer,"checkChange",function(e){c.renderSelection();c._updateInputSelection();c._raiseEvent(5,{label:e.args.label,value:e.args.value,checked:e.args.checked,item:e.args.item})});this.addHandler(this.listBoxContainer,"select",function(e){if(!c.disabled){if(!e.args){return}if(e.args.type=="keyboard"&&!c.isOpened()){c.renderSelection()}if(e.args.type!="keyboard"||c.keyboardSelection){c.renderSelection();c._raiseEvent("2",{index:e.args.index,type:e.args.type,item:e.args.item,originalEvent:e.args.originalEvent});if(e.args.type=="mouse"){if(!c.checkboxes){c.hideListBox();if(c._firstDiv&&c.focusable){c._firstDiv.focus()}}}}}});if(this.listBox){if(this.listBox.content){this.addHandler(this.listBox.content,"click",function(e){if(!c.disabled){if(c.listBox.itemswrapper&&e.target===c.listBox.itemswrapper[0]){return true}c.renderSelection("mouse");if(!c.touch){if(!c.ishiding){if(!c.checkboxes){c.hideListBox();if(c._firstDiv&&c.focusable){c._firstDiv.focus()}}}}if(!c.keyboardSelection){if(c._kbnavigated===false){if(c.tempSelectedIndex!=c.selectedIndex){c._raiseEvent("4",{index:c.selectedIndex,type:"mouse",item:c.getItem(c.selectedIndex)})}c._kbnavigated=true}if(c._oldSelectedInd==undefined){c._oldSelectedIndx=c.selectedIndex}if(c.selectedIndex!=c._oldSelectedIndx){c._raiseEvent("2",{index:c.selectedIndex,type:"keyboard",item:c.getItem(c.selectedIndex)});c._oldSelectedIndx=c.selectedIndex}}}})}}this.addHandler(this.host,"focus",function(e){if(c.renderMode!=="simple"){c.host.addClass(c.toThemeProperty("jqx-dropdownlist-state-focus"));c.host.addClass(c.toThemeProperty("jqx-fill-state-focus"))}c.bar.addClass("focused");c.label.addClass("focused")});this.addHandler(this.host,"blur",function(){if(c.renderMode!=="simple"){c.host.removeClass(c.toThemeProperty("jqx-dropdownlist-state-focus"));c.host.removeClass(c.toThemeProperty("jqx-fill-state-focus"))}c.bar.removeClass("focused");c.label.removeClass("focused")});this.addHandler(this._firstDiv,"focus",function(e){if(c.renderMode!=="simple"){c.host.addClass(c.toThemeProperty("jqx-dropdownlist-state-focus"));c.host.addClass(c.toThemeProperty("jqx-fill-state-focus"))}c.bar.addClass("focused");c.label.addClass("focused")});this.addHandler(this._firstDiv,"blur",function(){if(c.renderMode!=="simple"){c.host.removeClass(c.toThemeProperty("jqx-dropdownlist-state-focus"));c.host.removeClass(c.toThemeProperty("jqx-fill-state-focus"))}c.bar.removeClass("focused");c.label.removeClass("focused")})},removeHandlers:function(){var c=this;var b="mousedown";if(this.touch){b=a.jqx.mobile.getTouchEventName("touchstart")}this.removeHandler(this.dropdownlistWrapper,b);if(this.listBox){if(this.listBox.content){this.removeHandler(this.listBox.content,"click")}}this.removeHandler(this.host,"loadContent");this.removeHandler(this.listBoxContainer,"checkChange");this.removeHandler(this.host,"keydown");this.removeHandler(this.host,"focus");this.removeHandler(this.host,"blur");this.removeHandler(this._firstDiv,"focus");this.removeHandler(this._firstDiv,"blur");this.removeHandler(this.host,"mouseenter");this.removeHandler(this.host,"mouseleave");this.removeHandler(a(document),"mousemove."+c.id)},getItem:function(b){var c=this.listBox.getItem(b);return c},getItemByValue:function(c){var b=this.listBox.getItemByValue(c);return b},selectItem:function(b){if(this.listBox!=undefined){this.listBox.selectItem(b);this.selectedIndex=this.listBox.selectedIndex;this.renderSelection("mouse")}},unselectItem:function(b){if(this.listBox!=undefined){this.listBox.unselectItem(b);this.renderSelection("mouse")}},checkItem:function(b){if(this.listBox!=undefined){this.listBox.checkItem(b)}},uncheckItem:function(b){if(this.listBox!=undefined){this.listBox.uncheckItem(b)}},indeterminateItem:function(b){if(this.listBox!=undefined){this.listBox.indeterminateItem(b)}},renderSelection:function(){if(this.listBox==null){return}if(this.height&&this.height.toString().indexOf("%")!=-1){this._arrange()}var r=this.listBox.visibleItems[this.listBox.selectedIndex];if(this.filterable){if(this.listBox.selectedIndex==-1){for(var e in this.listBox.selectedValues){var l=this.listBox.selectedValues[e];var b=this.listBox.getItemByValue(l);if(b){r=b}}}}var u=this;if(this.checkboxes){var v=this.getCheckedItems();if(v!=null&&v.length>0){r=v[0]}else{r=null}}if(this.hint){if(this.label){this.label[0].innerHTML=this.placeHolder}if(r!=null){this.element.setAttribute("hint",true)}else{this.element.removeAttribute("hint")}}this.bar.css("top",this.host.height());if(r==null){var j=a('<span unselectable="on" style="color: inherit; border: none; background-color: transparent;"></span>');j.appendTo(a(document.body));j.addClass(this.toThemeProperty("jqx-widget"));j.addClass(this.toThemeProperty("jqx-listitem-state-normal"));j.addClass(this.toThemeProperty("jqx-item"));a.jqx.utilities.html(j,this.placeHolder);if(this.isMaterialized()&&!this.element.getAttribute("default-placeholder")&&this.hint){j[0].innerHTML="";if(this.label){this.label[0].innerHTML=this.placeHolder}}var s=this.dropdownlistContent.css("padding-top");var x=this.dropdownlistContent.css("padding-bottom");j.css("padding-top",s);j.css("padding-bottom",x);var q=j.outerHeight();j.remove();j.removeClass();a.jqx.utilities.html(this.dropdownlistContent,j);var h=this.host.height();if(this.height!=null&&this.height!=undefined){if(this.height.toString().indexOf("%")===-1){h=parseInt(this.height)}}var f=parseInt((parseInt(h)-parseInt(q))/2);if(this.host.css("box-sizing")==="border-box"){f=parseInt((parseInt(h-2)-parseInt(q))/2)}if(f>0){this.dropdownlistC