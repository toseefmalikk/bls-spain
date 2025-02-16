// ==UserScript==
// @name         Auto Location SPAIN gg
// @namespace    BLS SCRIPT TEAM
// @version      0.1
// @author       Cryptoker
// @match        https://pakistan.blsspainglobal.com/Global/account/*
// @match        https://pakistan.blsspainglobal.com/Global/bls/visatype*
// @match        https://ita-pak.blsinternational.com/*
// @match        https://pakistan.blsspainglobal.com/Global/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
(async function () {
    "use strict";

    // Configuration: Define constants for appointment category, location, etc.
    const appointmentCategoryIndex = 1;   // Index for Appointment Category
    const locationIndex = 2;             // Index for Location (1: ISLAMABAD, 2: KARACHI, 3: LAHORE)
    const visaTypeIndex = 3;            // Index for Visa Type (1: EU-Citizens, 2: National Visa, 3: Schengen)
    const visaSubTypeIndex = 8;         // Index for Visa Sub Type (1: Family Reunion, 2: Other Visa, 3: Study Visa, etc.)
    const delayBetweenFills = 0.001;    // Delay in milliseconds between dropdown selections

    // Log messages to the console
    function log(message) {
        console.log(message);
    }

    // Sleep function to introduce delays between actions
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Fill dropdown menus with specified values
    async function fillDropdown(dropdownName, index, value) {
        const dropdownElement = document.querySelector(`[aria-owns="${dropdownName}${index}_listbox"]`);
        if (dropdownElement && dropdownElement.offsetParent !== null) {
            log(`${dropdownName} ${index} is visible`);
            const dropdown = $(`#${dropdownName}${index}`).data("kendoDropDownList");
            if (dropdown) {
                dropdown.select(value);
                dropdown.trigger("change");
                log(`${dropdownName} ${index} set to ${value}`);
            } else {
                log(`Dropdown ${dropdownName}${index} not found`);
            }
        } else {
            log(`${dropdownName} ${index} is not visible`);
        }
    }

    // Fill in Appointment Category dropdowns
    async function fillCategoryId() {
        for (let i = 1; i < 10; i++) {
            await fillDropdown("AppointmentCategoryId", i, appointmentCategoryIndex);
            await sleep(delayBetweenFills);
        }
    }

    // Fill in Location dropdowns
    async function fillLocation() {
        for (let i = 1; i < 10; i++) {
            await fillDropdown("Location", i, locationIndex);
            await sleep(delayBetweenFills);
        }
    }

    // Fill in Visa Type dropdowns
    async function fillVisaType() {
        for (let i = 1; i < 10; i++) {
            await fillDropdown("VisaType", i, visaTypeIndex);
            await sleep(delayBetweenFills);
        }
    }

    // Fill in Visa Sub Type dropdowns
    async function fillVisaSubType() {
        for (let i = 1; i < 10; i++) {
            await fillDropdown("VisaSubType", i, visaSubTypeIndex);
            await sleep(delayBetweenFills);
        }
    }

    // Function to click a button by its XPath
    function cliButtonByXpath(xpath) {
        const button = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (button) {
            button.click();
            log(`Button clicked at xpath: ${xpath}`);
        } else {
            log(`Button not found at xpath: ${xpath}`);
        }
    }

    // Wait for the button to appear and be visible, then click it
    function observeAndClickButton(xpath) {
        const button = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (button) {
            // Use IntersectionObserver to ensure the button is fully visible
            const observer = new IntersectionObserver((entries, observer) => {
                if (entries[0].isIntersecting) {
                    button.click();
                    log(`Button clicked at xpath: ${xpath}`);
                    observer.disconnect(); // Stop observing after clicking
                }
            }, { threshold: 1.0 }); // Ensure button is fully visible

            observer.observe(button);
        } else {
            log(`Button not found at xpath: ${xpath}`);
        }
    }

    // Submit all buttons one by one (wait for each to appear and click)
    async function submitForm() {
        log("Waiting for the first submit button...");
        // Observe and click the first submit button when it's visible
        observeAndClickButton("/html/body/main/main/div/div/div[2]/form/div[2]/button[3]");

        log("Waiting for the second submit button...");
        // Observe and click the second submit button when it's visible
        observeAndClickButton("/html/body/main/main/div/div/div[2]/form/div[37]/button[3]");

        log("Waiting for the third submit button...");
        // Observe and click the third submit button when it's visible
        observeAndClickButton("/html/body/main/main/div/div/div[2]/div[2]/form/div[23]/button[3]");
    }

    // Reload the page if there is a server error
    const errorTitles = [
        "504 Gateway Time-out", "502 Bad Gateway", "503 Service Temporarily Unavailable",
        "Service Unavailable", "500 Internal Server Error", "Database error",
        "FastCGI Error", "The connection has timed out", "Problemas al cargar la página",
        "403 Forbidden"
    ];

    if (errorTitles.includes(document.title)) {
        window.location.reload();
    }

    // Initial sleep to allow the page to load
    await sleep(100); // Initial delay before executing actions

    // Execute actions like filling dropdowns and submitting form
    await fillCategoryId();
    await fillLocation();
    await fillVisaType();
    await fillVisaSubType();

    // Submit the form by clicking all submit buttons
    await submitForm();

    log("All processes initiated.");
})();
