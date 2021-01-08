/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(b){var a=(function(){var c={},u,q,j,l,g,h,o,p;function d(C,B,x,A,y,v,w){var z=this;if(!z){z=window.jqx}z.hierarchy=y;z.exportFormat=v;z.filename=w;C.beginFile(w);n(C);k(C);C.endFile(w);return C.getFile()}function n(z){var x=true;b.each(q,function(){if(this.hidden){x=false;return false}});z.beginHeader(x);var w=0;for(var v in q){if(q[v].columnsDataFields){v=q[v].columnsDataFields[w].displayfield}var y=m(v,q[v]);z.appendHeaderCell(q[v],v,y,x,w);w++}z.endHeader(x)}function k(y){var x=this;if(!x){x=window.jqx}y.beginBody();if(x.hierarchy){var w=function(A){for(var z=0;z<A.length;z+=1){if(A[z]!==undefined){y.hierarchy=true;y.beginRow(A[z].level);e(y,A[z],z,true);if(A[z].records){y.beginRows(A[z].level);w(A[z].records);y.endRows(A[z].level)}y.endRow(A[z].level)}}};w(u);y.endBody();return}for(var v=0;v<u.length;v+=1){if(u[v]!==undefined){e(y,u[v],v)}}y.endBody()}function e(x,A,y,D){var C=this;if(!C){C=window.jqx}var w;if(D!=true){x.beginRow()}var B=0;for(var z in q){if(q[z].columnsDataFields){z=q[z].columnsDataFields[B].displayfield}w=s(y,z);if(w){if(w.level!=undefined){if(w.index-1>A.level&&w.index-1<w.maxLevel){B++;continue}}if(w.maxLevel!=undefined){if(w.index-1==w.maxLevel){w=b.extend({},w);w.merge=w.maxLevel-A.level-1}}}if(A.level!=undefined&&A.label!=undefined){if(C.exportFormat==="xml"||C.exportFormat==="json"){var v={};v.text="group";x.appendBodyCell(A.label,v,w,A,B,"group");break}}if(A.hasOwnProperty(z)){x.appendBodyCell(A[z],q[z],w,A,B)}else{x.appendBodyCell("",q[z],w,A,B)}B++}if(D!=true){x.endRow()}}function m(w,x){if(x.style){return j[x.style]}var v=t();if(v.length>0){return v[0].style}return null}function t(){if(!g){g=new Array();b.each(j,function(v,w){g[g.length]={name:v,style:w}})}return g}function s(A,z){var B=q[z];if(B){if(B.customCellStyles){var x=B.customCellStyles[A];if(x){return j[x]}}if(B.cellStyle){if(B.cellAltStyle){var w=A%2;if(w==0){return j[B.cellStyle]}return j[B.cellAltStyle]}return j[B.cellStyle]}else{var v=t();if(v.length>0){var w=A%(v.length-1);var y=v[w+1].style;return y}}}return null}function r(y,w,x){var v=document.createElement("input");v.name=w;v.value=y;v.type="hidden";x.appendChild(v);return v}function f(x,v,w){var y=document.createElement("textarea");y.name=v;y.value=x;w.appendChild(y);return y}function i(w,z,y,v,A){var x=document.createElement("form");r(w,"filename",x);r(z,"format",x);f(y,"content",x);if(v==undefined||v==""){if(window&&window.location.toString().indexOf("jqwidgets.com")>=0){v="https://jqwidgets.com/export_server/dataexport.php"}else{v="http://jquerygrid.net/export_server/dataexport.php"}}x.action=v;x.method="post";if(A){x.acceptCharset=A}document.body.appendChild(x);return x}l=function(A,y,x,w,z,v){if(!(this instanceof a)){return new a(A,y,x,z,v)}u=A;q=y;j=x;this.exportTo=function(K,H,G,B){K=K.toString().toLowerCase();var D=c[K];if(typeof D==="undefined"){throw"You can't export to "+K+" format."}if(K==="pdf"&&B==undefined){var M=this.exportTo(K,H,K,"pdf");if(!b.jqx.pdfExport){b.jqx.pdfExport={orientation:"portrait",paperSize:"a4"}}var L=new pdfDataExport(b.jqx.pdfExport.orientation,"pt",b.jqx.pdfExport.paperSize);L.cellInitialize();var J=b(M).find("th");var I=b(M).find("tr");var N=0;L.setFontSize(13*72/96);var F=595;switch(b.jqx.pdfExport.paperSize){case"legal":var F=612;if(b.jqx.pdfExport.orientation!=="portrait"){F=1008}break;case"letter":var F=612;if(b.jqx.pdfExport.orientation!=="portrait"){F=792}break;case"a3":var F=841;if(b.jqx.pdfExport.orientation!=="portrait"){F=1190}break;case"a4":var F=595;if(b.jqx.pdfExport.orientation!=="portrait"){F=842}break;case"a5":var F=420;if(b.jqx.pdfExport.orientation!=="portrait"){F=595}break}F-=20;var E=0;var C=[];b.each(J,function(O){var P=parseInt(this.style.width);if(isNaN(P)){P=25}var Q=P*72/96;C[O]=Q;E+=Q});if(J.length===0){b.each(I[0].cells,function(O){var P=parseInt(this.style.width);if(isNaN(P)){P=F/I[0].cells.length}var Q=P*72/96;C[O]=Q;E+=Q})}if(E>F){b.each(C,function(O){C[O]=(C[O]/E)*100;C[O]=C[O]*F/100})}b.each(J,function(P){var T=C[P];var S=25*72/96;var R=L.getTextDimensions(b(this).html());var Q=b(this).html();if(R.w+3>T){var O=L.splitTextToSize(Q,T-3);var U=O[0];if(U.length>3){Q=U.substring(0,U.length-3)+"..."}else{Q=U.substring(0,1)+"..."}var O=L.splitTextToSize(Q,T-3);var U=O[0];if(U!=Q){Q=U}}L.cell(10,10,T,S,Q,N)});N++;b.each(I,function(V){if(V===0){return true}var P=b(this).children();var Q=P.length>J.length&&J.length>0;if(Q){var Y=P.length-J.length;var Z="";var X=C[0];var U=25*72/96;for(var R=0;R<=Y;R++){var O=P[R].innerHTML;if(O==="+"||O==="-"){O=O+" "}if(O==="&nbsp;"){O="   "}Z+=O}var T=L.getTextDimensions(Z);if(T.w+3>X){var W=L.splitTextToSize(Z,X-3);var S=W[0];if(S.length>3){Z=S.substring(0,S.length-3)+"..."}else{Z=S.substring(0,1)+"..."}var W=L.splitTextToSize(Z,X-3);var S=W[0];if(S!=Z){Z=S}}L.cell(10,10,X,U,Z,N);for(var R=Y+1;R<P.length;R++){var V=R-Y;var X=C[V];var U=25*72/96;var Z=b(P[R]).html();var T=L.getTextDimensions(b(P[R]).html());if(T.w+3>X){var W=L.splitTextToSize(Z,X-3);var S=W[0];if(S.length>3){Z=S.substring(0,S.length-3)+"..."}else{Z=S.substring(0,1)+"..."}var W=L.splitTextToSize(Z,X-3);var S=W[0];if(S!=Z){Z=S}}L.cell(10,10,X,U,Z,N)}N++;return true}b.each(P,function(ab){var af=C[ab];var ae=25*72/96;var ad=b(this).html();var ac=L.getTextDimensions(b(this).html());if(ac.w+3>af){var aa=L.splitTextToSize(ad,af-3);var ag=aa[0];if(ag.length>3){ad=ag.substring(0,ag.length-3)+"..."}else{ad=ag.substring(0,1)+"..."}var aa=L.splitTextToSize(ad,af-3);var ag=aa[0];if(ag!=ad){ad=ag}}L.cell(10,10,af,ae,ad,N)});N++});if(b.jqx.browser.msie&&b.jqx.browser.version<10){throw new Error("PDF export requires a browser with HTML5 support");return}return L}return d(D,u,q,j,H,G,B)};this.exportToFile=function(L,B,O,F,I){if(L==="pdf"){var N=this.exportTo(L,I,L,B);if(!b.jqx.pdfExport){b.jqx.pdfExport={orientation:"portrait",paperSize:"a4"}}var M=new pdfDataExport(b.jqx.pdfExport.orientation,"pt",b.jqx.pdfExport.paperSize);if(F=="utf-8"||F=="UTF-8"){M.setFont("courier","normal")}M.cellInitialize();var K=b(N).find("th");var J=b(N).find("tr");var P=0;M.setFontSize(13*72/96);var G=595;switch(b.jqx.pdfExport.paperSize){case"legal":var G=612;if(b.jqx.pdfExport.orientation!=="portrait"){G=1008}break;case"letter":var G=612;if(b.jqx.pdfExport.orientation!=="portrait"){G=792}break;case"a3":var G=841;if(b.jqx.pdfExport.orientation!=="portrait"){G=1190}break;case"a4":var G=595;if(b.jqx.pdfExport.orientation!=="portrait"){G=842}break;case"a5":var G=420;if(b.jqx.pdfExport.orientation!=="portrait"){G=595}break}G-=20;var E=0;var C=[];b.each(K,function(Q){var R=parseInt(this.style.width);if(isNaN(R)){R=25}var S=R*72/96;C[Q]=S;E+=S});if(K.length===0){b.each(J[0].cells,function(Q){var R=parseInt(this.style.width);if(isNaN(R)){R=G/J[0].cells.length}var S=R*72/96;C[Q]=S;E+=S})}if(E>G){b.each(C,function(Q){C[Q]=(C[Q]/E)*100;C[Q]=C[Q]*G/100})}b.each(K,function(R){var V=C[R];var U=25*72/96;var T=M.getTextDimensions(b(this).html());var S=b(this).html();if(T.w+3>V){var Q=M.splitTextToSize(S,V-3);var W=Q[0];if(W.length>3){S=W.substring(0,W.length-3)+"..."}else{S=W.substring(0,1)+"..."}var Q=M.splitTextToSize(S,V-3);var W=Q[0];if(W!=S){S=W}}M.cell(10,10,V,U,S,P)});P++;b.each(J,function(X){if(X===0){return true}var R=b(this).children();var S=R.length>K.length&&K.length>0;if(S){var aa=R.length-K.length;var ab="";var Z=C[0];var W=25*72/96;for(var T=0;T<=aa;T++){var Q=R[T].innerHTML;if(Q==="+"||Q==="-"){Q=Q+" "}if(Q==="&nbsp;"){Q="   "}ab+=Q}var V=M.getTextDimensions(ab);if(V.w+3>Z){var Y=M.splitTextToSize(ab,Z-3);var U=Y[0];if(U.length>3){ab=U.substring(0,U.length-3)+"..."}else{ab=U.substring(0,1)+"..."}var Y=M.splitTextToSize(ab,Z-3);var U=Y[0];if(U!=ab){ab=U}}M.cell(10,10,Z,W,ab,P);for(var T=aa+1;T<R.length;T++){var X=T-aa;var Z=C[X];var W=25*72/96;var ab=b(R[T]).html();if(ab==="&nbsp;"){ab="   "}var V=M.getTextDimensions(b(R[T]).html());if(V.w+3>Z){var Y=M.splitTextToSize(ab,Z-3);var U=Y[0];if(U.length>3){ab=U.substring(0,U.length-3)+"..."}else{ab=U.substring(0,1)+"..."}var Y=M.splitTextToSize(ab,Z-3);var U=Y[0];if(U!=ab){ab=U}}M.cell(10,10,Z,W,ab,P)}P++;return true}b.each(R,function(ad){var ah=C[ad];var ag=25*72/96;var af=b(this).html();if(af==="&nbsp;"){af="   "}var ae=M.getTextDimensions(b(this).html());if(ae.w+3>ah){var ac=M.splitTextToSize(af,ah-3);var ai=ac[0];if(ai.length>3){af=ai.substring(0,ai.length-3)+"..."}else{af=ai.substring(0,1)+"..."}var ac=M.splitTextToSize(af,ah-3);var ai=ac[0];if(ai!=af){af=ai}}M.cell(10,10,ah,ag,af,P)});P++});if(b.jqx.browser.msie&&b.jqx.browser.version<10){throw new Error("PDF export requires a browser with HTML5 support");return}M.save(B+".pdf");return}var H=this.exportTo(L,I,L,B),D=i(B,L,H,O,F);D.submit();document.body.removeChild(D)};this.exportToLocalFile=function(F,C,D,B){var E=this.exportTo(F,D,B);document.location.href="data:application/octet-stream;filename="+C+","+encodeURIComponent(E)}};l.extend=function(v,w){if(w instanceof b.jqx.dataAdapter.DataExportModuleBase){c[v]=w}else{throw"The module "+v+" is not instance of DataExportModuleBase."}};return l}());b.jqx.dataAdapter.ArrayExporter=a})(jqxBaseFramework);(function(b){var a=function(){this.formatData=function(f,e,c,h){if(e==="date"){var d="";if(typeof f==="string"){d=b.jqx.dataFormat.tryparsedate(f);f=d}if(f===""||f===null){return""}d=b.jqx.dataFormat.formatdate(f,c,h);if((d&&d.toString()=="NaN")||d==null){return""}f=d}else{if(e==="number"||e==="float"||e==="int"||e=="integer"){if(f===""||f===null){return""}if(!isNaN(new Number(f))){var g=b.jqx.dataFormat.formatnumber(f,c,h);if(g.toString()=="NaN"){return""}else{f=g}}}else{f=f}}if(f===null){return""}return f};this.getFormat=function(f){var c=f?f.formatString:"";var e=f?f.localization:"";var d="string";d=f?f.type:"string";if(d=="number"||d=="float"){if(!c){c="f2"}}if(d=="int"||d=="integer"){if(!c){c="n0"}}if(d=="date"){if(!c){c="d"}}return{type:d,formatString:c,localization:e}};this.beginFile=function(){throw"Not implemented!"};this.beginHeader=function(){throw"Not implemented!"};this.appendHeaderCell=function(){throw"Not implemented!"};this.endHeader=function(){throw"Not implemented!"};this.beginBody=function(){throw"Not implemented!"};this.beginRow=function(){throw"Not implemented!"};this.beginRows=function(){throw"Not implemented!"};this.endRows=function(){throw"Not implemented!"};this.appendBodyCell=function(){throw"Not implemented!"};this.endRow=function(){throw"Not implemented!"};this.endBody=function(){throw"Not implemented!"};this.endFile=function(){th