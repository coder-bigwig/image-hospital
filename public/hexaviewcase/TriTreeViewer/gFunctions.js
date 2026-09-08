'use strict';


// var requestData_timeoutID = null;
// var requestData_time = 0;

function initialize() {
	if (window.myNativeApp != undefined){
		m_gF.m_myOS = OS_Android;
	}
	else if (window.webkit != undefined &&
		window.webkit.messageHandlers != undefined &&
		window.webkit.messageHandlers.callApp != undefined){
		m_gF.m_myOS = OS_IOS;
	}
	else{
		m_gF.m_myOS = OS_Web;
	}

	if(window.myNativeApp && window.myNativeApp.callApp){
		window.myNativeApp.callApp("file downloaded");
	}
	else if(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.callApp){
		window.webkit.messageHandlers.callApp.postMessage("file downloaded");
	}

	m_gF.m_tabMyself.initSelfInfo().then(function() {
		/* 2021-03-04  登录时不获取关联医院的影像报告 */
		// m_gF.m_tabCase.checkSyncData();
	});

	m_gF.m_tabCase.checkOwnCase();
	m_gF.m_tabChat.connect2Server(); //连接websocket服务器

	// TODO 从本地读取 userID 和 name(昵称，备注) 映射表 替换 refreshTranID2NameArr
	m_gF.m_tabChat.readRelativeUsersFromDB().then(function(){
		m_gF.m_tabChat.checkChatTabMsg();
		m_gF.m_tabChat.m_friendList.refreshFriendList(); //初始化好友列表

	}).catch(function(e){
		console.log(e);
	});

	m_gF.m_tabChat.checkHideMsg();
	m_gF.m_tabMyself.setFontSize();
	m_gF.m_tabMyself.readTheme();

	if (m_gF.m_device != DEV_pc)
		m_gF.m_glViewer.readBackColor();

	if (m_gF.m_device == DEV_pc)
		$(document).contextmenu(function(e) { return false; });

	
	if (checkIOS() == 1)
		loadComingMsgMusic();

	if (m_gF.m_myOS == OS_IOS) {
		if (window.webkit != undefined && window.webkit.messageHandlers != undefined && window.webkit.messageHandlers.getClientID != undefined)
			window.webkit.messageHandlers.getClientID.postMessage("getClientID");
	} 
	else if (m_gF.m_myOS == OS_Android) {
		if (window.myNativeApp != undefined && window.myNativeApp.getClientID != undefined)
			window.myNativeApp.getClientID();
	}

	// 缓存apps模块
	m_gF.cacheApps();

	listenVisibilityChange();
}

function checkIOS() {
	var web = navigator.userAgent;
	//var isIOS = !!web.match(/\(i[^;]+;( U;)? +Mac OS X/);
	var isIOS = /Mac OS X/.test(navigator.userAgent);

	if (isIOS)
		return 1;
	else
		return 0;
}

function loadComingMsgMusic() {
	var audio = m_gF.m_tabChat.m_myChat.m_comingMsgAudioDom;
	var video = m_gF.m_glViewer.m_background.m_video;
	var first = 0;
	document.body.ontouchstart = function() {
		if (first == 0) {
			audio.load();
			video.load();
			first++;
		}
	}

	var finished = {audio: 0, video: 0};
	audio.oncanplay = function() {
		finished.audio = 1;
		if(finished.audio==1 && finished.video==1)
			document.body.ontouchstart = '';
	}
	video.oncanplay = function() {
		finished.video = 1;
		if(finished.audio==1 && finished.video==1)
			document.body.ontouchstart = '';
	}
}

/* H5监听浏览器被切换到后台或者手机锁屏 */
function listenVisibilityChange(){
	document.addEventListener("visibilitychange", () => {
		if(document.hidden) {
			// 页面被挂起
		}
		else {
			// 页面呼出
			m_gF.moveFront();
		}
	});
}


