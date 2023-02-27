/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxTreeGrid","jqxDataTable",{});a.extend(a.jqx._jqxTreeGrid.prototype,{defineInstance:function(){if(this.base){this.base.treeGrid=this;this.base.exportSettings={recordsInView:false,columnsHeader:true,hiddenColumns:false,serverURL:null,characterSet:null,collapsedRecords:false,fileName:"jqxTreeGrid"}}var b={pageSizeMode:"default",checkboxes:false,hierarchicalCheckboxes:false,icons:false,showSubAggregates:false,aggregatesPosition:"top",rowDetailsRenderer:null,virtualModeCreateRecords:null,virtualModeRecordCreating:null,loadingFailed:false};if(this===a.jqx._jqxTreeGrid.prototype){return b}a.extend(true,this,b);return b},createInstance:function(b){this.theme=this.base.theme;var c=this},deleteRow:function(b){var c=this.base;c.deleterowbykey(b)},updateRow:function(b,d){var c=this.base;c.updaterowbykey(b,d)},setCellValue:function(c,b,e){var d=this.base;d.setCellValueByKey(c,b,e)},getCellValue:function(c,b){var d=this.base;return d.getCellValueByKey(c,b)},lockRow:function(b){var c=this.base;c.lockrowbykey(b)},unlockRow:function(b){var c=this.base;c.unlockrowbykey(b)},selectRow:function(b){var c=this.base;c.selectrowbykey(b)},unselectRow:function(b){var c=this.base;c.unselectrowbykey(b)},ensureRowVisible:function(b){var c=this.base;c.ensurerowvisiblebykey(b)},beginCellEdit:function(c,b){var e=this.base;var d=e.getColumn(b);e.beginroweditbykey(c,d)},beginRowEdit:function(b){var c=this.base;c.beginroweditbykey(b)},endCellEdit:function(c,b,e){var d=this.base;d.endroweditbykey(c,e)},endRowEdit:function(b,d){var c=this.base;c.endroweditbykey(b,d)},_showLoadElement:function(){var b=this.base;if(b.host.css("display")=="block"){if(b.autoShowLoadElement){a(b.dataloadelement).css("visibility","visible");a(b.dataloadelement).css("display","block");b.dataloadelement.width(b.host.width());b.dataloadelement.height(b.host.height())}}},_hideLoadElement:function(){var b=this.base;if(b.host.css("display")=="block"){if(b.autoShowLoadElement){a(b.dataloadelement).css("visibility","hidden");a(b.dataloadelement).css("display","none");b.dataloadelement.width(b.host.width());b.dataloadelement.height(b.host.height())}}},getKey:function(b){if(b){return b.uid}},getRows:function(){var b=this.base;if(b.source.hierarchy){if(b.source.hierarchy.length!=0){return b.source.hierarchy}}return b.source.records},getCheckedRows:function(){var c=this.base;var d=c._names();var e=new Array();var b=function(j,g){if(!g){return}for(var h=0;h<g.length;h++){if(!g[h]){continue}var f=a.extend({},g[h]);var k=c.rowinfo[g[h].uid];if(k&&k[d.checked]){j.push(f)}else{if(f[d.checked]){j.push(f)}}b(e,g[h].records)}};b(e,c.dataViewRecords);return e},getRow:function(d){var e=this.base;var b=e.source.records;if(e.source.hierarchy){var f=function(h){for(var j=0;j<h.length;j++){if(!h[j]){continue}if(h[j].uid==d){return h[j]}if(h[j].records){var k=f(h[j].records);if(k){return k}}}};var g=f(e.source.hierarchy);return g}else{for(var c=0;c<b.length;c++){if(!b[c]){continue}if(b[c].uid==d){return b[c]}}}},_renderrows:function(){var N=this.base;var at=this;if(N._loading){return}if(N._updating){return}var J=N._names();if(N.source.hierarchy.length===0&&!N.loadingFailed){if(this.virtualModeCreateRecords){var an=function(c){if(c===false||(c&&c.length==0)){N._loading=false;N.loadingFailed=true;N.source.hierarchy=new Array();at._hideLoadElement();N._renderrows();N._updateScrollbars();N._arrange();return}for(var j=0;j<c.length;j++){c[j].level=0;at.virtualModeRecordCreating(c[j]);N.rowsByKey[c[j].uid]=c[j]}N.source.hierarchy=c;if(!N.source._source.hierarchy){N.source._source.hierarchy={}}N._loading=false;at._hideLoadElement();N._renderrows();N._updateScrollbars();N._arrange()};N._loading=true;this.virtualModeCreateRecords(null,an);this._showLoadElement()}}if(N.rendering){N.rendering()}var az=0;N.table[0].rows=new Array();var aJ=N.toTP("jqx-cell")+" "+N.toTP("jqx-widget-content")+" "+N.toTP("jqx-item");if(N.rtl){aJ+=" "+N.toTP("jqx-cell-rtl")}var b=N.columns.records.length;var P=a.jqx.browser.msie&&a.jqx.browser.version<8;if(P){N.host.attr("hideFocus","true")}var v=new Array();var aG=function(s,w){for(var aK=0;aK<s.length;aK++){var c=s[aK];if(!