// ==UserScript==
// @name             PT助手
// @description      PT站助手:后台签到,复制链接
// @version          0.2
// @match            *://*.m-team.cc/*
// @match            *://pterclub.com/*
// @match            *://ourbits.club/*
// @match            *://hdhome.org/*
// @match            *://lemonhd.org/*
// @match            *://pthome.net/*
// @match            *://www.beitai.pt/*
// @grant            window.onurlchange
// @grant            GM_registerMenuCommand
// @grant            GM_xmlhttpRequest
// @grant            GM_setClipboard
// @grant            GM_setValue
// @grant            GM_getValue
// @grant            GM_notification
// @namespace        https://github.com/glenhoooo/user-scripts
// @homepage         https://github.com/glenhoooo
// @author           Glen
// @icon             https://i.loli.net/2020/02/11/sluFx1NIW9zCLS6.png
// @license          MIT
// @require          https://cdn.staticfile.org/jquery/1.12.2/jquery.min.js
// @updateURL        https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/pt-site-helper.user.js
// @downloadURL      https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/pt-site-helper.user.js
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pt-site-helper"] = factory();
	else
		root["pt-site-helper"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
let __webpack_exports__ = {};

;// ./src/utils/url.utils.ts
class UrlUtils {
    constructor() {
        this.location = {};
        this.host = "";
        this.origin = "";
        this.location = window.location;
        this.host = this.location.host;
        this.origin = this.location.origin;
    }
    isDomain(domain) {
        return this.host.endsWith(domain);
    }
    getQueryFromHash(key) {
        const hash = window.location.hash;
        if (!hash) {
            return null;
        }
        const search = hash.substring(hash.indexOf("?"));
        const urlSearchParams = new URLSearchParams(search);
        return urlSearchParams.get(key);
    }
}
/* harmony default export */ const url_utils = (new UrlUtils());

;// ./src/utils/request.utils.ts
class RequestUtils {
    get(url, callback) {
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            headers: {
                "User-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.41",
            },
            onload: function (response) {
                callback(response);
            },
        });
    }
    postByForm(url, data, callback) {
        GM_xmlhttpRequest({
            method: "POST",
            url: url,
            data: new URLSearchParams(data).toString(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            onload: function (response) {
                callback(response);
            },
        });
    }
    postByJson(url, data, callback) {
        GM_xmlhttpRequest({
            method: "POST",
            url: url,
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            onload: function (response) {
                callback(response);
            },
        });
    }
}
/* harmony default export */ const request_utils = (new RequestUtils());

;// ./src/scripts/pt-site-helper/index.ts


