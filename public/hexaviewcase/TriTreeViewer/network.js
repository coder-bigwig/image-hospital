'use strict';

var m_network = null;

var Network = function(){
	this.m_type = "4g";
	this.m_offline = false;

	this.init();
}

Network.prototype.init = function(){
	this.listenNetwork();
}


/* 监控网络情况 */
Network.prototype.listenNetwork = function(){
	try{
		var that = this;
		var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

		/* IOS不支持 */
		if(connection){
			connection.addEventListener('change', function(){
				if(connection.effectiveType.match("4g") == "4g"){
					that.m_type = "4g";
				}
				else if(connection.effectiveType.match("3g") == "3g"){
					that.m_type = "3g";
				}
				else if(connection.effectiveType.match("2g") == "2g"){
					that.m_type = "2g";
				}
				else{
					that.m_type = "4g";
				}

				that.updateNetworkIcon();
				if(that.m_type == "2g" || that.m_type == "3g"){
					layer.msg(viewerText['text71'], {icon: 0});
				}
				
			});
		}

		window.addEventListener("online", function(){
			that.m_offline = false;
			that.updateNetworkIcon();
		});

		window.addEventListener("offline", function(){
			that.m_offline = true;
			that.updateNetworkIcon();
			showMsg({msg: viewerText['text65']});
		});

	}catch(e){
		console.log(e);
	}
}

/* 
	更新网络状态图标
*/
Network.prototype.updateNetworkIcon = function(){
	var logo = document.getElementById("logoImg");
	if(!logo){
		return;
	}

	if(navigator.onLine === false){
		logo.src = "images/picture/logo_offline.png";
		return;
	}

	if(this.m_type == "2g" || this.m_type == "3g"){
		logo.src = "images/picture/logo_poorNeteork.png";
	}
	else{
		logo.src = "images/picture/logo.png";
	}
	
}