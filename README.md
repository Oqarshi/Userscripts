# Omed's Userscripts

## Number 1

### Redirect YouTube Link

Description:
Hate seeing that youtube redirect page? Well this is the solution!

```javascript
// ==UserScript==
// @name         Redirect YouTube Link
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Redirects YouTube links to direct links
// @author       You
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

```

## Number 2

### Rewind/fastforward through youtube shorts and tiktok

Description:
Want to Rewind or Fastforward on youtube shorts? Well this is the solution!

```javascript
// ==UserScript==
// @name         Skip stuff
// @namespace    http://tampermonkey.net/
// @license MIT
// @version      1.0.0
// @description  Dompamine hit
// @author       Omed Qarshi
// @match        https://www.youtube.com/*
// @match        https://www.tiktok.com/*
// @run-at       document-idle
// @icon         https://cdn-icons-png.flaticon.com/512/7696/7696578.png
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  console.log("Script is running...");

  // Create a message element for displaying rewind and fast-forward messages
  const messageElement = document.createElement('div');
  messageElement.style.position = 'absolute';
  messageElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  messageElement.style.color = '#fff';
  messageElement.style.padding = '10px 20px';
  messageElement.style.borderRadius = '10px';
  messageElement.style.zIndex = '9999';
  messageElement.style.fontSize = '16px';
  messageElement.style.transition = 'opacity 0.5s'; // Fade out transition
  messageElement.style.opacity = '0'; // Initially hide the message

  function showMessage(message) {
    messageElement.innerText = message;
    messageElement.style.opacity = '1'; // Show the message
    setTimeout(() => {
      messageElement.style.opacity = '0'; // Fade out the message
    }, 2000); // Message duration
  }

  function handleKeyEvents(event) {
    console.log("Key pressed:", event.code);
    if (location.pathname.includes('/shorts') || location.host.includes('tiktok.com')) {
      console.log("Location matched: ", location.href);
      const video = document.querySelector("video[loop]") || document.querySelector("video");
      console.log("Video element:", video);
      if (video) {
        if (event.code === 'ArrowLeft') {
          console.log("Rewinding...");
          const rewindTime = Math.floor(video.duration * 0.15);
          if (rewindTime < 1) {
            video.currentTime = Math.max(video.currentTime - 1, 0);
          } else {
            video.currentTime = Math.max(video.currentTime - rewindTime, 0);
          }
          showMessage(`Rewinding to: ${formatTime(video.currentTime)} / ${formatTime(video.duration)}`);
        } else if (event.code === 'ArrowRight') {
          console.log("Fast-forwarding...");
          const forwardTime = Math.floor(video.duration * 0.15);
          if (forwardTime < 1) {
            video.currentTime = Math.min(video.currentTime + 1, video.duration);
          } else {
            video.currentTime = Math.min(video.currentTime + forwardTime, video.duration);
          }
          showMessage(`Fast-forwarding to: ${formatTime(video.currentTime)} / ${formatTime(video.duration)}`);
        }
        // Position message next to the video element
        const rect = video.getBoundingClientRect();
        messageElement.style.top = (rect.top + window.pageYOffset + rect.height + 10) + 'px';
        messageElement.style.left = (rect.left + window.pageXOffset + rect.width + 10) + 'px';
        document.body.appendChild(messageElement);
      }
    }
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  window.addEventListener('keydown', handleKeyEvents);
})();

```
