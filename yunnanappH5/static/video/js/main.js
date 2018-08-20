function getFileExt(str) {
	var d = /\.[^\.]+$/.exec(str)[0];
	if (d.indexOf('#') != -1) d = d.split('#')[0];
	if (d.indexOf('?') != -1) d = d.split('?')[0];
	if (d.indexOf(':') != -1) d = d.split(':')[0];
	if (d.indexOf('.') != -1) d = d.split('.')[1];

	return d
}

var _id = undefined,
	_type = undefined,
	setSpeet = 0.2,
	click = 'click';

function setCookie(c_name, value, expiredays) {
	var exdate = new Date()
	exdate.setDate(exdate.getDate() + expiredays)
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=")
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1
			c_end = document.cookie.indexOf(";", c_start)
			if (c_end == -1) c_end = document.cookie.length
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return ""
}

var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var maxNum = isAndroid ? 255 : 100;
var volumeNum = isAndroid ? 15 : 100;
var jz = 100/maxNum;
var pageXY = isAndroid ? 'pageY' : 'pageX';
var _pageXY = pageXY === 'pageY' ? 'pageX' : 'pageY';
var mrldMax = isAndroid ? 255 : 100;
var mrylMax = isAndroid ? 15 : 100;
var isFrist = getCookie('frist');
var timeSpeet = 0.05;//秒
var callHandler;
var registerHandler;
var get, getWSList, getPDList, getPDDetail, getJMList;

if(isFrist !== 'true') {
	$('#my-player').addClass('frist');
}

if(isAndroid) $('#my-player').css({
	transform:'none'
});


var videoType = {
	avi:'video/avi',
	wmv:'',
	mpeg:'video/mpeg',
	mp4:'video/mp4',
	mov:'',
	mkv:'MKV-application/octet-stream',
	flv:'video/x-flv',
	f4v:'application/octet-stream',
	m3u8:'application/x-mpegURL',

	// m4v:'',
	// rmvb:'',
	// rm:'',
	// 3gp:'',
	// dat:'',
	// ts:'',
	// mts:'',
	// vob:'',
}

function myBrowser(){
	if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){
		return true
	}
	return false;
}
//以下是调用上面的函数
var mb = myBrowser();


var url = 'http://yntvapp.4kb.cn/webapp-yrt',
	userId = '989706884811304960';

var options = {
	html5: {
			hls: {
					withCredentials: true
				}
	},
	flash: {
			hls: {
					withCredentials: true
			}
	}
};

var wsListStore = null


function createBtn(text, className){
	return '<button class="ui-btn '+ className +'">' + text + '</button>'
}


function createTR(tdList){
	var dom =  $('<tr></tr>');
	for(var i in tdList) dom.append(tdList[i]);
	return dom;
}

function createTD(DOM, className){
	var dom = $('<td class="'+ (className || '') +'"></td>')
	return dom.append(DOM);
}

function createTable(trList, id){
	var dom = $('<div class="tablist-content"></div> ');
	var table = $('<table data-role="table" id="'+ (id || '') +'" data-mode="columntoggle" class="ui-responsive table-stroke"></table>');
	var tb = $('<tbody></tbody>');
	for(var i in trList) tb.append(trList[i]);
	return dom.append(table.append(tb))
	}

function removeShadow(){
	setTimeout(function(){
		$('#my-player').removeClass('video-qxdBoxShow');
		$('#my-player').removeClass('video-settingBoxShow');
		$('#my-player').removeClass('video-selectPDBoxShow');
		$('#my-player').removeClass('video-fenxiangBoxShow');
	}, 100)
} 
function creatTouchstartEventAndDispatch (el) { 
	var event = document.createEvent('TouchEvent');
	var event2 = document.createEvent('TouchEvent');

	event.initUIEvent('touchstart', true, true); 
	event2.initUIEvent('touchend', true, true); 

	Object.defineProperty(event, "touches", {
	    value: [{
			pageX:1
	    }],
	    writable: true
	});
	event2.touches = [{

    }];	
	el.dispatchEvent(event); 
	el.dispatchEvent(event2); 
} 