const host = url_utils.host;
const origin = url_utils.origin;
const domBody = document.querySelector("body");
const isListPage = domBody.innerText.indexOf("下一页") > -1 || domBody.innerText.indexOf("下一頁") > -1;
const isDetailPage = url_utils.location.pathname.indexOf("detail") > -1;
const isSite_pter = host.indexOf("pter") > -1;
function regMenus() {
    function reloadTip() {
        GM_notification({
            text: "请刷新页面",
            title: "提示",
            onclick: () => window.location.reload(),
        });
    }
    GM_registerMenuCommand("启用高亮Free", () => {
        GM_setValue("highlightFreePosts", 1);
        highlightFreePosts();
    });
    GM_registerMenuCommand("禁用高亮Free", () => {
        GM_setValue("highlightFreePosts", 0);
        reloadTip();
    });
    GM_registerMenuCommand("启用缩略图放大", () => {
        GM_setValue("enlargeThumbnail", 1);
        enlargeThumbnail();
    });
    GM_registerMenuCommand("禁用缩略图放大", () => {
        GM_setValue("enlargeThumbnail", 0);
        reloadTip();
    });
    GM_registerMenuCommand("启用新标签页打开", () => {
        GM_setValue("openInNewTab", 1);
        openInNewTab();
    });
    GM_registerMenuCommand("禁用新标签页打开", () => {
        GM_setValue("openInNewTab", 0);
        reloadTip();
    });
}
function checkIn() {
    var $qiandao1 = $("#nav_block a.faqlink");
    var $qiandao2 = $('#outer a[href="index.php?action=addbonus"]');
    var $qiandao3 = $("#sign_in a");
    if ($qiandao1 === null || $qiandao1 === void 0 ? void 0 : $qiandao1.length) {
        request_utils.get($qiandao1.attr("href"), () => {
            $qiandao1.remove();
        });
    }
    if ($qiandao2) {
        request_utils.get($qiandao2.attr("href"), () => {
            $qiandao2.remove();
        });
    }
    if ($qiandao3) {
        $qiandao3.click();
    }
}
function highlightFreePosts() {
    const enable = GM_getValue("highlightFreePosts");
    console.log("highlightFreePosts", enable);
    if (enable) {
        var $free = $(".pro_free");
        var $free2 = $(".pro_free2up");
        var background = "background: rgb(255, 222, 144, 1) !important";
        $.each($free, (_, item) => {
            if (isSite_pter) {
                $(item).parent().parent().attr("style", background);
            }
            else {
                $(item).parent().attr("style", background);
            }
        });
        $.each($free2, (_, item) => {
            $(item).parent().attr("style", background);
        });
    }
}
function easyCopyLink() {
    var _a, _b, _c, _d;
    function copy1() {
        var $link = $("a:contains('[IPv4+https]')");
        var ahref = $link.attr("href");
        var urlTxt = ahref.indexOf("http") === 0 ? ahref : origin + ahref;
        var $td = $link.parent().parent();
        $td.prepend([
            "<span>IPv4+https：</span>",
            '<input class="my-downloadurl" value="' + urlTxt + '" style="width:700px">',
            "<br><br>",
        ].join(""));
        $link = $("a:contains('[IPv4]')");
        ahref = $link.attr("href");
        urlTxt = origin + ahref;
        $td = $link.parent().parent();
        $td.prepend([
            "<span>IPv4：</span>",
            '<input class="my-downloadurl" value="' + urlTxt + '" style="width:700px">',
            "<br><br>",
        ].join(""));
        $("body").on("click", ".my-downloadurl", function () {
            const thisAny = this;
            const $ipt = $(thisAny);
            const ipt = $ipt[0];
            ipt.select();
            GM_setClipboard($ipt.val(), "text");
            GM_notification({
                text: "链接已复制",
                title: "提示",
                timeout: 1500,
            });
        });
    }
    function copy2() {
        var $link = $("a:contains('[下载地址]')");
        var ahref = $link.attr("href");
        var urlTxt = ahref.indexOf("http") === 0 ? ahref : origin + ahref;
        var $td = $link.parent();
        $td.prepend(['<input id="downloadurl" value="' + urlTxt + '" style="width:700px">', "<br><br>"].join(""));
        $("body").on("click", "#downloadurl", function () {
            const thisAny = this;
            const $ipt = $(thisAny);
            const ipt = $ipt[0];
            ipt.select();
            GM_setClipboard($ipt.val(), "text");
            GM_notification({
                text: "链接已复制",
                title: "提示",
                timeout: 1500,
            });
        });
    }
    function copy3() {
        var $check = $("td:contains('种子链接')");
        var $td = $check.next();
        var ahref = $td.find("a").attr("href");
        var urlTxt = ahref.indexOf("http") === 0 ? ahref : origin + "/" + ahref;
        $td.prepend(['<input id="downloadurl" value="' + urlTxt + '" style="width:700px">', "<br><br>"].join(""));
        $("body").on("click", "#downloadurl", function () {
            const thisAny = this;
            const $ipt = $(thisAny);
            const ipt = $ipt[0];
            ipt.select();
            GM_setClipboard($ipt.val(), "text");
            GM_notification({
                text: "链接已复制",
                title: "提示",
                timeout: 1500,
            });
        });
    }
    function copy4() {
        var $link = $("a:contains('[HTTP]')");
        var ahref = $link.attr("href");
        var urlTxt = ahref.indexOf("http") === 0 ? ahref : origin + ahref;
        var $td = $link.parent();
        $td.prepend([
            "<span>HTTP：</span>",
            '<input class="my-downloadurl" value="' + urlTxt + '" style="width:700px">',
            "<br><br>",
        ].join(""));
        $link = $("a:contains('[HTTPS]')");
        ahref = $link.attr("href");
        urlTxt = origin + ahref;
        $td = $link.parent();
        $td.prepend([
            "<span>HTTPS：</span>",
            '<input class="my-downloadurl" value="' + urlTxt + '" style="width:700px">',
            "<br><br>",
        ].join(""));
        $("body").on("click", ".my-downloadurl", function () {
            const thisAny = this;
            const $ipt = $(thisAny);
            const ipt = $ipt[0];
            ipt.select();
            GM_setClipboard($ipt.val(), "text");
            GM_notification({
                text: "链接已复制",
                title: "提示",
                timeout: 1500,
            });
        });
    }
    if ((_a = $("a:contains('[IPv4+https]')")) === null || _a === void 0 ? void 0 : _a.length) {
        copy1();
        return;
    }
    if ((_b = $("a:contains('[HTTP]')")) === null || _b === void 0 ? void 0 : _b.length) {
        copy4();
        return;
    }
    if ((_c = $("a:contains('[下载地址]')")) === null || _c === void 0 ? void 0 : _c.length) {
        copy2();
        return;
    }
    if ((_d = $("td:contains('种子链接')")) === null || _d === void 0 ? void 0 : _d.length) {
        copy3();
        return;
    }
}
function enlargeThumbnail() {
    const enable = GM_getValue("enlargeThumbnail");
    console.log("enlargeThumbnail", enable);
    if (enable) {
        function setSize(size) {
            var _a;
            (_a = document.querySelector(".ant-spin-container table thead th:nth-child(2)")) === null || _a === void 0 ? void 0 : _a.setAttribute("style", `width: 500px`);
            $(".ant-image .torrent-list__thumbnail").css({
                width: "auto",
                height: size,
            });
        }
        setSize("280px");
    }
}
function openInNewTab() {
    const enable = GM_getValue("openInNewTab");
    console.log("openInNewTab:", enable);
    if (enable) {
        $("table.torrentname a[href*='detail']").attr("target", "_blank");
    }
}
regMenus();
setTimeout(() => {
    if (isListPage) {
        highlightFreePosts();
        enlargeThumbnail();
        openInNewTab();
    }
    if (isDetailPage) {
        easyCopyLink();
    }
    checkIn();
}, 1000);
if (window.onurlchange === null) {
    window.addEventListener("urlchange", () => {
    });
}

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});