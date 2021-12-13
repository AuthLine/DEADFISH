/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.extend(a.jqx._jqxGrid.prototype,{selectallrows:function(){this._trigger=false;var e=this.virtualmode?this.dataview.totalrecords:this.dataview.loadedrecords.length;this.selectedrowindexes=new Array();this.selectedcells=new Array();var f=this.dataview.loadedrecords;for(var d=0;d<e;d++){var g=f[d];if(!g){this.selectedrowindexes[d]=d;continue}var b=this.getboundindex(g);if(b!=undefined){this.selectedrowindexes[d]=b}for(var c=0;c<this.columns.records.length;c++){this.selectedcells[b+"_"+this.columns.records[c].datafield]=true}}if(this.selectionmode=="checkbox"&&!this._checkboxcolumnupdating){if(this._checkboxcolumn){this._checkboxcolumn.checkboxelement.jqxCheckBox({checked:true})}}this._renderrows(this.virtualsizeinfo);this._trigger=true;if(this.selectionmode=="checkbox"){this._raiseEvent(2,{rowindex:this.selectedrowindexes})}},unselectallrows:function(){this._trigger=false;var b=this.virtualmode?this.dataview.totalrecords:this.dataview.loadedrecords.length;this.selectedrowindexes=new Array();this.selectedcells=new Array();if(this.selectionmode=="checkbox"&&!this._checkboxcolumnupdating){if(this._checkboxcolumn){this._checkboxcolumn.checkboxelement.jqxCheckBox({checked:false})}}this._renderrows(this.virtualsizeinfo);this._trigger=true;if(this.selectionmode=="checkbox"){this._raiseEvent(2,{rowindex:this.selectedrowindexes})}},selectrow:function(b,c){if(this.selectionmode!=="none"){this._applyrowselection(b,true,c);if(c!==false){this._updatecheckboxselection()}}},_updatecheckboxselection:function(){if(this.selectionmode=="checkbox"){var d=this.getrows();if(d&&this._checkboxcolumn){if(d.length===0){this._checkboxcolumn.checkboxelement.jqxCheckBox({checked:false});return}var c=d.length;if(this.groupable){c=this.dataview.loadedrecords.length}if(this.virtualmode){c=this.source._source.totalrecords}var b=this.selectedrowindexes.length;if(b===c){this._checkboxcolumn.checkboxelement.jqxCheckBox({checked:true})}else{if(b===0){this._checkboxcolumn.checkboxelement.jqxCheckBox({checked:false})}else{this._checkboxcolumn.checkboxelement.jqxCheckBox({checked:null})}}}}},unselectrow:function(b,c){this._applyrowselection(b,false,c);if(c!==false){this._updatecheckboxselection()}},selectcell:function(c,b){this._applycellselection(c,b,true)},unselectcell:function(c,b){this._applycellselection(c,b,false)},clearselection:function(c,d){this._trigger=false;this.selectedrowindex=-1;this._oldselectedcell=null;if(d!==false){for(var b=0;b<this.selectedrowindexes.length;b++){this._raiseEvent(3,{rowindex:this.selectedrowindexes[b]})}}this.selectedrowindexes=new Array();this.selectedcells=new Array();this.selectedcell=null;if(this.selectionmode=="checkbox"&&!this._checkboxcolumnupdating){this._checkboxcolumn.checkboxelement.jqxCheckBox({checked:false})}for(var b=0;b<this.columns.records.length;b++){this.columns.records[b].selected=false;this.columns.records[b]._applyStyle()}if(false===c){this._trigger=true;return}this._renderrows(this.virtualsizeinfo);this._trigger=true;if(this.selectionmode=="checkbox"){this._raiseEvent(3,{rowindex:this.selectedrowindexes})}},getselectedrowindex:function(){if(this.selectedrowindex==-1||this.selectedrowindex==undefined){for(var b=0;b<this.selectedrowindexes.length;b++){return this.selectedrowindexes[b]}}return this.selectedrowindex},getselectedrowindexes:function(){return this.selectedrowindexes},getselectedcell:function(){if(!this.selectedcell){return null}var b=this.selectedcell;b.row=this.selectedcell.rowindex;b.column=this.selectedcell.datafield;b.value=this.getcellvalue(b.row,b.column);return b},getselectedcells:function(){var b=new Array();for(var c in this.selectedcells){b[b.length]=this.selectedcells[c]}return b},getselection:function(){return{cells:this.getselectedcells(),rows:this.getselectedrowindexes()}},_getcellsforcopypaste:function(){var e=new Array();if(this.selectionmode.indexOf("cell")==-1){var h=this.selectedrowindexes;for(var d=0;d<h.length;d++){var c=h[d];for(var f=0;f<this.columns.records.length;f++){if(this.columns.records[f].datafield==="_checkboxcolumn"){continue}var g=c+"_"+this.columns.records[f].datafield;var b={rowindex:c,datafield:this.columns.records[f].datafield};e.push(b)}}}return e},deleteselection:function(){var d=this;var f=d.getselectedcells();if(this.selectionmode.indexOf("cell")==-1){f=this._getcellsforcopypaste()}if(f!=null&&f.length>0){for(var e=0;e<f.length;e++){var b=f[e];var g=d.getcolumn(b.datafield);var h=d.getcellvalue(b.rowindex,b.datafield);if(!g){continue}if(h!==""){var c=null;if(g.columntype=="checkbox"){if(!g.threestatecheckbox){c=false}}d._raiseEvent(17,{rowindex:b.rowindex,datafield:b.datafield,value:h});if(e==f.length-1){d.setcellvalue(b.rowindex,b.datafield,c,true);if(g.displayfield!=g.datafield){d.setcellvalue(b.rowindex,g.displayfield,c,true)}}else{d.setcellvalue(b.rowindex,b.datafield,c,false);if(g.displayfield!=g.datafield){d.setcellvalue(b.rowindex,g.displayfield,c,true)}}d._raiseEvent(18,{rowindex:b.rowindex,datafield:b.datafield,oldvalue:h,value:c})}}this.dataview.updateview();this._renderrows(this.virtualsizeinfo)}},copyselection:function(){var n="";var s=this;this.clipboardselection={};this.logicalclipboardselection={};this._clipboardselection=[];var r=s.getselectedcells();if(this.selectionmode.indexOf("cell")==-1){r=this._getcellsforcopypaste()}var b=0;var e=new Array();if(r!=null&&r.length>0){var t=999999999999999;var q=-1;for(var j=0;j<r.length;j++){var l=r[j];var d=s.getcolumn(l.datafield);if(d!=null&&d.clipboard&&(!d.hidden||this.copytoclipboardhiddencolumns)){if(e.indexOf(d.text)==-1){e.push(d.text)}var p=s.getcelltext(l.rowindex,d.displayfield);var h=this.getrowdisplayindex(l.rowindex);if(!this.clipboardselection[h]){this.clipboardselection[h]={}}this.clipboardselection[h][d.displayfield]=p;if(!this.logicalclipboardselection[h]){this.logicalclipboardselection[h]={}}this.logicalclipboardselection[h][d.displayfield]=p;if(d.displayfield!=d.datafield){this.logicalclipboardselection[h][d.datafield]=s.getcellvalue(l.rowindex,d.datafield)}t=Math.min(t,h);q=Math.max(q,h)}}var g=new Array();for(var f=t;f<=q;f++){if(!this.logicalclipboardselection[f]){continue}var o=a.extend({},this.logicalclipboardselection[f]);g.push(o)}this.logicalclipboardselection=g;if(this.copytoclipboardwithheaders){for(var c=0;c<e.length;c++){if(c>0){n+="\t"}n+=e[c]}n+="\r\n"}for(var f=t;f<=q;f++){var k=0;this._clipboardselection[this._clipboardselection.length]=new Array();if(this.clipboardselection[f]!=undefined){a.each(this.clipboardselection[f],function(i,m){if(k>0){n+="\t"}var u=m;if(m==null){u=""}s._clipboardselection[s._clipboardselection.length-1][k]=u;k++;n+=u})}else{continue}if(f<q){n+="\r\n"}}}this.clipboardselectedtext=n;return n},pasteselection:function(){var g=this.getselectedcells();this._oldselectedcell=null;if(this.selectionmode.indexOf("cell")==-1){g=this._getcellsforcopypaste()}if(g!=null&&g.length>0){var h=g[0].rowindex;var z=this.getrowdisplayindex(h);var r=g[0].datafield;var w=this._getcolumnindex(r);var p=0;this.selectedrowindexes=new Array();this.selectedcells=new Array();var l=g.length;var D=0;var d=new Array();var s=[];if(this.copytoclipboardwithheaders){this._clipboardselection.splice(0,1)}if(!this._clipboardselection){this._clipboardselection=[]}for(var B=0;B<this._clipboardselection.length;B++){D+=this._clipboardselection[B].length;d[B]=new Array();for(var A=0;A<this._clipboardselection[B].length;A++){var u=this._clipboardselection[B][A];d[B].push(u)}}if(D<g.length){var o=new Array();for(var B=0;B<g.length;B++){var e=g[B];if(!o[e.rowindex]){o[e.rowindex]=new Array()}o[e.rowindex].push(e)}var C=0;var F=0;for(var B=0;B<o.length;B++){if(!o[B]){continue}for(var A=0;A<o[B].length;A++){var e=o[B][A];var n=e.rowindex;var f=this.getcolumn(e.datafield);if(f.datafield==="_checkboxcolumn"){continue}if(f.hidden){continue}var u="";if(d[C]&&undefined==d[C][F]){F=0}u=""+d[C][F];F++;if(f.cellsformat){if(f.cellsformat.indexOf("p")!=-1||f.cellsformat.indexOf("c")!=-1||f.cellsformat.indexOf("n")!=-1||f.cellsformat.indexOf("f")!=-1){if(u.indexOf&&u.indexOf(this.gridlocalization.currencysymbol)>-1){u=u.replace(this.gridlocalization.currencysymbol,"")}var b=function(x,j,t){var c=x;if(j==t){return x}var i=c.indexOf(j);while(i!=-1){c=c.replace(j,t);i=c.indexOf(j)}return c};u=b(u,this.gridlocalization.thousandsseparator,"");u=u.replace(this.gridlocalization.decimalseparator,".");if(u.indexOf(this.gridlocalization.percentsymbol)>-1){u=u.replace(this.gridlocalization.percentsymbol,"")}var G="";for(var v=0;v<u.length;v++){var q=u.substring(v,v+1);if(q==="-"){G+="-"}if(q==="."){G+="."}if(q.match(/^[0-9]+$/)!=null){G+=q}}u=G;u=u.replace(/ /g,"");u=new Number(u);if(isNaN(u)){u=""}}}this._raiseEvent(17,{rowindex:n,datafield:e.datafield,value:u});var m=this.getrowdata(n);s.push({oldvalue:m[e.datafield],value:u,datafield:e.datafield,row:n});this.pushToHistory=true;this.setcellvalue(n,f.displayfield,u,false);this.pushToHistory=false;if(f.displayfield!=f.datafield&&this.logicalclipboardselection){if(this.logicalclipboardselection[n]){var y=this.logicalclipboardselection[n][f.datafield];if(y!=undefined){this.setcellvalue(n,f.datafield,y,false)}}}this._raiseEvent(18,{rowindex:n,datafield:e.datafield,oldvalue:this.getcellvalue(e.rowindex,e.datafield),value:u});this._applycellselection(n,e.datafield,true,false)}C++;F=0;if(!d[C]){C=0}}}else{if(!this._clipboardselection){return}for(var m=0;m<this._clipboardselection.length;m++){for(var E=0;E<this._clipboardselection[m].length;E++){var f=this.getcolumnat(w+E);if(!f){continue}if(f.datafield==="_checkboxcolumn"){continue}if(f.hidden){continue}var n=this.getrowboundindex(z+m);var e=this.getcell(n,f.datafield);var u=null;u=this._clipboardselection[m][E];if(u!=null){if(f.cellsformat){if(f.cellsformat.indexOf("p")!=-1||f.cellsformat.indexOf("c")!=-1||f.cellsformat.indexOf("n")!=-1||f.cellsformat.indexOf("f")!=-1){if(u.indexOf(this.gridlocalization.currencysymbol)>-1){u=u.replace(this.gridlocalization.currencysymbol,"")}var b=function(x,j,t){var c=x;if(j==t){return x}var i=c.indexOf(j);while(i!=-1){c=c.replace(j,t);i=c.indexOf(j)}return c};u=b(u,this.gridlocalization.thousandsseparator,"");u=u.replace(this.gridlocalization.decimalseparator,".");if(u.indexOf(this.gridlocalization.percentsymbol)>-1){u=u.replace(this.gridlocalization.percentsymbol,"")}var G="";for(var v=0;v<u.length;v++){var q=u.substring(v,v+1);if(q==="-"){G+="-"}if(q==="."){G+="."}if(q.match(/^[0-9]+$/)!=null){G+=q}}u=G;u=u.replace(/ /g,"");u=new Number(u);if(isNaN(u)){u=""}}}this._raiseEvent(17,{rowindex:n,datafield:e.datafield,value:u});var k=this.getrowdata(n);s.push({oldvalue:k[e.datafield],value:u,datafield:e.datafield,row:n});this.pushToHistory=true;this.setcellvalue(n,f.displayfield,u,false);this.pushToHistory=false;if(f.displayfield!=f.datafield&&this.logicalclipboardselection){var y=this.logicalclipboardselection[m][f.datafield];if(y!=undefined){this.setcellvalue(n,f.datafield,y,false)}}this._raiseEvent(18,{rowindex:n,datafield:e.datafield,oldvalue:this.getcellvalue(e.rowindex,e.datafield),value:u});this._applycellselection(n,e.datafield,true,false)}}}}if(this.selectionmode=="checkbox"){this._updatecheckboxselection()}this.dataview.updateview();this._renderrows(this.virtualsizeinfo)}this._undoRedo.push({action:"paste",data:s});this._undoRedoIndex=-1;if(this.clipboardend){this.clipboardend("paste")}},_applyrowselection:function(e,i,f,h,b){if(e==null){return false}var j=this.selectedrowindex;if(this.selectionmode=="singlerow"){if(i){this._raiseEvent(2,{rowindex:e,row:this.getrowdata(e)})}else{this._raiseEvent(3,{rowindex:e,row:this.getrowdata(e)})}this._raiseEvent(3,{rowindex:j});this.selectedrowindexes=new Array();this.selectedcells=new Array()}if(h==true){this.selectedrowindexes=new Array()}if(this.dataview.filters.length>0){var c=this.getrowdata(e);if(c&&c.dataindex!==undefined){e=c.dataindex}else{if(c&&c.dataindex===undefined){if(c.uid!=undefined){e=this.getrowboundindexbyid(c.uid)}}}}var d=this.selectedrowindexes.indexOf(e);if(i){this.selectedrowindex=e;if(d==-1){this.selectedrowindexes.push(e);if(this.selectionmode!="singlerow"){this._raiseEvent(2,{rowindex:e,row:this.getrowdata(e)})}}else{if(this.selectionmode=="multiplerows"){this.selectedrowindexes.splice(d,1);this._raiseEvent(3,{rowindex:this.selectedrowindex,row:this.getrowdata(e)});this.selectedrowindex=this.selectedrowindexes.length>0?this.selectedrowindexes[this.selectedrowindexes.length-1]:-1}}}else{if(d>=0||this.selectionmode=="singlerow"||this.selectionmode=="multiplerowsextended"||this.selectionmode=="multiplerowsadvanced"){var g=this.selectedrowindexes[d];this.selectedrowindexes.splice(d,1);this._raiseEvent(3,{rowindex:g,row:this.getrowdata(e)});this.selectedrowindex=-1}}if(f==undefined||f){this._rendervisualrows()}return true},_applycellselection:function(f,c,i,g,l){if(f==null){return false}if(c==null){return false}if(this._autofill){this._autofill.remove();a(document).off("pointermove.autofill");a(document).off("pointerup.autofill");this._autofill=null}var m=this.selectedrowindex;if(this.selectionmode=="singlecell"){var e=this.selectedcell;if(e!=null){this._raiseEvent(16,{rowindex:e.rowindex,datafield:e.datafield})}this.selectedcells=new Array()}if(this.selectionmode=="multiplecellsextended"||this.selectionmode=="multiplecellsadvanced"){var e=this.selectedcell;if(e!=null){this._raiseEvent(16,{rowindex:e.rowindex,datafield:e.datafield})}}var h=f+"_"+c;if(this.dataview.filters.length>0){var d=this.getrowdata(f);if(d&&d.dataindex!==undefined){f=d.dataindex;var h=f+"_"+c}else{if(d&&d.dataindex===undefined){if(d.uid){f=this.getrowboundindexbyid(d.uid);var h=f+"_"+c}}}}var k={rowindex:f,datafield:c};if(i){var j=this.selectedcell;this.selectedcell=k;if(!this.selectedcells[h]){this.selectedcells[h]=k;this.selectedcells.length++;var b=true;if(j&&j.datafield===k.datafield&&k.rowindex===j.rowindex){b=false}if(b&&l!==false){this._raiseEvent(15,k)}}else{if(this.selectionmode=="multiplecells"||this.selectionmode=="multiplecellsextended"||this.selectionmode=="multiplecellsadvanced"){delete this.selectedcells[h];if(this.selectedcells.length>0){this.selectedcells.length--}if(l!==false){this._raiseEvent(16,k)}}}}else{delete this.selectedcells[h];if(this.selectedcells.length>0){this.selectedcells.length--}if(l!==false){this._raiseEvent(16,k)}}if(g==undefined||g){this._rendervisualrows()}return true},_getcellindex:function(b){var c=-1;a.each(this.selectedcells,function(){c++;if(this[b]){return false}});return c},_clearhoverstyle:function(){if(undefined==this.hoveredrow||this.hoveredrow==-1){return}if(this.vScrollInstance.isScrolling()){return}if(this.hScrollInstance.isScrolling()){return}var c=this.table.find(".jqx-grid-cell-hover");if(c.length>0){c.removeClass(this.toTP("jqx-grid-cell-hover"));c.removeClass(this.toTP("jqx-fill-state-hover"))}for(var d=0;d<c.length;d++){var e=c[d].getAttribute("columnindex");if(e){var b=this.columns.records[parseInt(e)];if(b){b._applyCellStyle(c[d])}}}this.hoveredrow=-1},_clearselectstyle:function(){var m=this.table[0].rows.length;var r=this.table[0].rows;var n=this.toTP("jqx-grid-cell-selected");var c=this.toTP("jqx-fill-state-pressed");var o=this.toTP("jqx-grid-cell-hover");var l=this.toTP("jqx-fill-state-hover");for(var k=0;k<m;k++){var b=r[k];var h=b.cells.length;var q=b.cells;for(var g=0;g<h;g++){var e=q[g];var p=a(e);if(e.className.indexOf("jqx-grid-cell-selected")!=-1){p.removeClass(n);p.removeClass(c)}if(e.className.indexOf("jqx-grid-cell-hover")!=-1){p.removeClass(o);p.removeClass(l)}var f=e.getAttribute("columnindex");if(f){var d=this.columns.records[parseInt(f)];if(d){d._applyCellStyle(e)}}}}},_selectpath:function(p,f){var n=this;var g=this;var j=this._lastClickedCell?Math.min(this._lastClickedCell.row,p):0;var m=this._lastClickedCell?Math.max(this._lastClickedCell.row,p):0;var l=null;if(j<=m){var i=this._getcolumnindex(this._lastClickedCell.column||g._lastClickedCell.datafield);var h=this._getcolumnindex(f);var e=Math.min(i,h);var d=Math.max(i,h);this.selectedcells=new Array();var o=this.dataview.loadedrecords;for(var b=j;b<=m;b++){for(var k=e;k<=d;k++){var p=o[b];this._applycellselection(n.getboundindex(p),n._getcolumnat(k).datafield,true,false);l={row:n.getboundindex(p),datafield:n._getcolumnat(k).datafield}}}this._rendervisualrows()}},_selectrowpath:function(g){if(this.selectionmode=="multiplerowsextended"){var c=this;var b=this._lastClickedCell?Math.min(this._lastClickedCell.row,g):0;var h=this._lastClickedCell?Math.max(this._lastClickedCell.row,g):0;var f=this.dataview.loadedrecords;if(b<=h){this.selectedrowindexes=new Array();for(var e=b;e<=h;e++){var g=f[e];var d=this.getrowboundindex(e);this._applyrowselection(d,true,false)}this._rendervisualrows()}}},_selectrowwithmouse:function(q,b,c,f,d,t){var k=b.row;if(k==undefined){return}var l=b.index;if(this.hittestinfo[l]==undefined){return}for(var x=0;x<this.columns.records.length;x++){var w=this.columns.records[x];w.selected=false;if(w.element){w.element.removeAttribute("selected")}w._applyStyle()}var u=this.hittestinfo[l].visualrow;if(this.hittestinfo[l].details){return}var n=u.cells[0].className;if(k.group){return}if(this.selectionmode=="multiplerows"||this.selectionmode=="multiplecells"||this.selectionmode=="checkbox"||(this.selectionmode.indexOf("multiple")!=-1&&(t==true||d==true))){var m=this.getboundindex(k);if(this.dataview.filters.length>0){var y=this.getrowdata(m);if(y){m=y.dataindex;if(m==undefined){var m=this.getboundindex(k)}}}var s=c.indexOf(m)!=-1;var z=this.getboundindex(k)+"_"+f;if(this.selectionmode.indexOf("cell")!=-1){var h=this.selectedcells[z]!=undefined;if(this.selectedcells[z]!=undefined&&h){this._selectcellwithstyle(q,false,l,f,u)}else{this._selectcellwithstyle(q,true,l,f,u)}if(t&&this._lastClickedCell==undefined){var g=this.getselectedcells();if(g&&g.length>0){this._lastClickedCell={row:g[0].rowindex,column:g[0].datafield}}}if(t&&this._lastClickedCell){this._selectpath(k.visibleindex,f);this.mousecaptured=false;if(this.selectionarea.css("visibility")=="visible"){this.selectionarea.css("visibility","hidden")}}}else{if(s){if(d){this._applyrowselection(this.getboundindex(k),false)}else{this._selectrowwithstyle(q,u,false,f)}}else{this._selectrowwithstyle(q,u,true,f)}if(t&&this._lastClickedCell==undefined){var j=this.getselectedrowindexes();if(j&&j.length>0){this._lastClickedCell={row:j[0],column:f}}}if(t&&this._lastClickedCell){this.selectedrowindexes=new Array();var e=this._lastClickedCell?Math.min(this._lastClickedCell.row,k.visibleindex):0;var v=this._lastClickedCell?Math.max(this._lastClickedCell.row,k.visibleindex):0;var o=this.dataview.loadedrecords;for(var p=e;p<=v;p++){var k=o[p];if(k){this._applyrowselection(this.getboundindex(k),true,false,false)}}this._rendervisualrows()}}}else{this._clearselectstyle();this._selectrowwithstyle(q,u,true,f);if(this.selectionmode.indexOf("cell")!=-1){this._selectcellwithstyle(q,true,l,f,u)}}if(!t){this._lastClickedCell={row:k.visibleindex,column:f}}},_selectcellwithstyle:function(e,c,h,g,f){var b=a(f.cells[e._getcolumnindex(g)]);b.removeClass(this.toTP("jqx-grid-cell-hover"));b.removeClass(this.toTP("jqx-fill-state-hover"));if(c){b.addClass(this.toTP("jqx-grid-cell-selected"));b.addClass(this.toTP("jqx-fill-state-pressed"))}else{b.removeClass(this.toTP("jqx-grid-cell-selected"));b.removeClass(this.toTP("jqx-fill-state-pressed"))}var d=this.getcolumn(g);d._applyCellStyle(b)},_selectrowwithstyle:function(k,b,j,f){var h=b.cells.length;var c=0;if(k.rowdetails&&k.showrowdetailscolumn){if(!this.rtl){c=1+this.groups.length}else{h-=1;h-=this.groups.length}}else{if(this.groupable){if(!this.rtl){c=this.groups.length}else{h-=this.groups.length}}}for(var g=c;g<h;g++){var e=b.cells[g];if(j){a(e).removeClass(this.toTP("jqx-grid-cell-hover"));a(e).removeClass(this.toTP("jqx-fill-state-hover"));if(k.selectionmode.indexOf("cell")==-1){a(e).addClass(this.toTP("jqx-grid-cell-selected"));a(e).addClass(this.toTP("jqx-fill-state-pressed"))}}else{a(e).removeClass(this.toTP("jqx-grid-cell-hover"));a(e).removeClass(this.toTP("jqx-grid-cell-selected"));a(e).removeClass(this.toTP("jqx-fill-state-hover"));a(e).removeClass(this.toTP("jqx-fill-state-pressed"))}var f=e.getAttribute("columnindex");if(f){var d=this.columns.records[parseInt(f)];if(d){d._applyCellStyle(e)}}}},_handlemousemoveselection:function(ae,r,X){if(r.hScrollInstance.isScrolling()||r.vScrollInstance.isScrolling()){return false}if((r.selectionmode=="multiplerowsextended"||r.selectionmode=="multiplecellsextended"||r.selectionmode=="multiplecellsadvanced")&&r.mousecaptured){if(r.multipleselectionbegins){var b=r.multipleselectionbegins(ae);if(b===false){return true}}var ad=this.showheader?this.columnsheader.height()+2:0;var K=this._groupsheader()?this.groupsheader.height():0;var M=this.showtoolbar?this.toolbar.height():0;var J=this.showfilterbar?this.toolbarheight:0;K+=M;K+=J;var ac=this.host.coord();if(this.hasTransform){ac=a.jqx.utilities.getOffset(this.host);var ag=this._getBodyOffset();ac.left-=ag.left;ac.top-=ag.top}if(this.host.css("border-top-width")==="0px"){K-=2}var O=ae.pageX;var N=ae.pageY-K;if(ae._pageX){O=ae._pageX;N=ae._pageY-K}if(Math.abs(this.mousecaptureposition.left-O)>3||Math.abs(this.mousecapture