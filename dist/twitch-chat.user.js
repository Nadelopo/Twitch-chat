// ==UserScript==
// @name        twitch-chat
// @version     2.1.0
// @description extensions for chat styling
// @license     MIT
// @match       https://www.twitch.tv/*
// @grant       GM_addStyle
// ==/UserScript==

(function(){"use strict";const a=`.chat-line__username-container{padding:1px 6px;border:2px solid #fff;border-radius:50px!important;margin-right:5px}span[data-test-selector=chat-message-separator]{display:none}.chat-badge{border-radius:8px!important}
`;GM_addStyle(a);const c=(t,e)=>{t.style.color=e;const o=t.querySelector(".chat-line__username-container");o.style.borderColor=e},n=t=>{t.forEach(e=>{const o=e.querySelector(".chat-author__display-name");if(o){const r=window.getComputedStyle(o).color;e.style.color!==r&&c(e,r)}})},l=()=>{let t=document.querySelectorAll(".chat-line__no-background"),e="";setInterval(()=>{const o=window.location.href;if(o!==e){e=o;let r=new MutationObserver(()=>{t=document.querySelectorAll(".chat-line__no-background"),n(t)}),s=document.querySelector(".chat-scrollable-area__message-container");r.observe(s,{childList:!0})}},500)};addEventListener("click",()=>{const t=document.querySelector(".chat-input-tray__open");let e;e=setInterval(()=>{if(t){const o=t.querySelectorAll(".chat-line__no-background");n(o)}},100),setTimeout(()=>clearInterval(e),600)}),setTimeout(()=>l(),1e3)})();