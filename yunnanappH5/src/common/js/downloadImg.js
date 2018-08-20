import Bridge from './bridge.js'
export class download {
	static downloadImg(equipment) {
		if (equipment == 'ios') {
		 	Bridge.callhandler("downLoadImg", data => {
				alert(data)
	      	});
		}else if(equipment == 'android'){
			Bridge.callhandler('downLoadImg', data => {
		       alert(data)
			 });
		}
	}
}