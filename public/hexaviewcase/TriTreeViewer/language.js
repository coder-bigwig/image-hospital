'use strict';


var m_userLanguage = null;

var USER_LANGUAGE = null;

var viewerText = {};
var commonText = {}; //通用文本

var caseListText = {};
var friendListText = null;
var image2dListText = null;
var image2dViewText = null;
var image2dCanvasText = null;
var modelTreeText = null;
var myChatText = null;
var myChatViewerText = null;
var myDownloadText = null;
var myHandleText = null;
var myselfMainText = null;
var sessionInfoText = null;
var sessionListText = null;
var systemMsgText = null;
var tabCaseText = null;
var tabChatText = null;
var tabImgText = null;
var tabMyselfText = null;
var toolBoxText = null;

var caseDetailText = null;
var contactServiceText = null;
var editHeadImgText = null;
var friendInfoText = null;
var genCutText = null;
var skullCutText = null;
var groupChatListText = null;
var imagePreviewText = null;
var groupChatText = null;
var liverCutText = null;
var liverCutInfoText = null;
var modifyPassText = null;
var myBasicInfoText = null;
var mySettingText = null;
var proCertText = null;
var searchHospitalText = null;
var searchCaseText = null;
var sessionSelText = null;

var triMeaText = null;
var treMea2DText = null;
var vesLabelText = null;
var volumeListText = null;
var inviteQRCodeText = null;
var promoQRCodeText = null;
var cacheManageText = null;
var auditResultText = null;
var exportAssessText = null;
var groupInviteCodeText = null;
var joinGroupChatText = null;
var getProCertCodeText = null;
var exportKidneyAssessText = null;
var lungSegementText = null;
var lungAssessmentText = null;
var exportLungAssessText = null;
var generalReportText = null;
var kidneyAssessText = null;
var view2DText = {};


var sceneTreeText = {
	'背景':			{'en':'Background', 'zh':'背景'},
	'其他':			{'en':'Others', 	'zh':'其他'},
	'肝脏':			{'en':'Liver', 	'zh':'肝脏'},
	'左半肝':			{'en':'Left liver', 	'zh':'左半肝'},
	'右半肝':			{'en':'Right liver', 	'zh':'右半肝'},
	'肝脏':			{'en':'Liver', 	'zh':'肝脏'},
	'肝脏mr':			{'en':'Liver MR', 	'zh':'肝脏MR'},
	'占位':			{'en':'Mass', 	'zh':'占位'},
	'占位1':			{'en':'Mass1', 	'zh':'占位1'},
	'占位2':			{'en':'Mass2', 	'zh':'占位2'},
	'占位3':			{'en':'Mass3', 	'zh':'占位3'},
	'占位4':			{'en':'Mass4', 	'zh':'占位4'},
	'占位5':			{'en':'Mass5', 	'zh':'占位5'},
	'门静脉':		{'en':'PV', 	'zh':'门静脉'},
	'肝静脉':		{'en':'HV', 	'zh':'肝静脉'},
	'肝动脉':		{'en':'HA', 	'zh':'肝动脉'},
	'门静脉段':		{'en':'PV Seg', 	'zh':'门静脉段'},
	'肝静脉段':		{'en':'HV Seg', 	'zh':'肝静脉段'},
	'肝动脉段':		{'en':'HA Seg', 	'zh':'肝动脉段'},
	'方案':			{'en':'Plan', 	'zh':'方案'},
	'方案1':		{'en':'Plan1', 	'zh':'方案1'},
	'方案2':		{'en':'Plan2', 	'zh':'方案2'},
	'方案3':		{'en':'Plan3', 	'zh':'方案3'},
	'流域':			{'en':'Region', 'zh':'流域'},
	'肝脏切割':		{'en':'LiverCut', 'zh':'肝脏切割'},
	'门静脉风险':	{'en':'PV risk', 	'zh':'门静脉风险'},
	'肝静脉风险':	{'en':'HV risk', 	'zh':'肝静脉风险'},
	'肝动脉风险':	{'en':'HA risk', 	'zh':'肝动脉风险'},
	'切除部分':		{'en':'CutPart', 'zh':'切除部分'},
	'切除层':		{'en':'CutPlane', 'zh':'切除层'},
	'切除面':		{'en':'CutPlane', 'zh':'切除面'},
	'剩余部分':		{'en':'RemainPart', 'zh':'剩余部分'},
	'骨骼':			{'en':'Bone', 'zh':'骨骼'},
	'颅骨':			{'en':'Skull', 'zh':'颅骨'},
	'正常节':		{'en':'Normal bone', 'zh':'正常节'},
	'断骨节':		{'en':'Broken bone ', 'zh':'断骨节'},
	'断节骨':		{'en':'Broken bone', 'zh':'断节骨'},
	'断骨1':			{'en':'Broken bone 1', 'zh':'断骨1'},
	'断骨2':			{'en':'Broken bone 2', 'zh':'断骨2'},
	'断骨3':			{'en':'Broken bone 3', 'zh':'断骨3'},
	'断骨4':			{'en':'Broken bone 4', 'zh':'断骨4'},
	'断骨5':			{'en':'Broken bone 5', 'zh':'断骨5'},
	'导板':			{'en':'guide', 'zh':'导板'},
	'心脏':			{'en':'heart', 'zh':'心脏'},
	'左心房':		{'en':'Left atrium', 'zh':'左心房'},
	'右心房':		{'en':'Right atrium', 'zh':'右心房'},
	'左心室':		{'en':'Left ventricle', 'zh':'左心室'},
	'右心室':		{'en':'Right ventricle', 'zh':'右心室'},
	'主动脉':		{'en':'Aorta', 'zh':'主动脉'},
	'气管':			{'en':'Trachea', 'zh':'气管'},
	'静脉':			{'en':'Vein', 'zh':'静脉'},
	'动脉':			{'en':'Artery', 'zh':'动脉'},
	'左气管':		{'en':'Left trachea', 'zh':'左气管'},
	'左静脉':		{'en':'Left vein', 'zh':'左静脉'},
	'左动脉':		{'en':'Left artery', 'zh':'左动脉'},
	'右气管':		{'en':'Right trachea', 'zh':'右气管'},
	'右静脉':		{'en':'Right vein', 'zh':'右静脉'},
	'右动脉':		{'en':'Right artery', 'zh':'右动脉'},
	'斑块':			{'en':'Plaque', 'zh':'斑块'},
	'冠脉':			{'en':'Coronary', 'zh':'冠脉'},
	'左冠脉':		{'en':'Left coronary', 'zh':'左冠脉'},
	'右冠脉':		{'en':'Right coronary', 'zh':'右冠脉'},
	'肺':			{'en':'Lung', 'zh':'肺'},
	'左肺':			{'en':'Left lung', 'zh':'左肺'},
	'右肺':			{'en':'Right lung', 'zh':'右肺'},
	'左叶':			{'en':'Left lobe', 'zh':'左叶'},
	'右叶':			{'en':'Right lobe', 'zh':'右叶'},
	'上':			{'en':'Upper', 'zh':'上'},
	'中':			{'en':'Middle', 'zh':'中'},
	'下':			{'en':'Lower', 'zh':'下'},
	'肺段':			{'en':'Lung segment', 'zh':'肺段'},
	'左上分段':		{'en':'Left upper section', 'zh':'左上分段'},
	'左中分段':		{'en':'Left middle section', 'zh':'左中分段'},
	'左下分段':		{'en':'Left lower section', 'zh':'左下分段'},
	'右上分段':		{'en':'Right upper section', 'zh':'右上分段'},
	'右中分段':		{'en':'Right middle section', 'zh':'右中分段'},
	'右下分段':		{'en':'Right lower section', 'zh':'右下分段'},
	'左上':			{'en':'Left upper', 'zh':'左上'},
	'左中':			{'en':'Left middle', 'zh':'左中'},
	'左下':			{'en':'Left lower', 'zh':'左下'},
	'右上':			{'en':'Right upper', 'zh':'右上'},
	'右中':			{'en':'Right middle', 'zh':'右中'},
	'右下':			{'en':'Right lower', 'zh':'右下'},
	'占位_安全边界(10mm)':{'en':'Mass_Margin(10mm)', 'zh':'占位_安全边界(10mm)'},
	'占位_安全边界(20mm)':{'en':'Mass_Margin(20mm)', 'zh':'占位_安全边界(20mm)'},
	'安全边界(10mm)':{'en':'Margin(10mm)', 'zh':'安全边界(10mm)'},
	'安全边界(20mm)':{'en':'Margin(20mm)', 'zh':'安全边界(20mm)'},
	'安全边界(10.0mm)':{'en':'Margin(10mm)', 'zh':'安全边界(10mm)'},
	'安全边界(20.0mm)':{'en':'Margin(5mm)', 'zh':'安全边界(20mm)'},
	'安全边界(5mm)':{'en':'Margin(20mm)', 'zh':'安全边界(5mm)'},
	'肺动脉':		{'en':'Pulmonary artery', 'zh':'肺动脉'},
	'肺静脉':		{'en':'Pulmonary vein', 'zh':'肺静脉'},
	'肝胆管':		{'en':'Hepatic duct', 'zh':'肝胆管'},
	'脾':			{'en':'Spleen', 'zh':'脾'},
	'脾脏':			{'en':'Spleen', 'zh':'脾脏'},
	'肾':			{'en':'Kidney', 'zh':'肾'},
	'肾脏':			{'en':'Kidney', 'zh':'肾脏'},
	'肾动脉':		{'en':'Renal artery', 'zh':'肾动脉'},
	'肾静脉':		{'en':'Renal vein', 'zh':'肾静脉'},
	'肾椎':			{'en':'Renal vertebral', 'zh':'肾椎'},
	'肾椎体':		{'en':'Renal vertebral', 'zh':'肾椎体'},
	'胰管':			{'en':'Pancreiatic duct', 'zh':'胰管'},
	'胰腺':			{'en':'Pancreas', 'zh':'胰腺'},
	'肝总管':		{'en':'Ductuli hepaticus communis', 'zh':'肝总管'},
	'胆囊':			{'en':'Gall bladder', 'zh':'胆囊'},
	'胃':			{'en':'Stomach', 'zh':'胃'},
	'下腔静脉':		{'en':'Postcava', 'zh':'下腔静脉'},
	'腔静脉':		{'en':'Vena cava', 'zh':'腔静脉'},
	'脊椎':			{'en':'Spine', 'zh':'脊椎'},
	'椎间盘':		{'en':'Intervertebral disc', 'zh':'椎间盘'},
	'淋巴':		{'en':'lymph', 'zh':'淋巴'},
	'癌栓':		{'en':'Tumor', 'zh':'癌栓'},
	'左肾占位':		{'en':'Left renal mass', 'zh':'左肾占位'},
	'右肾占位':		{'en':'Right renal mass', 'zh':'右肾占位'},
	'胆管':		{'en':'Bile duct', 'zh':'胆管'},
	'疑似':		{'en':'Suspected', 'zh':'疑似'},
	'十二指肠':		{'en':'duodenum', 'zh':'十二指肠'},
	'受累肺段':		{'en':'Involved segments', 'zh':'受累肺段'},
	'淋巴结 ':		{'en':'lymph gland', 'zh':'淋巴结'},
	'结节':		{'en':'Nodule', 'zh':'结节'},
	'结节1':		{'en':'Nodule1', 'zh':'结节1'},
	'结节2':		{'en':'Nodule2', 'zh':'结节2'},
	'结节3':		{'en':'Nodule3', 'zh':'结节3'},
	'结节4':		{'en':'Nodule4', 'zh':'结节4'},
	'结节5':		{'en':'Nodule5', 'zh':'结节5'},
	'结节6':		{'en':'Nodule6', 'zh':'结节6'},
	'结节7':		{'en':'Nodule7', 'zh':'结节7'},
	'结节8':		{'en':'Nodule8', 'zh':'结节8'},
	'结节9':		{'en':'Nodule9', 'zh':'结节9'},

	'左肝切除':		{'en':'Left liver resection', 'zh':'左肝切除'},
	'右肝切除':		{'en':'Right liver resection', 'zh':'右肝切除'},
	'右肝切除(演示)':{'en':'Right liver resection(demo)', 'zh':'右肝切除(演示)'},
	'左上叶切除':	{'en':'Left upper lobe resection', 'zh':'左上叶切除'},
	'左12段切除':	{'en':'Left 1、2 section resection', 'zh':'左12段切除'},
	'左123切除':	{'en':'Left 1、2、3 resection', 'zh':'左123切除'},
	'左半肝切除':		{'en':'Left hemihepatectomy', 'zh':'左半肝切除'},
	'扩大左半肝切除1':		{'en':'Extended left hepatectomy1', 'zh':'扩大左半肝切除1'},
	'扩大左半肝切除2':		{'en':'Extended left hepatectomy2', 'zh':'扩大左半肝切除2'},
	'模拟切除1': {'en':'sim-1', 'zh':'模拟切除1'},
	'模拟切除2': {'en':'sim-2', 'zh':'模拟切除2'},
	'模拟切除123': {'en':'sim-123', 'zh':'模拟切除123'},
	'模拟左半肝切除': {'en':'sim-lh', 'zh':'模拟左半肝切除'},
	'模拟右半肝切除': {'en':'sim-rh', 'zh':'模拟右半肝切除'},
	'模拟切除左半肝': {'en':'sim-lh', 'zh':'模拟切除左半肝'},
	'模拟切除右半肝': {'en':'sim-rh', 'zh':'模拟切除右半肝'},
	'脉管剩余部分': {'en':'Remain Vessel', 'zh':'脉管剩余部分'},
	'脉管切除部分': {'en':'Cut Vessel', 'zh':'脉管切除部分'},
	
	'上段': {'en':'Upper section', 'zh':'上段'},
	'下段': {'en':'Lower section', 'zh':'下段'},
	'上前段': {'en':'Upper front section', 'zh':'上前段'},
	'下前段': {'en':'Lower front section', 'zh':'下前段'},
	'后段': {'en':'Back section', 'zh':'后段'},
	'脑室': {'en':'Ventriculus cerebri', 'zh':'脑室'},
	'左颈动脉': {'en':'Left carotid artery', 'zh':'左颈动脉'},
	'右颈动脉': {'en':'Right carotid artery', 'zh':'右颈动脉'},
	'椎动脉': {'en':'Vertebral artery', 'zh':'椎动脉'},
	'脑': {'en':'Brain', 'zh':'脑'},
	'颅顶': {'en':'Calvarium', 'zh':'颅顶'},
	'颅底': {'en':'Basis cranii', 'zh':'颅底'},
	'门脉': {'en':'Portal vein', 'zh':'门脉'},
	'占位_安全边界(5mm)': {'en':'Mass_Margin(5mm)', 'zh':'占位_安全边界(5mm)'},
	'囊肿': {'en':'Cyst', 'zh':'囊肿'},
	'输尿管': {'en':'Ureter', 'zh':'输尿管'},
	'肾段': {'en':'Kidney segment', 'zh':'肾段'},
	'左肾': {'en':'Left kidney', 'zh':'左肾'},
	'右肾': {'en':'Right kidney', 'zh':'右肾'},
	'淋巴结': {'en':'Lymph gland', 'zh':'淋巴结'},
	'脂肪疝': {'en':'Lipocele', 'zh':'脂肪疝'},
	'肝脏囊肿': {'en':'Hepatic cyst', 'zh':'肝脏囊肿'},
	'回肠': {'en':'Ileum', 'zh':'回肠'},
	'结肠': {'en':'Colon', 'zh':'结肠'},
	'体绘制': {'en':'Volume Render', 'zh':'体绘制'},
	'最大径': {'en':'Maximum Length', 'zh':'最大径'},
	'上下': {'en':'Up Down', 'zh':'上下'},
	'左右': {'en':'Left Right', 'zh':'左右'},
	'前后': {'en':'Front Back', 'zh':'前后'},
	'肾上腺': {'en':'Adrenal glands', 'zh':'肾上腺'},
	'轮廓': {'en':'Body shell', 'zh':'轮廓'},
	'体外壳': {'en':'Body shell', 'zh':'体外壳'},
	'纤维瘤': {'en':'Neurofibroma', 'zh':'纤维瘤'},

	'liver':		{'en':'Liver', 	'zh':'肝脏'},
	'mass':			{'en':'Mass', 	'zh':'占位'},
	'pv':			{'en':'PV', 	'zh':'门静脉'},
	'hv':			{'en':'HV', 	'zh':'肝静脉'},
	'ha':			{'en':'HA', 	'zh':'肝动脉'},
	'plan':			{'en':'Plan', 	'zh':'方案'},
	'region':		{'en':'Region', 'zh':'流域'},
	'cutpart':		{'en':'CutPart', 'zh':'切除部分'},
	'cutplane':		{'en':'CutPlane', 'zh':'切除层'},
	'remainpart':	{'en':'RemainPart', 'zh':'剩余部分'},
	'volume_render':	{'en':'Volume Render', 'zh':'体绘制'},
	'volume render':	{'en':'Volume Render', 'zh':'体绘制'}
};

