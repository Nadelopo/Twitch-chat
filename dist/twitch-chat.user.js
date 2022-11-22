// ==UserScript==
// @name        twitch-chat
// @version     2.1.3
// @description extensions for chat styling
// @license     MIT
// @match       https://www.twitch.tv/*
// @grant       GM_addStyle
// ==/UserScript==

(function(){"use strict";const s=`.chat-line__username-container{padding:1px 6px;border:2px solid #fff;border-radius:50px!important;margin-right:5px}span[data-test-selector=chat-message-separator]{display:none}.chat-badge{border-radius:8px!important}
`;GM_addStyle(s);function r(e){return new Promise(t=>{if(document.querySelector(e))return t(document.querySelector(e));const o=new MutationObserver(n=>{document.querySelector(e)&&(t(document.querySelector(e)),o.disconnect())});o.observe(document.body,{childList:!0,subtree:!0})})}const i=(e,t)=>{e.style.color=t;const o=e.querySelector(".chat-line__username-container");o.style.borderColor=t},c=e=>{e.forEach(t=>{const o=t.querySelector(".chat-author__display-name");if(o){const n=window.getComputedStyle(o).color;t.style.color!==n&&i(t,n)}})};let a=document.querySelectorAll(".chat-line__no-background"),l="";setInterval(()=>{const e=window.location.href;e!==l&&(l=e,r(".chat-scrollable-area__message-container").then(t=>{new MutationObserver(()=>{a=document.querySelectorAll(".chat-line__no-background"),c(a)}).observe(t,{childList:!0})}))},500),addEventListener("click",async()=>{await r(".chat-input-tray__open .chat-line__no-background");const e=document.querySelector(".chat-input-tray__open").querySelectorAll(".chat-line__no-background");c(e)})})();
