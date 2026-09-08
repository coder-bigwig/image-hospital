'use strict'; 

var m_gF = null;
var m_prepareFile = null;

var CASE_mainPage = 100;
var CASE_caseList = 101;

var IMG_3dModel = 200;
var IMG_axial = 201;
var IMG_coronal = 202;
var IMG_sagittal = 203;
var IMG_3dAndAxial = 204;
var IMG_3dAndTree = 205;
var IMG_axialAndTree = 206;
var IMG_coronalAndTree = 207;
var IMG_sagittalAndTree = 208;
var IMG_3dAndVeslabel = 209;
var IMG_3dAndCoronal = 210;
var IMG_3dAndSagittal = 211;
var IMG_3dAndAR = 212;
var IMG_3dAndCropbox = 213;

var CHAT_sessionList = 300;
var CHAT_friendList = 301;
var CHAT_mychat = 302;
var CHAT_sessionInfo = 309;

var MYSELF_myselfMain = 400;

var TAB_case=1;
var TAB_img=2;
var TAB_chat = 3;
var TAB_myself = 4;
var TAB_img2D = 5;
var TAB_download = 6;

var DEV_mob = 1;
var DEV_pc = 2;

var OS_Web = 0;
var OS_Android = 1; 
var OS_IOS = 2;

var Permission_Camera = 1;
var Permission_Calendar = 2;
var Permission_Audio = 3;
var Permission_File = 4;

var LOADING = false;


window.onload = function(){
	m_myMsgDialog = new MyMsgDialog();
	m_network = new Network();
	m_prepareFile = new PrepareFile();

	m_prepareFile.loadFile();
	document.body.addEventListener('touchstart', function(){}); //开启IOS :active 效果
}

window.onerror = function(msg, url, linenumber) {
	var str = 'window onerror;<br>\
		msg:'+msg+';<br>\
		url:'+url+';<br>\
		linenumber:'+linenumber;
	sendErrorLogToServer(str);
}

window.onbeforeunload = function(event) {
	if (typeof(m_gF) != 'undefined' && m_gF != null){
		Module.sceneTreeDel(m_gF.m_SRH);
	}
}

window.onresize = function() {
	if (typeof(m_gF) == 'undefined' || m_gF == null || m_gF.m_curTab === null){
		return;
	}
	m_gF.resize();
}


function initViewer(){
	try{
		if(getWebPrefix() == "hexaweb"){
			initHexaWeb();
		}
		else if(getWebPrefix() == "hexaviewcase"){
			initHexaView();
		}
		else {
			initHexaView();
		}
	}
	catch (e) {
		console.log(e);
	}
}

function initHexaWeb(){
	var usePC = sessionStorage.getItem(getWebPrefix()+"_usePC");
	var user_id = sessionStorage.getItem(getWebPrefix()+"_user_id");
	var token = sessionStorage.getItem(getWebPrefix()+"_token");
	var urlpara = sessionStorage.getItem(getWebPrefix()+"_urlpara");
	var resourceProxy = sessionStorage.getItem(getWebPrefix()+"_resourceProxy");
	var resProxyUrl = sessionStorage.getItem(getWebPrefix()+"_resProxyUrl");
	var apiProxyUrl = sessionStorage.getItem(getWebPrefix()+"_apiProxyUrl");
	
	if( usePC!="1" && user_id==null )
		window.location.replace("index.html?t="+Date.now());

	if(resourceProxy == "1")
		resourceProxy = 1;
	else
		resourceProxy = 0;

	if(apiProxyUrl != null)
		m_apiUrl = apiProxyUrl;

	if(usePC == "1"){
		m_gF = new TriTreeViewer(DEV_pc);
		m_gF.m_user_id = user_id;
		m_gF.m_token = token;
		m_gF.m_urlpara = urlpara;
		m_gF.m_resourceProxy = resourceProxy;
		m_gF.m_resProxyUrl = resProxyUrl + "?path=";

		initialize();
		funGotoTab(TAB_chat);
	}
	else
	{
		m_gF = new TriTreeViewer(DEV_mob);
		m_gF.m_user_id = user_id;
		m_gF.m_token = token;
		m_gF.m_resourceProxy = resourceProxy;
		m_gF.m_resProxyUrl = resProxyUrl + "?path=";

		initialize();
		funGotoTab(TAB_case);
	}

	try{
		m_gF.m_tabDownload.m_divDom.style.display = "none";
	}
	catch (e) {
		console.log(e);
	}

	m_userLanguage.switchLanguage();
}

