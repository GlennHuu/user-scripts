// ==UserScript==
// @name         Last.fm Recent Tracks Google Search
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  在 Last.fm 用户页面的 Recent Tracks 列表项旁增加 Google 搜索按钮，点击搜索“歌曲名 歌手”
// @author       Glenn
// @match        https://www.last.fm/user/*
// @match        https://www.last.fm/*/user/*
// @icon         https://www.last.fm/static/images/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 注入按钮样式
    const style = document.createElement('style');
    style.textContent = `
        .lfm-google-search-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-left: 8px;
            padding: 2px 5px;
            border-radius: 4px;
            color: #999;
            text-decoration: none !important;
            vertical-align: middle;
            transition: color 0.15s ease, background-color 0.15s ease;
            opacity: 0.45;
        }
        tr.chartlist-row:hover .lfm-google-search-btn {
            opacity: 1;
        }
        .lfm-google-search-btn:hover {
            color: #d92323;
            background-color: rgba(217, 35, 35, 0.08);
        }
        .lfm-google-search-btn svg {
            width: 14px;
            height: 14px;
            fill: currentColor;
        }
    `;
    document.head.appendChild(style);

    const SEARCH_ICON_SVG = `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
    `;

    function addSearchButtons() {
        // 选中具有 data-scrobble-row 属性的歌曲行（自动排除穿插在列表中的广告行）
        const rows = document.querySelectorAll('#recent-tracks-section tr.chartlist-row[data-scrobble-row], table.chartlist tr.chartlist-row[data-scrobble-row]');

        rows.forEach(row => {
            if (row.dataset.googleSearchInjected === 'true') return;

            const nameCell = row.querySelector('td.chartlist-name');
            const trackLink = nameCell?.querySelector('a');
            const artistLink = row.querySelector('td.chartlist-artist a');

            if (!nameCell || !trackLink) return;

            // 优先读取 title 属性防止长文本被截断，回退读取 textContent
            const trackName = (trackLink.getAttribute('title') || trackLink.textContent || '').trim();
            const artistName = (artistLink?.getAttribute('title') || artistLink?.textContent || '').trim();

            if (!trackName) return;

            const query = artistName ? `${trackName} ${artistName}` : trackName;
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

            // 使用 <a> 标签支持左键新标签页打开及中键后台打开
            const btn = document.createElement('a');
            btn.href = searchUrl;
            btn.target = '_blank';
            btn.rel = 'noopener noreferrer';
            btn.className = 'lfm-google-search-btn';
            btn.title = `Google 搜索: ${query}`;
            btn.innerHTML = SEARCH_ICON_SVG;

            // 防止点击事件冒泡触发行级事件
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            nameCell.appendChild(btn);
            row.dataset.googleSearchInjected = 'true';
        });
    }

    // 初次加载执行
    addSearchButtons();

    // 监听 DOM 变化，适配 Last.fm 的自动刷新与 PJAX 分页加载
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                addSearchButtons();
                break;
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
