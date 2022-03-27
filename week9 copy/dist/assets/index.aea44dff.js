import{S as z,a as E,P as F,W,b as A,O,A as k,c as _,G,d as R,M as y,e as j,D as b,f as x,g as H,C as I,V as N}from"./vendor.e0c517a1.js";const D=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const p of n.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&d(p)}).observe(document,{childList:!0,subtree:!0});function l(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(e){if(e.ep)return;e.ep=!0;const n=l(e);fetch(e.href,n)}};D();var T=`precision mediump float;

uniform float u_time;

varying vec2 UV;

void main(){
	UV = uv;
	vec4 mvPosition = modelViewMatrix*vec4(position,1.);
	mvPosition.y += sin(u_time / 2. + uv.x) ;
	mvPosition.x -= cos(u_time / 2. + uv.y) ;
	gl_Position = projectionMatrix*mvPosition;
}`,$=`precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 UV;

void main(void){
	vec2 position = UV * 1. - 1.;
	
	float red = abs( 
		sin(position.x * position.y + u_time )
	);
	float green = abs( 
		sin(position.x + u_time) 
	);
	float blue = abs( 
		sin(position.x * position.y + u_time*10.) 
	);

	gl_FragColor=vec4(red, green, blue, 1.0);
}`,q=`precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 UV;

void main(void){
	vec2 position = UV * 2. - 1.;
	
	float red = abs( 
		sin(position.y + u_time / 5.)
	);
	float green = abs( 
		sin(position.x  + u_time / 5.) 
	);
	float blue = abs( 
		sin(position.x * position.y + u_time) 
	);

	gl_FragColor=vec4(red, green, blue, 1.0);
}`,K=`precision mediump float;

uniform float u_time;

varying vec2 UV;

void main(){
	UV = uv;
	vec4 mvPosition = modelViewMatrix*vec4(position,1.);
	mvPosition.y += sin(u_time / 2. + uv.x) * 2.0;
	mvPosition.x += cos(u_time / 1.3 + uv.y) * 2.0;
	gl_Position = projectionMatrix*mvPosition;
}`;let s,r,c,L=new I,V,o,P,M,u,v,g,h,m,C;function X(){B(),Z(),J()}function Z(){M=new z,document.body.appendChild(M.dom)}function B(){r=new E,c=new F(75,window.innerWidth/window.innerHeight,.1,1e3),c.position.z=5,s=new W,s.shadowMap.enabled=!0,s.shadowMap.type=A,s.setPixelRatio(window.devicePixelRatio),s.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(s.domElement),P=new O(c,s.domElement),V=new k(3355443),r.add(V);const a=.25;o=new _(16777215),o.position.set(-.5,.5,4),o.castShadow=!0,o.intensity=a,r.add(o),o=new _(16777215),o.position.set(-.5,.5,4),o.castShadow=!0,o.intensity=a,r.add(o);const t=o.clone();t.intensity=1-a,t.castShadow=!1,r.add(t);const l=1024,d=.5,e=500;o.shadow.mapSize.width=l,o.shadow.mapSize.height=l,o.shadow.camera.near=d,o.shadow.camera.far=e,v=new G,r.add(v);const n=new R().setPath("./resources/models/");n.load("donut.gltf",f=>{h=f.scene,h.scale.set(.012,.012,.012),h.position.x=2;const w=new y({color:14400315});h.traverse(i=>{console.log(i),console.log(i.type==="Mesh"),i.type==="Mesh"&&(i.material=w)}),v.add(h)}),n.load("cube.gltf",f=>{g=f.scene,console.log(g),g.scale.set(.01,.01,.01);const w=new y({color:3129262});g.traverse(i=>{console.log(i),console.log(i.type==="Mesh"),i.type==="Mesh"&&(i.material=w)}),v.add(g)}),n.load("pyramid.gltf",f=>{m=f.scene,console.log(m),m.scale.set(.01,.01,.01),m.position.x=-2;const w=new y({color:11993985});m.traverse(i=>{console.log(i),console.log(i.type==="Mesh"),i.type==="Mesh"&&(i.material=w)}),v.add(m)});const p=new j(10,10,1,1);new y({color:3129262,side:b,flatShading:!0});const S={u_time:{type:"f",value:1},u_resolution:{type:"v2",value:new N(800,800)}};new x({uniforms:S,vertexShader:T,fragmentShader:$,side:b}),C=new x({uniforms:S,vertexShader:K,fragmentShader:q,side:b}),u=new H(p,C),u.rotateX(Math.PI/2),u.position.y=-3,r.add(u),U()}function J(){window.addEventListener("resize",Q,!1),window.addEventListener("keydown",a=>{const{key:t}=a;switch(t){case"e":const l=window.open("","Canvas Image"),{domElement:d}=s;s.render(r,c);const e=d.toDataURL();if(!l)return;l.document.write(`<img src='${e}' width='${d.width}' height='${d.height}'>`);break}})}function Q(){c.aspect=window.innerWidth/window.innerHeight,c.updateProjectionMatrix(),s.setSize(window.innerWidth,window.innerHeight)}function U(){requestAnimationFrame(()=>{U()});const a=u.geometry.attributes.position;for(let t=0;t<a.count;t++)a.setZ(t,Math.sin(L.getElapsedTime()+t-a.count/2)*.1+Math.cos(L.getElapsedTime()+t-a.count/2)*.1);u.geometry.attributes.position.needsUpdate=!0,M&&M.update(),P&&P.update(),s.render(r,c)}X();
