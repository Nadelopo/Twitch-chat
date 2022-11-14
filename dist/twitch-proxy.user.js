// ==UserScript==
// @name     twitch-proxy
// @version  2.0.0
// @license  MIT
// @match    https://www.twitch.tv/*
// @grant    GM_addStyle
// ==/UserScript==

(function(){"use strict";function A(t,e){var r=E(t),i=r.tag,n=r.id,o=r.className,a=e?document.createElementNS(e,i):document.createElement(i);return n&&(a.id=n),o&&(e?a.setAttribute("class",o):a.className=o),a}function E(t){for(var e=t.split(/([.#])/),r="",i="",n=1;n<e.length;n+=2)switch(e[n]){case".":r+=" "+e[n+1];break;case"#":i=e[n+1]}return{className:r.trim(),tag:e[0]||"div",id:i}}function k(t,e,r){var i=e.__redom_lifecycle;if(y(i)){e.__redom_lifecycle={};return}var n=r;for(e.__redom_mounted&&f(e,"onunmount");n;){var o=n.__redom_lifecycle||{};for(var a in i)o[a]&&(o[a]-=i[a]);y(o)&&(n.__redom_lifecycle=null),n=n.parentNode}}function y(t){if(t==null)return!0;for(var e in t)if(t[e])return!1;return!0}var C=["onmount","onremount","onunmount"],j=typeof window<"u"&&"ShadowRoot"in window;function h(t,e,r,i){var n=u(t),o=u(e);e===o&&o.__redom_view&&(e=o.__redom_view),e!==o&&(o.__redom_view=e);var a=o.__redom_mounted,l=o.parentNode;if(a&&l!==n&&k(e,o,l),r!=null)if(i){var d=u(r);d.__redom_mounted&&f(d,"onunmount"),n.replaceChild(o,d)}else n.insertBefore(o,u(r));else n.appendChild(o);return T(e,o,n,l),e}function f(t,e){e==="onmount"||e==="onremount"?t.__redom_mounted=!0:e==="onunmount"&&(t.__redom_mounted=!1);var r=t.__redom_lifecycle;if(r){var i=t.__redom_view,n=0;i&&i[e]&&i[e]();for(var o in r)o&&n++;if(n)for(var a=t.firstChild;a;){var l=a.nextSibling;f(a,e),a=l}}}function T(t,e,r,i){for(var n=e.__redom_lifecycle||(e.__redom_lifecycle={}),o=r===i,a=!1,l=0,d=C;l<d.length;l+=1){var _=d[l];o||t!==e&&_ in t&&(n[_]=(n[_]||0)+1),n[_]&&(a=!0)}if(!a){e.__redom_lifecycle={};return}var c=r,m=!1;for((o||c&&c.__redom_mounted)&&(f(e,o?"onremount":"onmount"),m=!0);c;){var v=c.parentNode,q=c.__redom_lifecycle||(c.__redom_lifecycle={});for(var p in n)q[p]=(q[p]||0)+n[p];if(m)break;(c.nodeType===Node.DOCUMENT_NODE||j&&c instanceof ShadowRoot||v&&v.__redom_mounted)&&(f(c,o?"onremount":"onmount"),m=!0),c=v}}function L(t,e,r){var i=u(t);if(typeof e=="object")for(var n in e)b(i,n,e[n]);else b(i,e,r)}function b(t,e,r){t.style[e]=r??""}var g="http://www.w3.org/1999/xlink";function w(t,e,r,i){var n=u(t),o=typeof e=="object";if(o)for(var a in e)w(n,a,e[a],i);else{var l=n instanceof SVGElement,d=typeof r=="function";if(e==="style"&&typeof r=="object")L(n,r);else if(l&&d)n[e]=r;else if(e==="dataset")N(n,r);else if(!l&&(e in n||d)&&e!=="list")n[e]=r;else{if(l&&e==="xlink"){S(n,r);return}i&&e==="class"&&(r=n.className+" "+r),r==null?n.removeAttribute(e):n.setAttribute(e,r)}}}function S(t,e,r){if(typeof e=="object")for(var i in e)S(t,i,e[i]);else r!=null?t.setAttributeNS(g,e,r):t.removeAttributeNS(g,e,r)}function N(t,e,r){if(typeof e=="object")for(var i in e)N(t,i,e[i]);else r!=null?t.dataset[e]=r:delete t.dataset[e]}function M(t){return document.createTextNode(t??"")}function x(t,e,r){for(var i=0,n=e;i<n.length;i+=1){var o=n[i];if(!(o!==0&&!o)){var a=typeof o;a==="function"?o(t):a==="string"||a==="number"?t.appendChild(M(o)):O(u(o))?h(t,o):o.length?x(t,o,r):a==="object"&&w(t,o,null,r)}}}function u(t){return t.nodeType&&t||!t.el&&t||u(t.el)}function O(t){return t&&t.nodeType}function s(t){for(var e=[],r=arguments.length-1;r-- >0;)e[r]=arguments[r+1];var i,n=typeof t;if(n==="string")i=A(t);else if(n==="function"){var o=t;i=new(Function.prototype.bind.apply(o,[null].concat(e)))}else throw new Error("At least one argument required");return x(u(i),e,!0),i}var D=s;s.extend=function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];return s.bind.apply(s,[this].concat(t))};const R=`.chat-line__username-container{padding:1px 6px;border:2px solid #fff;border-radius:50px!important;margin-right:5px}span[data-test-selector=chat-message-separator]{display:none}.chat-badge{border-radius:8px!important}
`;GM_addStyle(R);const B=()=>{const t=n=>{const o=n.querySelector(".chat-author__display-name");let a=null;o&&(a=window.getComputedStyle(o).color),n.style.color!==a&&(n.style.color=a);const l=n.querySelector(".chat-line__username-container");l.style.borderColor!==a&&(l.style.borderColor=a)},e=n=>{n.forEach(o=>t(o))};let r=document.querySelectorAll(".chat-line__no-background");e(r);let i="";setInterval(()=>{const n=window.location.href;if(n!==i){i=n;let o=new MutationObserver(()=>{r=document.querySelectorAll(".chat-line__no-background"),e(r)}),a=document.querySelector(".chat-scrollable-area__message-container");o.observe(a,{childList:!0})}},500),addEventListener("click",()=>{const n=document.querySelector(".chat-input-tray__open");setTimeout(()=>{const o=n.querySelectorAll(".chat-line__no-background");e(o)},400)})},G=D("div");window.addEventListener("load",()=>{const t=document.querySelector(".stream-chat-header");t&&h(t,G),B()})})();
