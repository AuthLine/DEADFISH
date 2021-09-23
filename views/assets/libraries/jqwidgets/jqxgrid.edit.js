/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.extend(a.jqx._jqxGrid.prototype,{_handledblclick:function(t,n){if(t.target==null){return}if(n.disabled){return}if(a(t.target).ischildof(this.columnsheader)){return}var w;if(t.which){w=(t.which==3)}else{if(t.button){w=(t.button==2)}}if(w){return}var C;if(t.which){C=(t.which==2)}else{if(t.button){C=(t.button==1)}}if(C){return}var v=this.showheader?this.columnsheader.height()+2:0;var o=this._groupsheader()?this.groupsheader.height():0;var B=this.showtoolbar?this.toolbarheight:0;var z=this.showfilterbar?this.toolbarheight:0;o+=B;o+=z;var e=this.host.offset();var m=t.pageX-e.left;var l=t.pageY-v-e.top-o;var b=this._hittestrow(m,l);if(!b){return}var h=b.row;var j=b.index;var q=t.target.className;var p=this.table[0].rows[j];if(p==null){return}n.mousecaptured=true;n.mousecaptureposition={left:t.pageX,top:t.pageY-o};var r=this.hScrollInstance;var s=r.value;var d=0;var k=this.groupable?this.groups.length:0;for(var u=0;u<p.cells.length;u++){var f=parseInt(a(this.columnsrow[0].cells[u]).css("left"));var g=f-s;if(n.columns.records[u].pinned){g=f}var c=this._getcolumnat(u);if(c!=null&&c.hidden){continue}var A=g+a(this.columnsrow[0].cells[u]).width();if(A>=m&&m>=g){d=u;break}}if(h!=null){var c=this._getcolumnat(d);if(!(q.indexOf("jqx-grid-group-expand")!=-1||q.indexOf("jqx-grid-group-collapse")!=-1)){if(h.boundindex!=-1){n.begincelledit(n.getboundindex(h),c.datafield,c.defaulteditorvalue)}}}},_getpreveditablecolumn:function(c){var b=this;while(c>0){c--;var d=b.getcolumnat(c);if(!d){return null}if(!d.editable){continue}if(!d.hidden){return d}}return null},_getnexteditablecolumn:function(c){var b=this;while(c<this.columns.records.length){c++;var d=b.getcolumnat(c);if(!d){return null}if(!d.editable){continue}if(!d.hidden){return d}}return null},_handleeditkeydown:function(T,j){if(j.handlekeyboardnavigation){var L=j.handlekeyboardnavigation(T);if(L==true){return true}}var u=T.charCode?T.charCode:T.keyCode?T.keyCode:0;j.editEvent=T;if(j.showfilterrow&&j.filterable){if(this.filterrow){if(a(T.target).ischildof(this.filterrow)){return true}}}if(T.target.className&&T.target.className.indexOf("jqx-grid-widget")>=0){return true}if(j.pageable){if(a(T.target).ischildof(this.pager)){return true}}if(this.showtoolbar){if(a(T.target).ischildof(this.toolbar)){return true}}if(this.showeverpresentrow){if(this.addnewrowtop){if(a(T.target).ischildof(this.addnewrowtop)){return true}}if(this.addnewrowbottom){if(a(T.target).ischildof(this.addnewrowbottom)){return true}}}if(this.showstatusbar){if(a(T.target).ischildof(this.statusbar)){return true}}if(this.rowdetails){if(a(T.target).ischildof(this.content.find("[role='rowgroup']"))){return true}}if(this.editcell){if(this.editmode==="selectedrow"){if(u===13){this.endrowedit(this.editcell.row,false);return false}else{if(u===27){this.endrowedit(this.editcell.row,true);return false}}if(u==32){if(this._currentColumn&&this.getcolumn(this._currentColumn).columntype=="checkbox"){var M=this.getcolumn(this._currentColumn);if(M.editable){var A=!this.getcellvalue(this.editcell.row,M.datafield);var H=this.getrowdata(this.editcell.row);var s=this.editcell.row;var H=j.getrowdata(j.editcell.row);this.pushToHistory=true;this.setcellvalue(this.editcell.row,M.datafield,A,false);this.pushToHistory=false;var k=this._focusedColumn;var d=this._currentColumn;var f=this._currentEditableColumn;this.endrowedit(this.editcell.row,false);this.beginrowedit(s,false);this._currentColumn=d;this._focusedColumn=k;this._currentEditableColumn=f;this._renderrows();this.selectcell(s,M.datafield);this._oldselectedcell=this.selectedcell;if(k){var G=this;setTimeout(function(){G.selectcell(s,M.datafield);G._oldselectedcell=G.selectedcell;a(G._checkboxCells[M.datafield].checkbox).jqxCheckBox("focus")},25)}return false}}}if(u===9){var K=this.editcell.datafield;var e=this._getcolumnindex(K);if(this._currentEditableColumn){e=this._currentEditableColumn}else{this._currentEditableColumn=e}var M=this._getnexteditablecolumn(e);if(T.shiftKey||this.rtl){M=this._getpreveditablecolumn(e)}if(M){var e=this._getcolumnindex(M.datafield);if(this.editcell[M.datafield]){this._currentEditableColumn=e;var b=this.editcell[M.datafield].editor;if(b){if(b.data().jqxWidget&&b.data().jqxWidget.focus){b.data().jqxWidget.focus()}else{b.focus();b[0].onkeyup=function(){if(j.gridcontent[0].scrollTop!=0){j.scrolltop(Math.abs(j.gridcontent[0].scrollTop));j.gridcontent[0].scrollTop=0}if(j.gridcontent[0].scrollLeft!=0){j.gridcontent[0].scrollLeft=0}}}}this._focusedColumn=M.datafield;this._currentColumn=M.datafield;if(this.gridcontent[0].scrollTop!=0){this.scrolltop(Math.abs(this.gridcontent[0].scrollTop));this.gridcontent[0].scrollTop=0}if(this.gridcontent[0].scrollLeft!=0){this.gridcontent[0].scrollLeft=0}}else{if(M.columntype=="checkbox"){this._currentColumn=M.datafield;this._currentEditableColumn=e;this.selectcell(this.editcell.row,M.datafield);this._oldselectedcell=this.selectedcell;if(this._checkboxCells[M.datafield]){a(this._checkboxCells[M.datafield].checkbox).jqxCheckBox("focus")}return false}}}return false}return true}if(this.editcell.columntype==null||this.editcell.columntype=="textbox"||this.editcell.columntype=="numberinput"||this.editcell.columntype=="combobox"||this.editcell.columntype=="datetimeinput"){if(u>=33&&u<=40&&j.selectionmode=="multiplecellsadvanced"){var b=this.editcell.columntype=="textbox"||this.editcell.columntype==null?this.editcell.editor:this.editcell.editor.find("input");var p=j._selection(b);var J=b.val().length;if(p.length>0&&this.editcell.columntype!="datetimeinput"){j._cancelkeydown=true}if(p.start>0&&u==37){j._cancelkeydown=true}if(p.start<J&&u==39&&this.editcell.columntype!="datetimeinput"){j._cancelkeydown=true}if(this.editcell.columntype=="datetimeinput"&&u==39){if(p.start+p.length<J){j._cancelkeydown=true}}}}else{if(this.editcell.columntype=="dropdownlist"){if(u==37||u==39&&j.selectionmode=="multiplecellsadvanced"){j._cancelkeydown=false}}else{if(this.selectionmode=="multiplecellsadvanced"&&this.editcell.columntype!="textbox"&&this.editcell.columntype!="numberinput"){j._cancelkeydown=true}}}if(u==32){if(j.editcell.columntype=="checkbox"){var M=j.getcolumn(j.editcell.datafield);if(M.editable){var A=!j.getcellvalue(j.editcell.row,j.editcell.column);if(M.cellbeginedit){var n=M.cellbeginedit(j.editcell.row,M.datafield,M.columntype,!A);if(n==false){return false}}var H=j.getrowdata(j.editcell.row);j.pushToHistory=true;j.setcellvalue(j.editcell.row,j.editcell.column,A,true);j.pushToHistory=false;j._raiseEvent(18,{rowindex:j.editcell.row,row:H,datafield:j.editcell.column,oldvalue:!A,value:A,columntype:"checkbox"});return false}}}if(u==9){var l=this.editcell.row;var K=this.editcell.column;var i=K;var e=j._getcolumnindex(K);var D=false;var I=j.getrowvisibleindex(l);var N=l;this.editchar="";var t=this.editcell.validated;if(!this.editcell.validated){var t=this.endcelledit(this.editcell.row,this.editcell.column,false,true,false)}if(t!=false){if(T.shiftKey||this.rtl){var M=j._getpreveditablecolumn(e);if(M){K=M.datafield;D=true;if(j.selectionmode.indexOf("cell")!=-1){j.selectprevcell(l,i);j._oldselectedcell=j.selectedcell;setTimeout(function(){j.ensurecellvisible(I,K)},10)}}else{var r=j._getlastvisiblecolumn();D=true;K=r.displayfield;var h=j.getdisplayrows()[I-1];if(h){l=h.dataindex;if(l===undefined){l=h.boundindex}I=j.getrowvisibleindex(l)}var y=true;if(j.pageable){var Q=Math.floor(I/this.pagesize);if(this.dataview.pagenum!=Q){y=false}}if(y&&j.selectionmode.indexOf("cell")!=-1){j.clearselection();j.selectcell(l,K);j._oldselectedcell=j.selectedcell;setTimeout(function(){j.ensurecellvisible(I,K)},10)}}}else{var M=j._getnexteditablecolumn(e);if(M){K=M.datafield;D=true;if(j.selectionmode.indexOf("cell")!=-1){j.selectnextcell(l,i);j._oldselectedcell=j.selectedcell;setTimeout(function(){j.ensurecellvisible(I,K)},10)}}else{var x=j._getfirstvisiblecolumn();D=true;K=x.displayfield;var h=j.getdisplayrows()[I+1];if(h){l=h.dataindex;if(l===undefined){l=h.boundindex}I=j.getrowvisibleindex(l)}var y=true;if(j.pageable){var Q=Math.floor(I/this.pagesize);if(this.dataview.pagenum!=Q){y=false}}if(j.selectionmode.indexOf("cell")!=-1){if(y){j.clearselection();j.selectcell(l,K);j._oldselectedcell=j.selectedcell;setTimeout(function(){j.ensurecellvisible(I,K)},10)}}}}if(D){if(j.pageable){var Q=Math.floor(I/this.pagesize);if(this.dataview.pagenum!=Q){this._renderrows(this.virtualsizeinfo);if(j.selectionmode.indexOf("cell")!=-1){j.clearselection();j.selectcell(N,i);j._oldselectedcell=j.selectedcell}if(Q>this.dataview.pagenum){setTimeout(function(){j.pagerpageinput.focus()},25)}return}}j.begincelledit(l,K);if(this.editcell!=null&&this.editcell.columntype=="checkbox"){this._renderrows(this.virtualsizeinfo)}}else{if(this.editcell!=null){j.endcelledit(l,K,false);this._renderrows(this.virtualsizeinfo)}return true}}return false}else{if(u==13){var F=this.selectedcell;if(F){var z=this.getrowvisibleindex(F.rowindex)}this.endcelledit(this.editcell.row,this.editcell.column,false,true);if(this.selectionmode=="multiplecellsadvanced"){var B=j.getselectedcell();if(B!=null){if(j.selectcell){if(this.editcell==null){if(B.rowindex+1<this.dataview.totalrecords){if(this.sortcolumn!=B.datafield){var I=this.getrowvisibleindex(B.rowindex);var q=this.dataview.loadedrecords[I+1];if(q){if(!this.pageable||(this.pageable&&I+1<(this.dataview.pagenum+1)*this.pagesize)){this.clearselection(false);this.selectcell(this.getboundindex(q),B.datafield);var B=this.getselectedcell();this.ensurecellvisible(q.visibleindex,B.datafield)}}}else{if(F!=null){var S=this.dataview.loadedrecords[z+1];if(S){if(!this.pageable||(this.pageable&&z+1<this.pagesize)){this.clearselection(false);this.selectcell(this.getboundindex(S),B.datafield)}else{if(this.pageable&&z+1>=this.pagesize){this.clearselection(false);var S=this.dataview.loadedrecords[z];this.selectcell(this.getboundindex(S),B.datafield)}}}}}}}}}}return false}else{if(u==27){this.endcelledit(this.editcell.row,this.editcell.column,true,true);return false}}}}else{var O=false;if(u==113){O=true}if(!T.ctrlKey&&!T.altKey&&!T.metaKey){if(u>=48&&u<=57){this.editchar=String.fromCharCode(u);O=true}if(u===189){O=true}if(u>=65&&u<=90){this.editchar=String.fromCharCode(u);var o=false;if(T.shiftKey){o=T.shiftKey}else{if(T.modifiers){o=!!(T.modifiers&4)}}if(this._capsLock){o=!o}if(!o){this.editchar=this.editchar.toLowerCase()}O=true}else{if(u>=96&&u<=105){this.editchar=u-96;this.editchar=this.editchar.toString();O=true}}var C=a(".jqx-grid").length;O=O&&(C==1||(C>1&&j.focused));var R=a.data(document.body,"jqxgrid.edit");if(R!==undefined&&R!==""){if(u===13||O){if(R!=j.element.id){return true}}}}if(u==13||O){if(j.getselectedrowindex){var l=j.getselectedrowindex();if(j.editmode==="selectedrow"){if(l>=0){j.beginrowedit(l)}else{var B=j.getselectedcell();if(B!=null){var M=j._getcolumnbydatafield(B.datafield);j.beginrowedit(B.rowindex)}return false}}switch(j.selectionmode){case"singlerow":case"multiplerows":case"multiplerowsextended":if(l>=0){var K="";for(var P=0;P<j.columns.records.length;P++){var M=j.getcolumnat(P);if(M.editable){K=M.datafield;break}}if(j.editmode==="selectedrow"){j.beginrowedit(l)}else{j.begincelledit(l,K)}}break;case"singlecell":case"multiplecells":case"multiplecellsextended":var B=j.getselectedcell();if(B!=null){var M=j._getcolumnbydatafield(B.datafield);if(j.editmode==="selectedrow"){j.beginrowedit(B.rowindex)}else{if(M.columntype!="checkbox"){j.begincelledit(B.rowindex,B.datafield)}}}break;case"multiplecellsadvanced":var B=j.getselectedcell();if(B!=null){if(u==13){if(j.selectcell){var I=this.getrowvisibleindex(B.rowindex);if(I+1<j.dataview.totalrecords){var q=this.dataview.loadedrecords[I+1];if(q){this.clearselection(false);this.selectcell(this.getboundindex(q),B.datafield);var B=this.getselectedcell();this.ensurecellvisible(q.visibleindex,B.datafield)}}}}else{if(j.editmode!=="selectedrow"){j.begincelledit(B.rowindex,B.datafield,null,false)}}}break}return false}}if(u==46){var v=j.getselectedcells();if(j.selectionmode.indexOf("cell")==-1){if(j._getcellsforcopypaste){v=j._getcellsforcopypaste()}}if(v!=null&&v.length>0){for(var w=0;w<v.length;w++){var B=v[w];if(!B.datafield){continue}var M=j.getcolumn(B.datafield);var E=j.getcellvalue(B.rowindex,B.datafield);if(E!==""&&M.editable&&j.enablekeyboarddelete){var c=null;if(M.columntype=="checkbox"){if(!M.threestatecheckbox){c=false}}if(M.cellbeginedit){var n=M.cellbeginedit(B.rowindex,M.datafield,M.columntype,c);if(n==false){return false}}var H=j.getrowdata(B.rowindex);j._raiseEvent(17,{rowindex:B.rowindex,row:H,datafield:B.datafield,value:E});j.pushToHistory=true;if(w==v.length-1){j.setcellvalue(B.rowindex,B.datafield,c,true);if(M.displayfield!=M.datafield){j.setcellvalue(B.rowindex,M.displayfield,c,true)}}else{j.setcellvalue(B.rowindex,B.datafield,c,false);if(M.displayfield!=M.datafield){j.setcellvalue(B.rowindex,M.displayfield,c,true)}}j.pushToHistory=false;if(M.cellendedit){var g=M.cellendedit(B.rowindex,M.datafield,M.columntype,c)}j._raiseEvent(18,{rowindex:B.rowindex,row:H,datafield:B.datafield,oldvalue:E,value:c})}}this.dataview.updateview();this._renderrows(this.virtualsizeinfo);return false}}if(u==32){var B=j.getselectedcell();if(B!=null){var M=j.getcolumn(B.datafield);if(M.columntype=="checkbox"&&M.editable){var A=!j.getcellvalue(B.rowindex,B.datafield);if(M.cellbeginedit){var n=M.cellbeginedit(B.rowindex,M.datafield,M.columntype,!A);if(n==false){return false}}var H=j.getrowdata(B.rowindex);j._raiseEvent(17,{rowindex:B.rowindex,row:H,datafield:B.datafield,value:!A,columntype:"checkbox"});j.pushToHistory=true;j.setcellvalue(B.rowindex,B.datafield,A,true);j.pushToHistory=false;j._raiseEvent(18,{rowindex:B.rowindex,row:H,datafield:B.datafield,oldvalue:!A,value:A,columntype:"checkbox"});return false}}}}return true},begincelledit:function(o,e,l,g,c){var f=this.getcolumn(e);this._cellscache=new Array();if(e==null){return}if(f.columntype=="number"||f.columntype=="button"||f.createwidget){return}if(this.groupable){if(this.groups.indexOf(e)>=0){return}if(this.groups.indexOf(f.displayfield)>=0){return}}if(this.editrow!=undefined){return}if(this.editcell){if(this.editcell.row==o&&this.editcell.column==e){return true}if(this.editmode==="selectedrow"){if(this.editcell.row==o){return}}var d=this.endcelledit(this.editcell.row,this.editcell.column,false,true,false);if(false==d){return}}var i=f.columntype=="checkbox"||f.columntype=="button"||f.createwidget;this.host.removeClass("jqx-disableselect");this.content.removeClass("jqx-disableselect");if(f.editable){if(f.cellbeginedit){var k=this.getcell(o,e);var m=f.cellbeginedit(o,e,f.columntype,k!=null?k.value:null);if(m==false){return}}var j=this.getrowvisibleindex(o);this.editcell=this.getcell(o,e);if(this.editcell){this.editcell.visiblerowindex=j;if(!this.editcell.editing){if(!i){this.editcell.editing=true}this.editcell.columntype=f.columntype;this.editcell.defaultvalue=l;if(f.defaultvalue!=undefined){this.editcell.defaultvalue=f.defaultvalue}this.editcell.init=true;if(f.columntype!="checkbox"&&this.editmode!="selectedrow"){var h=this.getrowdata(o);this._raiseEvent(17,{rowindex:o,row:h,datafield:f.datafield,value:this.editcell.value,columntype:f.columntype})}a.data(document.body,"jqxgrid.edit",this.element.id);if(!i){var b=this.getrowvisibleindex(o);if(g!==false){if(!this.autorowheight&&this.groups.length===0){var n=this.ensurecellvisible(b,f.datafield)}}if(c!==false){this._renderrows(this.virtualsizeinfo)}}if(this.editcell){this.editcell.init=false;return true}}}}else{if(!this.editcell){this.editchar="";return}this.editchar="";this.editcell.editor=null;this.editcell.editing=false;if(c!==false){this._renderrows(this.virtualsizeinfo)}this.editcell=null}},getScrollTop:function(){if(this._py){return this._py}this._py=typeof pageYOffset!="undefined";if(this._py){return pageYOffset}else{var c=document.body;var b=document.documentElement;b=(b.clientHeight)?b:c;return b.scrollTop}},getScrollLeft:function(){if(typeof pageXOffset!="undefined"){return pageXOffset}else{var c=document.body;var b=document.documentElement;b=(b.clientHeight)?b:c;return b.scrollLeft}},endcelledit:function(h,o,k,e,p){if(h==undefined||o==undefined){if(this.editcell){h=this.editcell.row;o=this.editcell.column}if(k==undefined){k=true}}if(!this.editcell){return}var d=this.getcolumn(o);var v=this;if(v.editmode==="selectedrow"){this.endrowedit(h,k);return}var u=function(){if(p!=false){if(v.isTouchDevice()){return}if(!v.isNestedGrid){var w=v.getScrollTop();var y=v.getScrollLeft();try{v.element.focus();v.content.focus();if(w!=v.getScrollTop()){window.scrollTo(y,w)}setTimeout(function(){v.element.focus();v.content.focus();if(w!=v.getScrollTop()){window.scrollTo(y,w)}},10)}catch(x){}}}};if(d.columntype=="checkbox"||d.columntype=="button"||d.createwidget){if(this.editcell){this.editcell.editor=null;this.editcell.editing=false;this.editcell=null}return true}var i=this._geteditorvalue(d);var g=function(x){x._hidecelleditor();if(d.cellendedit){d.cellendedit(h,o,d.columntype,x.editcell.value,i)}x.editchar=null;var z;if(d.displayfield!=d.datafield){var w=x.getcellvalue(x.editcell.row,d.displayfield);var y=x.editcell.value;z={value:y,label:w}}else{z=x.editcell.value}var A=x.getrowdata(h);x._raiseEvent(18,{rowindex:h,row:A,datafield:o,displayfield:d.displayfield,oldvalue:i,value:i,columntype:d.columntype});x.editcell.editor=null;x.editcell.editing=false;x.editcell=null;if(e||e==undefined){x._renderrows(x.virtualsizeinfo)}u();if(!x.enablebrowserselection){x.host.addClass("jqx-disableselect");x.content.addClass("jqx-disableselect")}};if(k){g(this);return false}if(this.validationpopup){this.validationpopup.hide();this.validationpopuparrow.hide()}if(d.cellvaluechanging){var b=d.cellvaluechanging(h,o,d.columntype,this.editcell.value,i);if(b!=undefined){i=b}}if(d.validation){var c=this.getcell(h,o);try{var q=d.validation(c,i);var m=this.gridlocalization.validationstring;if(q.message!=undefined){m=q.message}var n=typeof q=="boolean"?q:q.result;if(!n){if(q.showmessage==undefined||q.showmessage==true){this._showvalidationpopup(h,o,m)}this.editcell.validated=false;return false}}catch(s){this._showvalidationpopup(h,o,this.gridlocalization.validationstring);t