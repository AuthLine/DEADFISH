/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxSlider","",{});a.extend(a.jqx._jqxSlider.prototype,{defineInstance:function(){var b={disabled:false,width:300,height:30,step:1,max:10,min:0,int64:false,orientation:"horizontal",showTicks:true,tickMode:"default",tickNumber:10,minorTickNumber:20,niceInterval:false,ticksPosition:"both",ticksFrequency:2,minorTicksFrequency:1,showMinorTicks:false,showButtons:true,buttonsPosition:"both",mode:"default",showRange:true,rangeSlider:false,value:0,values:[0,10],tooltip:false,tooltipFormatFunction:null,tooltipFormatSettings:null,tooltipPosition:"near",tooltipHideDelay:500,sliderButtonSize:14,tickSize:7,minorTickSize:4,showTickLabels:false,tickLabelStyleSettings:null,tickLabelFormatSettings:null,tickLabelFormatFunction:null,template:"",layout:"normal",rtl:false,changeType:null,editableLabels:false,padding:{},_settings:{vertical:{size:"height",oSize:"width",outerOSize:"outerWidth",outerSize:"outerHeight",left:"top",top:"left",start:"_startY",mouse:"_mouseStartY",page:"pageY",opposite:"horizontal"},horizontal:{size:"width",oSize:"height",outerOSize:"outerHeight",outerSize:"outerWidth",left:"left",top:"top",start:"_startX",mouse:"_mouseStartX",page:"pageX",opposite:"vertical"}},_touchEvents:{mousedown:a.jqx.mobile.getTouchEventName("touchstart"),click:a.jqx.mobile.getTouchEventName("touchstart"),mouseup:a.jqx.mobile.getTouchEventName("touchend"),mousemove:a.jqx.mobile.getTouchEventName("touchmove"),mouseenter:"mouseenter",mouseleave:"mouseleave"},_events:["change","slide","slideEnd","slideStart","created"],_invalidArgumentExceptions:{invalidWidth:"Invalid width.",invalidHeight:"Invalid height.",invalidStep:"Invalid step.",invalidMaxValue:"Invalid maximum value.",invalidMinValue:"Invalid minimum value.",invalidTickFrequency:"Invalid tick frequency.",invalidValue:"Invalid value.",invalidValues:"Invalid values.",invalidTicksPosition:"Invalid ticksPosition",invalidButtonsPosition:"Invalid buttonsPosition"},_lastValue:[],_track:null,_leftButton:null,_rightButton:null,_slider:null,_rangeBar:null,_slideEvent:null,_capturedElement:null,_slideStarted:false,_helpers:[],aria:{"aria-valuenow":{name:"value",type:"number"},"aria-valuemin":{name:"min",type:"number"},"aria-valuemax":{name:"max",type:"number"},"aria-disabled":{name:"disabled",type:"boolean"}}};if(this===a.jqx._jqxSlider.prototype){return b}a.extend(true,this,b);return b},_createFromInput:function(c){var h=this,i,f,e,j,b,g;if(h.element.nodeName.toLowerCase()==="input"){h.field=h.element;if(h.field.className){h._className=h.field.className}i={title:h.field.title};if(h.field.value){i.value=h.field.value}if(h.field.id.length){i.id=h.field.id.replace(/[^\w]/g,"_")+"_"+c}else{i.id=a.jqx.utilities.createId()+"_"+c}if(h.field.getAttribute("min")){f=(h.field.getAttribute("min"));h.min=parseFloat(f)}if(h.field.getAttribute("step")){e=(h.field.getAttribute("step"));h.step=parseFloat(e)}if(h.field.getAttribute("max")){j=(h.field.getAttribute("max"));h.max=parseFloat(j)}b=document.createElement("div");if(undefined!==i.id){b.setAttribute("id",i.id)}if(undefined!==i.value){b.setAttribute("value",i.value)}b.style.cssText=h.field.style.cssText;if(!h.width){h.width=h.field.offsetWidth}if(!h.height){h.height=h.field.offsetHeight}h.field.style.display="none";if(h.field.parentNode){h.field.parentNode.insertBefore(b,h.field.nextSibling)}g=h.host.data();h.host=a(b);h.host.data(g);h.element=b;h.element.id=h.field.id;h.field.id=i.id;h._helpers.element=new jqxHelper(h.element);h._helpers.field=new jqxHelper(h.field);if(h._className){h._helpers.element.addClass(h._className);h._helpers.field.removeClass(h._className)}if(h.field.tabIndex){var d=h.field.tabIndex;h.field.tabIndex=-1;h.element.tabIndex=d}}},createInstance:function(b){var e=this;if(!window.jqxHelper){window.jqxHelper=a}e._createFromInput("jqxSlider");e._isTouchDevice=a.jqx.mobile.isTouchDevice();var d="<div role='slider'><div style='width:100%; height: 100%;'></div></div><div><div></div><div></div><div></div></div><div><div style='width:100%; height: 100%;'></div></div>";e.element.innerHTML=d;e._leftButton=e.element.firstChild;e._contentWrapper=e._leftButton.nextSibling;e._rightButton=e._contentWrapper.nextSibling;e.element.className=e.toThemeProperty("jqx-slider jqx-widget");e._topTicks=e._contentWrapper.firstChild;e._track=e._topTicks.nextSibling;e._bottomTicks=e._track.nextSibling;e._leftButton.className=e.toThemeProperty("jqx-slider-left");e._rightButton.className=e.toThemeProperty("jqx-slider-left");e._helpers.leftButton=new jqxHelper(e._leftButton);e._helpers.rightButton=new jqxHelper(e._rightButton);e._helpers.element=new jqxHelper(e.element);e._helpers.track=new jqxHelper(e._track);if(!e.host.jqxRepeatButton){throw new Error("jqxSlider: Missing reference to jqxbuttons.js.")}a.jqx.aria(this);if(e.int64==="s"){if(!a.jqx.longInt){throw new Error("jqxSlider: Missing reference to jqxmath.js")}a.jqx.longInt(e);e._value64=new a.jqx.math().fromString(e.value.toString(),10);e._values64=[new a.jqx.math().fromString(e.values[0].toString(),10),new a.jqx.math().fromString(e.values[1].toString(),10)];e._min64=new a.jqx.math().fromString(e.min.toString(),10);e._max64=new a.jqx.math().fromString(e.max.toString(),10);e._step64=new a.jqx.math().fromString(e.step.toString(),10);e._ticksFrequency64=new a.jqx.math().fromString(e.ticksFrequency.toString(),10);e._minorTicksFrequency64=new a.jqx.math().fromString(e.minorTicksFrequency.toString(),10)}else{if(e.int64==="u"){try{new BigNumber(e.value)}catch(c){throw new Error("jqxSlider: Missing reference to jqxmath.js")}e._value64=new BigNumber(e.value);e._values64=[new BigNumber(e.values[0]),new BigNumber(e.values[1])];e._min64=new BigNumber(e.min);e._max64=new BigNumber(e.max);e._step64=new BigNumber(e.step);e._ticksFrequency64=new BigNumber(e.ticksFrequency);e._minorTicksFrequency64=new BigNumber(e.minorTicksFrequency)}}e._helpers.element.width(e.width);e._helpers.element.height(e.height);if(e._helpers.element.isRendered){if(e._helpers.element.isRendered()){a(e._leftButton).jqxRepeatButton({template:e.template,theme:e.theme,delay:50,width:e.sliderButtonSize,height:e.sliderButtonSize});a(e._rightButton).jqxRepeatButton({template:e.template,theme:e.theme,delay:50,width:e.sliderButtonSize,height:e.sliderButtonSize});e.render()}else{e._helpers.element.sizeChanged(function(){a(e._leftButton).jqxRepeatButton({template:e.template,theme:e.theme,delay:50,width:e.sliderButtonSize,height:e.sliderButtonSize});a(e._rightButton).jqxRepeatButton({template:e.template,theme:e.theme,delay:50,width:e.sliderButtonSize,height:e.sliderButtonSize});e.render()});e._helpers.element.sizeStyleChanged(function(){var f=e._helpers.element.getSizeFromStyle();if(f.width){e.width=f.width}if(f.height){e.height=f.height}e.__trackSize=null;e.__thumbSize=null;e._performLayout();e._initialSettings()})}}else{a(e._leftButton).jqxRepeatButton({template:e.template,theme:e.theme,delay:50,width:e.sliderButtonSize,height:e.sliderButtonSize});a(e._rightButton).jqxRepeatButton({template:e.template,theme:e.theme,delay:50,width:e.sliderButtonSize,height:e.sliderButtonSize});e.render()}},render:function(){var c=this;c._setPaddingValues();c._rendering=true;c._refresh();c._raiseEvent(4,{value:c.getValue()});c._addInput();var b=c.element.getAttribute("tabindex")==null;if(b){c.element.setAttribute("tabindex",0)}a.jqx.utilities.resize(c.host,function(){c.__trackSize=null;c.__thumbSize=null;c._performLayout();c._initialSettings()});if(c.orientation==="vertical"){c.element.style.minWidth=96+"px"}c._rendering=false},focus:function(){try{this.host.focus()}catch(b){}},destroy:function(){var b=this;b.removeHandler(a(document),"mouseup.arrow"+b.element.id);b.removeHandler(a(document),b._getEvent("mouseup")+"."+b.element.id);b.removeHandler(a(document),b._getEvent("mousemove")+"."+b.element.id);a.jqx.utilities.resize(this.host,null,true);b.host.remove();b._helpers=[]},_addInput:function(){var d=this;var c=d.element.getAttribute("name");var b=document.createElement("input");b.setAttribute("type","hidden");d.element.appendChild(b);if(c){b.setAttribute("name",c)}if(!d.rangeSlider){b.value=d.value.toString()}else{if(d.values){b.value=d.value.rangeStart.toString()+"-"+d.value.rangeEnd.toString()}}d.input=b},_getSetting:function(b){return this._settings[this.orientation][b]},_getEvent:function(b){if(this._isTouchDevice){return this._touchEvents[b]}else{return b}},refresh:function(b){if(!b){this._refresh()}},_refresh:function(){var b=this;b._render();b._performLayout();b._removeEventHandlers();b._addEventHandlers();b._initialSettings()},_render:function(){var b=this;b._addTrack();b._addSliders();b._addTickContainers();b._updateButtonsVisibility();b._addRangeBar()},_addTrack:function(){var c=this;var b=c._track;c._helpers.track.addClass(c.toThemeProperty("jqx-slider-track"));b.setAttribute("style","");c._helpers.track.removeClass(c.toThemeProperty("jqx-slider-track-"+c._getSetting("opposite")));c._helpers.track.addClass(c.toThemeProperty("jqx-slider-track-"+c.orientation));c._helpers.track.addClass(c.toThemeProperty("jqx-fill-state-normal jqx-rc-all"))},_addSliders:function(){var d=this;if(d._slider===null||d._slider.length<1){d._slider={};var b=document.createElement("div");var c=document.createElement("div");b.className=d.toThemeProperty("jqx-slider-slider");c.className=d.toThemeProperty("jqx-slider-slider");d._slider.left=b;d._track.appendChild(b);d._slider.right=c;d._track.appendChild(c);d._helpers.track=new jqxHelper(d._track);d._helpers.left=new jqxHelper(d._slider.left);d._helpers.right=new jqxHelper(d._slider.right);if(d.template){d._helpers.left.addClass(d.toThemeProperty("jqx-"+d.template));d._helpers.right.addClass(d.toThemeProperty("jqx-"+d.template))}}d._helpers.left.removeClass(d.toThemeProperty("jqx-slider-slider-"+d._getSetting("opposite")));d._helpers.left.addClass(d.toThemeProperty("jqx-slider-slider-"+d.orientation));d._helpers.right.removeClass(d.toThemeProperty("jqx-slider-slider-"+d._getSetting("opposite")));d._helpers.right.addClass(d.toThemeProperty("jqx-slider-slider-"+d.orientation));d._helpers.right.addClass(d.toThemeProperty("jqx-fill-state-normal"));d._helpers.left.addClass(d.toThemeProperty("jqx-fill-state-normal"))},_addTickContainers:function(){var c=this;c._bottomTicks.className=c.toThemeProperty("jqx-slider-tickscontainer");c._topTicks.className=c.toThemeProperty("jqx-slider-tickscontainer");var b="visible";if(!c.showTicks){b="hidden"}c._bottomTicks.style.visibility=b;c._topTicks.style.visibility=b},_updateButtonsVisibility:function(){var c=this;var b="block";if(!c.showButtons||c.rangeSlider){b="none"}c._rightButton.style.display=b;c._leftButton.style.display=b},_getNiceInterval:function(f){function u(w){return Math.log(parseFloat(w))/Math.LN10}var k=this,m,v="Width";if(k.orientation==="vertical"){v="Height"}var h=document.createElement("span");h.className=k.toThemeProperty("jqx-widget jqx-slider-label");h.style.position="absolute";h.style.visibility="hidden";if(k.tickLabelStyleSettings){var e=k.tickLabelStyleSettings;h.style.fontSize=e.fontSize;h.style.fontFamily=e.fontFamily;h.style.fontWeight=e.fontWeight;h.style.fontStyle=e.fontStyle}var s,t;s=k._formatLabel(k.min);t=k._formatLabel(k.max);var d=a.jqx.browser.msie?0:1;document.body.appendChild(h);h.innerHTML=s;var r=h["scroll"+v]+d;h.innerHTML=t;var i=h["scroll"+v]+d;h.parentNode.removeChild(h);var c=Math.max(i,r),j=0;if(c>105){j=(c-105)/100}c*=1.5+j;var b=k._getTrackSize();if(b>64&&k.showButtons===false){b-=64}var g=Math.round(b/c),o,q,l,p,n;if(g===0){g=1}if(f===true){g*=4}if(k.int64===false){o=k.max-k.min;q=Math.floor(u(o)-u(g));l=Math.pow(10,q);p=g*l;if(o<2*p){m=1}else{if(o<3*p){m=2}else{if(o<7*p){m=5}else{m=10}}}n=m*l}else{o=new BigNumber(k.max).subtract(new BigNumber(k.min));q=Math.floor(u(o.toString())-u(g));l=new BigNumber(10).pow(new BigNumber(q));p=new BigNumber(g).multiply(l);if(o.compare(new BigNumber(2*p))===-1){m=1}else{if(o.compare(new BigNumber(3*p))===-1){m=2}else{if(o.compare(new BigNumber(7*p))===-1){m=5}else{m=10}}}n=new BigNumber(m).multiply(l);if(n.compare(1)===-1){n=new BigNumber(1)}if(k.int64==="s"){n=new a.jqx.math().fromString(n.toString())}}return n},_formatLabel:function(f,e){var d=this,b=e!==true?d.tickLabelFormatFunction:d.tooltipFormatFunction,g=e!==true?d.tickLabelFormatSettings:d.tooltipFormatSettings,c;if(b){c=b(f)}else{if(g){if(g.radix!==undefined){c=new a.jqx.math().getRadixValue(f,d.int64,g.radix)}else{if(g.outputNotation!==undefined&&g.outputNotation!=="default"&&g.outputNotation!=="decimal"){c=new a.jqx.math().getDecimalNotation(f,g.outputNotation,g.decimalDigits,g.digits)}else{if(g.decimalDigits!==undefined){c=Number(f).toFixed(g.decimalDigits)}else{if(g.digits!==undefined){c=Number(Number(f).toPrecision(g.digits)).toString()}}}}}else{c=f}}return c},_addTicks:function(r,g){var n=this;if(!n.showTicks){return}var z=parseInt(r.style[n._getSetting("size")],10),f,u=(n.layout==="normal"&&n.orientation==="horizontal"&&n.rtl===false)||(n.layout==="reverse"&&n.orientation==="vertical"),e,x,q,l,I,d,o,B,F,b,G,C;var J="";if(n.int64===false){l=n.max-n.min;if(n.tickMode==="default"){if(n.niceInterval){x=n._getNiceInterval();q=n._getNiceInterval(true)}else{x=n.ticksFrequency;q=n.minorTicksFrequency}I=Math.round(l/x);d=Math.round(l/q)}else{if(n.tickMode==="tickNumber"){I=n.tickNumber;d=n.minorTickNumber;x=Math.round(l/I)}}B=n.min;F=n.max}else{if(n.int64==="s"){l=n._max64.subtract(n._min64);if(n.tickMode==="default"){if(n.niceInterval){x=n._getNiceInterval();q=n._getNiceInterval(true)}else{x=n._ticksFrequency64;q=n._minorTicksFrequency64}I=l.div(x).toNumber();d=l.div(q).toNumber()}else{if(n.tickMode==="tickNumber"){I=n.tickNumber;d=n.minorTickNumber;x=l.div(new a.jqx.math().fromNumber(I))}}B=n._min64.toString();F=n._max64.toString()}else{if(n.int64==="u"){l=n._max64.subtract(n._min64);if(n.tickMode==="default"){if(n.niceInterval){x=n._getNiceInterval();q=n._getNiceInterval(true)}else{x=n._ticksFrequency64;q=n._minorTicksFrequency64}I=parseInt(l.divide(x).toString(),10);d=parseInt(l.divide(q).toString(),10)}else{if(n.tickMode==="tickNumber"){I=n.tickNumber;d=n.minorTickNumber;x=l.divide(new BigNumber(I)).intPart()}}B=n._min64.toString();F=n._max64.toString()}}}var j=z/I;o=z/d;r.innerHTML="";if(u){e=n._formatLabel(B)}else{e=n._formatLabel(F)}var E=document.createElement("span");E.style.visibility="hidden";E.className=n.toThemeProperty("jqx-widget jqx-widget-content jqx-slider");if(n.tickLabelStyleSettings){var c=n.tickLabelStyleSettings;E.style.fontSize=c.fontSize;E.style.fontFamily=c.fontFamily;E.style.fontWeight=c.fontWeight;E.style.fontStyle=c.fontStyle}document.body.appendChild(E);E.innerHTML="0";var D={width:E.offsetWidth,height:E.offsetHeight};E.parentNode.removeChild(E);var v=parseInt(r.style[n._getSetting("oSize")],10);var w=n.orientation==="horizontal"?n.padding.left:0;J+=n._addTick(r,w,n.min,v,e,D,false,g);var h=document.createElement("span");h.className=n.toThemeProperty("jqx-widget");h.style.position="absolute";h.style.visibility="hidden";document.body.appendChild(h);h.innerHTML=n.min.toString();b=n.orientation==="horizontal"?h.offsetWidth:h.offsetHeight;var p=0,t=0;if(n.tickMode==="default"&&n.niceInterval===true){var k,H;if(n.int64===false){if(u){k=n.min;H=k-(k%x)+x;p=H-k}else{k=n.max;H=k-(k%x);p=k-H}t=p/x*j}else{var m=new BigNumber(x.toString());if(u){k=new BigNumber(n.min);H=k.subtract(k.mod(m)).add(m);p=H.subtract(k)}else{k=new BigNumber(n.max);H=k.subtract(k.mod(m));p=k.subtract(H)}t=parseFloat(p.divide(m).multiply(j).toString())}var s=true;if(b>=t){s=false}if(H.toString()!==n.max.toString()&&t<z){var y=n._formatLabel(H.toString());J+=n._addTick(r,t+w,H,v,y,D,false,g,s)}}for(G=1;G<I;G++){f=G*j+t;f=Math.floor(f);var A;if(n.int64===false){if(u){A=n.min+x*G+p}else{A=n.max-x*G-p}}else{if(n.int64==="s"){if(u){A=n._min64.add(x.multiply(new a.jqx.math().fromString(G.toString(),10))).add(new a.jqx.math().fromString(p.toString(),10)).toString()}else{A=n._max64.subtract(x.multiply(new a.jqx.math().fromString(G.toString(),10))).subtract(new a.jqx.math().fromString(p.toString(),10)).toString()}}else{if(n.int64==="u"){if(u){A=n._min64.add(x.multiply(G)).add(p).toString()}else{A=n._max64.subtract(x.multiply(G)).subtract(p).toString()}}}}if(A.toString()!==n.max.toString()){e=n._formatLabel(A.toString()),C=true;if(n.tickMode==="default"&&n.niceInterval===true){h.innerHTML=e;b=n.orientation==="horizontal"?h.offsetWidth:h.offsetHeight;if(f+b>=I*j){C=false}}J+=n._addTick(r,f+w,G,v,e,D,false,g,C)}}if(n.showMinorTicks){for(G=1;G<d;G++){f=G*o;f=Math.floor(f);e="";J+=n._addTick(r,f+w,G,v,e,D,true,g)}}if(u){e=n._formatLabel(F)}else{e=n._formatLabel(B)}J+=n._addTick(r,I*j+w,n.max,v,e,D,false,g);r.innerHTML=J;h.parentNode.removeChild(h)},_addTick:function(p,z,t,r,c,v,g,d,u){var k=this;var l="",j;l=k.toThemeProperty("jqx-slider-tick");l+=" "+k.toThemeProperty("jqx-fill-state-pressed");if(k.template){l+=" "+k.toThemeProperty("jqx-"+k.template)}var i;var q=k._getSetting("top");var m="2px";var s=k.tickSize;if(g){s=k.minorTickSize}if(p!==k._bottomTicks){m=r-s-2+"px"}if(k.orientation==="horizontal"){i='<div style="'+q+": "+m+"; "+k._getSetting("oSize")+":  "+s+"px; float: left; position:absolute; left:"+z+'px;" class="'+k.toThemeProperty("jqx-slider-tick-horizontal")+" "+l+'"></div>';if(k.showTickLabels){if(p!==k._bottomTicks){m=r-s-v.height-2+"px"}else{m=2+s+"px"}var n=v.width*c.toString().length;n=n/2;j=z-n;if(u!==false){var e="",y="",o="",f="";if(k.tickLabelStyleSettings){var b=k.tickLabelStyleSettings;if(b.fontSize){e=b.fontSize}if(b.fontFamily){y=b.fontFamily}if(b.fontWeight){o=b.fontWeight}if(b.fontStyle){f=b.fontStyle}}i+='<div class="'+k.toThemeProperty("jqx-slider-label jqx-slider-label-"+d)+'" style="'+q+": "+m+"; float: left; position:absolute; left:"+j+"px; white-space: nowrap; font-size: "+e+"; font-family: "+y+"; font-weight: "+o+"; font-style: "+f+'">'+c+"</div>"}}}else{i='<div style="'+q+": "+m+"; "+k._getSetting("oSize")+":  "+s+"px; float: none; position:absolute; top:"+z+'px;" class="'+k.toThemeProperty("jqx-slider-tick-vertical")+" "+l+'"></div>';if(k.showTickLabels){if(p!==k._bottomTicks){m=r-s-c.toString().length*v.width-6+"px"}else{m=6+s+"px"}var x=v.height;x=x/2;j=z-x;if(u!==false){i+='<div class="'+k.toThemeProperty("jqx-slider-label jqx-slider-label-"+d)+'" style="'+q+": "+m+"; float: none; position:absolute; top:"+j+'px;">'+c+"</div>"}}}return i},_addRangeBar:function(){var b=this;if(b._rangeBar===null||b._rangeBar.length<1){b._rangeBar=document.createElement("div");b._rangeBar.className=b.toThemeProperty("jqx-slider-rangebar jqx-fill-state-pressed jqx-rc-all");if(b.template){b._rangeBar.className+=" "+b.toThemeProperty("jqx-"+b.template)}b._helpers.rangeBar=new jqxHelper(b._rangeBar);b._track.appendChild(b._rangeBar)}if(!b.showRange){b._rangeBar.style.display="none"}else{b._rangeBar.style.display="block"}b._thumbSize=b._slider.left.offsetWidth},_getLeftDisplacement:function(){if(!this.showButtons){return 0}if(this.rangeSlider){return 0}switch(this.buttonsPosition){case"left":return this._leftButton[this._getSetting("outerSize")](true)+this._rightButton[this._getSetting("outerSize")](true);case"right":return 0;default:return this._leftButton[this._getSetting("outerSize")](true)}return 0},_performLayout:function(){var c=this;if(c.width!==null&&c.width.toString().indexOf("px")!==-1){c.element.style.width=parseInt(c.width,10)+"px"}else{if(c.width!==undefined&&!isNaN(c.width)){c.element.style.width=parseInt(c.width,10)+"px"}}if(c.height!==null&&c.height.toString().indexOf("px")!==-1){c.element.style.height=parseInt(c.height,10)+"px"}else{if(c.height!==undefined&&!isNaN(c.height)){c.element.style.height=parseInt(c.height,10)+"px"}}var g=false;if(c.width!==null&&c.width.toString().indexOf("%")!==-1){g=true;c._helpers.element.width(c.width)}if(c.height!==null&&c.height.toString().indexOf("%")!==-1){g=true;c._helpers.element.height(c.height)}var b=c._helpers.element.innerHeight();if(c._getSetting("size")==="width"){b=c._helpers.element.innerWidth()}c._performButtonsLayout();c._performTrackLayout(b-8);c._contentWrapper.style[c._getSetting("size")]=c._track.style[c._getSetting("size")];c._contentWrapper.style[c._getSetting("oSize")]=c.element.style[c._getSetting("oSize")];c._performTicksLayout();c._performRangeBarLayout();var e=c.padding;if(c.orientation==="horizontal"){c._contentWrapper.style.position="absolute";c._contentWrapper.style.left="0px";c._contentWrapper.style.top="0px";if(c.showButtons&&!c.rangeSlider){c._contentWrapper.style.left=4+c._helpers.leftButton.outerWidth(true)+"px";c._leftButton.style.left=e.left+"px";c._rightButton.style.right=e.right+"px";if(c.buttonsPosition==="left"){c._contentWrapper.style.left=2+2*c._helpers.leftButton.innerWidth()+c._helpers.left.innerWidth()/2+"px";c._rightButton.style.left=1+c._helpers.leftButton.innerWidth()+"px"}else{if(c.buttonsPosition==="right"){c._contentWrapper.style.left=c._helpers.left.innerWidth()/2+"px";c._leftButton.style.left="";c._leftButton.style.right=1+e.right+c._helpers.leftButton.innerWidth()+"px";c._rightButton.style.right=c._leftButton.style.right-c._helpers.leftButton.innerWidth()+"px"}}}if(!c.showButtons||c.rangeSlider){var f=(2+Math.ceil(c.sliderButtonSize/2));c._contentWrapper.style.left=f+"px"}}else{c._contentWrapper.style.position="absolute";c._contentWrapper.style.left="0px";c._contentWrapper.style.top="0px";if(c.showButtons&&!c.rangeSlider){c._contentWrapper.style.top=1+c._helpers.leftButton.outerHeight(true)+"px";c._leftButton.style.top="0px";c._rightButton.style.bottom="0px";c._leftButton.style.left="";c._leftButton.style.right="";c._rightButton.style.left="";c._rightButton.style.right="";if(c.buttonsPosition==="left"){c._contentWrapper.style.top=2+2*c._helpers.leftButton.innerHeight()+c._helpers.left.innerHeight()/2+"px";c._rightButton.style.top=1+c._helpers.leftButton.innerHeight()+"px"}else{if(c.buttonsPosition==="right"){c._contentWrapper.style.top=c._helpers.left.innerHeight()/2+"px";c._leftButton.style.top="";c._leftButton.style.bottom=1+c._helpers.leftButton.innerHeight()+"px";c._rightButton.style.bottom=c._leftButton.style.bottom-c._helpers.leftButton.innerHeight()+"px"}}}if(!c.showButtons||c.rangeSlider){var f=(2+Math.ceil(c.sliderButtonSize/2));c._contentWrapper.style.top=f+"px"}}if(c.rangeSlider){c._slider.left.style.visibility="visible"}else{c._slider.left.style.visibility="hidden"}c._refreshRangeBar();if(c.orientation==="vertical"){if(c.showButtons){var d=(c._leftButton.offsetWidth-c._track.offsetWidth)/2;c._track.style.marginLeft=1+"px"}}c._editableLabels()},_performTrackLayout:function(b){var d=this;var c=b;if(d.showButtons&&!d.rangeSlider){if(d.orientation==="horizontal"){c-=(d._helpers.leftButton.innerWidth()+d._helpers.rightButton.innerWidth()+4)}else{c-=(d._helpers.leftButton.innerHeight()+d._helpers.rightButton.innerHeight()+4)}}if(d.rangeSlider||!d.showButtons){var e=(2+Math.ceil(d.sliderButtonSize/2));c=b-2*e}if(d.orientation==="horizontal"){c=c-(d.padding.left+d.padding.right);c-=d._helpers.left.outerWidth()-2}else{c-=d._helpers.left.outerHeight()-2}d._track.style[d._getSetting("size")]=c+"px";d._track.style.left=d.padding.left+"px";d._slider.left.style.left="0px";d._slider.left.style.top="0px";d._slider.right.style.left="0px";d._slider.right.style.top="0px"},_performTicksLayout:function(){var b=this;b._performTicksContainerLayout();b._addTicks(this._topTicks,"top");b._addTicks(this._bottomTicks,"bottom");b._topTicks.style.visibility="hidden";b._bottomTicks.style.visibility="hidden";if((b.ticksPosition==="top"||b.ticksPosition==="both")&&b.showTicks){b._topTicks.style.visibility="visible"}if((b.ticksPosition==="bottom"||b.ticksPosition==="both")&&b.showTicks){b._bottomTicks.style.visibility="visible"}},_performTicksContainerLayout:function(){var c=this;var b;if(c.orientation==="horizontal"){c._topTicks.style.width=c._track.style.width;c._bottomTicks.style.width=c._track.style.width;b=-2+(parseInt(c.element.style.height,10)-c._helpers.track.outerHeight())/2;c._topTicks.style.height=b+"px";c._bottomTicks.style.height=b+"px";c._topTicks.style["float"]="none";c._track.style["float"]="none";c._bottomTicks.style["float"]="none"}else{c._topTicks.style.height=c._track.style.height;c._bottomTicks.style.height=c._track.style.height;b=-2+(parseInt(c.element.style.width,10)-c._helpers.track.outerWidth())/2;c._topTicks.style.width=b+"px";c._bottomTicks.style.width=b+"px";c._topTicks.style["float"]="left";c._track.style["float"]="left";c._bottomTicks.style["float"]="left"}},_performButtonsLayout:function(){this._updateButtonsVisibilityStyles();this._updateButtonsVisibilityClasses();this._updateButtonsVisibilityHover();this._centerElement(this._rightButton);this._centerElement(this._leftButton);this._layoutButtons()},_centerElement:function(c){var d=new jqxHelper(c);c.style.marginLeft="0px";c.style.marginTop="0px";c.style.marginRight="0px";c.style.marginBottom="0px";var b=(parseFloat(this.element.style[this._getSetting("oSize")])-parseFloat(d[this._getSetting("outerOSize")]()))/2;if(this.orientation==="horizontal"){c.style.marginLeft="0px";c.style.marginTop=b+"px"}else{c.style.marginTop="0px;";c.style.marginLeft=b+"px"}return c},_updateButtonsVisibilityStyles:function(){var b=this;b._leftButton.style.backgroundPosition="center";b._rightButton.style.backgroundPosition="center";if(b.orientation==="vertical"){b._leftButton.style["float"]="none";b._rightButton.style["float"]="none"}b._leftButton.style.position="absolute";b._rightButton.style.position="absolute"},_updateButtonsVisibilityClasses:function(){var c=this;var b={prev:"left",next:"right"};if(c.orientation==="vertical"){b={prev:"up",next:"down"}}c._helpers.leftButton.addClass(c.toThemeProperty("jqx-rc-all jqx-slider-button"));c._helpers.rightButton.addClass(c.toThemeProperty("jqx-rc-all jqx-slider-button"));c._leftArrow=c._leftButton.firstChild;c._rightArrow=c._rightButton.firstChild;c._helpers.leftArrow=new jqxHelper(c._leftArrow);c._helpers.rightArrow=new jqxHelper(c._rightArrow);c._helpers.leftArrow.removeClass(c.toThemeProperty("jqx-icon-arrow-left"));c._helpers.rightArrow.removeClass(c.toThemeProperty("jqx-icon-arrow-right"));c._helpers.leftArrow.removeClass(c.toThemeProperty("jqx-icon-arrow-up"));c._helpers.rightArrow.removeClass(c.toThemeProperty("jqx-icon-arrow-down"));c._helpers.leftArrow.addClass(c.toThemeProperty("jqx-icon-arrow-"+b.prev));c._helpers.rightArrow.addClass(c.toThemeProperty("jqx-icon-arrow-"+b.next))},_updateButtonsVisibilityHover:function(){var c=this,b={prev:"left",next:"right"};if(c.orientation==="vertical"){b={prev:"up",next:"down"}}c.removeHandler(a(document),"mouseup.arrow"+c.element.id);c.addHandler(a(document),"mouseup.arrow"+c.element.id,function(){c._helpers.leftArrow.removeClass(c.toThemeProperty("jqx-icon-arrow-"+b.prev+"-selected"));c._helpers.rightArrow.removeClass(c.toThemeProperty("jqx-icon-arrow-"+b.next+"-selected"));if(c.sliderTooltip){if(c.sliderTooltipTimer){clearTimeout(c.sliderTooltipTimer)}c.sliderTooltipTimer=setTimeout(function(){if(!c.isMaterialized()){c.sliderTooltipObj.fadeOut("fast")}a(c.sliderTooltipObj).removeClass("show");a(c.sliderTooltipObj).addClass("hide");c._mouseDown=false},c.tooltipHideDelay)}else{c._mouseDown=false}if(c.isMaterialized()){c._refreshRangeBar();setTimeout(function(){c._refreshRangeBar()},200)}});c.removeHandler(c._leftButton,"mousedown."+c.element.id);c.removeHandler(c._leftButton,"mouseup."+c.element.id);c.removeHandler(c._leftButton,"mouseenter."+c.element.id);c.removeHandler(c._leftButton,"mouseleave."+c.element.id);c.removeHandler(c._rightButton,"mousedown."+c.element.id);c.removeHandler(c._rightButton,"mouseup."+c.element.id);c.removeHandler(c._rightButton,"mouseenter."+c.element.id);c.removeHandler(c._rightButton,"mouseleave."+c.element.id);c.addHandler(c._leftButton,"mousedown."+c.element.id,function(){if(!c.disabled){c._helpers.leftArrow.addClass(c.toThemeProperty("jqx-icon-arrow-"+b.prev+"-selected"));c._mouseDown=true}});c.addHandler(c._leftButton,"mouseup."+c.element.id,function(){if(!c.disabled){c._helpers.leftArrow.removeClass(c.toThemeProperty("jqx-icon-arrow-"+b.prev+"-selected"))}});c.addHandler(c._leftButton,"mouseenter."+c.element.id,function(){if(!c.disabled){c._helpers.leftArrow.addClass(c.toThemeProperty("jqx-icon-arrow-"+b.prev+"-hover"))}});c.addHandler(c._leftButton,"mouseleave."+c.element.id,function(){if(!c.disabled){c._helpers.leftArrow.removeClass(c.toThemeProperty("jqx-icon-arrow-"+b.prev+"-hover"))}});c.addHandler(c._rightButton,"mousedown."+c.element.id,function(){if(!c.disabled){c._helpers.rightArrow.addClass(c.toThemeProperty("jqx-icon-arrow-"+b.next+"-selected"));c._mouseDown=true}});c.addHandler(c._rightButton,"mouseup."+c.element.id,function(){if(!c.disabled){c._helpers.rightArrow.removeClass(c.toThemeProperty("jqx-icon-arrow-"+b.next+"-selected"))}});c.addHandler(c._rightButton,"mouseenter."+c.element.id,function(){if(!c.disabled){c._helpers.rightArrow.addClass(c.toThemeProperty("jqx-icon-arrow-"+b.next+"-hover"))}});c.addHandler(c._rightButton,"mouseleave."+c.element.id,function(