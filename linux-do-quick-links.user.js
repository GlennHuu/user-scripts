// ==UserScript==
// @name             Linux.do 快捷链接新标签打开
// @description      为 Linux.do 增加常用的快捷链接，新标签打开帖子
// @version          0.1
// @match            *://linux.do/*
// @grant            window.onurlchange
// @grant            unsafeWindow
// @namespace        https://github.com/glenhoooo/user-scripts
// @homepage         https://github.com/glenhoooo
// @author           Glen
// @icon             https://linux.do/uploads/default/optimized/3X/9/d/9dd49731091ce8656e94433a26a3ef36062b3994_2_32x32.png
// @license          MIT
// @run-at           document-end
// @updateURL        https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/linux-do-quick-links.user.js
// @downloadURL      https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/linux-do-quick-links.user.js
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["linux-do-quick-links"] = factory();
	else
		root["linux-do-quick-links"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
let __webpack_exports__ = {};

function addHeaderButtons() {
    const $wrap = document.querySelector("ul.icons.d-header-icons");
    if ($wrap) {
        console.log("$wrap found");
        const $li = document.createElement("li");
        $li.className = "search-dropdown custom-header-icon-link";
        const $a = document.createElement("a");
        $a.className = "btn no-text btn-icon icon btn-flat";
        $a.href = "https://linux.do/u/gallen/activity/likes-given";
        $a.title = "我的点赞";
        $a.setAttribute("type", "button");
        jQuery($a).append('<svg class="fa d-icon d-icon-heart svg-icon svg-string" xmlns="http://www.w3.org/2000/svg"><use href="#heart"></use></svg>');
        $li.appendChild($a);
        jQuery($wrap).prepend($li);
    }
    else {
        console.error("$wrap not found");
    }
}
const postLinkSelector = "tr.topic-list-item a.title";
const containerSelector = ".topic-list-body";
function makeOpenInNewTab() {
    console.log("makeOpenInNewTab");
    function modifyLinks() {
        var _a;
        const postLinks = (_a = document
            .querySelector(containerSelector)) === null || _a === void 0 ? void 0 : _a.querySelectorAll(postLinkSelector);
        postLinks.forEach(link => {
            var _a;
            if (link.href && (link.href.includes("/t/") || link.href.includes("/d/"))) {
                if (!link.hasAttribute("target") || link.getAttribute("target") !== "_blank") {
                    link.setAttribute("target", "_blank");
                    if (!link.hasAttribute("rel") || !((_a = link.getAttribute("rel")) === null || _a === void 0 ? void 0 : _a.includes("noopener"))) {
                        const currentRel = link.getAttribute("rel") || "";
                        link.setAttribute("rel", currentRel ? currentRel + " noopener" : "noopener");
                    }
                    link.addEventListener("click", function (e) {
                        e.stopPropagation();
                    }, true);
                }
            }
        });
    }
    modifyLinks();
}
function observeNewPosts() {
    const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === "childList") {
                const newPosts = mutation.addedNodes;
                newPosts.forEach(post => {
                    if (post.nodeType === Node.ELEMENT_NODE) {
                        const $post = post;
                        if ($post.matches(postLinkSelector)) {
                            makeOpenInNewTab();
                        }
                    }
                });
            }
        }
    });
    observer.observe(document.querySelector(containerSelector), {
        childList: true,
        subtree: true,
    });
}
window.addEventListener("load", () => {
    addHeaderButtons();
    makeOpenInNewTab();
    observeNewPosts();
});
document.addEventListener("DOMContentLoaded", makeOpenInNewTab);

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});