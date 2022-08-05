/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){if(!a.jqx.scheduler){a.jqx.scheduler={}}a.jqx.scheduler.utilities={weekDays:{Sunday:0,Monday:1,Tuesday:2,Wednesday:3,Thursday:4,Friday:5,Saturday:6},guid:function(){function b(){return Math.floor((1+Math.random())*65536).toString(16).substring(1)}return b()+b()},areWeekDaysIncluded:function(d,c){var b=false;a.each(d,function(e,f){if(f===c){b=true;return false}});return b},getStartOfDay:function(c){var b=new a.jqx.date(c.year(),c.month(),c.day(),0,0,0);b.timeZone=c.timeZone;return b},getEndOfDay:function(c){var b=new a.jqx.date(c.year(),c.month(),c.day(),23,59,59);b.timeZone=c.timeZone;return b},getDaysCount:function(d,c){var b=1;while(d<c){if(d.day()!=c.day()){b++}d=d.addDays(1)}return b},getStartOfWeek:function(e,g){var c=e.dayOfWeek();var b=g.firstDay;if(c<b){c+=7}var d=c-b;var f=e.addDays(-d);return f.date()},getEndOfWeek:function(d,f,c){var e=this;var g=7;var b=e.getStartOfWeek(d,f,c);return b.addDays(g)},getEndOfMonth:function(d,e){var c=d.daysInMonth();var b=new a.jqx.date(d.year(),d.month(),c,23,59,59);b.timeZone=d.timeZone;return b},rangeIntersection:function(i,h,f,e){var g=i.dateData;var d=f.dateData;var c=h.dateData;var b=e.dateData;if(d>=g&&d<c){return true}if(d<g&&b>g){return true}if(g==d||c==b){return true}if(g<d){if(c>d&&c<b){return true}if(c>b){return true}}else{if(b>g&&b<c){return true}if(b>c){return true}}return false},rangeContains:function(e,d,c,b){return(e<=c&&b<=d)},monthDays:[31,28,31,30,31,30,31,31,30,31,30,31],msPerDay:1000*60*60*24,maxYear:9999,ORDINAL_BASE:new Date(1970,0,1),getYearDay:function(b){var c=new Date(b.getFullYear(),b.getMonth(),b.getDate());return Math.ceil((c-new Date(b.getFullYear(),0,1))/a.jqx.scheduler.utilities.msPerDay)+1},isLeapYear:function(b){if(b instanceof Date){b=b.getFullYear()}return((b%4===0)&&(b%100!==0))||(b%400===0)},tzOffset:function(b){return b.getTimezoneOffset()*60*1000},monthRange:function(c,d){var b=new Date(c,d,1);return[a.jqx.scheduler.utilities.getWeekday(b),a.jqx.scheduler.utilities.getMonthDays(b)]},getMonthDays:function(b){var c=b.getMonth();return c==1&&a.jqx.scheduler.utilities.isLeapYear(b)?29:a.jqx.scheduler.utilities.monthDays[c]},getWeekday:function(b){var c=[6,0,1,2,3,4,5];return c[b.getDay()]},combine:function(b,c){c=c||b;return new Date(b.getFullYear(),b.getMonth(),b.getDate(),c.getHours(),c.getMinutes(),c.getSeconds())},sort:function(b){b.sort(function(d,c){return d.getTime()-c.getTime()})},timeToUntilString:function(e){var c=new Date(e);var b,f=[c.getUTCFullYear(),c.getUTCMonth()+1,c.getUTCDate(),"T",c.getUTCHours(),c.getUTCMinutes(),c.getUTCSeconds(),"Z"];for(var d=0;d<f.length;d++){b=f[d];if(!/[TZ]/.test(b)&&b<10){f[d]="0"+String(b)}}return f.join("")},untilStringToDate:function(d){var b=/^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2})Z)?$/;var c=b.exec(d);if(!c){throw new Error("Invalid UNTIL value: "+d)}return new Date(Date.UTC(c[1],c[2]-1,c[3],c[5]||0,c[6]||0,c[7]||0))},Time:function(b,e,c){this.hour=b;this.minute=e;this.second=c;this.that=this;var d=this;this.getHours=function(){return d.hour};this.getMinutes=function(){return d.minute},this.getSeconds=function(){return d.second},this.getTime=function(){return((d.hour*60*60)+(d.minute*60)+d.second)*1000}}};a.jqx.scheduler.appointment=function(){var c=this;c.from=new a.jqx.date();c.to=new a.jqx.date().addHours(1);c.subject="";c.description="";c.location="";c.tooltip="";c.hidden=false;c.resourceId=null;c.id="";c.background=null;c.color=null;c.borderColor=null;c.status="busy";c.style=null;c.exceptions=new Array();c.exceptionDates=new Array();c.recurrencePattern=null;c.recurrenceException=new Array();c.occurrenceEnumerator=null;c.rootAppointment=null;c.hiddenByResourceId=false;c.draggable=true;c.resizable=true;c.recurrentAppointment=false;c.allDay=false;c.readOnly=false;c.showStatus=true;c.timeZone=null;c.scheduler=null;c.elements=new Array();c.appointmentObject=true;c.duration=function(){var e=c.to-c.from;var f=e*10000;return new a.jqx.timeSpan(f)};c.toJSON=function(h){var e=function(l){var k="";while(l.length>75){k+=l.substr(0,75)+"\n";l=" "+l.substr(75)}k+=l;return k};var g=function(k){return(k<10?"0":"")+k};var j=function(l,k){return(!l?"":(!k?""+l.getFullYear()+"-"+g(l.getMonth()+1)+"-"+g(l.getDate())+"T"+g(l.getHours())+":"+g(l.getMinutes())+":"+g(l.getSeconds())+"Z":""+l.getUTCFullYear()+"-"+g(l.getUTCMonth()+1)+"-"+g(l.getUTCDate())+"T"+g(l.getUTCHours())+":"+g(l.getUTCMinutes())+":"+g(l.getUTCSeconds())+"Z"))};var f=function(){var k="";for(var l=0;l<c.recurrenceException.length;l++){k+=c.recurrenceException[l].toString();if(l<c.recurrenceException.length-1){k+=","}}return k};var i={};i.id=c.id;i.from=j(c.from.toDate(),h);i.to=j(c.to.toDate(),h);i.subject=c.subject;i.status=c.status;i.location=c.location;i.description=c.description;i.title=c.title;i.resourceId=c.resourceId;if(c.recurrencePattern){i.recurrencePattern=c.recurrencePattern.toString()}else{i.recurrencePattern=""}if(c.recurrenceException&&c.recurrenceException.length>0){i.recurrenceException=f()}else{i.recurrenceException=""}i.dtstamp=j(new Date(),h);return JSON.stringify(i)};c.toString=function(i){var f=function(l){var k="";while(l.length>75){k+=l.substr(0,75)+"\n";l=" "+l.substr(75)}k+=l;return k};var h=function(k){return(k<10?"0":"")+k};var j=function(l,k){return(!l?"":(k?""+l.getFullYear()+h(l.getMonth()+1)+h(l.getDate())+"T"+h(l.getHours())+h(l.getMinutes())+h(l.getSeconds()):""+l.getUTCFullYear()+h(l.getUTCMonth()+1)+h(l.getUTCDate())+"T"+h(l.getUTCHours())+h(l.getUTCMinutes())+h(l.getUTCSeconds())+"Z"))};var g=function(){var k="";for(var l=0;l<c.recurrenceException.length;l++){k+=j(c.recurrenceException[l].toDate(),i);if(l<c.recurrenceException.length-1){k+=","}}return k};var e=c.status;if(!e){e="CONFIRMED"}if(e.toLowerCase()=="busy"){e="CONFIRMED"}if(e.toLowerCase()=="tentative"){e="TENTATIVE"}if(e.toLowerCase()=="free"){e="CANCELLED"}if(e.toLowerCase()=="outOfOffice"){e="CANCELLED"}return"BEGIN:VEVENT\nUID:"+c.id+"\nDTSTAMP:"+j(new Date(),i)+"\n"+f("TITLE:"+c.subject)+"\nDTSTART:"+j(c.from.toDate(),i)+"\nDTEND:"+j(c.to.toDate(),i)+"\n"+(c.recurrencePattern?"RRULE:"+c.recurrencePattern.toString()+"\n":"")+(c.recurrenceException&&c.recurrenceException.length>0?"EXDATE:"+g()+"\n":"")+(c.subject?f("SUMMARY:"+c.subject)+"\n":"")+"TRANSP:OPAQUE\n"+(c.status?f("STATUS:"+e)+"\n":"")+(c.description?f("DESCRIPTION:"+c.description)+"\n":"")+(c.location?f("LOCATION:"+c.location)+"\n":"")+"END:VEVENT"};c.range=function(){if(!c.allDay){return{from:c.from,to:c.to}}else{return{from:a.jqx.scheduler.utilities.getStartOfDay(c.from),to:a.jqx.scheduler.utilities.getEndOfDay(c.to)}}};c.clearRecurrence=function(){if(c.recurrencePattern){c.exceptions=new Array();c.exceptionDates=new Array();c.recurrencePattern=null;c.recurrenceException=new Array();c.hidden=false}};c.isAllDayAppointment=function(){return this.duration().days()>=1||this.allDay};c.cloneAppointmentAttributes=function(e){e.subject=c.subject;e.description=c.description;e.location=c.location;e.tooltip=c.tooltip;e.resourceId=c.resourceId;e.category=c.category;e.status=c.status;e.rootAppointment=c;e.color=c.color;e.borderColor=c.borderColor;e.background=c.background;e.hidden=c.hidden;e.timezone=c.timeZone;e.style=c.style;e.hiddenByResourceId=c.hiddenByResourceId};c.createOccurrence=function(g){if(g==null){return null}var f=new a.jqx.scheduler.appointment();f.allDay=c.allDay;var e=c.duration();if(c.allDay){e=new a.jqx.timeSpan(10000*(c.to-c.from))}f.from=g;f.to=g.add(e);f.occurrenceFrom=g.clone();f.subject=c.subject;f.description=c.description;f.location=c.location;f.tooltip=c.tooltip;f.resourceId=c.resourceId;f.category=c.category;f.status=c.status;f.rootAppointment=c;f.color=c.color;f.draggable=c.draggable;f.resizable=c.resizable;f.borderColor=c.borderColor;f.background=c.background;f.recurrentAppointment=true;f.timeZone=c.timeZone;f.style=c.style;f.hiddenByResourceId=c.hiddenByResourceId;f.boundAppointment=c.boundAppointment;if(c.hiddenByResourceId){f.hidden=true}f.id=c.id+"."+a.jqx.scheduler.utilities.guid();c.hidden=true;c.occurrenceIndex++;return f};c.clone=function(){var e=new a.jqx.scheduler.appointment();e.allDay=c.allDay;e.from=c.from.clone();e.to=c.to.clone();e.subject=c.subject;e.description=c.description;e.location=c.location;e.tooltip=c.tooltip;e.resourceId=c.resourceId;e.category=c.category;e.status=c.status;e.color=c.color;e.borderColor=c.borderColor;e.background=c.background;e.style=c.style;e.timeZone=c.timeZone;e.hiddenByResourceId=c.hiddenByResourceId;if(c.hiddenByResourceId){e.hidden=true}e.id=c.id+"."+a.jqx.scheduler.utilities.guid();return e};c.isRecurrentAppointment=function(){return c.recurrentAppointment||c.recurrencePattern!=null};c.anyExceptions=function(){return c.exceptions!=null&&c.exceptions.length>0};c.anyOccurrences=function(){return c.occurrenceEnumerator!=null&&c.occurrenceEnumerator.getNextAppointment()};c.isException=function(){var g=c.rootAppointment||this;if(!g.recurrenceException){return false}for(var f=0;f<g.recurrenceException.length;f++){var e=g.recurrenceException[f];if(c.occurrenceFrom&&e.equals(c.occurrenceFrom)){return true}}return false};c.getOccurrences=function(h,g){c.occurrenceIndex=0;var f=h!==null?h:c.from;var e=new a.jqx.scheduler.recurrentAppointmentsList(c,c.calendar,f,g,c.scheduler);c.occurrences=e.list;return e.list};if(arguments.length===1){if(a.type(arguments[0])=="object"){for(var b in arguments[0]){var d=arguments[0][b];if(this[b]!==undefined){this[b]=d}}}else{c.from=arguments[0];c.to=new a.jqx.date(c.from).addHours(1)}}else{if(arguments.length===2){c.from=arguments[0];c.to=arguments[1]}else{if(arguments.length===3){c.from=arguments[0];c.to=arguments[1];c.subject=arguments[2]}else{if(arguments.length===3){c.from=arguments[0];c.to=arguments[1];c.subject=arguments[2];c.description=arguments[3]}}}}if(c.recurrencePattern!=null){c.recurrencePattern.setFrom(c.from)}};a.jqx.scheduler.recurrentAppointmentsList=function(){var b=this;b.recurrentAppointment=null;b.currentTime=null;b.calendar=a.jqx.scheduler.calendar;b.from=new a.jqx.date(0);b.to=new a.jqx.date(9999,12,31);b.foundItems=0;b.list=new Array();b.scheduler=null;b.getOccurrences=function(c,e,d){if(c==undefined){return b.list}return new a.jqx.scheduler.recurrentAppointmentsList(c,b.calendar,e,d).list};b.current=function(){return b.recurrentAppointment.createOccurrence(b.currentTime)};b.fillList=function(){b.currentTime=null;b.foundItems=0;b.list=new Array();var c=b.recurrentAppointment.recurrencePattern;c.step=0;c.current=0;c.currentYearDay=0;if(c==null){return false}while(b.getNextAppointment(c)){var d=b.current();if(d){b.list.push(d)}}};b.getNextAppointment=function(h){if(b.recurrentAppointment==null){return false}var d=4294967295;var j=this.scheduler._views[this.scheduler._view].type;var l=this.scheduler._views[this.scheduler._view];var f=0;switch(h.freq){case"weekly":f=7;break;case"monthly":f=31;break;case"yearly":f=365;break}for(var e=0;e<d;e++){var k=h.getNewOccurenceDate();if(!k){continue}h.currentTime=k;if((h.to<k&&h.to.addDays(f)>=k)||(b.to<k&&b.to.addDays(f)>=k)){b.currentTime=null;return true}if(a.jqx.scheduler.utilities.getEndOfDay(h.to).addDays(f)<k||a.jqx.scheduler.utilities.getEndOfDay(b.to).addDays(f)<k){b.currentTime=null;return false}var g=true;g=b.getCanSetTime(h,k,g);if(h.canCreateNewOccurence(k,b.calendar)){var c=true;if(false===l.showWeekends){if(k.dayOfWeek()==6||k.dayOfWeek()==0){c=false}}if(c){b.foundItems++}}if(!g){continue}b.currentTime=k;if(b.foundItems>h.count){return false}return true}return false};b.getCanSetTime=function(c,e,d){if(!c.canCreateNewOccurence(e,b.calendar)){d=false}if(e<b.from&&e.add(b.recurrentAppointment.duration())<=b.from){d=false}if(b.to<=e){d=false}return d};b.isException=function(f,c,g){var e=b.recurrentAppointment.exceptions;for(var d=0;d<e.length;d++){if(g.isDateInExceptionAppointment(f,c,e[d])){if(-1===g.newExceptions.indexOf(e[d])){return true}}}return false};if(arguments&&arguments.length>0){b.recurrentAppointment=arguments[0];if(arguments[1]){b.calendar=arguments[1]}if(arguments[2]){b.from=arguments[2]}if(arguments[3]){b.to=arguments[3]}if(arguments[4]){b.scheduler=arguments[4]}if(arguments[2]===undefined){b.from=new a.jqx.date(0);b.to=new a.jqx.date(9999,12,31)}if(b.scheduler&&b.scheduler.localization){b.calendar.firstDay=b.scheduler.localization.firstDay}b.fillList()}return b};a.jqx.scheduler.recurrencePattern=function(){var c=this;var b={from:new a.jqx.date(0),to:new a.jqx.date(9999,12,31),count:1000,interval:1,exceptions:new Array(),newExceptions:new Array(),month:1,day:1,current:0,currentYearDay:0,step:0,days:[],bynweekday:[],isEveryWeekDay:true,timeZone:null,weekDays:{Sunday:0,Monday:1,Tuesday:2,Wednesday:3,Thursday:4,Friday:5,Saturday:6},freq:"daily",bymonth:null,bymonthday:null,byyearday:null,byweekno:null,byweekday:null};a.extend(true,c,b);c.getNewOccurenceDate=function(){var o=function(n,C){var k=0,D=[];if(n instanceof Array){for(;k<C;k++){D[k]=[].concat(n)}}else{for(;k<C;k++){D[k]=n}}return D};var d=function(k,i){var n=k%i;return(n*i<0)?n+i:n};var v=function(D,k){if(arguments.length===1){k=D;D=0}var n=[];for(var C=D;C<k;C++){n.push(C)}return n};var u=[0,31,60,91,121,152,182,213,244,274,305,335,366];var l=[0,31,59,90,120,151,181,212,243,273,304,334,365];var r=c.from.year();var j=[6,0,1,2,3,4,5];var q=function(i){c.yearlen=i%4==0&&(i%100!=0||i%400==0)?366:365;c.nextyearlen=(1+i)%4==0&&((1+i)%100!=0||(1+i)%400==0)?366:365;var k=new Date(i,0,1);var C=j[new Date(i,0,1).getDay()];var n=(function(){for(var D=[],E=0;E<55;E++){D=D.concat(v(7))}return D}());if(c.yearlen==365){c.wdaymask=n.slice(C);c.mrange=[].concat(l)}else{c.wdaymask=n.slice(C);c.mrange=[].concat(u)}};q(r);switch(c.freq){case"daily":default:var g=c.from.add(new a.jqx.timeSpan(c.step*c.interval,0,0,0));c.step++;return g;case"weekly":if(c.byweekday){var g=new a.jqx.date(c.from,c.timeZone);var t=j[c.from.dayOfWeek()];g=g.addDays(7*(c.step));g=g.addDays(c.byweekday[c.current]);g=g.addDays(-t);if(g<c.from){g=null}c.current++;if(undefined==c.byweekday[c.current]){c.current=0;c.step++}}return g;case"monthly":if(c.bynweekday.length>0){var g=new a.jqx.date(c.from.year(),c.from.month(),1,c.from.hour(),c.from.minute(),c.from.second());g.timeZone=c.timeZone;g=g.addMonths(c.step*c.interval);q(g.year());var B=g.month();var f=[c.mrange.slice(B-1,B+1)][0];var h=f[0];var m=f[1];m-=1;c.nwdaymask=o(0,c.yearlen);c.step++;for(var y=0;y<c.bynweekday.length;y++){var s=c.bynweekday[y][0],x=c.bynweekday[y][1];if(x<0){z=m+(x+1)*7;z-=d(c.wdaymask[z]-s,7)}else{z=h+(x-1)*7;z+=d(7-c.wdaymask[z]+s,7)}if(h<=z&&z<=m){c.nwdaymask[z]=1}}var w=z+1;var A=w-h;var g=new a.jqx.date(c.from.year(),c.from.month(),A,c.from.hour(),c.from.minute(),c.from.second());g.timeZone=c.timeZone;g=g.addMonths((c.step-1)*c.interval)}else{if(c.bymonthday.length>0){var g=new a.jqx.date(c.from.year(),c.from.month(),c.bymonthday[c.current],c.from.hour(),c.from.minute(),c.from.second());g.timeZone=c.timeZone;g=g.addMonths(c.step*c.interval);c.current++