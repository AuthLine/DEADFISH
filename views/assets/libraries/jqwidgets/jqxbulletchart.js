/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxBulletChart","",{});a.extend(a.jqx._jqxBulletChart.prototype,{defineInstance:function(){var b={width:500,height:100,barSize:"50%",ranges:[{startValue:0,endValue:50,color:"#000000",opacity:0.7},{startValue:50,endValue:80,color:"#000000",opacity:0.5},{startValue:80,endValue:100,color:"#000000",opacity:0.3}],pointer:{value:65,label:"Value",size:"25%",color:""},target:{value:85,label:"Target",size:4,color:""},ticks:{position:"far",interval:20,size:10},title:"Title",description:"Description",orientation:"horizontal",labelsFormat:null,labelsFormatFunction:null,animationDuration:400,showTooltip:true,tooltipFormatFunction:null,disabled:false,rtl:false,events:["change"]};if(this===a.jqx._jqxBulletChart.prototype){return b}a.extend(true,this,b);return b},createInstance:function(b){if(!a.jqx.dataAdapter){throw new Error("jqxBulletChart: Missing reference to the following module: 'jqxdata.js'.")}this._setDefaultValues();this.render();var c=this;a.jqx.utilities.resize(this.host,function(){if(c._timer){clearTimeout(c._timer)}c._timer=setTimeout(function(){var d=c.animationDuration;c.animationDuration=0;c.render();setTimeout(function(){c.animationDuration=d},0)},10)},false,true)},render:function(){if(this.host.children().length>0){this._removeHandlers();if(this.showTooltip==true){this.host.jqxTooltip("destroy")}this.host.empty()}this.host.addClass(this.toThemeProperty("jqx-widget"));this.host.addClass(this.toThemeProperty("jqx-bulletchart"));this.host.width(this.width);this.host.height(this.height);var n=this.host.width();var d=this.host.height();var l;var j=this.rtl?"rtl":"ltr";if(this.orientation=="horizontal"){l=a("<div style='position: absolute; visibility: hidden; padding: 5px;'><div class='"+this.toThemeProperty("jqx-bulletchart-title")+"' style='direction: "+j+";'>"+this.title+"</div><div class='"+this.toThemeProperty("jqx-bulletchart-description")+"' style='direction: "+j+";'>"+this.description+"</div></div>")}else{if(this.orientation=="vertical"){l=a("<div style='position: absolute; visibility: hidden; padding-bottom: 15px;'><div class='"+this.toThemeProperty("jqx-bulletchart-title")+"' style='width: "+n+"px; direction: "+j+";'>"+this.title+"</div><div class='"+this.toThemeProperty("jqx-bulletchart-description")+"' style='direction: "+j+";'>"+this.description+"</div></div>")}}this.host.append(l);var k=l.outerWidth();var g=l.outerHeight();l.remove();var e,h,i,b,o,m,f,c;if(this.orientation=="horizontal"){e="jqx-bulletchart-title-container-horizontal";h="jqx-bulletchart-chart-container-horizontal";i=this._checkPercentage(this.barSize,this.host);b=k;o=this.barSize;m=0;f=n-b;c=o;if(this.width&&this.width.toString().indexOf("%")>=0){var f=parseFloat(parseFloat(f*100)/n).toString()+"%";var b=parseFloat(parseFloat(b*100)/n).toString()+"%";this._percentageWidth=true}}else{if(this.orientation=="vertical"){e="jqx-bulletchart-title-container-vertical";h="jqx-bulletchart-chart-container-vertical";i=0;b="100%";o=g;m=this._checkPercentage(this.barSize,this.host);f=this.barSize;c=d-o}}if(this.rtl==false||(this.rtl==true&&this.orientation=="vertical")){this.host.append("<div id='"+this.element.id+"titleContainer' class='"+e+"' style='top: "+i+";'></div>")}this.host.append("<div id='"+this.element.id+"ChartContainer' class='"+h+"' style='top: "+i+"; left: "+m+";'></div>");if(this.rtl==true&&this.orientation=="horizontal"){this.host.append("<div id='"+this.element.id+"titleContainer' class='"+e+"' style='top: "+i+";'></div>")}this._titleContainer=a("#"+this.element.id+"titleContainer");this._chartContainer=a("#"+this.element.id+"ChartContainer");this._titleContainer.css({width:b,height:o});this._chartContainer.css({width:f,height:c});this._min=this.ranges[0].startValue;this._max=this.ranges[this.ranges.length-1].endValue;this._interval=this._max-this._min;this._valueToPixelsHorizontal=this._chartContainer.width()/this._interval;this._valueToPixelsVertical=this._chartContainer.height()/this._interval;this._checkValues();this._appendRanges();this._appendPointerAndTarget();this._appendTitleAndDescription();if(this.ticks.position!="none"){this._appendTicksAndLabels()}if(this.disabled==true){this.host.addClass(this.toThemeProperty("jqx-fill-state-disabled"))}if(this.showTooltip==true){if(this.host.jqxTooltip!=undefined){this._initializeTooltip();this.host.data().jqxWidget=this}else{throw new Error("jqxBulletChart: Missing reference to the following module: 'jqxtooltip.js'.")}}this._updateValue(this.pointer.value,0,true)},refresh:function(b){if(!b){this.render()}},val:function(b){if(arguments.length==0||(b!=null&&typeof(b)=="object")){return this.pointer.value}else{if(b>this._max){b=this._max}else{if(b<this._min){b=this._min}}if(b!=this.pointer.value){this._updateValue(b,this.pointer.value);this.pointer.value=b;if(this.showTooltip==true){this._updateTooltip()}}}},destroy:function(){a.jqx.utilities.resize(this.host,null,true);this._removeHandlers();if(this.showTooltip==true){this.host.jqxTooltip("destroy")}this.host.remove()},propertyChangedHandler:function(c,d,g,e){if(g!=e||e instanceof Object){var b=true;var f=function(){a.each(g,function(i,h){if(e[i]==undefined){c[d][i]=h}})};switch(d){case"barSize":break;case"ranges":a.each(g,function(i,h){a.each(h,function(k,j){if(e[i]===undefined){return}if(e[i][k]==undefined){c[d][i][k]=j}})});this._setDefaultValues();break;case"pointer":f();this._updatePointer(e,g);return;case"target":f();this._updateTarget(e,g);return;case"ticks":b=false;f();a.each(g,function(i,h){if(g[i]!=c[d][i]){b=!(b&&false)}});break;case"showTooltip":if(e==true){if(this.host.jqxTooltip!=undefined){this._initializeTooltip()}else{throw new Error("jqxBulletChart: Missing reference to the following module: 'jqxtooltip.js'.")}}else{this._removeHandlers();this.host.jqxTooltip("destroy")}break;case"animationDuration":return;case"tooltipFormatFunction":this._updateTooltip();return;case"disabled":if(e==true){this.host.addClass(this.toThemeProperty("jqx-fill-state-disabled"))}else{this.host.removeClass(this.toThemeProperty("jqx-fill-state-disabled"))}return}if(b==true){this.render()}}},_raiseEvent:function(g,e){var c=this.events[g];var f=new a.Event(c);f.owner=this;f.args=e;try{var b=this.host.trigger(f)}catch(d){}return b},_removeHandlers:function(){var b=a("#"+this.element.id+"Pointer, #"+this.element.id+"Target");this.removeHandler(b,"mouseenter.bulletchart"+this.element.id);this.removeHandler(b,"mouseleave.bulletchart"+this.element.id)},_setDefaultValues:function(){var b=this.ranges;var c=this.ranges.length;for(var d=0;d<c;d++){if(b[d].startValue==undefined||b[d].endValue==undefined){throw new Error("jqxBulletChart: Each range must have its startValue and endValue set.")}if(b[d].color==undefined){this.ranges[d].color="#000000"}if(b[d].opacity==undefined){this.ranges[d].opacity=1-(1/c)*d}}var g=this.pointer;if(g.value==undefined){this.pointer.value=65}if(g.label==undefined){this.pointer.label="Value"}if(g.size==undefined){this.pointer.size="25%"}if(g.color==undefined){this.pointer.color=""}var f=this.target;if(f.value==undefined){this.target.value=85}if(f.label==undefined){this.target.label="Target"}if(f.size==undefined){this.target.size=5}if(f.color==undefined){this.target.color=""}var e=this.ticks;if(e.position==undefined){this.ticks.position="near"}if(e.interval==undefined){this.ticks.interval=20}if(e.size==undefined){this.ticks.size=10}},_checkValues:function(){if(this.pointer.value>this._max){this.pointer.value=this._max}else{if(this.pointer.value<this._min){this.pointer.value=this._min}}if(this.target.value>this._max){this.target.value=this._max}else{if(this.target.value<this._min){this.target.value=this._min}}},_appendRanges:function(){var e="";var g=this.ranges.length;for(var d=0;d<g;d++){var f=this.ranges[d];var l;if(this.orientation=="horizontal"){var h=this.rtl?"right":"left";var c=(f.startValue-this._min)*this._valueToPixelsHorizontal;var j=(f.endValue-f.startValue)*this._valueToPixelsHorizontal;l="<div class='"+this.toThemeProperty("jqx-bulletchart-range")+" "+this.toThemeProperty("jqx-bulletchart-range-horizontal")+"' style='"+h+": "+c+"px; width: "+j+"px; background-color: "+f.color+"; opacity: "+f.opacity+"'></div>"}else{if(this.orientation=="vertical"){var b=(f.startValue-this._min)*this._valueToPixelsVertical;var k=(f.endValue-f.startValue)*this._valueToPixelsVertical;l="<div class='"+this.toThemeProperty("jqx-bulletchart-range")+" "+this.toThemeProperty("jqx-bulletchart-range-vertical")+"' style='bottom: "+b+"px; height: "+k+"px; background-color: "+f.color+"; opacity: "+f.opacity+"'></div>"}}e+=l}this._chartContainer.append(e)},_appendPointerAndTarget:function(){var o="";var m=this.element.id+"Pointer";var f=this.element.id+"Target";var l=this.pointer.size;var k=this.target.value;var e=this.target.size;var j=k>0?0:parseInt(e);var p=this.pointer.color.length>0?"":this.toThemeProperty("jqx-fill-state-pressed");var g=this.target.color.length>0?"":this.toThemeProperty("jqx-fill-state-pressed");if(this.orientation=="horizontal"){var c=this._normaliseValue(l);var n=this._checkPercentage(l,this._chartContainer);var d=this.rtl?"right":"left";var t=(k-this._min)*this._valueToPixelsHorizontal-j;var u=t+parseInt(e)-this._chartContainer.width();if(t<0){t=0}else{if(u>0){t-=u}}var i=this._normaliseValue(e);o+="<div class='"+g+" "+this.toThemeProperty("jqx-bulletchart-target")+" "+this.toThemeProperty("jqx-bulletchart-target-horizontal")+"' id='"+f+"' style='"+d+": "+t+"px; width: "+i+"; background-color: "+this.target.color+"'></div>";o+="<div class='"+p+" "+this.toThemeProperty("jqx-bulletchart-pointer")+"' id='"+m+"' style='top: "+n+"; height: "+c+"; background-color: "+this.pointer.color+"'></div>"}else{if(this.orientation=="vertical"){var r=this._chartContainer.width();var q=this._normaliseValue(l);var s=this._checkPercentage(l,this._chartContainer);var b=(k-this._min)*this._valueToPixelsVertical-j;var u=b+parseInt(e)-this._chartContainer.height();if(b<0){b=0}else{if(u>0){b-=u}}var h=this._normaliseValue(e);o+="<div class='"+g+" "+this.toThemeProperty("jqx-bulletchart-target")+" "+this.toThemeProperty("jqx-bulletchart-target-vertical")+"' id='"+f+"' style='bottom: "+b+"px; height: "+h+"; background-color: "+this.target.color+"'></div>";o+="<div class='"+p+" "+this.toThemeProperty("jqx-bulletchart-pointer")+"' id='"+m+"' style='left: "+s+"; width: "+q+"; background-color: "+this.pointer.color+"'></div>"}}this._chartContainer.append(o)},_updatePointer:function(c,i){var h=a("#"+this.element.id+"Pointer");if(c.value>this._max){this.pointer.value=this._max}else{if(c.value<this._min){this.pointer.value=this._min}}if(c.value!=i.value){this._updateValue(c.value,i.value);if(this.showTooltip==true){this._updateTooltip()}}if(c.label!=i.label){if(this.showTooltip==true){this._updateTooltip()}}if(c.size!=i.size){var d=c.size;if(this.orientation=="horizontal"){var g=this._checkPercentage(d,this._chartContainer);var b=this._normaliseValue(d);h.css({top:g,height:b})}else{if(this.orientation=="vertical"){var f=this._checkPercentage(d,this._chartContainer);var e=this._normaliseValue(d);h.css({left:f,width:e})}}}if(c.color!=i.color){if(c.color==""){h.css("background-color","");h.addClass(this.toThemeProperty("jqx-fill-state-pressed"))}else{h.removeClass(this.toThemeProperty("jqx-fill