var lanMap = {
	'SceneTree':sceneTreeText
};


var ViewerLanguage = function(){
	USER_LANGUAGE = getUserLanguage();
	this.initViewerText();
	this.initCommonText();
}

/*
	根据用户设置的语言翻译html文档
*/
ViewerLanguage.prototype.execI18n = function(){
	var optionEle = $("#i18n_viewer");
	if (optionEle.length < 1) {
		console.log("未找到页面名称元素，请在页面写入\n <meta id=\"i18n_pagename\" content=\"页面名(对应语言包的语言文件名)\">");
		return false;
	};

	if ($.i18n == undefined) {
		console.log("请引入i18n js 文件")
		return false;
	};

	var sourceName = optionEle.attr('content');
	sourceName = sourceName.split('-');

	var version = m_prepareFile.m_appVersion;

	jQuery.i18n.properties({
		name: sourceName, //资源文件名称
		path: 'resource/i18n/', //资源文件路径
		mode: 'map', //用Map的方式使用资源文件中的值
		language: USER_LANGUAGE,
		fileVersion: version,
		
		callback: function() {
			var insertEle = $(".i18n");
			insertEle.each(function() {
				try{
					$(this).html($.i18n.prop($(this).attr('name')));
				}catch(e){
					return true;
				}
				
			});
			
			var insertInputEle = $(".i18n-input");
			insertInputEle.each(function() {
				var selectattr = $(this).attr("selectattr");
				if(!selectattr) selectattr = "placeholder";

				try{
					$(this).attr(selectattr, $.i18n.prop($(this).attr('selectname')));
				}catch(e){
					return true;
				}

			});
		}
	});

}


/* 根据用户设置的语言翻译Apps加载的模块
	sourceName: 资源文件名称,
	path: 资源文件路径,
	dom: 作用的dom
*/
ViewerLanguage.prototype.execI18nByApps = function(sourceName, path, dom){
	if ($.i18n == undefined) {
		console.log("请引入i18n js 文件")
		return false;
	};
	var version = m_prepareFile.m_appVersion;

	jQuery.i18n.properties({
		name: [sourceName], //资源文件名称
		path: path, //资源文件路径
		mode: 'map', //用Map的方式使用资源文件中的值
		language: USER_LANGUAGE,
		fileVersion: version,

		callback: function() {
			var insertEle = $(dom).find(".i18n");
			insertEle.each(function() {
				try{
					$(this).html($.i18n.prop($(this).attr('name')));
				}catch(e){
					return true;
				}
			});

			var insertInputEle = $(dom).find(".i18n-input");
			insertInputEle.each(function() {
				try{
					var selectAttr = $(this).attr('selectattr');
					if (!selectAttr) selectAttr = "value";
					$(this).attr(selectAttr, $.i18n.prop($(this).attr('selectname')));
				}catch(e){
					return true;
				}

			});
		}
	});
}

// 切换语言
ViewerLanguage.prototype.switchLanguage = function(){
	if(USER_LANGUAGE == "en"){
		this.execI18n();
		$(".mySecondBarOne").find(".myToolButton").addClass("enCss");
	}
	else if(USER_LANGUAGE == "zh"){
		this.execI18n();
		$(".mySecondBarOne").find(".myToolButton").removeClass("enCss");
	}
}


ViewerLanguage.prototype.cacheI18nFile = function(sourceName, path){
	if ($.i18n == undefined) {
		return ;
	};

	var version = m_prepareFile.m_appVersion;

	jQuery.i18n.properties({
		name: [sourceName], //资源文件名称
		path: path, //资源文件路径
		mode: 'map', //用Map的方式使用资源文件中的值
		language: USER_LANGUAGE,
		fileVersion: version
	});
}




ViewerLanguage.prototype.initCommonText = function(){
	if(USER_LANGUAGE == "zh"){
		commonText = {
			'text1': "网络较差，请求超时",
			'text2': "网络已断开，操作失败",
			'text3': "请求失败",
			'text4': '网络异常，操作失败',
			'text5': '操作失败',
			'text6': '网络已断开，加载失败',
			'text7': '下载文件失败。',
			'text8': '',
			'text9': '加载失败',
			'text10': '网络环境较差喔',
			'text11': '超时，请稍后再试',
			'text12': '失败，请稍后再试',
			'text13': '网络已断开，请检查网络连接',
			'text14': '下载文件失败'
		}
	}
	else{
		commonText = {
			'text1': 'Poor network, request timeout',
			'text2': 'Network disconnected, operation failed',
			'text3': 'Request failure',
			'text4': 'Network exception, operation failed',
			'text5': 'Operation failed',
			'text6': 'Network disconnected, loading failed',
			'text7': 'Failed to download file.',
			'text8': '',
			'text9': 'Loading failed',
			'text10': 'The network environment is poor',
			'text11': ' timeout, please try again later',
			'text12': ' failed, please try again later',
			'text13': 'The network is disconnected. Please check the network connection',
			'text14': 'Failed to download file'
		}
	}
}

ViewerLanguage.prototype.initViewerText = function(){
	switch(USER_LANGUAGE){
		case "zh":
			viewerText = {
				'text1': "确定",
				'text2': "取消",
				'text3': "是",
				'text4': "否",
				'text5': "提示",
				'text6': "计算中，请稍候...",
				'text7': "案例还未生成结果",
				'text8': "未查询到结果",
				'text9': "搜索结果",
				'text10': "未搜索到相应数据",
				'text11': "共 0 项",
				'text12': "共 ",
				'text13': " 项",
				'text14': "分享者: ",
				'text15': "案例号: ",
				'text16': "详情",
				'text17': "模型",
				'text18': "方案",
				'text19': "分享",
				'text20': "敬请期待！",
				'text21': "打开",
				'text22': "请选择结果",
				'text23': "请选择方案",
				'text24': "请选择方案-通用切除",
				'text25': "请选择方案-肝脏切除",
				'text26': "请选择方案-血管标记",
				'text27': "未搜索到方案",
				'text28': "通用切除",
				'text29': "肝脏切除",
				'text30': "血管标记",
				'text31': "我的",
				'text32': "打开",
				'text33': "分享",
				'text34': "删除",
				'text35': "该方案已被删除，无法打开",
				'text36': "读取方案类型出错，无法打开",
				'text37': "获取方案失败",
				'text38': "确定要删除该方案吗？",
				'text39': "删除方案失败，请重新操作",
				'text40': "删除分享方案失败，请重新操作",
				'text41': "演示案例",
				'text42': "我的案例",
				'text43': "我的病人",
				'text44': "好友分享",
				'text45': "备注",
				'text46': "我的任务",
				'text47': "下拉刷新",
				'text48': "释放更新",
				'text49': "加载中...",
				'text50': "上拉加载更多",
				'text51': "暂无更多",
				'text52': "影像",
				'text53': "链接已失效",
				'text54': "我的审核",
				'text55': "我的服务",
				'text56': "技术服务",
				'text57': "我的收藏",
				'text58': '已添加到"我的收藏"分组',
				'text59': '收藏失败',
				'text60': '服务器繁忙',
				'text61': '已取消收藏',
				'text62': '取消收藏失败',
				'text63': '请选择报告',
				'text64': '备注：',
				'text65': '网络已断开，请检查网络连接',
				'text66': '请求超时，网络环境较差',
				'text67': '请求超时',
				'text68': '请求失败',
				'text69': 'AR相机打开失败，请先检查相机权限',
				'text70': '模块加载失败',
				'text71': '网络环境较差喔',
				'text72': '加载模块超时',
				'text73': "AR相机打开失败，非https安全协议",
				'text74': "AR相机打开失败，未找到相关设备",
				'text75': "AR相机打开失败，未知原因"
			}
			break;
		case "en":
			viewerText = {
				'text1': "Confirm",
				'text2': "Cancel",
				'text3': "Yes",
				'text4': "No",
				'text5': "tip",
				'text6': "Calculating, please wait...",
				'text7': "The case has not yet generated results",
				'text8': "No results found",
				'text9': "Search result",
				'text10': "No corresponding data was found",
				'text11': "Total 0 item",
				'text12': "Total ",
				'text13': " items",
				'text14': "Sharers: ",
				'text15': "Case num: ",
				'text16': "Details",
				'text17': "Model",
				'text18': "Plan",
				'text19': "Share",
				'text20': "Coming soon!",
				'text21': "Open",
				'text22': "Select result",
				'text23': "Select plan",
				'text24': "Select generic plan",
				'text25': "Select liver plan",
				'text26': "Select vessel plan",
				'text27': "Plan not found",
				'text28': "Generic cut",
				'text29': "Liver cut",
				'text30': "Vascular tag",
				'text31': "Mine",
				'text32': "Open",
				'text33': "Share",
				'text34': "Delete",
				'text35': "The Plan has been deleted and cannot be opened",
				'text36': "Error reading Plan type, unable to open",
				'text37': "Failed to get the plan.",
				'text38': "Are you sure you want to delete this Plan?",
				'text39': "Failed to delete the Plan. Please try again",
				'text40': "Failed to delete the sharing Plan. Please try again",
				'text41': "Demo cases",
				'text42': "My case",
				'text43': "My patients",
				'text44': "My friends",
				'text45': "Remark",
				'text46': "My task",
				'text47': "Drop down refresh",
				'text48': "Release updates",
				'text49': "Loading...",
				'text50': "Pull up to load more",
				'text51': "No more",
				'text52': "Image",
				'text53': "The link has expired",
				'text54': "My audit",
				'text55': "My service",
				'text56': "Tech service",
				'text57': "My favourite",
				'text58': 'Added to my collections group',
				'text59': 'Collection failed',
				'text60': 'Server busy',
				'text61': 'Collection cancelled',
				'text62': 'Failed to cancel collection',
				'text63': 'Select report',
				'text64': 'Note: ',
				'text65': 'network has been disconnected, please check the network connection',
				'text66': 'Request timed out, poor network environment',
				'text67': 'The request timed out',
				'text68': 'The request failed',
				'text69': 'Failed to turn on AR camera, please check camera permission first',
				'text70': 'Module loading failed',
				'text71': 'The network environment is poor',
				'text72': 'Loading module timeout',
				'text73': "Failed to turn on AR camera, not HTTPS security protocol",
				'text74': "Failed to turn on AR camera, not found the relevant device",
				'text75': "Failed to turn on AR camera, unknown reason"
			}
	}
}

