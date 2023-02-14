/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxTree","",{});a.extend(a.jqx._jqxTree.prototype,{defineInstance:function(){var b={items:new Array(),width:null,height:null,easing:"easeInOutCirc",animationShowDuration:"fast",animationHideDuration:"fast",treeElements:new Array(),disabled:false,itemsMember:"",displayMember:"",valueMember:"",enableHover:true,keyboardNavigation:true,enableKeyboardNavigation:true,toggleMode:"dblclick",source:null,checkboxes:false,checkSize:16,toggleIndicatorSize:18,hasThreeStates:false,selectedItem:null,touchMode:"auto",allowDrag:true,allowDrop:true,searchMode:"startswithignorecase",incrementalSearch:true,incrementalSearchDelay:700,animationHideDelay:0,submitCheckedItems:false,dragStart:null,dragEnd:null,rtl:false,dropAction:"default",events:["expand","collapse","select","initialized","added","removed","checkChange","dragEnd","dragStart","itemClick"],aria:{"aria-activedescendant":{name:"getActiveDescendant",type:"string"},"aria-disabled":{name:"disabled",type:"boolean"}}};if(this===a.jqx._jqxTree.prototype){return b}a.extend(true,this,b);return b},createInstance:function(c){var b=this;this.host.attr("role","tree");this.host.attr("data-role","treeview");this.enableKeyboardNavigation=this.keyboardNavigation;this.propertyChangeMap.disabled=function(f,h,g,i){if(b.disabled){b.host.addClass(b.toThemeProperty("jqx-tree-disabled"))}else{b.host.removeClass(b.toThemeProperty("jqx-tree-disabled"))}a.jqx.aria(b,"aria-disabled",i)};if(this.width!=null&&this.width.toString().indexOf("px")!=-1){this.host.width(this.width)}else{if(this.width!=undefined&&!isNaN(this.width)){this.host.width(this.width)}}if(this.height!=null&&this.height.toString().indexOf("px")!=-1){this.host.height(this.height)}else{if(this.height!=undefined&&!isNaN(this.height)){this.host.height(this.height)}}if(this.width!=null&&this.width.toString().indexOf("%")!=-1){this.host.width(this.width)}if(this.height!=null&&this.height.toString().indexOf("%")!=-1){this.host.height(this.height)}if(!this.host.attr("tabindex")){this.host.attr("tabIndex",1)}if(this.disabled){this.host.addClass(this.toThemeProperty("jqx-tree-disabled"));a.jqx.aria(this,"aria-disabled",true)}if(this.host.jqxDragDrop){window.jqxTreeDragDrop()}this.originalInnerHTML=this.element.innerHTML;this.createdTree=false;if(this.element.innerHTML.indexOf("UL")){var e=this.host.find("ul:first");if(e.length>0){this.createTree(e[0]);this.createdTree=true}}if(this.source!=null){var d=this.loadItems(this.source);this.element.innerHTML=d;var e=this.host.find("ul:first");if(e.length>0){this.createTree(e[0]);this.createdTree=true}}this._itemslength=this.items.length;if(!this.createdTree){if(this.host.find("ul").length==0){this.host.append(a("<ul></ul>"));var e=this.host.find("ul:first");if(e.length>0){this.createTree(e[0]);this.createdTree=true}this.createdTree=true}}if(this.createdTree==true){this._render();this._handleKeys()}this._updateCheckLayout()},checkItems:function(f,h){var e=this;if(f!=null){var d=0;var g=false;var b=0;var i=a(f.element).find("li");b=i.length;a.each(i,function(j){var k=e.itemMapping["id"+this.id].item;if(k.checked!=false){if(k.checked==null){g=true}d++}});if(f!=h){if(d==b){this.checkItem(f.element,true,"tree")}else{if(d>0){this.checkItem(f.element,null,"tree")}else{this.checkItem(f.element,false,"tree")}}}else{var c=h.checked;var i=a(h.element).find("li");a.each(i,function(){var j=e.itemMapping["id"+this.id].item;e.checkItem(this,c,"tree")})}this.checkItems(this._parentItem(f),h)}else{var c=h.checked;var i=a(h.element).find("li");a.each(i,function(){var j=e.itemMapping["id"+this.id].item;e.checkItem(this,c,"tree")})}},_getMatches:function(e,f){if(e==undefined||e.length==0){return -1}var c=this.items;var b=new Array();for(var d=0;d<c.length;d++){if(this._isVisible(c[d])&&!c[d].disabled){b.push(c[d])}}c=b;if(f!=undefined){c=c.slice(f)}var g=new Array();a.each(c,function(j){var k=this.label;if(!k){k=""}var h=a.jqx.string.startsWithIgnoreCase(k.toString(),e);if(h){g.push({id:this.id,element:this.element})}});return g},_handleKeys:function(){var b=this;this.addHandler(this.host,"keydown",function(d){var s=d.keyCode;if(b.keyboardNavigation||b.enableKeyboardNavigation){if(b.selectedItem!=null){var l=b.selectedItem.element;if(b.incrementalSearch&&(!(s>=33&&s<=40))){var t=-1;if(!b._searchString){b._searchString=""}if((s==8||s==46)&&b._searchString.length>=1){b._searchString=b._searchString.substr(0,b._searchString.length-1)}var h=String.fromCharCode(s);var o=(!isNaN(parseInt(h)));var n=false;if((s>=65&&s<=97)||o||s==8||s==32||s==46){if(!d.shiftKey){h=h.toLocaleLowerCase()}if(s!=8&&s!=32&&s!=46){if(!(b._searchString.length>0&&b._searchString.substr(0,1)==h)){b._searchString+=h}}if(s==32){b._searchString+=" "}b._searchTime=new Date();var r=b.selectedItem;if(r){var g=r.id;var m=-1;for(var k=0;k<b.items.length;k++){if(b.items[k].id==g){m=k+1;break}}var f=b._getMatches(b._searchString,m);if(f.length==0||(f.length>0&&f[0].id==g)){var f=b._getMatches(b._searchString)}}else{var f=b._getMatches(b._searchString)}if(f.length>0){var r=b.selectedItem;if(b.selectedItem&&b.selectedItem.id!=f[0].id){b.clearSelection();b.selectItem(f[0].element,"keyboard")}b._lastSearchString=b._searchString}}if(b._searchTimer!=undefined){clearTimeout(b._searchTimer)}if(s==27||s==13){b._searchString="";b._lastSearchString=""}b._searchTimer=setTimeout(function(){b._searchString="";b._lastSearchString=""},500);if(t>=0){return}if(n){return false}}switch(s){case 32:if(b.checkboxes){b.fromKey=true;var q=a(b.selectedItem.checkBoxElement).jqxCheckBox("checked");b.checkItem(b.selectedItem.element,!q,"tree");if(b.hasThreeStates){b.checkItems(b.selectedItem,b.selectedItem)}return false}return true;case 33:var j=b._getItemsOnPage();var p=b.selectedItem;for(var k=0;k<j;k++){p=b._prevVisibleItem(p)}if(p!=null){b.selectItem(p.element,"keyboard");b.ensureVisible(p.element)}else{b.selectItem(b._firstItem().element,"keyboard");b.ensureVisible(b._firstItem().element)}return false;case 34:var j=b._getItemsOnPage();var c=b.selectedItem;for(var k=0;k<j;k++){c=b._nextVisibleItem(c)}if(c!=null){b.selectItem(c.element,"keyboard");b.ensureVisible(c.element)}else{b.selectItem(b._lastItem().element,"keyboard");b.ensureVisible(b._lastItem().element)}return false;case 37:case 39:if((s==37&&!b.rtl)||(s==39&&b.rtl)){if(b.selectedItem.hasItems&&b.selectedItem.isExpanded){b.collapseItem(l)}else{var e=b._parentItem(b.selectedItem);if(e!=null){b.selectItem(e.element,"keyboard");b.ensureVisible(e.element)}}}if((s==39&&!b.rtl)||(s==37&&b.rtl)){if(b.selectedItem.hasItems){if(!b.selectedItem.isExpanded){b.expandItem(l)}else{var c=b._nextVisibleItem(b.selectedItem);if(c!=null){b.selectItem(c.element,"keyboard");b.ensureVisible(c.element)}}}}return false;case 13:if(b.selectedItem.hasItems){if(b.selectedItem.isExpanded){b.collapseItem(l)}else{b.expandItem(l)}}return false;case 36:b.selectItem(b._firstItem().element,"keyboard");b.ensureVisible(b._firstItem().element);return false;case 35:b.selectItem(b._lastItem().element,"keyboard");b.ensureVisible(b._lastItem().element);return false;case 38:var p=b._prevVisibleItem(b.selectedItem);if(p!=null){b.selectItem(p.element,"keyboard");b.ensureVisible(p.element)}return false;case 40:var c=b._nextVisibleItem(b.selectedItem);if(c!=null){b.selectItem(c.element,"keyboard");b.ensureVisible(c.element)}return false}}}})},_firstItem:function(){var e=null;var d=this;var g=this.host.find("ul:first");var f=a(g).find("li");for(var c=0;c<=f.length-1;c++){var b=f[c];e=this.itemMapping["id"+b.id].item;if(d._isVisible(e)){return e}}return null},_lastItem:function(){var e=null;var d=this;var g=this.host.find("ul:first");var f=a(g).find("li");for(var c=f.length-1;c>=0;c--){var b=f[c];e=this.itemMapping["id"+b.id].i