// ==UserScript==
// @name         useful
// @namespace    Violentmonkey Scripts
// @match        https://pakistan.blsspainglobal.com/*
// @grant        none
// @version      1.2
// @description  Automatically hides the robotic logo even if it appears later
// ==/UserScript==
(function () {
    'use strict';

    // ============================
    // Hide Image on the Screen (even if added later)
    // ============================
    function hideImageWhenItAppears() {
        const image = document.querySelector('img.h-50px.mb-2');
        if (image && image.style.display !== 'none') {
            image.style.display = 'none';
            console.log('[VM] Robotic image hidden');
        }
    }

    // ============================
    // Click Login Button When It Appears
    // ============================
    function clickLoginButton() {
        const button = document.getElementById('login0');
        if (button && !button.disabled) {
            button.click();
            console.log('[VM] PakQuickX button clicked');
            clearInterval(buttonCheckInterval); // Stop checking once clicked
        }
    }

    // Run image hide initially
    hideImageWhenItAppears();

    // Observe for image appearing later
    const observer = new MutationObserver(() => {
        hideImageWhenItAppears();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Keep checking for the button every 500ms (in case it appears late)
    const buttonCheckInterval = setInterval(clickLoginButton, 500);

})();
