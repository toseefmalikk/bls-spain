// ==UserScript==
// @name         Submit Buttons with Delay
// @namespace    Violentmonkey Scripts
// @match        https://pakistan.blsspainglobal.com/*
// @exclude     https://pakistan.blsspainglobal.com/Global/bls/visatypeverification*
// @exclude       https://pakistan.blsspainglobal.com/Global/bls/visatype?*
// @grant        none
// @version      1.0
// @author       -
// @description  Hide image and automatically click buttons with delays
// ==/UserScript==

(function() {
    'use strict';

    // ============================
    // Hide Image on the Screen
    // ============================
    const image = document.querySelector('img.h-50px.mb-2');
    if (image) {
        image.style.display = 'none';  // Hide the image if it exists
    }

    // ============================
    // Function to Simulate Button Click with Delay (using XPath)
    // ============================
    function clickButtonWithDelay(xpath, delay) {
        const button = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (button) {
            setTimeout(() => {
                button.click();  // Simulate a click after the delay
            }, delay);
        }
    }

    // XPath for the first submit button
    const submitButtonXPath = '/html/body/main/main/div/div/div[2]/div[2]/form/div[13]/button';

    // Set a random delay (between 2 and 5 seconds) for the first button click
    const delay = Math.random() * 2000 + 1500; // Random delay between 2 and 5 seconds

    // Click the submit button using XPath after the random delay
    clickButtonWithDelay(submitButtonXPath, delay);

    // ============================
    // Simulate Button Click with Delay (using ID)
    // ============================
    setTimeout(function() {
        var button = document.querySelector('#btnVerify');  // Using the button's ID for better targeting
        if (button) {
            button.click();  // Simulate a click on the button
        }
    }, 3800);  // Fixed delay of 3000 milliseconds (3 seconds)

})();
