/**
 * 微信网页开发
 * JS-SDK(https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)
 * 
 * 此文件依赖
 * <script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
 * 
 */

;(function(){
	var my_wx = {
		ua: window.navigator.userAgent.toLowerCase(),
		appId: "wx10c105188b96f13f",
		timestamp: "",
		nonceStr: "",
		signature: "",
		jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"],
		pathname: window.location.pathname,
		fromPage: sessionStorage.getItem("openurl_fromPage"),
		viewCaseID: sessionStorage.getItem('hexaviewcase_viewCaseID')
	}

	if(!my_wx.fromPage){
		my_wx.fromPage = window.location.href;
	}

	if(my_wx.ua.match(/MicroMessenger/i) != "micromessenger" && my_wx.ua.match(/wxwork/i) != 'wxwork'){
		return;
	}
	
	getWXSign().then(function(result){
		if(result.code != "0"){
			return;
		}

		var data = result.data;
		my_wx.timestamp = data.timestamp;
		my_wx.nonceStr = data.nonceStr;
		my_wx.signature = data.signature;

		initWXApi();
	});




	function initWXApi(){
		var ua = my_wx.ua;
		var pathname = my_wx.pathname;

		wx.config({
			debug: false, // true: 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: my_wx.appId, // 必填，公众号的唯一标识
			timestamp: my_wx.timestamp, // 必填，生成签名的时间戳
			nonceStr: my_wx.nonceStr, // 必填，生成签名的随机串
			signature: my_wx.signature,// 必填，签名
			jsApiList: my_wx.jsApiList // 必填，需要使用的JS接口列表
		});
		
		wx.ready(function () {
			if(ua.match(/wxwork/i) == 'wxwork' || pathname.indexOf("hexaviewcase") == -1){
				wx.hideOptionMenu(); //隐藏企业微信的选项菜单
				wx.hideAllNonBaseMenuItem(); //隐藏微信的选项菜单
			}
			else{
				updateAppMessageShareData();
			}
		});
	}
	

	/*
		自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
		需在用户可能点击分享按钮前就先调用
	*/
	function updateAppMessageShareData(){
		var title = "三维精准医疗服务 - " + my_wx.viewCaseID;
		var link = my_wx.fromPage;
		var imgUrl = BASE_URL + "/hexaviewcase/images/picture/wx_share.jpg";
		var desc = "三维重建技术可立体呈现器官解剖学结构，医生可更为直观了解复杂病灶的变异、分布情况，辅助进行精准诊断与分析，降低手术风险，提高手术质量。";
		
		wx.updateAppMessageShareData({ 
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: imgUrl, // 分享图标
			success: function () {
				// 设置成功
				console.log("success");
			},
			fail: function () {
				console.log("fail");
			}
		})
	}


	function getWXSign(){
		var url = window.location.href;
		var para = {
			url: m_apiUrl+"/index.php/wx_notify/getwechatsign",
			data: {url: url}
		};

		return requestData(para);
	}

})();