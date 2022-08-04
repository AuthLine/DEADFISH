/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){if(!a.jqx.scheduler){a.jqx.scheduler={}}a.jqx.scheduler.utilities={weekDays:{Sunday:0,Monday:1,Tuesday:2,Wednesday:3,Thursday:4,Friday:5,Saturday:6},guid:function(){function b(){return Math.floor((1+Math.random())*65536).toString(16).substring(1)}return b()+b()},areWeekDaysIncluded:function(d,c){var b=false;a.each(d,function(e,f){if(f===c){b=true;return false}});return b},getStartOfDay:function(c){var b=new a.jqx.date(c.year(),c.month(),c.day(),0,0,0);b.timeZone=c.timeZone;return b},getEndOfDay:function(c){var b=new a.jqx.date(c.year(),c.month(),c.day(),23,59,59);b.timeZone=c.timeZone;return b},getDaysCount:function(d,c){var b=1;while(d<c){if(d.day()!=c.day()){b++}d=d.addDays(1)}return b},getStartOfWeek:function(e,g){var c=e.dayOfWeek();var b=g.firstDay;if(c<b){c+=7}var d=c-b;var f=e.addDays(-d);return f.date()},getEndOfWeek:function(d,f,c){var e=this;var g=7;var b=e.getStartOfWeek(d,f,c);return b.addDays(g)},getEndOfMonth:function(d,e){var c=d.daysInMonth();var b=new a.jqx.date(d.year(),d.month