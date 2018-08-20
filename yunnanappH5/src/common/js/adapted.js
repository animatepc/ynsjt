export const adapted = {
	orientation(doc, win) {
		//orientationchange方向改变事件
		var docEl = doc.documentElement,//根元素html

			//判断窗口有没有orientationchange这个方法，有就赋值给一个变量，没有就返回resize方法。

			resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',

			recalc = function () {

				var clientWidth = docEl.clientWidth;

				if (!clientWidth) return;

				//把document的fontSize大小设置成跟窗口成一定比例的大小，从而实现响应式效果。

				docEl.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';

			};

		//alert(docEl)

		if (!doc.addEventListener) return;

		win.addEventListener(resizeEvt, recalc, false);//addEventListener事件方法接受三个参数：第一个是事件名称比如点击事件onclick，第二个是要执行的函数，第三个是布尔值

		doc.addEventListener('DOMContentLoaded', recalc, false)//绑定浏览器缩放与加载时间
		//alert(document.documentElement.clientWidth/320)
	},
	dpr() {
		var dpr, rem, scale, win = window;
		var docEl = document.documentElement;
		var metaEl = document.querySelector('meta[name="viewport"]');
		dpr = win.devicePixelRatio || 1;
		scale = 1 / dpr;
		rem = docEl.clientWidth * dpr / 7.5;
		// 设置viewport，进行缩放，达到高清效果 
		metaEl.setAttribute('content', 'width=' + 'device-width' + ', initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
		// 设置data-dpr属性，留作的css hack之用 
		//		console.log()
		docEl.setAttribute('data-dpr', dpr);
		// 动态写入样式 
		//		docEl.firstElementChild.appendChild(fontEl); 
		//		fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}'; 
		// 给js调用的，某一dpr下rem和px之间的转换函数 
		window.rem2px = function (v) {
			v = parseFloat(v);
			return v * rem;
		};
		window.px2rem = function (v) {
			v = parseFloat(v);
			return v / rem;
		};
		window.dpr = dpr;
		window.rem = rem;
	},
	px2rem() {
		let wid = document.documentElement.clientWidth / (window.devicePixelRatio || 1)
		this.$refs.header.style = `width:${window.px2rem(wid) - 0.4}rem`
	},
	browser() {
		let versions = function () {
			var u = navigator.userAgent, app = navigator.appVersion;
			return {         //移动终端浏览器版本信息
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
				iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
				webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
			};
		}
		let language = (navigator.browserLanguage || navigator.language).toLowerCase()
		return { 'versions': versions(), 'language': language }
	},
	plusReady(e, items) {
		// var _this = e 
		// document.addEventListener('plusready', function() {
		// 	var webview = plus.webview.currentWebview();
		// 	plus.key.addEventListener('backbutton', function() {
		// 		webview.canBack(function(e) {
		// 			//webview.close(); //hide,quit
		// 			//plus.runtime.quit();
		// 			//首页返回键处理
		// 			//处理逻辑：1秒内，连续两次按返回键，则退出应用；
		// 			let routerArr = ['system/home','multimedia/video','myphoto/shootlist','cloudtv/livebroadcast','mymodule/signin']
		// 			routerArr.forEach((e,index)=>{
		// 				if(items == e){
		// 					var first = null;
		// 					plus.key.addEventListener('backbutton', function() {
		// 						//首次按键，提示‘再按一次退出应用’
		// 						if (!first) {
		// 							first = new Date().getTime();
		// 							_this.$vux.toast.show({
		// 								type:'text',
		// 								text: '再点一次退出云南台',
		// 								position:'bottom'
		// 							})
		// 							setTimeout(function() {
		// 								first = null;
		// 							}, 1000);
		// 						} else {
		// 							if (new Date().getTime() - first < 1500) {
		// 								plus.runtime.quit();
		// 							}
		// 						}
		// 					}, false);
		// 				}else if(e.canBack){
		// 					webview.back();        
		// 				}
		// 			})
		// 		})
		// 	});
		// });
	},
	setStatusbar(styles) {
		// document.addEventListener('plusready', function() {
		// 	// 设置系统状态栏背景色为红色
		// 	plus.navigator.setStatusBarStyle(styles);
		// })
	},
	stopPreventdefault() {
		//屏蔽右键菜单  
		document.oncontextmenu = function (event) {
			if (window.event) {
				event = window.event;
			} try {
				var the = event.srcElement;
				if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")) {
					return false;
				}
				return true;
			} catch (e) {
				return false;
			}
		}


		//屏蔽粘贴  
		document.onpaste = function (event) {
			if (window.event) {
				event = window.event;
			} try {
				var the = event.srcElement;
				if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")) {
					return false;
				}
				return true;
			} catch (e) {
				return false;
			}
		}


		//屏蔽复制  
		document.oncopy = function (event) {
			if (window.event) {
				event = window.event;
			} try {
				var the = event.srcElement;
				if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")) {
					return false;
				}
				return true;
			} catch (e) {
				return false;
			}
		}


		//屏蔽剪切  
		document.oncut = function (event) {
			if (window.event) {
				event = window.event;
			} try {
				var the = event.srcElement;
				if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")) {
					return false;
				}
				return true;
			} catch (e) {
				return false;
			}
		}


		//屏蔽选中  
		document.onselectstart = function (event) {
			if (window.event) {
				event = window.event;
			} try {
				var the = event.srcElement;
				if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")) {
					return false;
				}
				return true;
			} catch (e) {
				return false;
			}
		}

		document.ondragstart = function (event) {
			if (window.event) {
				event = window.event;
			} try {
				var the = event.srcElement;
				if (!((the.tagName == "INPUT" && the.type.toLowerCase() == "text") || the.tagName == "TEXTAREA")) {
					return false;
				}
				return true;
			} catch (e) {
				return false;
			}
		}
	}
}