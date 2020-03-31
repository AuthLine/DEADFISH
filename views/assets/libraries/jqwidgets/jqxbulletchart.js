/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxBulletChart","",{});a.extend(a.jqx._jqxBulletChart.prototype,{defineInstance:function(){var b={width:500,height:100,barSize:"50%",ranges:[{startValue:0,endValue:50,color:"#000000",opacity:0.7},{startValue:50,endValue:80,color:"#000000",opacity:0.5},{startValue:80,endValue:100,color:"#000000",opacity:0.3}],pointer:{value:65,label:"Value",size:"25%",color:""},target:{value:85,label:"Target",size:4,color:""},ticks:{position:"far",interval:20,size:10},title:"Title",description:"Description",orientation:"horizontal",labelsFormat:null,labelsFormatFunction:null,animationDuration:400,showTooltip:true,tooltipFormatFunction:null,disabled:false,rtl:false,events:["change"]};if(this===a.jqx._jqxBulletChart.prototype){return b}a.extend(true,this,b);return b},createInstance:function(b){if(!a.jqx.dataAdapter){throw new Error("jqxBulletChart: Missing reference to the following module: 'jqxdata.js'.")}this._setDefaultValues();this.render();var c=this;a.jqx.utilities.resize(this.host,function(){if(c._timer){clearTimeout(c._timer)}c._timer=setTimeout(function(){var d=c.animationDuration;c.animationDuration=0;c.render();setTimeout(function(){c.animationDuration=d},0)},10)},false,true)},render:function(){if(this.host.children().length>0){this._removeHandlers();if(this.showTooltip==true){this.host.jqxTooltip("destroy")}this.host.empty()}this.host.addClass(this.toThemeProperty("jqx-widget"));this.host.addClass(this.toThemeProperty("jqx-bulletchart"));this.host.width(this.width);this.host.height(this.height);var n=this.host.width();var d=this.host.height();var l;var j=this.rtl?"rtl":"ltr";if(this.orientation=="horizontal"){l=a("<div style='position: absolute; visibility: hidden; padding: 5px;'><div class='"+this.toThemeProperty("jqx-bulletchart-title")+"' style='direction: "+j+";'>"+this.title+"</div><div class='"+this.toThemeProperty("jqx-bulletchart-description")+"' style='direction: "+j+";'>"+this.description+"</div></div>")}else{if(this.orientation=="vertical"){l=a("<div style='position: absolute; visibility: hidden; padding-bottom: 15px;'><div class='"+this.toThemeProperty("jqx-bulletchart-title")+"' style='width: "+n+"px; direction: "+j+";'>"+this.title+"</div><div class='"+this.toThemeProperty("jqx-bulletchart-description")+"' style='direction: "+j+";'>"+this.description+"</div></div>")}}this.host.append(l);var k=l.outerWidth();var g=l.outerHeight();l.remove();var e,h,i,b,o,m,f,c;if(this.orientation=="horizontal"){e="jqx-bulletchart-title-container-horizontal";h="jqx-bulletchart-chart-container-horizontal";i=this._checkPercentage(this.barSize,this.host);b=k;o=this.barSize;m=0;f=n-b;c=o;if(this.width&&this.width.toString().indexOf("%")>=0){var f=parseFloat(parseFloat(f*100)/n).toString()+"%";var b=parseFloat(parseFloat(b*100)/n).toString()+"%";this._percentageWidth=true}}else{if(this.orientation=="vertical"){e="jqx-bulletchart-title-container-vertical";h="jqx-bulletchart-chart-container-vertical";i=0;b="100%";o=g;m=this._checkPercentage(this.barSize,this.host);f=this.barSize;c=d-o}}if(this.rtl==false||(this.rtl==true&&this.orientation=="vertical")){this.host.append("<div id='"+this.element.id+"titleContainer' class='"+e+"' style='top: "+i+";'></div>")}this.host.append("<div id='"+this.element.id+"ChartContainer' class='"+h+"' style='top: "+i+"; left: "+m+";'></div>");if(this.rtl==true&&this.orientation=="horizontal"){this.host.append("<div id='"+this.element.id+"titleContainer' class='"+e+"' style='top: "+i+";'></div>")}this._titleContainer=a("#"+this.element.id+"titleContainer");this._chartContainer=a("#"+this.element.id+"ChartContainer");this._titleContainer.css({width:b,height:o});this._chartContainer.css({width:f,height:c});this._min=this.ranges[0].startValue;this._max=this.ranges[this.ranges.length-1].endValue;this._interval=this._max-this._min;this._valueToPixelsHorizontal=this._chartContainer.width()/this._interval;this._valueToPixelsVertical=this._chartContainer.height()/this._interval;this._checkValues();this._appendRanges();this._appendPointerAndTarget();this._appendTitleAndDescription();if(this.ticks.position!="none"){this._appendTicksAndLabels()}if(this.disabled==true){this.host.addClass(this.toThemeProperty("jqx-fill-state-disabled"))}if(this.showTooltip==true){if(this.host.jqxTooltip!=undefined){this._initializeTooltip();this.host.data().jqxWidget=this}else{throw new Error("jqxBulletChart: Missing reference to the following module: 'jqxtooltip.js'.")}}this._updateValue(this.pointer.value,0,true)},refresh:function(b){if(!b){this.render()}},val:function(b){if(arguments.length==0||(b!=null&&typeof(b)=="object")){return this.pointer.value}else{if(b>this._max){b=this._max}else{if(b<this._min){b=this._min}}if(b!=this.pointer.value){this._updateValue(b,this.pointer.value);this.pointer.value=b;if(this.showTooltip==true){this._updateTooltip()}}}},destroy:function(){a.jqx.utilities.resize(this.host,null,true);this._removeHandlers();if(this.showTooltip==true){this.host.jqxTooltip("destroy")}this.host.remove()},propertyChangedHandler:function(c,d,g,e){if(g!=e||e instanceof Object){var b=true;var f=function(){a.each(g,function(i,h){if(e[i]==undefined){c[d][i]=h}})};switch(d){case"barSize":break;case"ranges":a.each(g,function(i,h){a.each(h,function(k,j){if(e[i]===undefined){return}if(e[i][k]==undefined){c[d][i][k]=j}})});this._setDefaultValues();break;case"pointer":f();this._updatePointer(e,g);return;case"target":f();this._updateTarget(e,g);return;case"ticks":b=false;f();a.each(g,function(i,h){if(g[i]!=c[d][i]){b=!(b&&false)}});break;case"showTooltip":if(e==true){if(this.host.jqxTooltip!=undefined){this._initializeTooltip()}else{throw new Error("jqxBulletChart: Missing reference to the following module: 'jqxtooltip.js'.")}}else{this._removeHandlers();this.host.jqxTooltip("destroy")}break;case"animationDuration":return;case"tooltipFormatFunction":this._updateTooltip();return;case"disabled":if(e==true){this.host.addClass(this.toThemeProperty("jqx-fill-state-disabled"))}else{this.host.removeClass(this.toThemeProperty("jqx-fill-state-disabled"))}return}if(b==true){this.render()}}},_raiseEvent:function(g,e){var c=this.events[g];var f=new a.Event(c);f.owner=this;f.args=e;try{var b=this.host.trigger(f)}catch(d){}return b},_removeHandlers:function(){var b=a("#"+this.element.id+"Pointer, #"+this.element.id+"Target");this.removeHandler(b,"mouseenter.bulletchart"+this.element.id);this.removeHandler(b,"mouseleave.bulletchart"+this.element.id)},_setDefaultValues:function(){var b=this.ran