var player = videojs('my-player', options, function onPlayerReady() {
	videojs.log('Your player is ready!');

	// In this context, `this` is the player that was created by Video.js.

	this.play();
	$('.vjs-big-play-button').click();
});
setTimeout(function(){

	// creatTouchstartEventAndDispatch($('#my-player .vjs-big-play-button')[0])
}, 1000)
player.isFullscreen_ = true;

function play(url, id, type){
	_id = id;
	_type = type;
	
	var type = videoType[getFileExt(url)];
	if(url.indexOf('rtmp://') != -1) type = 'rtmp/flv';
	if(url.indexOf('m3u8') != -1) type = 'application/x-mpegURL';
	player.src({
		src:url,
		type:type,
		withCredentials:true
	})
	player.play();
	if($('#my-player').hasClass('frist')){
		player.pause();
	}
}

function resize (){

	var width = $(window).height(),
		height = $(window).width();
	$("#my-player").css({
		width:width+'px',
		height:height+'px',
		"transform-origin":(height/2)+'px'
	})
}

function togglePlayer(){
	if (player.paused()) {
		player.play();
		// showDialog('播放');
	} else {
		player.pause();
		// showDialog('暂停');
	}
}

/* 原工具栏按钮 */
var qxd = $('<button class="vjs-control vjs-button ui-btn-hidden" type="button" aria-live="polite" title="清晰度" aria-disabled="false" data-disabled="false"><span aria-hidden="true" class="vjs-icon-placeholder">标清</button>')

qxd.on(click, function(){
	$('#my-player').addClass('video-qxdBoxShow');
})

var full = $('<button class="vjs-fullscreen-control vjs-control vjs-button ui-btn-hidden" type="button" aria-live="polite" title="Fullscreen" aria-disabled="false" data-disabled="false"><span aria-hidden="true" class="vjs-icon-placeholder"></span><span class="vjs-control-text">Fullscreen</span></button>');

full.on(click, toggleFull)
function toggleFull () {
	setTimeout(function(){
		$("body").toggleClass('full')
		callHandler('full', $("body").hasClass('full').toString());
		
		if(isAndroid) {
			return;
		}

		if($("body").hasClass('full')){
			$(window).on('resize', resize);
			resize();
		}else{
			$(window).off('resize', resize);
			$("#my-player").attr('style', '');
		}
	}, 100)
}

var setting = $('<button class="vjs-control vjs-button ui-btn-hidden" type="button" aria-live="polite" title="设置" aria-disabled="false" data-disabled="false"><span aria-hidden="true" class="vjs-icon-placeholder">设置</button>');

setting.on(click, function(){
	$("#my-player").addClass('video-settingBoxShow');
})


$("#my-player").find('.vjs-control-bar').find('.vjs-fullscreen-control').hide();
$("#my-player").find('.vjs-control-bar').append(qxd);
$("#my-player").find('.vjs-control-bar').append(setting);
$("#my-player").find('.vjs-control-bar').append(full);



/* 新工具栏按钮 */
var shoucang = $("<span class='shocang'>收藏</span>");
shoucang.on(click, function (argument) {
	get('/play/collection.do', function(data){
		showDialog(data.message);
	}, {id:_id, type:_type})
})
function setShoucang(text){
	shoucang.text(text);
}

var fenxiang = $("<span class='fenxiang'>分享</span>");
fenxiang.on(click, function (argument) {
	$('#my-player').addClass('video-fenxiangBoxShow');
})

var getv = $("<span class='getv'>获取音量</span>");
getv.on(click, function (argument){
	callHandler('getVolume');
})

var getb = $("<span class='getb'>获取亮度</span>");
getb.on(click, function (argument) { 
	callHandler('getBrightness');
})

var pindao = $("<span class='pindao'>频道</span>");
pindao.on(click, function (argument) {
	setTimeout(function(){
		$('#my-player').addClass('video-selectPDBoxShow');
	}, 100)
})

var pageBack = $("<span class='pageBack'><image src='images/u302.png'></image></span>");
pageBack.on(click, toggleFull)


var tools = $("<div class='video-tools'></div>");
tools.append(pindao);
tools.append(shoucang);
// tools.append(fenxiang);
tools.append(pageBack);
// tools.append(getv);
// tools.append(getb);



