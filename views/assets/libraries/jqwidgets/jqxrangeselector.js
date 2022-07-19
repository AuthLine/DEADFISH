/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxRangeSelector","",{});a.extend(a.jqx._jqxRangeSelector.prototype,{defineInstance:function(){var b={width:400,height:100,min:0,max:100,range:{from:0,to:Infinity,min:0,max:Infinity},majorTicksInterval:10,minorTicksInterval:1,showMajorTicks:true,showMinorTicks:false,snapToTicks:true,labelsFormat:null,markersFormat:null,showLabels:true,labelsOnTicks:true,markersPosition:"top",labelsFormatFunction:null,groupLabelsFormatFunction:null,markersFormatFunction:null,showGroupLabels:false,showMarkers:true,resizable:true,moveOnClick:true,disabled:false,rtl:false,padding:"auto",events:["change"]};if(this===a.jqx._jqxRangeSelector.prototype){return b}a.extend(true,this,b);return b},createInstance:function(c){var e=this;this._isTouchDevice=a.jqx.mobile.isTouchDevice();if(!a.jqx.dataAdapter){throw new Error("jqxRangeSelector: Missing reference to the following module: 'jqxdata.js'.")}var f=a.jqx.isHidden(this.host);this.render();var d=this.host.width();var b=this.host.height();a.jqx.utilities.resize(this.host,function(){var h=e.host.width();var g=e.host.height();e.range=e.getRange();if(f){e.refresh();f=false}else{if(d!=h||b!=g){e.refresh()}}d=e.host.width();b=e.host.height()})},render:function(){if(this.host.children().length>1||this.rangeSelector){this._removeHandlers();if(this.rangeSelector){this.rangeSelector.remove()}}this.host.addClass(this.toThemeProperty("jqx-widget"));this.host.addClass(this.toThemeProperty("jqx-rangeselector"));this.host.children(":eq(0)").addClass(this.toThemeProperty("jqx-rangeselector-content"));this._id=this.element.id;if(typeof this.min=="string"||this.min instanceof Date){this._dataType="date"}else{this._dataType="number"}this._privateProperties();this._checkProperties();this._setSize();this._scale();this._initSlider()},refresh:function(b){if(b==true){return}this.host.children(".jqx-rangeselector-ticks-container").remove();this._removeHandlers();this._privateProperties();this._checkProperties();this._setSize();this._scale();this._initSlider()},destroy:function(){this._removeHandlers();this.host.remove()},setRange:function(k,l){if(k>l){throw new Error("jqxRangeSelector: range object initialization error. 'min' should be less than 'max'");return}var g=this._getValue();if(g.from!=k||g.to!=l){var d=this._dataType=="number"?"numeric":"date";var i="The set values are in the wrong format. Please set "+d+" values.";if(typeof k=="string"||k instanceof Date){if(this._dataType=="number"){throw new Error(i)}}else{if(this._dataType=="date"){throw new Error(i)}}k=this._validateInput(k);l=this._validateInput(l);if(k>this._max){k=this._max}if(k<this._min){k=this._min}if(l>this._max){l=this._max}if(l<this._min){l=this._min}var f=l-k;if(f>this._range._max){l=k+this._range._max}else{if(f<this._range._min){l=k+this._range._min}}var j=this._valuesArray.indexOf(k);var e=this._valuesArray.indexOf(l);var m=this._ticksArray[j];var h=this._ticksArray[e];var b=Math.abs(h-m);this.slider[0].style.width=b+"px";var c=!this.rtl?m:h;this.slider[0].style.left=c;this._moveSlider(c);if(this._dataType=="date"){var k=new Date(k);var l=new Date(l)}this._raiseEvent("0",{type:null,from:k,to:l})}},val:function(b){if(arguments.length==0){return this.getRange()}if(b.from!=undefined){this.setRange(b.from,b.to)}},getRange:function(){var b=this._getValue();return b},propertyChangedHandler:function(b,c,e,d){switch(c){case"showMinorTicks":if(d==true){a("#"+this._id+" .jqx-rangeselector-ticks-minor").css("visibility","visible")}else{a("#"+this._id+" .jqx-rangeselector-ticks-minor").css("visibility","hidden")}break;case"showMarkers":var f=a("#"+this._id+"LeftMarker, #"+this._id+"RightMarker, #"+this._id+"LeftMarkerArrow, #"+this._id+"RightMarkerArrow");if(d==true){f.css("visibility","visible")}else{f.css("visibility","hidden")}break;default:this.refresh()}},_raiseEvent:function(g,e){var c=this.events[g];var f=new a.Event(c);f.owner=this;f.args=e;try{var b=this.host.trigger(f)}catch(d){}return b},_setSize:function(){this.host.width(this.width);this.host.height(this.height)},resize:function(c,b){this.width=c;this.height=b;this.refresh()},_scale:function(){var c=this.host.width();var b=this._max-this._min;this._unitPerPixel=parseFloat((b/c).toFixed(4));this._pixelPerUnit=c/b;4;this._minWidth=this._roundNumber(this._range._min/this._unitPerPixel);this._maxWidth=this._roundNumber(this._range._max/this._unitPerPixel);this._minWidth=parseInt(this._minWidth);this._maxWidth=parseInt(this._maxWidth);if(this._dataType=="number"){this._majorTicksCount=b/this.majorTicksInterval;this._majorTicksCount=Math.floor(this._majorTicksCount)+1;this._majorTicksDistance=parseInt(this._roundNumber(c/(b/this.majorTicksInterval)));this._unitsCount=b/this.minorTicksInterval;this._unitsCount=Math.floor(this._unitsCount)+1;this._unitsDistance=parseInt(this._roundNumber(c/(b/this.minorTicksInterval)))}this._addTicks()},_addTicks:function(){var f=this;this.host.append("<div id='"+this._id+"TicksContainer' class='jqx-rangeselector-ticks-container'></div>");this.rangeSelector=a("#"+this._id+"TicksContainer");this._majorTicksArray=new Array();this._ticksArray=new Array();this._valuesArray=new Array();var c=new String();a("#"+this._id+"TicksContainer").append("<div id='labelPlaceholder' style='visibility: hidden; position: absolute;'></div>");var e=this.rangeSelector.height();if(this._dataType=="number"){c=this._addNumericTicks(e)}else{c=this._addDateTicks(e)}var b=0;if(this.showLabels){b+=a("#labelPlaceholder").outerHeight()+6}if(this._dataType!="number"){if(this.showGroupLabels){b+=a("#labelPlaceholder").outerHeight()+6}}if(this.padding=="auto"){this.host.css("padding-bottom",b)}a("#labelPlaceholder").remove();a("#"+this._id+"TicksContainer").append(c);this._ticksArray.sort(function(h,g){return h-g});for(var d=1;d<this._ticksArray.length;d++){this._ticksArray[d]=this._roundNumber(this._ticksArray[d])}this._valuesArray.sort(function(h,g){return h-g});if(this._dataType=="number"){for(var d=1;d<this._valuesArray.length;d++){this._valuesArray[d]=this._roundNumber(this._valuesArray[d],"marker",true)}}for(var d=1;d<this._ticksArray.length;d++){if(this._ticksArray[d-1]==this._ticksArray[d]){this._ticksArray.splice(d,1);this._valuesArray.splice(d,1)}}if(this.rtl){this._valuesArray=this._valuesArray.reverse()}},_addNumericTicks:function(g){var n=this;var l=new String();var h=0;var f=this._min;var r=this._max;for(var k=0;k<this._majorTicksCount;k++){var e=this._id+"LabelTick"+(k+1);if(k==this._majorTicksCount-1){h=this.host.width()}var m=n.showMajorTicks?"visible":"hidden";l+="<div id='"+e+"' class='"+this.toThemeProperty("jqx-rangeselector-ticks")+" "+this.toThemeProperty("jqx-slider-tick-horizontal")+"' style='visibility: "+m+"; left: "+h+"px;'></div>";this._ticksArray.push(h);this._majorTicksArray.push(h);var c=this._id+"Label"+(k+1);var j=f;this._valuesArray.push(parseFloat(j.toFixed(4)));if(n.rtl){j=r}j=this._formatOutput(j,this.labelsFormat,this.minorTicksInterval>=1?0:2,"label");a("#labelPlaceholder").html(j);var q=a("#labelPlaceholder").width();var p=n.showLabels?"visible":"hidden";if(n.labelsOnTicks){l+="<div id='"+c+"' class='"+this.toThemeProperty("jqx-rangeselector-labels")+"' style='visibility: "+p+"; left: "+(h-q/2)+"px; top: "+g+"px;'>"+j+"</div>"}var d=h;f=f+this.majorTicksInterval;r=r-this.majorTicksInterval;var h=(f-n._min)/n._unitPerPixel;h=parseInt(h);if(!this.labelsOnTicks&&k<this._majorTicksCount-1){var o=Math.abs(d-h);l+="<div id='"+c+"' class='"+this.toThemeProperty("jqx-rangeselector-labels")+"' style='visibility: "+p+"; left: "+(d+o/2-q/2)+"px; top: "+g+"px;'>"+j+"</div>"}}var h=0;var b=this.showMinorTicks?"visible":"hidden";var f=this._min;for(var k=0;k<this._unitsCount;k++){var e=this._id+"MinorTick"+(k+1);if(k==this._unitsCount-1){h=this.host.width()}l+="<div id='"+e+"' class='"+this.toThemeProperty("jqx-rangeselector-ticks")+" "+this.toThemeProperty("jqx-rangeselector-ticks-minor")+" "+this.toThemeProperty("jqx-slider-tick-horizontal")+"' style='visibility: "+b+"; left: "+h+"px;'></div>";var s=f;if(this._valuesArray.indexOf(parseFloat(s.toFixed(4)))===-1){this._valuesArray.push(parseFloat(s.toFixed(4)));this._ticksArray.push(h)}f=f+this.minorTicksInterval;var h=(f-n._min)/n._unitPerPixel;h=parseInt(h)}return l},_getMillisecondsByInterval:function(c){var b={};if(c=="year"||c.years){b.divisor=c.years?c.years:1;return b.divisor*(365*24*3600*1000)}else{if(c=="month"||c.months){b.divisor=c.months?c.months:1;return b.divisor*(30*24*3600*1000)}else{if(c=="week"||c.weeks){b.divisor=c.weeks?c.weeks:1;return b.divisor*(7*24*3600*1000)}else{if(c=="day"||c.days){b.divisor=c.days?c.days:1;return b.divisor*(24*3600*1000)}else{if(c=="hour"||c.hours){b.divisor=c.hours?c.hours:1;return b.divisor*(3600*1000)}else{if(c=="minute"||c.minutes){b.divisor=c.minutes?c.minutes:1;return b.divisor*60*1000}else{if(c=="second"||c.seconds){b.divisor=c.seconds?c.seconds:1;return b.divisor*1000}else{if(c=="millisecond"||c.milliseconds){b.divisor=c.milliseconds?c.milliseconds:1;return b.divisor*1}}}}}}}}return b},_addDateTicks:function(e){var d=this;var c=new String();var b=function(k){var j=k=="majorTicksInterval"?d.majorTicksInterval:d.minorTicksInterval;var i=new Object();if(j=="year"||j.years){i.period="year";i.interval=86400000;i.divisor=j.years?j.years:1;i.value=i.divisor*(365*24*3600*1000)}else{if(j=="month"||j.months){i.period="month";i.interval=86400000;i.divisor=j.months?j.months:1;i.value=i.divisor*(30*24*3600*1000)}else{if(j=="week"||j.weeks){i.period="week";i.interval=86400000;i.divisor=j.weeks?j.weeks:1;i.value=i.divisor*(7*24*3600*1000)}else{if(j=="day"||j.days){i.period="day";i.interval=3600000;i.divisor=j.days?j.days:1;i.value=i.divisor*(24*3600*1000)}else{if(j=="hour"||j.hours){i.period="hour";i.interval=60000;i.divisor=j.hours?j.hours:1;i.value=i.divisor*(3600*1000)}else{if(j=="minute"||j.minutes){i.period="minute";i.interval=60*1000;i.divisor=j.minutes?j.minutes:1;i.value=i.divisor*60*1000}else{if(j=="second"||j.seconds){i.period="second";i.interval=1000;i.divisor=j.seconds?j.seconds:1;i.value=i.divisor*1000}else{if(j=="millisecond"||j.milliseconds){i.period="millisecond";i.interval=1;i.divisor=j.milliseconds?j.milliseconds:1;i.value=i.divisor*1}}}}}}}}return i};var f=function(n,q){var l=new Date(n);var r=l.getDate();var s=q=="year"&&l.getMonth()==0&&r==1;var k=q=="month"&&r==1;var t=q=="week"&&l.getDay()==0;var j=q=="day"&&l.getHours()==0;var i=q=="hour"&&l.getMinutes()==0;var o=q=="minute"&&l.getSeconds()==0;var m=q=="minute"&&l.getMilliseconds()==0;var p=q=="millisecond";if(s||k||t||j||i||o||m||p){return true}else{return false}};var h=function(p,u,n){var l=(p-d._min)/d._unitPerPixel;if(d.rtl){if(u=="majorTicksInterval"){p=d._dateMajorTicks[d._dateMajorTicks.length-n]}else{p=d._dateMinorTicks[d._dateMinorTicks.length-n]}}l=parseInt(l);var v=p;if(d._valuesArray.indexOf(v)===-1){d._ticksArray.push(l);d._valuesArray.push(v);if(u=="majorTicksInterval"){d._majorTicksArray.push(l)}}if(u=="majorTicksInterval"){var q=d._id+"LabelTick"+n;var k=d.showMajorTicks?"visible":"hidden";c+="<div id='"+q+"' class='"+d.toThemeProperty("jqx-rangeselector-ticks")+" "+d.toThemeProperty("jqx-slider-tick-horizontal")+"' style='visibility: "+k+"; left: "+l+"px;'></div>";var o=v;o=d._formatOutput(o,d.labelsFormat,d.labelPrecision,"label");a("#labelPlaceholder").html(o);var t=a("#labelPlaceholder").width();var j=d._id+"Label"+n;var s=d.showLabels?"visible":"hidden";if(!d.labelsOnTicks){var w=d._getMillisecondsByInterval(d.majorTicksInterval)/d._unitPerPixel;var r=w/2;c+="<div id='"+j+"' class='"+d.toThemeProperty("jqx-rangeselector-labels")+"' style='visibility: "+s+"; left: "+(r+l-t/2)+"px; top: "+e+"px;'>"+o+"</div>"}else{if(d.labelsOnTicks){c+="<div id='"+j+"' class='"+d.toThemeProperty("jqx-rangeselector-labels")+"' style='visibility: "+s+"; left: "+(l-t/2)+"px; top: "+e+"px;'>"+o+"</div>"}}}else{var k=d.showMinorTicks?"visible":"hidden";var m=d._id+"MinorTick"+n;c+="<div id='"+m+"' class='"+d.toThemeProperty("jqx-rangeselector-ticks")+" "+d.toThemeProperty("jqx-rangeselector-ticks-minor")+" "+d.toThemeProperty("jqx-slider-tick-horizontal")+"' style='visibility: "+k+"; left: "+l+"px;'></div>"}};var g=function(s,o,j){var p=0;var l=1;var m=new Date(d._min).getHours();var r=o.interval==86400000?true:false;var k=0;var t=new Array();for(var n=d._min;n<=d._max;n+=o.interval){if(r==true){var u=new Date(n).getHours();if(m!=u){var q;if(u==1){q=1}else{if(u==23){q=-1}}n=n-q*3600000;m=new Date(n).getHours()}}var v=f(n,o.period);if(v==true){if(p%o.divisor==0){if(j){t.push(n)}else{h(n,s,l,o.interval)}l++}p++}}return t};d._dateMajorTicks=g("majorTicksInterval",b("majorTicksInterval"),true);d._dateMinorTicks=g("minorTicksInterval",b("minorTicksInterval"),true);g("majorTicksInterval",b("majorTicksInterval"));g("minorTicksInterval",b("minorTicksInterval"));if(this.showGroupLabels==true&&this.showLabels){this._addGroupLabels(a("#labelPlaceholder").height()+e)}return c},_addGroupLabels:function(n){var k=this;var e=new Date(this._min);var m=new Date(this._max);if(m.getFullYear()-e.getFullYear()>0){var l="year";var b=86400000}else{if(m.getMonth()-e.getMonth()>0){var l="month";var b=86400000}else{if(m.getDate()-e.getDate()>0){var l="day";var b=3600000}else{return}}}var j=function(q){var p=new Date(q);var s=p.getFullYear();var r=p.getMonth();var u=p.getDate();var v;var i=true;if(l=="year"&&r==0&&u==1){v=s}else{if(l=="month"&&u==1){v=a.jqx.dataFormat.formatdate(p,"MMMM");if(r==0){v=s+" "+v}}else{if(l=="day"&&p.getHours()==0){v=a.jqx.dataFormat.formatdate(p,"dddd")}else{i=false}}}var t;if((i==true)&&k.groupLabelsFormatFunction){t=k.groupLabelsFormatFunction(v,p)}else{t=v}var w={check:i,value:t};return w};var h=new String();var g=this.toThemeProperty("jqx-rangeselector-group-labels-ticks")+" "+this.toThemeProperty("jqx-slider-tick-horizontal");var d=1;for(var f=this._min;f<this._max;f+=b){var o=j(f);if(o.check==true){var c=(f-this._min)/this._unitPerPixel;h+="<div class='"+this.toThemeProperty("jqx-rangeselector-labels")+"' style='left: "+c+"px; top: "+n+"px;'><div class='"+g+"'></div><div id='"+this._id+"GroupLabel"+d+"' class='"+this.toThemeProperty("jqx-rangeselector-group-labels")+"' style='margin-left: 5px;'>"+o.value+"</div></div>";d++}}a("#"+this._id+"TicksContainer").append(h)},_updateCursor:function(b,g){var f=this.element.style.cursor;var e=this.slider.offset().left;var d=parseInt(this.slider[0].style.width);var c=e+d;if((((b>e-5)&&(b<e+5))||((b>c-5)&&(b<c+5)))){if(f==""||f=="auto"){this.element.style.cursor="e-resize"}}else{if(f=="e-resize"){this.element.style.cursor="auto"}}},_handleMouseMove:function(z){var k=this;var t=k.slider;var m=z.pageX;var l=z.pageY;if(k._isTouchDevice){var i=a.jqx.position(z);m=i.left;l=i.top}var E=k._hostOffset.left;var u=k._hostWidth;if(k.resizable&&!k.dragging&&k.resizeDirection=="none"){if(m>=E&&m<=E+u){if(l>=k._hostOffset.top&&l<=k._hostOffset.top+k._hostHeight){this._updateCursor(m,l)}}}if(!k.isMouseDown){return true}if(k._isTouchDevice){if(l<k._hostOffset.top||l>k._hostOffset.top+k._hostHeight){return true}}var g=k._findNearestTick(k._sliderLeftOffset+m-k._mouseDownX);var d=parseInt(g);if(d<0){return true}if(d<0){d=0}var b=parseInt(t[0].style.width);var j=d+b;var s=function(H){var y=parseInt(k._maxWidth);var x=parseInt(k._minWidth);if(H<x||H>y){return false}var J=parseInt(k.rightMarker[0].style.left);var I=parseInt