/* 切换页签（案例，影像，模型，交流，我的） */
function funGotoTab(tbIdx) {
	return new Promise(function(resolve, reject) {
		if (m_gF.m_curTab == tbIdx) {
			resolve();
			return;
		}
	
		if (m_gF.m_tabWait == true) {
			reject('wait for funGotoTab', "confirm");
			return;
		}
		else if(m_gF.m_layWait == true){
			reject("wait for funShowLayout", "confirm");
			return;
		}
	
		m_gF.m_tabWait = true;
		LOADING = true;

		if (tbIdx == TAB_case) {
			m_gF.m_curTab = tbIdx;
			changeSelectedTab();

			m_gF.m_tabCase.show().then(
				function(){
					m_gF.m_tabWait = false;
					LOADING = false;
					resolve();
				},
				function(e){
					m_gF.m_tabWait = false;
					LOADING = false;
					reject(e);
				}
			);
		}
		else if (tbIdx == TAB_img) {
			m_gF.m_curTab = tbIdx;
			changeSelectedTab();

			m_gF.m_tabImg.show().then(
				function(){
					m_gF.m_tabWait = false;
					LOADING = false;
					resolve();
				},
				function(e){
					m_gF.m_tabWait = false;
					LOADING = false;
					reject(e);
				}
			);
		}
		else if (tbIdx == TAB_chat) {
			m_gF.m_curTab = tbIdx;
			changeSelectedTab();

			m_gF.m_tabChat.show().then(
				function() {
					m_gF.m_tabWait = false;
					LOADING = false;
					resolve();

				},
				function(e){
					m_gF.m_tabWait = false;
					LOADING = false;
					reject(e);
				}
			);
		}
		else if (tbIdx == TAB_myself) {
			m_gF.m_curTab = tbIdx;
			changeSelectedTab();

			m_gF.m_tabMyself.show().then(
				function() {
					m_gF.m_tabWait = false;
					LOADING = false;
					resolve();
				},
				function(e){
					m_gF.m_tabWait = false;
					LOADING = false;
					reject(e);
				}
			);
		}
		else if (tbIdx == TAB_img2D) {
			m_gF.m_curTab = tbIdx;
			changeSelectedTab();

			m_gF.m_tabImg2D.show().then(
				function() {
					m_gF.m_tabWait = false;
					LOADING = false;
					resolve();
				},
				function(e){
					m_gF.m_tabWait = false;
					LOADING = false;
					reject(e);
				}
			);
		}
		else if(tbIdx == TAB_download){
			m_gF.m_curTab = tbIdx;
			changeSelectedTab();

			m_gF.m_tabDownload.show().then(
				function(){
					m_gF.m_tabWait = false;
					LOADING = false;
					resolve();
				},
				function(e){
					m_gF.m_tabWait = false;
					LOADING = false;
					reject(e);
				}
			);
		}
		else {
			m_gF.m_tabWait = false;
			LOADING = false;
			reject("Can't find tbIdx");
		}

	});
}

function changeSelectedTab() {
	var btnDoms = [];
	btnDoms[TAB_case] = document.getElementById('TAB_case');
	btnDoms[TAB_img] = document.getElementById('TAB_img');
	btnDoms[TAB_chat] = document.getElementById('TAB_chat');
	btnDoms[TAB_myself] = document.getElementById('TAB_myself');
	btnDoms[TAB_img2D] = document.getElementById('TAB_img2D');
	btnDoms[TAB_download] = document.getElementById('TAB_download');

	if (m_gF.m_curTab == TAB_case)
		changeTabStyle(btnDoms[TAB_case], 1);
	else
		changeTabStyle(btnDoms[TAB_case], 0);

	if (m_gF.m_curTab == TAB_img)
		changeTabStyle(btnDoms[TAB_img], 1);
	else
		changeTabStyle(btnDoms[TAB_img], 0);

	if (m_gF.m_curTab == TAB_img2D)
		changeTabStyle(btnDoms[TAB_img2D], 1);
	else
		changeTabStyle(btnDoms[TAB_img2D], 0);

	if (m_gF.m_curTab == TAB_chat)
		changeTabStyle(btnDoms[TAB_chat], 1);
	else
		changeTabStyle(btnDoms[TAB_chat], 0);

	if (m_gF.m_curTab == TAB_myself)
		changeTabStyle(btnDoms[TAB_myself], 1);
	else
		changeTabStyle(btnDoms[TAB_myself], 0);

	if (m_gF.m_curTab == TAB_download)
		changeTabStyle(btnDoms[TAB_download], 1);
	else
		changeTabStyle(btnDoms[TAB_download], 0);
}

function changeTabStyle(btnDom, flag) {
	if (btnDom == null)
		return;

	if (flag == 0) {
		// 未选中
		btnDom.classList.remove("checked");
	} else if (flag == 1) {
		// 选中
		btnDom.classList.add("checked");
	}
}