/* 新层 */
var dialog = $("<div class='video-dialog'>弹出层</div>");
dialog.hide();

/* 新层 */
var rangeDialog = $("<div class='video-range-dialog'></div>");
var rangeDialogText = $("<div class='rangeDialogText'></div>");
var rangeDialogInput = $("<div class='rangeDialogInput'></div>");
var rangeDialogContent = $("<div class='rangeDialogContent'></div>");

rangeDialog.append(rangeDialogText);
rangeDialog.append(rangeDialogInput);

rangeDialogInput.append(rangeDialogContent);

rangeDialog.hide();

/*清晰度*/
var qxdBox = $("<div class='video-qxdBox'></div>");

var bq = $(createBtn('标清'));

qxdBox.append(bq);


function clearTC(){
	$("#my-player").removeClass('h_50');
	$("#my-player").removeClass('h_75');
	$("#my-player").removeClass('h_100');
	$("#my-player").removeClass('h_tc');
}

/*设置*/
var settingBox = $("<div class='video-settingBox'></div>")

var hm = $("<div class='video-hm'>画面：</div>")
var h_50 = $("<div class='hm_btn'><image src='images/u394.png'></image>50%</div>");
var h_75 = $("<div class='hm_btn'><image src='images/u394.png'></image>75%</div>");
var h_100 = $("<div class='hm_btn'><image src='images/u394.png'></image>100%</div>");
var h_tc = $("<div class='hm_btn'><image src='images/u394.png'></image>填充</div>");

h_50.on(click, function(){
	clearTC();
	$("#my-player").addClass('h_50');
})
h_75.on(click, function(){
	clearTC();
	$("#my-player").addClass('h_75');
})
h_100.on(click, function(){
	clearTC();
	$("#my-player").addClass('h_100');
})
h_tc.on(click, function(){
	clearTC();
	$("#my-player").addClass('h_tc');
})

hm.append($('<div></div>'))
hm.append(h_50);
hm.append(h_75);
hm.append(h_100);
hm.append(h_tc);

var ldBox = $('<div class="clearfix" style="margin-bottom:10px;"></div>');
var ylBox = $('<div class="clearfix" style="margin-bottom:10px;"></div>');

var ldInputBox = $('<div class="ldInputBox"></div>');
var ylInputBox = $('<div class="ylInputBox"></div>');

var ldTextBox = $('<div class="ldTextBox">亮度：</div>');
var ylTextBox = $('<div class="ylTextBox">音量：</div>');

var ldInput = $('<input class="video-settingBox-ld" id="video-settingBox-ld" start="aaa" data-mini="true" type="range" min="0" max="'+ mrldMax+'" value="'+ mrldMax+'">');
ldInput.on('change input', function(){
	setBrightness($(this).val());
})
var ylInput = $('<input class="video-settingBox-ld" id="video-settingBox-yl" start="aaa" data-mini="true" type="range" min="0" max="'+mrylMax+'" value="'+mrylMax+'">');
ylInput.on('change input', function(){
	setVolume($(this).val());
})


ldBox.append(ldTextBox);
ylBox.append(ylTextBox);

ldBox.append(ldInputBox);
ylBox.append(ylInputBox);

ldInputBox.append(ldInput);
ylInputBox.append(ylInput);

settingBox.append(ldBox)
settingBox.append(ylBox)


settingBox.append(hm)


function setBrightness(num){
	num = getNum(num,mrldMax);
	// showDialog(num)
	callHandler('setBrightness', num || 0);
	setLD(num)
}
function setVolume(num){
	num = getNum(num,mrylMax);
	// showDialog(num)
	callHandler('setVolume', num || 0);
	setYL(num)
}
var mrld, mryl

function getNum (n, max){
	n = parseFloat(n);
	if(n.toFixed) n = n.toFixed(4);
	n = n || 0;
	n = Math.min(n, max);
	n = Math.max(n, 0);
	return n;
}

