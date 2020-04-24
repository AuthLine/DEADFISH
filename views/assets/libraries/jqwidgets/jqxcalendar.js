/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxCalendar","",{});a.extend(a.jqx._jqxCalendar.prototype,{defineInstance:function(){var b={disabled:false,restrictedDates:new Array(),multipleMonthRows:1,multipleMonthColumns:1,minDate:a.jqx._jqxDateTimeInput.getDateTime(new Date()),maxDate:a.jqx._jqxDateTimeInput.getDateTime(new Date()),min:new Date(1900,0,1),max:new Date(2100,0,1),navigationDelay:400,stepMonths:1,width:null,height:null,value:a.jqx._jqxDateTimeInput.getDateTime(new Date()),firstDayOfWeek:0,showWeekNumbers:false,showDayNames:true,enableWeekend:false,enableOtherMonthDays:true,showOtherMonthDays:true,rowHeaderWidth:25,columnHeaderHeight:25,titleHeight:30,dayNameFormat:"firstTwoLetters",monthNameFormat:"default",titleFormat:["MMMM yyyy","yyyy","yyyy","yyyy"],enableViews:true,readOnly:false,culture:"default",enableFastNavigation:true,enableHover:true,enableAutoNavigation:true,enableTooltips:false,backText:"Back",forwardText:"Forward",specialDates:new Array(),keyboardNavigation:true,selectionMode:"default",selectableDays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],todayString:"Today",clearString:"Clear",showFooter:false,selection:{from:null,to:null},canRender:true,_checkForHiddenParent:true,height:null,rtl:false,view:"month",views:["month","year","decade"],changing:null,change:null,localization:{backString:"Back",forwardString:"Forward",todayString:"Today",clearString:"Clear",calendar:{name:"Gregorian_USEnglish","/":"/",":":":",firstDay:0,days:{names:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],namesAbbr:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],namesShort:["Su","Mo","Tu","We","Th","Fr","Sa"]},months:{names:["January","February","March","April","May","June","July","August","September","October","November","December",""],namesAbbr:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""]},AM:["AM","am","AM"],PM:["PM","pm","PM"],eras:[{name:"A.D.",start:null,offset:0}],twoDigitYearMax:2029,patterns:{d:"M/d/yyyy",D:"dddd, MMMM dd, yyyy",t:"h:mm tt",T:"h:mm:ss tt",f:"dddd, MMMM dd, yyyy h:mm tt",F:"dddd, MMMM dd, yyyy h:mm:ss tt",M:"MMMM dd",Y:"yyyy MMMM",S:"yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",ISO:"yyyy-MM-dd hh:mm:ss"}}},events:["backButtonClick","nextButtonClick","valuechanged","cellMouseDown","cellMouseUp","cellSelected","cellUnselected","change","viewChange"]};if(this===a.jqx._jqxCalendar.prototype){return b}a.extend(true,this,b);this.minDate._setYear(1900);this.minDate._setMonth(1);this.minDate._setDay(1);this.minDate._setHours(0);this.minDate._setMinutes(0);this.minDate._setSeconds(0);this.minDate._setMilliseconds(0);this.maxDate._setYear(2100);this.maxDate._setMonth(1);this.maxDate._setDay(1);this.maxDate._setHours(0);this.maxDate._setMinutes(0);this.maxDate._setSeconds(0);this.maxDate._setMilliseconds(0);this.value._setHours(0);this.value._setMinutes(0);this.value._setSeconds(0);this.value._setMilliseconds(0);return b},_createFromInput:function(d){var g=this;if(g.element.nodeName.toLowerCase()=="input"){g.field=g.element;if(g.field.className){g._className=g.field.className}var f={title:g.field.title};if(g.field.value){f.value=g.field.value}if(g.field.checked){f.checked=true}if(g.field.id.length){f.id=g.field.id.replace(/[^\w]/g,"_")+"_"+d}else{f.id=a.jqx.utilities.createId()+"_"+d}if(g.field.getAttribute("min")){var e=new Date(g.field.getAttribute("min"));if(e!="Invalid Date"){g.min=e}}if(g.field.getAttribute("max")){var c=new Date(g.field.getAttribute("max"));if(c!="Invalid Date"){g.max=c}}var i=a("<div></div>",f);i[0].style.cssText=g.field.style.cssText;if(!g.width){g.width=a(g.field).width()}if(!g.height){g.height=a(g.field).outerHeight()}a(g.field).hide().after(i);var h=g.host.data();g.host=i;g.host.data(h);g.element=i[0];g.element.id=g.field.id;g.field.id=f.id;if(g._className){g.host.addClass(g._className);a(g.field).removeClass(g._className)}if(g.field.tabIndex){var b=g.field.tabIndex;g.field.tabIndex=-1;g.element.tabIndex=b}}},createInstance:function(k){var j=this;j._createFromInput("jqxCalendar");if(j.isMaterialized()){var m=window.getComputedStyle(this.element);var i=m.getPropertyValue("--jqx-calendar-title-height");var c=m.getPropertyValue("--jqx-calendar-column-header-height");if(i){this.titleHeight=parseInt(i)}if(c){this.columnHeaderHeight=parseInt(c)}setTimeout(function(){j.refreshControl()},200)}this.setCalendarSize();if(this.element.id===""){this.element.id=a.jqx.utilities.createId()}if(a.type(this.value)=="date"){this.value=a.jqx._jqxDateTimeInput.getDateTime(this.value)}this.element.innerHTML="";this.host.attr("data-role","calendar");var b=this.element.id;var l=this;this.propertyChangeMap.width=function(n,p,o,q){l.setCalendarSize()};this.propertyChangeMap.height=function(n,p,o,q){l.setCalendarSize()};if(a.global){a.global.preferCulture(this.culture)}if(this.culture!="default"){if(a.global){a.global.preferCulture(this.culture);this.localization.calendar=a.global.culture.calendar}else{if(window.Globalize){var e=window.Globalize.culture(this.culture);this.localization.calendar=e.calendar}}this.firstDayOfWeek=this.localization.calendar.firstDay}if(this.localization.backString!="Back"){this.backText=this.localization.backString}if(this.localization.forwardString!="Forward"){this.forwardText=this.localization.forwardString}if(this.localization.todayString!="Today"&&this.localization.todayString){this.todayString=this.localization.todayString}if(this.localization.clearString!="Clear"&&this.localization.clearString){this.clearString=this.localization.clearString}if(this.localization.calendar&&this.localization.calendar.firstDay!=undefined&&this.culture!="default"){this.firstDayOfWeek=this.localization.calendar.firstDay}this.setMaxDate(this.max,false);this.setMinDate(this.min,false);if(!this.host.attr("tabIndex")){this.host.attr("tabIndex",0)}this.host.css("outline","none");this.host.addClass(this.toThemeProperty("jqx-calendar"));this.host.addClass(this.toThemeProperty("jqx-widget"));this.host.addClass(this.toThemeProperty("jqx-widget-content"));this.host.addClass(this.toThemeProperty("jqx-rc-all"));this._addInput();if(this.views.indexOf("month")==-1){this.view="year"}if(this.views.indexOf("year")==-1&&this.views.indexOf("month")==-1){this.view="decade"}this.addHandler(this.host,"keydown",function(o){var n=true;if(l.keyboardNavigation){if(l._handleKey!=undefined){n=l._handleKey(o);if(!n){if(o.stopPropagation){o.stopPropagation()}if(o.preventDefault){o.preventDefault()}}}}return n});var f=false;var h=this;var g=false;if(l.width!=null&&l.width.toString().indexOf("%")!=-1){g=true}if(l.height!=null&&l.height.toString().indexOf("%")!=-1){g=true}a.jqx.utilities.resize(this.host,function(){var n=h.host.find("#View"+l.element.id);if(!f){f=true;h.render()}else{h.refreshTitle(n)}if(g){if(l.refreshTimer){clearTimeout(l.refreshTimer)}l.refreshTimer=setTimeout(function(){l.refreshControl()},1)}},false,this._checkForHiddenParent);var d="View";this.propertyChangeMap.disabled=function(n,p,o,q){if(q){n.host.addClass(l.toThemeProperty("jqx-fill-state-disabled"))}else{n.host.removeClass(l.toThemeProperty("jqx-fill-state-disabled"))}l.refreshControl()}},_addInput:function(){var b=this.host.attr("name");this.input=a("<input type='hidden'/>");this.host.append(this.input);if(b){this.input.attr("name",b)}this.input.val(this.getDate().toString())},setCalendarSize:function(){if(this.width!=null&&this.width.toString().indexOf("px")!=-1){this.host.width(this.width)}else{if(this.width!=undefined&&!isNaN(this.width)){this.host.width(this.width)}}if(this.width!=null&&this.width.toString().indexOf("%")!=-1){this.host.css("width",this.width)}if(this.height!=null&&this.height.toString().indexOf("px")!=-1){this.host.height(this.height)}else{if(this.height!=undefined&&!isNaN(this.height)){this.host.height(this.height)}}if(this.height!=null&&this.height.toString().indexOf("%")!=-1){this.host.css("height",this.height)}},_getYearAndMonthPart:function(c){if(!c){return new Date(1900,0,1)}var b=new Date(c.getFullYear(),c.getMonth(),1);return b},_handleKey:function(p){if(this.readOnly){return true}var A=p.keyCode;var y=this;var b=this._getSelectedDate();if(b==undefined){if(this.view=="month"&&(A==37||A==38||A==39||A==40)){this.selectedDate=new Date(this.value.year,this.value.month-1,1);this._selectDate(this.selectedDate,"key");b=this.selectedDate}else{return true}}if(p.altKey){return true}if(this._animating){return false}if(this.view!="month"&&A==13){var d=this._getSelectedCell();this._setDateAndSwitchViews(d,p,"keyboard")}if(this.view=="year"){var w=b.getMonth();var j=this._getYearAndMonthPart(this.getMinDate());var m=this._getYearAndMonthPart(this.getMaxDate());switch(A){case 37:if(w==0){var h=new Date(b.getFullYear()-1,11,1);if(h>=j){this.selectedDate=h;this.navigateBackward()}else{if(this.selectedDate!=j){this.selectedDate=j;this.navigateBackward()}}}else{var h=new Date(b.getFullYear(),w-1,1);if(h>=j){this._selectDate(h,"key")}}return false;case 38:var h=new Date(b.getFullYear(),w-4,1);if(h<j){h=j}if(w-4<0){this.selectedDate=h;this.navigateBackward()}else{this._selectDate(h,"key")}return false;case 40:var h=new Date(b.getFullYear(),w+4,1);if(h>m){h=m}if(w+4>11){this.selectedDate=h;this.navigateForward()}else{this._selectDate(h,"key")}return false;case 39:if(w==11){var h=new Date(b.getFullYear()+1,0,1);if(h<=m){this.selectedDate=h;this.navigateForward()}else{if(this.selectedDate!=m){this.selectedDate=m;this.navigateForward()}}}else{var h=new Date(b.getFullYear(),w+1,1);if(h<=m){this._selectDate(h,"key")}}return false}return true}if(this.view=="decade"){var o=this._renderStartDate.getFullYear();var k=this._renderEndDate.getFullYear();var n=b.getFullYear();var v=this.getMinDate().getFullYear();var c=this.getMaxDate().getFullYear();switch(A){case 37:if(n-1>=v){if(n<=o){this.selectedDate=new Date(n-1,b.getMonth(),1);this.navigateBackward()}else{this._selectDate(new Date(n-1,b.getMonth(),1),"key")}}return false;case 38:var x=n-4;if(n-4<v){x=v}if(x<o){this.selectedDate=new Date(x,b.getMonth(),1);this.navigateBackward()}else{this._selectDate(new Date(x,b.getMonth(),1),"key")}return false;case 40:var x=n+4;if(x>c){x=c}if(x>k){this.selectedDate=new Date(x,b.getMonth(),1);this.navigateForward()}else{this._selectDate(new Date(x,b.getMonth(),1),"key")}return false;case 39:if(n+1<=c){if(n==k){this.selectedDate=new Date(n+1,b.getMonth(),1);this.navigateForward()}else{this._selectDate(new Date(n+1,b.getMonth(),1),"key")}}return false}return true}var u=new a.jqx._jqxDateTimeInput.getDateTime(b);var f=this.getViewStart();var e=this.getViewEnd();var t=u;var s=a.data(this.element,"View"+this.element.id);if(s==undefined||s==null){return true}if(A==36){u._setDay(1);if(this._isDisabled(u.dateTime)){return false}this._selectDate(u.dateTime,"key");return false}if(A==35){var r=this.value._daysInMonth(this.value.year,this.value.month);u._setDay(r);if(this._isDisabled(u.dateTime)){return false}this._selectDate(u.dateTime,"key");return false}var g=1;if(p.ctrlKey){g=12}if(A==34){var z=this.navigateForward(g);if(z){u._addMonths(g);if(this._isDisabled(u.dateTime)){return false}this._selectDate(u.dateTime,"key")}return false}if(A==33){var z=this.navigateBackward(g);if(z){u._addMonths(-g);if(this._isDisabled(u.dateTime)){return false}this._selectDate(u.dateTime,"key")}return false}if(A==38){u._addDays(-7);if(u.dateTime<this.getMinDate()){return false}if(u.dateTime<f){var z=this.navigateBackward();if(!z){return false}}if(this._isDisabled(u.dateTime)){return false}this._selectDate(u.dateTime,"key");for(var q=0;q<s.cells.length;q++){var d=s.cells[q];var l=d.getDate();if(d.isOtherMonth&&d.isSelected&&l<=u.dateTime){this.value.day=l.getDate();this.navigateBackward();this._selectDate(u.dateTime,"key");break}}return false}else{if(A==40){u._addDays(7);if(u.dateTime>this.getMaxDate()){return false}if(u.dateTime>e){var z=this.navigateForward();if(!z){return false}}if(this._isDisabled(u.dateTime)){return false}this._selectDate(u.dateTime,"key");for(var q=0;q<s.cells.length;q++){var d=s.cells[q];var l=d.getDate();if(d.isOtherMonth&&d.isSelected&&l>=u.dateTime){this.value.day=l.getDate();this.navigateForward();this._selectDate(u.dateTime,"key");break}}return false}}if(A==37){u._addDays(-1);if(u.dateTime<this.getMinDate()){return false}if(u.dateTime<f){var z=this.navigateBackward();if(!z){return false}}if(this._isDisabled(u.dateTime)){return false}this._selectDate(u.dateTime,"key");for(var q=0;q<s.cells.length;q++){var d=s.cells[q];var l=d.getDate();if(d.isOtherMonth&&d.isSelected&&l<=u.dateTime){if(u.dateTime<this.getMinDate()||u.dateTime>this.getMaxDate()){return false}if(this._isDisabled(u.dateTime)){return false}this.navigateBackward();this._selectDate(u.dateTime,"key");break}}return false}else{if(A==39){u._addDays(1);if(u.dateTime>this.getMaxDate()){return false}if(u.dateTime>e){var z=this.navigateForward();if(!z){return false}}if(this._isDisabled(u.dateTime)){return false}this._selectDate(u.dateTime,"key");for(var q=0;q<s.cells.length;q++){var d=s.cells[q];var l=d.getDate();if(d.isOtherMonth&&d.isSelected&&l>=u.dateTime){if(u.dateTime<this.getMinDate()||u.dateTime>this.getMaxDate()){return false}this.navigateForward();this._selectDate(u.dateTime,"key");break}}return false}}return true},render:function(){if(!this.canRender){return}this.host.children().remove();var c=this._renderSingleCalendar("View"+this.element.id);var b=this;this.host.append(c)},addSpecialDate:function(b,c,d){if(this.multipleMonthRows==1&&this.multipleMonthColumns==1){var e=this.specialDates.length;this.specialDates[e]={Date:b,Class:c,Tooltip:d};this.refreshControl()}},refresh:function(c){var b=this;this.render();setTimeout(function(){b.refreshControl()})},invalidate:function(){this.refreshControl()},refreshControl:function(){if(this.multipleMonthRows==1&&this.multipleMonthColumns==1){this.refreshSingleCalendar("View"+this.element.id,null)}},getViewStart:function(){var c=this.getVisibleDate();var b=this.getFirstDayOfWeek(c);return b.dateTime},getViewEnd:function(){var c=this.getViewStart();var b=new a.jqx._jqxDateTimeInput.getDateTime(c);b._addDays(41);return b.dateTime},refreshSingleCalendar:function(e,l){if(!this.canRender){return}var j=this.host.find("#"+e);var f=this.getVisibleDate();var c=this.getFirstDayOfWeek(f);this.refreshCalendarCells(j,c,e);this.refreshTitle(j);this.refreshRowHeader(j,e);if(this.selectedDate!=undefined){this._selectDate(this.selectedDate)}var b=parseInt(this.month.css("padding-top"));var g=this.host.height()-2*b;var k=g-this.titleHeight-this.columnHeaderHeight;if(!this.showDayNames){k=this.month.height()-this.titleHeight}if(this.showFooter){k-=20}var d=j.find("#cellsTable"+e);var i=j.find("#calendarRowHeader"+e);d.height(k);i.height(k)},refreshRowHeader:function(s,m){if(!this.showWeekNumbers){return}var c=this.getVisibleDate();var h=this.getFirstDayOfWeek(c);var n=h.dayOfWeek;var t=this.getWeekOfYear(h);var f=new a.jqx._jqxDateTimeInput.getDateTime(new Date(h.dateTime));f._addDays(5);f.dayOfWeek=f.dateTime.getDay();var k=this.getWeekOfYear(f);var e=this.rowHeader.find("table");e.width(this.rowHeaderWidth);var g=h;var q=new Array();for(var p=0;p<6;p++){var o=t.toString();var b=new a.jqx._jqxCalendar.cell(g.dateTime);var l=p+1+this.element.id;var j=a(e[0].rows[p].cells[0]);b.element=j;b.row=p;b.column=0;var d=j.find("#headerCellContent"+l);d.addClass(this.toThemeProperty("jqx-calendar-row-cell"));d[0].innerHTML=t;q[p]=b;g=new a.jqx._jqxDateTimeInput.getDateTime(new Date(g._addWeeks(1)));t=this.getWeekOfYear(g)}var r=a.data(this.element,s[0].id);r.rowCells=q;this._refreshOtherMonthRows(r,m)},_refreshOtherMonthRows:function(f,e){if(this.showOtherMonthDays){return}this._displayLastRow(true,e);this._displayFirstRow(true,e);var d=false;var g=false;for(var c=0;c<f.cells.length;c++){var b=f.cells[c];if(b.isVisible&&c<7){d=true}else{if(b.isVisible&&c>=f.cells.length-7){g=true}}}if(!d){this._displayFirstRow(false,e)}if(!g){this._displayLastRow(false,e)}},_displayLastRow:function(b,c){var g=this.host.find("#"+c);var f=g.find("#calendarRowHeader"+g[0].id).find("table");var d=null;if(this.showWeekNumbers){if(f[0].cells){var d=a(f[0].rows[5])}}var e=a(g.find("#cellTable"+g[0].id)[0].rows[5]);if(b){if(this.showWeekNumbers&&d){d.css("display","table-row")}e.css("display","table-row")}else{if(this.showWeekNumbers&&d){d.css("display","none")}e.css("display","none")}},_displayFirstRow:function(b,c){var e=this.host.find("#"+c);var d=e.find("#calendarRowHeader"+e[0].id).find("table");var f=null;if(this.showWeekNumbers){if(d[0].cells){var f=a(d[0].rows[0])}}var g=a(e.find("#cellTable"+e[0].id)[0].rows[0]);if(b){if(this.showWeekNumbers&&f){f.css("display","table-row")}g.css("display","table-row")}else{if(this.showWeekNumbers&&f){f.css("display","none")}g.css("display","none")}},_renderSingleCalendar:function(q,l){if(!this.canRender){return}var n=this.host.find("#"+q.toString());if(n!=null){n.remove()}var v=a("<div id='"+q.toString()+"'></div>");var b=this.getVisibleDate();var m=this.getFirstDayOfWeek(b);var e=new a.jqx._jqxDateTimeInput.getDateTime(m.dateTime);e._addMonths(1);var u=a.jqx._jqxCalendar.monthView(m,e,null,null,null,v);if(l==undefined||l==null){this.host.append(v);v[0].style.width="100%";v[0].style.height="100%"}else{l.append(v)}a.data(this.element,q,u);var t=parseInt(v.css("padding-top"));var s=this.host.height()-2*t;var r=s-this.titleHeight-this.columnHeaderHeight;if(!this.showDayNames){r=s-this.titleHeight}if(this.showFooter){r-=20}if(this.rowHeaderWidth<0){this.rowHeaderWidth=0}if(this.columnHeaderHeight<0){this.columnHeaderHeight=0}if(this.titleHeight<0){this.titleHeight=0}var g=this.rowHeaderWidth;var k=this.columnHeaderHeight;if(!this.showWeekNumbers){g=0}if(!this.showDayNames){k=0}var x="<div style='height:"+this.titleHeight+"px;'><table role='grid' style='margin: 0px; width: 100%; height: 100%; border-spacing: 0px;' cellspacing='0' cellpadding='0'><tr role='row' id='calendarTitle' width='100%'><td role='gridcell' NOWRAP id='leftNavigationArrow'></td><td aria-live='assertive' aria-atomic='true' role='gridcell' align='center' NOWRAP id='calendarTitleHeader'></td><td role='gridcell' NOWRAP id='rightNavigationArrow'></td></tr></table></div>";var c="<table role='grid' class='"+this.toThemeProperty("jqx-calendar-month")+"' style='margin: 0px; border-spacing: 0px;' cellspacing='0' cellpadding='0'><tr role='row' id='calendarHeader' height='"+k+"'><td role='gridcell' id='selectCell' width='"+g+"'></td><td role='gridcell' colspan='2' style='border: none; padding-left: 2px; padding-right: 2px' id='calendarColumnHeader'></td></tr><tr role='row' id='calendarContent'><td role='gridcell' id='calendarRowHeader' valign='top' height='"+r+"' width='"+g+"'></td><td role='gridcell' valign='top' colspan='2' style='padding-left: 2px; padding-right: 2px' id='cellsTable' height='"+r+"'></td></tr></table>";var p="<div id='footer' style='margin: 0px; display: none; height:"+d+"px;'><table style='width: 100%; height: 100%; border-spacing: 0px;' cellspacing='0' cellpadding='0'><tr id='calendarFooter'><td align='right' id='todayButton'></td><td align='left' colspan='2' id=doneButton></td></tr></table></div>";v[0].innerHTML=x+c+p;this.header=v.find("#calendarHeader");this.header[0].id="calendarHeader"+q;this.header.addClass(this.toThemeProperty("calendar-header"));this.columnHeader=v.find("#calendarColumnHeader");this.columnHeader[0].id="calendarColumnHeader"+q;this.table=v.find("#cellsTable");this.table[0].id="cellsTable"+q;this.rowHeader=v.find("#calendarRowHeader");this.rowHeader[0].id="calendarRowHeader"+q;this.selectCell=v.find("#selectCell");this.selectCell[0].id="selectCell"+q;this.title=v.find("#calendarTitle");this.title[0].id="calendarTitle"+q;this.leftButton=v.find("#leftNavigationArrow");this.leftButton[0].id="leftNavigationArrow"+q;this.titleHeader=v.find("#calendarTitleHeader");this.titleHeader[0].id="calendarTitleHeader"+q;this.rightButton=v.find("#rightNavigationArrow");this.rightButton[0].id="rightNavigationArrow"+q;this.footer=v.find("#calendarFooter");this._footer=v.find("#footer");this._footer[0].id="footer"+q;this.footer[0].id="calendarFooter"+q;this.todayButton=v.find("#todayButton");this.todayButton[0].id="todayButton"+q;this.doneButton=v.find("#doneButton");this.doneButton[0].id="doneButton"+q;this.title.addClass(this.toThemeProperty("jqx-calendar-title-container"));var d=20;if(this.showFooter){this._footer.css("display","block")}v.find("tr").addClass(this.toThemeProperty("jqx-reset"));v.addClass(this.toThemeProperty("jqx-widget-content"));v.addClass(this.toThemeProperty("jqx-calendar-month-container"));this.month=v;this.selectCell.addClass(this.toThemeProperty("jqx-reset"));this.selectCell.addClass(this.toThemeProperty("jqx-calendar-top-left-header"));if(this.showWeekNumbers){this._renderRowHeader(v)}else{this.table[0].colSpan=3;this.columnHeader[0].colSpan=3;this.rowHeader.css("display","none");this.selectCell.css("display","none")}if(this.showFooter){this.footer.height(20);var j=a("<a href='javascript:;'>"+this.todayString+"</a>");j.appendTo(this.todayButton);var i=a("<a href='javascript:;'>"+this.clearString+"</a>");i.appendTo(this.doneButton);i.addClass(this.toThemeProperty("jqx-calendar-footer"));j.addClass(this.toThemeProperty("jqx-calendar-footer"));var o=this;var f="mousedown";if(a.jqx.mobile.isTouchDevice()){f=a.jqx.mobile.getTouchEventName("touchstart")}this.addHandler(j,f,function(){if(o.today){o.today()}else{o.setDate(new Date(),"mouse")}return false});this.addHandler(i,f,function(){if(o.clear){o.clear()}else{o.setDate(null,"mouse")}return false})}if(this.view!="month"){this.header.hide()}if(this.showDayNames&&this.view=="month"){this.renderColumnHeader(v)}this.oldView=this.view;this.renderCalendarCells(v,m,q);if(l==undefined||l==null){this.renderTitle(v)}this._refreshOtherMonthRows(u,q);v.find("tbody").css({border:"none",background:"transparent"});if(this.selectedDate!=undefined){this._selectDate(this.selectedDate)}var w=this;this.addHandler(this.host,"focus",function(){w.focus()});return v},_getTitleFormat:function(){switch(this.view){case"month":return this.titleFormat[0];case"year":return this.titleFormat[1];case"decade":return this.titleFormat[2];case"centuries":return this.titleFormat[3]}},renderTitle:function(t){var k=a("<div role='button' style='float: left;'></div>");var l=a("<div role='button' style='float: right;'></div>");var o=this.title;o.addClass(this.toThemeProperty("jqx-reset"));o.addClass(this.toThemeProperty("jqx-widget-header"));o.addClass(this.toThemeProperty("jqx-calendar-title-header"));var e=o.find("td");if(a.jqx.browser.msie&&a.jqx.browser.version<8){if(e.css("background-color")!="transparent"){var g=o.css("background-color");e.css("background-color",g)}if(e.css("background-image")!="transparent"){var d=o.css("background-image");var p=o.css("background-repeat");var c=o.css("background-position");e.css("background-image",d);e.css("background-repeat",p);e.css("background-position","left center scroll")}}else{e.css("background-color","transparent")}if(this.disabled){o.addClass(this.toThemeProperty("jqx-calendar-title-header-disabled"))}k.addClass(this.toThemeProperty("jqx-calendar-title-navigation"));k.addClass(this.toThemeProperty("jqx-icon-arrow-left"));k.appendTo(this.leftButton);var m=this.leftButton;l.addClass(this.toThemeProperty("jqx-calendar-title-navigation"));l.addClass(this.toThemeProperty("jqx-icon-arrow-right"));l.appendTo(this.rightButton);var b=this.rightButton;if(this.enableTooltips){if(a(m).jqxTooltip){a(m).jqxTooltip({name:this.element.id,position:"mouse",theme:this.theme,content:this.backText});a(b).jqxTooltip({name:this.element.id,position:"mouse",theme:this.theme,content:this.forwardText})}}var n=this.titleHeader;var v=this._format(this.value.dateTime,this._getTitleFormat(),this.culture);if(this.view=="decade"){var q=this._format(this._renderStartDate,this._getTitleFormat(),this.culture);var j=this._format(this._renderEndDate,this._getTitleFormat(),this.culture);v=q+" - "+j}else{if(this.view=="centuries"){var q=this._format(this._renderCenturyStartDate,this._getTitleFormat(),this.culture);var j=this._format(this._renderCenturyEndDate,this._getTitleFormat(),this.culture);v=q+" - "+j}}var f=a("<div style='background: transparent; margin: 0; padding: 0; border: none;'>"+v+"</div>");n.append(f);f.addClass(this.toThemeProperty("jqx-calendar-title-content"));var s=parseInt(k.width());var i=t.width()-2*s;var r=n.find(".jqx-calendar-title-content").width(i);a.data(k,"navigateLeft",this);a.data(l,"navigateRight",this);var h=a.jqx.mobile.isTouchDevice();if(!this.disabled){var u=this;this.addHandler(n,"mousedown",function(A){if(u.enableViews){if(!u._viewAnimating&&!u._animating){var x=u.view;u.oldView=x;switch(u.view){case"month":u.view="year";break;case"year":u.view="decade";break}if(u.views.indexOf("year")==-1&&u.view=="year"){u.view="decade"}if(u.views.indexOf("decade")==-1&&u.view=="decade"){u.view=x}if(x!=u.view){var z="View"+u.element.id;var B=u.host.find("#"+z);var y=u.getVisibleDate();var w=u.getFirstDayOfWeek(y);u.renderCalendarCells(B,w,z,true);u.refreshTitle(B);u._raiseEvent("8")}}return false}});this.addHandler(k,"mousedown",function(x){if(!u._animating){a.data(k,"navigateLeftRepeat",true);var w=a.data(k,"navigateLeft");if(w.enableFastNavigation&&!h){w.startRepeat(w,k,true,u.navigationDelay+200)}w.navigateBackward(u.stepMonths,"arrow");x.stopPropagation();x.preventDefault();return w._raiseEvent(0,x)}else{return false}});this.addHandler(k,"mouseup",function(w){a.data(k,"navigateLeftRepeat",false)});this.addHandler(k,"mouseleave",function(w){a.data(k,"navigateLeftRepeat",false)});this.addHandler(l,"mousedown",function(x){if(!u._animating){a.data(l,"navigateRightRepeat",true);var w=a.data(l,"navigateRight");if(w.enableFastNavigation&&!h){w.startRepeat(w,l,false,u.navigationDelay+200)}w.navigateForward(u.stepMonths,"arrow");x.stopPropagation();x.preventDefault();return w._raiseEvent(1,x)}else{return false}});this.addHandler(l,"mouseup",function(w){a.data(l,"navigateRightRepeat",false)});this