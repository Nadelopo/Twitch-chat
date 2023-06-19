// ==UserScript==
// @name        twitch-chat
// @version     2.2.1
// @description extensions for chat styling
// @license     MIT
// @match       https://www.twitch.tv/*
// @grant       GM_addStyle
// ==/UserScript==

(function(){"use strict";const m=(e,o)=>{var a;const r=(a=o?.timeCheckUrl)!=null?a:500;let t="";setInterval(()=>{const n=window.location.href;n!==t&&(t=n,e())},r)},l=(e,o)=>{var a;const r=(a=o?.timeDisconnect)!=null?a:1e4;return new Promise(t=>{const n=document.querySelector(e);if(n)return t(n);const c=new MutationObserver(d=>{const u=document.querySelector(e);u&&(t(u),c.disconnect())});setTimeout(()=>{document.querySelector(e)||c.disconnect()},r),c.observe(document.body,{childList:!0,subtree:!0})})},_=`.chat-line__username{padding:1px 6px;border:2px solid #fff;border-radius:50px!important;margin-right:5px}.chat-line__message span[aria-hidden=true]{display:none}
`,h=`.chat-line__username{padding:1px 6px;border:2px solid #fff;border-radius:50px!important;margin-right:5px;border-color:inherit}.chat-line__username:hover{text-decoration:none!important}.chat-line__message--badges span{border-radius:50px!important;padding:12px}.chat-line__message span[aria-hidden=true]{display:none}.chat-line__message .ffz-badge{background-repeat:no-repeat;margin-right:6px!important;border:1px solid transparent}
`;let s=!1;l("#ffz-script").then(()=>{s=!0});const i=e=>{var o;const a=e.querySelector(s?".chat-line__username":".chat-author__display-name");if(!a)return;const r=getComputedStyle(a).color;if(e.querySelectorAll(".text-fragment").forEach(t=>t.style.color=r),s){e.querySelectorAll(".chat-line__message-mention ").forEach(n=>n.style.color=r),e.querySelector("br")||a.insertAdjacentElement("afterend",document.createElement("br"));const t=e.querySelector(".chat-line__message--badges");if(t){for(const n of t.children)n instanceof HTMLElement&&(n.style.borderColor=r);a.insertAdjacentElement("afterend",t)}}else{e.querySelectorAll(".mention-fragment").forEach(d=>d.style.color=r);const t=e.querySelector(".chat-line__username-container");t?.insertAdjacentElement("afterend",document.createElement("br"));const n=t?.querySelector(".chat-line__username");n&&(n.style.borderColor=r);const c=(o=e.querySelector(".chat-line__username-container"))==null?void 0:o.children[0];c&&n?.insertAdjacentElement("afterend",c)}};m(async()=>{const e=await l(".chat-scrollable-area__message-container");new MutationObserver(o=>{document.querySelectorAll(".chat-line__message"),s?GM_addStyle(h):GM_addStyle(_);for(const a of o){const r=a.addedNodes[0];r instanceof HTMLElement&&(r.classList.contains("chat-line__message")||r.classList.contains("chat-line__message-container"))&&i(r)}}).observe(e,{childList:!0,subtree:!0})}),window.addEventListener("click",async()=>{if(document.querySelector(".chat-input-tray__open .chat-line__message"))return;await l(".chat-input-tray__open .chat-line__message");const e=document.querySelectorAll(".chat-input-tray__open .chat-line__message");for(const o of e)o instanceof HTMLElement&&i(o)})})();