ViewerLanguage.prototype.initView2DText = function(){
	if(USER_LANGUAGE == "zh"){
		view2DText = {
			'text1': "第",
			'text2': "张",
			'text3': "调窗",
			'text4': '',
			'text5': '',
			'text6': '',
			'text7': '',
			'text8': '',
			'text9': ''
		}
	}
	else{
		view2DText = {
			'text1': '',
			'text2': '',
			'text3': 'Win',
			'text4': '',
			'text5': '',
			'text6': '',
			'text7': '',
			'text8': '',
			'text9': ''
		}
	}
}



ViewerLanguage.prototype.initCaseListText = function(){
	
	if(USER_LANGUAGE == "zh"){
		caseListText = {
			'text1': "",
			'text2': "请求超时",
			'text3': "网络已断开，操作失败",
			'text4': "获取案例信息失败，请稍后再试",
			'text5': "获取影像数据失败，请稍后再试",
			'text6': "获取案例分组数据失败，请稍后再试",
			'text7': "获取案例列表失败，请稍后再试",
			'text8': "更新案例数据失败，请稍后再试",
			'text9': "获取方案失败，请稍后再试",
			'text10': "删除方案失败，请稍后再试",
			'text11': "删除分享方案失败，请稍后再试",
			'text12': "更新方案失败，请稍后再试",
			'text13': "收藏失败",
			'text14': "取消收藏失败",
			'text15': "确定要取消收藏吗？",
			'text16': "网络异常，获取方案失败",
			'text17': '',
			'text18': '',
			'text19': '',
			'text20': '',
			'text21': '',
			'text22': '网络异常，更新案例数据失败',
			'text23': '',
			'text24': '查询方案列表失败，请稍后再试',
			'text25': '',
			'text26': '网络异常，删除分享方案失败',
			'text27': '',
			'text28': '',
			'text29': '',
			'text30': '未查询到结果',
			'text31': '',
			'text32': '获取模型结果数据失败，请稍后再试'
		};
	}
	else{
		caseListText = {
			'text1': "",
			'text2': "The request timed out",
			'text3': "Network disconnected, operation failed",
			'text4': "Failed to get case information. Please try again later",
			'text5': "Failed to get image data, please try again later",
			'text6': "Failed to get case group data, please try again later",
			'text7': "Failed to get case list, please try again later",
			'text8': "Failed to update case data, please try again later",
			'text9': "Failed to get scheme, please try again later",
			'text10': "Failed to delete scheme, please try again later",
			'text11': "Failed to delete sharing scheme, please try again later",
			'text12': "Failed to update scheme, please try again later",
			'text13': "Collection failed",
			'text14': "Failed to cancel collection",
			'text15': "Are you sure you want to cancel the collection?",
			'text16': "Network exception, failed to get scheme",
			'text17': '',
			'text18': 'Getting case information timed out, please try again later',
			'text19': '',
			'text20': '',
			'text21': '',
			'text22': 'Network exception, failed to update case data',
			'text23': '',
			'text24': 'Failed to query scheme list, please try again later',
			'text25': '',
			'text26': 'Network exception, delete sharing scheme failed',
			'text27': '',
			'text28': '',
			'text29': '',
			'text30': 'No results found',
			'text31': 'Network disconnected, failed to get case information',
			'text32': 'Failed to get model result data. Please try again later'
		};
	}
}




ViewerLanguage.prototype.initFriendListLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			friendListText = {
				"text1": "通讯录",
				"text2": "好友",
				"text3": "设置备注",
				"text4": "提示",
				"text5": "设置备注失败",
				"text6": "添加好友失败",
				'text7': '网络异常，获取好友列表失败',
				'text8': '',
				'text9': '获取好友列表失败'
			}
			break;
		case "en":
			friendListText = {
				"text1": "Friends list",
				"text2": "Friends",
				"text3": "Set notes",
				"text4": "Tip",
				"text5": "Failed to set notes",
				"text6": "Add friend failed",
				'text7': 'Network exception, failed to get friend list',
				'text8': '',
				'text9': 'failed to get friend list'
			}
	}
}

ViewerLanguage.prototype.initImage2dListLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			image2dListText = {
				"text1": "提示",
				"text2": "连接医院服务器失败",
				"text3": "影像数据正在处理中",
				"text4": "该影像数据已过期，是否需要重新上线？",
				"text5": "未搜索到相应数据...",
				"text6": "共 ",
				"text7": " 项",
				"text8": "分享者：",
				"text9": "案例号: ",
				"text10": "影像报告",
				"text11": "2D影像图",
				"text12": "分享病例",
				"text13": "该功能尚未上线，敬请期待!",
				"text14": "重新上线请求已提交",
				"text15": "重新上线请求失败",
				'text16': "下拉刷新",
				'text17': "释放更新",
				'text18': "加载中...",
				'text19': "↑上拉加载更多",
				'text20': "暂无更多"
			}
			break;
		case "en":
			image2dListText = {
				"text1": "Tip",
				"text2": "Failed to connect to the hospital server.",
				"text3": "The image data is being processed",
				"text4": "The image data has expired. Do you need to go online again?",
				"text5": "No corresponding data found",
				"text6": "Total ",
				"text7": " items",
				"text8": "sharer: ",
				"text9": "case num: ",
				"text10": "Image report",
				"text11": "Image",
				"text12": "Share case",
				"text13": "This function is not online yet, please wait!",
				"text14": "The request of image re online has been submitted",
				"text15": "Request to go online again failed",
				'text16': "Drop down refresh",
				'text17': "Release updates",
				'text18': "Loading...",
				'text19': "↑Pull up to load more",
				'text20': "No more"
			}
	}
}

ViewerLanguage.prototype.initImage2dViewLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			image2dViewText = {
				'text1': "更多",
				'text2': "提示",
				'text3': "请先加载案例",
				'text4': "影像序列数据读取出错，操作失败",
				'text5': "所选序列不支持MPR模式",
				'text6': "影像序列数据读取失败",
				'text7': "影像序列数据读取出错，设置失败",
				'text8': "影像默认窗宽窗位读取出错，设置失败",
				'text9': "生成图片失败"
			}
			break;
		case "en":
			image2dViewText = {
				'text1': "More",
				'text2': "Title",
				'text3': "Please load the case first",
				'text4': "Image series data reading error, operation failed",
				'text5': "The selected sequence does not support MPR mode",
				'text6': "Image series data reading failure",
				'text7': "Image series data reading error, setting failed",
				'text8': "Image default window width and window level reading error, setting failed",
				'text9': "Generate image failed"
			}
	}
}

ViewerLanguage.prototype.initImage2dCanvasLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			image2dCanvasText = {
				'text1': "提示",
				'text2': "影像解析失败",
				'text3': "影像下载失败"
			}
			break;
		case "en":
			image2dCanvasText = {
				'text1': "Tip",
				'text2': "Image parsing failed",
				'text3': "Image download failed",
			}
	}
}

ViewerLanguage.prototype.initModelTreeLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			modelTreeText = {
				'text1': "提示",
				'text2': "该案例没有方案",
				'text3': "请先加载案例",
				'text4': "方案数据错误，无法打开报告",
				'text5': "请先选择一个模型",
				'text6': "透明度及颜色设置",
				'text7': "段",
				'text8': '此模型不支持肺段切除',
				'text9': '请先选择方案',
				'text10': '',
				'text11': '该案例不支持该报告'
			}
			break;
		case "en":
			modelTreeText = {
				'text1': "Tip",
				'text2': "There is no plan for this case",
				'text3': "Please load the case first",
				'text4': "Scheme data error, unable to open report",
				'text5': "Please select a model first",
				'text6': "Transparency and color settings",
				'text7': " segment",
				'text8': 'This model does not support segmentectomy',
				'text9': 'Please select the scheme first',
				'text10': '',
				'text11': 'This case is not support for the report'
			}
	}
}

ViewerLanguage.prototype.initMyChatLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			myChatText = {
				'text1': "提示",
				'text2': "发送失败，你和对方还不是好友",
				'text3': "发送失败",
				'text4': "长按说话",
				'text5': "松开发送",
				'text6': "上滑取消",
				'text7': "请授予录音权限",
				'text8': "PC端无法使用语音功能",
				'text9': "录音打开失败，请检查麦克风权限",
				'text10': "",
				'text11': "秒后将停止录音",
				'text12': "说话时间过短",
				'text13': "发送失败，你和对方还不是好友",
				'text14': "语音发送失败，请稍后再试",
				'text15': "文件大于50MB，无法发送",
				'text16': "文件发送失败",
				'text17': "录音打开失败，非https安全协议",
				'text18': "录音打开失败，未找到相关设备",
				'text19': "录音打开失败，未知原因",
				'text20': "请授予相机权限"
			}
			break;
		case "en":
			myChatText = {
				'text1': "Tip",
				'text2': "Failed to send. You and the other party are not friends yet",
				'text3': "Failed to send",
				'text4': "Long press to speak",
				'text5': "Release send",
				'text6': "Up slide cancel",
				'text7': "Please grant recording permission",
				'text8': "Voice function cannot be used on PC",
				'text9': "Failed to open recording, please check microphone permission",
				'text10': "Stop recording in ",
				'text11': " s",
				'text12': "Talking too short",
				'text13': "Failed to send. You and the other party are not friends yet",
				'text14': "Voice sending failed, please try again later",
				'text15': "The file is larger than 50MB and cannot be sent",
				'text16': "Failed to send file",
				'text17': "Failed to open recording, not HTTPS security protocol",
				'text18': "Failed to open recording, not found the relevant device",
				'text19': "Failed to open recording, unknown reason",
				'text20': "Please grant camera permission"
			}
	}
}

