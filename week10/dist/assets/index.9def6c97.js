import{P as D,S as E,C as L,B as S,M as m,a as b,G as R,R as W,b as H,A as j,D as z,W as A,O as F,c as x,d as I,V as B}from"./vendor.637cab45.js";const K=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const y of i.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&a(y)}).observe(document,{childList:!0,subtree:!0});function n(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerpolicy&&(i.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?i.credentials="include":e.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(e){if(e.ep)return;e.ep=!0;const i=n(e);fetch(e.href,i)}};K();let s,d,r,f,c,p,l,u,v=!1,h,k,M,C,O={backgroundColor:50};const g=[];function N(){U(),q(),X(),w(),G()}function U(){s=new D(50,window.innerWidth/window.innerHeight,.1,1e4),s.position.set(1e3,1e3,700),s.lookAt(0,0,0),r=new E,r.background=new L(3158064);const t=new S(50,50,50);k=new m({color:2105376,opacity:.5,transparent:!0}),h=new b(t,k),r.add(h),M=new S(50,50,50),C=new m({color:P(),opacity:.7,transparent:!0});const o=new R(1e3,20,16777215);r.add(o),u=new W,l=new B;const n=new H(1e3,1e3);n.rotateX(-Math.PI/2),p=new b(n,new m({visible:!1})),r.add(p),g.push(p);const a=new j(6316128);r.add(a);const e=new z(16777215);e.position.set(1,.75,.5).normalize(),r.add(e),c=new A({antialias:!0}),c.setPixelRatio(window.devicePixelRatio),c.setSize(window.innerWidth,window.innerHeight),d=new F(s,c.domElement),d.enableDamping=!0,d.dampingFactor=.25,d.enableZoom=!0,d.autoRotate=!0,document.body.appendChild(c.domElement),document.addEventListener("pointermove",Y),document.addEventListener("pointerdown",Z),document.addEventListener("keydown",$),document.addEventListener("keyup",J),window.addEventListener("resize",V)}function X(){new x().addColor(O,"backgroundColor").onChange(()=>{r.background=new L(O.backgroundColor),w()})}function P(){return Math.floor(Math.random()*16777215)}function q(){f=new I,document.body.appendChild(f.dom)}function V(){c.setSize(window.innerWidth,window.innerHeight),w()}function Y(t){l.set(t.clientX/window.innerWidth*2-1,-(t.clientY/window.innerHeight)*2+1),u.setFromCamera(l,s);const o=u.intersectObjects(g,!1);if(o.length>0){let n=o[0];h.position.copy(n.point).add(n.face.normal),h.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25),w()}}function Z(t){l.set(t.clientX/window.innerWidth*2-1,-(t.clientY/window.innerHeight)*2+1),C=new m({color:P(),opacity:.7,transparent:!0}),u.setFromCamera(l,s);let o=u.intersectObjects(g,!1);if(o.length>0){let n=o[0];if(v)n.object!==p&&r.remove(n.object);else{const a=new b(M,C);a.position.copy(n.point).add(n.face.normal),a.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25),r.add(a),g.push(a)}w()}}function $(t){switch(t.keyCode){case 16:v=!0;break}}function J(t){switch(t.keyCode){case 16:v=!1;break}}function w(){c.render(r,s)}function G(){requestAnimationFrame(()=>{G()}),f&&f.update()}N();
