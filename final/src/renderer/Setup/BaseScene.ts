import * as THREE from 'three';

export class BaseScene {
	scene: THREE.Scene;
	renderer: THREE.WebGLRenderer;

	constructor() {
		this.scene = new THREE.Scene();
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	}

	onWindowResize() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
}
