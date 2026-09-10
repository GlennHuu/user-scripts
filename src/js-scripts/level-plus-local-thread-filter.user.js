// ==UserScript==
// @name         Level Plus 帖子本地关键词过滤
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  在 Level Plus 帖子列表页面右上角添加搜索框，按关键词过滤当前页面的帖子
// @author       Glen
// @match        *://www.level-plus.net/thread.php*
// @match        *://level-plus.net/thread.php*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const FILTER_PANEL_ID = 'level-plus-local-thread-filter';
    const HIDDEN_ROW_CLASS = 'level-plus-local-thread-filter-hidden';
    const THREAD_LINK_SELECTOR = 'a[href*="read.php?tid-"], a[href*="read.php?tid="]';

    if (document.getElementById(FILTER_PANEL_ID)) {
        return;
    }

    const styleElement = document.createElement('style');
    styleElement.textContent = `
        #${FILTER_PANEL_ID} {
            position: fixed;
            top: 12px;
            right: 12px;
            z-index: 2147483647;
            display: flex;
            align-items: center;
            gap: 8px;
            box-sizing: border-box;
            padding: 9px 10px;
            border: 1px solid rgba(0, 0, 0, 0.18);
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.96);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            color: #333;
            font: 13px/1.4 Arial, "Microsoft YaHei", sans-serif;
        }

        #${FILTER_PANEL_ID} input {
            box-sizing: border-box;
            width: 240px;
            height: 32px;
            padding: 5px 9px;
            border: 1px solid #aaa;
            border-radius: 5px;
            outline: none;
            background: #fff;
            color: #222;
            font: inherit;
        }

        #${FILTER_PANEL_ID} input:focus {
            border-color: #4a90e2;
            box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
        }

        #${FILTER_PANEL_ID} button {
            height: 30px;
            padding: 0 9px;
            border: 1px solid #aaa;
            border-radius: 5px;
            background: #f5f5f5;
            color: #333;
            cursor: pointer;
            font: inherit;
        }

        #${FILTER_PANEL_ID} button:hover {
            background: #e8e8e8;
        }

        #${FILTER_PANEL_ID} .level-plus-filter-status {
            min-width: 52px;
            color: #666;
            text-align: right;
            white-space: nowrap;
        }

        .${HIDDEN_ROW_CLASS} {
            display: none !important;
        }

        @media (max-width: 600px) {
            #${FILTER_PANEL_ID} {
                left: 8px;
                right: 8px;
            }

            #${FILTER_PANEL_ID} input {
                min-width: 0;
                width: auto;
                flex: 1;
            }
        }
    `;
    document.head.appendChild(styleElement);

    const filterPanel = document.createElement('div');
    filterPanel.id = FILTER_PANEL_ID;
    filterPanel.innerHTML = `
        <input
            type="search"
            autocomplete="off"
            aria-label="本地过滤当前页帖子"
            placeholder="过滤当前页帖子（空格分词）"
        >
        <button type="button" title="清除过滤关键词">清除</button>
        <span class="level-plus-filter-status" aria-live="polite"></span>
    `;
    document.body.appendChild(filterPanel);

    const filterInput = filterPanel.querySelector('input');
    const clearButton = filterPanel.querySelector('button');
    const statusElement = filterPanel.querySelector('.level-plus-filter-status');
    let postRows = [];
    let refreshFrameId = null;

    function collectPostRows() {
        const collectedRows = new Set();
        const preferredRowSelectors = [
            '#threadlist tr',
            '#ajaxtable tr',
            'tr.tr3',
            'tr.t_one',
            'tr[class*="thread"]'
        ];

        document.querySelectorAll(preferredRowSelectors.join(',')).forEach((candidateRow) => {
            if (candidateRow.querySelector(THREAD_LINK_SELECTOR)) {
                collectedRows.add(candidateRow);
            }
        });

        document.querySelectorAll(THREAD_LINK_SELECTOR).forEach((threadLink) => {
            const enclosingRow = threadLink.closest('tr');
            const enclosingListItem = threadLink.closest('li');
            const enclosingArticle = threadLink.closest('article');
            const fallbackContainer = enclosingRow || enclosingListItem || enclosingArticle || threadLink.parentElement;

            if (fallbackContainer && !filterPanel.contains(fallbackContainer)) {
                collectedRows.add(fallbackContainer);
            }
        });

        return Array.from(collectedRows).filter((candidateRow) => {
            return !Array.from(collectedRows).some((otherRow) => {
                return candidateRow !== otherRow && candidateRow.contains(otherRow);
            });
        });
    }

    function normalizeText(value) {
        return value.normalize('NFKC').toLocaleLowerCase();
    }

    function applyFilter() {
        const keywordParts = normalizeText(filterInput.value)
            .trim()
            .split(/\s+/)
            .filter(Boolean);
        let visiblePostCount = 0;

        postRows.forEach((postRow) => {
            const searchableText = normalizeText(postRow.textContent || '');
            const shouldShowPost = keywordParts.every((keywordPart) => searchableText.includes(keywordPart));

            postRow.classList.toggle(HIDDEN_ROW_CLASS, !shouldShowPost);

            if (shouldShowPost) {
                visiblePostCount += 1;
            }
        });

        if (postRows.length === 0) {
            statusElement.textContent = '未找到列表';
            return;
        }

        statusElement.textContent = `${visiblePostCount} / ${postRows.length}`;
    }

    function refreshPostRows() {
        postRows = collectPostRows();
        applyFilter();
    }

    function schedulePostRowRefresh() {
        if (refreshFrameId !== null) {
            return;
        }

        refreshFrameId = window.requestAnimationFrame(() => {
            refreshFrameId = null;
            refreshPostRows();
        });
    }

    filterInput.addEventListener('input', applyFilter);

    filterInput.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') {
            return;
        }

        filterInput.value = '';
        applyFilter();
        filterInput.blur();
    });

    clearButton.addEventListener('click', () => {
        filterInput.value = '';
        applyFilter();
        filterInput.focus();
    });

    document.addEventListener('keydown', (event) => {
        const activeElement = document.activeElement;
        const isEditingText = activeElement instanceof HTMLInputElement
            || activeElement instanceof HTMLTextAreaElement
            || activeElement?.isContentEditable;

        if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !isEditingText) {
            event.preventDefault();
            filterInput.focus();
            filterInput.select();
        }
    });

    const pageObserver = new MutationObserver((mutations) => {
        const hasPageContentChange = mutations.some((mutation) => !filterPanel.contains(mutation.target));

        if (hasPageContentChange) {
            schedulePostRowRefresh();
        }
    });

    pageObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

    refreshPostRows();
})();
