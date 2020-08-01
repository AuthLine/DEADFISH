/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxDraw","",{});a.extend(a.jqx._jqxDraw.prototype,{defineInstance:function(){var c={renderEngine:""};a.extend(true,this,c);var d=["clear","on","off","removeElement","attr","getAttr","line","circle","rect","path","pieslice","text","measureText"];for(var b in d){this._addFn(a.jqx._jqxDraw.prototype,d[b])}if(this===a.jqx._jqxDraw.prototype){return c}return c},_addFn:function(c,b){if(c[b]){return}c[b]=function(){return this.renderer[b].apply(this.renderer,arguments)}},createInstance:function(b){},_initRenderer:function(b){return a.jqx.createRenderer(this,b)},_internalRefresh:function(){var b=this;if(a.jqx.isHidden(b.host)){return}if(!b.renderer){b.host.empty();b._initRenderer(b.host)}var d=b.renderer;if(!d){return}var c=d.getRect();b._render({x:1,y:1,width:c.width,height:c.height});if(d instanceof a.jqx.HTML5Renderer){d.refresh()}},_saveAsImage:function(d,e,b,c){return a.jqx._widgetToImage(this,d,e,b,c)},_render:function(c){var b=this;var d=b.renderer;b._plotRect=c},refresh:function(){this._internalRefresh()},getSize:function(){var b=this._plotRect;return{width:b.width,height:b.height}},saveAsPNG:function(d,b,c){return this._saveAsImage("png",d,b,c)},saveAsJPEG:function(d,b,c){return this._saveAsImage("jpeg",d,b,c)}})})(jqxBaseFramework);(function(a){a.jqx.toGreyScale=function(b){if(b.indexOf("#")==-1){return b}var c=a.jqx.cssToRgb(b);c[0]=c[1]=c[2]=Math.round(0.3*c[0]+0.59*c[1]+0.11*c[2]);var d=a.jqx.rgbToHex(c[0],c[1],c[2]);return"#"+d[0]+d[1]+d[2]},a.jqx.adjustColor=function(e,d){if(typeof(e)!="string"){return"#000000"}if(e.indexOf("#")==-1){return e}var f=a.jqx.cssToRgb(e);var b=a.jqx.rgbToHsl(f);b[2]=Math.min(1,b[2]*d);b[1]=Math.min(1,b[1]*d*1.1);f=a.jqx.hslToRgb(b);var e="#";for(var g=0;g<3;g++){var h=Math.round(f[g]);h=a.jqx.decToHex(h);if(h.toString().length==1){e+="0"}e+=h}return e.toUpperCase()};a.jqx.decToHex=function(b){return b.toString(16)};a.jqx.hexToDec=function(b){return parseInt(b,16)};a.jqx.rgbToHex=function(e,d,c){return[a.jqx.decToHex(e),a.jqx.decToHex(d),a.jqx.decToHex(c)]};a.jqx.hexToRgb=function(c,d,b){return[a.jqx.hexToDec(c),a.jqx.hexToDec(d),a.jqx.hexToDec(b)]};a.jqx.cssToRgb=function(b){if(b.indexOf("rgb")<=-1){return a.jqx.hexToRgb(b.substring(1,3),b.substring(3,5),b.substring(5,7))}return b.substring(4,b.length-1).split(",")};a.jqx.hslToRgb=function(m){var i=parseFloat(m[0]);var n=parseFloat(m[1]);var f=parseFloat(m[2]);if(n==0){var c,j,k;c=j=k=f}else{var d=f<0.5?f*(1+n):f+n-f*n;var e=2*f-d;var c=a.jqx.hueToRgb(e,d,i+1/3);var j=a.jqx.hueToRgb(e,d,i);var k=a.jqx.hueToRgb(e,d,i-1/3)}return[c*255,j*255,k*255]};a.jqx.hueToRgb=function(d,c,b){if(b<0){b+=1}if(b>1){b-=1}if(b<1/6){return d+(c-d)*6*b}else{if(b<1/2){return c}else{if(b<2/3){return d+(c-d)*(2/3-b)*6}}}return d};a.jqx.rgbToHsl=function(j){var c=parseFloat(j[0])/255;var i=parseFloat(j[1])/255;var k=parseFloat(j[2])/255;var m=Math.max(c,i,k),e=Math.min(c,i,k);var f,o,d=(m+e)/2;if(m==e){f=o=0}else{var n=m-e;o=d>0.5?n/(2-m-e):n/(m+e);switch(m){case c:f=(i-k)/n+(i<k?6:0);break;case i:f=(k-c)/n+2;break;case k:f=(c-i)/n+4;break}f/=6}return[f,o,d]};a.jqx.swap=function(b,d){var c=b;b=d;d=c};a.jqx.getNum=function(b){if(!a.isArray(b)){if(isNaN(b)){return 0}}else{for(var c=0;c<b.length;c++){if(!isNaN(b[c])){return b[c]}}}return 0};a.jqx._ptdist=function(c,e,b,d){return Math.sqrt((b-c)*(b-c)+(d-e)*(d-e))};a.jqx._ptrnd=function(c){if(!document.createElementNS){if(Math.round(c)==c){return c}return a.jqx._rnd(c,1,false,true)}var b=a.jqx._rnd(c,0.5,false,true);if(Math.abs(b-Math.round(b))!=0.5){return b>c?b-0.5:b+0.5}return b};a.jqx._ptRotate=function(d,i,c,h,f){var b=Math.sqrt(Math.pow(Math.abs(d-c),2)+Math.pow(Math.abs(i-h),2));var e=Math.asin((d-c)/b);var g=e+f;d=c+Math.cos(g)*b;i=h+Math.sin(g)*b;return{x:d,y:i}};a.jqx._rup=function(c){var b=Math.round(c);if(c>b){b++}return b};a.jqx.log=function(c,b){return Math.log(c)/(b?Math.log(b):1)};a.jqx._mod=function(d,c){var e=Math.abs(d>c?c:d);var f=1;if(e!=0){while(e*f<100){f*=10}}d=d*f;c=c*f;return(d%c)/f};a.jqx._rnd=function(d,f,e,c){if(isNaN(d)){return d}if(undefined===c){c=true}var b=d-((c==true)?d%f:a.jqx._mod(d,f));if(d==b){return b}if(e){if(d>b){b+=f}}else{if(b>d){b-=f}}return(f==1)?Math.round(b):b};a.jqx.commonRenderer={pieSlicePath:function(k,j,h,r,A,B,d){if(!r){r=1}var m=Math.abs(A-B);var p=m>180?1:0;if(m>=360){B=A+359.99}var q=A*Math.PI*2/360;var i=B*Math.PI*2/360;var w=k,v=k,f=j,e=j;var n=!isNaN(h)&&h>0;if(n){d=0}if(d+h>0){if(d>0){var l=m/2+A;var z=l*Math.PI*2/360;k+=d*Math.cos(z);j-=d*Math.sin(z)}if(n){var u=h;w=k+u*Math.cos(q);f=j-u*Math.sin(q);v=k+u*Math.cos(i);e=j-u*Math.sin(i)}}var t=k+r*Math.cos(q);var s=k+r*Math.cos(i);var c=j-r*Math.sin(q);var b=j-r*Math.sin(i);var o="";var g=(Math.abs(Math.abs(B-A)-360)>0.02);if(n){o="M "+v+","+e;o+=" a"+h+","+h;o+=" 0 "+p+",1 "+(w-v)+","+(f-e);if(g){o+=" L"+t+","+c}else{o+=" M"+t+","+c}o+=" a"+r+","+r;o+=" 0 "+p+",0 "+(s-t)+","+(b-c);if(g){o+=" Z"}}else{o="M "+s+","+b;o+=" a"+r+","+r;o+=" 0 "+p+",1 "+(t-s)+","+(c-b);if(g){o+=" L"+k+","+j;o+=" Z"}}return o},measureText:function(o,f,g,n,l){var e=l._getTextParts(o,f,g);var i=e.width;var b=e.height;if(false==n){b/=0.6}var c={};if(isNaN(f)){f=0}if(f==0){c={width:a.jqx._rup(i),height:a.jqx._rup(b)}}else{var k=f*Math.PI*2/360;var d=Math.abs(Math.sin(k));var j=Math.abs(Math.cos(k));var h=Math.abs(i*d+b*j);var m=Math.abs(i*j+b*d);c={width:a.jqx._rup(m),height:a.jqx._rup(h)}}if(n){c.textPartsInfo=e}return c},alignTextInRect:function(q,n,b,r,m,o,i,p,e,d){var k=e*Math.PI*2/360;var c=Math.sin(k);var j=Math.cos(k);var l=m*c;var h=m*j;if(i=="center"||i==""||i=="undefined"){q=q+b/2}else{if(i=="right"){q=q+b}}if(p=="center"||p=="middle"||p==""||p=="undefined"){n=n+r/2}else{if(p=="bottom"){n+=r-o/2}else{if(p=="top"){n+=o/2}}}d=d||"";var f="middle";if(d.indexOf("top")!=-1){f="top"}else{if(d.indexOf("bottom")!=-1){f="bottom"}}var g="center";if(d.indexOf("left")!=-1){g="left"}else{if(d.indexOf("right")!=-1){g="right"}}if(g=="center"){q-=h/2;n-=l/2}else{if(g=="right"){q-=h;n-=l}}if(f=="top"){q-=o*c;n+=o*j}else{if(f=="middle"){q-=o*c/2;n+=o*j/2}}q=a.jqx._rup(q);n=a.jqx._rup(n);return{x:q,y:n}}};a.jqx.svgRenderer=function(){};a.jqx.svgRenderer.prototype={_svgns:"http://www.w3.org/2000/svg",init:function(f){var d="<table class=tblChart cellspacing='0' cellpadding='0' border='0' align='left' valign='top'><tr><td colspan=2 class=tdTop></td></tr><tr><td class=tdLeft></td><td><div class='chartContainer' style='position:relative' onselectstart='return false;'></div></td></tr></table>";f.append(d);this.host=f;var b=f.find(".chartContainer");b[0].style.width=f.width()+"px";b[0].style.height=f.height()+"px";var h;try{var c=document.createElementNS(this._svgns,"svg");c.setAttribute("id","svgChart");c.setAttribute("version","1.1");c.setAttribute("width","100%");c.setAttribute("height","100%");c.setAttribute("overflow","hidden");b[0].appendChild(c);this.canvas=c}catch(g){return false}this._id=new Date().getTime();this.clear();this._layout();this._runLayoutFix();return true},getType:function(){return"SVG"},refresh:function(){},_runLayoutFix:function(){var b=this;this._fixLayout()},_fixLayout:function(){var f=this.canvas.getBoundingClientRect();var d=(parseFloat(f.left)==parseInt(f.left));var b=(parseFloat(f.top)==parseInt(f.top));if(a.jqx.browser.msie){var d=true,b=true;var e=this.host;var c=0,g=0;while(e&&e.position&&e[0].parentNode){var h=e.position();c+=parseFloat(h.left)-parseInt(h.left);g+=parseFloat(h.top)-parseInt(h.top);e=e.parent()}d=parseFloat(c)==parseInt(c);b=parseFloat(g)==parseInt(g)}if(!d){this.host.find(".tdLeft")[0].style.width="0.5px"}if(!b){this.host.find(".tdTop")[0].style.height="0.5px"}},_layout:function(){var b=this.host.find(".chartContainer");this._width=Math.max(a.jqx._rup(this.host.width())-1,0);this._height=Math.max(a.jqx._rup(this.host.height())-1,0);b[0].style.width=this._width;b[0].style.height=this._height;this._fixLayout()},getRect:function(){return{x:0,y:0,width:this._width,height:this._height}},getContainer:function(){var b=this.host.find(".chartContainer");return b},clear:function(){while(this.canvas.childElementCount>0){this.removeElement(this.canvas.firstElementChild)}this._defaultParent=undefined;this._defs=document.createElementNS(this._svgns,"defs");this._gradients={};this.canvas.appendChild(this._defs)},removeElement:function(d){if(undefined==d){return}this.removeHandler(d);try{while(d.firstChild){this.removeElement(d.firstChild)}if(d.parentNode){d.parentNode.removeChild(d)}else{this.canvas.removeChild(d)}}catch(c){var b=c}},_openGroups:[],beginGroup:function(){var b=this._activeParent();var c=document.createElementNS(this._svgns,"g");b.appendChild(c);this._openGroups.push(c);return c},endGroup:function(){if(this._openGroups.length==0){return}this._openGroups.pop()},_activeParent:function(){return this._openGroups.length==0?this.canvas:this._openGroups[this._openGroups.length-1]},createClipRect:function(d){var e=document.createElementNS(this._svgns,"clipPath");var b=document.createElementNS(this._svgns,"rect");this.attr(b,{x:d.x,y:d.y,width:d.width,height:d.height,fill:"none"});this._clipId=this._clipId||0;e.id="cl"+this._id+"_"+(++this._clipId).toString();e.appendChild(b);this._defs.appendChild(e);return e},getWindowHref:function(){var c=a.jqx.browser;if(c&&c.browser=="msie"&&c.version<10){return""}var b=window.location.href;if(!b){return b}b=b.replace(/([\('\)])/g,"\\$1");b=b.replace(/#.*$/,"");return b},setClip:function(d,c){var b="url("+this.getWindowHref()+"#"+c.id+")";return this.attr(d,{"clip-path":b})},_clipId:0,addHandler:function(b,d,c){if(a(b).on){a(b).on(d,c)}else{a(b).bind(d,c)}},removeHandler:function(b,d,c){if(a(b).off){a(b).off(d,c)}else{a(b).unbind(d,c)}},on:function(b,d,c){this.addHandler(b,d,c)},off:function(b,d,c){this.removeHandler(b,d,c)},shape:function(b,e){var c=document.createElementNS(this._svgns,b);if(!c){return undefined}for(var d in e){if(e[d]!==undefined&&e[d].toString()==="NaN"){c.setAttribute(d,0)}else{c.setAttribute(d,e[d])}}this._activeParent().appendChild(c);return c},_getTextParts:function(q,g,h){var f={width:0,height:0,parts:[]};if(undefined===q){return f}var m=0.6;var r=q.toString().split("<br>");var o=this._activeParent();var k=document.createElementNS(this._svgns,"text");this.attr(k,h);for(var j=0;j<r.length;j++){var c=r[j];var d=k.ownerDocument.createTextNode(c);k.appendChild(d);o.appendChild(k);var p;try{p=k.getBBox()}catch(n){}var l=a.jqx._rup(p.width);var b=a.jqx._rup(p.height*m);k.removeChild(d);f.width=Math.max(f.width,l);f.height+=b+(j>0?4:0);f.parts.push({width:l,height:b,text:c})}o.removeChild(k);return f},_measureText:function(e,d,c,b){return a.jqx.commonRenderer.measureText(e,d,c,b,this)},measureText:function(d,c,b){return this._measureText(d,c,b,false)},text:function(t,q,p,B,z,H,J,I,s,k,c){var v=this._measureText(t,H,J,true);var j=v.textPartsInfo;var f=j.parts;var A;if(!s){s="center"}if(!k){k="center"}if(f.length>1||I){A=this.beginGroup()}if(I){var g=this.createClipRect({x:a.jqx._rup(q)-1,y:a.jqx._rup(p)-1,width:a.jqx._rup(B)+2,height:a.jqx._rup(z)+2});this.setClip(A,g)}var o=this._activeParent();var L=0,l=0;var b=0.6;L=j.width;l=j.height;if(isNaN(B)||B<=0){B=L}if(isNaN(z)||z<=0){z=l}var r=B||0;var G=z||0;if(!H||H==0){p+=l;if(k=="center"||k=="middle"){p+=(G-l)/2}else{if(k=="bottom"){p+=G-l}}if(!B){B=L}if(!z){z=l}var o=this._activeParent();var n=0;for(var F=f.length-1;F>=0;F--){var u=document.createElementNS(this._svgns,"text");this.attr(u,J);this.attr(u,{cursor:"default"});var E=u.ownerDocument.createTextNode(f[F].text);u.appendChild(E);var M=q;var m=f[F].width;var e=f[F].height;if(s=="center"){M+=(r-m)/2}else{if(s=="right"){M+=(r-m)}}this.attr(u,{x:a.jqx._rup(M),y:a.jqx._rup(p+n),width:a.jqx._rup(m),height:a.jqx._rup(e)});o.appendChild(u);n-=f[F].height+4}if(A){this.endGroup();return A}return u}var C=a.jqx.commonRenderer.alignTextInRect(q,p,B,z,L,l,s,k,H,c);q=C.x;p=C.y;var D=this.shape("g",{transform:"translate("+q+","+p+")"});var d=this.shape("g",{transform:"rotate("+H+")"});D.appendChild(d);var n=0;for(var F=f.length-1;F>=0;F--){var K=document.createElementNS(this._svgns,"text");this.attr(K,J);this.attr(K,{cursor:"default"});var E=K.ownerDocument.createTextNode(f[F].text);K.appendChild(E);var M=0;var m=f[F].width;var e=f[F].height;if(s=="center"){M+=(j.width-m)/2}else{if(s=="right"){M+=(j.width-m)}}this.attr(K,{x:a.jqx._rup(M),y:a.jqx._rup(n),width:a.jqx._rup(m),height:a.jqx._rup(e)});d.appendChild(K);n-=e+4}o.appendChild(D);if(A){this.endGroup()}return D},line:function(d,f,c,e,g){var b=this.shape("line",{x1:d,y1:f,x2:c,y2:e});this.attr(b,g);return b},path:function(c,d){var b=this.shape("path");b.setAttribute("d",c);if(d){this.attr(b,d)}return b},rect:function(b,g,c,e,f){b=a.jqx._ptrnd(b);g=a.jqx._ptrnd(g);c=Math.max(1,a.jqx._rnd(c,1,false));e=Math.max(1,a.jqx._rnd(e,1,false));var d=this.shape("rect",{x:b,y:g,width:c,height:e});if(f){this.attr(d,f)}return d},circle:function(b,f,d,e){var c=this.shape("circle",{cx:b,cy:f,r:d});if(e){this.attr(c,e)}return c},pieSlicePath:function(c,h,g,e,f,d,b){return a.jqx.commonRenderer.pieSlicePath(c,h,g,e,f,d,b)},pieslice:function(j,h,g,d,f,b,i,c){var e=this.pieSlicePath(j,h,g,d,f,b,i);var k=this.shape("path");k.setAttribute("d",e);if(c){this.attr(k,c)}return k},attr:function(b,d){if(!b||!d){return}for(var c in d){if(c=="textContent"){b.textContent=d[c]}else{b.setAttribute(c,d[c])}}},removeAttr:function(b,d){if(!b||!d){return}for(var c in d){if(c=="textContent"){b.textContent=""}else{b.removeAttribute(d[c])}}},getAttr:function(c,b){return c.getAttribute(b)},_gradients:{},_toLinearGradient:function(e,h,j){var c="grd"+this._id+e.replace("#","")+(h?"v":"h");var b="url("+this.getWindowHref()+"#"+c+")";if(this._gradients[b]){return b}var d=document.createElementNS(this._svgns,"linearGradient");this.attr(d,{x1:"0%",y1:"0%",x2:h?"0%":"100%",y2:h?"100%":"0%",id:c});for(var f=0;f<j.length;f++){var g=j[f];var l=document.createElementNS(this._svgns,"stop");var k="stop-color:"+a.jqx.adjustColor(e,g[1]);this.attr(l,{offset:g[0]+"%",style:k});d.appendChild(l)}this._defs.appendChild(d);this._gradients[b]=true;return b},_toRadialGradient:function(e,j,h){var c="grd"+this._id+e.replace("#","")+"r"+(h!=undefined?h.key:"");var b="url("+this.getWindowHref()+"#"+c+")";if(this._gradients[b]){return b}var d=document.createElementNS(this._svgns,"radialGradient");if(h==undefined){this.attr(d,{cx:"50%",cy:"50%",r:"100%",fx:"50%",fy:"50%",id:c})}else{this.attr(d,{cx:h.x,cy:h.y,r:h.outerRadius,id:c,gradientUnits:"userSpaceOnUse"})}for(var f=0;f<j.length;f++){var g=j[f];var l=document.createElementNS(this._svgns,"stop");var k="stop-color:"+a.jqx.adjustColor(e,g[1]);this.attr(l,{offset:g[0]+"%",style:k});d.appendChild(l)}this._defs.appendChild(d);this._gradients[b]=true;return b}};a.jqx.vmlRenderer=function(){};a.jqx.vmlRenderer.prototype={init:function(g){var f="<div class='chartContainer' style=\"position:relative;overflow:hidden;\"><div>";g.append(f);this.host=g;var b=g.find(".chartContainer");b[0].style.width=g.width()+"px";b[0].style.height=g.height()+"px";var d=true;try{for(var c=0;c<document.namespaces.length;c++){if(document.namespaces[c].name=="v"&&document.namespaces[c].urn=="urn:schemas-microsoft-com:vml"){d=false;break}}}catch(h){return false}if(a.jqx.browser.msie&&parseInt(a.jqx.browser.version)<9&&(document.childNodes&&document.childNodes.length>0&&document.childNodes[0].data&&document.childNodes[0].data.indexOf("DOCTYPE")!=-1)){if(d){document.namespaces.add("v","urn:schemas-microsoft-com:vml")}this._ie8mode=true}else{if(d){document.namespaces.add("v","urn:schemas-microsoft-com:vml");document.createStyleSheet().cssText="v\\:* { behavior: url(#default#VML); display: inline-block; }"}}this.canvas=b[0];this._width=Math.max(a.jqx._rup(b.width()),0);this._height=Math.max(a.jqx._rup(b.height()),0);b[0].style.width=this._width+2;b[0].style.height=this._height+2;this._id=new Date().getTime();this.clear();return true},getType:function(){return"VML"},refresh:function(){},getRect:function(){return{x:0,y:0,width:this._width,height:this._height}},getContainer:function(){var b=this.host.find(".chartContainer");return b},clear:function(){while(this.canvas.childElementCount>0){this.removeHandler(this.canvas.firstElementChild);this.canvas.removeChild(this.canvas.firstElementChild)}this._gradients={};this._defaultParent=undefined},removeElement:function(b){if(b!=null){this.removeHandler(b);b.parentNode.removeChild(b)}},_openGroups:[],beginGroup:function(){var b=this._activeParent();var c=document.createElement("v:group");c.style.position="absolute";c.coordorigin="0,0";c.coordsize=this._width+","+this._height;c.style.left=0;c.style.top=0;c.style.width=this._width;c.style.height=this._height;b.appendChild(c);this._openGroups.push(c);return c},endGroup:function(){if(this._openGroups.length==0){return}this._openGroups.pop()},_activeParent:function(){return this._openGroups.length==0?this.canvas:this._openGroups[this._openGroups.length-1]},createClipRect:function(b){var c=document.createElement("div");c.style.height=(b.height+1)+"px";c.style.width=(b.width+1)+"px";c.style.position="absolute";c.style.left=b.x+"px";c.style.top=b.y+"px";c.style.overflow="hidden";this._clipId=this._clipId||0;c.id="cl"+this._id+"_"+(++this._clipId).toString();this._activeParent().appendChild(c);return c},setClip:function(c,b){},_clipId:0,addHandler:function(b,d,c){if(a(b).on){a(b).on(d,c)}else{a(b).bind(d,c)}},removeHandler:function(b,d,c){if(a(b).off){a(b).off(d,c)}else{a(b).unbind(d,c)}},on:function(b,d,c){this.addHandler(b,d,c)},off:function(b,d,c){this.removeHandler(b,d,c)},_getTextParts:function(o,f,g){var e={width:0,height:0,parts:[]};var m=0.6;var p=o.toString().split("<br>");var n=this._activeParent();var j=document.createElement("v:textbox");this.attr(j,g);n.appendChild(j);for(var h=0;h<p.length;h++){var c=p[h];var d=document.createElement("span");d.appendChild(document.createTextNode(c));j.appendChild(d);if(g&&g["class"]){d.className=g["class"]}var l=a(j);var k=a.jqx._rup(l.width());var b=a.jqx._rup(l.height()*m);if(b==0&&a.jqx.browser.msie&&parseInt(a.jqx.browser.version)<9){var q=l.css("font-size");if(q){b=parseInt(q);if(isNaN(b)){b=0}}}j.removeChild(d);e.width=Math.max(e.width,k);e.height+=b+(h>0?2:0);e.parts.push({width:k,height:b,text:c})}n.removeChild(j);return e},_measureText:function(e,d,c,b){if(Math.abs(d)>45){d=90}else{d=0}return a.jqx.commonRenderer.measureText(e,d,c,b,this)},measureText:function(d,c,b){return this._measureText(d,c,b,false)},text:function(r,n,m,A,t,G,I,H,q,g){var B;if(I&&I.stroke){B=I.stroke}if(B==undefined){B="black"}var s=this._measureText(r,G,I,true);var e=s.textPartsInfo;var b=e.parts;var J=s.width;var j=s.height;if(isNaN(A)||A==0){A=J}if(isNaN(t)||t==0){t=j}var v;if(!q){q="center"}if(!g){g="center"}if(b.length>0||H){v=this.beginGroup()}if(H){var c=this.createClipRect({x:a.jqx._rup(n),y:a.jqx._rup(m),width:a.jqx._rup(A),height:a.jqx._rup(t)});this.setClip(v,c)}var l=this._activeParent();var p=A||0;var F=t||0;if(Math.abs(G)>45){G=90}else{G=0}var u=0,E=0;if(q=="center"){u+=(p-J)/2}else{if(q=="right"){u+=(p-J)}}if(g=="center"){E=(F-j)/2}else{if(g=="bottom"){E=F-j}}if(G==0){m+=j+E;n+=u}else{n+=J+u;m+=E}var k=0,K=0;var d;for(var D=b.length-1;D>=0;D--){var z=b[D];var o=(J-z.width)/2;if(G==0&&q=="left"){o=0}else{if(G==0&&q=="right"){o=J-z.width}else{if(G==90){o=(j-z.width)/2}}}var f=k-z.height;E=G==90?o:f;u=G==90?f:o;d=document.createElement("v:textbox");d.style.position="absolute";d.style.left=a.jqx._rup(n+u);d.style.top=a.jqx._rup(m+E);d.style.width=a.jqx._rup(z.width);d.style.height=a.jqx._rup(z.height);if(G==90){d.style.filter="progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";d.style.height=a.jqx._rup(z.height)+5}var C=document.createElement("span");C.appendChild(document.createTextNode(z.text));if(I&&I["class"]){C.className=I["class"]}d.appendChild(C);l.appendChild(d);k-=z.height+(D>0?2:0)}if(v){this.endGroup();return l}return d},shape:function(b,e){var c=document.createElement(this._createElementMarkup(b));if(!c){return undefined}for(var d in e){c.setAttribute(d,e[d])}this._activeParent().appendChild(c);return c},line:function(e,g,d,f,h){var b="M "+e+","+g+" L "+d+","+f+" X E";var c=this.path(b);this.attr(c,h);return c},_createElementMarkup:function(b){var c="<v:"+b+' style=""></v:'+b+">";if(this._ie8mode){c=c.replace('style=""','style="behavior: url(#default#VML);"')}return c},path:function(c,d){var b=document.createElement(this._createElementMarkup("shape"));b.style.position="absolute";b.coordsize=this._width+" "+this._height;b.coordorigin="0 0";b.style.width=parseInt(this._width);b.style.height=parseInt(this._height);b.style.left=0+"px";b.style.top=0+"px";b.setAttribute("path",c);this._activeParent().appendChild(b);if(d){this.attr(b,d)}return b},rect:function(b,g,c,d,f){b=a.jqx._ptrnd(b);g=a.jqx._ptrnd(g);c=a.jqx._rup(c);d=a.jqx._rup(d);var e=this.shape("rect",f);e.style.position="absolute";e.style.left=b;e.style.top=g;e.style.width=c;e.style.height=d;e.strokeweight=0;if(f){this.attr(e,f)}return e},circle:function(b,f,d,e){var c=this.shape("oval");b=a.jqx._ptrnd(b-d);f=a.jqx._ptrnd(f-d);d=a.jqx._rup(d);c.style.position="absolute";c.style.left=b;c.style.top=f;c.style.width=d*2;c.style.height=d*2;if(e){this.attr(c,e)}return c},updateCircle:function(d,b,e,c){if(b==undefined){b=parseFloat(d.style.left)+parseFloat(d.style.width)/2}if(e==undefined){e=parseFloat(d.style.top)+parseFloat(d.style.height)/2}if(c==undefined){c=parseFloat(d.width)/2}b=a.jqx._ptrnd(b-c);e=a.jqx._ptrnd(e-c);c=a.jqx._rup(c);d.style.left=b;