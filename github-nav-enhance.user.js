// ==UserScript==
// @name             Github 导航栏增强
// @description      为新版 Github 导航栏增加常用链接菜单
// @version          0.2
// @match            *://github.com/*
// @grant            window.onurlchange
// @grant            unsafeWindow
// @namespace        https://github.com/glenhoooo/user-scripts
// @homepage         https://github.com/glenhoooo
// @author           Glen
// @icon             data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACEUExURUxpcRgWFhsYGBgWFhcWFh8WFhoYGBgWFiUlJRcVFRkWFhgVFRgWFhgVFRsWFhgWFigeHhkWFv////////////r6+h4eHv///xcVFfLx8SMhIUNCQpSTk/r6+jY0NCknJ97e3ru7u+fn51BOTsPCwqGgoISDg6empmpoaK2srNDQ0FhXV3eXcCcAAAAXdFJOUwCBIZXMGP70BuRH2Ze/LpIMUunHkpQR34sfygAAAVpJREFUOMt1U+magjAMDAVb5BDU3W25b9T1/d9vaYpQKDs/rF9nSNJkArDA9ezQZ8wPbc8FE6eAiQUsOO1o19JolFibKCdHGHC0IJezOMD5snx/yE+KOYYr42fPSufSZyazqDoseTPw4lGJNOu6LBXVUPBG3lqYAOv/5ZwnNUfUifzBt8gkgfgINmjxOpgqUA147QWNaocLniqq3QsSVbQHNp45N/BAwoYQz9oUJEiE4GMGfoBSMj5gjeWRIMMqleD/CAzUHFqTLyjOA5zjNnwa4UCEZ2YK3khEcBXHjVBtEFeIZ6+NxYbPqWp1DLKV42t6Ujn2ydyiPi9nX0TTNAkVVZ/gozsl6FbrktkwaVvL2TRK0C8Ca7Hck7f5OBT6FFbLATkL2ugV0tm0RLM9fedDvhWstl8Wp9AFDjFX7yOY/lJrv8AkYuz7fuP8dv9izCYH+x3/LBnj9fYPBTpJDNzX+7cAAAAASUVORK5CYII=
// @license          MIT
// @run-at           document-end
// @updateURL        https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/github-nav-enhance.user.js
// @downloadURL      https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/github-nav-enhance.user.js
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["github-nav-enhance"] = factory();
	else
		root["github-nav-enhance"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
let __webpack_exports__ = {};

function modifyGithub() {
    const userName = document.querySelector('meta[name="user-login"]').getAttribute("content");
    const nav = document.querySelector("nav ul[role='list']");
    if (nav) {
        if (nav.getAttribute("data-enhanced") === "1")
            return;
        const menus = [];
        menus.push(`
    <li>
      <a href="https://github.com/${userName}?tab=repositories" data-view-component="true" class="AppHeader-context-item">
        <span class="AppHeader-context-item-label">
          Repositories
        </span>
      </a>
    </li>
    `);
        menus.push(`
    <li>
      <a href="https://github.com/${userName}?tab=stars" data-view-component="true" class="AppHeader-context-item">
        <span class="AppHeader-context-item-label">
          Stars
        </span>
      </a>
    </li>
    `);
        menus.push(`
    <li>
      <a href="https://github.com/settings/organizations" data-view-component="true" class="AppHeader-context-item">
        <span class="AppHeader-context-item-label">
          Organizations
        </span>
      </a>
    </li>
    `);
        menus.push(`
    <li>
      <a href="https://gist.github.com/mine" data-view-component="true" class="AppHeader-context-item">
        <span class="AppHeader-context-item-label">
          Gists
        </span>
      </a>
    </li>
    `);
        menus.push(`
    <li>
      <a href="javascript:void(0)" data-view-component="true" class="AppHeader-context-item">
        <span class="AppHeader-context-item-label"></span>
      </a>
    </li>
    `);
        nav.innerHTML += menus.join("");
        nav.setAttribute("data-enhanced", "1");
    }
}
if (window.onurlchange === null) {
    window.addEventListener("urlchange", modifyGithub);
}

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});