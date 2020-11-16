/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxComboBox","",{});a.extend(a.jqx._jqxComboBox.prototype,{defineInstance:function(){var b={disabled:false,width:200,height:25,items:new Array(),selectedIndex:-1,selectedItems:new Array(),_selectedItems:new Array(),source:null,autoItemsHeight:false,scrollBarSize:a.jqx.utilities.scrollBarSize,arrowSize:17,enableHover:true,enableSelection:true,visualItems:new Array(),groups:new Array(),equalItemsWidth:true,itemHeight:-1,visibleItems:new Array(),hint:true,emptyGroupText:"Group",emptyString:"",ready:null,openDelay:250,closeDelay:300,animationType:"default",dropDownWidth:"auto",dropDownHeight:"200px",autoDropDownHeight:false,enableBrowserBoundsDetection:false,dropDownHorizontalAlignment:"left",dropDownVerticalAlignment:"bottom",dropDownContainer:"default",searchMode:"startswithignorecase",autoComplete:false,remoteAutoComplete:false,remoteAutoCompleteDelay:500,selectionMode:"default",minLength:2,displayMember:"",valueMember:"",groupMember:"",searchMember:"",keyboardSelection:true,renderer:null,autoOpen:false,template:"",checkboxes:false,promptText:"",placeHolder:"",rtl:false,listBox:null,validateSelection:null,showCloseButtons:true,renderSelectedItem:null,search:null,popupZIndex:2000,searchString:null,multiSelect:false,showArrow:true,_disabledItems:new Array(),touchMode:"auto",autoBind:true,aria:{"aria-disabled":{name:"disabled",type:"boolean"}},events:["open","close","select","unselect","change","checkChange","bindingComplete","itemAdd","itemRemove","itemUpdate"]};if(this===a.jqx._jqxComboBox.prototype){return b}a.extend(true,this,b);return b},createInstance:function(b){var e=this;this.host.attr("role","combobox");a.jqx.aria(this,"aria-autocomplete","both");if(a.jqx._jqxListBox==null||a.jqx._jqxListBox==undefined){throw new Error("jqxComboBox: Missing reference to jqxlistbox.js.")}a.jqx.aria(this);if(e.isMaterialized()){var g=window.getComputedStyle(this.element);var f=g.getPropertyValue("--jqx-dropdown-animation");var d=g.getPropertyValue("--jqx-list-item-height");var c=g.getPropertyValue("--jqx-action-button-size");if(c){this.arrowSize=parseInt(c)}if(f&&this.animationType=="default"){this.animationType=f.trim()}if(d&&this.itemHeight===-1){this.itemHeight=parseInt(d)}}if(this.promptText!=""){this.placeHolder=this.promptText}this.render()},render:function(){var i=this;var b=i.element.nodeName.toLowerCase();if(b=="select"||b=="ul"||b=="ol"){i.field=i.element;if(i.field.className){i._className=i.field.className}var h={title:i.field.title};if(i.field.id.length){h.id=i.field.id.replace(/[^\w]/g,"_")+"_jqxComboBox"}else{h.id=a.jqx.utilities.createId()+"_jqxComboBox"}var d=a("<div></div>",h);if(!i.width){i.width=a(i.field).width()}if(!i.height){i.height=a(i.field).outerHeight()}i.element.style.cssText=i.field.style.cssText;a(i.field).hide().after(d);var t=i.host.data();i.host=d;i.host.data(t);i.element=d[0];i.element.id=i.field.id;i.field.id=h.id;if(i._className){i.host.addClass(i._className);a(i.field).removeClass(i._className)}if(i.field.tabIndex){var c=i.field.tabIndex;i.field.tabIndex=-1;i.element.tabIndex=c}if(i.field.innerHTML!=""){var k=a.jqx.parseSourceTag(i.field);i.source=k.items;if(i.selectedIndex==-1){i.selectedIndex=k.index}}}else{if(i.host.find("li").length>0||i.host.find("option").length>0){var k=a.jqx.parseSourceTag(i.element);i.source=k.items}}i.removeHandlers();i.isanimating=false;i.id=a.jqx.utilities.createId();i.element.innerHTML="";var m=a("<div style='background-color: transparent; -webkit-appearance: none; outline: none; width:100%; height: 100%; padding: 0px; margin: 0px; border: 0px; position: relative;'><div id='dropdownlistWrapper' style='padding: 0; margin: 0; border: none; background-color: transparent; float: left; width:100%; height: 100%; position: relative;'><div id='dropdownlistContent' style='padding: 0; margin: 0; border-top: none; border-bottom: none; float: left; position: absolute;'></div><div id='dropdownlistArrow' role='button' style='padding: 0; margin: 0; border-left-width: 1px; border-bottom-width: 0px; border-top-width: 0px; border-right-width: 0px; float: right; position: absolute;'></div></div></div>");i.comboStructure=m;if(a.jqx._jqxListBox==null||a.jqx._jqxListBox==undefined){throw"jqxComboBox: Missing reference to jqxlistbox.js."}i.touch=a.jqx.mobile.isTouchDevice();if(i.touchMode===true){i.touch=true}i.host.append(m);i.dropdownlistWrapper=i.host.find("#dropdownlistWrapper");i.dropdownlistArrow=i.host.find("#dropdownlistArrow");i.dropdownlistContent=i.host.find("#dropdownlistContent");i.dropdownlistContent.addClass(i.toThemeProperty("jqx-combobox-content"));i.dropdownlistContent.addClass(i.toThemeProperty("jqx-widget-content"));i.dropdownlistWrapper[0].id="dropdownlistWrapper"+i.element.id;i.dropdownlistArrow[0].id="dropdownlistArrow"+i.element.id;i.dropdownlistContent[0].id="dropdownlistContent"+i.element.id;if(i.template){i.dropdownlistArrow.addClass(i.toThemeProperty("jqx-"+i.template+""))}i.dropdownlistContent.append(a('<input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" style="box-sizing: border-box; margin: 0; padding: 0; padding-left: 3px; padding-right: 3px; border: 0;" type="textarea"/>'));i.input=i.dropdownlistContent.find("input");i.input.addClass(i.toThemeProperty("jqx-combobox-input"));i.input.addClass(i.toThemeProperty("jqx-widget-content"));if(i.host.attr("tabindex")){i.input.attr("tabindex",i.host.attr("tabindex"));i.host.removeAttr("tabindex")}var j=a("<label></label>");if(this.hint){j[0].innerHTML=this.placeHolder}j.addClass(i.toThemeProperty("jqx-input-label"));i.dropdownlistWrapper.append(j);i.label=j;var r=a("<span></span>");i.dropdownlistWrapper.append(r);r.addClass(i.toThemeProperty("jqx-input-bar"));i.bar=r;var i=this;if(i.template){i.bar.addClass(i.toThemeProperty("jqx-"+i.template));i.label.addClass(i.toThemeProperty("jqx-"+i.template))}i._addInput();if(i.rtl){i.input.css({direction:"rtl"});i.dropdownlistContent.addClass(i.toThemeProperty("jqx-combobox-content-rtl"))}try{var q="listBox"+i.id;var g=a(a.find("#"+q));if(g.length>0){g.remove()}a.jqx.aria(this,"aria-owns",q);a.jqx.aria(this,"aria-haspopup",true);a.jqx.aria(this,"aria-multiline",false);if(i.listBoxContainer){i.listBoxContainer.jqxListBox("destroy")}if(i.container){i.container.remove()}var l=a("<div style='overflow: hidden; border: none; background-color: transparent; position: absolute;' id='listBox"+i.id+"'><div id='innerListBox"+i.id+"'></div></div>");l.hide();if(i.dropDownContainer=="element"){l.appendTo(i.host)}else{l.appendTo(document.body)}l.addClass(i.toThemeProperty("jqx-listbox-container"));i.container=l;i.listBoxContainer=a(a.find("#innerListBox"+i.id));var p=i.width;if(i.dropDownWidth!="auto"){p=i.dropDownWidth}if(i.dropDownHeight==null){i.dropDownHeight=200}i.container.width(parseInt(p)+25);i.container.height(parseInt(i.dropDownHeight)+25);i._ready=false;i.addHandler(i.listBoxContainer,"bindingComplete",function(e){if(!i.listBox){i.listBox=a.data(i.listBoxContainer[0],"jqxListBox").instance}if(!i._ready){if(i.ready){i.ready()}i._ready=true}i._raiseEvent("6")});i.addHandler(i.listBoxContainer,"itemAdd",function(e){i._raiseEvent("7",e.args)});i.addHandler(i.listBoxContainer,"itemRemove",function(e){i._raiseEvent("8",e.args)});i.addHandler(i.listBoxContainer,"itemUpdate",function(e){i._raiseEvent("9",e.args)});var o=true;i.listBoxContainer.jqxListBox({autoItemsHeight:i.autoItemsHeight,_checkForHiddenParent:false,allowDrop:false,allowDrag:false,checkboxes:i.checkboxes,emptyString:i.emptyString,autoBind:!i.remoteAutoComplete&&i.autoBind,renderer:i.renderer,rtl:i.rtl,itemHeight:i.itemHeight,selectedIndex:i.selectedIndex,incrementalSearch:false,width:p,scrollBarSize:i.scrollBarSize,autoHeight:i.autoDropDownHeight,height:i.dropDownHeight,groupMember:i.groupMember,searchMember:i.searchMember,displayMember:i.displayMember,valueMember:i.valueMember,source:i.source,theme:i.theme,rendered:function(){i.listBox=a.data(i.listBoxContainer[0],"jqxListBox").instance;if(i.remoteAutoComplete){if(i.autoDropDownHeight){i.container.height(i.listBox.virtualSize.height+25);i.listBoxContainer.height(i.listBox.virtualSize.height);i.listBox._arrange()}else{i.listBox._arrange();i.listBox.ensureVisible(0);i.listBox._renderItems();i.container.height(i.listBoxContainer.height()+25)}if(i.searchString!=undefined&&i.searchString.length>=i.minLength){var e=i.listBoxContainer.jqxListBox("items");if(e){if(e.length>0){if(!i.isOpened()){i.open()}}else{i.close()}}else{i.close()}}else{i.close()}}else{i.renderSelection("mouse");if(i.multiSelect){i.doMultiSelect(false)}}if(i.rendered){i.rendered()}}});if(i.dropDownContainer=="element"){i.listBoxContainer.css({position:"absolute",top:0,left:0})}else{i.listBoxContainer.css({position:"absolute",zIndex:i.popupZIndex,top:0,left:0})}i.listBoxContainer.css("border-top-width","1px");i.listBoxContainer.addClass(i.toThemeProperty("jqx-popup"));if(a.jqx.browser.msie){i.listBoxContainer.addClass(i.toThemeProperty("jqx-noshadow"))}if(i.template){i.listBoxContainer.addClass(i.toThemeProperty("jqx-"+i.template+"-item"))}i.listBox=a.data(i.listBoxContainer[0],"jqxListBox").instance;i.listBox.enableSelection=i.enableSelection;i.listBox.enableHover=i.enableHover;i.listBox.equalItemsWidth=i.equalItemsWidth;i.listBox._arrange();i.addHandler(i.listBoxContainer,"unselect",function(e){if(!i.multiSelect){i._raiseEvent("3",{index:e.args.index,type:e.args.type,item:e.args.item})}});i.addHandler(i.listBoxContainer,"change",function(e){if(!i.multiSelect){i.selectedIndex=i.listBox.selectedIndex;i._raiseEvent("4",{index:e.args.index,type:e.args.type,item:e.args.item})}});if(i.animationType=="none"){i.container.css("display","none")}else{i.container.hide()}o=false}catch(s){throw s}var i=this;i.input.attr("disabled",i.disabled);var f=a.jqx.browser.msie&&a.jqx.browser.version<8;if(!f){if(i.isMaterialized()&&i.hint){i.label[0].innerHTML=i.placeHolder}else{i.input.attr("placeholder",i.placeHolder)}}i.propertyChangeMap.disabled=function(e,v,u,w){if(w){e.host.addClass(i.toThemeProperty("jqx-combobox-state-disabled"));e.host.addClass(i.toThemeProperty("jqx-fill-state-disabled"));e.dropdownlistContent.addClass(i.toThemeProperty("jqx-combobox-content-disabled"))}else{e.host.removeClass(i.toThemeProperty("jqx-combobox-state-disabled"));e.host.removeClass(i.toThemeProperty("jqx-fill-state-disabled"));e.dropdownlistContent.removeClass(i.toThemeProperty("jqx-combobox-content-disabled"))}e.input.attr("disabled",e.disabled);a.jqx.aria(e,"aria-disabled",e.disabled);e.input.attr("disabled",e.disabled)};if(i.disabled){i.host.addClass(i.toThemeProperty("jqx-combobox-state-disabled"));i.host.addClass(i.toThemeProperty("jqx-fill-state-disabled"));i.dropdownlistContent.addClass(i.toThemeProperty("jqx-combobox-content-disabled"))}i.host.addClass(i.toThemeProperty("jqx-combobox-state-normal"));i.host.addClass(i.toThemeProperty("jqx-combobox"));i.host.addClass(i.toThemeProperty("jqx-rc-all"));i.host.addClass(i.toThemeProperty("jqx-widget"));i.host.addClass(i.toThemeProperty("jqx-widget-content"));i.dropdownlistArrowIcon=a("<div></div>");if(i.dropDownVerticalAlignment=="top"){i.dropdownlistArrowIcon.addClass(i.toThemeProperty("jqx-icon-arrow-up"))}else{i.dropdownlistArrowIcon.addClass(i.toThemeProperty("jqx-icon-arrow-down"))}i.dropdownlistArrowIcon.addClass(i.toThemeProperty("jqx-icon"));i.dropdownlistArrow.append(i.dropdownlistArrowIcon);i.dropdownlistArrow.addClass(i.toThemeProperty("jqx-combobox-arrow-normal"));i.dropdownlistArrow.addClass(i.toThemeProperty("jqx-fill-state-normal"));if(!i.rtl){i.dropdownlistArrow.addClass(i.toThemeProperty("jqx-rc-r"))}else{i.dropdownlistArrow.addClass(i.toThemeProperty("jqx-rc-l"))}i._setSize();i._updateHandlers();i.addHandler(i.input,"keyup.textchange",function(e){if(i._writeTimer){clearTimeout(i._writeTimer)}i._writeTimer=setTimeout(function(){var u=i._search(e);if(i.cinput&&i.input){if(!i.displayMember){i.cinput[0].value=i.input[0].value}else{i._updateInputSelection()}}},50)});if(a.jqx.browser.msie&&a.jqx.browser.version<8){if(i.host.parents(".jqx-window").length>0){var n=i.host.parents(".jqx-window").css("z-index");l.css("z-index",n+10);i.listBoxContainer.css("z-index",n+10)}}if(i.checkboxes){i.input.attr("readonly",true);a.jqx.aria(this,"aria-readonly",true)}else{a.jqx.aria(this,"aria-readonly",false)}if(!i.remoteAutoComplete){i.searchString=""}this.bar.css("top",this.host.height())},_addInput:function(){var b=this.host.attr("name");this.cinput=a("<input type='hidden'/>");this.host.append(this.cinput);if(b){this.cinput.attr("name",b)}},_updateInputSelection:function(){if(this.cinput){var c=new Array();if(this.selectedIndex==-1){this.cinput.val("")}else{var e=this.getSelectedItem();if(e!=null){this.cinput.val(e.value);c.push(e.value)}else{this.cinput.val(this.dropdownlistContent.text())}}if(this.checkboxes||this.multiSelect){if(!this.multiSelect){var b=this.getCheckedItems()}else{var b=this.getSelectedItems()}var f="";if(b!=null){for(var d=0;d<b.length;d++){if(d==b.length-1){f+=b[d].value}else{f+=b[d].value+","}c.push(b[d].value)}}this.cinput.val(f)}if(this.field&&this.cinput){if(this.field.nodeName.toLowerCase()=="select"){a.each(this.field,function(g,h){a(this).removeAttr("selected");this.selected=c.indexOf(this.value)>=0;if(this.selected){a(this).attr("selected",true)}})}else{a.each(this.items,function(g,h){a(this.originalItem.originalItem).removeAttr("data-selected");this.selected=c.indexOf(this.value)>=0;if(this.selected){a(this.originalItem.originalItem).attr("data-selected",true)}})}}}},_search:function(d){var i=this;if(d.keyCode==9){return}if(i.searchMode=="none"||i.searchMode==null||i.searchMode=="undefined"){return}if(d.keyCode==16||d.keyCode==17||d.keyCode==20){return}if(i.checkboxes){return}if(i.multiSelect){var l=a("<span style='visibility: hidden; white-space: nowrap;'>"+document.createTextNode(i.input.val())+"</span>");l.addClass(i.toThemeProperty("jqx-widget"));a(document.body).append(l);var e=l.width()+15;l.remove();if(e>i.host.width()){e=i.host.width()}if(e<25){e=25}i.input.css("width",e+"px");if(i.selectedItems.length==0){i.input.css("width","100%");if(!i.isMaterialized()){i.input.attr("placeholder",i.placeHolder)}}else{if(!i.isMaterialized()){i.input.attr("placeholder","")}}var j=parseInt(this._findPos(i.host[0])[1])+parseInt(i.host.outerHeight())-1+"px";var r=false;if((r!=null&&r)){j=a.jqx.mobile.getTopPos(this.element)+parseInt(i.host.outerHeight());if(a("body").css("border-top-width")!="0px"){j=parseInt(j)-this._getBodyOffset().top+"px"}}i.container.css("top",j);var o=parseInt(i.host.height());i.dropdownlistArrow.height(o)}if(!i.isanimating){if(d.altKey&&d.keyCode==38){i.hideListBox("altKey");return false}if(d.altKey&&d.keyCode==40){if(!i.isOpened()){i.showListBox("altKey")}return false}}if(d.keyCode==37||d.keyCode==39){return false}if(d.altKey||d.keyCode==18){return}if(d.keyCode>=33&&d.keyCode<=40){return}if(d.ctrlKey||i.ctrlKey){if(d.keyCode!=88&&d.keyCode!=86){return}}var k=i.input.val();if(k.length==0&&!i.autoComplete){i.listBox.searchString=i.input.val();i.listBox.clearSelection();i.hideListBox("search");i.searchString=i.input.val();return}if(i.remoteAutoComplete){var i=this;var q=function(){i.listBox.vScrollInstance.value=0};if(k.length>=i.minLength){if(!d.ctrlKey&&!d.altKey){if(i.searchString!=k){var c=i.listBoxContainer.jqxListBox("source");if(c==null){i.listBoxContainer.jqxListBox({source:i.source})}if(i._searchTimer){clearTimeout(i._searchTimer)}if(d.keyCode!=13&&d.keyCode!=27){i._searchTimer=setTimeout(function(){q();if(i.autoDropDownHeight){i.listBox.autoHeight=true}i.searchString=i.input.val();if(i.search!=null){i.search(i.input.val())}else{throw"'search' function is not defined"}},i.remoteAutoCompleteDelay)}}i.searchString=k}}else{if(i._searchTimer){clearTimeout(i._searchTimer)}q();i.searchString="";i.search("");i.listBoxContainer.jqxListBox({source:null})}return}var i=this;if(k===i.searchString){return}if(!(d.keyCode=="27"||d.keyCode=="13")){var n=i.input[0].value;var g=i._updateItemsVisibility(k);var m=g.matchItems;if(i.autoComplete&&i.autoItemsHeight){i.input[0].value=n}var h=g.index;if(!i.autoComplete&&!i.remoteAutoComplete){if(!i.multiSelect||(i.multiSelect&&h>=0)){i.listBox.selectIndex(h);var f=i.listBox.isIndexInView(h);if(!f){i.listBox.ensureVisible(h)}else{i.listBox._renderItems()}}}if(i.autoComplete&&m.length===0){i.hideListBox("search")}}if(d.keyCode=="13"){var b=i.container.css("display")=="block";if(b&&!i.isanimating){i.hideListBox("keyboard");i._oldvalue=i.listBox.selectedValue;return}}else{if(d.keyCode=="27"){var b=i.container.css("display")=="block";if(b&&!i.isanimating){if(!i.multiSelect){var p=i.listBox.getVisibleItem(i._oldvalue);if(p){var i=this;setTimeout(function(){if(i.autoComplete){i._updateItemsVisibility("")}i.listBox.selectIndex(p.index);i.renderSelection("api")},i.closeDelay)}else{i.clearSelection()}}else{i.input.val("");i.listBox.selectedValue=null}i.hideListBox("keyboard");i.renderSelection("api");d.preventDefault();return false}}else{if(!i.isOpened()&&!i.opening&&!d.ctrlKey){if(i.listBox.visibleItems&&i.listBox.visibleItems.length>0){if(i.input.val()!=i.searchString&&i.searchString!=undefined&&h!=-1){i.showListBox("search")}}}i.searchString=i.input.val();if(i.searchString==""){if(!i.listBox.itemsByValue[""]){h=-1;if(!i.multiSelect){i.clearSelection()}}}var p=i.listBox.getVisibleItem(h);if(p!=undefined){i._updateInputSelection()}}}},val:function(c){if(!this.input){return""}var d=function(f){for(var e in f){if(f.hasOwnProperty(e)){return false}}if(typeof c=="number"){return false}if(typeof c=="date"){return false}if(typeof c=="boolean"){return false}if(typeof c=="string"){return false}return true};if(d(c)||arguments.length==0){var b=this.getSelectedItem();if(b){return b.value}return this.input.val()}else{var b=this.getItemByValue(c);if(b!=null){this.selectItem(b)}else{this.input.val(c)}return this.input.val()}},focus:function(){var c=this;var b=function(){c.input.focus();var d=c.input.val();c._setSelection(0,d.length)};b();setTimeout(function(){b()},10)},_setSelection:function(e,b){try{if("selectionStart" in this.input[0]){this.input[0].focus();this.input[0].setSelectionRange(e,b)}else{var c=this.input[0].createTextRange();c.collapse(true);c.moveEnd("character",b);c.moveStart("character",e);c.select()}}catch(d){}},setContent:function(b){this.input.val(b)},_updateItemsVisibility:function(k){var i=this.getItems();if(i==undefined){return{index:-1,matchItem:new Array()}}var f=this;var g=-1;var l=new Array();var j=0;a.each(i,function(o){var q="";if(!this.isGroup){if(this.searchLabel){q=this.searchLabel}else{if(this.label){q=this.label}else{if(this.value){q=this.value}else{if(this.title){q=this.title}else{q="jqxItem"}}}}q=q.toString();var p=false;switch(f.searchMode){case"containsignorecase":p=a.jqx.string.containsIgnoreCase(q,k);break;case"contains":p=a.jqx.string.contains(q,k);break;case"equals":p=a.jqx.string.equals(q,k);break;case"equalsignorecase":p=a.jqx.string.equalsIgnoreCase(q,k);break;case"startswith":p=a.jqx.string.startsWith(q,k);break;case"startswithignorecase":p=a.jqx.string.startsWithIgnoreCase(q,k);break;case"endswith":p=a.jqx.string.endsWith(q,k);break;case"endswithignorecase":p=a.jqx.string.endsWithIgnoreCase(q,k);break}if(f.autoComplete&&!p){this.visible=false}if(p&&f.autoComplete){l[j++]=this;this.visible=true;g=this.visibleIndex}if(k==""&&f.autoComplete){this.visible=true;p=false}if(f.multiSelect){this.disabled=false;if(f.selectedItems.indexOf(this.value)>=0||f._disabledItems.indexOf(this.value)>=0){this.disabled=true;p=false}}if(!f.multiSelect){if(p&&!f.autoComplete){g=this.visibleIndex;return false}}else{if(p&&!f.autoComplete){if(g===-1){g=this.visibleIndex}return true}}}});this.listBox.searchString=k;var f=this;var h=function(){if(f.multiSelect){return}var o=0;var r=false;var q=null;for(var p=0;p<f.listBox.items.length;p++){f.listBox.selectedIndexes[p]=-1;if(!f.listBox.items[p].disabled){if(r==false){q=f.listBox.items[p];o=q.visibleIndex;r=true}}}f.listBox.selectedIndex=-1;f.listBox.selectedIndex=o;f.listBox.selectedIndexes[o]=o;if(f.listBox.visibleItems.length>0){if(q){f.listBox.selectedValue=q.value}else{f.listBox.selectedValue=null}}else{f.listBox.selectedValue=null}f.listBox.ensureVisible(0)};if(!this.autoComplete){h();return{index:g,matchItems:l}}this.listBox.renderedVisibleItems=new Array();var b=this.listBox.vScrollInstance.value;this.listBox.vScrollInstance.value=0;this.listBox.visibleItems=new Array();this.listBox._renderItems();var e=this.listBox.selectedValue;var n=this.listBox.getItemByValue(e);if(!this.multiSelect){if(n){if(n.visible){this.listBox.selectedIndex=n.visibleIndex;for(var d=0;d<this.listBox.items.length;d++){this.listBox.selectedIndexes[d]=-1}this.listBox.selectedIndexes[n.visibleIndex]=n.visibleIndex}else{for(var d=0;d<this.listBox.items.length;d++){this.listBox.selectedIndexes[d]=-1}this.listBox.selectedIndex=-1}}}else{h()}this.listBox._renderItems();var m=this.listBox._calculateVirtualSize().height;if(m<b){b=0;this.listBox.vScrollInstance.refresh()}if(this.autoDropDownHeight){this._disableSelection=true;if(this.listBox.autoHeight!=this.autoDropDownHeight){this.listBoxContainer.jqxListBox({autoHeight:this.autoDropDownHeight})}this.container.height(m+25);this.listBox.invalidate();this._disableSelection=false}else{if(m<parseInt(this.dropDownHeight)){var c=this.listBox.hScrollBar[0].style.visibility=="hidden"?0:20;this.listBox.height=c+m;this.container.height(m+25+c);this.listBox.invalidate()}else{this.listBox.height=parseInt(this.dropDownHeight);this.container.height(parseInt(this.dropDownHeight)+25);this.listBox.invalidate()}}this.listBox.vScrollInstance.setPosition(b);return{index:g,matchItems:l}},findItems:function(e){var b=this.getItems();var d=this;var c=0;var f=new Array();a.each(b,function(g){var j="";if(!this.isGroup){if(this.label){j=this.label}else{if(this.value){j=this.value}else{if(this.title){j=this.title}else{j="jqxItem"}}}var h=false;switch(d.searchMode){case"containsignorecase":h=a.jqx.string.containsIgnoreCase(j,e);break;case"contains":h=a.jqx.string.contains(j,e);break;case"equals":h=a.jqx.string.equals(j,e);break;case"equalsignorecase":h=a.jqx.string.equalsIgnoreCase(j,e);break;case"startswith":h=a.jqx.string.startsWith(j,e);break;case"startswithignorecase":h=a.jqx.string.startsWithIgnoreCase(j,e);break;case"endswith":h=a.jqx.string.endsWith(j,e);break;case"endswithignorecase":h=a.jqx.string.endsWithIgnoreCase(j,e);break}if(h){f[c++]=this}}});return f},_resetautocomplete:function(){a.each(this.listBox.items,function(b){this.visible=true});this.listBox.vScrollInstance.value=0;this.listBox._addItems();this.listBox.autoHeight=false;this.listBox.height=this.dropDownHeight;this.container.height(parseInt(this.dropDownHeight)+25);this.listBoxContainer.height(parseInt(this.dropDownHeight));this.listBox._arrange();this.listBox._addItems();this.listBox._renderItems()},getItems:function(){var b=this.listBox.items;return b},getVisibleItems:function(){return this.listBox.getVisibleItems()},_setSize:function(){var b=window.getComputedStyle(this.element);var c=parseInt(b.borderLeftWidth)*2;var h=b.boxSizing;if(h==="border-box"||isNaN(c)){c=0}if(this.width!=null&&this.width.toString().indexOf("px")!=-1){this.element.style.width=parseInt(this.width)-c+"px"}else{if(this.width!=undefined&&!isNaN(this.width)){this.element.style.width=parseInt(this.width)-c+"px"}}if(this.height!=null&&this.height.toString().indexOf("px")!=-1){this.element.style.height=parseInt(this.height)-c+"px"}else{if(this.height!=undefined&&!isNaN(this.height)){this.element.style.height=parseInt(this.height)-c+"px"}}var g=false;if(this.width!=null&&this.width.toString().indexOf("%")!=-1){g=true;this.element.style.width=this.width;if(c>0){this.host.css("box-sizing","border-box")}}if(this.height!=null&&this.height.toString().indexOf("%")!=-1){g=true;this.element.style.height=this.height}if(g){var e=this;var d=this.host.width();if(this.dropDownWidth!="auto"){d=this.dropDownWidth}this.listBoxContainer.jqxListBox({width:d});this.container.width(parseInt(d)+25);this._arrange()}var e=this;var f=function(){if(e.multiSelect){e.host.height(e.height)}e._arrange();if(e.multiSelect){e.host.height("auto")}};e.oldWidth=e.host.width();e.oldHeight=e.host.height();a.jqx.utilities.resize(this.host,function(){var i=e.host.width();var j=e.host.height();if(i!=e.oldWidth||j!=e.oldHeight){f();e.hideListBox("api")}e.oldWidth=i;e.oldHeight=j})},isOpened:function(){var c=this;var b=a.data(document.body,"openedCombojqxListBox"+this.element.id);if(this.container.css("display")!="block"){return false}if(b!=null&&b==c.listBoxContainer){return true}return false},_updateHandlers:function(){var e=this;var d=false;this.removeHandlers();if(this.multiSelect){this.addHandler(this.dropdownlistContent,"click",function(f){if(f.target.href){return false}e.input.focus();setTimeout(function(){e.input.focus()},10)});this.addHandler(this.dropdownlistContent,"focus",function(f){if(f.target.href){return false}e.input.focus();setTimeout(function(){e.input.focus()},10)})}if(!this.touch){if(this.host.parents()){this.addHandler(this.host.parents(),"scroll.combobox"+this.element.id,function(f){var g=e.isOpened();if(g){e.close()}})}this.addHandler(this.host,"mouseenter",function(){if(!e.disabled&&e.enableHover){d=true;e.host.addClass(e.toThemeProperty("jqx-combobox-state-hover"));if(e.dropDownVerticalAlignment=="top"){e.dropdownlistArrowIcon.addClass(e.toThemeProperty("jqx-icon-arrow-up"))}else{e.dropdownlistArrowIcon.addClass(e.toThemeProperty("jqx-icon-arrow-down-hover"))}e.dropdownlistArrow.addClass(e.toThemeProperty("jqx-combobox-arrow-hover"));e.dropdownlistArrow.addClass(e.toThemeProperty("jqx-fill-state-hover"))}});this.addHandler(this.host,"mouseleave",function(){if(!e.disabled&&e.enableHover){e.host.removeClass(e.toThemeProperty("jqx-combobox-state-hover"));e.dropdownlistArrowIcon.removeClass(e.toThemeProperty("jqx-icon-arrow-down-hover"));e.dropdownlistArrowIcon.removeClass(e.toThemeProperty("jqx-icon-arrow-up-hover"));e.dropdownlistArrow.removeClass(e.toThemeProperty("jqx-combobox-arrow-hover"));e.dropdownlistArrow.removeClass(e.toThemeProperty("jqx-fill-state-hover"));d=false}})}if(e.autoOpen){this.addHandler(this.host,"mouseenter",function(){var f=e.isOpened();if(!f&&e.autoOpen){e.open();e.host.focus()}});this.addHandler(a(document),"mousemove."+e.id,function(f){var m=e.isOpened();if(m&&e.autoOpen){var j=e.host.coord();var k=j.top;var i=j.left;var g=e.container.coord();var n=g.left;var l=g.top;var h=true;if(f.pageY>=k&&f.pageY<=k+e.host.height()+2){if(f.pageX>=i&&f.pageX<i+e.host.width()){h=false}}if(f.pageY>=l&&f.pageY<=l+e.container.height()-20){if(f.pageX>=n&&f.pageX<n+e.container.width()){h=false}}if(h){e.close()}}})}var c="mousedown";if(this.touch){c=a.jqx.mobile.getTouchEventName("touchstart")}var b=function(h){if(!e.disabled){var f=e.container.css("display")=="block";if(!e.i