ViewerLanguage.prototype.initMyChatViewerLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			myChatViewerText = {
				'text1': "查看更多",
				'text2': "案例号: ",
				'text3': "该分享消息为旧消息类型，无法解析",
				'text4': "该分享消息无法解析",
				'text5': "由 ",
				'text6': " 分享",
				'text7': "解析错误",
				'text8': "该通知消息无法解析",
				'text9': "无法解析",
				'text10': "昨天 ",
				'text11': "年 ",
				'text12': "月",
				'text13': "日 ",
				'text14': "复制",
				'text15': "打开模型",
				'text16': "下载",
				'text17': "打开模型",
				'text18': "撤回",
				'text19': "删除",
				'text20': "提示",
				'text21': "抱歉，该功能仅供认证用户使用",
				'text22': "该截图未包含案例，无法打开模型",
				'text23': "请授予读写本地文件权限",
				'text24': "该分享已过期，无法打开",
				'text25': "消息发送超过2分钟，无法撤回",
				'text26': "撤回失败",
				'text27': "删除失败",
				'text28': "该分享超过24小时，无法接受该分享",
				'text29': "您当前不是认证用户，无法接受该分享",
				'text30': "转发",
				'text31': "点击打开模型",
				'text32': "点击打开方案",
				'text33': "方案",
				'text34': "案例",
				'text35': "您已接收",
				'text36': "的分享",
				'text37': "点击领取案例",
				'text38': "点击领取方案",
				'text39': "未知",
				'text40': "\"您\"",
				'text41': "\"您\"",
				'text42': "",
				'text43': "的设计已被",
				'text44': "",
				'text45': "查看",
				'text46': "的设计待确认",
				'text47': "10分钟后消息将失效",
				'text48': "确认",
				'text49': "此消息已失效",
				'text50': "接受",
				'text51': "更多",
				'text52': "已接收",
				'text53': "",
				'text54': "加载图片失败",
				'text55': "确认",
				'text56': '',
				'text57': '确认设计失败，请稍后再试',
				'text58': '',
				'text59': '发送设计确认消息失败，请稍后再试',
				'text60': '打开分享失败，请稍后再试',
				'text61': '',
				'text62': '',
				'text63': '',
				'text64': '',
				'text65': '接受分享失败，请稍后再试'
			}
			break;
		case "en":
			myChatViewerText = {
				'text1': "See more",
				'text2': "Case id: ",
				'text3': "The shared message is an old message type and cannot be resolved",
				'text4': "The shared message cannot be parsed",
				'text5': "Shared by ",
				'text6': "",
				'text7': "Parsing error",
				'text8': "The notification message could not be resolved",
				'text9': "Unable to parse",
				'text10': "Yesterday ",
				'text11': "-",
				'text12': "-",
				'text13': " ",
				'text14': "Copy",
				'text15': "Open model",
				'text16': "Download",
				'text17': "Open model",
				'text18': "Withdraw",
				'text19': "Delete",
				'text20': "Tip",
				'text21': "Sorry, this feature is only for authenticated users",
				'text22': "The screenshot does not contain a case, the model cannot be opened",
				'text23': "Please grant permission to read and write local files",
				'text24': "The share has expired and cannot be opened",
				'text25': "The message has been sent for more than 2 minutes and cannot be recalled",
				'text26': "Withdrawal failed",
				'text27': "Deletion failed",
				'text28': "The sharing is more than 24 hours and cannot be accepted",
				'text29': "You are not an authenticated user and cannot accept this share",
				'text30': "relay",
				'text31': "Click to open the model",
				'text32': "Click to open the scheme",
				'text33': "plan",
				'text34': "case",
				'text35': "You have accepted the share from ",
				'text36': "",
				'text37': "Click to get it",
				'text38': "Click to get it",
				'text39': "Unknown",
				'text40': "You",
				'text41': "Your",
				'text42': "",
				'text43': " design has been ",
				'text44': "'s",
				'text45': "View",
				'text46': " design to be confirmed",
				'text47': "The message will be invalid in 10 minutes",
				'text48': "Confirm",
				'text49': "This message is invalid",
				'text50': "Accept",
				'text51': "more",
				'text52': " have accepted the share from ",
				'text53': "",
				'text54': "Load image failed",
				'text55': " confirmed",
				'text56': '',
				'text57': 'Failed to confirm the design, please try again later',
				'text58': '',
				'text59': 'Failed to send setting confirmation message, please try again later',
				'text60': 'Failed to open share, please try again later',
				'text61': '',
				'text62': '',
				'text63': '',
				'text64': '',
				'text65': 'Failed to accept share. Please try again later'
			}
	}
}

ViewerLanguage.prototype.initMyDownloadLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			myDownloadText = {
				'text1': "提示",
				'text2': "该任务已存在",
				'text3': "任务添加成功",
				'text4': "任务添加失败",
				'text5': "任务删除失败"
			}
			break;
		case "en":
			myDownloadText = {
				'text1': "Tip",
				'text2': "The task already exists",
				'text3': "Task added successfully",
				'text4': "Task addition failed",
				'text5': "Task deletion failed"
			}
	}
}

ViewerLanguage.prototype.initMyHandleLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			myHandleText = {
				'text1': "提示",
				'text2': "添加案例失败",
				'text3': "案例已添加"
			}
			break;
		case "en":
			myHandleText = {
				'text1': "Tip",
				'text2': "Failed to add case",
				'text3': "Case added"
			}
	}
}

ViewerLanguage.prototype.initMyselfMainLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			myselfMainText = {
				'text1': "未认证",
				'text2': "已认证"
			}
			break;
		case "en":
			myselfMainText = {
				'text1': "Not certified",
				'text2': "Certified"
			}
	}
}

ViewerLanguage.prototype.initSessionListLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			sessionListText = {
				'text1': "会话",
				'text2': "当前无会话，快去找好友吧",
				'text3': "[图片]",
				'text4': "[语音]",
				'text5': "[文件]",
				'text6': "[视频]",
				'text7': "该分享消息无法解析",
				'text8': "分享了方案-案例号: ",
				'text9': "分享了案例-案例号: ",
				'text10': "接受了方案分享-案例号: ",
				'text11': "接受了案例分享-案例号: ",
				'text12': "该通知消息无法解析",
				'text13': "昨天",
				'text14': "年",
				'text15': "月",
				'text16': "日",
				'text17': "标为未读",
				'text18': "标为已读",
				'text19': "置顶聊天",
				'text20': "取消置顶",
				'text21': "删除该聊天",
				'text22': "提示",
				'text23': "设置失败",
				'text24': "删除失败",
				'text25': "发布广播",
				'text26': "此[设计确认]消息无法解析",
				'text27': "您",
				'text28': "的设计已被确认",
				'text29': "[模型设计]，已过期",
				'text30': "[模型设计]，待确认",
				'text31': "网络异常，获取会话列表失败",
				'text32': "获取新的会话列表失败",
				'text33': "",
				'text34': ""
			}
			break;
		case "en":
			sessionListText = {
				'text1': "Session",
				'text2': "There is no conversation at present. Go find your friends",
				'text3': "[Picture]",
				'text4': "[Voice]",
				'text5': "[File]",
				'text6': "[Video]",
				'text7': "The shared message cannot be parsed",
				'text8': "Shared scheme - num: ",
				'text9': "Shared case - num: ",
				'text10': "Accept scheme - num: ",
				'text11': "Accept case - num: ",
				'text12': "The notification message could not be resolved",
				'text13': "Yesterday",
				'text14': "",
				'text15': "-",
				'text16': "",
				'text17': "Mark unread",
				'text18': "Mark as read",
				'text19': "Top chat",
				'text20': "Cancel topping",
				'text21': "Delete chat",
				'text22': "Tip",
				'text23': "Setup failed",
				'text24': "Deletion failed",
				'text25': "Broadcast",
				'text26': "This [design confirmation] message cannot be parsed",
				'text27': "Your",
				'text28': " design has been confirmed",
				'text29': "[model design], expired",
				'text30': "[model design], to be confirmed",
				'text31': "Network exception, failed to get session list",
				'text32': "Failed to get new session list",
				'text33': "",
				'text34': ""
			}
	}
}

ViewerLanguage.prototype.initSessionInfoLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			sessionInfoText = {
				'text1': "提示",
				'text2': "确定要删除并退出群聊吗？",
				'text3': "确定要解散群聊吗？",
				'text4': "修改群聊名称",
				'text5': "请上传图片格式的文件",
				'text6': "编辑群头像",
				'text7': "图片加载失败，请重新选择",
				'text8': "修改昵称",
				'text9': "设置失败，请稍后再试",
				'text10': "会话信息",
				'text11': "未命名",
				'text12': "退出失败",
				'text13': "解散失败",
				'text14': "修改失败",
				'text15': "上传中，请稍候...",
				'text16': "请输入投诉内容",
				'text17': "投诉已提交，我们会尽快处理",
				'text18': "提交失败，请稍后再试",
				'text19': ""
			}
			break;
		case "en":
			sessionInfoText = {
				'text1': "Tip",
				'text2': "Are you sure you want to delete and exit the group chat?",
				'text3': "Are you sure you want to dismiss group chat?",
				'text4': "Modify group chat name",
				'text5': "Please upload the file in picture format",
				'text6': "Edit avatar",
				'text7': "Image loading failed, please re select",
				'text8': "Change nickname",
				'text9': "Setup failed, please try again later",
				'text10': "Conversation information",
				'text11': "Unnamed",
				'text12': "Exit failed",
				'text13': "Dissolution failed",
				'text14': "Modification failed",
				'text15': "Uploading, please wait...",
				'text16': "Please input the complaint content",
				'text17': "The complaint has been submitted and we will deal with it as soon as possible",
				'text18': "submit failed, please try again later",
				'text19': ""
			}
	}
}

ViewerLanguage.prototype.initSystemMsgLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			systemMsgText = {
				'text1': "邀请",
				'text2': "加入了群聊",
				'text3': "你",
				'text4': "已通过了",
				'text5': "的好友请求,现在可以开始聊天了",
				'text6': " 将 ",
				'text7': " 移出了群聊",
				'text8': " 退出了群聊",
				'text9': "修改群名为",
				'text10': "历史消息数据，无法解析",
				'text11': " 撤回了一条消息",
				'text12': "分享给",
				'text13': "一个[二维影像]: ",
				'text14': "一个[三维模型]: ",
				'text15': " 修改了群头像"
			}
			break;
		case "en":
			systemMsgText = {
				'text1': " invited",
				'text2': " Joined group chat",
				'text3': "you",
				'text4': " has passed ",
				'text5': "'s friend request,Now you can start chatting",
				'text6': " moved ",
				'text7': " out of the group chat",
				'text8': " out of the group chat",
				'text9': " modified the group name to ",
				'text10': "Historical message data, unable to parse",
				'text11': " withdrew a message",
				'text12': " shared with |",
				'text13': " a [2D image]: ",
				'text14': " a [3D model]: ",
				'text15': " hanged the group head"
			}
	}
}

ViewerLanguage.prototype.initTabCaseLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			tabCaseText = {
				'text1': "提示",
				'text2': "请授予相机权限",
				'text3': "未指定关联医院",
				'text4': "您有 ",
				'text5': " 条数据未同步",
				'text6': "无待同步数据",
				'text7': "您有数据待同步",
				'text8': "跳过",
				'text9': "切换案例类别，2D对应影像，3D对应模型(包含影像)",
				'text10': "我知道了",
				'text11': "选择您想查看的用户组别",
				'text12': "查看病历信息",
				'text13': "查看三维建模图",
				'text14': "查看模拟方案",
				'text15': "分享案例给好友",
				'text16': "同步医院里的影像数据",
				'text17': "查看影像报告",
				'text18': "查看影像片子",
				'text19': "设置收藏备注",
				'text20': '获取影像报告数据失败，请稍后再试',
				'text21': '获取关联医院失败'
			}
			break;
		case "en":
			tabCaseText = {
				'text1': "Tip",
				'text2': "Please grant camera permission",
				'text3': "No Affiliated Hospital specified",
				'text4': "You have ",
				'text5': " pieces of data that are not synchronized",
				'text6': "No data to be synchronized",
				'text7': "You have data to synchronize",
				'text8': "Skip",
				'text9': "switch case category, 2D corresponding image, 3D corresponding model (including image)",
				'text10': "I got it",
				'text11': "Select the user group you want to view here",
				'text12': "you can view medical record information",
				'text13': "you can view 3D modeling diagram",
				'text14': "you can see simulation scheme",
				'text15': "you can share case to your friends",
				'text16': "you can synchronize image data in the hospital",
				'text17': "you can view video report",
				'text18': "you can view the video in the hospital",
				'text19': "Set favorite notes",
				'text20': 'Failed to get image report data, please try again later',
				'text21': 'failed to get associated hospital'
			}
	}
}

ViewerLanguage.prototype.initTabChatLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			tabChatText = {
				'text1': "您收到新的消息",
				'text2': "您有新的好友请求",
				'text3': "系统通知"
			}
			break;
		case "en":
			tabChatText = {
				'text1': "You have a new message",
				'text2': "You have a new friend request",
				'text3': "System Msg"
			}
	}
}

