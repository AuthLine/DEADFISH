/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){if(!a.jqx.scheduler){a.jqx.scheduler={}}a.jqx.jqxWidget("jqxScheduler","",{});a.extend(a.jqx._jqxScheduler.prototype,{defineInstance:function(){var b={altRows:false,autoShowLoadElement:true,columnsHeight:30,columns:[],columnGroups:null,dataview:null,disabled:false,enableHover:true,appointmentOpacity:0.8,headerZIndex:235,height:600,timeRulerWidth:60,loadingErrorMessage:"The data is still loading and you cannot set a property or call a method. You can do that once the data binding is completed. jqxScheduler raises the 'bindingComplete' event when the binding is completed.",localization:null,ready:null,renderToolBar:null,renderAppointment:null,rendered:null,rendering:null,rtl:false,showToolbar:true,showLegend:false,legendPosition:"bottom",legendHeight:34,rowsHeight:27,touchRowsHeight:36,appointmentsMinHeight:18,touchAppointmentsMinHeight:27,appointmentsRenderMode:"default",serverProcessing:false,selectionMode:"multiplerows",scrollBarSize:a.jqx.utilities.scrollBarSize,touchScrollBarSize:a.jqx.utilities.touchScrollBarSize,showHeader:true,maxHeight:999999,maxWidth:999999,autoBind:true,showAllDayRow:true,changedAppointments:new Array(),renderMode:"simple",views:new Array(),view:0,min:new a.jqx.date(0),max:new a.jqx.date(9999,12,31),date:new a.jqx.date("todayDate"),colors:["#307DD7","#AA4643","#89A54E","#71588F","#4198AF","#7FD13B","#EA157A","#FEB80A","#00ADDC","#738AC8","#E8601A","#FF9639","#F5BD6A","#599994","#115D6E","#D02841","#FF7C41","#FFC051","#5B5F4D","#364651","#25A0DA","#309B46","#8EBC00","#FF7515","#FFAE00","#0A3A4A","#196674","#33A6B2","#9AC836","#D0E64B","#CC6B32","#FFAB48","#FFE7AD","#A7C9AE","#888A63","#3F3943","#01A2A6","#29D9C2","#BDF271","#FFFFA6","#1B2B32","#37646F","#A3ABAF","#E1E7E8","#B22E2F","#5A4B53","#9C3C58","#DE2B5B","#D86A41","#D2A825","#993144","#FFA257","#CCA56A","#ADA072","#949681","#105B63","#EEEAC5","#FFD34E","#DB9E36","#BD4932","#BBEBBC","#F0EE94","#F5C465","#FA7642","#FF1E54","#60573E","#F2EEAC","#BFA575","#A63841","#BFB8A3","#444546","#FFBB6E","#F28D00","#D94F00","#7F203B","#583C39","#674E49","#948658","#F0E99A","#564E49","#142D58","#447F6E","#E1B65B","#C8782A","#9E3E17","#4D2B1F","#635D61","#7992A2","#97BFD5","#BFDCF5","#844341","#D5CC92","#BBA146","#897B26","#55591C","#56626B","#6C9380","#C0CA55","#F07C6C","#AD5472","#96003A","#FF7347","#FFBC7B","#FF4154","#642223","#5D7359","#E0D697","#D6AA5C","#8C5430","#661C0E","#16193B","#35478C","#4E7AC7","#7FB2F0","#ADD5F7","#7B1A25","#BF5322","#9DA860","#CEA457","#B67818","#0081DA","#3AAFFF","#99C900","#FFEB3D","#309B46","#0069A5","#0098EE","#7BD2F6","#FFB800","#FF6800","#FF6800","#A0A700","#FF8D00","#678900","#0069A5"],colorSchemes:[{name:"scheme01",colors:["#307DD7","#AA4643","#89A54E","#71588F","#4198AF"]},{name:"scheme02",colors:["#7FD13B","#EA157A","#FEB80A","#00ADDC","#738AC8"]},{name:"scheme03",colors:["#E8601A","#FF9639","#F5BD6A","#599994","#115D6E"]},{name:"scheme04",colors:["#D02841","#FF7C41","#FFC051","#5B5F4D","#364651"]},{name:"scheme05",colors:["#25A0DA","#309B46","#8EBC00","#FF7515","#FFAE00"]},{name:"scheme06",colors:["#0A3A4A","#196674","#33A6B2","#9AC836","#D0E64B"]},{name:"scheme07",colors:["#CC6B32","#FFAB48","#FFE7AD","#A7C9AE","#888A63"]},{name:"scheme08",colors:["#3F3943","#01A2A6","#29D9C2","#BDF271","#FFFFA6"]},{name:"scheme09",colors:["#1B2B32","#37646F","#A3ABAF","#E1E7E8","#B22E2F"]},{name:"scheme10",colors:["#5A4B53","#9C3C58","#DE2B5B","#D86A41","#D2A825"]},{name:"scheme11",colors:["#993144","#FFA257","#CCA56A","#ADA072","#949681"]},{name:"scheme12",colors:["#105B63","#EEEAC5","#FFD34E","#DB9E36","#BD4932"]},{name:"scheme13",colors:["#BBEBBC","#F0EE94","#F5C465","#FA7642","#FF1E54"]},{name:"scheme14",colors:["#60573E","#F2EEAC","#BFA575","#A63841","#BFB8A3"]},{name:"scheme15",colors:["#444546","#FFBB6E","#F28D00","#D94F00","#7F203B"]},{name:"scheme16",colors:["#583C39","#674E49","#948658","#F0E99A","#564E49"]},{name:"scheme17",colors:["#142D58","#447F6E","#E1B65B","#C8782A","#9E3E17"]},{name:"scheme18",colors:["#4D2B1F","#635D61","#7992A2","#97BFD5","#BFDCF5"]},{name:"scheme19",colors:["#844341","#D5CC92","#BBA146","#897B26","#55591C"]},{name:"scheme20",colors:["#56626B","#6C9380","#C0CA55","#F07C6C","#AD5472"]},{name:"scheme21",colors:["#96003A","#FF7347","#FFBC7B","#FF4154","#642223"]},{name:"scheme22",colors:["#5D7359","#E0D697","#D6AA5C","#8C5430","#661C0E"]},{name:"scheme23",colors:["#16193B","#35478C","#4E7AC7","#7FB2F0","#ADD5F7"]},{name:"scheme24",colors:["#7B1A25","#BF5322","#9DA860","#CEA457","#B67818"]},{name:"scheme25",colors:["#0081DA","#3AAFFF","#99C900","#FFEB3D","#309B46"]},{name:"scheme26",colors:["#0069A5","#0098EE","#7BD2F6","#FFB800","#FF6800"]},{name:"scheme27",colors:["#FF6800","#A0A700","#FF8D00","#678900","#0069A5"]}],resources:null,contextMenu:true,contextMenuOpen:null,contextMenuClose:null,contextMenuItemClick:null,contextMenuCreate:null,timeZone:null,statuses:{free:"white",tentative:"tentative",busy:"transparent",outOfOffice:"#800080"},appointmentDataFields:{from:"from",to:"to",id:"id",calendarId:"calendarId",description:"description",location:"location",subject:"subject",background:"background",color:"color",borderColor:"borderColor",style:"style",recurrencePattern:"recurrencePattern",recurrenceException:"recurrenceException",draggable:"draggable",resizable:"resizable",resourceId:"resourceId",status:"status",tooltip:"tooltip",hidden:"hidden",allDay:"allDay",timeZone:"timeZone",ownerId:"ownerId"},appointmentTooltips:true,tableColumns:1,tableRows:1,dayNameFormat:"full",touchDayNameFormat:"abbr",toolBarRangeFormat:"dd MMMM yyyy",toolBarRangeFormatAbbr:"dd MM yyyy",columnRenderer:null,exportSettings:{serverURL:null,characterSet:null,fileName:"jqxScheduler",dateTimeFormatString:"S",resourcesInMultipleICSFiles:false,ICSXWRCALNAME:"jqxScheduler",ICSXWRCALDESC:"jqxScheduler Description"},source:{beforeprocessing:null,beforesend:null,loaderror:null,localdata:null,data:null,datatype:"array",datafields:[],url:"",root:"",record:"",id:"",totalrecords:0,recordstartindex:0,recordendindex:0,loadallrecords:true,sortcolumn:null,sortdirection:null,sort:null,filter:null,sortcomparer:null},editDialogDateTimeFormatString:"dd/MM/yyyy hh:mm tt",editDialogDateFormatString:"dd/MM/yyyy",editDialogOpen:null,editDialogCreate:null,editDialogKeyDown:null,editDialogClose:null,editDialog:true,toolbarHeight:54,tableZIndex:469,_updating:false,touchMode:"auto",width:800,that:this,beginDrag:null,endDrag:null,dragging:null,timeZones:[{id:"Dateline Standard Time",offset:-720,offsetHours:-12,displayName:"(UTC-12:00) International Date Line West",supportsDaylightSavingTime:false},{id:"UTC-11",offset:-660,offsetHours:-11,displayName:"(UTC-11:00) Coordinated Universal Time-11",supportsDaylightSavingTime:false},{id:"Hawaiteratoran Standard Time",offset:-600,offsetHours:-10,displayName:"(UTC-10:00) Hawaiterator",supportsDaylightSavingTime:false},{id:"Alaskan Standard Time",offset:-540,offsetHours:-9,displayName:"(UTC-09:00) Alaska",supportsDaylightSavingTime:true},{id:"Pacific Standard Time (Mexico)",offset:-480,offsetHours:-8,displayName:"(UTC-08:00) Baja California",supportsDaylightSavingTime:true},{id:"Pacific Standard Time",offset:-480,offsetHours:-8,displayName:"(UTC-08:00) Pacific Time (US & Canada)",supportsDaylightSavingTime:true},{id:"US Mountain Standard Time",offset:-420,offsetHours:-7,displayName:"(UTC-07:00) Arizona",supportsDaylightSavingTime:false},{id:"Mountain Standard Time (Mexico)",offset:-420,offsetHours:-7,displayName:"(UTC-07:00) Chihuahua, La Paz, Mazatlan",supportsDaylightSavingTime:true},{id:"Mountain Standard Time",offset:-420,offsetHours:-7,displayName:"(UTC-07:00) Mountain Time (US & Canada)",supportsDaylightSavingTime:true},{id:"Central Standard Time",offset:-360,offsetHours:-6,displayName:"(UTC-06:00) Central Time (US & Canada)",supportsDaylightSavingTime:true},{id:"Central America Standard Time",offset:-360,offsetHours:-6,displayName:"(UTC-06:00) Central America",supportsDaylightSavingTime:false},{id:"Canada Central Standard Time",offset:-360,offsetHours:-6,displayName:"(UTC-06:00) Saskatchewan",supportsDaylightSavingTime:false},{id:"Central Standard Time (Mexico)",offset:-360,offsetHours:-6,displayName:"(UTC-06:00) Guadalajara, Mexico City, Monterrey",supportsDaylightSavingTime:true},{id:"SA Pacific Standard Time",offset:-300,offsetHours:-5,displayName:"(UTC-05:00) Bogota, Lima, Quito, Rio Branco",supportsDaylightSavingTime:false},{id:"Eastern Standard Time",offset:-300,offsetHours:-5,displayName:"(UTC-05:00) Eastern Time (US & Canada)",supportsDaylightSavingTime:true},{id:"US Eastern Standard Time",offset:-300,offsetHours:-5,displayName:"(UTC-05:00) Indiana (East)",supportsDaylightSavingTime:true},{id:"Venezuela Standard Time",offset:-270,offsetHours:-4.5,displayName:"(UTC-04:30) Caracas",supportsDaylightSavingTime:false},{id:"Atlantic Standard Time",offset:-240,offsetHours:-4,displayName:"(UTC-04:00) Atlantic Time (Canada)",supportsDaylightSavingTime:true},{id:"Paraguay Standard Time",offset:-240,offsetHours:-4,displayName:"(UTC-04:00) Asuncion",supportsDaylightSavingTime:true},{id:"Central Brazilian Standard Time",offset:-240,offsetHours:-4,displayName:"(UTC-04:00) Cuiaba",supportsDaylightSavingTime:true},{id:"Pacific SA Standard Time",offset:-240,offsetHours:-4,displayName:"(UTC-04:00) Santiago",supportsDaylightSavingTime:true},{id:"SA Western Standard Time",offset:-240,offsetHours:-4,displayName:"(UTC-04:00) Georgetown, La Paz, Manaus",supportsDaylightSavingTime:false},{id:"Newfoundland Standard Time",offset:-210,offsetHours:-3.5,displayName:"(UTC-03:30) Newfoundland",supportsDaylightSavingTime:true},{id:"SA Eastern Standard Time",offset:-180,offsetHours:-3,displayName:"(UTC-03:00) Cayenne, Fortaleza",supportsDaylightSavingTime:false},{id:"Argentina Standard Time",offset:-180,offsetHours:-3,displayName:"(UTC-03:00) Buenos Aires",supportsDaylightSavingTime:true},{id:"E. South America Standard Time",offset:-180,offsetHours:-3,displayName:"(UTC-03:00) Brasilia",supportsDaylightSavingTime:true},{id:"Bahia Standard Time",offset:-180,offsetHours:-3,displayName:"(UTC-03:00) Salvador",supportsDaylightSavingTime:true},{id:"Montevideo Standard Time",offset:-180,offsetHours:-3,displayName:"(UTC-03:00) Montevideo",supportsDaylightSavingTime:true},{id:"Greenland Standard Time",offset:-180,offsetHours:-3,displayName:"(UTC-03:00) Greenland",supportsDaylightSavingTime:true},{id:"UTC-02",offset:-120,offsetHours:-2,displayName:"(UTC-02:00) Coordinated Universal Time-02",supportsDaylightSavingTime:false},{id:"Mid-Atlantic Standard Time",offset:-120,offsetHours:-2,displayName:"(UTC-02:00) Mid-Atlantic - Old",supportsDaylightSavingTime:true},{id:"Azores Standard Time",offset:-60,offsetHours:-1,displayName:"(UTC-01:00) Azores",supportsDaylightSavingTime:true},{id:"Cape Verde Standard Time",offset:-60,offsetHours:-1,displayName:"(UTC-01:00) Cape Verde Is.",supportsDaylightSavingTime:false},{id:"Morocco Standard Time",offset:0,offsetHours: