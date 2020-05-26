/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxChart","",{});a.extend(a.jqx._jqxChart.prototype,{defineInstance:function(){a.extend(true,this,this._defaultSettings);this._createColorsCache();return this._defaultSettings},_defaultSettings:{title:"Title",description:"Description",source:[],seriesGroups:[],categoryAxis:null,xAxis:{},valueAxis:null,renderEngine:"",enableAnimations:true,enableAxisTextAnimation:false,backgroundImage:"",background:"#FFFFFF",padding:{left:5,top:5,right:5,bottom:5},backgroundColor:"#FFFFFF",showBorderLine:true,borderLineWidth:1,borderLineColor:null,borderColor:null,titlePadding:{left:5,top:5,right:5,bottom:10},showLegend:true,legendLayout:null,enabled:true,colorScheme:"scheme01",animationDuration:500,showToolTips:true,showToolTipsOnAllSeries:false,toolTipShowDelay:300,toolTipDelay:500,toolTipHideDelay:4000,toolTipMoveDuration:300,toolTipFormatFunction:null,toolTipAlignment:"dataPoint",localization:null,columnSeriesOverlap:false,rtl:false,legendPosition:null,greyScale:false,axisPadding:5,enableCrosshairs:false,crosshairsColor:"#BCBCBC",crosshairsDashStyle:"2,2",crosshairsLineWidth:1,enableEvents:true,_itemsToggleState:[],_isToggleRefresh:false,_isSelectorRefresh:false,_sliders:[],_selectorRange:[],_rangeSelectorInstances:{},_resizeState:{},renderer:null,_isRangeSelectorInstance:false,drawBefore:null,draw:null,_renderData:{},enableSampling:true},_defaultLineColor:"#BCBCBC",_touchEvents:{mousedown:a.jqx.mobile.getTouchEventName("touchstart"),click:a.jqx.mobile.getTouchEventName("touchstart"),mouseup:a.jqx.mobile.getTouchEventName("touchend"),mousemove:a.jqx.mobile.getTouchEventName("touchmove"),mouseenter:"mouseenter",mouseleave:"mouseleave"},_getEvent:function(b){if(this._isTouchDevice){return this._touchEvents[b]}else{return b}},destroy:function(){this.host.remove()},_jqxPlot:null,createInstance:function(d){if(!a.jqx.dataAdapter){throw"jqxdata.js is not loaded"}var c=this;c._refreshOnDownloadComlete();c._isTouchDevice=a.jqx.mobile.isTouchDevice();if(!c._jqxPlot){c._jqxPlot=new jqxPlot()}c.addHandler(c.host,c._getEvent("mousemove"),function(g){if(c.enabled==false){return}if(!c._isRangeSelectorInstance){c.host.css("cursor","default")}var f=g.pageX||g.clientX||g.screenX;var j=g.pageY||g.clientY||g.screenY;var i=c.host.offset();if(c._isTouchDevice){var h=a.jqx.position(g);f=h.left;j=h.top}f-=i.left;j-=i.top;c.onmousemove(f,j)});c.addHandler(c.host,c._getEvent("mouseleave"),function(h){if(c.enabled==false){return}var f=c._mouseX;var i=c._mouseY;var g=c._plotRect;if(g&&f>=g.x&&f<=g.x+g.width&&i>=g.y&&i<=g.y+g.height){return}c._cancelTooltipTimer();c._hideToolTip(0);c._unselect()});c.addHandler(c.host,"click",function(g){if(c.enabled==false){return}var f=g.pageX||g.clientX||g.screenX;var j=g.pageY||g.clientY||g.screenY;var i=c.host.offset();if(c._isTouchDevice){var h=a.jqx.position(g);f=h.left;j=h.top}f-=i.left;j-=i.top;c._mouseX=f;c._mouseY=j;if(!isNaN(c._lastClickTs)){if((new Date()).valueOf()-c._lastClickTs<100){return}}this._hostClickTimer=setTimeout(function(){if(!c._isTouchDevice){c._cancelTooltipTimer();c._hideToolTip();c._unselect()}if(c._pointMarker&&c._pointMarker.element){var l=c.seriesGroups[c._pointMarker.gidx];var k=l.series[c._pointMarker.sidx];g.stopImmediatePropagation();c._raiseItemEvent("click",l,k,c._pointMarker.iidx)}},100)});var e=c.element.style;if(e){var b=false;if(e.width!=null){b|=e.width.toString().indexOf("%")!=-1}if(e.height!=null){b|=e.height.toString().indexOf("%")!=-1}if(b){a.jqx.utilities.resize(this.host,function(){if(c.timer){clearTimeout(c.timer)}var f=1;c.timer=setTimeout(function(){var g=c.enableAnimations;c.enableAnimations=false;c.refresh();c.enableAnimations=g},f)},false,true)}}},_refreshOnDownloadComlete:function(){var d=this;var e=this.source;if(e instanceof a.jqx.dataAdapter){var f=e._options;if(f==undefined||(f!=undefined&&!f.autoBind)){e.autoSync=false;e.dataBind()}var c=this.element.id;if(e.records.length==0){var b=function(){if(d.ready){d.ready()}d.refresh()};e.unbindDownloadComplete(c);e.bindDownloadComplete(c,b)}else{if(d.ready){d.ready()}}e.unbindBindingUpdate(c);e.bindBindingUpdate(c,function(){if(d._supressBindingRefresh){return}d.refresh()})}},propertyChangedHandler:function(b,c,e,d){if(this.isInitialized==undefined||this.isInitialized==false){return}if(c=="source"){this._refreshOnDownloadComlete()}this.refresh()},_initRenderer:function(b){if(!a.jqx.createRenderer){throw"Please include jqxdraw.js"}return a.jqx.createRenderer(this,b)},_internalRefresh:function(){var b=this;if(a.jqx.isHidden(b.host)){return}b._stopAnimations();if(!b.renderer||(!b._isToggleRefresh&&!b._isUpdate)){b._hideToolTip(0);b._isVML=false;b.host.empty();b._measureDiv=undefined;b._initRenderer(b.host)}var d=b.renderer;if(!d){return}var c=d.getRect();b._render({x:1,y:1,width:c.width,height:c.height});this._raiseEvent("refreshBegin",{instance:this});if(d instanceof a.jqx.HTML5Renderer){d.refresh()}b._isUpdate=false;this._raiseEvent("refreshEnd",{instance:this})},saveAsPNG:function(d,b,c){return this._saveAsImage("png",d,b,c)},saveAsJPEG:function(d,b,c){return this._saveAsImage("jpeg",d,b,c)},saveAsPDF:function(d,b,c){return this._saveAsImage("pdf",d,b,c)},_saveAsImage:function(e,h,b,c){var g=false;for(var d=0;d<this.seriesGroups.length&&!g;d++){var f=this._getXAxis(d);if(f&&f.rangeSelector){g=true}}return a.jqx._widgetToImage(this,e,h,b,c,g?this._selectorSaveAsImageCallback:undefined)},_selectorSaveAsImageCallback:function(B,h){var r=B;for(var z=0;z<r.seriesGroups.length;z++){var o=r._getXAxis(z);if(!o||!o.rangeSelector||o.rangeSelector.renderTo){continue}var m=r._rangeSelectorInstances[z];if(!m){continue}var s=m.jqxChart("getInstance");var e=s.renderEngine;var d=s.renderer.getRect();var f=s.renderer.getContainer().find("canvas")[0];var p=f.getContext("2d");var w=r._sliders[z];var b=r.seriesGroups[z].orientation=="horizontal";var c=!b?"width":"height";var v=b?"width":"height";var y=!b?"x":"y";var g=b?"x":"y";var k={};k[y]=w.startOffset+w.rect[y];k[g]=w.rect[g];k[c]=w.endOffset-w.startOffset;k[v]=w.rect[v];var n=o.rangeSelector.colorSelectedRange||"blue";var u=o.rangeSelector.colorUnselectedRange||"white";var l=o.rangeSelector.colorRangeLine||"grey";var q=[];q.push(s.renderer.rect(k.x,k.y,k.width,k.height,{fill:n,opacity:0.1}));if(!b){q.push(s.renderer.line(a.jqx._ptrnd(w.rect.x),a.jqx._ptrnd(w.rect.y),a.jqx._ptrnd(k.x),a.jqx._ptrnd(w.rect.y),{stroke:l,opacity:0.5}));q.push(s.renderer.line(a.jqx._ptrnd(k.x+k.width),a.jqx._ptrnd(w.rect.y),a.jqx._ptrnd(w.rect.x+w.rect.width),a.jqx._ptrnd(w.rect.y),{stroke:l,opacity:0.5}));q.push(s.renderer.line(a.jqx._ptrnd(k.x),a.jqx._ptrnd(w.rect.y),a.jqx._ptrnd(k.x),a.jqx._ptrnd(w.rect.y+w.rect.height),{stroke:l,opacity:0.5}));q.push(s.renderer.line(a.jqx._ptrnd(k.x+k.width),a.jqx._ptrnd(w.rect.y),a.jqx._ptrnd(k.x+k.width),a.jqx._ptrnd(w.rect.y+w.rect.height),{stroke:l,opacity:0.5}))}else{q.push(s.renderer.line(a.jqx._ptrnd(w.rect.x+w.rect.width),a.jqx._ptrnd(w.rect.y),a.jqx._ptrnd(w.rect.x+w.rect.width),a.jqx._ptrnd(k.y),{stroke:l,opacity:0.5}));q.push(s.renderer.line(a.jqx._ptrnd(w.rect.x+w.rect.width),a.jqx._ptrnd(k.y+k.height),a.jqx._ptrnd(w.rect.x+w.rect.width),a.jqx._ptrnd(w.rect.y+w.rect.height),{stroke:l,opacity:0.5}));q.push(s.renderer.line(a.jqx._ptrnd(w.rect.x),a.jqx._ptrnd(k.y),a.jqx._ptrnd(w.rect.x+w.rect.width),a.jqx._ptrnd(k.y),{stroke:l,opacity:0.5}));q.push(s.renderer.line(a.jqx._ptrnd(w.rect.x),a.jqx._ptrnd(k.y+k.height),a.jqx._ptrnd(w.rect.x+w.rect.width),a.jqx._ptrnd(k.y+k.height),{stroke:l,opacity:0.5}))}s.renderer.refresh();var t=p.getImageData(d.x,d.y,d.width,d.height);var A=h.getContext("2d");A.putImageData(t,parseInt(m.css("left")),parseInt(m.css("top")),1,1,d.width,d.height);for(var x=0;x<q.length;x++){s.renderer.removeElement(q[x])}s.renderer.refresh()}return true},refresh:function(){this._internalRefresh()},update:function(){this._isUpdate=true;this._internalRefresh()},_seriesTypes:["line","stackedline","stackedline100","spline","stackedspline","stackedspline100","stepline","stackedstepline","stackedstepline100","area","stackedarea","stackedarea100","splinearea","stackedsplinearea","stackedsplinearea100","steparea","stackedsteparea","stackedsteparea100","rangearea","splinerangearea","steprangearea","column","stackedcolumn","stackedcolumn100","rangecolumn","scatter","stackedscatter","stackedscatter100","bubble","stackedbubble","stackedbubble100","pie","donut","candlestick","ohlc","waterfall","stackedwaterfall"],clear:function(){var b=this;for(var c in b._defaultSettings){b[c]=b._defaultSettings[c]}b.title="";b.description="";b.refresh()},_validateSeriesGroups:function(){if(!a.isArray(this.seriesGroups)){throw"Invalid property: 'seriesGroups' property is required and must be a valid array."}for(var b=0;b<this.seriesGroups.length;b++){var c=this.seriesGroups[b];if(!c.type){throw"Invalid property: Each series group must have a valid 'type' property."}if(!a.isArray(c.series)){throw"Invalid property: Each series group must have a 'series' property which must be a valid array."}}},_render:function(C){var m=this;var I=m.renderer;m._validateSeriesGroups();m._colorsCache.clear();if(!m._isToggleRefresh&&m._isUpdate&&m._renderData){m._renderDataClone()}m._renderData=[];I.clear();m._unselect();m._hideToolTip(0);var n=m.backgroundImage;if(n==undefined||n==""){m.host.css({"background-image":""})}else{m.host.css({"background-image":(n.indexOf("(")!=-1?n:"url('"+n+"')")})}m._rect=C;var Y=m.padding||{left:5,top:5,right:5,bottom:5};var q=I.createClipRect(C);var L=I.beginGroup();I.setClip(L,q);var ai=I.rect(C.x,C.y,C.width-2,C.height-2);if(n==undefined||n==""){I.attr(ai,{fill:m.backgroundColor||m.background||"white"})}else{I.attr(ai,{fill:"transparent"})}if(m.showBorderLine!=false){var F=m.borderLineColor==undefined?m.borderColor:m.borderLineColor;if(F==undefined){F=m._defaultLineColor}var o=this.borderLineWidth;if(isNaN(o)||o<0||o>10){o=1}I.attr(ai,{"stroke-width":o,stroke:F})}else{if(a.jqx.browser.msie&&a.jqx.browser.version<9){I.attr(ai,{"stroke-width":1,stroke:m.backgroundColor||"white"})}}if(a.isFunction(m.drawBefore)){m.drawBefore(I,C)}var V={x:Y.left,y:Y.top,width:C.width-Y.left-Y.right,height:C.height-Y.top-Y.bottom};m._paddedRect=V;var e=m.titlePadding||{left:2,top:2,right:2,bottom:2};var l;if(m.title&&m.title.length>0){var S=m.toThemeProperty("jqx-chart-title-text",null);l=I.measureText(m.title,0,{"class":S});I.text(m.title,V.x+e.left,V.y+e.top,V.width-(e.left+e.right),l.height,0,{"class":S},true,"center","center");V.y+=l.height;V.height-=l.height}if(m.description&&m.description.length>0){var T=m.toThemeProperty("jqx-chart-title-description",null);l=I.measureText(m.description,0,{"class":T});I.text(m.description,V.x+e.left,V.y+e.top,V.width-(e.left+e.right),l.height,0,{"class":T},true,"center","center");V.y+=l.height;V.height-=l.height}if(m.title||m.description){V.y+=(e.bottom+e.top);V.height-=(e.bottom+e.top)}var b={x:V.x,y:V.y,width:V.width,height:V.height};m._plotRect=b;m._buildStats(b);var H=m._isPieOnlySeries();var s=m.seriesGroups;var E;var D={xAxis:{},valueAxis:{}};for(var Z=0;Z<s.length&&!H;Z++){if(s[Z].type=="pie"||s[Z].type=="donut"){continue}var z=m._getXAxis(Z);if(!z){throw"seriesGroup["+Z+"] is missing xAxis definition"}var ae=z==m._getXAxis()?-1:Z;D.xAxis[ae]=0}var U=m.axisPadding;if(isNaN(U)){U=5}var r={left:0,right:0,leftCount:0,rightCount:0};var p=[];for(Z=0;Z<s.length;Z++){var ad=s[Z];if(ad.type=="pie"||ad.type=="donut"||ad.spider==true||ad.polar==true){p.push({width:0,position:0,xRel:0});continue}E=ad.orientation=="horizontal";var z=m._getXAxis(Z);var ae=z==m._getXAxis()?-1:Z;var k=m._getValueAxis(Z);var O=k==m._getValueAxis()?-1:Z;var R=!E?k.axisSize:z.axisSize;var f={x:0,y:b.y,width:b.width,height:b.height};var Q=E?m._getXAxis(Z).position:k.position;if(!R||R=="auto"){if(E){R=this._renderXAxis(Z,f,true,b).width;if((D.xAxis[ae]&1)==1){R=0}else{if(R>0){D.xAxis[ae]|=1}}}else{R=m._renderValueAxis(Z,f,true,b).width;if((D.valueAxis[O]&1)==1){R=0}else{if(R>0){D.valueAxis[O]|=1}}}}if(Q!="left"&&m.rtl==true){Q="right"}if(Q!="right"){Q="left"}if(r[Q+"Count"]>0&&r[Q]>0&&R>0){r[Q]+=U}p.push({width:R,position:Q,xRel:r[Q]});r[Q]+=R;r[Q+"Count"]++}var u=Math.max(1,Math.max(C.width,C.height));var ac={top:0,bottom:0,topCount:0,bottomCount:0};var W=[];for(Z=0;Z<s.length;Z++){var ad=s[Z];if(ad.type=="pie"||ad.type=="donut"||ad.spider==true||ad.polar==true){W.push({height:0,position:0,yRel:0});continue}E=ad.orientation=="horizontal";var k=this._getValueAxis(Z);var O=k==m._getValueAxis()?-1:Z;var z=m._getXAxis(Z);var ae=z==m._getXAxis()?-1:Z;var ab=!E?z.axisSize:k.axisSize;var Q=E?k.position:z.position;if(!ab||ab=="auto"){if(E){ab=m._renderValueAxis(Z,{x:0,y:0,width:u,height:0},true,b).height;if((D.valueAxis[O]&2)==2){ab=0}else{if(ab>0){D.valueAxis[O]|=2}}}else{ab=m._renderXAxis(Z,{x:0,y:0,width:u,height:0},true).height;if((D.xAxis[ae]&2)==2){ab=0}else{if(ab>0){D.xAxis[ae]|=2}}}}if(Q!="top"){Q="bottom"}if(ac[Q+"Count"]>0&&ac[Q]>0&&ab>0){ac[Q]+=U}W.push({height:ab,position:Q,yRel:ac[Q]});ac[Q]+=ab;ac[Q+"Count"]++}m._createAnimationGroup("series");var t=(m.showLegend!=false);var B=!t?{width:0,height:0}:m._renderLegend(m.legendLayout?m._rect:V,true);if(this.legendLayout&&(!isNaN(this.legendLayout.left)||!isNaN(this.legendLayout.top))){B={width:0,height:0}}if(V.height<ac.top+ac.bottom+B.height||V.width<r.left+r.right){I.endGroup();return}b.height-=ac.top+ac.bottom+B.height;b.x+=r.left;b.width-=r.left+r.right;b.y+=ac.top;var G=[];if(!H){var af=m._getXAxis().tickMarksColor||m._defaultLineColor;for(Z=0;Z<s.length;Z++){var ad=s[Z];if(ad.polar==true||ad.spider==true||ad.type=="pie"||ad.type=="donut"){continue}E=ad.orientation=="horizontal";var ae=m._getXAxis(Z)==m._getXAxis()?-1:Z;var O=m._getValueAxis(Z)==m._getValueAxis()?-1:Z;var f={x:b.x,y:0,width:b.width,height:W[Z].height};if(W[Z].position!="top"){f.y=b.y+b.height+W[Z].yRel}else{f.y=b.y-W[Z].yRel-W[Z].height}if(E){if((D.valueAxis[O]&4)==4){continue}if(!m._isGroupVisible(Z)){continue}m._renderValueAxis(Z,f,false,b);D.valueAxis[O]|=4}else{G.push(f);if((D.xAxis[ae]&4)==4){continue}if(!m._isGroupVisible(Z)){continue}m._renderXAxis(Z,f,false,b);D.xAxis[ae]|=4}}}if(t){var A=m.legendLayout?m._rect:V;var P=V.x+a.jqx._ptrnd((V.width-B.width)/2);var N=b.y+b.height+ac.bottom;var R=V.width;var ab=B.height;if(m.legendLayout){if(!isNaN(m.legendLayout.left)){P=m.legendLayout.left}if(!isNaN(m.legendLayout.top)){N=m.legendLayout.top}if(!isNaN(m.legendLayout.width)){R=m.legendLayout.width}if(!isNaN(m.legendLayout.height)){ab=m.legendLayout.height}}if(P+R>A.x+A.width){R=A.x+A.width-P}if(N+ab>A.y+A.height){ab=A.y+A.height-N}m._renderLegend({x:P,y:N,width:R,height:ab})}m._hasHorizontalLines=false;if(!H){for(Z=0;Z<s.length;Z++){var ad=s[Z];if(ad.polar==true||ad.spider==true||ad.type=="pie"||ad.type=="donut"){continue}E=s[Z].orientation=="horizontal";var f={x:b.x-p[Z].xRel-p[Z].width,y:b.y,width:p[Z].width,height:b.height};if(p[Z].position!="left"){f.x=b.x+b.width+p[Z].xRel}var ae=m._getXAxis(Z)==m._getXAxis()?-1:Z;var O=m._getValueAxis(Z)==m._getValueAxis()?-1:Z;if(E){G.push(f);if((D.xAxis[ae]&8)==8){continue}if(!m._isGroupVisible(Z)){continue}m._renderXAxis(Z,f,false,b);D.xAxis[ae]|=8}else{if((D.valueAxis[O]&8)==8){continue}if(!m._isGroupVisible(Z)){continue}m._renderValueAxis(Z,f,false,b);D.valueAxis[O]|=8}}}if(b.width<=0||b.height<=0){return}m._plotRect={x:b.x,y:b.y,width:b.width,height:b.height};for(Z=0;Z<s.length;Z++){this._drawPlotAreaLines(Z,true,{gridLines:false,tickMarks:false,alternatingBackground:true});this._drawPlotAreaLines(Z,false,{gridLines:false,tickMarks:false,alternatingBackground:true})}for(Z=0;Z<s.length;Z++){this._drawPlotAreaLines(Z,true,{gridLines:true,tickMarks:true,alternatingBackground:false});this._drawPlotAreaLines(Z,false,{gridLines:true,tickMarks:true,alternatingBackground:false})}var K=false;for(Z=0;Z<s.length&&!K;Z++){var ad=s[Z];if(ad.annotations!==undefined||a.isFunction(ad.draw)||a.isFunction(ad.drawBefore)){K=true;break}}var M=I.beginGroup();if(!K){var J=I.createClipRect({x:b.x-2,y:b.y,width:b.width+4,height:b.height});I.setClip(M,J)}for(Z=0;Z<s.length;Z++){var ad=s[Z];var c=false;for(var ag in m._seriesTypes){if(m._seriesTypes[ag]==ad.type){c=true;break}}if(!c){throw'Invalid serie type "'+ad.type+'"'}if(a.isFunction(ad.drawBefore)){ad.drawBefore(I,C,Z,this)}if(ad.polar==true||ad.spider==true){if(ad.type.indexOf("pie")==-1&&ad.type.indexOf("donut")==-1){m._renderSpiderAxis(Z,b)}}m._renderAxisBands(Z,b,true);m._renderAxisBands(Z,b,false)}for(Z=0;Z<s.length;Z++){var ad=s[Z];if(m._isColumnType(ad.type)){m._renderColumnSeries(Z,b)}else{if(ad.type.indexOf("pie")!=-1||ad.type.indexOf("donut")!=-1){m._renderPieSeries(Z,b)}else{if(ad.type.indexOf("line")!=-1||ad.type.indexOf("area")!=-1){m._renderLineSeries(Z,b)}else{if(ad.type.indexOf("scatter")!=-1||ad.type.indexOf("bubble")!=-1){m._renderScatterSeries(Z,b)}else{if(ad.type.indexOf("candlestick")!=-1||ad.type.indexOf("ohlc")!=-1){m._renderCandleStickSeries(Z,b,ad.type.indexOf("ohlc")!=-1)}}}}}if(ad.annotations){if(!this._moduleAnnotations){throw"Please include 'jqxchart.annotations.js'"}for(var X=0;X<ad.annotations.length;X++){m._renderAnnotation(Z,ad.annotations[X],b)}}if(a.isFunction(ad.draw)){m.draw(I,C,Z,this)}}I.endGroup();if(m.enabled==false){var aa=I.rect(C.x,C.y,C.width,C.height);I.attr(aa,{fill:"#777777",opacity:0.5,stroke:"#00FFFFFF"})}if(a.isFunction(m.draw)){m.draw(I,C)}I.endGroup();m._startAnimation("series");if(m._credits){m._credits()}var ah=false;for(var Z=0;Z<m.seriesGroups.length&&!ah;Z++){var z=m._getXAxis(Z);if(z&&z.rangeSelector){ah=true}}if(ah){if(!this._moduleRangeSelector){throw"Please include 'jqxchart.rangeselector.js'"}var d=[];if(!this._isSelectorRefresh){m.removeHandler(a(document),m._getEvent("mousemove"),m._onSliderMouseMove);m.removeHandler(a(document),m._getEvent("mousedown"),m._onSliderMouseDown);m.removeHandler(a(document),m._getEvent("mouseup"),m._onSliderMouseUp)}if(!m._isSelectorRefresh){m._rangeSelectorInstances={}}for(Z=0;Z<m.seriesGroups.length;Z++){var v=this._getXAxis(Z);if(d.indexOf(v)==-1){if(this._renderXAxisRangeSelector(Z,G[Z])){d.push(v)}}}}},_credits:function(){if(a.jqx.credits!=="75CE8878-FCD1-4EC7-9249-BA0F153A5DE8"){var c=this;var d=String.fromCharCode(119,119,119,46,106,113,119,105,100,103,101,116,115,46,99,111,109);if(!c._isRangeSelectorInstance&&location.hostname.indexOf(d.substring(4))==-1){var g=c.renderer;var f=c._rect;var h={"class":c.toThemeProperty("jqx-chart-legend-text",null),opacity:0.5};var e=g.measureText(d,0,h);var b=g.text(d,f.x+f.width-e.width-5,f.y+f.height-e.height-5,e.width,e.height,0,h);a(b).on("click",function(){location.href="http://"+d+"/?ref="+c.widgetName})}}},_isPieOnlySeries:function(){var c=this.seriesGroups;if(c.length==0){return false}for(var b=0;b<c.length;b++){if(c[b].type!="pie"&&c[b].type!="donut"){return false}}return true},_renderChartLegend:function(V,C,S,v){var l=this;var D=l.renderer;var I={x:C.x,y:C.y,width:C.width,height:C.height};var N=3;if(I.width>=2*N){I.x+=N;I.width-=2*N}if(I.height>=2*N){I.y+=N;I.height-=2*N}var E={width:I.width,height:0};var G=0,F=0;var p=20;var m=0;var f=10;var Q=10;var w=0;for(var P=0;P<V.length;P++){var J=V[P].css;if(!J){J=l.toThemeProperty("jqx-chart-legend-text",null)}p=20;var A=V[P].text;var j=D.measureText(A,0,{"class":J});if(j.height>p){p=j.height}if(j.width>w){w=j.width}if(v){if(P!=0){F+=p}if(F>I.height){F=0;G+=w+2*Q+f;w=j.width;E.width=G+w}}else{if(G!=0){G+=Q}if(G+2*f+j.width>I.width&&j.width<I.width){G=0;F+=p;p=20;m=I.width;E.height=F+p}}var K=false;if(j.width>I.width){K=true;var s=I.width;var T=A;var X=T.split(/\s+/);var o=[];var q="";for(var M=0;M<X.length;M++){var k=q+((q.length>0)?" ":"")+X[M];var B=l.renderer.measureText(k,0,{"class":J});if(B.width>s&&k.length>0&&q.length>0){o.push({text:q});q=X[M]}else{q=k}if(M+1==X.length){o.push({text:q})}}j.width=0;var c=0;for(var H=0;H<o.length;H++){var W=o[H].text;var B=l.renderer.measureText(W,0,{"class":J});j.width=Math.max(j.width,B.width);c+=j.height}j.height=c}var z=(G+j.width<I.width)&&(F+j.height<C.height);if(l.legendLayout){var z=I.x+G+j.width<l._rect.x+l._rect.width&&I.y+F+j.height<l._rect.y+l._rect.height}if(!S&&z){var h=V[P].seriesIndex;var n=V[P].groupIndex;var b=V[P].itemIndex;var Y=V[P].fillColor;var U=V[P].lineColor;var e=l._isSerieVisible(n,h,b);var R=D.beginGroup();var O=e?V[P].opacity:0.1;if(K){var T=A;var s=I.width;var X=T.split(/\s+/);var u="";var d=0;var o=[];var q="";for(var M=0;M<X.length;M++){var k=q+((q.length>0)?" ":"")+X[M];var B=l.renderer.measureText(k,0,{"class":J});if(B.width>s&&k.length>0&&q.length>0){o.push({text:q,dy:d});d+=B.height;q=X[M]}else{q=k}if(M+1==X.length){o.push({text:q,dy:d})}}for(var H=0;H<o.length;H++){var W=o[H].text;d=o[H].dy;var B=l.renderer.measureText(W,0,{"class":J});if(v){l.renderer.text(W,I.x+G+1.5*f,I.y+F+d,j.width,p,0,{"class":J},false,"left","center")}else{l.renderer.text(W,I.x+G+1.5*f,I.y+F+d,j.width,p,0,{"class":J},false,"center","center")}}var L=D.rect(I.x+G,I.y+F+f/2+d/2,f,f);if(v){F+=d}l.renderer.attr(L,{fill:Y,"fill-opacity":O,stroke:U,"stroke-width":1,"stroke-opacity":V[P].opacity})}else{var L=D.rect(I.x+G,I.y+F+f/2,f,f);l.renderer.attr(L,{fill:Y,"fill-opacity":O,stroke:U,"stroke-width":1,"stroke-opacity":V[P].opacity});if(v){l.renderer.text(A,I.x+G+1.5*f,I.y+F,j.width,j.height+f/2,0,{"class":J},false,"left","center")}else{l.renderer.text(A,I.x+G+1.5*f,I.y+F,j.width,p,0,{"class":J},false,"center","center")}}l.renderer.endGroup();l._setLegendToggleHandler(n,h,b,R)}if(v){}else{G+=j.width+2*f;if(m<G){m=G}}}if(S){E.height=a.jqx._ptrnd(F+p+5);E.width=a.jqx._ptrnd(m);return E}},isSerieVisible:function(d,b,c){return this._isSerieVisible(d,b,c)},_isSerieVisible:function(f,b,d){while(this._itemsToggleState.length<f+1){this._itemsToggleState.push([])}var e=this._itemsToggleState[f];while(e.length<b+1){e.push(isNaN(d)?true:[])}var c=e[b];if(isNaN(d)){return c}if(!a.isArray(c)){e[b]=c=[]}while(c.length<d+1){c.push(true)}return c[d]},isGroupVisible:function(b){return this._isGroupVisible(b)},_isGroupVisible:function(e){var d=false;var c=this.seriesGroups[e].series;if(!c){return d}for(var b=0;b<c.length;b++){if(this._isSerieVisible(e,b)){d=true;break}}return d},_toggleSerie:function(h,b,e,c){var g=!this._isSerieVisible(h,b,e);if(c!=undefined){g=c}var i=this.seriesGroups[h];var f=i.series[b];this._raiseEvent("toggle",{state:g,seriesGroup:i,serie:f,elementIndex:e});if(isNaN(e)){this._itemsToggleState[h][b]=g}else{var d=this._itemsToggleState[h][b];if(!a.isArray(d)){d=[]}while(d.length<e){d.push(true)}d[e]=g}this._isToggleRefresh=true;this.update();this._isToggleRefresh=false},showSerie:function(d,b,c){this._toggleSerie(d,b,c,true)},hideSerie:function(d,b,c){this._toggleSerie(d,b,c,false)},_setLegendToggleHandler:function(j,c,h,e){var i=this.seriesGroups[j];var f=i.series[c];var b=f.enableSeriesToggle;if(b==undefined){b=i.enableSeriesToggle!=false}if(b){var d=this;this.renderer.addHandler(e,"click",function(g){d._toggleSerie(j,c,h)})}},_renderLegend:function(c,e){var o=this;var d=[];for(var v=0;v<o.seriesGroups.length;v++){var t=o.seriesGroups[v];if(t.showLegend==false){continue}for(var q=0;q<t.series.length;q++){var m=t.series[q];if(m.showLegend==false){continue}var u=o._getSerieSettings(v,q);var p;if(t.type=="pie"||t.type=="donut"){var k=o._getXAxis(v);var h=m.legendFormatSettings||t.legendFormatSettings||k.formatSettings||m.formatSettings||t.formatSettings;var n=m.legendFormatFunction||t.legendFormatFunction||k.formatFunction||m.formatFunction||t.formatFunction;var j=o._getDataLen(v);for(var r=0;r<j;r++){p=o._getDataValue(r,m.displayText,v);p=o._formatValue(p,h,n,v,q,r);var l=o._getColors(v,q,r);d.push({groupIndex:v,seriesIndex:q,itemIndex:r,text:p,css:m.displayTextClass,fillColor:l.fillColor,lineColor:l.lineColor,opacity:u.opacity})}continue}var h=m.legendFormatSettings||t.legendFormatSettings;var n=m.legendFormatFunction||t.legendFormatFunction;p=o._formatValue(m.displayText||m.dataField||"",h,n,v,q,NaN);var l=o._getSeriesColors(v,q);var f=this._get([m.legendFillColor,m.legendColor,l.fillColor]);var b=this._get([m.legendLineColor,m.legendColor,l.lineColor]);d.push({groupIndex:v,seriesIndex:q,text:p,css:m.displayTextClass,fillColor:f,lineColor:b,opacity:u.opacity})}}return o._renderChartLegend(d,c,e,(o.legendLayout&&o.legendLayout.flow=="vertical"))},_getInterval:function(d,c){if(!d){return c}var b=this._get([d.unitInterval,c]);if(!isNaN(d.step)){b=d.step*c}return b},_getOffsets:function(u,d,n,t,r,l,g,e,k){var s=this._getInterval(r[u],e);var m=[];if(u==""||(r[u].visible&&r[u].visible!="custom")){m=this._generateIntervalValues(t,s,e,g,k)}var f;if(u!="labels"){var j=g?l.left:0;if(!g&&e>1){j=l.left*(e+1)}if(m.length==1){j*=2}f=this._valuesToOffsets(m,d,t,n,l,false,j);if(!g){var o=(l.left+l.right)*s/e;if(d.flip){f.unshift(f[0]+o)}else{f.push(f[f.length-1]+o)}}}else{var j=l.left;if(m.length==1){j*=2}f=this._valuesToOffsets(m,d,t,n,l,g,j)}var q=this._arraysToObjectsArray([m,f],["value","offset"]);if(d[u]&&d[u].custom){var h=this._objectsArraysToArray(d[u].custom,"value");var c=this._objectsArraysToArray(d[u].custom,"offset");var b=this._valuesToOffsets(h,d,t,n,l,g,l.left);for(var p=0;p<d[u].custom.length;p++){q.push({value:h[p],offset:isNaN(c[p])?b[p]:c[p]})}}return q},_renderXAxis:function(d,y,Q,c){var f=this;var r=f._getXAxis(d);var P=f.seriesGroups[d];var W=P.orientation=="horizontal";var G={width:0,height:0};var O=f._getAxisSettings(r);if(!r||!O.visible||P.type=="spider"){return G}if(!f._isGroupVisible(d)||this._isPieGroup(d)){return G}var V=f._alignValuesWithTicks(d);while(f._renderData.length<d+1){f._renderData.push({})}if(f.rtl){r.flip=true}var A=W?y.height:y.width;var w=r.text;var t=f._calculateXOffsets(d,A);var S=t.axisStats;var j=r.rangeSelector;var E=0;if(j){if(!this._moduleRangeSelector){throw"Please include 'jqxchart.rangeselector.js'"}E=this._selectorGetSize(r)}var D=(W&&r.position=="right")||(!W&&r.position=="top");if(!Q&&j){if(W){y.width-=E;if(r.position!="right"){y.x+=E}}else{y.height-=E;if(r.position=="top"){y.y+=E}}}var k={rangeLength:t.rangeLength,itemWidth:t.itemWidth,intervalWidth:t.intervalWidth,data:t,settings:O,isMirror:D,rect:y};f._renderData[d].xAxis=k;var F=S.interval;if(isNaN(F)){return G}if(W){O.title.angle-=90;O.labels.angle-=90}var m=this._getInterval(O.gridLines,F);var J=this._getInterval(O.tickMarks,F);var B=this._getInterval(O.labels,F);var K;var U=S.min;var s=S.max;var M=t.padding;var R=r.flip==true||f.rtl;var h={min:U,max:s};if(S.logAxis.enabled){h.min=S.logAxis.minPow;h.max=S.logAxis.maxPow}if(r.type=="date"){O.gridLines.offsets=this._generateDTOffsets(U,s,A,M,m,F,S.dateTimeUnit,V,NaN,false,R);O.tickMarks.offsets=this._generateDTOffsets(U,s,A,M,J,F,S.dateTimeUnit,V,NaN,false,R);K=this._generateDTOffsets(U,s,A,M,B,F,S.dateTimeUnit,V,NaN,true,R)}else{O.gridLines.offsets=this._getOffsets("gridLines",r,A,S,O,M,V,F);O.tickMarks.offsets=this._getOffsets("tickMarks",r,A,S,O,M,V,F);K=this._getOffsets("labels",r,A,S,O,M,V,F)}var n=f.renderer.getRect();var l=n.width-y.x-y.width;var p=f._getDataLen(d);var o;if(f._elementRenderInfo&&f._elementRenderInfo.length>d){o=f._elementRenderInfo[d].xAxis}var q=[];var I;if(O.labels.formatFunction){I=O.labels.formatFunction}var v;if(O.labels.formatSettings){v=a.extend({},O.labels.formatSettings)}if(r.type=="date"){if(r.dateFormat&&!I){if(v){v.dateFormat=v.dateFormat||r.dateFormat}else{v={dateFormat:r.dateFormat}}}else{if(!I&&(!v||(v&&!v.dateFormat))){I=this._getDefaultDTFormatFn(r.baseUnit||"day")}}}for(var N=0;N<K.length;N++){var L=K[N].value;var H=K[N].offset;if(isNaN(H)){continue}var T=undefined;if(r.type!="date"&&S.useIndeces&&r.dataField){T=Math.round(L);L=f._getDataValue(T,r.dataField);if(L==undefined){L=""}}var w=f._formatValue(L,v,I,d,undefined,T);if(w==undefined||w.toString()==""){if(isNaN(T)){T=N}if(T>=S.filterRange.min&&T<=S.filterRange.max){w=S.useIndeces?(S.min+T).toString():(L==undefined?"":L.toString())}}var b={key:L,text:w,targetX:H,x:H};if(o&&o.itemOffsets[L]){b.x=o.itemOffsets[L].x;b.y=o.itemOffsets[L].y}q.push(b)}var C=f._getAnimProps(d);var u=C.enabled&&q.length<500?C.duration:0;if(f.enableAxisTextAnimation==false){u=0}var z={items:q,renderData:k};var e=f._renderAxis(W,D,O,{x:y.x,y:y.y,width:y.width,height:y.height},c,F,false,true,z,Q,u);if(W){e.width+=E}else{e.height+=E}return e},_animateAxisText:function(f,h){var c=f.items;var d=f.textSettings;for(var e=0;e<c.length;e++){var g=c[e];if(!g){continue}if(!g.visible){continue}var b=g.targetX;var j=g.targetY;if(!isNaN(g.x)&&!isNaN(g.y)){b=g.x+(b-g.x)*h;j=g.y+(j-g.y)*h}if(g.element){this.renderer.removeElement(g.element);g.element=undefined}g.element=this.renderer.text(g.text,b,j,g.width,g.height,d.angle,{"class":d.style},false,d.halign,d.valign,d.textRotationPoint)}},_getPolarAxisCoords:function(f,b){var j=this.seriesGroups[f];var q=b.x+a.jqx.getNum([j.offsetX,b.width/2]);var p=b.y+a.jqx.getNum([j.offsetY,b.height/2]);var l=Math.min(b.width,b.height);var g=j.radius;if(this._isPercent(g)){g=parseFloat(g)/100*l/2}if(isNaN(g)){g=l/2*0.6}var i=this._alignValuesWithTicks(f);var o=this._get([j.startAngle,j.minAngle,0])-90;if(isNaN(o)){o=0}else{o=2*Math.PI*o/360}var n=this._get([j.endAngle,j.maxAngle,360])-90;if(isNaN(n)){n=2*Math.PI}else{n=2*Math.PI*n/360}if(o>n){var m=o;o=n;n=m}var u=a.jqx._rnd(Math.abs(o-n)/(Math.PI*2),0.001,true);var r=Math.PI*2*g*u;var h=this._calcGroupOffsets(f,b).xoffsets;if(!h){return}var k=!(Math.abs(Math.abs(n-o)-Math.PI*2)>0.00001);if(j.spider){var e=this._getXAxisStats(f,this._getXAxis(f),r);var s=e.interval;if(isNaN(s)||s==0){s=1}var d=(e.max-e.min)/s+(k?1:0);d=Math.round(d);if(d>2){var c=Math.cos(Math.abs(n-o)/2/d);c=a.jqx._rnd(c,0.01);if(c==0){c=1}var t=g/c;if(t>g&&i){g=t}}}g=a.jqx._ptrnd(g);return{x:q,y:p,r:g,adjR:this._get([t,g]),itemWidth:h.itemWidth,rangeLength:h.rangeLength,valuesOnTicks:i,startAngle:o,endAngle:n,isClosedCircle:k,axisSize:r}},_toPolarCoord:function(j,f,h,e){var c=Math.abs(j.startAngle-j.endAngle)/(Math.PI*2);var b=(h-f.x)*2*Math.PI*c/Math.max(1,f.width)+j.startAngle;var d=((f.height+f.y)-e)*j.r/Math.max(1,f.height);var i=j.x+d*Math.cos(b);var g=j.y+d*Math.sin(b);return{x:a.jqx._ptrnd(i),y:a.jqx._ptrnd(g)}},_renderSpiderAxis:function(z,k){var ao=this;var g=ao._getXAxis(z);var aA=this._getAxisSettings(g);if(!g||!aA.visible){return}var W=ao.seriesGroups[z];var R=ao._getPolarAxisCoords(z,k);if(!R){return}var L=a.jqx._ptrnd(R.x);var K=a.jqx._ptrnd(R.y);var t=R.adjR;var X=R.startAngle;var V=R.endAngle;if(t<1){return}var av=a.jqx._rnd(Math.abs(X-V)/(Math.PI*2),0.001,true);var h=Math.PI*2*t*av;var c=R.isClosedCircle;var w=this._renderData[z].xoffsets;if(!w.rangeLength){return}var S=w.axisStats.interval;if(isNaN(S)||S<1){S=1}var ar=W.orientation=="horizontal";var Z=(ar&&g.position=="right")||(!ar&&g.position=="top");while(ao._renderData.length<z+1){ao._renderData.push({})}var at={rangeLength:w.rangeLength,itemWidth:w.itemWidth,data:w,rect:k,settings:aA};ao._renderData[z].xAxis=at;ao._renderData[z].polarCoords=R;var ay=true;for(var Q=0;Q<z;Q++){var A=ao._renderData[Q].xAxis;var b=ao._renderData[Q].polarCoords;var D=ao._getXAxis(Q);var U=false;for(var O in R){if(R[O]!=b[O]){U=true;break}}if(!U||D!=g){ay=false}}var e=aA.gridLines;var T=aA.tickMarks;var y=aA.labels;var ac=this._getInterval(e,S);var aD=this._getInterval(T,S);var am=this._getInterval(y,S);var G=ao._alignValuesWithTicks(z);var ad=ao.renderer;var ah;var ae=w.axisStats;var aC=ae.min;var r=ae.max;var u=this._getPaddingSize(w.axisStats,g,G,h,true,c,false);var ai=g.flip==true||ao.rtl;if(g.type=="date"){e.offsets=this._generateDTOffsets(aC,r,h,u,ac,S,g.baseUnit,true,0,false,ai);T.offsets=this._generateDTOffsets(aC,r,h,u,aD,S,g.baseUnit,true,0,false,ai);ah=this._generateDTOffsets(aC,r,h,u,am,S,g.baseUnit,true,0,true,ai)}else{aA.gridLines.offsets=this._getOffsets("gridLines",g,h,ae,aA,u,true,S);aA.tickMarks.offsets=this._getOffsets("tickMarks",g,h,ae,aA,u,true,S);ah=this._getOffsets("labels",g,h,ae,aA,u,true,S)}var aj=ao.renderer.getRect();var aw=aj.width-k.x-k.width;var ag=ao._getDataLen(z);var s;if(ao._elementRenderInfo&&ao._elementRenderInfo.length>z){s=ao._elementRenderInfo[z].xAxis}var aq=[];var af=this._getDataLen(z);for(var Q=0;Q<ah.length;Q++){var F=ah[Q].offset;var H=ah[Q].value;if(g.type!="date"&&ae.useIndeces&&g.dataField){var ax=Math.round(H);if(ax>=af){continue}H=ao._getDataValue(ax,g.dataField);if(H==undefined){H=""}}var ap=ao._formatValue(H,y.formatSettings,y.formatFunction,z,undefined,ax);if(ap==undefined||ap.toString()==""){ap=ae.useIndeces?(ae.min+Q).toString():(H==undefined?"":H.toString())}var d={key:H,text:ap,targetX:F,x:F};if(s&&s.itemOffsets[H]){d.x=s.itemOffsets[H].x;d.y=s.itemOffsets[H].y}aq.push(d)}var az={items:aq,renderData:at};var l={stroke:e.color,fill:"none","stroke-width":e.width,"stroke-dasharray":e.dashStyle||""};if(!W.spider){if(av==1){ad.circle(L,K,t,l)}else{var E=-X/Math.PI*180;var aE=-V/Math.PI*180;this.renderer.pieslice(L,K,0,t,Math.min(E,aE),Math.max(E,aE),undefined,l)}}var M=aq.length;var m=2*Math.PI/(M);var al=X;var f,C;if(e.visible&&ay){if(!G&&!c){e.offsets.unshift({offset:-u.right})}for(var Q=0;Q<e.offsets.length;Q++){var n=e.offsets[Q].offset;if(!G){if(c){n+=u.right/2}else{n+=u.right}}var B=al+n*2*Math.PI*av/Math.max(1,h);if(B-V>0.01){continue}var q=a.jqx._ptrnd(L+t*Math.cos(B));var p=a.jqx._ptrnd(K+t*Math.sin(B));ad.line(L,K,q,p,l)}}if(T.visible&&ay){var P=5;var o={stroke:T.color,fill:"none","stroke-width":T.width,"stroke-dasharray":T.dashStyle||""};if(!G&&!c){T.offsets.unshift({offset:-u.right})}for(var Q=0;Q<T.offsets.length;Q++){var n=T.offsets[Q].offset;if(!G){if(c){n+=u.right/2}else{n+=u.right}}var B=al+n*2*Math.PI*av/Math.max(1,h);if(B-V>0.01){continue}var ab={x:L+t*Math.cos(B),y:K+t*Math.sin(B)};var aa={x:L+(t+P)*Math.cos(B),y:K+(t+P)*Math.sin(B)};ad.line(a.jqx._ptrnd(ab.x),a.jqx._ptrnd(ab.y),a.jqx._ptrnd(aa.x),a.jqx._ptrnd(aa.y),o)}}var an=[];if(W.spider){var v=[];if(g.type=="date"){v=this._generateDTOffsets(aC,r,h,u,S,S,g.baseUnit,true,0,false,ai)}else{v=this._getOffsets("",g,h,ae,aA,u,true,S)}if(!G&&!c){v.unshift({offset:-u.right})}for(var Q=0;Q<v.length;Q++){var n=v[Q].offset;if(!G){if(c){n+=u.right/2}else{n+=u.right}}var B=al+n*2*Math.PI*av/Math.max(1,h);if(B-V>0.01){continue}an.push(B)}at.offsetAngles=an}var Y=ao._renderSpiderValueAxis(z,k,(G?R.adjR:R.r),an);if(!Y){Y=[]}if(W.spider){if(!G){for(var Q=0;Q<Y.length;Q++){Y[Q]=Y[Q]*R.adjR/R.r}}Y.push(t);this._renderSpiderLines(L,K,Y,R,an,l)}if(ay&&y.visible){at.polarLabels=[];for(var Q=0;Q<aq.length;Q++){var n=aq[Q].x;var B=al+n*2*Math.PI*av/Math.max(1,h);B=(360-B/(2*Math.PI)*360)%360;if(B<0){B=360+B}var ak=ad.measureText(aq[Q].text,0,{"class":aA.labels.style});var N=(G?R.adjR:R.r)+(T.visible?7:2);var au=aA.labels;var aB;if(au.autoRotate){var J=a.jqx._ptRotate(L-ak.width/2,K-N-ak.height,L,K,-B/180*Math.PI);var I=a.jqx._ptRotate(L+ak.width/2,K-N,L,K,-B/180*Math.PI);ak.width=Math.abs(J.x-I.x);ak.height=Math.abs(J.y-I.y);aB={x:Math.min(J.x,I.x),y:Math.min(J.y,I.y)}}else{aB=this._adjustTextBoxPosition(L,K,ak,N,B,false,false,false)}at.polarLabels.push({x:aB.x,y:aB.y,value:aq[Q].text});ad.text(aq[Q].text,aB.x,aB.y,ak.width,ak.height,au.autoRotate?90-B:au.angle,{"class":au.style},false,au.halign,au.valign)}}},_renderSpiderLines:function(h,f,u,m,e,b){var p=this.renderer;var q=m.startAngle;var o=m.endAngle;var g=m.isClosedCircle;for(var r=0;r<u.length;r++){var d=u[r];var c=undefined,n=undefined;for(var s=0;s<e.length;s++){var t=e[s];var l=a.jqx._ptrnd(h+d*Math.cos(t));var k=a.jqx._ptrnd(f+d*Math.sin(t));if(c){p.line(c.x,c.y,l,k,b)}c={x:l,y:k};if(!n){n={x:l,y:k}}}if(n&&g){p.line(c.x,c.y,n.x,n.y,b)}}},_renderSpiderValueAxis:function(e,F,V,U){var k=this;var w=this.seriesGroups[e];var G=this._getPolarAxisCoords(e,F);if(!G){return}var R=a.jqx._ptrnd(G.x);var Q=a.jqx._ptrnd(G.y);V=V||G.r;var h=G.startAngle;var ac=G.endAngle;var Z=a.jqx._rnd(Math.abs(h-ac)/(Math.PI*2),0.001,true);if(V<1){return}V=a.jqx._ptrnd(V);var g=this._getValueAxis(e);var ab=this._getAxisSettings(g);if(!g||false==ab.visible){return}var N=this._stats.seriesGroups[e].mu;var C=ab.labels;var B=C.formatSettings;var c=w.type.indexOf("stacked")!=-1&&w.type.indexOf("100")!=-1;if(c&&!B){B={sufix:"%"}}var z=this._get([C.step,C.unitInterval/N]);if(isNaN(z)){z=1}z=Math.max(1,Math.round(z));this._calcValueAxisItems(e,V,z);var d=ab.gridLines;var D=ab.tickMarks;var s=this._getInterval(d,N);var S=this._getInterval(D,N);var n=ab.labels;var m={stroke:d.color,fill:"none","stroke-width":1,"stroke-dasharray":d.dashStyle||""};var q=this._renderData[e].valueAxis;var A=q.items;var v=h;if(A.length&&ab.line.visible){if(!isNaN(ab.line.angle)){v=2*Math.PI*ab.line.angle/360}var p=R+Math.cos(v)*V;var af=Q+Math.sin(v)*V;if(U.indexOf(v)==-1){var X=a.extend({},m);X["stroke-width"]=ab.line.lineWidth;X.stroke=ab.line.color;X["stroke-dasharray"]=ab.line.dashStyle;this.renderer.line(R,Q,p,af,X)}}A=A.reverse();var K=this.renderer;q.polarLabels=[];for(var aa=0;aa<A.length-1;aa++){var T=A[aa];if(isNaN(T)){continue}var E=(n.formatFunction)?n.formatFunction(T):this._formatNumber(T,B);var f=K.measureText(E,0,{"class":n.style});var P=R+(g.showTickMarks!=false?3:2);var O=Q-q.itemWidth*aa-f.height/2;var J=a.jqx._ptRotate(P,O,R,Q,v);var I=a.jqx._ptRotate(P+f.width,O+f.height,R,Q,v);P=Math.min(J.x,I.x);O=Math.min(J.y,I.y);f.width=Math.abs(J.x-I.x);f.height=Math.abs(J.y-I.y);P+=ab.labels.textOffset.x;O+=ab.labels.textOffset.y;q.polarLabels.push({x:P,y:O,value:E});K.text(E,P,O,f.width,f.height,n.autoRotate?(90+h*180/Math.PI):n.angle,{"class":n.style},false,n.halign,n.valign)}var r=g.logarithmicScale==true;var u=r?A.length:q.rangeLength;var l=2*Math.PI/u;var ae=g.valuesOnTicks!=false