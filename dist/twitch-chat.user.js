// ==UserScript==
// @name        twitch-chat
// @version     2.1.4
// @description extensions for chat styling
// @license     MIT
// @match       https://www.twitch.tv/*
// @grant       GM_addStyle
// ==/UserScript==

(function(){"use strict";const u=`.chat-line__username-container{padding:1px 6px;border:2px solid #fff;border-radius:50px!important;margin-right:5px}span[data-test-selector=chat-message-separator]{display:none}.chat-badge{border-radius:8px!important}
`;GM_addStyle(u);function n(e){return new Promise(t=>{if(document.querySelector(e))return t(document.querySelector(e));const r=new MutationObserver(o=>{document.querySelector(e)&&(t(document.querySelector(e)),r.disconnect())});r.observe(document.body,{childList:!0,subtree:!0})})}const d=(e,t)=>{e.style.color=t;const r=e.querySelector(".chat-line__username-container");r.style.borderColor=t},c=e=>{e.forEach(t=>{var r,o;const i=t.querySelector(".chat-author__display-name");if(i){const s=window.getComputedStyle(i).color;t.style.color!==s&&((o=(r=t.querySelectorAll('span[aria-hidden="true"]'))==null?void 0:r[0])==null||o.remove(),d(t,s))}})};let a=document.querySelectorAll(".chat-line__no-background"),l="";setInterval(()=>{const e=window.location.href;e!==l&&(l=e,n(".chat-scrollable-area__message-container").then(t=>{new MutationObserver(()=>{a=document.querySelectorAll(".chat-line__no-background"),c(a)}).observe(t,{childList:!0})}))},500),addEventListener("click",async()=>{await n(".chat-input-tray__open .chat-line__no-background");const e=document.querySelector(".chat-input-tray__open").querySelectorAll(".chat-line__no-background");c(e)})})();
