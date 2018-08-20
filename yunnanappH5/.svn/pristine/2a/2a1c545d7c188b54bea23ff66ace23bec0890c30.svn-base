var u = navigator.userAgent,
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端

function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        if (!isAndroid) {
            if (window.WVJBCallbacks) {
                return window.WVJBCallbacks.push(callback);
            }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'https://__bridge_loaded__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function () {
                document.documentElement.removeChild(WVJBIframe)
            }, 0)
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function (event) {
                if(window.onWebViewJavascriptBridgeReady) window.onWebViewJavascriptBridgeReady(window.__bridge = WebViewJavascriptBridge);
                callback(WebViewJavascriptBridge)
            }, false)
        }
    }
}

function getBridge(callback){
    if(window.__bridge) return callback(window.__bridge);
}

connectWebViewJavascriptBridge(function (bridge) {
    if (isAndroid == true) {
        bridge.init(function (message, responseCallback) {
            responseCallback({'Javascript Responds': 'Wee!'})
        })
    }
});


// //  端发webview
// bridge.registerHandler('blabla', function (data, responseCallback) {
// });

//  webview 发端

// window.WebViewJavascriptBridge.callHandler('closeWebView', {blabla: 'blabla'}, function (response) {
//     console.log('JS got response', response)
// });