ViewerLanguage.prototype.initTabImgLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			tabImgText = {
				'text1': "提示",
				'text2': "请先加载案例",
				'text3': "背景",
				'text4': "背景颜色设置",
				'text5': "该案例无法切换到简易模式",
				'text6': "未搜索到报告",
				'text7': "通用切除",
				'text8': "肝脏切除",
				'text9': "胰腺切割",
				'text10': "肺段切除",
				'text11': "切肾评估",
				'text12': "进入联动模式",
				'text13': "退出联动模式",
				'text14': "生成图片失败",
				"text15": "该案例无肝脏模型，无法使用该功能",
				"text16": "将当前操作的模型还原为打开时状态",
				"text17": "我知道了",
				"text18": "跳过",
				"text19": "模型与底部模树呈现分段样式",
				"text20": "模型与底部模树呈现预置切割方案样式",
				"text21": "生成当前模型的图片并打开标注页面，可对图片编辑",
				"text22": "对模型进行长度、角度、体积等测量操作",
				"text23": "选择对应视图，如三维+横断面",
				"text24": "开启“移动模型”模式，按住模型拖动即可移动",
				"text25": "",
				"text26": "",
				"text27": ""
			}
			break;
		case "en":
			tabImgText = {
				'text1': "Tip",
				'text2': "Please load the case first",
				'text3': "Background",
				'text4': "Background color settings",
				'text5': "This case cannot be switched to simple mode",
				'text6': "No report founded",
				'text7': "General resection",
				'text8': "Liver resection",
				'text9': "Pancreas resection",
				'text10': "Lung segment resection",
				'text11': "Assess of nephrectomy",
				'text12': "Enter linkage mode",
				'text13': "Exit linkage mode",
				'text14': "Generate image failed",
				'text15': "There is no liver model in this case, so this function cannot be used",
				"text16": "Restores the model of the current operation to the open state",
				"text17": "I got it",
				"text18": "Skip",
				"text19": "Model and bottom model tree present segment style",
				"text20": "The model and the bottom model tree present the preset cutting scheme style",
				"text21": "Generate the image of the current model and open the annotation page to edit the image",
				"text22": "Measure the length, angle and volume of the model",
				"text23": "Select the corresponding view, such as 3D + cross section",
				"text24": "Turn on “Move Model” mode, hold the model down and drag to move",
				"text25": "",
				"text26": "",
				"text27": ""
			}
	}
}

ViewerLanguage.prototype.initTabMyselfLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			tabMyselfText = {
				'text1': "获取验证码",
				'text2': "秒",
				'text3': "提示",
				'text4': "输入不可为空",
				'text5': "输入字符串不可包含特殊字符（\'）",
				'text6': "输入字符串不可包含特殊字符（\"）",
				'text7': '获取用户信息失败，请稍后再试'
			}
			break;
		case "en":
			tabMyselfText = {
				'text1': "Get SMScode",
				'text2': "S",
				'text3': "Tip",
				'text4': "The input cannot be blank",
				'text5': "The input string cannot contain special characters（\'）",
				'text6': "The input string cannot contain special characters（\"）",
				'text7': 'Failed to get user information. Please try again later'
			}
	}
}

ViewerLanguage.prototype.initToolBoxLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			toolBoxText = {
				'text1': "透明度及颜色设置"
			}
			break;
		case "en":
			toolBoxText = {
				'text1': "Transparency and color settings"
			}
	}
}

ViewerLanguage.prototype.getCaseIOText = function(){
	var caseIOText;

	if(USER_LANGUAGE == "zh"){
		caseIOText = {
			'text1': "加载模型数据...",
			'text2': "下载索引文件失败",
			'text3': "获取案例信息...",
			'text4': "加载索引文件...",
			'text5': "下载图像数据失败",
			'text6': "下载颜色数据失败",
			'text7': "下载模型数据失败",
			'text8': '下载索引文件失败',
			'text9': '下载模型数据...',
			'text10': '加载模型失败',
			'text11': '解析模型数据...',
			'text12': '加载图像数据...'
		}
	}
	else{
		caseIOText = {
			'text1': "Loading model data...",
			'text2': "Failed to download index file",
			'text3': "Get case information...",
			'text4': "Load index file...",
			'text5': "Failed to download volume data",
			'text6': "Failed to download color data",
			'text7': "Failed to download model data",
			'text8': 'Failed to download index file',
			'text9': 'Download model data...',
			'text10': 'Failed to load model',
			'text11': 'Analytical model data...',
			'text12': 'Loading volume data...'
		}
	}
	return caseIOText;
}

ViewerLanguage.prototype.initCaseDetailLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			caseDetailText = {
				'text1': "案例已创建",
				'text2': "图像已上传",
				'text3': "模型创建中",
				'text4': "模型已上传",
				'text5': "提示",
				'text6': "未搜索到沟通群",
				'text7': "建模信息",
				'text8': "建模沟通",
				'text9': "",
				'text10': "",
				'text11': "该沟通群已被解散，无法打开"
			}
			break;
		case "en":
			caseDetailText = {
				'text1': "Case created",
				'text2': "Image uploaded",
				'text3': "Model creating",
				'text4': "Model uploaded",
				'text5': "Tip",
				'text6': "Communication group not found",
				'text7': "Modeling info",
				'text8': "Modeling comm",
				'text9': "",
				'text10': "",
				'text11': "The communication group has been disbanded and cannot be opened"
			}
	}
}

ViewerLanguage.prototype.initContactServiceLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			contactServiceText = {
				'text1': "",
				'text2': "复制"
			}
			break;
		case "en":
			contactServiceText = {
				'text1': "",
				'text2': "Copy"
			}
	}
}

ViewerLanguage.prototype.initEditHeadImgLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			editHeadImgText = {
				'text1': "提示",
				'text2': "图片加载失败，请重新选择"
			}
			break;
		case "en":
			editHeadImgText = {
				'text1': "Tip",
				'text2': "Image loading failed, please select again"
			}
	}
}

ViewerLanguage.prototype.initFriendInfoLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			friendInfoText = {
				'text1': "昵称：",
				'text2': "手机号：",
				'text3': "设置备注和标签",
				'text4': "发送消息",
				'text5': "添加好友",
				'text6': "设置备注",
				'text7': "提示",
				'text8': "好友请求发送失败，请稍后再试",
				'text9': "好友请求已发送",
				'text10': "对方已向您发送了好友请求，是否同意该请求？",
				'text11': "删除好友",
				'text12': "投诉",
				'text13': "确定要删除该好友吗？",
				'text14': "删除失败，请稍后再试",
				'text15': "请输入投诉内容"
			}
			break;
		case "en":
			friendInfoText = {
				'text1': "Nickname: ",
				'text2': "Mobile: ",
				'text3': "Set notes",
				'text4': "Send message",
				'text5': "Add friends",
				'text6': "Set notes",
				'text7': "Tip",
				'text8': "Friend request failed to send, please try again later",
				'text9': "Friend request has been sent",
				'text10': "The other party has sent you a friend request. Do you agree to the request?",
				'text11': "Delete friend",
				'text12': "Complain",
				'text13': "Are you sure you want to delete this friend?",
				'text14': "Deletion failed, please try again later",
				'text15': "Please input the complaint content"
			}
	}
}

ViewerLanguage.prototype.initGenCutLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			genCutText = {
				'text1': "计算中，请稍候...",
				'text2': "请输入方案名称：",
				'text3': "注：该功能目前仅支持保存第一次实施切除的切面",
				'text4': "方案",
				'text5': "提示",
				'text6': "仅支持退回一个切面",
				'text7': "请先双击选择切割对象",
				'text8': "不支持切除分段，请更换切割对象",
				'text9': "切面最多只能添加10个点",
				'text10': "切面至少需要3个点",
				'text11': "张开切面的开始点和结束点需要在物体外",
				'text12': "切割对象：",
				'text13': "保存成功",
				'text14': "保存方案失败，请重新操作",
				'text15': "无切面数据可保存方案",
				'text16': "该切面数据不可保存方案",
				'text17': "数据异常"
			}
			break;
		case "en":
			genCutText = {
				'text1': "Calculating, please wait...",
				'text2': "Please enter scheme Name: ",
				'text3': "Note: at present, this function only supports to save the first cut section",
				'text4': "Plan",
				'text5': "Tip",
				'text6': "only one section is available for return",
				'text7': "Please double-click to select the cutting object",
				'text8': "Cutting segement is not supported. Please replace the cutting object",
				'text9': "You can only add 10 points to a tangent",
				'text10': "At least 3 points are required for the section",
				'text11': "The starting and ending points of the opening section need to be outside the object",
				'text12': "Cutting object: ",
				'text13': "Saved successfully",
				'text14': "Failed to save the plan, please try again",
				'text15': "No cut plane can be used to save plan",
				'text16': "The cut plan can not be used to save plan",
				'text17': "Abnormal data"
			}
	}
}

ViewerLanguage.prototype.initSkullCutLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			skullCutText = {
				'text1': "计算中，请稍候...",
				'text2': "请输入方案名称：",
				'text3': "注：该功能目前仅支持保存第一次实施切除的切面",
				'text4': "方案",
				'text5': "提示",
				'text6': "目前仅提供退回一个切面",
				'text7': "请先双击选择切割对象",
				'text8': "不支持切除分段,请更换切割对象",
				'text9': "切面最多只能添加10个点",
				'text10': "切面至少需要3个点",
				'text11': "张开切面的开始点和结束点需要在物体外",
				'text12': "切割对象：",
				'text13': "保存成功",
				'text14': "保存方案失败，请重新操作",
				'text15': "无切面数据可保存方案",
				'text16': "该切面数据不可保存方案",
				'text17': "数据异常",
				'text18': ''
			}
			break;
		case "en":
			skullCutText = {
				'text1': "Calculating, please wait...",
				'text2': "Please enter scheme Name: ",
				'text3': "Note: at present, this function only supports to save the first cut section",
				'text4': "Plan",
				'text5': "Tip",
				'text6': "only one section is available for return at present",
				'text7': "Please double-click to select the cutting object",
				'text8': "Cutting segement is not supported. Please replace the cutting object",
				'text9': "You can only add 10 points to a tangent",
				'text10': "At least 3 points are required for the section",
				'text11': "The starting and ending points of the opening section need to be outside the object",
				'text12': "Cutting object: ",
				'text13': "Saved successfully",
				'text14': "Failed to save the plan, please try again",
				'text15': "No cut plane can be used to save plan",
				'text16': "The cut plan can not be used to save plan",
				'text17': "Abnormal data",
				'text18': ''
			}
	}
}

ViewerLanguage.prototype.initGroupChatListLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			groupChatListText = {
				'text1': "选择群聊",
				'text2': "选择群聊（专业群）",
				'text3': '获取会话列表失败，请稍后再试'
			}
			break;
		case "en":
			groupChatListText = {
				'text1': "Select group chat",
				'text2': "Select group chat(pro)",
				'text3': 'Failed to get session list, please try again later'
			}
	}
}

ViewerLanguage.prototype.initImagePreviewLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			imagePreviewText = {
				'text1': "提示",
				'text2': "图片加载失败"
			}
			break;
		case "en":
			imagePreviewText = {
				'text1': "Tip",
				'text2': "Image loading failed"
			}
	}
}

ViewerLanguage.prototype.initGroupChatLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			groupChatText = {
				'text1': "发起群聊",
				'text2': "发起群聊（专业群）",
				'text3': "选择联系人",
				'text4': "群成员",
				'text5': "确定",
				'text6': "删除",
				'text7': "群成员",
				'text8': "我的好友",
				'text9': "提示",
				'text10': "请先选择好友",
				'text11': "抱歉，目前群人数上限为100",
				'text12': "建立群聊失败，请稍后再试",
				'text13': "添加失败",
				'text14': "请先选择成员",
				'text15': "移除失败",
				'text16': '获取好友列表失败'
			}
			break;
		case "en":
			groupChatText = {
				'text1': "Invite group chat",
				'text2': "Invite group chat(pro group)",
				'text3': "Select contact",
				'text4': "Group members",
				'text5': "Ok",
				'text6': "Delete",
				'text7': "Group members",
				'text8': "My friend",
				'text9': "Tip",
				'text10': "Please select a friend first",
				'text11': "Sorry, the current group size limit is 100",
				'text12': "Failed to establish group chat, please try again later",
				'text13': "Add failed",
				'text14': "Please select member first",
				'text15': "Removal failed",
				'text16': 'Failed to get friends list'
			}
	}
}

