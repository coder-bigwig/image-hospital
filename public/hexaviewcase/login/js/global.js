var VERSION = "1.1.54";
var BASE_URL = window.location.protocol + "//" + window.location.host;
var BASE_LAN = "zh";
var Server_Address = 0; //0-中国  1-新加坡

var m_apiUrl = BASE_URL + "/hexaApiServer";
var m_saleApiUrl = BASE_URL + "/saleApiServer";
// var m_url = parseURL(window.location);
var m_webPrefix = null;
var viewer_debug = false;


if (window.location.host == "localhost") {
	//BASE_URL = "http://develop.hexalotus.com";
	BASE_URL = "http://localhost";
	m_apiUrl = BASE_URL + "/hexaApiServer";
	m_saleApiUrl = BASE_URL + "/saleApiServer";
}

if (window.location.host == "sgp.hexalotus.com") {
	Server_Address = 1;
	BASE_LAN = "en";
	m_apiUrl = window.location.protocol + "//" + 'www.hexaunion.com' + "/hexaApiServer-sgp";
	m_saleApiUrl = window.location.protocol + "//" + 'www.hexaunion.com' + "/saleApiServer";
}

if (window.location.host == "localhost") {
	viewer_debug = true;
}

checkHTMLVersion();


;(function(){
	var ua = window.navigator.userAgent.toLowerCase();
	var protocol = window.location.protocol;

	if(ua.match(/MicroMessenger/i) == "micromessenger" || ua.match(/wxwork/i) == 'wxwork'){
		document.write('<script src="'+protocol+'//res.wx.qq.com/open/js/jweixin-1.6.0.js"><\/script>');
	}
})();


function checkHTMLVersion() {
	try {
		var path = window.location.protocol + '//' + window.location.host + window.location.pathname;
		var href = window.location.href;
		var search = window.location.search;
		var reg = new RegExp('(^|&)' + 'gv' + '=([^&]*)(&|$)');
		var r = search.substr(1).match(reg);

		if (search.indexOf('?') != -1) { //有参数
			if (r != null) { //有版本号
				if (r[2] != VERSION) { //版本号不对
					search = search.replace("gv=" + r[2], "gv=" + VERSION);
					window.location.replace(path + search);
				}
			} else { //没版本号
				window.location.replace(href + '&gv=' + VERSION);
			}
		} else { //没参数
			window.location.replace(path + '?gv=' + VERSION);
		}

	} catch (e) {
		console.log(e);
	}
}

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

// android系统返回键
function goBackPage(){
	var url = window.location.href;
	if((url.search(".html") == -1 && url.search(".php") == -1) || url.search("index.html") != -1){
		return 0;
	}
	else{
		window.location.href = 'index.html';
		return 1;
	}
}