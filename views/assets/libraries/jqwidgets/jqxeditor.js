/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(b){b.jqx.jqxWidget("jqxEditor","",{});b.extend(b.jqx._jqxEditor.prototype,{defineInstance:function(){var d={width:null,height:null,disabled:false,pasteMode:"html",editable:true,lineBreak:"default",changeType:null,toolbarPosition:"top",fontFamily:"sans-serif",commands:{bold:{tooltip:"Bold",command:"bold",type:"toggleButton"},italic:{tooltip:"Italic",command:"italic",type:"toggleButton"},underline:{tooltip:"Underline",command:"underline",type:"toggleButton"},format:{placeHolder:"Format Block",tooltip:"Format Block",command:"formatblock",value:[{value:"p",label:"Paragraph"},{value:"h1",label:"Header 1"},{value:"h2",label:"Header 2"},{value:"h3",label:"Header 3"},{value:"h4",label:"Header 4"}],type:"list",width:120,dropDownWidth:190,height:25},font:{placeHolder:"Font",tooltip:"Font Name",command:"fontname",value:[{label:"Arial",value:"Arial, Helvetica, sans-serif"},{label:"Comic Sans MS",value:'"Comic Sans MS", cursive, sans-serif'},{label:"Courier New",value:'"Courier New", Courier, monospace'},{label:"Georgia",value:"Georgia,serif"},{label:"Impact",value:"Impact,Charcoal,sans-serif"},{label:"Lucida Console",value:"'Lucida Console',Monaco,monospace"},{label:"Tahoma",value:"Tahoma,Geneva,sans-serif"},{label:"Times New Roman",value:"'Times New Roman',Times,serif"},{label:"Trebuchet MS",value:'"Trebuchet MS",Helvetica,sans-serif'},{label:"Verdana",value:"Verdana,Geneva,sans-serif"}],type:"list",width:160,height:25,dropDownWidth:160},size:{placeHolder:"Size",tooltip:"Font Size",command:"fontsize",value:[{label:"1 (8pt)",value:"xx-small"},{label:"2 (10pt)",value:"x-small"},{label:"3 (12pt)",value:"small"},{label:"4 (14pt)",value:"medium"},{label:"5 (18pt)",value:"large"},{label:"6 (24pt)",value:"x-large"},{label:"7 (36pt)",value:"xx-large"}],type:"list",width:45,height:25,dropDownWidth:160},color:{tooltip:"Text Color",command:"forecolor",value:"#000",type:"colorPicker"},background:{tooltip:"Fill Color",command:"backcolor",value:"#fff",type:"colorPicker"},left:{tooltip:"Align Left",command:"justifyleft",type:"toggleButton"},center:{tooltip:"Align Center",command:"justifycenter",type:"toggleButton"},right:{tooltip:"Align Right",command:"justifyright",type:"toggleButton"},outdent:{tooltip:"Indent Less",command:"outdent",type:"button"},indent:{tooltip:"Indent More",command:"indent",type:"button"},ul:{tooltip:"Insert unordered list",command:"insertunorderedlist",type:"toggleButton"},ol:{tooltip:"Insert ordered list",command:"insertorderedlist",type:"toggleButton"},image:{tooltip:"Insert image",command:"insertimage",type:"button"},link:{tooltip:"Insert link",command:"createlink",type:"toggleButton"},html:{tooltip:"View source",command:"viewsource",type:"toggleButton"},clean:{tooltip:"Remove Formatting",command:"removeformat",type:"button"}},createCommand:null,defaultLocalization:{bold:"Bold",italic:"Italic",underline:"Underline",format:"Format Block",font:"Font Name",size:"Font Size",color:"Text Color",background:"Fill Color",left:"Align Left",center:"Align Center",right:"Align Right",outdent:"Indent Less",indent:"Indent More",ul:"Insert unordered list",ol:"Insert ordered list",image:"Insert image",link:"Insert link",html:"View source",clean:"Remove Formatting",Remove:"Remove",Ok:"Ok",Cancel:"Cancel",Change:"Change","Go to link":"Go to link","Open in a new window/tab":"Open in a new window/tab",Align:"Align",VSpace:"VSpace",HSpace:"HSpace",Width:"Width",Height:"Height",Title:"Title",URL:"URL","Insert Image":"Insert Image","Insert Link":"Insert Link","Alt Text":"Alt Text","not set":"&ltnot set&gt",Left:"Left",Right:"Right",Paragraph:"Paragraph",Header:"Header",Arial:"Arial","Comic Sans MS":"Comic Sans MS","Courier New":"Courier New",Georgia:"Georgia",Impact:"Impact","Lucida Console":"Lucida Console",Tahoma:"Tahoma","Times New Roman":"Times New Roman","Trebuchet MS":"Trebuchet MS",Verdana:"Verdana"},localization:null,tools:"bold italic underline | format font size | color background | left center right | outdent indent | ul ol | image | link | clean | html",readOnly:false,stylesheets:new Array(),rtl:false,colorPickerTemplate:'<div class="jqx-editor-color-picker"><div role="grid"><table class="jqx-editor-color-picker-table" cellspacing="0" cellpadding="0"><tbody><tr><td aria-label="RGB (0, 0, 0)"><div title="RGB (0, 0, 0)" style="background-color: rgb(0, 0, 0);"></div></td><td aria-label="RGB (68, 68, 68)"><div title="RGB (68, 68, 68)" style="background-color: rgb(68, 68, 68);"></div></td><td aria-label="RGB (102, 102, 102)"><div title="RGB (102, 102, 102)" style="background-color: rgb(102, 102, 102);"></div></td><td aria-label="RGB (153, 153, 153)"><div title="RGB (153, 153, 153)" style="background-color: rgb(153, 153, 153);"></div></td><td aria-label="RGB (204, 204, 204)"><div title="RGB (204, 204, 204)" style="background-color: rgb(204, 204, 204);"></div></td><td aria-label="RGB (238, 238, 238)"><div title="RGB (238, 238, 238)" style="background-color: rgb(238, 238, 238);"></div></td><td aria-label="RGB (243, 243, 243)"><div title="RGB (243, 243, 243)" style="background-color: rgb(243, 243, 243);"></div></td><td aria-label="RGB (255, 255, 255)"><div title="RGB (255, 255, 255)" style="background-color: rgb(255, 255, 255);"></div></td></tr></tbody></table></div><div role="grid"><table class="jqx-editor-color-picker-table" cellspacing="0" cellpadding="0"><tbody><tr><td aria-label="RGB (255, 0, 0)"><div title="RGB (255, 0, 0)" style="background-color: rgb(255, 0, 0);"></div></td><td aria-label="RGB (255, 153, 0)"><div title="RGB (255, 153, 0)" style="background-color: rgb(255, 153, 0);"></div></td><td aria-label="RGB (255, 255, 0)"><div title="RGB (255, 255, 0)" style="background-color: rgb(255, 255, 0);"></div></td><td aria-label="RGB (0, 255, 0)"><div title="RGB (0, 255, 0)" style="background-color: rgb(0, 255, 0);"></div></td><td aria-label="RGB (0, 255, 255)"><div title="RGB (0, 255, 255)" style="background-color: rgb(0, 255, 255);"></div></td><td aria-label="RGB (0, 0, 255)"><div title="RGB (0, 0, 255)" style="background-color: rgb(0, 0, 255);"></div></td><td aria-label="RGB (153, 0, 255)"><div title="RGB (153, 0, 255)" style="background-color: rgb(153, 0, 255);"></div></td><td aria-label="RGB (255, 0, 255)"><div title="RGB (255, 0, 255)" style="background-color: rgb(255, 0, 255);"></div></td></tr></tbody></table></div><div role="grid"><table class="jqx-editor-color-picker-table" cellspacing="0" cellpadding="0"><tbody><tr><td aria-label="RGB (244, 204, 204)"><div title="RGB (244, 204, 204)" style="background-color: rgb(244, 204, 204);"></div></td><td aria-label="RGB (252, 229, 205)"><div title="RGB (252, 229, 205)" style="background-color: rgb(252, 229, 205);"></div></td><td aria-label="RGB (255, 242, 204)"><div title="RGB (255, 242, 204)" style="background-color: rgb(255, 242, 204);"></div></td><td aria-label="RGB (217, 234, 211)"><div title="RGB (217, 234, 211)" style="background-color: rgb(217, 234, 211);"></div></td><td aria-label="RGB (208, 224, 227)"><div title="RGB (208, 224, 227)" style="background-color: rgb(208, 224, 227);"></div></td><td aria-label="RGB (207, 226, 243)"><div title="RGB (207, 226, 243)" style="background-color: rgb(207, 226, 243);"></div></td><td aria-label="RGB (217, 210, 233)"><div title="RGB (217, 210, 233)" style="background-color: rgb(217, 210, 233);"></div></td><td aria-label="RGB (