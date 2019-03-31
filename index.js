/* eslint-disable */
function detectOS(_navigator) {
    try {
        typeof _navigator !== 'object' && (_navigator = navigator);
    } catch(e) {
        _navigator = {};
    }

    var platform = _navigator.platform + '';
    var UA = _navigator.userAgent + '';

    var isMac = /Mac68K|MacPPC|Macintosh|MacIntel/.test(platform);

    if (isMac) {
        return 'Mac';
    }
    if (/iPhone/.test(platform)) {
        return 'iPhone';
    }
    if (/iPad/.test(platform)) {
        return 'iPad';
    }

    var isWin = /Win32|Win64|Windows/.test(platform);
    var isUnix = /^X11$/i.test(platform) && !isWin && !isMac;

    if (isUnix) {
        return 'Unix';
    }

    var isLinux = platform.indexOf('Linux') > -1;

    if (isLinux) {
        if (UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1) {
            return 'Android';
        } else {
            return 'Linux';
        }
    }
    if (isWin) {
        var winType = {
            Win2000: ['Windows NT 5.0', 'Windows 2000'],
            WinXP: ['Windows NT 5.1', 'Windows XP'],
            Win2003: ['Windows NT 5.2', 'Windows 2003'],
            WinVista: ['Windows NT 6.0', 'Windows Vista'],
            Win7: ['Windows NT 6.1', 'Windows 7'],
            Win8: ['Windows NT 6.2', 'Windows NT 6.3', 'Windows 8'],
            Win10: ['Windows NT 6.4', 'Windows NT 10.0', 'Windows 10.0']
        };
        for(var prop in winType) {
            for(var i = 0; i < winType[prop].length; i++) {
                if (UA.indexOf(winType[prop][i]) > -1) {
                    return prop;
                }
            }
        }
    }
    return 'other';
}

function getBrowserInfo(UA) {
    try {
        !UA && (UA = navigator.userAgent);
    } catch(e) {
        UA = '';
    }
    UA = ' ' + UA + ' ';
    // IE11
    if (/[^a-z]trident[^a-z].*?[^a-z]rv[^a-z0-9]11\D/i.test(UA)) {
        return {browser: 'IE', version: '11'};
    }
    // IE6~10
    if (/msie|trident/i.test(UA)) {
        var ieMatch = /msie\s+(\d+)\D/i.exec(UA);
        return {browser: 'IE', version: (ieMatch && ieMatch[1]) || '11'};
    }
    // Edge
    var edgeVerMatch = /[^a-z]Edge[^a-z0-9]+([0-9\.]+)[^0-9\.]/i.exec(UA);
    if (edgeVerMatch) {
        return {browser: 'Edge', version: edgeVerMatch[1]};
    }
    // Chrome
    var chromeVerMatch = /[^a-z](?:Chrome|CriOS)[^a-z0-9]+([0-9\.]+)[^0-9\.]/i.exec(UA);
    if (chromeVerMatch) {
        return {browser: 'Chrome', version: chromeVerMatch[1]};
    }
    // Firefox
    var firefoxVerMatch = /[^a-z]Firefox[^a-z0-9]+([0-9\.]+)[^0-9\.]/i.exec(UA);
    if (firefoxVerMatch) {
        return {browser: 'Firefox', version: firefoxVerMatch[1]};
    }
    // Opera
    var operaVerMatch = /[^a-z](?:OPR|Opera)[^a-z0-9]+([0-9\.]+)[^0-9\.]/i.exec(UA);
    if (operaVerMatch) {
        return {browser: 'Opera', version: operaVerMatch[1]};
    }
    // Safari
    var safariVerMatch = /[^a-z]Safari[^a-z]/i.test(UA) && /[^a-z]Version[^a-z0-9]+([0-9\.]+)[^0-9\.]/i.exec(UA);
    if (safariVerMatch) {
        return {browser: 'Safari', version: safariVerMatch[1]};
    }
    // 其它Webkit内核,国产浏览器
    var webKitVerMatch = /WebKit[^a-z0-9]+([0-9\.]+)[^0-9\.]/i.exec(UA);
    if (webKitVerMatch) {
        return {browser: 'WebKit', version: webKitVerMatch[1]};
    }
    return {browser: 'other', version: '0.0.0'};
}

var UA = '';
try {
    UA = ' ' + navigator.userAgent + ' ';
} catch(e) {}

// 微信
var wechatVerMatch = /[^a-z]MicroMessenger[^a-z0-9]+([0-9\.]+)[^0-9\.]/i.exec(UA);
// QQ
var qqVerMatch = !/[^a-z]TIM[^a-z]/i.test(UA) && /[^a-z]QQ[^a-z0-9]+([0-9\.]+)[^0-9\.]/i.exec(UA);
// TIM
var timVerMatch = /[^a-z]QQ[^a-z]/i.test(UA) && /[^a-z]TIM[^a-z0-9]+([0-9\.]+)[^0-9\.]/i.exec(UA);
// 支付宝
var alipayVerMatch = /[^a-z](?:Alipay|AlipayClient)[^a-z0-9]+([0-9\.]+)[^0-9\.]/i.exec(UA);

var browser = getBrowserInfo();

module.exports = {
    isPC: !/mobile|phone|ios|android|pad|pod|symbian|Windows\sPhone|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS/i.test(UA),
    isAndroid: UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1,
    isIos: /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(UA),
    os: detectOS(),
    browser: browser.browser,
    browserVersion: browser.version,
    appInfo: {
        wechat: wechatVerMatch && wechatVerMatch[1],
        qq: qqVerMatch && qqVerMatch[1],
        tim: timVerMatch && timVerMatch[1],
        alipay: alipayVerMatch && alipayVerMatch[1]
    },
    detectOS: detectOS,
    getBrowserInfo: getBrowserInfo
};
/* eslint-enable */