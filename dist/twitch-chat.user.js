// ==UserScript==
// @name        twitch-chat
// @version     2.1.2
// @description extensions for chat styling
// @license     MIT
// @match       https://www.twitch.tv/*
// @grant       GM_addStyle
// ==/UserScript==

(function(){"use strict";const l=`.chat-line__username-container{padding:1px 6px;border:2px solid #fff;border-radius:50px!important;margin-right:5px}span[data-test-selector=chat-message-separator]{display:none}.chat-badge{border-radius:8px!important}
`;GM_addStyle(l);function s(e){return new Promise(t=>{if(document.querySelector(e))return t(document.querySelector(e));const r=new MutationObserver(o=>{document.querySelector(e)&&(t(document.querySelector(e)),r.disconnect())});r.observe(document.body,{childList:!0,subtree:!0})})}const i=(e,t)=>{e.style.color=t;const r=e.querySelector(".chat-line__username-container");r.style.borderColor=t},n=e=>{e.forEach(t=>{const r=t.querySelector(".chat-author__display-name");if(r){const o=window.getComputedStyle(r).color;t.style.color!==o&&i(t,o)}})};let c=document.querySelectorAll(".chat-line__no-background"),a="";setInterval(()=>{const e=window.location.href;e!==a&&(a=e,s(".chat-scrollable-area__message-container").then(t=>{new MutationObserver(()=>{c=document.querySelectorAll(".chat-line__no-background"),n(c)}).observe(t,{childList:!0})}))},500),addEventListener("click",()=>{const e=document.querySelector(".chat-input-tray__open");let t;t=setInterval(()=>{if(e){const r=e.querySelectorAll(".chat-line__no-background");n(r)}},100),setTimeout(()=>clearInterval(t),600)})})();
