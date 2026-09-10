// ==UserScript==
// @name             Hugging Face Mirror Links
// @description      Add navigation buttons to Hugging Face project pages for quick access to mirror sites
// @version          0.1
// @match            https://huggingface.co/*
// @grant            none
// @namespace        http://tampermonkey.net/
// @homepage         https://github.com/glenhoooo
// @author           glenhoooo
// @icon             https://www.tampermonkey.net/images/icon180.png
// @license          MIT
// @run-at           document-end
// @updateURL        https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/huggingface-mirror-links.user.js
// @downloadURL      https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/huggingface-mirror-links.user.js
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["huggingface-mirror-links"] = factory();
	else
		root["huggingface-mirror-links"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
let __webpack_exports__ = {};

function createButton(text, url) {
    const button = document.createElement("a");
    button.href = url;
    button.textContent = text;
    button.target = "_blank";
    button.style.marginLeft = "10px";
    button.style.padding = "5px 10px";
    button.style.backgroundColor = "#4CAF50";
    button.style.color = "white";
    button.style.textDecoration = "none";
    button.style.borderRadius = "4px";
    button.style.fontSize = "14px";
    return button;
}
function addNavigationButtons() {
    const currentPath = window.location.pathname;
    const hfMirrorUrl = `https://hf-mirror.com${currentPath}`;
    const modelscopeUrl = `https://www.modelscope.cn${currentPath}`;
    const h1Element = document.querySelector("h1");
    if (h1Element) {
        const hfMirrorButton = createButton("HF Mirror", hfMirrorUrl);
        const modelscopeButton = createButton("ModelScope", modelscopeUrl);
        h1Element.appendChild(hfMirrorButton);
        h1Element.appendChild(modelscopeButton);
    }
}
setTimeout(() => {
    addNavigationButtons();
}, 1000);

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});