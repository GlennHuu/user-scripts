// ==UserScript==
// @name         腾讯文档外链自动跳转
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  拦截腾讯文档外部链接提示页面，等待1秒后自动跳转到目标页面
// @author       Gemini
// @match        *://docs.qq.com/scenario/link.html*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 解析当前 URL 的参数
    const urlParams = new URLSearchParams(window.location.search);

    // 获取 'url' 参数的值（URLSearchParams 会自动进行 decode 解码）
    const targetUrl = urlParams.get('url');

    // 如果存在目标链接，则在 1 秒后执行跳转
    if (targetUrl) {
        // 可选：在页面上添加一个提示文字（等待加载 DOM 后执行）
        document.addEventListener('DOMContentLoaded', () => {
            const tip = document.createElement('div');
            tip.style.cssText = 'position:fixed; top:20px; left:50%; transform:translateX(-50%); background:#0052d9; color:#fff; padding:10px 20px; border-radius:4px; z-index:999999; font-size:14px;';
            tip.innerText = 'Tampermonkey: 1秒后将自动跳转到目标网页...';
            document.body.appendChild(tip);
        });

        // 1000 毫秒（1秒）后跳转
        setTimeout(() => {
            window.location.replace(targetUrl);
        }, 1000);
    }
})();