function checkCurrentTab(tbIdx) {
	if (m_gF.m_curTab == tbIdx)
		return;

	m_gF.m_curTab = tbIdx;
	changeSelectedTab();
}

function funShowLayout(dir, id) {
	return new Promise(function(resolve, reject) {
		var f = m_gF;

		if (f.m_curLay == id) {
			resolve();
			return;
		}

		if (f.m_layWait == true){
			reject("wait for funShowLayout");
			return;
		}
		f.m_layWait = true;

		if (f.m_device == DEV_pc)
			var url = 'data/layout/' + dir + '/' + id + '_PC.txt';
		else
			var url = 'data/layout/' + dir + '/' + id + '.txt';

		getUrlData(url).then(
			function(data) {
				funChangeInnerHTML(data);
				f.m_layWait = false;
				f.m_curLay = id;

				enableGoBack();
				if(typeof(m_generalReport2) == 'undefined' || !m_generalReport2){
					excuteAllBackFun();
				}
				resolve();
			},
			function(msg) {
				enableGoBack();
				f.m_layWait = false;
				reject(msg);
			}
		);
	});
}

function getUrlData(url) {
	return new Promise(function(resolve, reject) {
		if (m_prepareFile.m_urlFiles[url] == null) {

			var tmpurl = '';
			
			if (url.indexOf("?") >= 0) //判断url中是否已经带有参数
				tmpurl = url + "&v=" + m_prepareFile.m_appVersion;
			else
				tmpurl = url + "?v=" + m_prepareFile.m_appVersion;

			get(tmpurl).then(
				function(data) {
					m_prepareFile.m_urlFiles[url] = data;
					resolve(data);
				},
				function() {
					reject(commonText['text7']+"<br>"+tmpurl);
				}
			);

		}else{
			resolve(m_prepareFile.m_urlFiles[url]);
		}
	});
}

function getNetworkData(url, responseType, key, type, onProgress) {
	return new Promise(function(resolve, reject) {
		get(url, responseType, onProgress).then(
			function(xmlText) {
				if (type != 3) {
					var size = 0;
					if (typeof(xmlText) == "string")
						size = xmlText.length;
					else if (typeof(xmlText) == "object" && 'byteLength' in xmlText)
						size = xmlText.byteLength;

					updateCache(key, { cacheName: key, data: xmlText, type: type, size: size });
				}

				resolve(xmlText);
			},
			function() {
				reject(commonText['text7']+"<br>"+url);
			}
		);
	});
}

function funChangeInnerHTML(data) {
	var f = m_gF;

	var arr = document.body.getElementsByClassName('totalPage');
	for (var i = 0; i < arr.length; i++){
		// arr[0].parentNode.removeChild(arr[0]);
		$(arr[0]).detach();
	}

	$('body').append(data);

	var curLay, newLay;
	curLay = [];

	arr = document.body.getElementsByClassName('totalPage');
	if (arr.length > 0)
		curLay[0] = arr[0]; //  theLayout;
	else
		return;

	newLay = [];
	var xx = newLay.length;
	while (curLay.length > 0) {
		var item, name;
		for (var i = 0; i < curLay.length; i++) {
			item = curLay[i];
			name = item.getAttribute("name");

			for (var j = 0; j < item.childElementCount; j++)
				newLay[newLay.length] = item.children[j];

			if (name != null)
				for (var j = 0; j < f.m_allItems.length; j++) {
					if (f.m_allItemsID[j] == name) {
						item.appendChild(f.m_allItems[j]);
						newLay[newLay.length] = f.m_allItems[j];
						break;
					}
				}
		}
		curLay = newLay;
		newLay = [];
	}
}

function ensureDivInnerHtml(showDiv, showHtml) {
	var dom = document.getElementById(showDiv);

	if (dom == null) {
		dom = document.createElement("div");
		dom.id = showDiv;
	}

	$(dom).html(showHtml);
	document.getElementsByTagName("body")[0].appendChild(dom);

	if (dom.children.length == 0)
		return null;

	// 此处如果设置z-index为3 freezeScreen的showDoms将显示不出来
	// dom.children[0].style.zIndex = 3;

	return dom.children[0].id;
}


function disableBtn(selectorStr){
	$('#' + selectorStr).prop('disabled', true);
	$('#' + selectorStr).addClass('noClick');
}

function enableBtn(selectorStr){
	$('#' + selectorStr).prop('disabled', false);
	$('#' + selectorStr).removeClass('noClick');
}

