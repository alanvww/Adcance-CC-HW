import{G as w,g as y,A as b,a as g}from"./vendor.36a1d595.js";const v=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))d(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&d(c)}).observe(document,{childList:!0,subtree:!0});function o(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerpolicy&&(n.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?n.credentials="include":i.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(i){if(i.ep)return;i.ep=!0;const n=o(i);fetch(i.href,n)}};v();function z(r){let o=new w().addFolder("timeline");o.open();let d={pause:()=>r.pause(),play:()=>r.play(),reverse:()=>r.reverse(),progress:0};o.add(d,"pause"),o.add(d,"play"),o.add(d,"reverse"),o.add(d,"progress",0,1,.01).onChange(i=>{r.play(),r.progress(i),r.pause()})}function m(r,e,o){return r*(1-o)+e*o}function h(r){return r*r}let a=y.timeline(),s=[],l=[],u=0,p=16777215,f=1,t=10;const C=r=>new Promise(e=>{r.loader.add("").load(()=>{e()})}),S=async()=>{let r=new b({antialias:!0,autoDensity:!0,resolution:2,backgroundColor:u});await C(r),document.body.appendChild(r.view),document.body.style.margin="0",r.renderer.view.style.position="absolute",r.renderer.view.style.display="block",r.renderer.resize(window.innerWidth,window.innerHeight);for(let e=0;e<t;e++){const o=new g;o.x=window.innerWidth/(t+1)*(e+1),o.y=50,r.stage.addChild(o),s.push({graph:o,size:{value:1},location:{x:o.x,y:o.y},color:{r:1,g:1,b:1}})}for(let e=0;e<t;e++){const o=new g;o.x=window.innerWidth/(t+1)*(e+.5),o.y=window.innerHeight-50,r.stage.addChild(o),l.push({graph:o,size:{value:1},location:{x:o.x,y:o.y},color:{r:1,g:1,b:1},defaultSize:1,enlargeSize:1e3})}window.addEventListener("resize",e=>{r.renderer.resize(window.innerWidth,window.innerHeight)}),z(a);for(let e=0;e<t;e++)a.to(s[e].size,{value:9,duration:h(2),onUpdate:()=>{s.forEach((o,d)=>{r.stage.addChild(o.graph)})}},"-=3");for(let e=t-1;e>=0;e--)a.to(l[e].size,{value:9,duration:h(2)},"-=3");for(let e=0;e<t;e++)a.to(s[e].graph,{duration:2,onUpdate:()=>{r.stage.removeChild(s[e].graph),x(r)}},"-=2");for(let e=0;e<t;e++)a.to(l[e].graph,{duration:3,onUpdate:()=>{P(r)}},"<");for(let e=0;e<t;e++)a.to(l[e].graph,{x:window.innerWidth/2+150*Math.cos(e/10*f*Math.PI*2),y:window.innerHeight/2+150*Math.sin(e/10*f*Math.PI*2),duration:3},"-=2");for(let e=0;e<t;e++)a.to(l[e].size,{value:1,duration:3},"-=2"),a.to(l[e].graph,{x:window.innerWidth/(t+1)*(e+1),y:window.innerHeight/2,rotation:Math.PI,duration:3},"-=3");for(let e=0;e<t;e++)a.to(l[e],{duration:m(2,2,2),defaultSize:400},"-=1");r.ticker.add(k)};function k(r){s.forEach((e,o)=>{e.graph.clear(),e.graph.lineStyle(4,16777215),e.graph.beginFill(16777215),e.graph.drawPolygon(0,0,20,25,0,75*e.size.value,-20,25),e.graph.endFill()}),l.forEach((e,o)=>{e.graph.clear(),e.graph.lineStyle(4,p),e.graph.beginFill(p),e.graph.drawPolygon(0,0,20,-25,0,-75*e.size.value,-20,-25),e.graph.scale.set(e.defaultSize,e.defaultSize),e.graph.endFill()})}S();function x(r){u=0,r.renderer.backgroundColor=u,p=16777215}function P(r){u=16777215,r.renderer.backgroundColor=u,p=0}