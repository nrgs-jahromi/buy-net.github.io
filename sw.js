if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,a)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let r={};const c=e=>i(e,l),o={module:{uri:l},exports:r,require:c};s[l]=Promise.all(n.map((e=>o[e]||c(e)))).then((e=>(a(...e),r)))}}define(["./workbox-9e8e583d"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"apple-touch-icon-180x180.png",revision:"a27d7b61a0241052f736ebe81718c101"},{url:"assets/Add to Cart-amico-23cd411e.svg",revision:null},{url:"assets/E-Wallet-pana (1)-a64c43e6.svg",revision:null},{url:"assets/E-Wallet-pana (2)-93454f96.svg",revision:null},{url:"assets/E-Wallet-pana-451fe5db.svg",revision:null},{url:"assets/index-4ad8d493.js",revision:null},{url:"assets/index-a317599c.css",revision:null},{url:"assets/logo-5118e7bd.png",revision:null},{url:"assets/QR Code-amico-a426e3c3.svg",revision:null},{url:"assets/slick-12459f22.svg",revision:null},{url:"favicon.ico",revision:"89099cfae0775e3e086613bca3190493"},{url:"favicon.svg",revision:"71dcfd191507c31dc79efe3341dfa3b9"},{url:"index.html",revision:"e05a1ec92b25fdaa520f7c22f98fbecb"},{url:"maskable-icon-512x512.png",revision:"126c55dc030a58db716758479c41c570"},{url:"pwa-192x192.png",revision:"14a23cc23a2f5a3157ac52e78135346c"},{url:"pwa-512x512.png",revision:"5a051418936d2f633fc164f78b1662e1"},{url:"pwa-64x64.png",revision:"f35ebe1d2519c34b44344b0135c4f1a1"},{url:"pwa-64x64.png",revision:"f35ebe1d2519c34b44344b0135c4f1a1"},{url:"pwa-192x192.png",revision:"14a23cc23a2f5a3157ac52e78135346c"},{url:"pwa-512x512.png",revision:"5a051418936d2f633fc164f78b1662e1"},{url:"maskable-icon-512x512.png",revision:"126c55dc030a58db716758479c41c570"},{url:"manifest.webmanifest",revision:"d8a8cf08a10766f9c65694422c71f7ea"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