function sendSplitFile(splitData, splitFileName, useOss, server) {
	if(arguments[3] == undefined){
		server = '0';
	}

	var apiUrl = BASE_URL + "/hexaApiServer";
	var request_para = {
		headers: { 'Authorization': 'hexalotus ' + m_gF.m_token },
		url: apiUrl + "/index.php/api/filectl/sendsplitfile",
		data: { fileData: splitData, splitFileName: splitFileName, useOss: useOss, server: server }
	};

	return new Promise(function(resolve, reject) {
		requestData(request_para).then(
			function(data){
				if (data.code == "0"){
					resolve();
				}
				else {
					reject("error");
				}
			},
			function(msg){
				reject(msg);
			}
		);
	});
}

function sendCombineCmd(fileName, total, useOss, server) {
	
	if(arguments[3] == undefined){
		server = '0';
	}
	return new Promise(function(resolve, reject) {

		var apiUrl = BASE_URL + "/hexaApiServer";
		var request_para = {
			headers: { 'Authorization': 'hexalotus ' + m_gF.m_token },
			url: apiUrl + "/index.php/api/filectl/sendcombinecmd",
			data: { fileName: fileName, total: total, useOss: useOss, server: server },
			checkPoorNetWork: false
		};

		requestData(request_para).then(
			function(data){
				if (data.code == "0"){
					resolve();
				}
				else {
					reject("error");
				}
			},
			function(msg){
				reject(msg);
			}
		);

		// $.ajax({
		// 	type: "POST",
		// 	headers: { 'Authorization': 'hexalotus ' + m_gF.m_token },
		// 	url: apiUrl + "/index.php/api/filectl/sendcombinecmd",
		// 	data: { fileName: fileName, total: total, useOss: useOss, server: server },
		// 	success: function(data) {
		// 		if (data.code == "0")
		// 			resolve();
		// 		else {
		// 			console.log(data.message);
		// 			reject();
		// 		}

		// 	},
		// 	error: function(error) {
		// 		console.log(error);
		// 		reject();
		// 	}
		// });
	});
}

function copyObject(fromPath, toPath, del, server) {
	if(arguments[3] == undefined){
		server = '0';
	}
	return new Promise(function(resolve, reject) {
		var apiUrl = BASE_URL + "/hexaApiServer";
		var request_para = {
			headers: { 'Authorization': 'hexalotus ' + m_gF.m_token },
			url: apiUrl + "/index.php/api/filectl/copyobject",
			data: { fromPath: fromPath, toPath: toPath, del: del, server: server },
			checkPoorNetWork: false
		};
		requestData(request_para).then(
			function(data){
				if (data.code == "0")
					resolve();
				else {
					reject("error");
				}
			},
			function(msg){
				reject(msg);
			}
		);
	});
}

function sendBase64File(dataUrl, useOss, path, server) {

	if(arguments[1] == undefined){
		useOss = '1';
	}
	if(arguments[2] == undefined){
		path = '';
	}
	if(arguments[3] == undefined){
		server = '0';
	}

	return new Promise(function(resolve, reject) {
		var dataArr = [];
		var len = dataUrl.length;
		var num = 0;
		var unitLen = 1024 * 1024;

		if (len == 0) { //数据为空直接返回空字符串
			resolve("");
			return;
		}

		while (len > 0) {
			if (len > unitLen)
				dataArr[num] = dataUrl.substr(num * unitLen, unitLen);
			else
				dataArr[num] = dataUrl.substr(num * unitLen);
			len -= unitLen;
			num++;
		}

		var myUserID = m_gF.m_user_id;
		var curTime = new Date().getTime();

		var combineName = myUserID + "_" + curTime + "_" + Math.random().toString().slice(2, 8) + ".dat";

		var promiseArray = [];
		for (var i = 0; i < dataArr.length; i++){
			promiseArray.push(sendSplitFile(dataArr[i], combineName+"_"+i+".txt", useOss, server));
		}

		Promise.all(promiseArray).then(
			function() {
				return sendCombineCmd(combineName, dataArr.length, useOss, server);
			}
		).then(
			function() {
				if (path == ''){
					resolve(combineName);
				}
				else {
					var key = path;
					if (path.substr(path.length - 1, 1) == '/'){
						key += combineName;
					}
					copyObject('tmp/combine/' + combineName, key, 1, server).then(
						function() { 
							resolve(key); 
						},
						function(msg){
							reject(msg);
						}
					);
				}
			}
		).catch(
			function(msg){
				reject(msg);
			}
		);
	});
}