function setLD (n){
	ld = getNum(n, mrldMax);
	$('#video-settingBox-ld').val(ld)
	showRangeDialog('屏幕亮度', parseInt(isAndroid ? ld* 100/mrldMax : ld))
}
function setYL (n){
	yl = getNum(n, mrylMax);
	$('#video-settingBox-yl').val(yl)
	showRangeDialog('音量', parseInt(isAndroid ? yl* 100/mrylMax : yl))
}

var hfmr = $(createBtn('恢复默认', 'video-hfmr'));
hfmr.on(click, function(){
	clearTC();
	$("#my-player").addClass('h_tc');
	setBrightness(mrld*100/mrldMax || mrldMax)
	setVolume(mryl*100/mrylMax || mrylMax)
})
settingBox.append(hfmr);


/*卫视选择*/
var selectPDBox = $("<div class='video-selectPDBox'></div>")
var typeList = $('<div class="typeList" data-role="controlgroup" data-mini="true"></div>');
var wsList = $('<div class="wsList" data-role="controlgroup" data-mini="true"></div>');

function setVideoSelectPDBox(list){
	list.forEach(function(d){
		(function(d){
			var _d = d;
			var ws = $(createBtn(d.name, 'ui-corner-all'));
			ws.on(click, function(){
				getPDList(function(data){
					wsList.children().remove();
					data.list.forEach(function(d){
						var w = $(createBtn(d.name, 'ui-corner-all'));
						w.on(click, function(event){
							setTimeout(function(){
								removeShadow();
							}, 100)
							getPDDetail(function(data){
								if(data.data.url) play(data.data.url, d.id, '90')
									setShoucang(data.data.isCollection == '1' ? '取消收藏' : '收藏')
							}, {id: d.id})
						})
						wsList.append(w);
					})
					wsList.trigger("create");
				}, {id:d.id, type:d.type})
			})
			typeList.append(ws);

		})(d)
		
	})
	typeList.trigger("create");
}
selectPDBox.append(typeList);
selectPDBox.append(wsList);

/*分享*/
var fenxiangBox = $("<div class='video-fenxiangBox'></div>");
var fBox = $("<div class='video-fBox'></div>")

var fx_qq = $("<div class='fx_btn'><image src='images/u349.png'></image>QQ</div>")
fx_qq.on(click, function(){
	callHandler('share', {type: '1'}, function (response) {
			console.log('qq', response)
	});
})
var fx_kj = $("<div class='fx_btn'><image src='images/u351.png'></image>QQ空间</div>")
fx_kj.on(click, function(){
	callHandler('share', {type: '2'}, function (response) {
			console.log('kj', response)
	});
})
var fx_wx = $("<div class='fx_btn'><image src='images/u353.png'></image>微信</div>")
fx_wx.on(click, function(){
	callHandler('share', {type: '0'}, function  (response) {
			console.log('wx', response)
	});
})
// var fx_py = $("<div class='fx_btn'><image src='images/u355.png'></image>朋友圈</div>")
// fx_py.on(click, function(){
//   callHandler('share', {type: '1'}, function (response) {
//       console.log('py', response)
//   });
// })
var fx_wb = $("<div class='fx_btn'><image src='images/u357.png'></image>微博</div>")
fx_wb.on(click, function(){
	callHandler('share', {type: '3'}, function (response) {
			console.log('wb', response)
	});
})
var fx_fz = $("<div class='fx_btn'><image src='images/u347.png'></image>复制链接</div>")
fx_fz.on(click, function(){
	callHandler('share', {type: '4'}, function (response) {
			console.log('fz', response)
	});
})

fBox.append(fx_qq)
fBox.append(fx_kj)
fBox.append(fx_wx)
// fBox.append(fx_py)
fBox.append(fx_wb)
fBox.append(fx_fz)

fenxiangBox.append(fBox)

/*播放-暂停*/
var togglePlayerBox = $("<div class='togglePlayerBox'></div>");
var togglePlayerImage = $("<div class='togglePlayerImage'></div>");

togglePlayerBox.append(togglePlayerImage)
togglePlayerBox.on('touchstart mousedown', function(event){
	togglePlayer();
	event.stopPropagation();
	event.preventDefault();
	return false;
})



