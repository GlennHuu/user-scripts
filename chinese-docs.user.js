// ==UserScript==
// @name             查看中文文档
// @description      为常见的开发者官方文档增加中文文档跳转链接
// @version          0.1
// @match            *://rxjs.dev/*
// @namespace        https://github.com/glenhoooo/user-scripts
// @homepage         https://github.com/glenhoooo
// @author           Glen
// @icon             https://rxjs.tech/assets/images/favicons/favicon.ico
// @license          MIT
// @updateURL        https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/chinese-docs.user.js
// @downloadURL      https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/chinese-docs.user.js
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["chinese-docs"] = factory();
	else
		root["chinese-docs"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
let __webpack_exports__ = {};

function enhanceRxJS() {
    const $ul = document.querySelector("aio-shell > mat-toolbar > mat-toolbar-row:nth-child(2) > aio-top-menu > ul");
    const { pathname } = window.location;
    const btnSearch = `<li class="ng-star-inserted"><a class="nav-link" href="https://rxjs.tech${pathname}" title="中文版">中文版</a></li>`;
    $ul === null || $ul === void 0 ? void 0 : $ul.insertAdjacentHTML("beforeend", btnSearch);
}
enhanceRxJS();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});