function updateCache(key, val) {
	if(getWebPrefix() == "hexaweb"){
		m_myStorage.updateStore(m_myStorage.m_cacheStore, key, val);
	}
}



function loadNetworkData(url, responseType, type, onProgress) {
	return new Promise(function(resolve, reject) {
		if (type == 0 || type == 3) {
			getNetworkData(url, responseType, url, type, onProgress).then(
				function(xmlText) { 
					resolve(xmlText); 
				},
				function() { 
					reject("error"); 
				}
			);
		}
		else if (type == 1) {
			m_gF.m_tabImg2D.getUrlOSS(url).then(
				function(urlOSS) {
					getNetworkData(urlOSS, responseType, url, type, onProgress).then(
						function(xmlText) { 
							resolve(xmlText); 
						},
						function() { 
							reject("error"); 
						}
					);
				},
				function(msg) {
					reject(msg);
				}
			);
		} 
		else if (type == 2) {
			m_gF.m_tabImg.getUrlOSS(url).then(
				function(urlOSS) {
					getNetworkData(urlOSS, responseType, url, type, onProgress).then(
						function(xmlText) { 
							resolve(xmlText); 
						},
						function() { 
							reject("error"); 
						}
					);
				},
				function(msg) { 
					reject(msg);
				}
			);
		}
	});
}

function loadCacheData(url, type) {
	return new Promise(function(resolve, reject) {
		if (type == 3) {
			reject(url);
			return;
		}

		m_myStorage.getDataByKey(m_myStorage.m_cacheStore, url).then(
			function(result) {
				resolve(result.data);
			},
			function() { 
				reject(url); 
			}
		);
	});
}

/*
	type:  0:direct down url   1:first get OSS url 2d   2:first get OSS url 3d  3:tmp data,not save cache
*/
function loadData(url, responseType, type, onProgress){
	return new Promise(function(resolve, reject) {
		loadCacheData(url, type).then(
			function(xmlText) {
				resolve(xmlText);
			},
			function() {
				loadNetworkData(url, responseType, type, onProgress).then(
					function(xmlText) { 
						resolve(xmlText);
					},
					function(msg) {
						reject(msg);
					}
				);
			}
		);
	});
}

/*
	type:  0:direct down url   1:first get OSS url 2d   2:first get OSS url 3d  3:tmp data,not save cache
*/
function load3dCaseData(url, responseType, type, onProgress){
	return new Promise(function(resolve, reject) {
		loadCacheData(url, type).then(
			function(xmlText) {
				resolve(xmlText);
			},
			function() {
				m_gF.m_tabImg.getUrlOSS(url).then(
					function(urlOSS) {
						getNetworkData(urlOSS, responseType, url, 3, onProgress).then(
							function(xmlText) { 
								resolve(xmlText); 
							},
							function() { 
								reject("error"); 
							}
						);
					},
					function(msg) { 
						reject(msg);
					}
				);
			}
		);
	});
}

function get(url, responseType, onProgress) {
	return new Promise(function(resolve, reject) {
		
		if(navigator.onLine === false){
			reject();
			return;
		}

		// Do the usual XHR stuff
		var req = new XMLHttpRequest();
		req.open('GET', url);

		if (typeof responseType != 'undefined') {
			if (responseType == 'xml')
				req.overrideMimeType('text/xml; charset=GB18030');
			else
				req.responseType = responseType;
		}

		req.onload = function() {
			// This is called even on 404 etc
			// so check the status
			if (req.status == 200) {
				// Resolve the promise with the response text
				resolve(req.response);
			} else {
				reject();
				// Otherwise reject with the status text
				// which will hopefully be a meaningful error
				//reject(Error(req.statusText));
			}
		};

		req.onprogress = function(e) {
			if (e.lengthComputable && typeof onProgress === 'function') {
				let per = parseInt((e.loaded/e.total) * 100);
				onProgress(per);
				// console.log(per + '%');
			}
		};

		// Handle network errors
		req.onerror = function() {
			reject();
		};

		// Make the request
		req.send();
	});
}



// on how to use prommise: https://developers.google.com/web/fundamentals/primers/promises
function promiseDownLoadTo(url, toNd, responseType, type, scope) {
	return new Promise(function(resolve, reject) {
		loadData(url, responseType, type).then(
			function(response) {
				var value = { nd: toNd, byteArr: response };
				value.nd.createImgData(scope.m_triFather, value.byteArr, scope.m_dir, scope.m_col, scope.m_line);
				resolve();
			},
			function(msg) {
				reject(msg);
			}
		);
	});
}

