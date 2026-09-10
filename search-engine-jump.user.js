// ==UserScript==
// @name             搜索引擎相互跳转
// @description      谷歌、百度相互跳转
// @version          0.2
// @match            *://www.google.com/search*
// @match            *://www.baidu.com/s*
// @namespace        https://github.com/glenhoooo/user-scripts
// @homepage         https://github.com/glenhoooo
// @author           Glen
// @icon             data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAC+lBMVEUAAAA/itlChfRChfQ0qFPrQjU0qVLqQjTvQDLoNTo0qVI0qFM0qFMzqlL9vgTrQjXqRDIzqlI0qVLrRDU8k7v4vAVBh/H7vAXqQjT7vQU0qFM3plTsQDTtPi/rQjQrp1bsRTTsQjDrQTQ/j8YyqlLsRDMyqlL8wAQyp1/wQTTtSjkzoqv8vwMwsEgQpWHnKT/9yAH+zgDqQzX7vgX8vAVBiO7qRDU1qVLrQjT7uwXqQzb9vgJAieMxrk5ChvJAit5ChP1ChvT8wgPqQzVBh+o0qVP8vATrQzU9l8g4lcv9wAJBjtH8ugT8uQQzqlLsQzQzqkz8uATtQzXrQzT8vQTsRjT+vQI3mbDqQTc0qFP8vAMvqqsxqVPwOzP8wAUru0TtRDItp1ZYq0WMsTHAthzouwudsirOuBfrTTHtVS76swnwayXxdCH0jBf2lRXqQjVGfPpCh/M0qFP1oBRBh+7oSDrrQzcvsiw3oHvsSToxrU49mWJBiOg5l9hBiOfnPS0zrU/qQjM8kt06pFlAieBChfTqQTQ+jt37vAXrPzA1qVLqQzQ2oNMwpVdBid8+j9P7vAU/itlBhu7nTz4zrFApukI3p1TuNCkvrFDsRTb7vQVAieE/m1/qLTL9wgPpQzU8kNhAjNLxXFP8uAQ0qFT8vQTsRjY0qFM9kcj8tgTsQjRHhM0xrE88mqz3OyH3PS0+kML9yQM1p1RDg//qLTkxplUdo19ChfQ/itnqPzI2nqvqQzU0qFNChfT7vAVDg/80p1TpRDXpQzVEgP83qVH7uQZFff9ChvLqQTVChPlDg/k0qVE0p1Y1pVXrRTT/wABDgf9ChfbpRzfpQzT/2ABDg/3/vQFHe/8Go2Uepls4oFoyrT3nLj0xrzYxsC/8vwP/wQAMpGIzqknmJ0DpOzjmRTT8vAVKdP9Aif5Chu1AiuA+jsw9krs7l6c5m5I5nYM2pGo9mWEPpWA2o1gpp1ctp1ZKqkszq0VorT98rjj4qwz8xgL+0gD+0QCYNYOLAAAAu3RSTlMAnqk5HNPMpgT++uvl1ZCPjIR+bDH79vPy1cKlnpiJdXNkYFJNLiwkIRoWCgkG/v7+/vfs5OLf3drQz727t6+toJ6XlJGQin58d3RxXFZQUElFREA4Mi8jIRcXFhMQEA0J/v7+/v79/fz8/Pv7+/v69fX18O3s6urn5uLb09HKycfFv7q5uLi1s7KxrqurqqamoZyXkpCPjo2Dg4KAfn56eXl1bmhoZGBbVlVUVFNNSUc+Ozk3NCkmIx8RFo/H8gAAA69JREFUWMOl1GV001AYBuAPqMAEmODuY2O4u7u7u7u7u7u7uzvkLiRN21WnZRtz3N3tHFrWkts2SZPD0z89J+d9892bmwC/4C7FDzRRKpUFCwd0KJUVpMnaoYmcwOVdU7Sn+Hg3ZV7CjY6oXUxcvLOcoAlulXcN9BgvJScEqCYEgLBCtIoQpKpeSmjx0wkRWvDmjxMqMQWqRcHc+cI0IQ5dlDO/hRArJ2d+R8z/5Q8/1onM5+DMX3jMu386MfcvmzfWNWctrFmwRUDxYkVzLq/MtuQATqvcN6BmwC1wGNhZScfYOmiefHHaJU3Lu4CzfoViaN581lmxztPrinEtU04XBm77skUQuOplgUu/0zyflf5THiVj8dgFUj8/rS2aUQ91EY58bZAqn6ZSpbEV7MuInRYsNX+JJDU/LeOzJf9tUJ0HqbKTVmmW0SMf6ggipiBIVou00fyqOKbCowhVT8n5MmQGTUXLuGzJhUCydqSjIc3yI+Kq5Hzv5iTrdz5wdbPBpky8lpYIga4rsQJNY7eCK3cEMA0C4VQtEtPOrSBLmIC7c0/Ckap4QXdpBYapB2F3Hrygt7SC6PCmkB3P5yknXOCu0f8XNM+FFeTqL7VgM7SuQmLKSN+Dtvnwgk4SC3LvgU518IO0X1qBvlobKNMYK4ir47lAjx+k+SUAjrH5yMjvMnBxY1n9zLiG9cPZgjvrAwG6OuJP0od9SSgCnpTQYwWHQgCgqn389KH3yqtrgCcborAlXASrjfbxh9y/p0ZqTyP0iTawr0Lu22DV1jZ+ZK7BCZ/VCCEvGQhqxbADRNUFm3JVNHHpIwbdRxmWCA8wUY8VtLF/luMih5e3jp/BvA0ErI1n8wZ9D/ire9q3hE+OPDIm7uXPt3waxmJWgF2BDwhHbeXdgGcGNh+uPQN219XIuWFhX858Q8aAnaL4eeyVZh+NCGemOJ5mx5lR2jBM/Dn2WuhsM3Lh7d8LT4ee8DWlmF5o9f9G0C52ak9E7hR+JUvLesmCrpX0z++FKGRKSnqlvWtv0DOBgPNLNCJOXl7sf9PX1DcMYz8DLcFZvfdG5BFlTH33XBtte43qgiuFGYlApTx4qTWEM9VC3AoGzKHENJiSUl5rmUk9ANwbfM2iGh6kvs0dCJzqUUgMakYQ8PCjxOTzhwKvy95mT3HkB4J2qtWCed/S4IFsHd+BMFKUz1kQQbZ9MvfdFe1BrJIFfPCk9YcU/kEgSemjzVYravh4e/v45i/g374vcPsDA8a+jZwEvzUAAAAASUVORK5CYII=
// @license          MIT
// @updateURL        https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/search-engine-jump.user.js
// @downloadURL      https://fastly.jsdelivr.net/gh/glenhoooo/user-scripts@release/search-engine-jump.user.js
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["search-engine-jump"] = factory();
	else
		root["search-engine-jump"] = factory();
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