ViewerLanguage.prototype.initLiverCutLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			liverCutText = {
				'text1': "提示",
				'text2': "该案例无肝脏模型，无法使用该功能",
				'text3': "请确认焦点所在位置为要切除部分",
				'text4': "计算中，请稍候...",
				'text5': "请输入方案名称：",
				'text6': "方案",
				'text7': "切面最多只能添加10个点",
				'text8': "生成切面至少需要两个点",
				'text9': "保存成功",
				'text10': "保存方案失败",
				'text11': ''
			}
			break;
		case "en":
			liverCutText = {
				'text1': "tip",
				'text2': "There is no liver model in this case, so this function cannot be used",
				'text3': "Please confirm that the focus is on the part to be removed",
				'text4': "Calculating, please wait...",
				'text5': "Please enter plan name: ",
				'text6': "Plan",
				'text7': "You can only add 10 points to a tangent",
				'text8': "Generating facets requires at least two points",
				'text9': "Saved successfully",
				'text10': "Failed to save the plan",
				'text11': ''
			}
	}
}

ViewerLanguage.prototype.initLiverCutInfoLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			liverCutInfoText = {
				'text1': "风险评估",
				'text2': "华西标准",
				'text3': "西安标准",
				'text4': "日本标准",
				'text5': "标准名称",
				'text6': "体积",
				'text7': "剩余肝体积",
				'text8': "计算公式"
			}
			break;
		case "en":
			liverCutInfoText = {
				'text1': "Risk assessment",
				'text2': "West China Standard",
				'text3': "Xi'an Standard",
				'text4': "Japanese Standard",
				'text5': "Standard Name",
				'text6': "Vol",
				'text7': "Residual liver volume",
				'text8': "Calculation formula"
			}
	}
}

ViewerLanguage.prototype.initModifyPassLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			modifyPassText = {
				'text1': "秒",
				'text2': "提示",
				'text3': "验证码已发送",
				'text4': "验证码发送失败",
				'text5': "手机号不合法",
				'text6': "验证码不能为空",
				'text7': "验证码不合法",
				'text8': "新密码不能为空",
				'text9': "密码为6-20位字符，只能是数字、字母、特殊字符（!#$%^&*@），至少其中两种组合",
				'text10': "密码修改成功，将在下次登录生效",
				'text11': "短信验证码错误",
				'text12': "该用户不存在",
				'text13': "重置密码失败",
				'text14': ''
			}
			break;
		case "en":
			modifyPassText = {
				'text1': "S",
				'text2': "Tip",
				'text3': "Verification code sent",
				'text4': "Verification code sending failed",
				'text5': "Illegal mobile phone number",
				'text6': "Verification code cannot be empty",
				'text7': "The verification code is illegal",
				'text8': "New password cannot be empty",
				'text9': "The password is 6-20 characters, and can only be numbers, letters and special characters (! # $% ^ &amp; * @), at least two combinations of them",
				'text10': "The password has been modified successfully and will take effect in the next login",
				'text11': "SMS verification code error",
				'text12': "The user does not exist",
				'text13': "Failed to reset password",
				'text14': ''
			}
	}
}

ViewerLanguage.prototype.initMyBasicInfoLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			myBasicInfoText = {
				'text1': "个人信息",
				'text2': "编辑头像",
				'text3': "提示",
				'text4': "图片加载失败，请重新选择",
				'text5': "修改昵称",
				'text6': "修改邮箱",
				'text7': "未绑定",
				'text8': "邮箱格式不正确...",
				'text9': "修改失败",
				'text10': "上传中，请稍候...",
				'text11': ''
			}
			break;
		case "en":
			myBasicInfoText = {
				'text1': "Personal information",
				'text2': "Edit avatar",
				'text3': "Tip",
				'text4': "The image failed to load, please select again",
				'text5': "Modify the nickname",
				'text6': "Modify email",
				'text7': "Unbound",
				'text8': "The mailbox format is incorrect...",
				'text9': "Modification failed",
				'text10': "Upload, please wait...",
				'text11': ''
			}
	}
}

ViewerLanguage.prototype.initMySettingLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			mySettingText = {
				'text1': "设置",
				'text2': "修改密码",
				'text3': "提示",
				'text4': "清除成功",
				'text5': "当前版本：",
				'text6': "缓存管理",
				'text7': "缓存清理中...",
				'text8': "缓存计算中..."
			}
			break;
		case "en":
			mySettingText = {
				'text1': "Settings",
				'text2': "Set Password",
				'text3': "Tip",
				'text4': "Clear successfully",
				'text5': "Current version: ",
				'text6': "Cache Manage",
				'text7': "Cache clearing...",
				'text8': "Cache calculating..."
			}
	}
}

ViewerLanguage.prototype.initProCertLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			proCertText = {
				'text1': "专业认证",
				'text2': "未认证",
				'text3': "已认证",
				'text4': "修改",
				'text5': "取消",
				'text6': "提示",
				'text7': "请输入真实姓名",
				'text8': "请输入医院所在省",
				'text9': "请输入医院所在市",
				'text10': "请输入所属医院",
				'text11': "请输入所属科室",
				'text12': "请输入医师执业证号",
				'text13': "请输入合法的医师执业证号",
				'text14': "请上传工作牌照片",
				'text15': "上传中",
				'text16': "上传中，请稍候...",
				'text18': "服务器繁忙",
				'text19': "信息已提交，审核中...",
				'text20': "城市",
				'text21': "省份",
				'text22': "请输入6位数字",
				'text23': '审核中',
				'text24': '获取认证信息失败',
				'text25': '提交认证失败，请稍后再试'

			}
			break;
		case "en":
			proCertText = {
				'text1': "Professional Certification",
				'text2': "Not certified",
				'text3': "Certified",
				'text4': "Modify",
				'text5': "Cancel",
				'text6': "Tip",
				'text7': "Please enter your real name",
				'text8': "Please enter the province where the hospital is located",
				'text9': "Please enter the city of the hospital",
				'text10': "Please enter your hospital",
				'text11': "Please enter the Department",
				'text12': "Please input the doctor's license number",
				'text13': "Please input the legal doctor license number",
				'text14': "Please upload the photo of work card",
				'text15': "uploading",
				'text16': "Upload, please wait...",
				'text18': "The server is busy.",
				'text19': "Information submitted, under review...",
				'text20': "City",
				'text21': "Province",
				'text22': "Please enter 6 digits",
				'text23': 'Under review',
				'text24': 'Failed to obtain authentication information',
				'text25': 'Failed to submit authentication, please try again later'
			}
	}
}

ViewerLanguage.prototype.initSearchHospitalLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			searchHospitalText = {
				'text1': "选择省份",
				'text2': "提示",
				'text3': "选择医院",
				'text4': "选择城市",
				'text5': "无医院可选",
				'text6': '',
				'text7': '添加关联医院失败',
				'text8': '',
				'text9': '获取医院列表失败'

			}
			break;
		case "en":
			searchHospitalText = {
				'text1': "Select a province",
				'text2': "Tip",
				'text3': "Select a hospital",
				'text4': "Select a city",
				'text5': "No hospital options",
				'text6': '',
				'text7': 'Failed to add associated hospital',
				'text8': '',
				'text9': 'Failed to get hospital list'
			}
	}
}

ViewerLanguage.prototype.initSearchCaseLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			searchCaseText = {
				'text1': "选择省份",
				'text2': "选择城市"

			}
			break;
		case "en":
			searchCaseText = {
				'text1': "Select a province",
				'text2': "Select a city"
			}
	}
}

ViewerLanguage.prototype.initSessionSelLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			sessionSelText = {
				'text1': "选择",
				'text2': '',
				'text3': "发送给：",
				'text4': "分别发送给：",
				'text5': "[语音] ",
				'text6': "[文件] ",
				'text7': "[2D image] ",
				'text8': "[3D model] ",
				'text9': "[手术方案] ",
				'text10': "有效期：",
				'text11': "一天",
				'text12': "一周",
				'text13': "一月",
				'text14': "永久",
				'text15': "给朋友留言",
				'text16': "取消",
				'text17': "发送",
				'text18': "提示",
				'text19': "发送成功",
				'text20': "发送失败，你和对方还不是好友",
				'text21': "图片发送失败，请稍后再试",
				'text22': "发送失败，请稍后再试",
				'text23': "[2D image]: ",
				'text24': "[3D model]: ",
				'text25': "[手术方案]: ",
				'text26': '获取会话列表失败',
				'text27': ''
			}
			break;
		case "en":
			sessionSelText = {
				'text1': "Select",
				'text2': '',
				'text3': "Send to one: ",
				'text4': "Send to multiple: ",
				'text5': "[Voice] ",
				'text6': "[File] ",
				'text7': "[2D image] ",
				'text8': "[3D model] ",
				'text9': "[Plan] ",
				'text10': "validity: ",
				'text11': "One day",
				'text12': "A week",
				'text13': "One month",
				'text14': "Permanent",
				'text15': "Leaving a message",
				'text16': "Cancel",
				'text17': "Send",
				'text18': "Tip",
				'text19': "Sent successfully",
				'text20': "Failed to send. You and the other party are not friends yet",
				'text21': "Failed to send picture, please try again later",
				'text22': "fail in send, please try again later",
				'text23': "[2D image]: ",
				'text24': "[3D model]: ",
				'text25': "[Plan]: ",
				'text26': 'Failed to get session list',
				'text27': ''
			}
	}
}



ViewerLanguage.prototype.initTriMeaLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			triMeaText = {
				'text1': "角度",
				'text2': "体积",
				'text3': "长度",
				'text4': "直距",
				'text5': "曲距",
				'text6': "提示",
				'text7': "没有活动曲线",
				'text8': "至少需要三点才能闭合",
				'text9': "开合",
				'text10': "闭合",
				'text11': "请先双击物体取点"
			}
			break;
		case "en":
			triMeaText = {
				'text1': "Angle",
				'text2': "Vol",
				'text3': "Length",
				'text4': "Straight",
				'text5': "Curve",
				'text6': "Tip",
				'text7': "There is no active curve",
				'text8': "At least three points are needed to close",
				'text9': "Open",
				'text10': "Close",
				'text11': "Please double-click the object to get the point"
			}
	}
}

ViewerLanguage.prototype.initTriMea2DLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			treMea2DText = {
				'text1': "提示",
				'text2': "没有活动曲线",
				'text3': "至少需要三点才能闭合",
				'text4': "开合",
				'text5': "闭合",
				'text6': "请先双击物体取点"
			}
			break;
		case "en":
			treMea2DText = {
				'text1': "Tip",
				'text2': "There is no active curve",
				'text3': "At least three points are needed to close",
				'text4': "Open",
				'text5': "Close",
				'text6': "Please double-click the object to get the point"
			}
	}
}

ViewerLanguage.prototype.initVesLabelLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			vesLabelText = {
				'text1': "提示",
				'text2': "未选择标记对象",
				'text3': "请选择根节点为标记对象",
				'text4': "计算中，请稍候...",
				'text5': "请输入方案名称：",
				'text6': "方案",
				'text7': "文件发送失败",
				'text8': "没有可标记的对象",
				'text9': "不是可标记的对象类型",
				'text10': "请使用标记对象的分支标记",
				'text11': "上传中，请稍候...",
				'text12': "保存成功",
				'text13': "保存方案失败，请重新操作",
				'text14': "保存数据出错，请重新操作",
				'text15': "数据错误，无法打开",
				'text16': "数据下载失败，无法打开",
				'text17': "下载颜色表数据失败",
				'text18': "方案加载中，请稍后...",
				'text19': ''
			}
			break;
		case "en":
			vesLabelText = {
				'text1': "Tip",
				'text2': "No object selected for marking",
				'text3': "Please select the root node as marking object",
				'text4': "Calculation in progress, please wait...",
				'text5': "Please enter plan name: ",
				'text6': "Plan",
				'text7': "Failed to send file",
				'text8': "There are no objects to mark",
				'text9': "Not a markable object",
				'text10': "Please use the branch tag of the tag object",
				'text11': "Uploading, please wait...",
				'text12': "Saved successfully",
				'text13': "Failed to save the plan, please try again",
				'text14': "Error saving data, please try again",
				'text15': "Data error, unable to open",
				'text16': "Data download failed, unable to open",
				'text17': "failed to load color table",
				'text18': "Plan loading, please wait...",
				'text19': ''
			}
	}
}

ViewerLanguage.prototype.initVolumeListLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			volumeListText = {
				'text1': "体积信息",
				'text2': "名称",
				'text3': "体积",
				'text4': "百分比"
			}
			break;
		case "en":
			volumeListText = {
				'text1': "Volume Information",
				'text2': "Name",
				'text3': "Vol",
				'text4': "%"
			}
	}
}

ViewerLanguage.prototype.initInviteQRCodeLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			inviteQRCodeText = {
				'text1': "我的邀请码",
				'text2': "",
				'text3': "获取二维码失败",
				'text4': "请授予读写本地文件权限",
				'text5': "邀请码下载失败",
				'text6': "链接已复制"
			}
			break;
		case "en":
			inviteQRCodeText = {
				'text1': "My invitation code",
				'text2': "",
				'text3': "Failed to get QR code.",
				'text4': "Please grant permission to read and write local files",
				'text5': "Invitation code download failed",
				'text6': "Link copied"
			}
	}
}

