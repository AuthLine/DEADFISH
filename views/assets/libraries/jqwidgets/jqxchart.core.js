/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxChart","",{});a.extend(a.jqx._jqxChart.prototype,{defineInstance:function(){a.extend(true,this,this._defaultSettings);this._createColorsCache();return this._defaultSettings},_defaultSettings:{title:"Title",description:"Description",source:[],seriesGroups:[],categoryAxis:null,xAxis:{},valueAxis:null,renderEngine:"",enableAnimations:true,enableAxisTextAnimation:false,backgroundImage:"",background:"#FFFFFF",padding:{left:5,top:5,right:5,bottom:5},backgroundColor:"#FFFFFF",showBorderLine:true,borderLineWidth:1,borderLineColor:null,borderColor:null,titlePadding:{left:5,top:5,right:5,bottom:10},showLegend:true,legendLayout:null,enabled:true,colorScheme:"scheme01",animationDuration:500,showToolTips:true,showToolTipsOnAllSeries:false,toolTipShowDelay:300,toolTipDelay:500,toolTipHideDelay:4000,toolTipMoveDuration:300,toolTipFormatFunction:null,toolTipAlignment:"dataPoint",localization:null,columnSeriesOverlap:false,rtl:false,legendPosition:null,greyScale:false,axisPadding:5,enableCrosshairs:false,crosshairsColor:"#BCBCBC",crosshairsDashStyle:"2,2",crosshairsLineWidth:1,enableEvents:true,_itemsToggleState:[],_isToggleRefresh:false,_isSelectorRefresh:false,_sliders:[],_selectorRange:[],_rangeSelectorInstances:{},_resizeState:{},renderer:null,_isRangeSelectorInstance:false,drawBefore:null,draw:null,_renderData:{},enableSampling:true},_defaultLineColor:"#BCBCBC",_touchEvents:{mousedown:a.jqx.mobile.getTouchEventName("touchstart"),click:a.jqx.mobile.getTouchEventName("touchstart"),mouseup:a.jqx.mobile.getTouchEventName("touchend"),mousemove:a.jqx.mobile.getTouchEventName("touchmove"),mouseenter:"mouseenter",mouseleave:"mouseleave"},_getEvent:function(b){if(this._isTouchDevice){return this._touchEvents[b]}else{return b}},destroy:function(){this.host.remove()},_jqxPlot:null,createInstance:function(d){if(!a.jqx.dataAdapter){throw"jqxdata.js is not loaded"}var c=this;c._refreshOnDownloadComlete();c._isTouchDevice=a.jqx.mobile.isTouchDevice();if(!c._jqxPlot){c._jqxPlot=new jqxPlot()}c.addHandler(c.host,c._getEvent("mousemove"),function(g){if(c.enabled==false){return}if(!c._isRangeSelectorInstance){c.host.css("cursor","default")}var f=g.pageX||g.clientX||g.screenX;var j=g.pageY||g.clientY||g.screenY;var i=c.host.offset();if(c._isTouchDevice){var h=a.jqx.position(g);f=h.left;j=h.top}f-=i.left;j-=i.top;c.onmousemove(f,j)});c.addHandler(c.host,c._getEvent("mouseleave"),function(h){if(c.enabled==false){return}var f=c._mouseX;var i=c._mouseY;var g=c._plotRect;if(g&&f>=g.x&&f<=g.x+g.width&&i>=g.y&&i<=g.y+g.height){return}c._cancelTooltipTimer();c._hideToolTip(0);c._unselect()});c.addHandler(c.host,"click",function(g){if(c.enabled==false){return}var f=g.pageX||g.clientX||g.screenX;var j=g.pageY||g.clientY||g.screenY;var i=c.host.offset();if(c._isTouchDevice){var h=a.jqx.position(g);f=h.left;j=h.top}f-=i.left;j-=i.top;c._mouseX=f;c._mouseY=j;if(!isNaN(c._lastClickTs)){if((new Date()).valueOf()-c._lastClickTs<100){return}}this._hostClickTimer=setTimeout(function(){if(!c._isTouchDevice){c._cancelTooltipTimer();c._hideToolTip();c._unselect()}if(c._pointMarker&&c._pointMarker.element){var l=c.seriesGroups[c._pointMarker.gidx];var k=l.series[c._pointMarker.sidx];g.stopImmediatePropagation();c._raiseItemEvent("click",l,k,c._pointMarker.iidx)}},100)});var e=c.element.style;if(e){var b=false;if(e.width!=null){b|=e.width.toString().indexOf("%")!=-1}if(e.height!=null){b|=e.height.toString().indexOf("%")!=-1}if(b){a.jqx.utilities.resize(this.host,function(){if(c.timer){clearTimeout(c.timer)}var f=1;c.timer=setTimeout(function(){var g=c.enableAnimations;c.enableAnimations=false;c.refresh();c.enableAnimations=g},f)},false,true)}}},_refreshOnDownloadComlete:function(){var d=this;var e=this.source;if(e instanceof a.jqx.dataAdapter){var f=e._options;if(f==undefined||(f!=undefined&&!f.autoBind)){e.autoSync=false;e.dataBind()}var c=this.element.id;if(e.records.length==0){var b=function(){if(d.ready){d.ready()}d.refresh()};e.unbindDownloadComplete(c);e.bindDownloadComplete(c,b)}else{if(d.ready){d.ready()}}e.unbindBindingUpdate(c);e.bindBindingUpdate(c,function(){if(d._supressBindingRefresh){return}d.refresh()})}},propertyChangedHandler:function(b,c,e,d){if(this.isInitialized==undefined||this.isInitialized==false){return}if(c=="source"){this._refreshOnDownloadComlete()}this.refresh()},_initRenderer:function(b){if(!a.jqx.createRenderer){throw"Please include jqxdraw.js"}return a.jqx.createRenderer(this,b)},_internalRefresh:function(){var b=this;if(a.jqx.isHidden(b.host)){return}b._stopAnimations();if(!b.renderer||(!b._isToggleRefresh&&!b._isUpdate)){b._hideToolTip(0);b._isVML=false;b.host.empty();b._measureDiv=undefined;b._initRenderer(b.host)}var d=b.renderer;if(!d){return}var c=d.getRect();b._render({x:1,y:1,width:c.width,height:c.height});this._raiseEvent("refreshBegin",{instance:this});if(d instanceof a.jqx.HTML5Renderer){d.refresh()}b._isUpdate=false;this._raiseEvent("refreshEnd",{instance:this})},saveAsPNG:function(d,b,c){return this._saveAsImage("png",d,b,c)},saveAsJPEG:function(d,b,c){return this._saveAsImage("jpeg",d,b,c)},saveAsPDF:function(d,b,c){return this._saveAsImage("pdf",d,b,c)},_saveAsImage:function(e,h,b,c){var g=false;for(var d=0;d<this.seriesGroups.length&&!g;d++){var f=this._getXAxis(d);if(f&&f.rangeSelector){g=true}}return a.jqx._widgetToImage(this,e,h,b,c,g?this._selectorSaveAsImageCallback:undefined)},_selectorSaveAsImageCallback:function(B,h){var r=B;for(var z=0;z<r.seriesGroups.length;z++){var o=r._getXAxis(z);if(!o||!o.rangeSelector||o.rangeSelector.renderTo){continue}var m=r._rangeSelectorInstances[z];if(!m){continue}var s=m.jqxChart("getInstance");var e=s.renderEngine;var d=s.renderer.getRect();var f=s.renderer.getContainer().find("canvas")[0];var p=f.getContext("2d");var w=r._sliders[z];var b=r.seriesGroups[z].orientation=="horizontal";var c=!b?"width":"height";var v=b?"width":"height";var y=!b?"x":"y";var g=b?"x":"y";var k={};k[y]=w.startOffset+w.rect[y];k[g]=w.rect[g];k[c]=w.endOffset-w.startOffset;k[v]=w.rect[v];var n=o.rangeSelector.colorSelectedRange||"blue";var u=o.rangeSelector.colorUnselectedRange||"white";var l=o.rangeSelector.colorRangeLine||"grey";var q=[];q.push(s.renderer.rect(k.x,k.y,k.width,k.height,{fill:n,opacity:0.1}));if(!b){q.push(s.renderer.line(a.jqx._ptrnd(w.rect.x),a.jqx._ptrnd(w.rect.y),a.jqx._ptrnd(k.x),a.jqx._ptrnd(w.rect.y),{stroke:l,opacity:0.5}));q.push(s.renderer.line(a.jqx._ptrnd(k.x+k.width),a.jqx._ptrnd(w.rect.y),a.jqx._ptrnd(w.rect.x+w.rect.width),a.jqx._ptrnd(w.rect.y),{stroke:l,opacity:0.5}));q.push(s.renderer.line(a.jqx._ptrnd(k.x),a.jqx._ptrnd(w.rect.y),a.jqx._ptrnd(k.x),a.jqx._ptrnd(w.rect.y+w.rect.height),{stroke:l,opacity:0.5}));q.push(s.renderer.line(a.jqx._ptrnd(k.x+k.width),a.jqx._ptrnd(w.rect.y),a.jqx._ptrnd(k.x+k.width),a.jqx._ptrnd(w.rect.y+w.rect.height),{stroke:l,opacity:0.5}))}else{q.push(s.renderer.line(a.jqx._ptrnd(w.rect.x+w.rect.width),a.jqx._ptrnd(w.rect.y),a.jqx._ptrnd(w.rect.x+w.rect.width),a.jqx._ptrnd(k.y),{stroke:l,opacity:0.5}));q.push(s.renderer.line(a.jqx._ptrnd(w.rect.x+w.rect.width),a.jqx._ptrnd(k.y+k.height),a.jqx._ptrnd(w.rect.x+w.rect.width),a.jqx._ptrnd(w.rect.y+w.rect.height),{stroke:l,opacity:0.5}));q.push(s.renderer.line(a.jqx._ptrnd(w.rect.x),a.jqx._ptrnd(k.y),a.jqx._ptrnd(w.rect.x+w.rect.width),a.jqx._ptrnd(k.y),{stroke:l,opacity:0.5}));q.push(s.renderer.line(a.jqx._ptrnd(w.rect.x),a.jqx._ptrnd(k.y+k.height),a.jqx._ptrnd(w.rect.x+w.rect.width),a.jqx._ptrnd(k.y+k.height),{stroke:l,opacity:0.5}))}s.renderer.refresh();var t=p.getImageData(d.x,d.y,d.width,d.height);var A=h.getContext("2d");A.putImageData(t,parseInt(m.css("left")),parseInt(m.css("top")),1,1,d.width,d.height);for(var x=0;x<q.length;x++){s.renderer.removeElement(q[x])}s.renderer.refresh()}return true},refresh:function(){this._internalRefresh()},update:function(){this._isUpdate=true;this._internalRefresh()},_seriesTypes:["line","stackedline","stackedline100","spline","stackedspline","stackedspline100","stepline","stackedstepline","stackedstepline100","area","stackedarea","stackedarea100","splinearea","stackedsplinearea","stackedsplinearea100","steparea","stackedsteparea","stackedsteparea100","rangearea","splinerangearea","steprangearea","column","stackedcolumn","stackedcolumn100","rangecolumn","scatter","stackedscatter","stackedscatter100","bubble","stackedbubble","stackedbubble100","pie","donut","candlestick","ohlc","waterfall","stackedwaterfall"],clear:function(){var b=this;for(var c in b._defaultSettings){b[c]=b._defaultSettings[c]}b.title="";b.description="";b.refresh()},_validateSeriesGroups:function(){if(!a.isArray(this.seriesGroups)){throw"Invalid property: 'seriesGroups' property is required and must be a valid array."}for(var b=0;b<this.seriesGroups.length;b++){var c=this.seriesGroups[b];if(!c.type){throw"Invalid property: Each series group must have a valid 'type' property."}if(!a.isArray(c.series)){throw"Invalid property: Each series group must have a 'series' property which must be a valid array."}}},_render:function(C){var m=this;var I=m.renderer;m._validateSeriesGroups();m._colorsCache.clear();if(!m._isToggleRefresh&&m._isUpdate&&m._renderData){m._renderDataClone()}m._renderData=[];I.clear();m._unselect();m._hideToolTip(0);var n=m.backgroundImage;if(n==undefined||n==""){m.host.css({"background-image":""})}else{m.host.css({"background-image":(n.indexOf("(")!=-1?n:"url('"+n+"')")})}m._rect=C;var Y=m.padding||{left:5,top:5,right:5,bottom:5};var q=I.createClipRect(C);var L=I.beginGroup();I.setClip(L,q);var ai=I.rect(C.x,C.y,C.width-2,C.height-2);if(n==undefined||n==""){I.attr(ai,{fill:m.backgroundColor||m.background||"white"})}else{I.attr(ai,{fill:"transparent"})}if(m.showBorderLine!=false){var F=m.borderLineColor==undefined?m.borderColor:m.borderLineColor;if(F==undefined){F=m._defaultLineColor}var o=this.borderLineWidth;if(isNaN(o)||o<0||o>10){o=1}I.attr(ai,{"stroke-width":o,stroke:F})}else{if(a.jqx.browser.msie&&a.jqx.browser.version<9){I.attr(ai,{"stroke-width":1,stroke:m.backgroundColor||"white"})}}if(a.isFunction(m.drawBefore)){m.drawBefore(I,C)}var V={x:Y.left,y:Y.top,width:C.width-Y.left-Y.right,height:C.height-Y.top-Y.bottom};m._paddedRect=V;var e=m.titlePadding||{left:2,top:2,right:2,bottom:2};var l;if(m.title&&m.title.length>0){var S=m.toThemeProperty("jqx-chart-title-text",null);l=I.measureText(m.title,0,{"class":S});I.text(m.title,V.x+e.left,V.y+e.top,V.width-(e.left+e.right),l.height,0,{"class":S},true,"center","center");V.y+=l.height;V.height-=l.height}if(m.description&&m.description.length>0){var T=m.toThemeProperty("jqx-chart-title-description",null);l=I.measureText(m.description,0,{"class":T});I.text(m.description,V.x+e.left,V.y+e.top,V.width-(e.left+e.right),l.height,0,{"class":T},true,"center","center");V.y+=l.height;V.height-=l.height}if(m.title||m.description){V.y+=(e.bottom+e.top);V.height-=(e.bottom+e.top)}var b={x:V.x,y:V.y,width:V.width,height:V.height};m._plotRect=b;m._buildStats(b);var H=m._isPieOnlySeries();var s=m.seriesGroups;var E;var D={xAxis:{},valueAxis:{}};for(var Z=0;Z<s.length&&!H;Z++){if(s[Z].type=="pie"||s[Z].type=="donut"){continue}var z=m._getXAxis(Z);if(!z){throw"seriesGroup["+Z+"] is missing xAxis definition"}var ae=z==m._getXAxis()?-1:Z;D.xAxis[ae]=0}var U=m.axisPadding;if(isNaN(U)){U=5}var r={left:0,right:0,leftCount:0,rightCount:0};var p=[];for(Z=0;Z<s.length;Z++){var ad=s[Z];if(ad.type=="pie"||ad.type=="donut"||ad.spider==true||ad.polar==true){p.push({width:0,position:0,xRel:0});continue}E=ad.orientation=="horizontal";var z=m._getXAxis(Z);var ae=z==m._getXAxis()?-1:Z;var k=m._getValueAxis(Z);var O=k==m._getValueAxis()?-1:Z;var R=!E?k.axisSize:z.axisSize;var f={x:0,y:b.y,width:b.width,height:b.height};var Q=E?m._getXAxis(Z).position:k.position;if(!R||R=="auto"){if(E){R=this._renderXAxis(Z,f,true,b).width;if((D.xAxis[ae]&1)==1){R=0}else{if(R>0){D.xAxis[ae]|=1}}}else{R=m._renderValueAxis(Z,f,true,b).width;if((D.valueAxis[O]&1)==1){R=0}else{if(R>0){D.valueAxis[O]|=1}}}}if(Q!="left"&&m.rtl==true){Q="right"}if(Q!="right"){Q="left"}if(r[Q+"Count"]>0&&r[Q]>0&&R>0){r[Q]+=U}p.push({width:R,position:Q,xRel:r[Q]});r[Q]+=R;r[Q+"Count"]++}var u=Math.max(1,Math.max(C.width,C.height));var ac={top:0,bottom:0,topCount:0,bottomCount:0};var W=[];for(Z=0;Z<s.length;Z++){var ad=s[Z];if(ad.type=="pie"||ad.type=="donut"||ad.spider==true||ad.polar==true){W.push({height:0,position:0,yRel:0});continue}E=ad.orientation=="horizontal";var k=this._getValueAxis(Z);var O=k==m._getValueAxis()?-1:Z;var z=m._getXAxis(Z);var ae=z==m._getXAxis()?-1:Z;var ab=!E?z.axisSize:k.axisSize;var Q=E?k.position:z.position;if(!ab||ab=="auto"){if(E){ab=m._renderValueAxis(Z,{x:0,y:0,width:u,height:0},true,b).height;if((D.valueAxis[O]&2)==2){ab=0}else{if(ab>0){D.valueAxis[O]|=2}}}else{ab=m._renderXAxis(Z,{x:0,y:0,width:u,height:0},true).height;if((D.xAxis[ae]&2)==2){ab=0}else{if(ab>0){D.xAxis[ae]|=2}}}}if(Q!="top"){Q="bottom"}if(ac[Q+"Count"]>0&&ac[Q]>0&&ab>0){ac[Q]+=U}W.push({height:ab,position:Q,yRel:ac[Q]});ac[Q]+=ab;ac[Q+"Count"]++}m._createAnimationGroup("series");var t=(m.showLegend!=false);var B=!t?{width:0,height:0}:m._renderLegend(m.legendLayout?m._rect:V,true);if(this.legendLayout&&(!isNaN(this.legendLayout.left)||!isNaN(this.legendLayout.top))){B={width:0,height:0}}if(V.height<ac.top+ac.bottom+B.height||V.width<r.left+r.right){I.endGroup();return}b.height-=ac.top+ac.bottom+B.height;b.x+=r.left;b.width-=r.left+r.right;b.y+=ac.top;var G=[];if(!H){var af=m._getXAxis().tickMarksColor||m._defaultLineColor;for(Z=0;Z<s.length;Z++){var ad=s[Z];if(ad.polar==true||ad.spider==true||ad.type=="pie"||ad.type=="donut"){continue}E=ad.orientation=="horizontal";var ae=m._getXAxis(Z)==m._getXAxis()?-1:Z;var O=m._getValueAxis(Z)==m._getValueAxis()?-1:Z;var f={x:b.x,y:0,width:b.width,height:W[Z].height};if(W[Z].position!="top"){f.y=b.y+b.height+W[Z].yRel}else{f.y=b.y-W[Z].yRel-W[Z].height}if(E){if((D.valueAxis[O]&4)==4){continue}if(!m._isGroupVisible(Z)){continue}m._renderValueAxis(Z,f,false,b);D.valueAxis[O]|=4}else{G.push(f);if((D.xAxis[ae]&4)==4){continue}if(!m._isGroupVisible(Z)){continue}m._renderXAxis(Z,f,false,b);D.xAxis[ae]|=4}}}if(t){var A=m.legendLayout?m._rect:V;var P=V.x+a.jqx._ptrnd((V.width-B.width)/2);var N=b.y+b.height+ac.bottom;var R=V.width;var ab=B.height;if(m.legendLayout){if(!isNaN(m.legendLayout.left)){P=m.legendLayout.left}if(!isNaN(m.legendLayout.top)){N=m.legendLayout.top}if(!isNaN(m.legendLayout.width)){R=m.legendLayout.width}if(!isNaN(m.legendLayout.height)){ab=m.legendLayout.height}}if(P+R>A.x+A.width){R=A.x+A.width-P}if(N+ab>A.y+A.height){ab=A.y+A.height-N}m._renderLegend({x:P,y:N,width:R,height:ab})}m._hasHorizontalLines=false;if(!H){for(Z=0;Z<s.length;Z++){var ad=s[Z];if(ad.polar==true||ad.spider==true||ad.type=="pie"||ad.type=="donut"){continue}E=s[Z].orientation=="horizontal";var f={x:b.x-p[Z].xRel-p[Z].width,y:b.y,width:p[Z].width,height:b.height};if(p[Z].position!="left"){f.x=b.x+b.width+p[Z].xRel}var ae=m._getXAxis(Z)==m._getXAxis()?-1:Z;var O=m._getValueAxis(Z)==m._getValueAxis()?-1:Z;if(E){G.push(f);if((D.xAxis[ae]&8)==8){continue}if(!m._isGroupVisible(Z)){continue}m._renderXAxis(Z,f,false,b);D.xAxis[ae]|=8}else{if((D.valueAxis[O]&8)==8){continue}if(!m._isGroupVisible(Z)){continue}m._renderValueAxis(Z,f,false,b);D.valueAxis[O]|=8}}}if(b.width<=0||b.height<=0){return}m._plotRect={x:b.x,y:b.y,width:b.width,height:b.height};for(Z=0;Z<s.length;Z++){this._drawPlotAreaLines(Z,true,{gridLines:false,tickMarks:false,alternatingBackground:true});this._drawPlotAreaLines(Z,false,{gridLines:false,tickMarks:false,alternatingBackground:true})}for(Z=0;Z<s.length;Z++){this._drawPlotAreaLines(Z,true,{gridLines:true,tickMarks:true,alternatingBackground:false});this._drawPlotAreaLines(Z,false,{gridLines:true,tickMarks:true,alternatingBackground:false})}var K=false;for(Z=0;Z<s.length&&!K;Z++){var ad=s[Z];if(ad.annotations!==undefined||a.isFunction(ad.draw)||a.isFunction(ad.drawBefore)){K=true;break}}var M=I.beginGroup();if(!K){var J=I.createClipRect({x:b.x-2,y:b.y,width:b.width+4,height:b.height});I.setClip(M,J)}for(Z=0;Z<s.length;Z++){var ad=s[Z];var c=false;for(var ag in m._seriesTypes){if(m._seriesTypes[ag]==ad.type){c=true;break}}if(!c){throw'Invalid serie type "'+ad.type+'"'}if(a.isFunction(ad.drawBefore)){ad.drawBefore(I,C,Z,this)}if(ad.polar==true||ad.spider==true){if(ad.type.indexOf("pie")==-1&&ad.type.indexOf("donut")==-1){m._renderSpiderAxis(Z,b)}}m._renderAxisBands(Z,b,true);m._renderAxisBands(Z,b,false)}for(Z=0;Z<s.length;Z++){var ad=s[Z];if(m._isColumnType(ad.type)){m._renderColumnSeries(Z,b)}else{if(ad.type.indexOf("pie")!=-1||ad.type.indexOf("donut")!=-1){m._renderPieSeries(Z,b)}else{if(ad.type.indexOf("line")!=-1||ad.type.indexOf("area")!=-1){m._renderLineSeries(Z,b)}else{if(ad.type.indexOf("scatter")!=-1||ad.type.indexOf("bubble")!=-1){m._renderScatterSeries(Z,b)}else{if(ad.type.indexOf("candlestick")!=-1||ad.type.indexOf("ohlc")!=-1){m._renderCandleStickSeries(Z,b,ad.type.indexOf("ohlc")!=-1)}}}}}if(ad.annotations){if(!this._moduleAnnotations){throw"Please include 'jqxchart.annotations.js'"}for(var X=0;X<ad.annotations.length;X++){m._renderAnnotation(Z,ad.annotations[X],b)}}if(a.isFunction(ad.draw)){m.draw(I,C,Z,this)}}I.endGroup();if(m.enabled==false){var aa=I.rect(C.x,C.y,C.width,C.height);I.attr(aa,{fill:"#777777",opacity:0.5,stroke:"#00FFFFFF"})}if(a.isFunction(m.draw)){m.draw(I,C)}I.endGroup();m._startAnimation("series");if(m._credits){m._credits()}var ah=false;for(var Z=0;Z<m.seriesGroups.length&&!ah;Z++){var z=m._getXAxis(Z);if(z&&z.rangeSelector){ah=true}}if(ah){if(!this._moduleRangeSelector){throw"Please include 'jqxchart.rangeselector.js'"}var d=[];if(!this._isSelectorRefresh){m.removeHandler(a(document),m._getEvent("mousemove"),m._onSliderMouseMove);m.removeHandler(a(document),m._getEvent("mousedown"),m._onSliderMouseDown);m.removeHandler(a(document),m._getEvent("mouseup"),m._onSliderMouseUp)}if(!m._isSelectorRefresh){m._rangeSelectorInstances={}}for(Z=0;Z<m.seriesGroups.length;Z++){var v=this._getXAxis(Z);if(d.indexOf(v)==-1){if(this._renderXAxisRangeSelector(Z,G[Z])){d.push(v)}}}}},_credits:function(){if(a.jqx.credits!=="75CE8878-FCD1-4EC7-9249-BA0F153A5DE8"){var c=this;var d=String.fromCharCode(119,119,119,46,106,113,119,105,100,103,101,116,115,46,99,111,109);if(!c._isRangeSelectorInstance&&location.hostname.indexOf(d.substring(4))==-1){var g=c.renderer;var f=c._rect;var h={"class":c.toThemeProperty("jqx-chart-legend-text",null),opacity:0.5};var e=g.measureText(d,0,h);var b=g.text(d,f.x+f.width-e.width-5,f.y+f.height-e.height-5,e.width,e.height,0,h);a(b).on("click",function(){location.href="http://"+d+"/?ref="+c.widgetName})}}},_isPieOnlySeries:function(){var c=this.seriesGroups;if(c.length==0){return false}for(var b=0;b<c.length;b++){if(c[b].type!="pie"&&c[b].type!="donut"){return false}}return true},_renderChartLegend:function(V,C,S,v){var l=this;var D=l.renderer;var I={x:C.x,y:C.y,width:C.width,height:C.height};var N=3;if(I.width>=2*N){I.x+=N;I.width-=2*N}if(I.height>=2*N){I.y+=N;I.height-=2*N}var E={width:I.width,height:0};var G=0,F=0;var p=20;var m=0;var f=10;var Q=10;var w=0;for(var P=0;P<V.length;P++){var J=V[P].css;if(!J){J=l.toThemeProperty("jqx-chart-legend-text",null)}p=20;var A=V[P].text;var j=D.measureText(A,0,{"class":J});if(j.height>p){p=j.height}if(j.width>w){w=j.width}if(v){if(P!=0){F+=p}if(F>I.height){F=0;G+=w+2*Q+f;w=j.width;E.width=G+w}}else{if(G!=0){G+=Q}if(G+2*f+j.width>I.width&&j.width<I.width){G=0;F+=p;p=20;m=I.width;E.height=F+p}}var K=false;if(j.width>I.width){K=true;var s=I.width;var T=A;var X=T.split(/\s+/);var o=[];var q="";for(var M=0;M<X.length;M++){var k=q+((q.length>0)?" ":"")+X[M];var B=l.renderer.measureText(k,0,{"class":J});if(B.width>s&&k.length>0&&q.length>0){o.push({text:q});q=X[M]}else{q=k}if(M+1==X.length){o.push({text:q})}}j.width=0;var c=0;for(var H=0;H<o.length;H++){var W=o[H].text;var B=l.renderer.measureText(W,0,{"class":J});j.width=Math.max(j.width,B.width);c+=j.height}j.height=c}var z=(G+j.width<I.width)&&(F+j.height<C.height);if(l.legendLayout){var z=I.x+G+j.width<l._rect.x+l._rect.width&&I.y+F+j.height<l._rect.y+l._rect.height}if(!S&&z){var h=V[P].seriesIndex;var n=V[P].groupIndex;var b=V[P].itemIndex;var Y=V[P].fillColor;var U=V[P].lineColor;var e=l._isSerieVisible(n,h,b);var R=D.beginGroup();var O=e?V[P].opacity:0.1;if(K){var T=A;var s=I.width;var X=T.split(/\s+/);var u="";var d=0;var o=[];var q="";for(var M=0;M<X.length;M++){var k=q+((q.length>0)?" ":"")+X[M];var B=l.renderer.measureText(k,0,{"class":J});if(B.width>s&&k.length>0&&q.length>0){o.push({text:q,dy:d});d+=B.height;q=X[M]}else{q=k}if(M+1==X.length){o.push({text:q,dy:d})}}for(var H=0;H<o.length;H++){var W=o[H].text;d=o[H].dy;var B=l.renderer.measureText(W,0,{"class":J});if(v){l.renderer.text(W,I.x+G+1.5*f,I.y+F+d,j.width,p,0,{"class":J},false,"left","center")}else{l.renderer.text(W,I.x+G+1.5*f,I.y+F+d,j.width,p,0,{"class":J},false,"center","center")}}var L=D.rect(I.x+G,I.y+F+f/2+d/2,f,f);if(v){F+=d}l.renderer.attr(L,{fill:Y,"fill-opacity":O,stroke:U,"stroke-width":1,"stroke-opacity":V[P].opacity})}else{var L=D.rect(I.x+G,I.y+F+f/2,f,f);l.renderer.attr(L,{fill:Y,"fill-opacity":O,stroke:U,"stroke-width":1,"stroke-opacity":V[P].opacity});if(v){l.renderer.text(A,I.x+G+1.5*f,I.y+F,j.width,j.height+f/2,0,{"class":J},false,"left","center")}else{l.renderer.text(A,I.x+G+1.5*f,I.y+F,j.width,p,0,{"class":J},false,"center","center")}}l.renderer.endGroup();l._setLegendToggleHandler(n,h,b,R)}if(v){}else{G+=j.width+2*f;if(m<G){m=G}}}if(S){E.height=a.jqx._ptrnd(F+p+5);E.width=a.jqx._ptrnd(m);return E}},isSerieVisible:function(d,b,c){return this._isSerieVisible(d,b,c)},_isSerieVisible:function(f,b,d){while(this._itemsToggleState.length<f+1){this._itemsToggleState.push([])}var e=this._itemsToggleState[f];while(e.length<b+1){e.push(isNaN(d)?true:[])}var c=e[b];if(isNaN(d)){return c}if(!a.isArray(c)){e[b]=c=[]}while(c.length<d+1){c.push(true)}return c[d]},isGroupVisible:function(b){return this._isGroupVisible(b)},_isGroupVisible:function(e){var d=false;var c=this.seriesGroups[e].series;if(!c){return d}for(var b=0;b<c.length;b++){if(this._isSerieVisible(e,b)){d=true;break}}return d},_toggleSerie:function(h,b,e,c){var g=!this._isSerieVisible(h,b,e);if(c!=undefined){g=c}var i=this.seriesGroups[h];var f=i.series[b];this._raiseEvent("toggle",{state:g,seriesGroup:i,serie:f,elementIndex:e});if(isNaN(e)){this._itemsToggleState[h][b]=g}else{var d=this._itemsToggleState[h][b];if(!a.isArray(d)){d=[]}while(d.length<e){d.push(true)}d[e]=g}this._isToggleRefresh=true;this.update();this._isToggleRefresh=false},showSerie:function(d,b,c){this._toggleSerie(d,b,c,true)},hideSerie:function(d,b,c){this._toggleSerie(d,b,c,false)},_setLegendToggleHandler:function(j,c,h,e){var i=this.seriesGroups[j];var f=i.series[c];var b=f.enableSeriesToggle;if(b==undefined){b=i.enableSeriesToggle!=false}if(b){var d=this;this.renderer.addHandler(e,"click",function(g){d._toggleSerie(j,c,h)})}},_renderLegend:function(c,e){var o=this;var d=[];for(var v=0;v<o.seriesGroups.length;v++){var t=o.seriesGroups[v];if(t.showLegend==false){continue}for(var q=0;q<t.series.length;q++){var m=t.series[q];if(m.showLegend==false){continue}var u=o._getSerieSettings(v,q);var p;if(t.type=="pie"||t.type=="donut"){var k=o._getXAxis(v);var h=m.legendFormatSettings||t.legendFormatSettings||k.formatSettings||m.formatSettings||