// ==UserScript==
// @name             跳过下载倒计时
// @description      跳过下载前的倒计时.支持:讯牛
// @version          0.1
// @match            *://www.xunniufile.com/*
// @match            *://www.xunniupan.co/*
// @grant            GM_registerMenuCommand
// @grant            unsafeWindow
// @namespace        https://github.com/glenhoooo/user-scripts
// @homepage         https://github.com/glenhoooo
// @author           Glen
// @icon             https://www.baidu.com/favicon.ico
// @license          MIT
// @updateURL        https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/skip-download-countdown.user.js
// @downloadURL      https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/skip-download-countdown.user.js
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["skip-download-countdown"] = factory();
	else
		root["skip-download-countdown"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
let __webpack_exports__ = {};

GM_registerMenuCommand("跳过倒计时", () => {
    setTimeout(() => {
        var highestTimeoutId = unsafeWindow.setTimeout(";");
        for (var i = 0; i < highestTimeoutId; i++) {
            unsafeWindow.clearTimeout(i);
        }
        unsafeWindow.down_file_link();
    }, 2000);
});

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});