ViewerLanguage.prototype.initPromoQRCodeLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			promoQRCodeText = {
				'text1': "优惠下单码",
				'text2': "请选择医院",
				'text3': "提示",
				'text4': "获取二维码失败",
				'text5': "请授予读写本地文件权限",
				'text6': "二维码下载失败",
				'text7': "链接已复制",
				'text8': "复制失败",
				'text9': ''
			}
			break;
		case "en":
			promoQRCodeText = {
				'text1': "Discount order code",
				'text2': "Select hospital",
				'text3': "Tip",
				'text4': "Failed to obtain qr code",
				'text5': "Please grant permission to read and write local files",
				'text6': "QR code download failed",
				'text7': "Link copied",
				'text8': "Copy failed",
				'text9': ''
			}
	}
}

ViewerLanguage.prototype.initCacheManageLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			cacheManageText = {
				'text1': "",
				'text2': "提示",
				'text3': "清理成功",
				'text4': "清理失败",
			}
			break;
		case "en":
			cacheManageText = {
				'text1': "",
				'text2': "Tip",
				'text3': "Clear successfully",
				'text4': "Clear failed",
			}
	}
}

ViewerLanguage.prototype.initAuditResultLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			auditResultText = {
				'text1': "正在提交审核结果并通知相关人员，请稍候",
				'text2': "",
				'text3': "提交成功",
				'text4': "提交失败",
				'text5': "确定由本人鉴定通过此结果并发布、通知相关人员吗？",
				'text6': "确定将此结果标记为不合格并通知相关人员吗？"
			}
			break;
		case "en":
			auditResultText = {
				'text1': "Please wait while you submit the audit results and notify the relevant personnel",
				'text2': "",
				'text3': "Submitted successfully",
				'text4': "Submit failed",
				'text5': "Are you sure that I can identify and pass this result and release and inform relevant personnel?",
				'text6': "Are you sure to mark this result as unqualified and inform relevant personnel?"
			}
	}
}

ViewerLanguage.prototype.initExportAssessLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			exportAssessText = {
				'text1': "男",
				'text2': "女",
				'text3': "提示",
				'text4': "姓名不能为空",
				'text5': "请选择性别",
				'text6': "年龄不能为空",
				'text7': "请正确填写年龄",
				'text8': "体重不能为空",
				'text9': "请正确填写体重",
				'text10': "身高不能为空",
				'text11': "请正确填写身高",
				'text12': "还有报告图片未生成",
				'text13': "报告生成中，请稍后...",
				'text14': "",
				'text15': "保存失败"
			}
			break;
		case "en":
			exportAssessText = {
				'text1': "man",
				'text2': "woman",
				'text3': "Tip",
				'text4': "Name cannot be empty",
				'text5': "Please select gender",
				'text6': "Age cannot be empty",
				'text7': "Please fill in the age correctly",
				'text8': "Weight cannot be empty",
				'text9': "Please fill in the weight correctly",
				'text10': "Height cannot be empty",
				'text11': "Please fill in the height correctly",
				'text12': "There are still report images not generated",
				'text13': "Report is being generated, please wait...",
				'text14': "",
				'text15': "Save failed"
			}
	}
}

ViewerLanguage.prototype.initGroupInviteCodeLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			groupInviteCodeText = {
				'text1': "提示",
				'text2': "",
				'text3': "获取群邀请码失败",
				'text4': "复制成功",
				'text5': "复制失败",
				'text6': "",
				'text7': ""
			}
			break;
		case "en":
			groupInviteCodeText = {
				'text1': "Tip",
				'text2': "",
				'text3': "Get session invite code failed",
				'text4': "Copy succeeded",
				'text5': "Copy failed",
				'text6': "",
				'text7': ""
			}
	}
}
ViewerLanguage.prototype.initJoinGroupChatLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			joinGroupChatText = {
				'text1': "提示",
				'text2': "无效的邀请码",
				'text3': "操作失败",
				'text4': "",
				'text5': "加入群聊失败",
				'text6': ""
			}
			break;
		case "en":
			joinGroupChatText = {
				'text1': "Tip",
				'text2': "Invalid invitation code",
				'text3': "operation failed",
				'text4': "",
				'text5': "Failed to join group chat",
				'text6': ""
			}
	}
}

ViewerLanguage.prototype.initGetProCertCodeLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			getProCertCodeText = {
				'text1': "提示",
				'text2': "获取专业认证码失败，请稍后再试",
				'text3': "服务器繁忙",
				'text4': ""
			}
			break;
		case "en":
			getProCertCodeText = {
				'text1': "Tip",
				'text2': "Failed to obtain professional certification code. Please try again later",
				'text3': "Server busy.",
				'text4': ""
			}
	}
}

ViewerLanguage.prototype.initExportKidneyAssessLan = function(){
	switch(USER_LANGUAGE){
		case "zh":
			exportKidneyAssessText = {
				'text1': "三维评估",
				'text2': "评估生成中，请稍后...",
				'text3': "提示",
				'text4': "姓名不能为空",
				'text5': "请选择性别",
				'text6': "年龄不能为空",
				'text7': "请正确填写年龄",
				'text8': "体重不能为空",
				'text9': "请正确填写体重",
				'text10': "身高不能为空",
				'text11': "请正确填写身高",
				'text12': "还有图片未生成",
				'text13': "保存失败",
				'text14': "男",
				'text15': "女",
				'text16': "病区不能为空",
				'text17': "病床号不能为空",
				'text18': "",
				'text19': "",
				'text20': "",
				'text21': ""
			}
			break;
		case "en":
			exportKidneyAssessText = {
				'text1': "Renal assessment",
				'text2': "Assessment building, please wait...",
				'text3': "Tip",
				'text4': "Name cannot be empty",
				'text5': "Please select gender",
				'text6': "Age cannot be empty",
				'text7': "Please fill in the age correctly",
				'text8': "Weight cannot be empty",
				'text9': "Please fill in the weight correctly",
				'text10': "Height cannot be empty",
				'text11': "Please fill in the height correctly",
				'text12': "There are still no images generated",
				'text13': "Save failed",
				'text14': "man",
				'text15': "woman",
				'text16': "Ward cannot be empty",
				'text17': "Bed NO. cannot be empty",
				'text18': "",
				'text19': "",
				'text20': "",
				'text21': ""
			}
	}
}

ViewerLanguage.prototype.initLungSegementLan  = function(){
	switch(USER_LANGUAGE){
		case "zh":
			lungSegementText = {
				'text1': "提示",
				'text2': "请求失败",
				'text3': "服务器繁忙",
				'text4': "双击选择您要切除的段",
				'text5': "保存成功",
				'text6': "保存方案失败，请重新操作",
				'text7': "",
				'text8': "",
				'text9': "",
				'text10': ""
			}
			break;
		case "en":
			lungSegementText = {
				'text1': "Tip",
				'text2': "Request failed.",
				'text3': "Server busy.",
				'text4': "Double click to select the segment you want to resect.",
				'text5': "Saved successfully",
				'text6': "Failed to save the plan, please try again",
				'text7': "",
				'text8': "",
				'text9': "",
				'text10': ""
			}
	}
}

ViewerLanguage.prototype.initLungAssessmentLan  = function(){
	switch(USER_LANGUAGE){
		case "zh":
			lungAssessmentText = {
				'text1': "提示",
				'text2': "请求失败",
				'text3': "服务器繁忙",
				'text4': "姓名不能为空",
				'text5': "请选择性别",
				'text6': "身高不能为空",
				'text7': "年龄不能为空",
				'text8': "术前实际Fev1不能为空",
				'text9': "身高或术前实际Fev1不合法",
				'text10': "年龄不合法",
				'text11': " 表面与 ",
				'text12': "肺表面的距离:",
				'text13': "肺尖平面距离:",
				'text14': "背段尖平面距离:",
				'text15': "下肺静脉平面距离:",
				'text16': "直径:",
				'text17': "体积:",
				'text18': "",
				'text19': "",
				'text26': ""
			}
			break;
		case "en":
			lungAssessmentText = {
				'text1': "Tip",
				'text2': "Request failed.",
				'text3': "Server busy.",
				'text4': "The name cannot be empty",
				'text5': "Please select gender",
				'text6': "Height cannot be empty",
				'text7': "Age cannot be empty",
				'text8': "Preoperative actual FEV1 cannot be empty",
				'text9': "Height or preoperative actual FEV1 is not legal",
				'text10': "Age Illegal",
				'text11': " and the surface of ",
				'text12': "Lung:",
				'text13': "Apex plane:",
				'text14': "Dorsal apex plane:",
				'text15': "Inferior pulmonary vein plane:",
				'text16': "Diameter:",
				'text17': "Volume:",
				'text18': "",
				'text19': "",
				'text26': "The distance between "
			}
	}
}

ViewerLanguage.prototype.initExportLungAssessLan  = function(){
	switch(USER_LANGUAGE){
		case "zh":
			exportLungAssessText = {
				'text1': "提示",
				'text2': "请求失败",
				'text3': "服务器繁忙",
				'text4': "姓名不能为空",
				'text5': "请选择性别",
				'text6': "身高不能为空",
				'text7': "年龄不能为空",
				'text8': "术前实际Fev1不能为空",
				'text9': "身高或术前实际Fev1不合法",
				'text10': "年龄不合法",
				'text11': " 表面与 ",
				'text12': "肺表面的距离:",
				'text13': "肺尖平面距离:",
				'text14': "背段尖平面距离:",
				'text15': "下肺静脉平面距离:",
				'text16': "直径:",
				'text17': "体积:",
				'text18': "评估生成中，请稍后...",
				'text19': "病区不能为空",
				'text20': "病床号不能为空",
				'text21': "男",
				'text22': "女",
				'text23': "还有图片未生成",
				'text24': "三维评估",
				'text25': "保存失败",
				'text26': "",
				'text27': ""

			}
			break;
		case "en":
			exportLungAssessText = {
				'text1': "Tip",
				'text2': "Request failed.",
				'text3': "Server busy.",
				'text4': "The name cannot be empty",
				'text5': "Please select gender",
				'text6': "Height cannot be empty",
				'text7': "Age cannot be empty",
				'text8': "Preoperative actual FEV1 cannot be empty",
				'text9': "Height or preoperative actual FEV1 is not legal",
				'text10': "Age Illegal",
				'text11': " and the surface of ",
				'text12': "Lung:",
				'text13': "Apex plane:",
				'text14': "Dorsal apex plane:",
				'text15': "Inferior pulmonary vein plane:",
				'text16': "Diameter:",
				'text17': "Volume:",
				'text18': "Evaluation generation, please wait...",
				'text19': "The ward must not be empty",
				'text20': "The bed number cannot be empty",
				'text21': "Man",
				'text22': "Woman",
				'text23': "There are still images not generated",
				'text24': "3D assessment",
				'text25': "Save failed",
				'text26': "The distance between ",
				'text27': ""
			}
	}
}

ViewerLanguage.prototype.initGeneralReportLan  = function(){
	switch(USER_LANGUAGE){
		case "zh":
			generalReportText = {
				'text1': "提示",
				'text2': "请求失败",
				'text3': "服务器繁忙",
				'text4': "请先加载案例",
				'text5': "报告生成中，请稍后...",
				'text6': "",
				'text7': "保存失败",
				'text8': "男",
				'text9': "姓名不能为空",
				'text10': "身高不能为空",
				'text11': "请正确填写身高",
				'text12': "体重不能为空",
				'text13': "请正确填写体重",
				'text14': "请选择性别",
				'text15': "年龄不能为空",
				'text16': "请正确填写年龄",
				'text17': "还有图片未生成",
				'text18': "女",
				'text19': ""
			}
			break;
		case "en":
			generalReportText = {
				'text1': "Tip",
				'text2': "Request failed.",
				'text3': "Server busy.",
				'text4': "Please load the case first",
				'text5': "Report generation, please wait...",
				'text6': "",
				'text7': "Save failed",
				'text8': "man",
				'text9': "Name cannot be empty",
				'text10': "Height cannot be empty",
				'text11': "Please fill in the height correctly",
				'text12': "Weight cannot be empty",
				'text13': "Please fill in the weight correctly",
				'text14': "Please select gender",
				'text15': "Age cannot be empty",
				'text16': "Please fill in the age correctly",
				'text17': "There are still no images generated",
				'text18': "woman",
				'text19': ""
			}
	}
}