function byteConvert(bytes) {
	if (isNaN(bytes))
		return '';

	var symbols = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	var exp = Math.floor(Math.log(bytes) / Math.log(2));
	if (exp < 1)
		exp = 0;

	var i = Math.floor(exp / 10);
	bytes = bytes / Math.pow(2, 10 * i);

	if (bytes.toString().length > bytes.toFixed(2).toString().length)
		bytes = bytes.toFixed(2);

	return bytes + ' ' + symbols[i];

}


var m_goBackFlag = 0;
var m_goBackFun = [];
var m_pageBackFun = [];

function setGoBackFun(funText, type = 1) {
	if (type == 1) {
		if (funText == '')
			m_goBackFun = [];
		else
			m_goBackFun.push(funText);
	} else {
		if (funText == '')
			m_pageBackFun = [];
		else
			m_pageBackFun.push(funText);
	}
}

function disableGoBack() {
	m_goBackFlag = 1;
}

function enableGoBack() {
	m_goBackFlag = 0;
}

function excutedGoBack() {
	if (m_goBackFun.length != 0)
		m_goBackFun.length -= 1;
}

function excuteAllBackFun() {
	var len = m_goBackFun.length;
	for (var i = 0; i < len; i++) {
		goBackPage();
	}
	setGoBackFun('', 1);
	setGoBackFun('', 2);
}

function isJSON(str) {
	if (typeof str == 'string') {
		try {
			var obj = JSON.parse(str);
			if (typeof obj == 'object' && obj) {
				return true;
			} else {
				return false;
			}

		} catch (e) {
			console.log('error：' + str + '!!!' + e);
			return false;
		}
	}
	console.log('It is not a string!');
}

function callphpByCurl(phpUrl, phpPara) {
	return new Promise(function(resolve, reject) {
		var request_para = {
			headers: { 'Authorization': 'hexalotus ' + m_gF.m_token },
			url: m_apiUrl + "/index.php/api/extserver/callphpbycurl",
			data: { phpUrl: phpUrl, phpPara: phpPara }
		};
		requestData(request_para).then(
			function(ret){
				if (ret.code != "0")
					reject("error");
				else
					resolve(ret.data.result);
			},
			function(msg){
				if(msg == "timeout"){
					reject("timeout");
				}
				else if(msg == "offline"){
					reject("offline");
				}
				else{
					reject("error");
				}
			}
		);
	});
}

function limitInputWords(self, num){
	var value = self.value;
	var len = self.maxLength;

	if(len == -1)
		len = 50;
	
	if(typeof(num) != 'undefined')
		len = num;

	if(value.length > len)
		self.value = value.slice(0, len);
}

/* 缓存图片 */
function cacheImg(arr) {
	var img;
	for(var i=0; i<arr.length; i++){
		img = new Image();
		img.src = arr[i];
	}
}

// 给某个DOM节点添加遮罩层
function coverDom(targetDom) {
	if(!targetDom) return;

	targetDom.classList.add("relative");
	var layer = document.createElement("div");
	layer.className = "cover_layer";
	$(layer).css({ "position": "absolute", "top": "0", "left": "0", "width": "100%", "height": "100%" });
	targetDom.appendChild(layer);
	return layer;
}

// 给某个DOM节点添加遮罩层
function coverDom2(targetDom) {
	if(!targetDom) return;

	var layer = document.createElement("div");
	layer.className = "cover_layer";
	$(layer).css({ "position": "absolute", "top": "0", "left": "0", "width": "100%", "height": "100%" });
	targetDom.appendChild(layer);
	return layer;
}

// 清除某个节点的遮罩层
function clearCoverDom(targetDom) {
	if(!targetDom) return;
	var layer = targetDom.querySelector(".cover_layer");
	if(!layer) return;

	targetDom.classList.remove("relative");
	layer.remove();
}

// 获取元素样式
function getStyle(ele) {
	var style = null;
	if (window.getComputedStyle) {
		style = window.getComputedStyle(ele, null);
	} else {
		style = ele.currentStyle;
	}
	return style;
}

// 获取css属性值
function getStyleByAttr(element, attr){
	if(element.currentStyle){
		return element.currentStyle[attr];
	}else{
		return window.getComputedStyle(element,null)[attr];
	}
}

