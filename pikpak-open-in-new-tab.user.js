// ==UserScript==
// @name         PikPak 文件列表添加新标签打开按钮
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  在 PikPak 分享页面的每个文件列表项添加“新标签打开”按钮，修复按钮消失问题
// @author       YourName
// @match        https://mypikpak.com/s/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 注入自定义 CSS 样式
    const style = document.createElement('style');
    style.innerHTML = `
        .custom-open-btn {
            /* 使用绝对定位，让按钮固定在每个文件行的右侧，防止被原生布局挤压隐藏 */
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            padding: 4px 10px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            z-index: 9999; /* 确保层级最高 */
            transition: background-color 0.2s;
        }
        .custom-open-btn:hover {
            background-color: #0056b3;
        }
    `;
    document.head.appendChild(style);

    function addButtons() {
        // 获取所有目标 li 元素
        const listItems = document.querySelectorAll('.file-list > li');

        listItems.forEach(li => {
            // 关键修改：直接在 li 内部查找按钮是否存在。如果被网页刷新刷掉了，这里就会判断为不存在，从而重新添加
            if (li.id && !li.querySelector('.custom-open-btn')) {

                // 确保父元素具备定位基础，以免绝对定位的按钮跑偏
                if (window.getComputedStyle(li).position === 'static') {
                    li.style.position = 'relative';
                }

                // 创建按钮
                const btn = document.createElement('button');
                btn.innerText = '新标签打开';
                btn.className = 'custom-open-btn';

                // 绑定点击事件
                btn.addEventListener('click', (e) => {
                    // 阻止事件冒泡和默认行为
                    e.stopPropagation();
                    e.preventDefault();

                    // 拼接新地址
                    const currentUrl = new URL(window.location.href);
                    currentUrl.pathname = currentUrl.pathname.replace(/\/$/, '') + '/' + li.id;

                    // 新标签打开
                    window.open(currentUrl.toString(), '_blank');
                });

                // 添加按钮
                li.appendChild(btn);
            }
        });
    }

    // 使用 MutationObserver 监听动态 DOM 变化
    const observer = new MutationObserver((mutations) => {
        addButtons();
    });

    // 监听整个 body 的变化
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 初始执行一次
    addButtons();

})();