function initHexaView(){
	var user_id = sessionStorage.getItem('hexaviewcase_user_id');
	var token = sessionStorage.getItem('hexaviewcase_token');
	var viewCaseID = sessionStorage.getItem('hexaviewcase_viewCaseID');
	var viewResultName = sessionStorage.getItem('hexaviewcase_viewResultName');
	var autoSwitch = sessionStorage.getItem('hexaviewcase_autoSwitch');
	var checkAudit = sessionStorage.getItem('hexaviewcase_checkAudit');
	var hidePatient = sessionStorage.getItem('hexaviewcase_hidePatient');
	var apiProxyUrl = sessionStorage.getItem('hexaviewcase_apiProxyUrl');
	
	var urlPara = parseURL(window.location);
	if (!user_id && !token && urlPara.params.para) {
		try {
			var rawPara = decodeURIComponent(urlPara.params.para);
			var parsedPara = JSON.parse(atob(rawPara));
			user_id = String(parsedPara.visitor_id || "");
			token = parsedPara.visitor_token || "";
			viewCaseID = parsedPara.caseID || "";
			viewResultName = parsedPara.resultName || "";
			autoSwitch = parsedPara.autoSwitch || 0;
			hidePatient = parsedPara.hidePatient || 0;
			sessionStorage.setItem('hexaviewcase_user_id', user_id);
			sessionStorage.setItem('hexaviewcase_token', token);
			sessionStorage.setItem('hexaviewcase_viewCaseID', viewCaseID);
			sessionStorage.setItem('hexaviewcase_viewResultName', viewResultName);
			sessionStorage.setItem('hexaviewcase_autoSwitch', autoSwitch);
			sessionStorage.setItem('hexaviewcase_hidePatient', hidePatient);
		} catch (error) {
			console.warn('Invalid viewer parameter', error);
		}
	}

	if(apiProxyUrl)
		m_apiUrl = apiProxyUrl;

	m_gF = new TriTreeViewer(DEV_mob);

	if(viewCaseID){
		m_gF.m_user_id = user_id;
		m_gF.m_token = token;
		m_gF.m_hidePatient = hidePatient;
		
		listenVisibilityChange();

		m_gF.m_tabMyself.initSelfInfo().then(function() {
			return funGotoTab(TAB_img);

		}).then(function() {
			return m_gF.m_tabCase.m_caseList.getUploadedResults(viewCaseID, checkAudit);

		}).then(function (data) {
			//检查案例可打开的结果列表，若列表中包含目标结果flag置0，否则为1
			var flag = 1;
			var results = data.result;
			for(var i=0;i<results.length;i++){
				if(results[i].name == viewResultName){
					flag = 0;
					break;
				}
			}
			//若flag为1，若autoSwitch不为1或无查看结果，打开失败，否则switch为第一个可查看结果
			if(flag == 1){
				if(autoSwitch != 1 || results.length == 0){
					return Promise.reject(viewerText['text8']);
				}
				viewResultName = results[0].name;
			}

			//打开结果查看
			return m_gF.m_io.loadResult(m_gF, viewCaseID, viewResultName);

		}).then(function(){
			m_gF.m_tabImg.checkShowBtns({});
			m_gF.updateViews();
			m_gF.m_mdTree.resetModelTree();
		}).catch(function(msg){
			showMsg({ msg:msg });
		});
		
	}
	else{
		funGotoTab(TAB_img).then(function () {
			showMsg({ msg:viewerText['text53'] });
		});
	}

	try{
		m_gF.m_tabCase.m_divDom.style.display = "none";
		m_gF.m_tabChat.m_divDom.style.display = "none";
		m_gF.m_tabMyself.m_divDom.style.display = "none";
		// $(m_gF.m_tabImg.m_screenDrawBtnDom.parentNode).remove();
		m_gF.m_tabImg2D.m_image2dView.m_screenDrawBtnDom.style.display = "none";
		$("#logoImg").hide();
	}catch (e) {
		console.log(e);
	}

	m_userLanguage.switchLanguage();
}


var PrepareFile = function()
{
	if (window.location.href.toLocaleLowerCase().indexOf(getWebPrefix()+"-") != -1) {
		this.m_developer = 1;
	}
	else{
		this.m_developer = 0;
	}

	window.location.host == ""

	this.m_jsFileList = jsFileList;
	this.m_cssFileList = cssFileList;
	this.m_appsFileList = appFileList;

	// this.m_maxRetryCount = 5;
	// this.m_curRetryCount = 0;

	if(this.m_developer == 1)
		this.m_jsFileList = jsFileListDev;

	this.m_appVersion = sessionStorage.getItem(getWebPrefix()+"_version");

	this.m_jsFiles = [];
	this.m_cssFiles = [];
	this.m_urlFiles = [];

	this.m_domList = [];
}

