/*
jQWidgets v11.0.1 (2020-Dec)
Copyright (c) 2011-2020 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){if(!a.jqx.scheduler){a.jqx.scheduler={}}a.jqx.jqxWidget("jqxScheduler","",{});a.extend(a.jqx._jqxScheduler.prototype,{defineInstance:function(){var b={altRows:false,autoShowLoadElement:true,columnsHeight:30,columns:[],columnGroups:null,dataview:null,disabled:false,enableHover:true,appointmentOpacity:0.8,headerZIndex:235,height:600,timeRulerWidth:60,loadingErrorMessage:"The data is still loading and you cannot set a property or call a method. You can do that once the data binding is completed. jqxScheduler raises the 'bindingComplete' event when the binding is completed.",localization:null,ready:null,renderToolBar:null,renderAppointment:null,rendered:null,rendering:null,rtl:false,showToolbar:true,showLegend:false,legendPosition:"bottom",legendHeight:34,rowsHeight:27,touchRowsHeight:36,appointmentsMinHeight:18,touchAppointmentsMinHeight:27,appointmentsRenderMode:"default",serverProcessing:false,selectionMode:"multiplerows",scrollBarSize:a.jqx.utilities.scrollBarSize,touchScrollBarSize:a.jqx.utilities.touchScrollBarSize,showHeader:true,maxHeight:999999,maxWidth:999999,autoBind:true,showAllDayRow:true,changedAppointments:new Array(),renderMode:"simple",views:new Array(),view:0,min:new a.jqx.date(0),max:new a.jqx.date(9999,12,31),date:new a.jqx.date("todayDate"),colors:["#307DD7","#AA4643","#89A54E","#71588F","#4198AF","#7FD13B","#EA157A","#FEB80A","#00ADDC","#738AC8","#E8601A","#FF9639","#F5BD6A","#599994","#115D6E","#D02841","#FF7C41","#FFC051","#5B5F4D","#364651","#25A0DA","#309B46","#8EBC00","#FF7515","#FFAE00","#0A3A4A","#196674","#33A6B2","#9AC836","#D0E64B","#CC6B32","#FFAB48","#FFE7AD","#A7C9AE","#888A63","#3F3943","#01A2A6","#29D9C2","#BDF271","#FFFFA6","#1B2B32","#37646F","#A3ABAF","#E1E7E8","#B22E2F","#5A4B53","#9C3C58","#DE2B5B","#D86A41","#D2A825","#993144","#FFA257","#CCA56A","#ADA072","#949681","#105B63","#EEEAC5","#FFD34E","#DB9E36","#BD4932","#BBEBBC","#F0EE94","#F5C465","#FA7642","#FF1E54","#60573E","#F2EEAC","#BFA575","#A63841","#BFB8A3","#444546","#FFBB6E","#F28D00","#D94F00","#7F203B","#583C39","#674E49","#948658","#F0E99A","#564E49","#142D58","#447F6E","#E1B65B","#C8782A","#9E3E17","#4D2B1F","#635D61","#7992A2","#97BFD5","#BFDCF5","#844341","#D5CC92","#BBA146","#897B26","#55591C","#56626B","#6C9380","#C0CA55","#F07C6C","#AD5472","#96003A","#FF7347","#FFBC7B","#FF4154","#642223","#5D7359","#E0D697","#D6AA5C","#8C5430","#661C0E","#16193B","#35478C","#4E7AC7","#7FB2F0","#ADD5F7","#7B1A25","#BF5322","#9DA860","#CEA457","#B67818","#0081DA","#3AAFFF","#99C900","#FFEB3D","#309B46","#0069A5","#0098EE","#7BD2F6","#FFB800","#FF6800","#FF6800","#A0A700","#FF8D00","#678900","#0069A5"],colorSchemes:[{name:"scheme01",colors:["#307DD7","#AA4643","#89A54E","#71588F","#4198AF"]},{name:"scheme02",colors:["#7FD13B","#EA157A","#FEB80A","#00ADDC","#738AC8"]},{name:"scheme03",colors:["#E8601A","#FF9639","#F5BD6A","#599994","#115D6E"]},{name:"scheme04",colors:["#D02841","#FF7C41","#FFC051","#5B5F4D","#364651"]},{name:"scheme05",colors:["#25A0DA","#309B46","#8EBC00","#FF7515","#FFAE00"]},{name:"scheme06",colors:["#0A3A4A","#196674","#33A6B2","#9AC836","#D0E64B"]},{name:"scheme07",colors:["#CC6B32","#FFAB48","#FFE7AD","#A7C9AE","#888A63"]},{name:"scheme08",colors:["#3F3943","#01A2A6","#29D9C2","#BDF271","#FFFFA6"]},{name:"scheme09",colors:["#1B2B32","#37646F","#A3ABAF","#E1E7E8","#B22E2F"]},{name:"scheme10",colors:["#5A4B53","#9C3C58","#DE2B5B","#D86A41","#D2A825"]},{name:"scheme11",colors:["#993144","#FFA257","#CCA56A","#ADA072","#949681"]},{name:"scheme12",colors:["#105B63","#EEEAC5","#FFD34E","#DB9E36","#BD4932"]},{name:"scheme13",colors:["#BBEBBC","#F0EE94","#F5C465","#FA7642","#FF1E54"]},{name:"scheme14",colors:["#60573E","#F2EEAC","#BFA575","#A63841","#BFB8A3"]},{name:"scheme15",colors:["#444546","#FFBB6E","#F28D00","#D94F00","#7F203B"]},{name:"scheme16",colors:["#583C39","#674E49","#948658","#F0E99A","#564E49"]},{name:"scheme17",colors:["#142D58","#447F6E","#E1B65B","#C8782A","#9E3E17"]},{name:"scheme18",colors:["#4D2B1F","#635D61","#7992A2","#97BFD5","#BFDCF5"]},{name:"scheme19",colors:["#844341","#D5CC92","#BBA146","#897B26","#55591C"]},{name:"scheme20",colors:["#56626B","#6C9380","#C0CA55","#F07C6C","#AD5472"]},{name:"scheme21",colors:["#96003A","#FF7347","#FFBC7B","#FF4154","#642223"]},{name:"scheme22",colors:["#5D7359","#E0D697","#D6AA5C","#8C5430","#661C0E"]},{name:"scheme23",colors:["#16193B","#35478C","#4E7AC7","#7FB2F0","#ADD5F7"]},{name:"scheme24",colors:["#7B1A25","#BF5322","#9DA860","#CEA457","#B67818"]},{name:"scheme25",colors:["#0081DA","#3AAFFF","#99C900","#FFEB3D","#309B46"]},{name:"scheme26",colors:["#0069A5","#0098EE","#7BD2F6","#FFB800","#FF6800"]},{name:"scheme27",colors:["#FF6800","#A0A700","#FF8D00","#678900","#0069A5"]}],resources:null,contextMenu:true,contextMenuOpen:null,contextMenuClose:null,contextMenuItemClick:null,contextMenuCreate:null,timeZone:null,statuses:{free:"white",tentative:"tentative",busy:"transparent",outOfOffice:"#800080"},appointmentDataFields:{from:"from",to:"to",id:"id",calendarId:"calendarId",description:"description",location:"location",subject:"subject",background:"background",color:"color",borderColor:"borderColor",style:"style",recurrencePattern:"recurrencePattern",recurrenceException:"recurrenceException",draggable:"draggable",resizable:"resizable",resourceId:"resourceId",status:"status",tooltip:"tooltip",hidden:"hidden",allDay:"allDay",timeZone:"timeZone",ownerId:"ownerId"},appointmentTooltips:true,tableColumns:1,tableRows:1,dayNameFormat:"full",touchDayNameFormat:"abbr",toolBarRangeFormat:"dd MMMM yyyy",toolBarRangeFormatAbbr:"dd MM yyyy",columnRenderer:null,exportSettings:{serverURL:null,characterSet:null,fileName:"jqxScheduler",dateTimeFormatString:"S",resourcesInMultipleICSFiles:false,ICSXWRCALNAME:"jqxScheduler",ICSXWRCALDESC:"jqxScheduler Description"},source:{beforeprocessing:null,beforesend:null,loaderror:null,localdata:null,data:null,datatype:"array",datafields:[],url:"",root:"",record:"",id:"",totalrecords:0,recordstartindex:0,recordendindex:0,loadallrecords:true,sortcolumn:null,sortdirection:null,sort:null,filter:null,sortcomparer:null},editDialogDateTimeFormatString:"dd/MM/yyyy hh:mm tt",editDialogDateFormatString:"dd/MM/yyyy",editDialogOpen:null,editDialogCreate:null,editDialogKeyDown:null,editDialogClose:null,editDialog:true,toolbarHeight:54,tableZIndex:469,_updating:false,touchMode:"auto",width:800,that:this,beginDrag:null,endDrag:null,dragging:null,timeZones:[{id:"Dateline Standard Time",offset:-720,offsetHours:-12,displayName:"(UTC-12:00) International Date Line West",supportsDaylightSavingTime:false},{id:"UTC-11",offset:-660,offsetHours:-11,displayName:"(UTC-11:00) Coordinated Universal Time-11",supportsDaylightSavingTime:false},{id:"Hawaiteratoran Standard Time",offset:-600,offsetHours:-10,displayName:"(UTC-10:00) Hawaiterator",supportsDaylightSavingTime:false},{id:"Alaskan Standard Time",offset:-540,offsetHours:-9,displayName:"(UTC-09:00) Alaska",supportsDaylightSavingTime:true},{id:"Pacific Standard Time (Mexico)",offset:-480,offsetHours:-8,displayName:"(UTC-08:00) Baja California",supportsDaylightSavingTime:true},{id:"Pacific Standard Time",offset:-480,offsetHours:-8,displayName:"(UTC-08:00) Pacific Time (US & Canada)",supportsDaylightSavingTime:true},{id:"US Mountain Standard Time",offset:-420,offsetHours:-7,displayName:"(UTC-07:00) Arizona",supportsDaylightSavingTime:false},{id:"Mountain Standard Time (Mexico)",offset:-420,offsetHours:-7,displayName:"(UTC-07:00) Chihuahua, La Paz, Mazatlan",supportsDaylightSavingTime:true},{id:"Mountain Standard Time",offset:-420,offsetHours:-7,displayName:"(UTC-07:00) Mountain Time (US & Canada)",supportsDaylightSavingTime:true},{id:"Central Standard Time",offset:-360,offsetHours:-6,displayName:"(UTC-06:00) Central Time (US & Canada)",supportsDaylightSavingTime:true},{id:"Central America Standard Time",offset:-360,offsetHours:-6,displayName:"(UTC-06:00) Central America",supportsDaylightSavingTime:false},{id:"Canada Central Standard Time",offset:-360,offsetHours:-6,displayName:"(UTC-06:00) Saskatchewan",supportsDaylightSavingTime:false},{id:"Central Standard Time (Mexico)",offset:-360,offsetHours:-6,displayName:"(UTC-06:00) Guadalajara, Mexico City, Monterrey",supportsDaylightSavingTime:true},{id:"SA Pacific Standard Time",offset:-300,offsetHours:-5,displayName:"(UTC-05:00) Bogota, Lima, Quito, Rio Branco",supportsDaylightSavingTime:false},{id:"Eastern Standard Time",offset:-300,offsetHours:-5,displayName:"(UTC-05:00) Eastern Time (US & Canada)",supportsDaylightSavingTime:true},{id:"US Eastern Standard Time",offset:-300,offsetHours:-5,displayName:"(UTC-05:00) Indiana (East)",supportsDaylightSavingTime:true},{id:"Venezuela Standard Time",offset:-270,offsetHours:-4.5,displayName:"(UTC-04:30) Caracas",supportsDaylightSavingTime:false},{id:"Atlantic Standard Time",offset:-240,offsetHours:-4,displayName:"(UTC-04:00) Atlantic Time (Canada)",supportsDaylightSavingTime:true},{id:"Paraguay Standard Time",offset:-240,offsetHours:-4,displayName:"(UTC-04:00) Asuncion",supportsDaylightSavingTime:true},{id:"Central Brazilian Standard Time",offset:-240,offsetHours:-4,displayName:"(UTC-04:00) Cuiaba",supportsDaylightSavingTime:true},{id:"Pacific SA Standard Time",offset:-240,offsetHours:-4,displayName:"(UTC-04:00) Santiago",supportsDaylightSavingTime:true},{id:"SA Western Standard Time",offset:-240,offsetHours:-4,displayName:"(UTC-04:00) Georgetown, La Paz, Manaus",supportsDaylightSavingTime:false},{id:"Newfoundland Standard Time",offset:-210,offsetHours:-3.5,displayName:"(UTC-03:30) Newfoundland",supportsDaylightSavingTime:true},{id:"SA Eastern Standard Time",offset:-180,offsetHours:-3,displayName:"(UTC-03:00) Cayenne, Fortaleza",supportsDaylightSavingTime:false},{id:"Argentina Standard Time",offset:-180,offsetHours:-3,displayName:"(UTC-03:00) Buenos Aires",supportsDaylightSavingTime:true},{id:"E. South America Standard Time",offset:-180,offsetHours:-3,displayName:"(UTC-03:00) Brasilia",supportsDaylightSavingTime:true},{id:"Bahia Standard Time",offset:-180,offsetHours:-3,displayName:"(UTC-03:00) Salvador",supportsDaylightSavingTime:true},{id:"Montevideo Standard Time",offset:-180,offsetHours:-3,displayName:"(UTC-03:00) Montevideo",supportsDaylightSavingTime:true},{id:"Greenland Standard Time",offset:-180,offsetHours:-3,displayName:"(UTC-03:00) Greenland",supportsDaylightSavingTime:true},{id:"UTC-02",offset:-120,offsetHours:-2,displayName:"(UTC-02:00) Coordinated Universal Time-02",supportsDaylightSavingTime:false},{id:"Mid-Atlantic Standard Time",offset:-120,offsetHours:-2,displayName:"(UTC-02:00) Mid-Atlantic - Old",supportsDaylightSavingTime:true},{id:"Azores Standard Time",offset:-60,offsetHours:-1,displayName:"(UTC-01:00) Azores",supportsDaylightSavingTime:true},{id:"Cape Verde Standard Time",offset:-60,offsetHours:-1,displayName:"(UTC-01:00) Cape Verde Is.",supportsDaylightSavingTime:false},{id:"Morocco Standard Time",offset:0,offsetHours:0,displayName:"(UTC) Casablanca",supportsDaylightSavingTime:true},{id:"UTC",offset:0,offsetHours:0,displayName:"(UTC) Coordinated Universal Time",supportsDaylightSavingTime:false},{id:"GMT Standard Time",offset:0,offsetHours:0,displayName:"(UTC) Dublin, Edinburgh, Lisbon, London",supportsDaylightSavingTime:true},{id:"Greenwich Standard Time",offset:0,offsetHours:0,displayName:"(UTC) Monrovia, Reykjavik",supportsDaylightSavingTime:false},{id:"Central European Standard Time",offset:60,offsetHours:1,displayName:"(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb",supportsDaylightSavingTime:true},{id:"Namibia Standard Time",offset:60,offsetHours:1,displayName:"(UTC+01:00) Windhoek",supportsDaylightSavingTime:true},{id:"W. Central Africa Standard Time",offset:60,offsetHours:1,displayName:"(UTC+01:00) West Central Africa",supportsDaylightSavingTime:false},{id:"W. Europe Standard Time",offset:60,offsetHours:1,displayName:"(UTC+01:00) Amsterdam, Berlin, Rome",supportsDaylightSavingTime:true},{id:"Central Europe Standard Time",offset:60,offsetHours:1,displayName:"(UTC+01:00) Belgrade, Budapest, Prague",supportsDaylightSavingTime:true},{id:"Romance Standard Time",offset:60,offsetHours:1,displayName:"(UTC+01:00) Brussels, Copenhagen, Madrid, Paris",supportsDaylightSavingTime:true},{id:"FLE Standard Time",offset:120,offsetHours:2,displayName:"(UTC+02:00) Helsinki, Kyiv, Riga, Sofia",supportsDaylightSavingTime:true},{id:"South Africa Standard Time",offset:120,offsetHours:2,displayName:"(UTC+02:00) Harare, Pretoria",supportsDaylightSavingTime:false},{id:"Turkey Standard Time",offset:120,offsetHours:2,displayName:"(UTC+02:00) Istanbul",supportsDaylightSavingTime:true},{id:"GTB Standard Time",offset:120,offsetHours:2,displayName:"(UTC+02:00) Athens, Bucharest",supportsDaylightSavingTime:true},{id:"Libya Standard Time",offset:120,offsetHours:2,displayName:"(UTC+02:00) Tripoli",supportsDaylightSavingTime:true},{id:"E. Europe Standard Time",offset:120,offsetHours:2,displayName:"(UTC+02:00) E. Europe",supportsDaylightSavingTime:true},{id:"Jordan Standard Time",offset:120,offsetHours:2,displayName:"(UTC+02:00) Amman",supportsDaylightSavingTime:true},{id:"Middle East Standard Time",offset:120,offsetHours:2,displayName:"(UTC+02:00) Beirut",supportsDaylightSavingTime:true},{id:"Egypt Standard Time",offset:120,offsetHours:2,displayName:"(UTC+02:00) Cairo",supportsDaylightSavingTime:true},{id:"Syria Standard Time",offset:120,offsetHours:2,displayName:"(UTC+02:00) Damascus",supportsDaylightSavingTime:true},{id:"Israel Standard Time",offset:120,offsetHours:2,displayName:"(UTC+02:00) Jerusalem",supportsDaylightSavingTime:true},{id:"Arab Standard Time",offset:180,offsetHours:3,displayName:"(UTC+03:00) Kuwait, Riyadh",supportsDaylightSavingTime:false},{id:"E. Africa Standard Time",offset:180,offsetHours:3,displayName:"(UTC+03:00) Nairobi",supportsDaylightSavingTime:false},{id:"Arabic Standard Time",offset:180,offsetHours:3,displayName:"(UTC+03:00) Baghdad",supportsDaylightSavingTime:true},{id:"Kaliningrad Standard Time",offset:180,offsetHours:3,displayName:"(UTC+03:00) Kaliningrad, Minsk",supportsDaylightSavingTime:true},{id:"Iran Standard Time",offset:210,offsetHours:3.5,displayName:"(UTC+03:30) Tehran",supportsDaylightSavingTime:true},{id:"Mauritius Standard Time",offset:240,offsetHours:4,displayName:"(UTC+04:00) Port Louis",supportsDaylightSavingTime:true},{id:"Georgian Standard Time",offset:240,offsetHours:4,displayName:"(UTC+04:00) Tbilisi",supportsDaylightSavingTime:false},{id:"Caucasus Standard Time",offset:240,offsetHours:4,displayName:"(UTC+04:00) Yerevan",supportsDaylightSavingTime:true},{id:"Arabian Standard Time",offset:240,offsetHours:4,displayName:"(UTC+04:00) Abu Dhabi, Muscat",supportsDaylightSavingTime:false},{id:"Azerbaijan Standard Time",offset:240,offsetHours:4,displayName:"(UTC+04:00) Baku",supportsDaylightSavingTime:true},{id:"Russian Standard Time",offset:240,offsetHours:4,displayName:"(UTC+04:00) Moscow, St. Petersburg, Volgograd",supportsDaylightSavingTime:true},{id:"Afghanistan Standard Time",offset:270,offsetHours:4.5,displayName:"(UTC+04:30) Kabul",supportsDaylightSavingTime:false},{id:"Pakistan Standard Time",offset:300,offsetHours:5,displayName:"(UTC+05:00) Islamabad, Karachi",supportsDaylightSavingTime:true},{id:"West Asia Standard Time",offset:300,offsetHours:5,displayName:"(UTC+05:00) Ashgabat, Tashkent",supportsDaylightSavingTime:false},{id:"India Standard Time",offset:330,offsetHours:5.5,displayName:"(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",supportsDaylightSavingTime:false},{id:"Sri Lanka Standard Time",offset:330,offsetHours:5.5,displayName:"(UTC+05:30) Sri Jayawardenepura",supportsDaylightSavingTime:false},{id:"Nepal Standard Time",offset:345,offsetHours:5.75,displayName:"(UTC+05:45) Kathmandu",supportsDaylightSavingTime:false},{id:"Central Asia Standard Time",offset:360,offsetHours:6,displayName:"(UTC+06:00) Astana",supportsDaylightSavingTime:false},{id:"Bangladesh Standard Time",offset:360,offsetHours:6,displayName:"(UTC+06:00) Dhaka",supportsDaylightSavingTime:true},{id:"Ekaterinburg Standard Time",offset:360,offsetHours:6,displayName:"(UTC+06:00) Ekaterinburg",supportsDaylightSavingTime:true},{id:"Myanmar Standard Time",offset:390,offsetHours:6.5,displayName:"(UTC+06:30) Yangon (Rangoon)",supportsDaylightSavingTime:false},{id:"SE Asia Standard Time",offset:420,offsetHours:7,displayName:"(UTC+07:00) Bangkok, Hanoi, Jakarta",supportsDaylightSavingTime:false},{id:"N. Central Asia Standard Time",offset:420,offsetHours:7,displayName:"(UTC+07:00) Novosibirsk",supportsDaylightSavingTime:true},{id:"Ulaanbaatar Standard Time",offset:480,offsetHours:8,displayName:"(UTC+08:00) Ulaanbaatar",supportsDaylightSavingTime:false},{id:"China Standard Time",offset:480,offsetHours:8,displayName:"(UTC+08:00) Beijing, Chongqing, Hong Kong",supportsDaylightSavingTime:false},{id:"Singapore Standard Time",offset:480,offsetHours:8,displayName:"(UTC+08:00) Kuala Lumpur, Singapore",supportsDaylightSavingTime:false},{id:"North Asia Standard Time",offset:480,offsetHours:8,displayName:"(UTC+08:00) Krasnoyarsk",supportsDaylightSavingTime:true},{id:"Taipei Standard Time",offset:480,offsetHours:8,displayName:"(UTC+08:00) Taipei",supportsDaylightSavingTime:false},{id:"W. Australia Standard Time",offset:480,offsetHours:8,displayName:"(UTC+08:00) Perth",supportsDaylightSavingTime:true},{id:"Korea Standard Time",offset:540,offsetHours:9,displayName:"(UTC+09:00) Seoul",supportsDaylightSavingTime:false},{id:"North Asia East Standard Time",offset:540,offsetHours:9,displayName:"(UTC+09:00) Irkutsk",supportsDaylightSavingTime:true},{id:"Tokyo Standard Time",offset:540,offsetHours:9,displayName:"(UTC+09:00) Osaka, Sapporo, Tokyo",supportsDaylightSavingTime:false},{id:"AUS Central Standard Time",offset:570,offsetHours:9.5,displayName:"(UTC+09:30) Darwin",supportsDaylightSavingTime:false},{id:"Cen. Australia Standard Time",offset:570,offsetHours:9.5,displayName:"(UTC+09:30) Adelaide",supportsDaylightSavingTime:true},{id:"West Pacific Standard Time",offset:600,offsetHours:10,displayName:"(UTC+10:00) Guam, Port Moresby",supportsDaylightSavingTime:false},{id:"Tasmania Standard Time",offset:600,offsetHours:10,displayName:"(UTC+10:00) Hobart",supportsDaylightSavingTime:true},{id:"E. Australia Standard Time",offset:600,offsetHours:10,displayName:"(UTC+10:00) Brisbane",supportsDaylightSavingTime:false},{id:"AUS Eastern Standard Time",offset:600,offsetHours:10,displayName:"(UTC+10:00) Canberra, Melbourne, Sydney",supportsDaylightSavingTime:true},{id:"Yakutsk Standard Time",offset:600,offsetHours:10,displayName:"(UTC+10:00) Yakutsk",supportsDaylightSavingTime:true},{id:"Vladivostok Standard Time",offset:660,offsetHours:11,displayName:"(UTC+11:00) Vladivostok",supportsDaylightSavingTime:true},{id:"Central Pacific Standard Time",offset:660,offsetHours:11,displayName:"(UTC+11:00) Solomon Is., New Caledonia",supportsDaylightSavingTime:false},{id:"Magadan Standard Time",offset:720,offsetHours:12,displayName:"(UTC+12:00) Magadan",supportsDaylightSavingTime:true},{id:"Kamchatka Standard Time",offset:720,offsetHours:12,displayName:"(UTC+12:00) Petropavlovsk-Kamchatsky - Old",supportsDaylightSavingTime:true},{id:"Fiji Standard Time",offset:720,offsetHours:12,displayName:"(UTC+12:00) Fiji",supportsDaylightSavingTime:true},{id:"New Zealand Standard Time",offset:720,offsetHours:12,displayName:"(UTC+12:00) Auckland, Wellington",supportsDaylightSavingTime:true},{id:"UTC+12",offset:720,offsetHours:12,displayName:"(UTC+12:00) Coordinated Universal Time+12",supportsDaylightSavingTime:false},{id:"Tonga Standard Time",offset:780,offsetHours:13,displayName:"(UTC+13:00) Nuku'alofa",supportsDaylightSavingTime:false},{id:"Samoa Standard Time",offset:780,offsetHours:13,displayName:"(UTC+13:00) Samoa",supportsDaylightSavingTime:true}]};if(this===a.jqx._jqxScheduler.prototype){return b}a.extend(true,this,b);this.that=this;return b},_applyThemeSettings:function(){const d=this;var f=window.getComputedStyle(d.element);var c=f.getPropertyValue("--jqx-grid-row-height");var e=f.getPropertyValue("--jqx-grid-column-height");var b=f.getPropertyValue("--jqx-scrollbar-size");if(c){d.rowsHeight=parseInt(c)}if(e){d.columnsHeight=parseInt(e)}if(b){}},createInstance:function(c){var e=this;e._views=new Array();e._view=e.view;this._applyThemeSettings();for(var d=0;d<e.views.length;d++){if(a.type(e.views[d])==="string"){e._views.push({type:e.views[d]})}else{e._views.push(e.views[d])}}for(var d=0;d<e._views.length;d++){if(e._views[d].type==e.view){e._view=d;break}}if(a.jqx.utilities.scrollBarSize!=15){e.scrollBarSize=a.jqx.utilities.scrollBarSize}if(e.source&&!e.source.dataBind){e.source=new a.jqx.dataAdapter(e.source)}var b=e.source._source.datafields;if(b&&b.length>0){e._camelCase=e.source._source.dataFields!==undefined;e.selectionMode=e.selectionMode.toLowerCase()}if(e.host.attr("tabindex")==null){e.host.attr("tabindex","0")}e.host.attr("role","grid");e.host.attr("align","left");e.host.addClass(e.toTP("jqx-grid"));e.host.addClass(e.toTP("jqx-scheduler"));e.host.addClass(e.toTP("jqx-reset"));e.host.addClass(e.toTP("jqx-rc-all"));e.host.addClass(e.toTP("jqx-widget"));e.host.addClass(e.toTP("jqx-widget-content jqx-disableselect"));if(e._testmodules()){return}e.overlay=a("<div style='z-index: 999; position:absolute;'></div>");e.overlay.hide();e.overlay.appendTo(e.host);e.render(true);a.jqx.utilities.resize(e.host,function(){var h=a(window).width();var f=a(window).height();e._hostWidth=null;e._hostHeight=null;var g=e.host.width();var i=e.host.height();e._hostWidth=g;e._hostHeight=i;if(e._lastHostWidth!=g||e._lastHostHeight!=i){e._updatesize(e._lastHostWidth!=g,e._lastHostHeight!=i)}e._lastWidth=h;e._lastHeight=f;e._lastHostWidth=g;e._lastHostHeight=i});e.createEditRecurrenceDialog()},createEditRecurrenceDialog:function(){var d=this;d.editRecurrenceDialog=null;var b=a("<div><div>"+d.schedulerLocalization.editRecurringAppointmentDialogTitleString+"</div><div><div>"+d.schedulerLocalization.editRecurringAppointmentDialogContentString+"</div><div style='position: absolute; white-space:nowrap; text-overflow: ellipsis; left:0px; width:100%; bottom: 0px;'><button title='"+d.schedulerLocalization.editRecurringAppointmentDialogOccurrenceString+"' id='editRecurringAppointmentOccurrence."+d.element.id+"' style='white-space:nowrap; text-overflow: ellipsis; border-left-width: 0px;  border-bottom-width: 0px; border-radius:0px; width:50%;'>"+d.schedulerLocalization.editRecurringAppointmentDialogOccurrenceString+"</button><button title='"+d.schedulerLocalization.editRecurringAppointmentDialogSeriesString+"' id='editRecurringAppointmentSeries."+d.element.id+"' style=' white-space:nowrap; text-overflow: ellipsis; border-bottom-width: 0px;  border-left-width: 0px; border-right-width:0px; width:50%; border-radius:0px;'>"+d.schedulerLocalization.editRecurringAppointmentDialogSeriesString+"</button></div></div></div>");d.editRecurrenceDialog=b;a(b).jqxWindow({rtl:d.rtl,autoFocus:false,animationType:"none",autoOpen:false,theme:d.theme,minWidth:300,minHeight:110,resizable:false});var c=b.find("button");c.jqxButton({theme:d.theme,width:"50%"});var e=false;c.mousedown(function(){e=true;var f=this.id;if(f.indexOf("editRecurringAppointmentOccurrence")>=0){d.editSeries(false)}else{d.editSeries(true)}a(b).jqxWindow("close")});this.addHandler(a(b),"open",function(f){d._raiseEvent("editRecurrenceDialogOpen",{dialog:b,appointment:d.selectedJQXAppointment?d.selectedJQXAppointment.boundAppointment:null})});d.addHandler(a(b),"keydown",function(f){if(f.keyCode==13){if(a(document.activeElement).ischildof(a(b))){if(document.activeElement.nodeName.toLowerCase()=="button"){a(document.activeElement).trigger("mousedown");a(document.activeElement).trigger("mouseup");return true}}}});this.addHandler(a(b),"close",function(f){if(!e){d._removeFeedbackAndStopResize();d.overlay.hide();d.focus();d._raiseEvent("editRecurrenceDialogClose",{dialog:b,appointment:d.selectedJQXAppointment?d.selectedJQXAppointment.boundAppointment:null});return false}e=false;d.overlay.hide();d.focus();d._raiseEvent("editRecurrenceDialogClose",{dialog:b,appointment:d.selectedJQXAppointment?d.selectedJQXAppointment.boundAppointment:null})});d.editRecurrenceDialog=b},getViewStart:function(){var d=this.getVisibleDate();var b=this._views[this._view].type;var e=this._views[this._view];switch(b){case"dayView":case"timelineDayView":return d}var c=this.getFirstDayOfWeek(d);return c},getViewEnd:function(){var e=this.getViewStart();var d=1;var b=this._views[this._view].type;var c=this._views[this._view];switch(b){case"dayView":d=1;break;case"timelineDayView":d=1;if(c.days){d=c.days}break;case"weekView":case"timelineWeekView":d=7;if(c.days){d=c.days}break;case"monthView":d=41;break;case"timelineMonthView":d=41;if(c.days){d=c.days}break;case"agendaView":d=7;if(c.days){d=c.days}break}return e.addDays(d)},getFirstDayOfWeek:function(d){var c=d;var b=this.schedulerLocalization.firstDay;if(b<0||b>6){b=6}while(c.dayOfWeek()!=b){c.addDays(-1,false)}return c},getVisibleDate:function(){var d=this.date;if(d<this.min){d=this.min}if(d>this.max){d=this.max}var b=this._views[this._view].type;var f=this._views[this._view];d=d.clearTime();switch(b){case"dayView":case"weekView":case"timelineDayView":case"timelineWeekView":case"agendaView":return d}var e=d.day();var c=d.addDays(-e+1);d=c;return d},_builddataloadelement:function(){if(this.dataloadelement){this.dataloadelement.remove()}this.dataloadelement=a('<div class="jqx-datatable-load" style="z-index: 99998; background-color:rgba(50,50,50,0.1); overflow: hidden; position: absolute;"></div>');var c=a('<div style="z-index: 99999; margin-left: -66px; left: 50%; top: 50%; margin-top: -24px; position: relative; width: 100px; height: 33px; padding: 5px; font-family: verdana; font-size: 12px; color: #767676; border-color: #898989; border-width: 1px; border-style: solid; background: #f6f6f6; border-collapse: collapse;"><div style="float: left;"><div style="float: left; overflow: hidden; width: 32px; height: 32px;" class="jqx-grid-load"/><span style="margin-top: 10px; float: left; display: block; margin-left: 5px;" >'+this.schedulerLocalization.loadString+"</span></div></div>");c.addClass(this.toTP("jqx-rc-all"));this.dataloadelement.addClass(this.toTP("jqx-rc-all"));c.addClass(this.toTP("jqx-fill-state-normal"));this.dataloadelement.append(c);this.dataloadelement.width(this.width);this.dataloadelement.height(this.height);this.host.prepend(this.dataloadelement);if(this.source._source.url!=""){var b=false;if(this.height==="auto"||this.height===null||this.autoheight){if(this.maxHeight==999999){b=true}}if(b){this.host.height(100);this.dataloadelement.height(100)}else{this.host.height(this.height);this.dataloadelement.height(this.height)}var d=false;if(this.width==="auto"||this.width===null||this.autoWidth){d=true}if(d){this.host.width(300);this.dataloadelement.width(300)}else{this.host.width(this.width);this.dataloadelement.width(this.width)}}},_measureElement:function(c){var b=a("<span style='visibility: hidden; white-space: nowrap;'>measure Text</span>");b.addClass(this.toTP("jqx-widget"));a(document.body).append(b);if(c=="cell"){this._cellheight=b.height()}else{this._columnheight=b.height()}b.remove()},_testmodules:function(){var e="";var c=this;var b=function(){if(e.length!=""){e+=","}};if(!this.host.jqxScrollBar){b();e+=" jqxscrollbar.js"}if(!this.host.jqxButton){b();e+=" jqxbuttons.js"}if(!a.jqx.dataAdapter){b();e+=" jqxdata.js"}if(!this.host.jqxDateTimeInput){b();e+=" jqxdatetimeinput.js"}if(!this.host.jqxCalendar){b();e+=" jqxcalendar.js"}try{if(!Globalize){b();e+=" globalize.js"}}catch(d){}if(e!=""){throw new Error("jqxScheduler: Missing references to the following module(s): "+e);this.host.remove();return true}return false},focus:function(){try{if(this.isTouchDevice()){return}if(this._editDialog&&this._editDialog.jqxWindow("isOpen")){var c=this;setTimeout(function(){c.editDialogFields.subject.focus();c.editDialogFields.subject.select()},1);this.focused=true;return}if(document.activeElement==this.element){return}this.host.focus();var c=this;setTimeout(function(){c.host.focus()},25);this.focused=true}catch(b){}},hiddenParent:function(){return a.jqx.isHidden(this.host)},_updatesize:function(h,g){if(this._loading){return}var e=this;var f=e.host.width();var d=e.host.height();if(!e._oldWidth){e._oldWidth=f}if(!e._oldHeight){e._oldHeight=d}if(e._resizeTimer!=undefined){clearTimeout(e._resizeTimer);e._resizeTimer=null}var c=300;var b=function(){if(e._resizeTimer){clearTimeout(e._resizeTimer)}e.resizingGrid=true;if(a.jqx.isHidden(e.host)){return}e._updatecolumnwidths();e.refresh();e._oldWidth=f;e._oldHeight=d;e.resizingGrid=false};b();e._resizeTimer=setTimeout(function(){var j=e.host.width();var i=e.host.height();if(e._oldWidth!=j||e._oldHeight!=i){b()}},c)},resize:function(c,b){if(c!=undefined){this.width=c}if(b!=undefined){this.height=b}this._updatecolumnwidths();this.refresh()},isTouchDevice:function(){if(this.touchDevice!=undefined){return this.touchDevice}var b=a.jqx.mobile.isTouchDevice();this.touchDevice=b;if(this.touchMode==true){b=true;a.jqx.mobile.setMobileSimulator(this.element);this.touchDevice=b}else{if(this.touchMode==false){b=false}}if(b){this.touchDevice=true;this.host.addClass(this.toThemeProperty("jqx-touch"));this.host.find("jqx-widget-content").addClass(this.toThemeProperty("jqx-touch"));this.host.find("jqx-widget-header").addClass(this.toThemeProperty("jqx-touch"));this.scrollBarSize=this.touchScrollBarSize}return b},toTP:function(b){return this.toThemeProperty(b)},localizestrings:function(b,c){this._cellscache=new Array();if(a.jqx.dataFormat){a.jqx.dataFormat.cleardatescache()}if(this._loading){throw new Error("jqxScheduler: "+this.loadingErrorMessage);return false}if(b!=null){for(var d in this.schedulerLocalization){if(b[d]){this.schedulerLocalization[d]=b[d]}}if(b.loadingErrorMessage){this.loadingErrorMessage=b.loadingErrorMessage}if(c!==false){this._builddataloadelement();a(this.dataloadelement).css("visibility","hidden");a(this.dataloadelement).css("display","none")}}else{this.schedulerLocalization={"/":"/",":":":",firstDay:0,days:{names:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],namesAbbr:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],namesShort:["Su","Mo","Tu","We","Th","Fr","Sa"]},months:{names:["January","February","March","April","May","June","July","August","September","October","November","December",""],namesAbbr:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""]},AM:["AM","am","AM"],PM:["PM","pm","PM"],eras:[{name:"A.D.",start:null,offset:0}],twoDigitYearMax:2029,patterns:{d:"M/d/yyyy",D:"dddd, MMMM dd, yyyy",t:"h:mm tt",T:"h:mm:ss tt",f:"dddd, MMMM dd, yyyy h:mm tt",F:"dddd, MMMM dd, yyyy h:mm:ss tt",M:"MMMM dd",Y:"yyyy MMMM",S:"yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",ISO:"yyyy-MM-dd hh:mm:ss",ISO2:"yyyy-MM-dd HH:mm:ss",d1:"dd.MM.yyyy",d2:"dd-MM-yyyy",d3:"dd-MMMM-yyyy",d4:"dd-MM-yy",d5:"H:mm",d6:"HH:mm",d7:"HH:mm tt",d8:"dd/MMMM/yyyy",d9:"MMMM-dd",d10:"MM-dd",d11:"MM-dd-yyyy"},agendaDateColumn:"Date",agendaTimeColumn:"Time",agendaAppointmentColumn:"Appointment",backString:"Back",forwardString:"Forward",toolBarPreviousButtonString:"previous",toolBarNextButtonString:"next",emptyDataString:"No data to display",loadString:"Loading...",clearString:"Clear",todayString:"Today",dayViewString:"Day",weekViewString:"Week",monthViewString:"Month",agendaViewString:"Agenda",timelineDayViewString:"Timeline Day",timelineWeekViewString:"Timeline Week",timelineMonthViewString:"Timeline Month",agendaAllDayString:"all day",loadingErrorMessage:"The data is still loading and you cannot set a property or call a method. You can do that once the data binding is completed. jqxScheduler raises the 'bindingComplete' event when the binding is completed.",editRecurringAppointmentDialogTitleString:"Edit Recurring Appointment",editRecurringAppointmentDialogContentString:"Do you want to edit only this occurrence or the series?",editRecurringAppointmentDialogOccurrenceString:"Edit Occurrence",editRecurringAppointmentDialogSeriesString:"Edit The Series",editDialogTitleString:"Edit Appointment",editDialogCreateTitleString:"Create New Appointment",contextMenuEditAppointmentString:"Edit Appointment",contextMenuCreateAppointmentString:"Create New Appointment",editDialogSubjectString:"Subject",editDialogLocationString:"Location",editDialogFromString:"From",editDialogToString:"To",editDialogAllDayString:"All day",editDialogExceptionsString:"Exceptions",editDialogResetExceptionsString:"Reset on Save",editDialogDescriptionString:"Description",editDialogResourceIdString:"Owner",editDialogStatusString:"Status",editDialogColorString:"Color",editDialogColorPlaceHolderString:"Select Color",editDialogTimeZoneString:"Time Zone",editDialogSelectTimeZoneString:"Select Time Zone",editDialogSaveString:"Save",editDialogDeleteString:"Delete",editDialogCancelString:"Cancel",editDialogRepeatString:"Repeat",editDialogRepeatEveryString:"Repeat every",editDialogRepeatEveryWeekString:"week(s)",editDialogRepeatEveryYearString:"year(s)",editDialogRepeatEveryDayString:"day(s)",editDialogRepeatNeverString:"Never",editDialogRepeatDailyString:"Daily",editDialogRepeatWeeklyString:"Weekly",editDialogRepeatMonthlyString:"Monthly",editDialogRepeatYearlyString:"Yearly",editDialogRepeatEveryMonthString:"month(s)",editDialogRepeatEveryMonthDayString:"Day",editDialogRepeatFirstString:"first",editDialogRepeatSecondString:"second",editDialogRepeatThirdString:"third",editDialogRepeatFourthString:"fourth",editDialogRepeatLastString:"last",editDialogRepeatEndString:"End",editDialogRepeatAfterString:"After",editDialogRepeatOnString:"On",editDialogRepeatOfString:"of",editDialogRepeatOccurrencesString:"occurrence(s)",editDialogRepeatSaveString:"Save Occurrence",editDialogRepeatSaveSeriesString:"Save Series",editDialogRepeatDeleteString:"Delete Occurrence",editDialogRepeatDeleteSeriesString:"Delete Series",editDialogStatuses:{free:"Free",tentative:"Tentative",busy:"Busy",outOfOffice:"Out of Office"}}}},_updateScrollbars:function(r){var j=false;var d=this;if(d.width==="auto"||d.width===null||d.autowidth){if(d.maxWidth==999999){j=true}}var h=d._views[d._view].type;var g=d._views[d._view];if(h=="monthView"&&d.resources&&d.resources.orientation=="none"&&!g.monthRowAutoHeight){var k=d.vScrollBar[0].style.visibility;d.hScrollBar[0].style.visibility="hidden";d.vScrollBar[0].style.visibility="hidden";if((k!=d.vScrollBar[0].style.visibility)){d._updatecolumnwidths()}return}var b=parseInt(d.scrollBarSize);var s=d.table?d.table.height():0;var i=0;var n="inherit";var k=d.vScrollBar[0].style.visibility;var o=d.hScrollBar[0].style.visibility;if(!r){var f=d.host.height()}else{var f=r}if(!d.columnGroups){f-=d.showHeader?d.columnsHeight:0}else{f-=d.showHeader?d.columnsheader.height():0}if(d.filterable){f-=d.filter.height()}if(d.pageable){f-=d.pagerHeight;if(d.pagerPosition==="both"){f-=d.pagerHeight}}if(d.showToolbar){f-=d.toolbarHeight}if(d.showLegend&&d._resources.length>0){f-=d.legendHeight}var m=false;if(d.height==="auto"||d.height===null||d.autoheight){if(d.maxHeight==999999){m=true}}if(!m&&s>f&&(d.getRows().length>0)){d.vScrollBar[0].style.visibility=n;i=4+parseInt(b);d.vScrollBar.jqxScrollBar({max:s-f})}else{d.vScrollBar[0].style.visibility="hidden"}if((k!=d.vScrollBar[0].style.visibility)){d._updatecolumnwidths()}var p=d.table?d.table.width():0;if(p>4){p-=4}var q=parseInt(d.host.css("border-left-width"))+parseInt(d.host.css("border-right-width"));var l=q+d.host.width()-i;if(p>l&&!j){d.hScrollBar[0].style.visibility=n;d.hScrollBar.jqxScrollBar({max:2+q+p-l});i=4+parseInt(b);if(b==0){i=0}if(!m&&s!=f){if(s>f-i+4&&(d.getRows().length>0)){d.hScrollBar.jqxScrollBar({max:q+p-l});var c=d.vScrollBar[0].style.visibility==="hidden";d.vScrollBar[0].style.visibility=n;d._updatecolumnwidths();if(c){d.hScrollBar.jqxScrollBar({max:p-l+q})}var e=d.table?d.table.width():0;if(e>3){e-=3}if(e!=p){if(e<l){d.hScrollBar.jqxScrollBar({max:q+e-l});d.hScrollBar[0].style.visibility="hidden";i=0}else{if(!c){d.hScrollBar.jqxScrollBar({max:p-l+q-b})}else{if(e>l){d.hScrollBar.jqxScrollBar({max:q+e-l})}}}}}if(s-f>0){d.vScrollBar.jqxScrollBar({max:s-f+i})}else{d.vScrollBar[0].style.visibility="hidden"}}}else{d.hScrollBar[0].style.visibility="hidden"}if(d.getRows().length===0){d.vScrollBar[0].style.visibility="hidden";d.bottomRight[0].style.visibility="hidden"}if(d.vScrollBar[0].style.visibility=="hidden"){if(d.vScrollInstance.value!=0){d.vScrollInstance.setPosition(0)}}},_measureElementWidth:function(d){var c=a("<span style='visibility: hidden; white-space: nowrap;'>"+d+"</span>");c.addClass(this.toTP("jqx-widget"));c.addClass(this.toTP("jqx-grid"));c.addClass(this.toTP("jqx-grid-column-header"));c.addClass(this.toTP("jqx-widget-header"));a(document.body).append(c);var b=c.outerWidth()+20;c.remove();return b},_arrangeAutoHeight:function(d){if(!d){d=0}if(this.height==="auto"||this.height===null||this.autoheight){var g=this.table.height();var f=0;this._hostHeight=null;if(!this.columnGroups){f+=this.showHeader?this.columnsHeight:-1}else{f+=this.showHeader?this.columnsheader.height():-1}f+=this.showLegend&&this._resources.length>0?this.legendHeight:0;f+=this.showToolbar?this.toolbarHeight:0;f+=this.pageable?this.pagerHeight:0;if(this.pagerPosition==="both"){f+=this.pageable?this.pagerHeight:0}f+=g;if(this.filterable){var e=this.filter.find(".filterrow");var b=this.filter.find(".filterrow-hidden");var c=1;if(b.length>0){c=0}f+=this.filterHeight-1+this.filterHeight*e.length*c}if(f+d>this.maxHeight){this.host.height(this.maxHeight)}else{this.host.height(f+d)}return true}return false},_arrangeAutoWidth:function(d){if(!d){d=0}if(this.width==="auto"||this.width===null||this.autowidth){this._hostWidth=null;var c=0;for(var e=0;e<this.columns.records.length;e++){var b=this.columns.records[e].width;if(this.columns.records[e].hidden){continue}if(b=="auto"){b=this._measureElementWidth(this.columns.records[e].text);c+=b}else{c+=b}}var f=c;if(f+d>this.maxWidth){this.host.width(this.maxWidth)}else{this.host.width(f+d)}return true}return false},_measureTopAndHeight:function(){var b=this.host.height();var c=0;if(this.showToolbar){c+=this.toolbarHeight;b-=parseInt(this.toolbarHeight)}if(this.showLegend&&this.legendPosition!="bottom"&&this._resources.length>0){c+=parseInt(this.legendHeight)+1}return{top:c,height:b}},_arrange:function(){if(!this.table){return}this._arrangeAutoHeight();this._arrangeAutoWidth();var d=this.legendHeight;if(this._resources.length==0){d=0}var t=this._hostWidth?this._hostWidth:this.host.width();var q=this._hostHeight?this._hostHeight:this.host.height();var j=q;var i=this;if(this.showLegend&&this.legendPosition=="top"){this.legendbartop[0].style.visibility="inherit"}else{this.legendbartop[0].style.visibility="hidden"}var p=0;if(this.showToolbar){this.toolbar.width(t);this.toolbar[0].style.height=this.toolbarHeight-1+"px";this.toolbar[0].style.top="0px";p+=this.toolbarHeight;q-=parseInt(this.toolbarHeight)}else{this.toolbar[0].style.height="0px"}if(this.showLegend&&this.legendPosition=="bottom"){this.legendbarbottom[0].style.width=t+"px";this.legendbarbottom[0].style.height=d+"px"}else{this