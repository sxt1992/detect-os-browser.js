# detect-os-browser.js

> get info from userAgent

## Installation
```sh
npm install --save detect-os-browser.js
```

## Usage
- webpack
```js
import {
    isPC,
    isAndroid,
    isIos,
    os,
    browser,
    browserVersion,
    appInfo,
    detectOS,
    getBrowserInfo
} from 'detect-os-browser.js';
```
- browser
```html
<script type="text/javascript" src="lib/detectOsBrowser.min.js"></script>
<script type="text/javascript">
    /*
    {
        isPC,
        isAndroid,
        isIos,
        os,
        browser,
        browserVersion,
        appInfo,
        detectOS,
        getBrowserInfo
    }
    */
    console.log(window.detectOsBrowser);
</script>
```