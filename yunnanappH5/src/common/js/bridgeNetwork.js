import Bridge from './bridge.js'
export class network {
	static _alert(equipment) {
//		let netMsg = {}
		if (equipment == 'ios') {
			//h5 >>>原生
		 	Bridge.callhandler("changeNetwork", data => {
		        // 处理返回数据
//				alertMsg = data;
				//无线状态下返回wifi，有线返回4G
				alert(data)
	      	});
			//原生 >>> h5
		 	// Bridge.registerhandler('changeNetwork', function(data, responseCallback){
		 	// 	alert(data)
        	// 	responseCallback(data)
      		// })
		}else if(equipment == 'android'){
			Bridge.callhandler('changeNetwork', data => {
		        // 处理返回数据
		       alert(data)
//				netMsg.msg = data
			 });
	     	// Bridge.registerhandler('changeNetwork', function(data, responseCallback){
		 	// 	alert(data)
        	// 	responseCallback(data)
      		// })
		}
		// return netMsg
	}
}