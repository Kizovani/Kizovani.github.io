(function(){const f=document.createElement("link").relList;if(f&&f.supports&&f.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function l(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(t){if(t.ep)return;t.ep=!0;const i=l(t);fetch(t.href,i)}})();var O=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function M(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a}var x={exports:{}};/*!
 * baffle 0.3.6 - A tiny javascript library for obfuscating and revealing text in DOM elements.
 * Copyright (c) 2016 Cam Wiegert <cam@camwiegert.com> - https://camwiegert.github.io/baffle
 * License: MIT
 */(function(a,f){(function(l,r){a.exports=r()})(O,function(){return function(l){function r(i){if(t[i])return t[i].exports;var s=t[i]={exports:{},id:i,loaded:!1};return l[i].call(s.exports,s,s.exports,r),s.loaded=!0,s.exports}var t={};return r.m=l,r.c=t,r.p="",r(0)}([function(l,r,t){function i(d){return d&&d.__esModule?d:{default:d}}var s=t(2),c=i(s);l.exports=c.default},function(l,r){function t(u,n){for(var e in n)n.hasOwnProperty(e)&&(u[e]=n[e]);return u}function i(u,n){return u.split("").map(n).join("")}function s(u){return u[Math.floor(Math.random()*u.length)]}function c(u,n){for(var e=0,o=u.length;e<o;e++)n(u[e],e)}function d(u){return u.map(function(n,e){return!!n&&e}).filter(function(n){return n!==!1})}function h(u){return typeof u=="string"?[].slice.call(document.querySelectorAll(u)):[NodeList,HTMLCollection].some(function(n){return u instanceof n})?[].slice.call(u):u.nodeType?[u]:u}Object.defineProperty(r,"__esModule",{value:!0}),r.extend=t,r.mapString=i,r.sample=s,r.each=c,r.getTruthyIndices=d,r.getElements=h},function(l,r,t){function i(e){return e&&e.__esModule?e:{default:e}}function s(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(r,"__esModule",{value:!0});var c=t(1),d=t(3),h=i(d),u={characters:"AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz~!@#$%^&*()-+=[]{}|;:,./<>?",exclude:[" "],speed:50},n=function(){function e(o,p){s(this,e),this.options=(0,c.extend)(Object.create(u),p),this.elements=(0,c.getElements)(o).map(h.default),this.running=!1}return e.prototype.once=function(){var o=this;return(0,c.each)(this.elements,function(p){return p.write(o.options.characters,o.options.exclude)}),this.running=!0,this},e.prototype.start=function(){var o=this;return clearInterval(this.interval),(0,c.each)(this.elements,function(p){return p.init()}),this.interval=setInterval(function(){return o.once()},this.options.speed),this.running=!0,this},e.prototype.stop=function(){return clearInterval(this.interval),this.running=!1,this},e.prototype.set=function(o){return(0,c.extend)(this.options,o),this.running&&this.start(),this},e.prototype.text=function(o){var p=this;return(0,c.each)(this.elements,function(m){m.text(o(m.value)),p.running||m.write()}),this},e.prototype.reveal=function(){var o=this,p=arguments.length<=0||arguments[0]===void 0?0:arguments[0],m=arguments.length<=1||arguments[1]===void 0?0:arguments[1],y=p/this.options.speed||1,T=function(){clearInterval(o.interval),o.running=!0,o.interval=setInterval(function(){var w=o.elements.filter(function(g){return!g.bitmap.every(function(v){return!v})});(0,c.each)(w,function(g){var v=Math.ceil(g.value.length/y);g.decay(v).write(o.options.characters,o.options.exclude)}),w.length||(o.stop(),(0,c.each)(o.elements,function(g){return g.init()}))},o.options.speed)};return setTimeout(T,m),this},e}();r.default=function(e,o){return new n(e,o)}},function(l,r,t){function i(n,e){if(!n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||typeof e!="object"&&typeof e!="function"?n:e}function s(n,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(n,e):n.__proto__=e)}function c(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(r,"__esModule",{value:!0});var d=t(1),h=function(){function n(e){c(this,n),this.value=e,this.init()}return n.prototype.init=function(){return this.bitmap=this.value.split("").map(function(){return 1}),this},n.prototype.render=function(){var e=this,o=arguments.length<=0||arguments[0]===void 0?[]:arguments[0],p=arguments.length<=1||arguments[1]===void 0?[]:arguments[1];return o.length?(0,d.mapString)(this.value,function(m,y){return p.indexOf(m)>-1?m:e.bitmap[y]?(0,d.sample)(o):m}):this.value},n.prototype.decay=function(){for(var e=arguments.length<=0||arguments[0]===void 0?1:arguments[0];e--;){var o=(0,d.getTruthyIndices)(this.bitmap);this.bitmap[(0,d.sample)(o)]=0}return this},n.prototype.text=function(){var e=arguments.length<=0||arguments[0]===void 0?this.value:arguments[0];return this.value=e,this.init(),this},n}(),u=function(n){function e(o){c(this,e);var p=i(this,n.call(this,o.textContent));return p.element=o,p}return s(e,n),e.prototype.write=function(o,p){return this.element.textContent=this.render(o,p),this},e}(h);r.default=function(n){return new u(n)}}])})})(x);var E=x.exports;const b=M(E);function L(){const a=gsap.timeline({paused:!0});function f(){l();const r=document.getElementById("menu-toggle"),t=document.getElementById("close-menu");r.onclick=function(i){a.reversed(!a.reversed())},t.onclick=function(i){a.reversed(!a.reversed())}}function l(){a.to(".menu-container",.01,{height:"205px"}),a.to(".col-1",1,{left:"-200px",ease:"power4.inOut"}),a.to(".col-2",.025,{left:"0px",ease:"power4.inOut"},"<"),a.to(".col-2 > .menu-item",1,{left:0,ease:"power4.inOut",stagger:{amount:.35}},"<").reverse()}f()}function j(){gsap.to(".marquee",{x:"-25%",duration:10,ease:"none",repeat:-1,yoyo:!0});let a=document.querySelector(".menu-container"),f=document.querySelector(".marquee-container"),l=document.querySelector(".marquee"),r=!1;a.addEventListener("mouseenter",function(){r=!0,f.style.display="block"}),a.addEventListener("mousemove",function(t){if(r){f.style.display="block";let i=window.pageXOffset||document.documentElement.scrollLeft,s=window.pageYOffset||document.documentElement.scrollTop,c=t.clientX+i,d=t.clientY+s,h=c-f.offsetWidth/2,u=d-f.offsetHeight/2;gsap.to(f,{scale:1,left:h+25,top:u,duration:.2,ease:"power3.out"});let n=t.target.closest(".menu-item");if(n){let o=(n.textContent.trim()+" ").repeat(24);l.innerHTML=o.replace(/\s/g,"&nbsp;")}}}),a.addEventListener("mouseleave",function(){r=!1,gsap.to(f,{scale:0,duration:.2,ease:"power3.out",onComplete:function(){f.style.display="none"}});let t="home ".repeat(24);l.innerHTML=t.replace(/\s/g,"&nbsp;")})}function q(){const a=[{content:"Welcome",duration:4e3},{content:"move me using your mouse",duration:3e3},{content:"drag with left and right click for rotation and position",duration:5e3},{content:"zoom using the scroll wheel",duration:4e3},{content:"you can also play with my lighting effects..",duration:5e3},{content:"using the scroll bar for light rotation",duration:5e3},{content:"and the switch for ambient light",duration:5e3},{content:"check out the menu for more",duration:4e3}];let f=0,l=b(".welcome-text",{characters:"▒██ ▒▒>>█ >▒<█< ▓▒▒ ▓▒█$▒▓ ▒░/█ ▓▒#▒ ░▓▒▒ >/░▒",speed:70});function r(){if(f>=a.length){t();return}const s=a[f];l.start(),l.text(()=>s.content).reveal(1500),f++,setTimeout(()=>{f<a.length?r():t()},s.duration)}function t(){console.log("all messages displayed");const s=document.querySelector(".welcome-text"),c=4e3;setTimeout(()=>{l.start()},3500),setTimeout(()=>{s.style.display="none"},c),setTimeout(()=>{l.start(),s.style.display="inline-block",l.text(()=>"why are you still here?").reveal(1e3)},12e4)}window.addEventListener("modelLoaded",function(){setTimeout(function(){const c=document.querySelector(".welcome-text");c.style.display="inline-block",r()},4700)});let i=b(".nametag",{characters:"▒██ ▒▒>>█ >▒<█< ▓▒▒ ▓▒█$▒▓ ▒░/█ ▓▒#▒ ░▓▒▒ >/░▒",speed:70});i.start(),setTimeout(()=>{const s=document.querySelector(".nametag");s.style.display="inline-block"},50),window.addEventListener("modelLoaded",function(){i.reveal(5e3,2e3)})}function _(){console.log("Projects page initialized")}document.addEventListener("DOMContentLoaded",function(){L(),j(),document.querySelector(".nametag")?q():document.getElementById("projects-container")&&_()});