/*锁定*/
var lock = $("<div class='video-lockBox'></div>")
lock.on(click, function(){
	$('#my-player').toggleClass('video-lock');
	callHandler('lock', $('#my-player').hasClass('video-lock').toString());
})
var lockShadow = $("<div class='video-lockShadow'></div>");

var boxShadow = $("<div class='video-boxShadow'></div>");
boxShadow.on(click, removeShadow)

var dialogTime = 0;
function showDialog (context){
	if(!context) return;
	dialog.text(context);
	dialog.show(100);
	clearTimeout(dialogTime);
	dialogTime = setTimeout(function(){
		dialog.hide(300);
	}, 3000)
}

var dialogTime2 = 0;
function showRangeDialog (context, num){
	if(!context) return;
	rangeDialog.show(100);
	rangeDialog.find('.rangeDialogText').text(context);
	rangeDialog.find('.rangeDialogContent').width(num+'%');
	clearTimeout(dialogTime2);
	dialogTime2 = setTimeout(function(){
		rangeDialog.hide(300);
	}, 3000)
}


var brightnessState = false, volumeState = false, timeState = false;
var brightnessStateLen = 0, volumeStateLen = 0, timeStateLen = 0;
var stateLen = 10;
var time_oldx = 0;
/*亮度滑动*/
var brightness = $("<div class='video-brightness' ondragstart='return false;'></div>");
var oldx = 0;
var downFlag = false;
var ld = 0;
var yl = 0;
var lrFlag;
var volumeCount = 0;

brightness.on('touchstart mousedown', function(event){
	oldx = (event.originalEvent[pageXY] || event.originalEvent.changedTouches["0"][pageXY]);
	time_oldx = (event.originalEvent[_pageXY] || event.originalEvent.changedTouches["0"][_pageXY]);
	lrFlag = (time_oldx > (event.target.clientWidth / 2)) ? 'r' : 'l';
	downFlag = true;
})
brightness.on('touchmove mousemove', function(event){
	if(!downFlag) return;
	event.stopPropagation();
	event.preventDefault();
	var n = (event.originalEvent[pageXY] || event.originalEvent.changedTouches["0"][pageXY]);
	var num = n - oldx;

	var timeN = (event.originalEvent[_pageXY] || event.originalEvent.changedTouches["0"][_pageXY]);
	var timeNum = timeN - time_oldx;
	if(brightnessState && lrFlag === 'l'){
		brightnessCallback(pageXY === 'pageX' ? num: -num)
	}else if(volumeState && lrFlag === 'r'){
		// showDialog(volumeCount++)
		volumeCallback(pageXY === 'pageX' ? num: -num)
	}else if(timeState){
		// timeCallback(_pageXY === 'pageX' ? -timeNum: timeNum)
		timeCallback(timeNum)
	}else{
		if(lrFlag === 'l') brightnessState = Math.abs(brightnessStateLen += num) > stateLen;
		if(lrFlag === 'r') volumeState = Math.abs(volumeStateLen += num) > stateLen;
		timeState = Math.abs(timeStateLen += timeNum) > stateLen;
	}


	oldx = n;
	time_oldx = timeN;
})
brightness.on('touchend mouseup', function(event){
	time_oldx = oldx = 0;
	currentStateLen = 0;
	brightnessStateLen = volumeStateLen = timeStateLen = 0;
	brightnessState = volumeState = timeState = false;
	downFlag = volumeFlag = false;
})

function brightnessCallback(num){
	ld += num * setSpeet;
	setBrightness(ld);
}
function volumeCallback(num){
	yl += num * setSpeet;
	setVolume(yl)
}
function timeCallback(num){
	var currentTime = player.currentTime();
	var targetTime = currentTime + num * timeSpeet;
	player.tech_.setCurrentTime(targetTime);
}


/*引导图*/
var ydt = $("<div class='video-ydt'></div>");
ydt.click(function(e){
	setCookie('frist', 'true', 365)
	$('#my-player').removeClass('frist');
})


/* 增加层 */
$('#my-player').append(dialog)
$('#my-player').append(rangeDialog)
$('#my-player').append(lock)
$('#my-player').append(tools)
$('#my-player').append(qxdBox)
$('#my-player').append(boxShadow)
$('#my-player').append(settingBox)
$('#my-player').append(lockShadow)
$('#my-player').append(selectPDBox)
$('#my-player').append(fenxiangBox)
$('#my-player').append(brightness)
$('#my-player').append(togglePlayerBox)
$('#my-player').append(ydt)