function isPC() {
	return !isMobile();
}

function isMobile() {
	var ua = navigator.userAgent;

	//移动端
	var ret1 = /Android|Adr|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini|Mobile/.test(ua); 
	
	//ios端
	// var ret2 = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	var ret2 = /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(ua);


	if(ret1 || ret2){
		return true;
	}

	return false;
}


/* 根据用户设置的语言翻译html文档(仅限通过Apps加载的模块)
	sourceName: 资源文件名称,
	path: 资源文件路径,
	dom: 作用的dom
 */
function execI18n(sourceName, path, dom) {
	m_userLanguage.execI18nByApps(sourceName, path, dom);
}

/*
	根据当前设置的语言转换文本
*/
function tranText(text){
	return m_userLanguage.tranText(text);
}


/*
	转换本地时间为指定时区的时间
	date: date对象
	timeZone:指定时区, 东八区为8
*/
function tranDateByTimeZone(date, timeZone) {
	try {
		var timezone = timeZone; //目标时区时间，东八区
		var offset = date.getTimezoneOffset(); //格林威治的时间 - 本地时间 ，单位为分钟
		var tranCurDate = new Date(date.getTime() + offset * 60 * 1000 + timezone * 60 * 60 * 1000);
		return tranCurDate;

	} catch (e) {
		return date;
	}

}

/* 隐藏多个按钮 */
function hideButtons(btns){
	try{
		for(var i=0; i<btns.length; i++){
			$(btns[i]).addClass("hide");
		}
	}catch(e){
		console.log(e);
	}
}

/* 隐藏一个按钮 */
function hideButton(btn){
	try{
		$(btn).addClass("hide");
	}catch(e){
		console.log(e);
	}
}

/* 显示多个按钮 */
function showButtons(btns){
	try{
		for(var i=0; i<btns.length; i++){
			$(btns[i]).removeClass("hide");
		}
	}catch(e){
		console.log(e);
	}
}

/* 显示一个按钮 */
function showButton(btn){
	try{
		$(btn).removeClass("hide");
	}catch(e){
		console.log(e);
	}
}

/*
	当前版本号与指定版本号比较
	version: 指定版本号
*/
function compareVersion(version){
	var curVersion = localStorage.getItem(getWebPrefix()+"_WebVersion");
	if(!curVersion){
		return "";
	}

	var version_arr = version.split(".");
	var curVersion_arr = VERSION.split(".");

	var i, j, count;

	if(version_arr.length < curVersion_arr.length){
		count = curVersion_arr.length - version_arr.length;
		for(j=0; j<count; j++){
			version_arr.push("0");
		}
	}
	else if(version_arr.length > curVersion_arr.length){
		count = version_arr.length - curVersion_arr.length;
		for(j=0; j<count; j++){
			curVersion_arr.push("0");
		}
	}

	for(i=0; i<version_arr.length; i++){
		if(version_arr[i].length < curVersion_arr[i].length){
			count = curVersion_arr[i].length - version_arr[i].length;
			for(j=0; j<count; j++){
				version_arr[i] += "0";
			}
		}
		else if(version_arr[i].length > curVersion_arr[i].length){
			count = version_arr[i].length - curVersion_arr[i].length;
			for(j=0; j<count; j++){
				curVersion_arr[i] += "0";
			}
		}

		if(parseInt(curVersion_arr[i]) < parseInt(version_arr[i])){
			return "less"; //当前版本小于指定版本
		}
		else if(parseInt(curVersion_arr[i]) > parseInt(version_arr[i])){
			return "greater"; //当前版本大于指定版本
		}
	}

	return "equal"; //当前版本等于指定版本
}

/* 给元素添加高斯模糊 */
function blurEle(ele){
	if(ele){
		ele.classList.add("gaussian_blur");
	}
}

/* 清除元素的高斯模糊 */
function clearBlurEle(ele){
	if(ele){
		ele.classList.remove("gaussian_blur");
	}
}

function getWebPrefix() {
	if(m_webPrefix)
		return m_webPrefix;
	var webPrefix = "hexaweb";
	if (window.location.pathname.toLowerCase().indexOf("hexaviewcase") != -1) {
		webPrefix = "hexaviewcase";
	}
	m_webPrefix = webPrefix;
	return m_webPrefix;
}


