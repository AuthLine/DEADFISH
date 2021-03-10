/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(b){b.jqx.jqxWidget("jqxDataTable","",{});b.extend(b.jqx._jqxDataTable.prototype,{defineInstance:function(){var c={altRows:false,aggregatesHeight:34,autoShowLoadElement:true,autoRowHeight:true,columnsHeight:36,columns:[],columnGroups:null,columnsResize:false,columnsReorder:false,dataview:null,disabled:false,editable:false,editSettings:{saveOnPageChange:true,saveOnBlur:true,saveOnSelectionChange:true,cancelOnEsc:true,saveOnEnter:true,editSingleCell:false,editOnDoubleClick:true,editOnF2:true},enableHover:true,enableBrowserSelection:false,filterHeight:35,filterable:false,filterMode:"default",groupsRenderer:null,groups:new Array(),headerZIndex:359,height:null,handleKeyboardNavigation:null,indentWidth:25,initRowDetails:false,loadingErrorMessage:"The data is still loading and you cannot set a property or call a method. You can do that once the data binding is completed. jqxDataTable raises the 'bindingComplete' event when the binding is completed.",localization:null,pagerHeight:40,pageSize:10,pageSizeOptions:["5","10","20"],pageable:false,pagerPosition:"bottom",pagerMode:"default",pageSizeMode:"default",pagerButtonsCount:5,pagerRenderer:null,ready:null,rendertoolbar:null,rowDetails:false,renderStatusBar:null,rendered:null,rendering:null,rtl:false,sortable:false,showtoolbar:false,showstatusbar:false,statusBarHeight:34,serverProcessing:false,selectionMode:"multiplerows",scrollBarSize:b.jqx.utilities.scrollBarSize,touchScrollBarSize:b.jqx.utilities.touchScrollBarSize,showAggregates:false,showHeader:true,maxHeight:999999,maxWidth:999999,autoBind:true,beginEdit:null,endEdit:null,autokoupdates:true,columnsVirtualization:false,exportSettings:{columnsHeader:true,hiddenColumns:false,serverURL:null,characterSet:null,collapsedRecords:false,recordsInView:true,fileName:"jqxDataTable"},source:{beforeprocessing:null,beforesend:null,loaderror:null,localdata:null,data:null,datatype:"array",datafields:[],url:"",root:"",record:"",id:"",totalrecords:0,recordstartindex:0,recordendindex:0,loadallrecords:true,sortcolumn:null,sortdirection:null,sort:null,filter:null,sortcomparer:null},toolbarHeight:34,tableZIndex:369,_updating:false,touchmode:"auto",width:null,that:this,incrementalSearch:true,events:["bindingComplete","sort","filter","pageChanged","pageSizeChanged","rowClick","rowDoubleClick","cellValueChanged","rowBeginEdit","rowEndEdit","rowSelect","rowUnselect","rowCheck","rowUncheck","columnResized","columnReordered","rowExpand","rowCollapse","cellBeginEdit","cellEndEdit"]};if(this===b.jqx._jqxDataTable.prototype){return c}b.extend(true,this,c);this.that=this;return c},createInstance:function(e){var l=this;if(b.jqx.utilities.scrollBarSize!=13){l.scrollBarSize=b.jqx.utilities.scrollBarSize}if(l.isMaterialized()){var B=window.getComputedStyle(l.element);var p=B.getPropertyValue("--jqx-grid-column-height");var v=B.getPropertyValue("--jqx-scrollbar-size");if(p&&this.columnsHeight===36){l.columnsHeight=parseInt(p)}}if(v){l.scrollbarsize=v;b.jqx.utilities.scrollBarSize=v}if((l.element.nodeName.toLowerCase()=="table")||b(l.element).children("table").length>0){var n=l.host.find("tbody tr");var d=l.host.find("th");var y=new Array();if(d.length===0){d=n[0];n.splice(0,1)}if(l.localizestrings){l.localizestrings();if(l.localization!=null){l.localizestrings(l.localization,false)}}var C=[];for(var w=0;w<n.length;w++){var k=n[w];var h={};for(var u=0;u<d.length;u++){var g=b.trim(b(d[u]).text());if(w===0){var t={name:g};if(l.columns[u]&&l.columns[u].cellsFormat){var x=l.columns[u].cellsFormat.toLowerCase();if(x.indexOf("p")!=-1||x.indexOf("c")!=-1||x.indexOf("n")!=-1||x.indexOf("f")!=-1){t.type="number"}if(x.indexOf("d")!=-1||x.indexOf("m")!=-1||x.indexOf("y")!=-1||x.indexOf("h")!=-1||x.indexOf("m")!=-1||x.indexOf("s")!=-1||x.indexOf("t")!=-1){t.type="date"}}y.push(t)}var c=b(k).find("td:eq("+u+")");var f=y[u].type;if(f){var q=l.getvaluebytype(b.trim(c.text()),y[u]);h[g]=q}else{h[g]=b.trim(c.text())}}C[C.length]=h}l.host.wrap("<div></div>");var m=l.host.parent();var r=l.host.data();r.jqxDataTable.host=m;r.jqxDataTable.element=m[0];l.host.parent()[0].id=l.element.id;try{l.host.parent()[0].style=l.element.style}catch(s){}l.element=m[0];l.host=m;l.host.data(r);var o={dataFields:y,localdata:C,datatype:"array"};var A=new b.jqx.dataAdapter(o);l.source=A}if(l.source&&!l.source.dataBind){l.source=new b.jqx.dataAdapter(l.source)}var z=l.source._source.datafields;if(z&&z.length>0){l._camelCase=l.source._source.dataFields!==undefined;l.selectionMode=l.selectionMode.toLowerCase()}if(l.host.attr("tabindex")==null){l.host.attr("tabindex","0")}l.host.attr("role","grid");l.host.attr("align","left");l.host.addClass(l.toTP("jqx-datatable"));l.host.addClass(l.toTP("jqx-grid"));l.host.addClass(l.toTP("jqx-reset"));l.host.addClass(l.toTP("jqx-rc-all"));l.host.addClass(l.toTP("jqx-widget"));l.host.addClass(l.toTP("jqx-widget-content"));if(l._testmodules()){return}l.render(true);b.jqx.utilities.resize(l.host,function(){var D=b(window).width();var i=b(window).height();var j=l.host.width();var E=l.host.height();if(l._lastHostWidth!=j||l._lastHostHeight!=E){l._updatesize(l._lastHostWidth!=j,l._lastHostHeight!=E)}l._lastWidth=D;l._lastHeight=i;l._lastHostWidth=j;l._lastHostHeight=E})},getvaluebytype:function(h,d){var f=h;if(h==null){return h}if(this.gridlocalization.decimalseparator==","){if(h.indexOf(this.gridlocalization.decimalseparator)>=0){h=h.replace(this.gridlocalization.decimalseparator,".")}}if(h.indexOf(this.gridlocalization.currencysymbol)>=0){h=h.replace(this.gridlocalization.currencysymbol,"")}if(h.indexOf(this.gridlocalization.percentagesymbol)>=0){h=h.replace(this.gridlocalization.percentagesymbol,"")}if(b.isArray(h)&&d.type!="array"){for(var e=0;e<h.length;e++){h[e]=this.getvaluebytype(h[e],d)}return h}if(d.type=="date"){if(h=="NaN"){h=""}else{var g=new Date(h);if(typeof h=="string"){if(d.format){var c=b.jqx.dataFormat.parsedate(h,d.format);if(c!=null){g=c}}}if(g.toString()=="NaN"||g.toString()=="Invalid Date"){if(b.jqx.dataFormat){h=b.jqx.dataFormat.tryparsedate(h)}else{h=g}}else{h=g}if(h==null){h=f}}}else{if(d.type=="float"||d.type=="number"||d.type=="decimal"){if(h=="NaN"){h=""}else{var h=parseFloat(h);if(isNaN(h)){h=f}}}else{if(d.type=="int"||d.type=="integer"){var h=parseInt(h);if(isNaN(h)){h=f}}else{if(d.type=="bool"||d.type=="boolean"){if(h!=null){if(h.toLowerCase!=undefined){if(h.toLowerCase()=="false"){h=false}else{if(h.toLowerCase()=="true"){h=true}}}}if(h==1){h=true}else{if(h==0&&h!==""){h=false}else{h=""}}}}}}return h},_builddataloadelement:function(){if(this.dataloadelement){this.dataloadelement.remove()}this.dataloadelement=b('<div class="jqx-datatable-load" style="z-index: 99998; background-color:rgba(50,50,50,0.1); overflow: hidden; position: absolute;"></div>');var d=b('<div style="z-index: 99999; margin-left: -66px; left: 50%; top: 50%; margin-top: -24px; position: relative; width: 100px; height: 33px; padding: 5px; font-family: verdana; font-size: 12px; color: #767676; border-color: #898989; border-width: 1px; border-style: solid; background: #f6f6f6; border-collapse: collapse;"><div style="float: left;"><div style="float: left; overflow: hidden; width: 32px; height: 32px;" class="jqx-grid-load"/><span style="margin-top: 10px; float: left; display: block; margin-left: 5px;" >'+this.gridlocalization.loadtext+"</span></div></div>");d.addClass(this.toTP("jqx-rc-all"));this.dataloadelement.addClass(this.toTP("jqx-rc-all"));d.addClass(this.toTP("jqx-fill-state-normal"));this.dataloadelement.append(d);this.dataloadelement.width(this.width);this.dataloadelement.height(this.height);this.host.prepend(this.dataloadelement);if(this.source._source.url!=""){var c=false;if(this.height==="auto"||this.height===null||this.autoheight){if(this.maxHeight==999999){c=true}}if(c){this.host.height(100);this.dataloadelement.height(100)}else{this.host.height(this.height);this.dataloadelement.height(this.height)}var e=false;if(this.width==="auto"||this.width===null||this.autoWidth){e=true}if(e){this.host.width(300);this.dataloadelement.width(300)}else{this.host.width(this.width);this.dataloadelement.width(this.width)}}},_measureElement:function(d){var c=b("<span style='visibility: hidden; white-space: nowrap;'>measure Text</span>");c.addClass(this.toTP("jqx-widget"));b(document.body).append(c);if(d=="cell"){this._cellheight=c.height()}else{this._columnheight=c.height()}c.remove()},_testmodules:function(){var g="";var e=this;var c=function(){if(g.length!=""){g+=","}};if(!this.host.jqxScrollBar){c();g+=" jqxscrollbar.js"}if(!this.host.jqxButton){c();g+=" jqxbuttons.js"}if(!b.jqx.dataAdapter){c();g+=" jqxdata.js"}if(g!=""||this.editable||this.filterable||this.pageable){var d=[];var f=function(h){switch(h){case"checkbox":if(!e.host.jqxCheckBox&&!d.checkbox){d.checkbox=true;c();g+=" jqxcheckbox.js"}break;case"dropdownlist":if(!e.host.jqxDropDownList&&!d.dropdownlist){c();d.dropdownlist=true;g+=" jqxdropdownlist.js(requires: jqxlistbox.js)"}else{if(!e.host.jqxListBox&&!d.listbox){c();d.listbox=true;g+=" jqxlistbox.js"}}break}};if((this.filterable&&this.filterMode!="simple")||(this.pagerMode=="advanced"&&this.pageable)){f("dropdownlist")}if(g!=""){throw new Error("jqxDataTable: Missing references to the following module(s): "+g);this.host.remove();return true}}return false},focus:function(){try{this.wrapper.focus();this.host.focus();var d=this;setTimeout(function(){d.wrapper.focus();d.host.focus()},25);this.focused=true}catch(c){}},hiddenParent:function(){return b.jqx.isHidden(this.host)},isBindingCompleted:function(){return !this._loading},_updatesize:function(i,h){if(this._loading){return}var f=this;var g=f.host.width();var e=f.host.height();if(!f._oldWidth){f._oldWidth=g}if(!f._oldHeight){f._oldHeight=e}if(f._resizeTimer!=undefined){clearTimeout(f._resizeTimer);f._resizeTimer=null}var d=300;var c=function(){if(f._resizeTimer){clearTimeout(f._resizeTimer)}f.resizingGrid=true;if(b.jqx.isHidden(f.host)){return}f._updatecolumnwidths();f.refresh();f._oldWidth=g;f._oldHeight=e;f.resizingGrid=false};c();f._resizeTimer=setTimeout(function(){var k=f.host.width();var j=f.host.height();if(f._oldWidth!=k||f._oldHeight!=j){c()}},d)},resize:function(d,c){if(d!=undefined){this.width=d}if(c!=undefined){this.height=c}this._updatecolumnwidths();this.refresh()},isTouchDevice:function(){if(this.touchDevice!=undefined){return this.touchDevice}var c=b.jqx.mobile.isTouchDevice();this.touchDevice=c;if(this.touchmode==true){c=true;b.jqx.mobile.setMobileSimulator(this.table[0]);this.touchDevice=c}else{if(this.touchmode==false){c=false}}if(c){this.touchDevice=true;this.host.addClass(this.toThemeProperty("jqx-touch"));this.host.find("jqx-widget-content").addClass(this.toThemeProperty("jqx-touch"));this.host.find("jqx-widget-header").addClass(this.toThemeProperty("jqx-touch"));this.scrollBarSize=this.touchScrollBarSize}return c},toTP:function(c){return this.toThemeProperty(c)},localizestrings:function(c,f){this._cellscache=new Array();if(b.jqx.dataFormat){b.jqx.dataFormat.cleardatescache()}if(this._loading){throw new Error("jqxDataTable: "+this.loadingErrorMessage);return false}if(c!=null){for(var h in c){if(h.toLowerCase()!==h){c[h.toLowerCase()]=c[h]}}var j=["pagergotopagestring","pagershowrowsstring","pagerrangestring","pagernextbuttonstring","pagerpreviousbuttonstring","pagerfirstbuttonstring","pagerlastbuttonstring","toppagerstring","firstDay","days","months","AM","PM","patterns","percentsymbol","currencysymbol","currencysymbolposition","decimalseparator","thousandsseparator","filterapplystring","filteraddnew","filtercancelstring","filterclearstring","filterstring","filterstringcomparisonoperators","filternumericcomparisonoperators","filterdatecomparisonoperators","filterbooleancomparisonoperators","emptydatastring","filterselectstring","todaystring","clearstring","validationstring","loadtext","filtersearchstring","loadingErrorMessage"];var g=this;for(var e=0;e<j.length;e++){var d=j[e];if(c[d]!==undefined){g.gridlocalization[d]=c[d]}}if(c.loadingErrorMessage){this.loadingErrorMessage=c.loadingErrorMessage}if(f!==false){this._builddataloadelement();b(this.dataloadelement).css("visibility","hidden");b(this.dataloadelement).css("display","none")}}else{this.gridlocalization={"/":"/",":":":",firstDay:0,days:{names:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],namesAbbr:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],namesShort:["Su","Mo","Tu","We","Th","Fr","Sa"]},months:{names:["January","February","March","April","May","June","July","August","September","October","November","December",""],namesAbbr:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""]},AM:["AM","am","AM"],PM:["PM","pm","PM"],eras:[{name:"A.D.",start:null,offset:0}],twoDigitYearMax:2029,patterns:{d:"M/d/yyyy",D:"dddd, MMMM dd, yyyy",t:"h:mm tt",T:"h:mm:ss tt",f:"dddd, MMMM dd, yyyy h:mm tt",F:"dddd, MMMM dd, yyyy h:mm:ss tt",M:"MMMM dd",Y:"yyyy MMMM",S:"yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",ISO:"yyyy-MM-dd hh:mm:ss",ISO2:"yyyy-MM-dd HH:mm:ss",d1:"dd.MM.yyyy",d2:"dd-MM-yyyy",d3:"dd-MMMM-yyyy",d4:"dd-MM-yy",d5:"H:mm",d6:"HH:mm",d7:"HH:mm tt",d8:"dd/MMMM/yyyy",d9:"MMMM-dd",d10:"MM-dd",d11:"MM-dd-yyyy"},percentsymbol:"%",currencysymbol:"$",currencysymbolposition:"before",decimalseparator:".",thousandsseparator:",",pagergotopagestring:"Go to page:",pagershowrowsstring:"Show rows:",pagerrangestring:" of ",pagerpreviousbuttonstring:"previous",pagernextbuttonstring:"next",pagerfirstbuttonstring:"first",pagerlastbuttonstring:"last",filterapplystring:"Apply",filtercancelstring:"Cancel",filterclearstring:"Clear Filter",filterstring:"advanced",filtersearchstring:"Search:",filterstringcomparisonoperators:["empty","not empty","contains","contains(match case)","does not contain","does not contain(match case)","starts with","starts with(match case)","ends with","ends with(match case)","equal","equal(match case)","null","not null"],filternumericcomparisonoperators:["equal","not equal","less than","less than or equal","greater than","greater than or equal","null","not null"],filterdatecomparisonoperators:["equal","not equal","less than","less than or equal","greater than","greater than or equal","null","not null"],filterbooleancomparisonoperators:["equal","not equal"],validationstring:"Entered value is not valid",emptydatastring:"No data to display",filterselectstring:"Select Filter",loadtext:"Loading...",clearstring:"Clear",todaystring:"Today",loadingErrorMessage:"The data is still loading and you cannot set a property or call a method. You can do that once the data binding is completed. jqxDataTable raises the 'bindingComplete' event when the binding is completed."}}},_updateScrollbars:function(m){var p=false;if(this.width==="auto"||this.width===null||this.autowidth){if(this.maxWidth==999999){p=true}}var d=parseInt(this.scrollBarSize);var j=this.table?this.table.height():0;var n=0;var e="inherit";var h=this.vScrollBar[0].style.visibility;var l=this.hScrollBar[0].style.visibility;if(!m){var g=this.host.height()}else{var g=m}if(!this.columnGroups){g-=this.showHeader?this.columnsHeight:0}else{g-=this.showHeader?this.columnsheader.height():0}if(this.filterable){g-=this.filter.height()}if(this.pageable){g-=this.pagerHeight;if(this.pagerPosition==="both"){g-=this.pagerHeight}}if(this.showtoolbar){g-=this.toolbarHeight}if(this.showstatusbar){g-=this.statusBarHeight}if(this.showAggregates){g-=this.aggregatesHeight}var q=false;if(this.height==="auto"||this.height===null||this.autoheight){if(this.maxHeight==999999){q=true}}if(!q&&j>g&&(this.source.records.length>0||(this.source.hierarchy&&this.source.hierarchy.length>0))){this.vScrollBar[0].style.visibility=e;n=4+parseInt(d);this.vScrollBar.jqxScrollBar({max:j-g})}else{this.vScrollBar[0].style.visibility="hidden"}if((h!=this.vScrollBar[0].style.visibility)){this._updatecolumnwidths();var i=this.table.height();if(j!=i){j=i;if(!q&&j>g&&(this.source.records.length>0||(this.source.hierarchy&&this.source.hierarchy.length>0))){this.vScrollBar[0].style.visibility=e;n=4+parseInt(d);this.vScrollBar.jqxScrollBar({max:j-g})}}}if(this.scrollBarSize==0){n=0}var o=this.table?this.table.width():0;if(o>3){o-=3}var c=parseInt(this.host.css("border-left-width"))+parseInt(this.host.css("border-right-width"));var r=c+this.host.width()-n;if(o>r&&!p){this.hScrollBar[0].style.visibility=e;this.hScrollBar.jqxScrollBar({max:o-r});n=4+parseInt(d);if(d==0){n=0}if(!q){if(j>g-n+4&&(this.source.records.length>0||(this.source.hierarchy&&this.source.hierarchy.length>0))){this.hScrollBar.jqxScrollBar({max:c+o-r});var f=this.vScrollBar[0].style.visibility==="hidden";this.vScrollBar[0].style.visibility=e;this._updatecolumnwidths();if(f){this.hScrollBar.jqxScrollBar({max:o-r+n+c})}var k=this.table?this.table.width():0;if(k>3){k-=3}if(k!=o){if(k<r){this.hScrollBar.jqxScrollBar({max:c+k-r});this.hScrollBar[0].style.visibility="hidden";n=0}}}this.vScrollBar.jqxScrollBar({max:j-g+n})}}else{this.hScrollBar[0].style.visibility="hidden"}if(this.source.records.length===0&&(this.source.hierarchy&&this.source.hierarchy.length===0)){this.vScrollBar[0].style.visibility="hidden";this.bottomRight[0].style.visibility="hidden"}if(this.vScrollBar[0].style.visibility=="hidden"){if(this.vScrollInstance.value!=0){this.vScrollInstance.setPosition(0)}}},_measureElementWidth:function(e){var d=b("<span style='visibility: hidden; white-space: nowrap;'>"+e+"</span>");d.addClass(this.toTP("jqx-widget"));d.addClass(this.toTP("jqx-grid"));d.addClass(this.toTP("jqx-grid-column-header"));d.addClass(this.toTP("jqx-widget-header"));b(document.body).append(d);var c=d.outerWidth()+20;d.remove();return c},_arrangeAutoHeight:function(e){if(!e){e=0}if(this.height==="auto"||this.height===null||this.autoheight){var h=this.table.height();var g=0;if(!this.columnGroups){g+=this.showHeader?this.columnsHeight:-1}else{g+=this.showHeader?this.columnsheader.height():-1}g+=this.showstatusbar?this.statusBarHeight:0;g+=this.showAggregates?this.aggregatesHeight:0;g+=this.showtoolbar?this.toolbarHeight:0;g+=this.pageable?this.pagerHeight:0;if(this.pagerPosition==="both"){g+=this.pageable?this.pagerHeight:0}g+=h;if(this.filterable){var f=this.filter.find(".filterrow");var c=this.filter.find(".filterrow-hidden");var d=1;if(c.length>0){d=0}g+=this.filterHeight-1+this.filterHeight*f.length*d}if(g+e>this.maxHeight){this.host.height(this.maxHeight)}else{this.host.height(g+e)}return true}return false},escape_HTML:function(c){return c.replace(/[&<>"]/g,function(e){var d={"&":"&","<":"<",">":">",'"':'"'};return d[e]||e})},_arrangeAutoWidth:function(e){if(!e){e=0}if(this.width==="auto"||this.width===null||this.autowidth){var d=0;for(var f=0;f<this.columns.records.length;f++){var c=this.columns.records[f].width;if(this.columns.records[f].hidden){continue}if(c=="auto"){c=this._measureElementWidth(this.escape_HTML(this.columns.records[f].text));d+=c}else{d+=c}}var g=d;if(g+e>this.maxWidth){this.host.width(this.maxWidth)}else{this.host.width(g+e)}return true}return false},_measureTopAndHeight:function(){var d=this.host.height();var h=0;if(this.showtoolbar){h+=this.toolbarHeight;d-=parseInt(this.toolbarHeight)}if(this.filterable){var g=this.filter.find(".filterrow");var e=this.filter.find(".filterrow-hidden");var f=1;if(e.length>0){f=0}h+=this.filterHeight;d-=parseInt(this.filterHeight);var c=f==1?g.length:0;h+=this.filterHeight*c;d-=this.filterHeight*c}if(this.pageable&&this.pagerPosition!="bottom"){h+=parseInt(this.pagerHeight)+1;if(d>this.pagerHeight&&this.pagerPosition==="both"){d-=parseInt(this.pagerHeight)}}return{top:h,height:d}},_arrange:function(){if(!this.table){return}this._arrangeAutoHeight();this._arrangeAutoWidth();var v=this.host.width();var r=this.host.height();var j=r;var i=this;if(this.pageable){if(this.pagerPosition==="bottom"){this.toppager[0].style.visibility="hidden";this.pager[0].style.visibility="inherit"}else{if(this.pagerPosition==="both"){this.toppager[0].style.visibility="inherit";this.pager[0].style.visibility="inherit"}else{if(this.pagerPosition==="top"){this.toppager[0].style.visibility="inherit";this.pager[0].style.visibility="hidden"}}}}else{this.toppager[0].style.visibility="hidden";this.pager[0].style.visibility="hidden"}var q=0;if(this.showtoolbar){this.toolbar.width(v);this.toolbar.height(this.toolbarHeight-1);this.toolbar.css("top",0);q+=this.toolbarHeight;r-=parseInt(this.toolbarHeight)}else{this.toolbar[0].style.height="0px"}if(this.filterable){this.filter.width(v);this.filter.css("top",q);var t=this.filter.find(".filterrow");var h=this.filter.find(".filterrow-hidden");var A=1;if(h.length>0){A=0}this.filter.height(this.filterHeight-1+this.filterHeight*t.length*A);q+=this.filterHeight;r-=parseInt(this.filterHeight);var x=A==1?t.length:0;q+=this.filterHeight*x;r-=this.filterHeight*x}if(this.showstatusbar){this.statusbar.width(!this.table?v:Math.max(v,this.table.width()));this.statusbar.height(this.statusBarHeight-1)}else{this.statusbar[0].style.height="0px"}if(this.showAggregates){this.aggregates.height(this.aggregatesHeight-1)}else{this.aggregates[0].style.height="0px"}if(this.pageable&&this.pagerPosition!="bottom"){this.toppager[0].style.width=v+"px";this.toppager[0].style.height=parseInt(this.pagerHeight)+"px";this.toppager[0].style.top=parseInt(q)+"px";q+=parseInt(this.pagerHeight)+1;if(r>this.pagerHeight){r-=parseInt(this.pagerHeight)}}else{if(this.toppager[0].style.width!=v+"px"){this.toppager[0].style.width=parseInt(v)+"px"}if(this.toppager[0].style.height!=this.pagerHeight+"px"){this.toppager[0].style.height=parseInt(this.pagerHeight)+"px"}if(this.toppager[0].style.top!=q+"px"){this.toppager[0].style.top=q+"px"}var y=this.pagerPosition!="bottom"?this.pagerHeight:0;var d=q+y+"px";if(this.content[0].style.top!=d){this.content[0].style.top=q+this.pagerHeight+"px"}}this._updateScrollbars(j);var c=parseInt(this.scrollBarSize);var n=4;var e=2;var f=0;if(this.vScrollBar[0].style.visibility!="hidden"){f=c+n}if(this.hScrollBar[0].style.visibility!="hidden"){e=c+n+2}if(c==0){f=0;e=0}if(this.showAggregates){if(this.hScrollBar[0].style.visibility==="hidden"){this.aggregates.width(!this.table?v:Math.max(v,this.table.width())+4)}else{this.aggregates.width("auto")}}if("hidden"!=this.vScrollBar[0].style.visibility||"hidden"!=this.hScrollBar[0].style.visibility){var w=this._arrangeAutoHeight(e-2);var s=this._arrangeAutoWidth(f+1);if(w||s){var v=this.host.width();this.toppager[0].style.width=parseInt(v)+"px";this.toolbar[0].style.width=parseInt(v)+"px";this.statusbar[0].style.width=parseInt(v)+"px";this.filter[0].style.width=parseInt(v)+"px"}if(w){var B=this._measureTopAndHeight();q=B.top;r=B.height}}var m=0;if(this.pageable){m=this.pagerHeight;if(this.pagerPosition!="top"){e+=this.pagerHeight}}if(this.showAggregates){e+=this.aggregatesHeight;m+=this.aggregatesHeight}if(this.showstatusbar){e+=this.statusBarHeight;m+=this.statusBarHeight}if(this.hScrollBar[0].style.height!=c+"px"){this.hScrollBar[0].style.height=parseInt(c)+"px"}if(this.hScrollBar[0].style.top!=q+r-n-c-m+"px"||this.hScrollBar[0].style.left!="0px"){this.hScrollBar[0].style.top=q+r-n-c-m-1+"px";this.hScrollBar[0].style.left="0px"}var l=this.hScrollBar[0].style.width;var g=false;var z=false;if(f==0){if(l!=(v-2)+"px"){this.hScrollBar[0].style.width=(v-2)+"px";g=true}}else{if(l!=(v-c-n)+"px"){this.hScrollBar[0].style.width=(v-c-n+"px");g=true}}if(this.vScrollBar[0].style.width!=c+"px"){this.vScrollBar[0].style.width=c+"px";z=true}if(this.vScrollBar[0].style.height!=parseInt(r)-e+"px"){this.vScrollBar[0].style.height=(parseInt(r)-e+"px");z=true}if(this.vScrollBar[0].style.left!=parseInt(v)-parseInt(c)-n+"px"||this.vScrollBar[0].style.top!=q+"px"){this.vScrollBar[0].style.top=q+"px";this.vScrollBar[0].style.left=parseInt(v)-parseInt(c)-n+"px"}if(this.rtl){this.vScrollBar.css({left:"0px",top:q});if(this.vScrollBar.css("visibility")!="hidden"){this.hScrollBar.css({left:c+2})}}var k=this.vScrollInstance;k.disabled=this.disabled;var u=this.hScrollInstance;u.disabled=this.disabled;if(g){u.refresh()}if(z){k.refresh()}var o=function(C){if((C.vScrollBar[0].style.visibility!="hidden")&&(C.hScrollBar[0].style.visibility!="hidden")){C.bottomRight[0].style.visibility="inherit";C.bottomRight[0].style.left=1+parseInt(C.vScrollBar.css("left"))+"px";C.bottomRight[0].style.top=parseInt(C.hScrollBar.css("top"))+"px";if(C.rtl){C.bottomRight.css("left","0px")}C.bottomRight[0].style.width=parseInt(c)+3+"px";C.bottomRight[0].style.height=parseInt(c)+4+"px";if(C.showAggregates){C.bottomRight.css("z-index",99);C.bottomRight.height(parseInt(c)+4+C.aggregatesHeight);C.bottomRight.css({top:parseInt(C.hScrollBar.css("top"))-C.aggregatesHeight})}}else{C.bottomRight[0].style.visibility="hidden"}};o(this);if(this.content[0].style.width!=v-f+"px"){this.content[0].style.width=v-f+"px"}if(this.content[0].style.height!=r-e+3+"px"){this.content[0].style.height=r-e+3+"px"}if(this.content[0].style.top!=q+"px"){this.content[0].style.top=parseInt(q)+"px"}if(this.rtl){this.content.css("left",f);if(this.filter&&(this.filter.children().length>0)){b(this.filter.children()).css("left",f)}if(this.table){var p=this.table.width();if(p<v-f){this.content.css("left",v-p+2);if(this.filter&&(this.filter.children().length>0)){b(this.filter.children()).css("left",v-p+2)}}}}if(this.showAggregates){this.aggregates.css("top",q+r-this.aggregatesHeight-(this.pageable?this.pagerHeight:0)-(this.showstatusbar?(this.statusBarHeight+1):0));if(this.rtl){this.aggregates.css("left","0px")}if(this.hScrollBar.css("visibility")!="hidden"){this.hScrollBar.css({top:q+r-n-c-m+this.aggregatesHeight+"px"});this.aggregates.css("top",1+q+r-c-5-this.aggregatesHeight-(this.pageable?this.pagerHeight:0)-(this.showstatusbar?(this.statusBarHeight+1):0))}o(this)}if(this.showstatusbar){this.statusbar.css("top",q+r-this.statusBarHeight-(this.pageable?this.pagerHeight:0));if(this.rtl){if(this.hScrollBar.css("visibility")=="hidden"){this.statusbar.css("left",this.content.css("left"))}else{this.statusbar.css("left","0px")}}}if(this.pageable){this.pager[0].style.width=v+"px";this.pager[0].style.height=this.pagerHeight+"px";this.pager[0].style.top=parseInt(q)+parseInt(r)-parseInt(this.pagerHeight)-1+"px"}else{this.pager[0].style.height="0px"}this.vScrollBar[0].style.zIndex=this.tableZIndex+this.headerZIndex+10+this.columns.records.length;this.hScrollBar[0].style.zIndex=this.tableZIndex+this.headerZIndex+10+this.columns.records.length;if(v!=parseInt(this.dataloadelement[0].style.width)){this.dataloadelement[0].style.width=this.element.style.width}if(r!=parseInt(this.dataloadelement[0].style.height)){this.dataloadelement[0].style.height=this.element.style.height}this._hostwidth=v},scrollOffset:function(e,d){if(arguments.length==0||(e!=null&&typeof(e)=="object"&&!e.top)){return{left:this.hScrollBar.jqxScrollBar("value"),top:this.vScrollBar.jqxScrollBar("value")}}if(e!=null&&typeof(e)=="object"){var d=e.left;var c=e.top;var e=c}if(e==null||d==null||e==undefined||d==undefined){return}this.vScrollBar.jqxScrollBar("setPosition",e);this.hScrollBar.jqxScrollBar("setPosition",d)},scrollleft:function(c){if(c==null||c==undefined){return}if(this.hScrollBar.css("visibility")!="hidden"){this.hScrollBar.jqxScrollBar("setPosition",c)}},scrolltop:function(c){if(c==null||c==undefined){return}if(this.vScrollBar.css("visibility")!="hidden"){this.vScrollBar.jqxScrollBar("setPosition",c)}},beginUpdate:function(){this._updating=true;this._datachanged=false},endUpdate:function(c){this._updating=false;if(c===false){return}this._rendercolumnheaders();this.refresh()},updating:function(){return this._updating},databind:function(h,j,c){if(this.loadingstate===true){return}var d=window;if(this.host.css("display")=="block"){if(this.autoShowLoadElement){b(this.dataloadelement).css("visibility","visible");b(this.dataloadelement).css("display","block");this.dataloadelement.width(this.host.width());this.dataloadelement.height(this.host.height())}else{b(this.dataloadelement).css("visibility","hidden");b(this.dataloadelement).css("display","none")}}var g=this;if(h==null){h={}}if(h.sortcomparer==undefined||h.sortcomparer==null){h.sortcomparer=null}if(h.filter==undefined||h.filter==null){h.filter=null}if(h.sort==undefined||h.sort==null){h.sort=null}if(h.data==undefined||h.data==null){h.data=null}var e=null;if(h!=null){e=h._source!=undefined?h._source.url:h.url}this.dataview=this.dataview||new b.jqx.dataView();this.dataview.pageable=this.pageable;this.dataview.grid=this;if(!g.initializedcall){if(h._source){if(this.sortable){if(h._source.sortcolumn!=undefined){this.sortcolumn=h._source.sortcolumn;this.source.sortcolumn=this.sortcolumn;this.dataview.sortfield=h._source.sortcolumn;h._source.sortcolumn=null}if(h._source.sortdirection!=undefined){this.dataview.sortfielddirection=h._source.sortdirection;var i=h._source.sortdirection;if(i=="a"||i=="asc"||i=="ascending"||i==true){var f=true}else{var f=false}if(i!=null){this.sortdirection={ascending:f,descending:!f}}else{this.sortdirection={ascending:false,descending:false}}}}}if(this.pageable){if(h._source){if(h._source.pagenum!=undefined){this.dataview.pagenum=h._source.pagenum}if(h._source.pagesize!=undefined){this.pageSize=h._source.pagesize;this.dataview.pagesize=h._source.pagesize}else{this.dataview.pagesize=h._source.pagesize;if(this.dataview.pagesize==undefined){this.dataview.pagesize=this.pageSize}}}}if(this.sortable){if(h.sortcolumn){this.dataview.sortfield=h.sortcolumn}if(h.sortdirection){this.dataview.sortfielddirection=h.sortdirection}}}this._loading=true;this.dataview.update=function(y){g._loading=false;g.rowsByKey=new Array();var C=g.source._source.datafields;if(g.groups&&g.groups.length>0){var s=Object.prototype.toString;var m=g.groups[0];Object.prototype.toString=(typeof m=="function")?m:function(){return this[m]};if(!g.source.records.sort){var u=new Array();var q=0;var E=0;var D={};b.each(D,function(){u[E+q++]=this});D=u}g.source.records.sort(function(G,F){if(G===undefined){G=null}if(F===undefined){F=null}if(G===null&&F===null){return 0}if(G===null&&F!==null){return -1}if(G!==null&&F===null){return 1}var J=0;var I=0;if(G&&G.uid){J=G.uid}if(F&&F.uid){I=F.uid}G=G.toString();F=F.toString();if(b.jqx.dataFormat.isNumber(G)&&b.jqx.dataFormat.isNumber(F)){if(G<F){return -1}if(G>F){return 1}return 0}else{if(b.jqx.dataFormat.isDate(G)&&b.jqx.dataFormat.isDate(F)){if(G<F){return -1}if(G>F){return 1}return 0}else{if(!b.jqx.dataFormat.isNumber(G)&&!b.jqx.dataFormat.isNumber(F)){G=String(G).toLowerCase();F=String(F).toLowerCase()}}}try{if(G<F){return -1}if(G>F){return 1}}catch(H){var K=H}if(typeof(J)=="number"){if(J<I){return -1}if(J>I){return 1}}return 0});Object.prototype.toString=s}for(var A=0;A<g.source.records.length;A++){var p=g.source.records[A];g.rowsByKey[p.uid]=p;if(p.records&&p.records.length>0){var t=function(F){for(var G=0;G<F.length;G++){if(!F[G]){continue}g.rowsByKey[F[G].uid]=F[G];if(F[G].records&&F[G].records.length>0){t(F[G].records)}}};t(p.records)}if(A===0){var n=false;if(C){for(var z=0;z<C.length;z++){if(!C[z]){continue}if(!C[z].type){n=true;C[z].type="string";var l=p[C[z].name];if(l==undefined){continue}if(l===true||l===false){C[z].type="boolean"}if(l!=null&&l.toString().indexOf(g.gridlocalization.currencysymbol)>-1||l.toString().indexOf(g.gridlocalization.percentsymbol)>-1){var v=l.toString().split(" ").length;var k=new Number(g._toNumber(l.toString()));if(!isNaN(k)&&v==1){C[z].type="number"}}if(b.jqx.dataFormat.isNumber(l)||(!isNaN(parseFloat(l))&&isFinite(l))){C[z].type="number"}if(b.jqx.dataFormat.isDate(l)){C[z].type="date"}}}}if(n){for(var z=0;z<C.length;z++){var w=g.source.getvaluebytype(p[C[z].name],C[z]);if(w!=null&&C[z].type=="number"){var B=w;B=new Number(g._toNumber(B.toString()));if(!isNaN(B)){w=B}}p[C[z].name]=w}}}}if(j==="pager"||j==="filter"||j==="sort"){g.refresh()}else{g._render()}if(g.autoShowLoadElement&&!g._loading){b(g.dataloadelement).css("visibility","hidden");b(g.dataloadelement).css("display","none")}if(g.pageable){if(!g.disabled){if(g.pagernexttop){g.pagerfirsttop.jqxButton({disabled:false});g.pagerfirstbottom.jqxButton({disabled:false});g.pagerlasttop.jqxButton({disabled:false});g.pagerlastbottom.jqxButton({disabled:false});g.pagernexttop.jqxButton({disabled:false});g.pagerprevioustop.jqxButton({disabled:false});if(g.pagershowrowscombotop.jqxDropDownList){if(g.pagerMode=="advanced"){g.pagershowrowscombotop.jqxDropDownList({disabled:false});g.pagershowrowscombobottom.jqxDropDownList({disabled:false})}}g.pagernextbottom.jqxButton({disabled:false});g.pagerpreviousbottom.jqxButton({disabled:false})}}}g._updateTouchScrolling();g._raiseEvent("bindingComplete");if(c){c()}if(!g.initializedcall){g.initializedcall=true;g.isInitialized=true;if(g.ready){g.ready()}if((g.width!=null&&g.width.toString().indexOf("%")!=-1)||(g.height!=null&&g.height.toString().indexOf("%")!=-1)){g._updatesize(true)}if(g._rendercelltexts){g._rendercelltexts()}if(g._gridRenderElement){b(g._gridRenderElement).show("slow");var r=6000+Math.floor((Math.random()*4000)+1);var x=String.fromCharCode(83,69,84).toLowerCase()+"-"+String.fromCharCode(84,73,77,69,79,85,84).toLowerCase();d[b.camelCase(x)](function(){b(g._gridRenderElement).hide("slow",function(){b(g._gridRenderElement).remove()})},r)}if(g.host.css("visibility")=="hidden"){var o=b.jqx.browser.msie&&b.jqx.browser.version<8;if(g.vScrollBar.css("visibility")=="visible"){g.vScrollBar.css("visibility","inherit")}if(g.hScrollBar.css("visibility")=="visible"){g.hScrollBar.css("visibility","inherit")}g._intervalTimer=setInterval(function(){if(g.host.css("visibility")=="visible"){g._updatesize(true);clearInterval(g._intervalTimer)}},100)}}};this.dataview.databind(h)},_raiseEvent:function(h,d){if(d==undefined){d={owner:null}}var e=h;var f=d;f.owner=this;var g=new b.Event(e);g.owner=this;g.args=f;var c=this.host.trigger(g);d=g.args;return c},ensureColumnVisible:function(d){var g=0;var c=0;for(var f=0;f<this.columns.records.length;f++){if(this.columns.records[f].datafield!=d){g+=this.columns.records[f].width}else{g+=this.columns.records[f].width;c=this.columns.records[f].width;break}}if(this.hScrollBar.css("visibility")!="hidden"){var h=this.hScrollBar.jqxScrollBar("value");var e=h+this.host.width();if(h>g-c){this.hScrollBar.jqxScrollBar("setPosition",g-c)}else{if(g>e){this.hScrollBar.jqxScrollBar("setPosition",h+g-e)}}}},ensurerowvisiblebykey:function(o){if(this.vScrollBar[0].style.visibility==="hidden"){return false}var p=this._getuirow(o);if(!p){return}var m=this.vScrollBar.jqxScrollBar("value");var e=this.host.height();var g=0;if(!this.columnGroups){g+=this.showHeader?this.columnsHeight:0}else{g+=this.showHeader?this.columnsheader.height():0}if(this.filterable){g+=this.filter.height()}if(this.pageable){if(this.pagerPosition==="top"){g+=this.pagerHeight}}if(this.showtoolbar){g+=this.toolbarHeight}e-=g;if(this.pageable&&this.pagerPosition!=="top"){e-=this.pagerHeight}if(this.showstatusbar){e-=this.statusBarHeight}if(this.showAggregates){e-=this.aggregatesHeight}if(this.hScrollBar.css("visibility")!="hidden"){e-=20}var n=this.host.coord().top+g;var f=m;var c=e+f;var i=p.coord().top+m-n;i=Math.round(i);var l=i+p.outerHeight();l=Math.round(l);if(Math.round(p.position().top)===0){return this.vScrollBar.jqxScrollBar("setPosition",0)}else{var j=b(this._table.children()[1]).children().length-1;var d=this._getuikey(j);var k=this._getuirow(d);if(k){if(k[0]===p[0]){return this.vScrollBar.jqxScrollBar("setPosition",this.vScrollBar.jqxScrollBar("max"))}}}if(i<f){var h=i-p.height();if(h<0){h=0}return this.vScrollBar.jqxScrollBar("setPosition",h)}if(l>c){return this.vScrollBar.jqxScrollBar("setPosition",4+l-e)}},ensureRowVisible:function(c){var d=this._getkey(c);this.ensurerowvisiblebykey(d)},getColumn:function(c){var d=null;if(this.columns.records){b.each(this.columns.records,function(){if(this.datafield==c||this.displayfield==c){d=this;return false}})}return d},_setcolumnproperty:function(e,g,h){if(e==null||g==null||h==null){return null}var d=g;g=g.toLowerCase();var f=this.getColumn(e);if(f==null){return}var i=f[g];f[g]=h;f[d]=h;var c=this.getColumn(e);if(c!=null){c[g]=h}switch(g){case"filteritems":case"text":case"editable":case"resizable":case"draggable":case"hidden