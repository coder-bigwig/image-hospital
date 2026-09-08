'use strict';

var BASE_URL = window.location.protocol + "//" + window.location.host;
var BASE_LAN = "zh";
var Server_Address = 0; //0-中国  1-国外
// Keep the original signed-object flow. The CDN variant returns encoded object
// paths that the viewer treats as a different resource and leaves the volume
// canvas empty in a local origin.
var USE_CDN = 0; // 0-不使用  1-使用

var m_apiUrl = BASE_URL + "/hexaApiServer";
var m_saleApiUrl = BASE_URL + "/saleApiServer";
var m_url = parseURL(window.location);
var m_webPrefix = null;
var viewer_debug = false;


if (window.location.host == "localhost") {
	//BASE_URL = "http://develop.hexalotus.com";
	// BASE_URL = "http://localhost";
	m_apiUrl = BASE_URL + "/hexaApiServer";
	m_saleApiUrl = BASE_URL + "/saleApiServer";
}

if (window.location.host == "sgp.hexalotus.com") {
	Server_Address = 1;
	BASE_LAN = "en";
	m_apiUrl = window.location.protocol + "//" + 'www.hexaunion.com' + "/hexaApiServer-sgp";
	m_saleApiUrl = window.location.protocol + "//" + 'www.hexaunion.com' + "/saleApiServer";
}

if (window.location.host == "localhost" || window.location.host == "develop.hexalotus.com") {
	viewer_debug = true;
}

;(function(){
	var ua = window.navigator.userAgent.toLowerCase();
	var protocol = window.location.protocol;

	if(ua.match(/MicroMessenger/i) == "micromessenger" || ua.match(/wxwork/i) == 'wxwork'){
		document.write('<script src="'+protocol+'//res.wx.qq.com/open/js/jweixin-1.6.0.js"><\/script>');
	}

})();


function parseURL(url) {
	var a = document.createElement('a');
	a.href = url;
	return {
		source: url,
		protocol: a.protocol.replace(':', ''),
		host: a.hostname,
		port: a.port,
		query: a.search,
		file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
		hash: a.hash.replace('#', ''),
		path: a.pathname.replace(/^([^\/])/, '/$1'),
		relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
		segments: a.pathname.replace(/^\//, '').split('/'),
		params: (function() {
			var ret = {},
				seg = a.search.replace(/^\?/, '').split('&'),
				len = seg.length,
				i = 0,
				s;
			for (; i < len; i++) {
				if (!seg[i]) { continue; }
				s = seg[i].split('=');
				ret[s[0]] = s[1];
			}
			return ret;
		})()
	};
}

/*
 * 原生返回键触发此函数
 */ 
function goBackPage() {
	if (m_goBackFlag == 1)
		return 1;

	if (m_goBackFun.length != 0) {
		try {
			eval(m_goBackFun[m_goBackFun.length - 1]);
			return 1;
		} catch (e) {
			return 1;
		}
	} 
	else if (m_pageBackFun.length != 0) {
		try {
			eval(m_pageBackFun[m_pageBackFun.length - 1]);
			return 1;
		} catch (e) {
			return 1;
		}
	} 
	else
		return 0;
}
