/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(c){c.jqx.jqxWidget("jqxTreeMap","",{});var d={};d["default"]=(function(){function g(r,s,q,p){this.height=p;this.width=q;this.xoffset=r;this.yoffset=s;this.shortestEdge=function(){return Math.min(this.height,this.width)};this.getCoordinates=function(y){var x=[],v=this.xoffset,z=this.yoffset,w=j(y)/this.height,u=j(y)/this.width;if(this.width>=this.height){for(var t=0;t<y.length;t+=1){x.push([v,z,v+w,z+y[t]/w]);z=z+y[t]/w}}else{for(var t=0;t<y.length;t+=1){x.push([v,z,v+y[t]/u,z+u]);v=v+y[t]/u}}return x};this.cutArea=function(w){var y;if(this.width>=this.height){var x=w/this.height,t=this.width-x;y=new g(this.xoffset+x,this.yoffset,t,this.height)}else{var v=w/this.width,u=this.height-v;y=new g(this.xoffset,this.yoffset+v,this.width,u)}return y}}function o(t,r){var s=[],q=j(t),u=r/q;for(var p=0;p<t.length;p+=1){s[p]=t[p]*u}return s}function e(s,q,x,u,p){u=(typeof u==="undefined")?0:u;p=(typeof p==="undefined")?0:p;var v=[],w,t=[];if(h(s[0])){for(var r=0;r<s.length;r+=1){v[r]=i(s[r])}w=m(v,q,x,u,p);for(var r=0;r<s.length;r+=1){t.push(e(s[r],w[r][2]-w[r][0],w[r][3]-w[r][1],w[r][0],w[r][1]))}}else{t=m(s,q,x,u,p)}return t}function m(s,r,p,t,u){t=(typeof t==="undefined")?0:t;u=(typeof u==="undefined")?0:u;var q=f(o(s,r*p),[],new g(t,u,r,p),[]);return n(q)}function n(r){var s=[];for(var q=0;q<r.length;q+=1){for(var p=0;p<r[q].length;p+=1){s.push(r[q][p])}}return s}function f(u,t,q,p){var s,r,v;if(u.length===0){p.push(q.getCoordinates(t));return}s=q.shortestEdge();r=u[0];if(l(t,r,s)){t.push(r);f(u.slice(1),t,q,p)}else{v=q.cutArea(j(t),p);p.push(q.getCoordinates(t));f(u,[],v,p)}return p}function l(t,q,r){var s;if(t.length===0){return true}s=t.slice();s.push(q);var u=k(t,r),p=k(s,r);return u>=p}function k(t,s){var q=Math.min.apply(Math,t),p=Math.max.apply(Math,t),r=j(t);return Math.max(Math.pow(s,2)*p/Math.pow(r,2),Math.pow(r,2)/(Math.pow(s,2)*q))}function h(p){return p&&p.constructor===Array}function j(p){var r=0;for(var q=0;q<p.length;q+=1){r+=p[q]}return r}function i(p){var r=0;if(h(p[0])){for(var q=0;q<p.length;q+=1){r+=i(p[q])}}else{r=j(p)}return r}return e}());function b(g,l,i,h,j,f,k,e){this.label=g;this.value=l;this.parent=i;this.children=h;this.area=j||null;this.color=f;this.data=k;this.record=e}var a={HORIZONTAL:0,VERTICAL:1,BOTH:2};c.extend(c.jqx._jqxTreeMap.prototype,{defineInstance:function(){var e={width:600,height:600,renderCallbacks:{},legendScaleCallback:function(f){return f},hoverEnabled:false,selectionEnabled:true,singleSelection:true,showLegend:true,legendLabel:"Legend",headerHeight:25,colorRange:100,layout:"default",source:[],displayMember:null,valueMember:null,colorMode:"parent",baseColor:"#C2EEFF",legendPosition:{x:0,y:0},colorRanges:[{color:"#aa9988",min:0,max:10},{color:"#ccbbcc",min:11,max:50},{color:"#000",min:50,max:100}],_root:[]};if(this===c.jqx._jqxTreeMap.prototype){return e}c.extend(true,this,e);return e},createInstance:function(){this.render()},render:function(){this.host.addClass(this.toThemeProperty("jqx-widget"));this._destroy();this._root=new b(undefined,0,null,[],this.host);var e=function(h,k){var n={},l;var m=null;for(var j=0;j<h.length;j+=1){if(h[j].items){m=true;break}}var f=new Array();if(m){var g=function(v,s){for(var q=0;q<v.length;q+=1){v[q].parent=s;if(!v[q].data){v[q].data=v[q].value}if(v[q].value==null){v[q].value=0}if(isNaN(parseFloat(v[q].value))){var w=v[q].value.toString();var u="";for(var p=0;p<w.length;p++){var r=w.substring(p,p+1);if(r.match(/^[0-9]+$/)!=null||r=="."){u+=r}}v[q].value=new Number(u)}else{v[q].value=parseFloat(v[q].value)}f.push(v[q]);if(v[q].items){g(v[q].items,v[q].label)}}};g(h,null);h=f}for(var j=0;j<h.length;j+=1){l=h[j];if(l.value){if(l.parent!=null){if(!n[l.parent]){n[l.parent]=0}n[l.parent]+=l.value}}}for(var j=0;j<h.length;j+=1){l=h[j];if(n[l.label]!==undefined){l.value=n[l.label]}}k._buildTree(h,k._root);k._dataList=k._buildList();k._setStyles();var o=d["default"];if(k.layout==="simple"){o=d.simple}k._render(k._root,o);k._renderLegend()};if(c.jqx.dataAdapter&&this.source!=null&&this.source._source){this.dataBind(this.source,e);return}e(this.source,this);this._tri