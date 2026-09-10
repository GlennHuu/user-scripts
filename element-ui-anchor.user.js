// ==UserScript==
// @name             ElementUI website anchor
// @description      为 ElementUI 文档官网组件页增加内页跳转锚点
// @version          0.1
// @match            https://element.eleme.cn/*
// @namespace        https://github.com/glenhoooo/user-scripts
// @homepage         https://github.com/glenhoooo
// @author           Glen
// @icon             https://element.eleme.cn/favicon.ico
// @license          MIT
// @updateURL        https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/element-ui-anchor.user.js
// @downloadURL      https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/element-ui-anchor.user.js
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["element-ui-anchor"] = factory();
	else
		root["element-ui-anchor"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
let __webpack_exports__ = {};

let lastHash = "";
function callback(mutationsList, observer) {
    const hash = window.location.hash.split("#")[1];
    if (hash !== lastHash) {
        const $mainSection = document.querySelector("section.element-doc");
        if ($mainSection) {
            const h3s = $mainSection.querySelectorAll("h3");
            const html = [];
            Array.from(h3s).forEach(dom => {
                const id = dom.id;
                const text = dom.innerText;
                html.push(`<li><a href="#${hash}#${id}">${text}</a></li>`);
            });
            const menu = document.createElement("ul");
            menu.innerHTML = html.join("");
            menu.setAttribute("style", `position: fixed; list-style: none; top: 80px; right: 10px; padding: 10px; max-height: 300px; overflow: auto; background: #fff; border: 1px solid #ddd;`);
            $mainSection.appendChild(menu);
            lastHash = hash;
        }
    }
}
const observer = new MutationObserver(callback);
observer.observe(document.body, { subtree: true, childList: true });

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});