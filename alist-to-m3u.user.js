// ==UserScript==
// @name             Alist 生成 M3U
// @description      在 Alist 文件列表页生成 M3U 播放列表，可在支持的播放器（如 Kodi）中使用
// @version          0.1
// @match            *://*/*
// @namespace        https://github.com/glenhoooo/user-scripts
// @homepage         https://github.com/glenhoooo
// @author           Glen
// @icon             https://alist.nn.ci/logo.svg
// @license          MIT
// @require          https://cdn.bootcdn.net/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js
// @updateURL        https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/alist-to-m3u.user.js
// @downloadURL      https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/alist-to-m3u.user.js
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["alist-to-m3u"] = factory();
	else
		root["alist-to-m3u"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
let __webpack_exports__ = {};

function checkGenerator() {
    var _a;
    const generator = ((_a = document.querySelector('meta[name="generator"]')) === null || _a === void 0 ? void 0 : _a.getAttribute("content")) || "";
    return generator.toLowerCase().indexOf("alist") > -1;
}
function generatorM3UContent(playList) {
    const xml = ["#EXTM3U"];
    if (playList === null || playList === void 0 ? void 0 : playList.length) {
        playList.forEach(obj => {
            xml.push(`#EXTINF:-1,${obj.name}`);
            xml.push(obj.href);
        });
    }
    return xml.join("\n");
}
function insertDownloadButton() {
    const $body = document.querySelector("body");
    const button = document.createElement("button");
    button.id = "downloadM3U";
    button.classList.add("hope-button");
    button.innerText = "生成M3U";
    button.setAttribute("style", "cursor:pointer;position:fixed;top:10px;left:10px;font-size:14px;padding: 4px 8px;border: 1px solid #96c7f2;background:#fff;");
    $body === null || $body === void 0 ? void 0 : $body.appendChild(button);
    button.addEventListener("click", onClickM3UDownloadButton);
}
function onClickM3UDownloadButton() {
    const list = document.querySelectorAll(".list a.list-item");
    const output = [];
    list.forEach(link => {
        var _a;
        let href = link.href;
        const basePath = ((_a = window.ALIST) === null || _a === void 0 ? void 0 : _a.base_path) || "/";
        const origin = window.location.origin;
        const alistRootUri = origin + basePath;
        href = href.replace(alistRootUri, alistRootUri + "d/");
        const nameDom = link.querySelector(".name");
        const name = nameDom ? nameDom.innerText : "";
        output.push({ href, name });
    });
    const xml = generatorM3UContent(output);
    const blob = new Blob([xml], { type: "text/plain;charset=utf-8" });
    window.saveAs(blob, "playlist.m3u");
}
let checkList = () => {
    const list = document.querySelectorAll(".list a.list-item");
    if (list.length) {
        insertDownloadButton();
        checkList = () => null;
    }
};
function start() {
    if (!checkGenerator()) {
        return false;
    }
    const $root = document.querySelector("#root");
    if ($root) {
        const observer = new MutationObserver(checkList);
        observer.observe($root, { childList: true, subtree: true });
    }
}
start();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});