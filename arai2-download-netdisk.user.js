// ==UserScript==
// @name             Aria2下载网盘链接
// @description      开通VIP后Aria2下载网盘.支持:讯牛
// @version          0.1
// @match            *://www.xunniufile.com/file*
// @match            *://www.xunniupan.co/file*
// @grant            GM_getResourceText
// @grant            GM_addStyle
// @namespace        https://github.com/glenhoooo/user-scripts
// @homepage         https://github.com/glenhoooo
// @author           Glen
// @icon             https://www.baidu.com/favicon.ico
// @license          MIT
// @require          https://cdn.staticfile.org/jquery/1.12.2/jquery.min.js
// @require          https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js
// @resource         IMPORTED_CSS https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css
// @updateURL        https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/arai2-download-netdisk.user.js
// @downloadURL      https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/arai2-download-netdisk.user.js
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["arai2-download-netdisk"] = factory();
	else
		root["arai2-download-netdisk"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
let __webpack_exports__ = {};

;// ./src/utils/aria2.utils.ts
class Aria2Utils {
    downloadByMotrix(url, referer) {
        const data = {
            jsonrpc: "2.0",
            method: "aria2.addUri",
            id: Number(Date.now().toString().slice(-4)),
            params: [
                [url],
                {
                    split: "64",
                    "max-connection-per-server": "5",
                    "seed-ratio": "0",
                    referer: referer || "",
                },
            ],
        };
        return fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }
}
/* harmony default export */ const aria2_utils = (new Aria2Utils());

;// ./src/scripts/arai2-download-netdisk/index.ts

const my_css = GM_getResourceText("IMPORTED_CSS");
GM_addStyle(my_css);
const d = `<div class="aaa-down d-1" style="padding: 10px 0;cursor: pointer">下载1</div><div class="aaa-down d-2" style="padding: 10px 0;cursor: pointer">下载2</div><div class="aaa-down d-3" style="padding: 10px 0;cursor: pointer">下载3</div><div class="aaa-down d-4" style="padding: 10px 0;cursor: pointer">下载4</div><div class="aaa-down d-5" style="padding: 10px 0;cursor: pointer">下载5</div>`;
const $section = jQuery(".page-header .pull-right");
$section.append(d);
$section.on("click", ".aaa-down", function () {
    const thisAny = this;
    let t = jQuery(thisAny).attr("class").replace("aaa-down d-", "vip_btn");
    if (t === "vip_btn1")
        t = "vip_btn";
    const url = jQuery("#" + t).attr("href");
    console.log("get url:", url);
    const referer = window.location.href;
    if (url) {
        aria2_utils
            .downloadByMotrix(url, referer)
            .then(res => res.json())
            .then(data => {
            console.log(data);
            $("任务添加成功").modal();
        });
    }
});

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});