var m3u8 = [
		'http://store1.yntv.cn/channels/yn/yntv-intl/m3u8:sd',
		'http://116.55.228.232:1935/radio/xwgb.stream/playlist.m3u8',
		'http://store2.yntv.cn/channels/yn/YNTV_1/m3u8:sd/1525199340000,1525202160000', 
		'http://store2.yntv.cn/channels/yn/YNTV_1/m3u8:sd',
		'http://hls3a.douyucdn.cn/live/703747rcfoQ8tRJg_550/playlist.m3u8?wsSecret=618bf0e176d823cb3138a02e728e3fa3&wsTime=1525092787&token=h5-douyu-0-703747-69e0a8199ae773815d6da72f408ea58a&did=AND-CHR|46-975195871525095469519', 
		'http://pullhls8928c963.live.126.net/live/618f4060864140b5b15f951ffc3eb470/playlist.m3u8',
		'http://live.hkstv.hk.lxdns.com/live/hks/playlist.m3u8',
		'http://vod.yntv.cn:80/vod/video_public/2018-05/29/3e571117d1b398e28ad0b66be0e2c019/playlist.m3u8'
	];

var rtmp = [
		'rtmp://v8928c963.live.126.net/live/618f4060864140b5b15f951ffc3eb470',
		'rtmp://live.hkstv.hk.lxdns.com/live/hks'
	];

// registerHandler('');

if (myBrowser()) {
	play(m3u8[7]);
}else{

// player.src({
// 	src:rtmp[1],
// 	type:'rtmp/flv',
// 	withCredentials: true
// })
// play(rtmp[1]);
	play('http://static.yntv.cn/video_pro//Contenttype/2018_05/29/o_1cem40nrj2avb0msp11bbb48d7.mp4', undefined, '90')
}


window.onWebViewJavascriptBridgeReady = function(bridge){
	callHandler = function (){
		if(window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.callHandler) window.WebViewJavascriptBridge.callHandler.apply(window.WebViewJavascriptBridge, arguments);
	}

	registerHandler = function (){
		var ar = arguments;
		bridge.registerHandler.apply(bridge, ar);
	}

	registerHandler('getBrightness', function (data, responseCallback) {
		if(downFlag) return;
		if (typeof data === 'object'){
			mrld = parseInt(data.num);
		} else {
			mrld = parseInt(data);
		}
		if(mrld.toString() == 'NaN') mrld = 0;
		setLD(mrld)
	});
	registerHandler('getVolume', function (data, responseCallback) {
		if(downFlag) return;
		if (typeof data === 'object'){
			mryl = parseInt(data.num);
		} else {
			mryl = parseInt(data);
		}
		if(mryl.toString() == 'NaN') mryl = 0;
		// showDialog(mryl);
		setYL(mryl)
	});
	registerHandler('unFull', function (data, responseCallback) {
		$('body').removeClass('full')
	});

	callHandler('getBrightness');
	callHandler('getVolume');

	get = function (u, callback, data){
		if(!data) data = {};
		data.userId = userId;
		$.ajax({
			type:'get',
			url:url+u,
			dataType:'jsonp',
			jsonpCallback:'onBack',
			data:data,
			success:function(data){
				if(data.loginStatus == false) callHandler('login');
				if(data.errorMessage == '非法请求') showDialog(data.errorMessage);
				callback(data)
			}
		})
	}

	getWSList = function (callback, data){
		get('/play/TVList.do', callback, data);
	}

	getPDList = function (callback, data){
		get('/play/channelList.do', callback, data);
	}

	getPDDetail = function (callback, data){
		get('/play/channelLive.do', callback, data);
	}

	getJMList = function (callback, data){
		get('/play/programList.do', callback, data);
	}



	var flag = true;
	getWSList(function (data) {
		if(flag){
			flag = false;
			wsListStore = data.list
			setVideoSelectPDBox(wsListStore);
		}
	})

}
