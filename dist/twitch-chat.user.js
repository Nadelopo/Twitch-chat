// ==UserScript==
// @name        twitch-chat
// @version     2.1.1
// @description extensions for chat styling
// @license     MIT
// @match       https://www.twitch.tv/*
// @grant       GM_addStyle
// ==/UserScript==

(function(){"use strict";const c=`.chat-line__username-container{padding:1px 6px;border:2px solid #fff;border-radius:50px!important;margin-right:5px}span[data-test-selector=chat-message-separator]{display:none}.chat-badge{border-radius:8px!important}
`;GM_addStyle(c);const l=(t,e)=>{t.style.color=e;const o=t.querySelector(".chat-line__username-container");o.style.borderColor=e},n=t=>{t.forEach(e=>{const o=e.querySelector(".chat-author__display-name");if(o){const r=window.getComputedStyle(o).color;e.style.color!==r&&l(e,r)}})},s=()=>{let t=document.querySelectorAll(".chat-line__no-background"),e="";setInterval(()=>{const o=window.location.href;if(o!==e){e=o;let r=new MutationObserver(()=>{t=document.querySelectorAll(".chat-line__no-background"),n(t)});setTimeout(()=>{let a=document.querySelector(".chat-scrollable-area__message-container");a&&r.observe(a,{childList:!0})},500)}},500)};addEventListener("click",()=>{const t=document.querySelector(".chat-input-tray__open");let e;e=setInterval(()=>{if(t){const o=t.querySelectorAll(".chat-line__no-background");n(o)}},100),setTimeout(()=>clearInterval(e),600)}),setTimeout(()=>s(),1e3)})();