var requestData_timeoutID = null;
function requestData(para){
	return new Promise(function(resolve, reject){
		var headers = {};
		var type = "POST";
		var dataType = "json";
		var cache = false;
		var timeout = 0;//默认不超时
		var data = {};
		var checkPoorNetWork = true;

		if(typeof(para.headers) != 'undefined'){
			headers = para.headers;
		}
		if(typeof(para.type) != 'undefined'){
			type = para.type;
		}
		if(typeof(para.data) != 'undefined'){
			data = para.data;
		}
		if(typeof(para.dataType) != 'undefined'){
			dataType = para.dataType;
		}
		if(typeof(para.cache) != 'undefined'){
			cache = para.cache;
		}
		if(typeof(para.timeout) != 'undefined'){
			timeout = para.timeout;
		}
		if(typeof(para.checkPoorNetWork) != 'undefined'){
			checkPoorNetWork = para.checkPoorNetWork;
		}

		if(!para.url){
			console.log({ msg:'missing request url' });
			reject('missing url');
			return;
		}
		if(navigator.onLine === false){
			reject("offline");
			return;
		}

		clearRequestDataTimeoutID();
		if(checkPoorNetWork){
			checkPoorNetworkByRequestData();
		}

		var startTime = new Date().getTime();
		// console.log('startTime'+startTime);
		var endTime = 0;

		$.ajax({
			headers: headers,
			type: type,
			url: para.url,
			data: data,
			dataType: dataType,
			cache: cache,
			timeout: timeout,
			success: function(res){
				endTime = new Date().getTime();
				// console.log('startTime'+startTime+', '+'endTime:'+endTime);
				clearRequestDataTimeoutID();
				checkNormalNetwork(startTime, endTime);

				resolve(res);
			},
			error: function(xhr, textStatus, errorThrown){
				endTime = new Date().getTime();
				clearRequestDataTimeoutID();
				checkNormalNetwork(startTime, endTime);
				
				if(textStatus=='timeout') {
					reject('timeout');
				}
				else{
					if(xhr.readyState != 0){
						var str = 'status:' + xhr.status + ';<br>\
							readyState:' + xhr.readyState + ';<br>\
							statusText:' + xhr.statusText + ';<br>\
							responseText:' + xhr.responseText;
						sendErrorLogToServer(str);
					}
					reject('error');
				}
			}
		});
	});
}


function checkNormalNetwork(startTime, endTime){
	var interval = endTime - startTime;
	//请求与响应之间小于3000ms视为网络正常
	if(interval < 3000 && m_network.m_type != "4g"){
		handleNetworkByState("normal");
	}
}

function clearRequestDataTimeoutID(){
	if(requestData_timeoutID != null){
		clearTimeout(requestData_timeoutID);
	}
}

function checkPoorNetworkByRequestData(){
	requestData_timeoutID = setTimeout(() => {
		layer.msg(commonText['text10'], {icon: 0, time: 2000});
		handleNetworkByState("poor");
	}, 3000);
}

/* 
	刷新网络状态
*/
function handleNetworkByState(state){
	if(!m_network){
		return;
	}

	if(state == "poor"){
		m_network.m_type = "2g";
	}
	else if(state == "normal"){
		m_network.m_type = "4g";
	}


	m_network.updateNetworkIcon();
}

function sendErrorLogToServer(str){
	$.ajax({
		headers: { 'Authorization': 'hexalotus ' + m_gF.m_token },
		url: m_apiUrl + "/index.php/api/errormsg/saveerrormsg",
		data: { userID: m_gF.m_user_id, errorMsg: str },
		type: "POST",
		dataType: "json",
		cache: false,
		timeout: 10000,
		success: function(ret){},
		error: function(xhr, textStatus, errorThrown){}
	});
}

function showMsg(para){
	if(m_myMsgDialog){
		m_myMsgDialog.showMsg(para);
	}
}

function prompt(para){
	if(m_myMsgDialog){
		m_myMsgDialog.prompt(para);
	}
}

function getConvertLan(name='', key='', lan=''){
	key = window.decodeURI(key)
	if(name=='' || key=='' || lanMap[name]==undefined){
		return key;
	}

	if(lan == ''){
		lan = getUserLanguage();
	}

	key = key.toLowerCase();
	key = key.trim();
	var map = lanMap[name];
	if(map[key]==undefined || map[key][lan]==undefined){
		return key;
	}
	return map[key][lan];
}

function getUserLanguage() {
	var lan = localStorage.getItem(getWebPrefix() + "_language");
	if (lan) { return lan; }
	return BASE_LAN;
}