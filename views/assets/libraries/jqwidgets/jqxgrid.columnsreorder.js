/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.extend(a.jqx._jqxGrid.prototype,{getcolumnindex:function(b){var c=this.getcolumn(b);var d=this.columns.records.indexOf(c);return d},setcolumnindex:function(d,h,i){var g=this.getcolumn(d);if(g.pinned){return}if(g.hidden){return}if(g.checkboxcolumn){return}if(g.grouped){return}var k=this.columns.records.indexOf(g);this.columns.records.splice(k,1);this.columns.records.splice(h,0,g);var e=0;var m=this.headerZIndex;this.columnsrow.children().detach();var j=this.toThemeProperty("jqx-grid-cell");j+=" "+this.toThemeProperty("jqx-grid-cell-pinned");if(this.filterrow){a(this.filterrow.children()[0]).children().detach();this.filterrow[0].cells=[]}var l=this;var b=null;if(l.filterrow!=undefined){var b=a(l.filterrow.children()[0])}this.columnsrow[0].cells=[];var f=false;a.each(this.columns.records,function(n,q){var o=this.uielement;l.columnsrow.append(o);if(!l.rtl){o.css("z-index",m--)}else{o.css("z-index",m++)}var p=this.width;o.css("left",e);l.columnsrow[0].cells[l.columnsrow[0].cells.length]=o[0];if(l.filterrow){var r=a('<div style="overflow: hidden; position: absolute; height: 100%;" class="'+j+'"></div>');b.append(r);r.css("left",e);r.css("z-index",m+1);r.width(this.width);r[0].left=e;r.append(this._filterwidget);l.filterrow[0].cells[l.filterrow[0].cells.length]=r[0]}if(this.hidden){f=true}if(!(this.hidden&&this.hideable)){e+=p}});if(this.groupable){var c=this.groups.length;if(c>0){if(k-c>=0){k-=c;h-=c}}}if(this.rowdetails){if(k-1>=0){k--;h--}}if(this.selectionmode=="checkbox"){if(k-1>=0){k--;h--}}var g=this._columns[k];this._columns.splice(k,1);this._columns.splice(h,0,g);this._raiseEvent(24,{columntext:g.text,datafield:g.datafield,oldindex:k,newindex:h});if(i==false){return}if(f||g.columntype=="checkbox"){this.prerenderrequired=true;this.rendergridcontent(true,false);this._updatecolumnwidths();this._updatecellwidths()}else{this._updatecolumnwidths();this._updatecellwidths()}if(this._updatefilterrowui&&this.filterable&&this.showfilterrow){this._updatefilterrowui()}if(this.showeverpresentrow){this._updateaddnewrowui()}this._rendercolumngroups();this._renderrows(this.virtualsizeinfo)},_pinnedColumnsLength:function(){var b=0;a.each(this.columns.records,function(){if(this.pinned){b++}if(this.grouped){b++}});if(this.selectionmode=="checkbox"){b++}return b},_handlecolumnsreorder:function(){var d=this;var g=-1;var c=false;if(!d.columnsreorder){return}var f="mousemove.reorder"+this.element.id;var e="mousedown.reorder"+this.element.id;var h="mouseup.reorder"+this.element.id;var b=false;if(this.isTouchDevice()&&this.touchmode!==true){b=true;f=a.jqx.mobile.getTouchEventName("touchmove")+".reorder"+this.element.id;e=a.jqx.mobile.getTouchEventName("touchstart")+".reorder"+this.element.id;h=a.jqx.mobile.getTouchEventName("touchend")+".reorder"+this.element.id}this.removeHandler(a(document),f);this.addHandler(a(document),f,function(j){if(d.resizing){return true}if(d.reordercolumn!=null){var k=parseInt(j.pageX);var r=parseInt(j.pageY);if(b){var o=d.getTouches(j);var n=o[0];if(n!=undefined){k=parseInt(n.pageX);r=parseInt(n.pageY)}}var m=d.host.coord();var s=parseInt(m.left);var t=parseInt(m.top);if(d.dragmousedownoffset==undefined||d.dragmousedownoffset==null){d.dragmousedownoffset={left:0,top:0}}var q=parseInt(k)-parseInt(d.dragmousedownoffset.left);var i=parseInt(r)-parseInt(d.dragmousedownoffset.top);d.reordercolumn.css({left:q+"px",top:i+"px"});c=false;if(k>=s&&k<=s+d.host.width()){if(r>=t&&r<=t+d.host.height()){c=true}}g=-1;if(c){d.reordercolumnicon.removeClass(d.toThemeProperty("jqx-grid-dragcancel-icon"));d.reordercolumnicon.addClass(d.toThemeProperty("jqx-grid-drag-icon"));var p=d.columnsheader.coord();var l=p.top+d.columnsheader.height();if(d.columnsdropline!=null){if(r>=p.top&&r<=l){g=d._handlereordercolumnsdroplines(k)}else{d.columnsdropline.fadeOut("slow")}}}else{if(d.columnsdropline!=null){d.columnsdropline.fadeOut("slow")}d.reordercolumnicon.removeClass(d.toThemeProperty("jqx-grid-drag-icon"));d.reordercolumnicon.addClass(d.toThemeProperty("jqx-grid-dragcancel-icon"))}if(b){j.preventDefault();j.stopPropagation();return false}}});this.columnsbounds=new Array();this.removeHandler(a(document),e);this.addHandler(a(document),e,function(j){if(d.resizing){return true}d.columnsbounds=new Array();var l=d.host.coord().left;var k=d.host.coord().top;if(d.showtoolbar){k+=d.toolbarheight}if(d.groupable&&d.showgroupsheader){k+=d.groupsheaderheight}var i=0;a.each(d.columns.records,function(n){var o=this;if(o.hidden){d.columnsbounds[d.columnsbounds.length