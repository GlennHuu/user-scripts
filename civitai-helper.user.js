// ==UserScript==
// @name             Civitai 小助手
// @description      转载自 maomao1996 的脚本；提升 Civitai 使用体验的小助手；自动移除分级遮罩直接展示图片
// @version          0.1
// @match            *://civitai.com/*
// @namespace        https://github.com/glenhoooo/user-scripts
// @homepage         https://greasyfork.org/zh-CN/scripts/494949-civitai-%E5%B0%8F%E5%8A%A9%E6%89%8B
// @author           maomao1996
// @icon             https://civitai.com/favicon-blue.ico
// @license          MIT
// @updateURL        https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/civitai-helper.user.js
// @downloadURL      https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/civitai-helper.user.js
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["civitai-helper"] = factory();
	else
		root["civitai-helper"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
let __webpack_exports__ = {};

(() => {
    "use strict";
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                const node = entry.target;
                node.click();
                observer.unobserve(node);
            }
        }
    });
    const init = () => {
        const buttons = document.querySelectorAll("button.mantine-UnstyledButton-root.mantine-Button-root");
        buttons.forEach(node => {
            if (node.innerText === "Show") {
                observer.observe(node);
            }
        });
    };
    const main = document.querySelector("#main");
    if (main) {
        new MutationObserver(() => init()).observe(main, {
            childList: true,
            subtree: true,
        });
    }
    init();
})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});