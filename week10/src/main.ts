import './style.scss';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module';
import * as DAT from 'dat.gui';

let camera: THREE.Camera;
let controls: OrbitControls;
let scene: THREE.Scene;
let stats: any;
let renderer: THREE.WebGLRenderer;
let plane: THREE.Mesh;
let pointer: THREE.Vector2;
let raycaster: THREE.Raycaster;
let isShiftDown = false;
let rollOverMesh: THREE.Mesh;
let rollOverMaterial: THREE.MeshBasicMaterial;
let cubeGeo: THREE.BoxGeometry;
let cubeMaterial: THREE.MeshBasicMaterial;

let intersects = [];

let model = {
	backgroundColor: 50,
};

const objects: THREE.Mesh[] = [];

function main() {
	init();
	initStats();
	initGUI();
	render();
	animate();
}

function init() {
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
	camera.position.set(1000, 1000, 700);
	camera.lookAt(0, 0, 0);

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x303030);

	// roll-over helpers

	const rollOverGeo = new THREE.BoxGeometry(50, 50, 50);
	rollOverMaterial = new THREE.MeshBasicMaterial({ color: 0x202020, opacity: 0.5, transparent: true });
	rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
	scene.add(rollOverMesh);

	// cubes

	cubeGeo = new THREE.BoxGeometry(50, 50, 50);
	cubeMaterial = new THREE.MeshBasicMaterial({ color: colorRandom(), opacity: 0.7, transparent: true });

	// grid

	const gridHelper = new THREE.GridHelper(1000, 20, 0xffffff);
	scene.add(gridHelper);

	//

	raycaster = new THREE.Raycaster();
	pointer = new THREE.Vector2();

	const geometry = new THREE.PlaneGeometry(1000, 1000);
	geometry.rotateX(-Math.PI / 2);

	plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
	scene.add(plane);

	objects.push(plane);

	// lights

	const ambientLight = new THREE.AmbientLight(0x606060);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(1, 0.75, 0.5).normalize();
	scene.add(directionalLight);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.enableZoom = true;
	controls.autoRotate = true;

	document.body.appendChild(renderer.domElement);

	document.addEventListener('pointermove', onPointerMove);
	document.addEventListener('pointerdown', onPointerDown);
	document.addEventListener('keydown', onDocumentKeyDown);
	document.addEventListener('keyup', onDocumentKeyUp);

	//

	window.addEventListener('resize', onWindowResize);
}

function initGUI() {
	const gui = new DAT.GUI();
	gui.addColor(model, 'backgroundColor').onChange(() => {
		scene.background = new THREE.Color(model.backgroundColor);
		render();
	});
}

function colorRandom() {
	return Math.floor(Math.random() * 0xffffff);
}

function initStats() {
	stats = new (Stats as any)();
	document.body.appendChild(stats.dom);
}

function onWindowResize(): void {
	renderer.setSize(window.innerWidth, window.innerHeight);

	render();
}

function onPointerMove(event: { clientX: number; clientY: number }) {
	pointer.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);

	raycaster.setFromCamera(pointer, camera);

	const intersects = raycaster.intersectObjects(objects, false);

	if (intersects.length > 0) {
		let intersect = intersects[0];

		rollOverMesh.position.copy(intersect.point).add(intersect.face!.normal);
		rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);

		render();
	}
}

function onPointerDown(event: { clientX: number; clientY: number }) {
	pointer.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
	cubeMaterial = new THREE.MeshBasicMaterial({ color: colorRandom(), opacity: 0.7, transparent: true });

	raycaster.setFromCamera(pointer, camera);

	let intersects = raycaster.intersectObjects(objects, false);

	if (intersects.length > 0) {
		let intersect = intersects[0];

		// delete cube

		if (isShiftDown) {
			if (intersect.object !== plane) {
				scene.remove(intersect.object);
			}

			// create cube
		} else {
			const voxel = new THREE.Mesh(cubeGeo, cubeMaterial);
			voxel.position.copy(intersect.point).add(intersect.face!.normal);
			voxel.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
			scene.add(voxel);

			objects.push(voxel);
		}

		render();
	}
}

function onDocumentKeyDown(event: { keyCode: any }) {
	switch (event.keyCode) {
		case 16:
			isShiftDown = true;
			break;
	}
}

function onDocumentKeyUp(event: { keyCode: any }) {
	switch (event.keyCode) {
		case 16:
			isShiftDown = false;
			break;
	}
}

function render() {
	renderer.render(scene, camera);
}

function animate() {
	requestAnimationFrame(() => {
		animate();
	});
	if (stats) stats.update();
}

main();
