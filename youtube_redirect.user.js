// ==UserScript==
// @name         Redirect YouTube Link
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Redirects YouTube links to direct links
// @author       Omed Qarshi
// @match        https://www.youtube.com/redirect?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // Extracting the direct link from the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const directLink = urlParams.get('q');
    
    if (directLink) {
        // Redirect to the direct link
        window.location.href = decodeURIComponent(directLink);
    } else {
        console.log("Direct link not found.");
    }
})();