PrepareFile.prototype.loadFile = function()
{
	this.loadNetworkFiles();
}

PrepareFile.prototype.loadNetworkFiles = function()
{
	var that = this;
	var promiseArray = [];
	// this.m_curRetryCount ++;


	for(var i=0;i<this.m_cssFileList.length;i++){
		promiseArray.push(this.downNetworkFiles(this.m_cssFileList[i], 2));
	}
	for(var i=0;i<this.m_jsFileList.length;i++){
		promiseArray.push(this.downNetworkFiles(this.m_jsFileList[i], 1));
	}
	for(var i=0;i<this.m_appsFileList.length;i++){
		promiseArray.push(this.downNetworkFiles(this.m_appsFileList[i], 3));
	}


	Promise.all(promiseArray).then(function() {
		initViewer();

	}).catch(function(e){
		console.log(e);
		var tmp;
		for(tmp of that.m_domList){
			$(tmp).remove();
		}
		that.m_domList.splice(0, that.m_domList.length);

		// if(that.m_curRetryCount <= that.m_maxRetryCount){
		// 	that.loadNetworkFiles();
		// }
		// else{
			sessionStorage.setItem(getWebPrefix()+"_LoadFailed", 1);
			window.location.replace("index.html?loadfailed&t="+Date.now());
		// }
	});
}

PrepareFile.prototype.downNetworkFiles = function(url, type)
{
	var that = this;
	var tmpurl = '';

	if(url.indexOf("?")>=0) //判断url中是否已经带有参数
		tmpurl = url + "&v=" + that.m_appVersion;
	else
		tmpurl = url + "?v=" + that.m_appVersion;

	return new Promise(function(resolve, reject) {
		that.downLoadFileByXML(tmpurl).then(function(xmlText){
			if(type != 3){
				that.appendFileForDeveloper(type, tmpurl, xmlText).then(function(){
					resolve();
				});
			}
			else{
				that.appendFileForDeveloper(type, url, xmlText).then(function(){
					resolve();
				});
			}

		}, function(url){
			reject(url);
		});
	});
}

PrepareFile.prototype.downLoadFileByXML = function(url)
{
	var that = this;
	return new Promise(function(resolve, reject)
	{
		var client = new XMLHttpRequest();
		client.index = 0;
		client.open('GET', url);

		client.onload = function() 
		{
			if (client.status == 200) 
				resolve(this.response);
			else
				reject(url);
		};

		client.onerror = function() 
		{
			reject(url);
		};

		client.send(null);
	});
}

PrepareFile.prototype.appendFileForDeveloper = function(type, url, code)
{
	var that = this;
	return new Promise(function(resolve, reject) 
	{
		var head = document.head || document.getElementsByTagName('head')[0];
		var dom = null;

		if(type == 1) // js
		{
			dom = document.createElement('script');
			dom.src = url;
		}
		else if(type == 2) // css
		{
			dom = document.createElement('link'); 
			dom.type = 'text/css'; 
			dom.rel = "stylesheet";
			dom.href = url;
		}
		else if(type == 3) // url file
		{
			that.m_urlFiles[url] = code;
			resolve();
			return;
		}

		head.appendChild(dom);
		that.m_domList.push(dom);

		dom.onload = dom.onreadystatechange = function(){
			if(!dom.readyState || /loaded|complete/.test(dom.readyState)){
				resolve();
			}
		}

		dom.onerror = function(){
			reject();
		}

	});
}

PrepareFile.prototype.appendFile = function(type, url, code)
{
	var head = document.head || document.getElementsByTagName('head')[0];
	var dom = null;

	if(type == 1)	// js
	{
		dom = document.createElement('script'); 
		dom.type = "text/javascript";
		dom.id= url;
		try {
			dom.appendChild(document.createTextNode(code));
		} catch (ex) {
			dom.text = code;
		}
	}
	else if(type == 2)		// css
	{
		dom = document.createElement('style'); 
		dom.type = 'text/css'; 
		dom.innerHTML= code; 
	}
	else if(type == 3)		// url file
	{
		this.m_urlFiles[url] = code;
		return;
	}

	head.appendChild(dom);
}
 

