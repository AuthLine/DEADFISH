/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxDropDownList","",{});a.extend(a.jqx._jqxDropDownList.prototype,{defineInstance:function(){var b={disabled:false,width:null,height:null,items:new Array(),selectedIndex:-1,source:null,scrollBarSize:15,arrowSize:17,enableHover:true,enableSelection:true,autoItemsHeight:false,visualItems:new Array(),groups:new Array(),equalItemsWidth:true,itemHeight:-1,visibleItems:new Array(),emptyGroupText:"Group",checkboxes:false,openDelay:250,closeDelay:300,dropDownContainer:"default",animationType:"default",autoOpen:false,dropDownWidth:"auto",dropDownHeight:"200px",autoDropDownHeight:false,keyboardSelection:true,enableBrowserBoundsDetection:false,dropDownHorizontalAlignment:"left",dropDownVerticalAlignment:"bottom",displayMember:"",valueMember:"",groupMember:"",searchMember:"",searchMode:"startswithignorecase",incrementalSearch:true,incrementalSearchDelay:700,renderer:null,placeHolder:"",promptText:"Please Choose:",emptyString:"",rtl:false,selectionRenderer:null,listBox:null,popupZIndex:2000,renderMode:"default",touchMode:"auto",_checkForHiddenParent:true,autoBind:true,ready:null,focusable:true,filterable:false,filterHeight:27,filterPlaceHolder:"Looking for",filterDelay:100,hint:true,template:"default",aria:{"aria-disabled":{name:"disabled",type:"boolean"}},events:["open","close","select","unselect","change","checkChange","bindingComplete","itemAdd","itemRemove","itemUpdate"]};if(this===a.jqx._jqxDropDownList.prototype){return b}a.extend(true,this,b);return b},createInstance:function(b){var d=this;if(d.isMaterialized()){var f=window.getComputedStyle(this.element);var e=f.getPropertyValue("--jqx-dropdown-animation");var c=f.getPropertyValue("--jqx-list-item-height");if(e&&this.animationType=="default"){this.animationType=e.trim()}if(c&&this.itemHeight===-1){this.itemHeight=parseInt(c)}}this.render()},render:function(){var o=this;if(!o.width){o.width=200}if(!o.height){o.height=25}o.host.addClass(o.toThemeProperty("jqx-dropdownlist"));var b=o.element.nodeName.toLowerCase();if(b=="select"||b=="ul"||b=="ol"){o.field=o.element;if(o.field.className){o._className=o.field.className}var h={title:o.field.title};if(o.field.id.length){h.id=o.field.id.replace(/[^\w]/g,"_")+"_jqxDropDownList"}else{h.id=a.jqx.utilities.createId()+"_jqxDropDownList"}var f=a("<div></div>",h);if(!o.width){o.width=a(o.field).width()}if(!o.height){o.height=a(o.field).outerHeight()}f[0].style.cssText=o.field.style.cssText;a(o.field).hide().after(f);var u=o.host.data();o.host=f;o.host.data(u);o.element=f[0];o.element.id=o.field.id;o.field.id=h.id;if(o._className){o.host.addClass(o._className);a(o.field).removeClass(o._className)}if(o.field.tabIndex){var d=o.field.tabIndex;o.field.tabIndex=-1;o.element.tabIndex=d}var k=a.jqx.parseSourceTag(o.field);o.source=k.items;if(o.selectedIndex==-1){o.selectedIndex=k.index}}else{if(o.host.find("li").length>0||o.host.find("option").length>0){var k=a.jqx.parseSourceTag(o.element);o.source=k.items}}o.element.innerHTML="";o.isanimating=false;o.id=o.element.id||a.jqx.utilities.createId();o.host.attr("role","combobox");a.jqx.aria(o,"aria-autocomplete","both");a.jqx.aria(o,"aria-readonly",false);var m="<div style='background-color: transparent; -webkit-appearance: none; outline: none; width:100%; height: 100%; padding: 0px; margin: 0px; border: 0px; position: relative;'><div id='dropdownlistWrapper' style='overflow: hidden; outline: none; background-color: transparent; border: none; float: left; width:100%; height: 100%; position: relative;'><div id='dropdownlistContent' unselectable='on' style='outline: none; background-color: transparent; border: none; float: left; position: relative;'></div><div id='dropdownlistArrow' unselectable='on' style='background-color: transparent; border: none; float: right; position: relative;'><div unselectable='on'></div></div></div></div>";if(a.jqx._jqxListBox==null||a.jqx._jqxListBox==undefined){throw new Error("jqxDropDownList: Missing reference to jqxlistbox.js.")}if(o.host.attr("tabindex")){}else{o.host.attr("tabindex",0)}var t=o;o.touch=a.jqx.mobile.isTouchDevice();o.comboStructure=m;o.element.innerHTML=m;o.dropdownlistWrapper=a(o.element.firstChild.firstChild);o.dropdownlistArrow=a(o.dropdownlistWrapper[0].firstChild.nextSibling);o.arrow=a(o.dropdownlistArrow[0].firstChild);o.dropdownlistContent=a(o.dropdownlistWrapper[0].firstChild);o.dropdownlistContent.addClass(o.toThemeProperty("jqx-dropdownlist-content jqx-disableselect"));if(o.rtl){o.dropdownlistContent.addClass(o.toThemeProperty("jqx-rtl jqx-dropdownlist-content-rtl"))}o.addHandler(o.dropdownlistWrapper,"selectstart",function(){return false});o.dropdownlistWrapper[0].id="dropdownlistWrapper"+o.element.id;o.dropdownlistArrow[0].id="dropdownlistArrow"+o.element.id;o.dropdownlistContent[0].id="dropdownlistContent"+o.element.id;o._addInput();var j=a("<label></label");if(this.hint){j[0].innerHTML=this.placeHolder}j.addClass(o.toThemeProperty("jqx-input-label"));o.dropdownlistWrapper.append(j);o.label=j;var r=a("<span></span>");o.dropdownlistWrapper.append(r);r.addClass(o.toThemeProperty("jqx-input-bar"));o.bar=r;o.bar.css("top",this.host.height());var i=this;if(i.template){i.bar.addClass(i.toThemeProperty("jqx-"+i.template));i.label.addClass(i.toThemeProperty("jqx-"+i.template))}if(o.promptText!="Please Choose:"){o.placeHolder=o.promptText}var c=o.toThemeProperty("jqx-widget")+" "+o.toThemeProperty("jqx-dropdownlist-state-normal")+" "+o.toThemeProperty("jqx-rc-all")+" "+o.toThemeProperty("jqx-fill-state-normal");o.element.className+=" "+c;o._firstDiv=a(o.element.firstChild);try{var q="listBox"+o.id;var g=a(a.find("#"+q));if(g.length>0){g.remove()}a.jqx.aria(o,"aria-owns",q);a.jqx.aria(o,"aria-haspopup",true);var l=a("<div style='overflow: hidden; background-color: transparent; border: none; position: absolute;' id='listBox"+o.id+"'><div id='innerListBox"+o.id+"'></div></div>");l.hide();l.addClass(o.toThemeProperty("jqx-listbox-container"));if(o.dropDownContainer=="element"){l.appendTo(o.host)}else{l.appendTo(document.body)}o.container=l;o.listBoxContainer=a(a.find("#innerListBox"+o.id));var p=o.width;if(o.dropDownWidth!="auto"){p=o.dropDownWidth}if(p==null){p=o.host.width();if(p==0){p=o.dropDownWidth}}if(o.dropDownHeight==null){o.dropDownHeight=200}var t=o;o.container.width(parseInt(p)+25);o.container.height(parseInt(o.dropDownHeight)+25);o._ready=false;o.addHandler(o.listBoxContainer,"bindingComplete",function(e){if(!o.listBox){o.listBox=a.data(o.listBoxContainer[0],"jqxListBox").instance}if(o.selectedIndex!=o.listBoxContainer.jqxListBox("selectedIndex")){o.listBox=a.data(o.listBoxContainer[0],"jqxListBox").instance;o.listBoxContainer.jqxListBox({selectedIndex:o.selectedIndex});o.renderSelection("mouse")}else{o.renderSelection("mouse")}if(!o._ready){if(o.ready){o.ready()}o._ready=true}o._raiseEvent("6")});o.addHandler(o.listBoxContainer,"itemAdd",function(e){o._raiseEvent("7",e.args)});o.addHandler(o.listBoxContainer,"itemRemove",function(e){o._raiseEvent("8",e.args)});o.addHandler(o.listBoxContainer,"itemUpdate",function(e){o._raiseEvent("9",e.args)});o.listBoxContainer.jqxListBox({filterHeight:o.filterHeight,filterPlaceHolder:o.filterPlaceHolder,filterDelay:o.filterDelay,autoItemsHeight:o.autoItemsHeight,filterable:o.filterable,allowDrop:false,allowDrag:false,autoBind:o.autoBind,_checkForHiddenParent:false,focusable:o.focusable,touchMode:o.touchMode,checkboxes:o.checkboxes,rtl:o.rtl,_renderOnDemand:true,emptyString:o.emptyString,itemHeight:o.itemHeight,width:p,searchMode:o.searchMode,incrementalSearch:o.incrementalSearch,incrementalSearchDelay:o.incrementalSearchDelay,groupMember:o.groupMember,searchMember:o.searchMember,displayMember:o.displayMember,valueMember:o.valueMember,height:o.dropDownHeight,autoHeight:o.autoDropDownHeight,scrollBarSize:o.scrollBarSize,selectedIndex:o.selectedIndex,source:o.source,theme:o.theme,rendered:function(){if(o.selectedIndex!=o.listBoxContainer.jqxListBox("selectedIndex")){o.listBox=a.data(o.listBoxContainer[0],"jqxListBox").instance;o.listBoxContainer.jqxListBox({selectedIndex:o.selectedIndex});o.renderSelection("mouse")}else{o.renderSelection("mouse")}},renderer:o.renderer,filterChange:function(e){if(o.autoDropDownHeight){o.container.height(o.listBoxContainer.height()+25)}}});if(o.dropDownConta