;// ./src/scripts/search-engine-jump/index.ts

function modifyGoogle() {
    var _a;
    const $ipt = document.querySelector("input.gLFyf");
    const btns = [
        { text: "百度一下", class: "g-baidu", link: "https://www.baidu.com/s?wd=" },
        { text: "必应搜索", class: "g-bing", link: "https://www.bing.com/search?q=" },
    ];
    btns.forEach((btn, index) => {
        var _a;
        const styleText = `position: absolute; right: ${-120 * (index + 1)}px; top: 0; background: #fff; text-align: center; width: 100px; height: 38px; border: 1px solid transparent; box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%); color: #1a73e8; border-radius: 24px;cursor:pointer;`;
        const btnSearch = `<button style="${styleText}" class="${btn.class}" type="button">${btn.text}</button>`;
        (_a = document.querySelector(".A8SBwf")) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("beforeend", btnSearch);
    });
    (_a = document.querySelector(".tsf")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
        const target = Array.from(e.target.classList);
        const findBtn = btns.find(item => target.includes(item.class));
        if (findBtn) {
            window.open(findBtn.link + $ipt.value);
        }
    });
}
function modifyBaidu() {
    var _a;
    const $ipt = document.querySelector("#kw");
    const btns = [
        { text: "Google", class: "g-google", link: "https://www.google.com/search?q=" },
        { text: "必应搜索", class: "g-bing", link: "https://www.bing.com/search?q=" },
    ];
    const styleText = "cursor: pointer; width: 112px; height: 40px; line-height: 41px; line-height: 40px9; background-color: #4e6ef2; border-radius: 10px; font-size: 17px; box-shadow: none; font-weight: 400; border: 0; outline: 0; letter-spacing: normal; color: #fff; text-align: center;";
    btns.forEach(btn => {
        var _a;
        const btnSearch = `<span style="margin-left:10px" class="bg s_btn_wr"><input class="${btn.class}" type="button" value="${btn.text}" style="${styleText}"></span>`;
        (_a = document.querySelector("#form")) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("beforeend", btnSearch);
    });
    (_a = document.querySelector(".head_wrapper #form")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", e => {
        const target = Array.from(e.target.classList);
        const findBtn = btns.find(item => target.includes(item.class));
        if (findBtn) {
            window.open(findBtn.link + $ipt.value);
        }
    });
}
if (url_utils.host.endsWith("google.com")) {
    modifyGoogle();
}
else if (url_utils.host.endsWith("baidu.com")) {
    modifyBaidu();
}

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});