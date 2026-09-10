// ==UserScript==
// @name             e.juejin.cn快速切换GitHub语言
// @description      为e.juejin.cn增加常用的语言切换按钮
// @version          0.1
// @match            *://e.juejin.cn/*
// @grant            window.onurlchange
// @grant            unsafeWindow
// @namespace        https://github.com/glenhoooo/user-scripts
// @homepage         https://github.com/glenhoooo
// @author           Glen
// @icon             https://lf-cdn-tos.bytescm.com/obj/static/xitu_extension/static/favicons/favicon.ico
// @license          MIT
// @run-at           document-end
// @updateURL        https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/juejin-github-switch.user.js
// @downloadURL      https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/juejin-github-switch.user.js
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["juejin-github-switch"] = factory();
	else
		root["juejin-github-switch"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
let __webpack_exports__ = {};

function addButtons() {
    const $wrap = document.querySelector(".github-source .source-navbar");
    const $category = document.querySelector(".github-source .category-selector");
    const className = "quick-switch-lang";
    if ($wrap && $category) {
        ["TypeScript", "Python", "Java", "Go"].forEach(lang => {
            const b = document.createElement("div");
            b.className = className;
            b.setAttribute("style", "margin-right:20px;cursor:pointer");
            b.innerText = lang;
            $wrap.insertBefore(b, $category);
        });
        document.querySelectorAll("." + className).forEach(el => {
            el.addEventListener("click", e => {
                switchLang(e.target.innerText);
            });
        });
    }
    function switchLang(lang) {
        const $dropdown = document.querySelector("#app > div.layout.source-layout.utility > div.main-area > div.source.github-source.other-source.github > div.source-navbar > div.lang-selector > div.curr");
        $dropdown === null || $dropdown === void 0 ? void 0 : $dropdown.click();
        Array.from(document.querySelectorAll(".lang-list li")).some((li) => {
            if (li.innerText.toLowerCase() === lang.toLowerCase()) {
                li.click();
                return true;
            }
        });
    }
}
setTimeout(() => {
    addButtons();
}, 100);

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});