ViewerLanguage.prototype.initKidneyAssessText  = function(){
	switch(USER_LANGUAGE){
		case "zh":
			kidneyAssessText = {
				'text1': "肿瘤大小",
				'text2': "直径",
				'text3': "体积",
				'text4': "距离表面",
				'text5': "距肾上极平面",
				'text6': "距肾下极平面",
				'text7': "距肾侧平面",
				'text8': "分值",
				'text9': "肿瘤外凸率",
				'text10': "完全内生肿瘤",
				'text11': "肿瘤距集合系统距离",
				'text12': "肿瘤位置",
				'text13': "腹侧",
				'text14': "背侧",
				'text15': "不明位置",
				'text16': "肿瘤与肾脏上下极关系",
				'text17': "肿瘤完全位于肾的上极或下极",
				'text18': "肿瘤大部分位于肾的上极或下极",
				'text19': "肿瘤50%以上穿过肾的上极或下极",
				'text20': "评分",
				'text21': "肿瘤处于肾位置",
				'text22': "左肾",
				'text23': "右肾",
				'text24': "左肾占位",
				'text25': "右肾占位",
				'text26': "提示",
				'text27': "请求失败",
				'text28': "服务器繁忙",
				'text29': "",
				'text30': ""
			}
			break;
		case "en":
			kidneyAssessText = {
				'text1': "Tumor size",
				'text2': "Diameter",
				'text3': "Volume",
				'text4': "Distance from surface",
				'text5': "Suprarenal plane",
				'text6': "Subthalamic plane",
				'text7': "Lateral plane to kidney",
				'text8': "Score",
				'text9': "Exoconvex rate of tumor",
				'text10': "Completely endophytic tumor",
				'text11': "Distance between tumor and collective system",
				'text12': "Tumor location",
				'text13': "Anterior",
				'text14': "Posterior",
				'text15': "Unknown location",
				'text16': "Relationship between tumor and renal upper and lower poles",
				'text17': "The tumor was completely located in the upper or lower pole of the kidney",
				'text18': "Most of the tumors were located in the upper or lower pole of the kidney",
				'text19': "More than 50% of tumors pass through the upper or lower pole of the kidney",
				'text20': "score",
				'text21': "The tumor is located in the kidney",
				'text22': "Left",
				'text23': "Right",
				'text24': "Left renal mass",
				'text25': "Right renal mass",
				'text26': "Tip",
				'text27': "Request failed.",
				'text28': "Server busy.",
				'text29': "",
				'text30': ""
			}
	}
}

ViewerLanguage.prototype.getLoginText = function(){
	var loginText = {};

	if(USER_LANGUAGE == "zh"){
		loginText = {
			'indexMsg1': '文件下载失败，请检查网络连接',
			'indexMsg2': '您的输入错误次数已达上限，请稍后再试',
			'indexMsg3': '该用户不存在',
			'indexMsg4': '用户名或密码错误',
			'indexMsg5': '您的输入错误次数已达上限，请稍后再试',
			'indexMsg6': '您还可以尝试',
			'indexMsg7': '次!',
			'indexMsg8': '手机号不能为空',
			'indexMsg9': '请输入合法的手机号',
			'indexMsg10': '密码不能为空',
			'indexMsg11': '密码不可包含数字、字母、特殊符号（!#$%^&*@）以外的字符',
			'indexMsg12': '您的输入错误次数已达上限，请等待',
			'indexMsg13': '分钟后再试',
			'indexMsg14': '提示',
			'indexMsg15': '若您不同意协议，将无法使用我们的程序',
			'indexMsg16': '正在加载文件：',
			'indexMsg17': '区号不能为空',
			'indexMsg18': '手机号不能为空',
			'indexMsg19': '请输入合法的手机号',
			'indexMsg20': '密码不能为空',
			'indexMsg21': '密码为6-20位字符，可以是数字、字母、特殊字符（!#$%^&*@），至少其中两种组合',
			'indexMsg22': '验证码已发送',
			'indexMsg23': '验证码发送失败，请稍后再试',
			'indexMsg24': '获取验证码',
			'indexMsg25': '秒',
			'indexMsg26': '请输入6位短信验证码',
			'indexMsg27': '请输入合法的短信验证码',
			'indexMsg28': '若您不同意《用户协议和隐私政策》，将无法使用我们的程序',
			'indexMsg29': '注册成功，1秒后自动登录',
			'indexMsg30': '该手机号已注册',
			'indexMsg31': '短信验证码不正确',
			'indexMsg32': '手机号不合法',
			'indexMsg33': '注册失败，请稍后再试',
			'indexMsg34': '登录失败，请稍后再试',
			'indexMsg35': '网络异常，登录失败',
			'indexMsg36': '网络异常，验证码发送失败',
			'indexMsg37': '网络异常，注册失败',
			'indexMsg38': '重新下载'
		}
	}
	else{
		loginText = {
			'indexMsg1': 'File downloading failed. Please check your network connection',
			'indexMsg2': 'You have reached the maximum number of input errors. Please try again later',
			'indexMsg3': 'user does not exist',
			'indexMsg4': 'Wrong user name or password',
			'indexMsg5': 'You have reached the maximum number of input errors. Please try again later',
			'indexMsg6': 'Remaining attempts:',
			'indexMsg7': '',
			'indexMsg8': 'Mobile phone number cannot be empty',
			'indexMsg9': 'Please enter a valid mobile phone number',
			'indexMsg10': 'Password cannot be empty',
			'indexMsg11': 'The password cannot contain characters other than numbers, letters and special symbols (! # $% ^ &amp; * @)',
			'indexMsg12': 'You have reached the maximum number of input errors. Please wait for',
			'indexMsg13': 'minutes',
			'indexMsg14': 'Tips',
			'indexMsg15': 'If you do not agree to the agreement, you will not be able to use our program',
			'indexMsg16': 'Loading file: ',
			'indexMsg17': 'Area code cannot be empty',
			'indexMsg18': 'Mobile phone number cannot be empty',
			'indexMsg19': 'Please enter a valid mobile phone number',
			'indexMsg20': 'Password cannot be empty',
			'indexMsg21': 'The password is 6-20 characters, which can be numbers, letters, special characters (! # $% ^ &amp; * @), at least two combinations of them',
			'indexMsg22': 'Verification code sent',
			'indexMsg23': 'Verification code sending failed, please try again later',
			'indexMsg24': 'Get SMSCode',
			'indexMsg25': 's',
			'indexMsg26': 'Please input 6-digit SMS verification code',
			'indexMsg27': 'Please enter a valid SMS verification code',
			'indexMsg28': 'If you do not agree to 《User agreement and privacy policy》, you will not be able to use our program',
			'indexMsg29': 'Successful registration, automatic login in 1 second',
			'indexMsg30': 'The mobile number has been registered',
			'indexMsg31': 'Incorrect SMS verification code',
			'indexMsg32': 'Illegal mobile phone number',
			'indexMsg33': 'Registration failed, please try again later',
			'indexMsg34': 'Login failed. please try again later',
			'indexMsg35': 'Network exception, login failed',
			'indexMsg36': 'Network exception，verification code sending failed',
			'indexMsg37': 'Network exception, registration failed',
			'indexMsg38': 'Download again'
		}
	}

	return loginText;
}

ViewerLanguage.prototype.getResetPassText = function(){
	var resetPassText = {};

	if(USER_LANGUAGE == "zh"){
		resetPassText = {
			"resetPassMsg1": "区号不能为空",
			"resetPassMsg2": "请输入合法的手机号",
			"resetPassMsg3": "密码不能为空",
			"resetPassMsg4": "密码为6-20位字符，可以是数字、字母、特殊字符（!#$%^&*@），至少其中两种组合",
			"resetPassMsg5": "验证码已发送",
			"resetPassMsg6": "验证码发送失败，请稍后再试",
			"resetPassMsg7": "网络异常，验证码发送失败",
			"resetPassMsg8": "获取验证码",
			"resetPassMsg9": "秒",
			"resetPassMsg10": "请输入6位短信验证码",
			"resetPassMsg11": "短信验证码不合法",
			"resetPassMsg12": "",
			"resetPassMsg13": "密码修改成功，2秒后回到登录页",
			"resetPassMsg14": "该用户不存在",
			"resetPassMsg15": "短信验证码不正确",
			"resetPassMsg16": "重置失败，稍后再试",
			"resetPassMsg17": "手机号不能为空",
			"resetPassMsg18": "网络异常，重置密码失败",
			'resetPassMsg19': '正在发送验证码'
		}
	}
	else{
		resetPassText = {
			"resetPassMsg1": "Area code cannot be empty",
			"resetPassMsg2": "Please enter a valid mobile phone number",
			"resetPassMsg3": "Password cannot be empty",
			"resetPassMsg4": "The password is 6-20 characters, which can be numbers, letters, special characters (! # $% ^ &amp; * @), at least two combinations of them",
			"resetPassMsg5": "SMSCode sent",
			"resetPassMsg6": "SMSCode sending failed, please try again later",
			"resetPassMsg7": "Network exception, SMSCode sending failed",
			"resetPassMsg8": "Get SMSCode",
			"resetPassMsg9": "s",
			"resetPassMsg10": "Please input 6-digit SMSCode",
			"resetPassMsg11": "Illegal SMSCode",
			"resetPassMsg12": "",
			"resetPassMsg13": "Password modified successfully, return to the login page in 2 second",
			"resetPassMsg14": "The user does not exist",
			"resetPassMsg15": "Incorrect SMSCode",
			"resetPassMsg16": "Reset failed. Try again later",
			"resetPassMsg17": "Mobile phone number cannot be empty",
			"resetPassMsg18": "Network exception, Reset password failed",
			'resetPassMsg19': 'Sending SMSCode'
		}
	}

	return resetPassText;
}

ViewerLanguage.prototype.getCaseFilterText = function(){
	var caseFilterText;
	if(USER_LANGUAGE == "zh"){
		caseFilterText = {
			'text1': "开始日期不能大于今天",
			'text2': "结束日期不能大于今天",
			'text3': "结束日期不能大于开始日期",
			'text4': '',
			'text5': '',
			'text6': '',
			'text7': '',
			'text8': '',
			'text9': ''
		}
	}
	else{
		caseFilterText = {
			'text1': 'The start date cannot be greater than today',
			'text2': 'The end date cannot be greater than today',
			'text3': 'The end date cannot be greater than the start date',
			'text4': '',
			'text5': '',
			'text6': '',
			'text7': '',
			'text8': '',
			'text9': ''
		}
	}
	return caseFilterText;
}

ViewerLanguage.prototype.getSyncDataText = function(){
	var syncDataText = {};
	if(USER_LANGUAGE == "zh"){
		syncDataText = {
			'text1': "提示",
			'text2': "无可同步数据",
			'text3': "删除失败，请重新操作",
			'text4': "同步数据失败",
			'text5': "您未指定关联医院，请先添加关联医院",
			'text8': "未搜索到数据",
			'text9': "检查名",
			'text10': "检查日期",
			'text11': "同步状态",
			'text12': "同步",
			'text13': "已同步",
			'text14': "确定移除此医院吗？",
			'text15': '获取医院列表失败',
			'text16': '更新同步状态失败'
		}
	}
	else {
		syncDataText = {
			'text1': "tip",
			'text2': "No sync data",
			'text3': "Failed to delete. Please try again",
			'text4': "Synchronization data failed",
			'text5': "You have not specified an associated hospital. Please add an associated hospital first",
			'text8': "No data found",
			'text9': "Study name",
			'text10': "Study date",
			'text11': "Sync status",
			'text12': "Sync",
			'text13': "Synchronized",
			'text14': "Are you sure to remove this hospital?",
			'text15': 'Failed to get Hospital List',
			'text16': 'Failed to update synchronization status'
		}
	}
	
	return syncDataText;
}

ViewerLanguage.prototype.getAddFriendText = function(){
	var addFriendText = {};
	switch(USER_LANGUAGE){
		case "zh":
			addFriendText = {
				'text1': "新的朋友",
				'text2': "好友请求",
				'text3': "等待验证",
				'text4': "接受",
				'text5': "已添加",
				'text6': "删除",
				'text7': "提示",
				'text8': "删除失败，请稍后再试",
				'text9': "未查询到符合的用户",
				'text10': "查询失败，请稍后再试"

			}
			break;
		case "en":
			addFriendText = {
				'text1': "New friends",
				'text2': "Friend request",
				'text3': "Waiting for verification",
				'text4': "Accept",
				'text5': "Added",
				'text6': "Delete",
				'text7': "Tip",
				'text8': "Deletion failed, please try again later",
				'text9': "No matching users were found",
				'text10': "Query failed, please try again later"
			}
	}
	return addFriendText;
}

m_userLanguage = new ViewerLanguage();
