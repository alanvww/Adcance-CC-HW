import './style.scss';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ShaderMaterial, Shading } from 'three';

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let clock = new THREE.Clock();

let lightAmbient: THREE.AmbientLight;
let lightPoint: THREE.PointLight;

let controls: OrbitControls;
let stats: any;

let plane: THREE.Mesh;
let group: THREE.Group;
let cubeModel: THREE.Group;
let donutModel: THREE.Group;
let pyramidModel: THREE.Group;

import vertexShader from '../resources/shaders/shader.vert?raw';
import fragmentShader from '../resources/shaders/shader.frag?raw';
import planeFragmentShader from '../resources/shaders/plane.frag?raw';
import planeVertexShader from '../resources/shaders/plane.vert?raw';

let shaderMat: ShaderMaterial;
let planeShaderMat: ShaderMaterial;

function main() {
	initScene();
	initStats();
	initListeners();
}

function initStats() {
	stats = new (Stats as any)();
	document.body.appendChild(stats.dom);
}

function initScene() {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 5;

	renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	controls = new OrbitControls(camera, renderer.domElement);

	lightAmbient = new THREE.AmbientLight(0x333333);
	scene.add(lightAmbient);

	// lightAmbient = new THREE.AmbientLight(0xffffff);
	// scene.add(lightAmbient);

	// Add a point light to add shadows
	// https://github.com/mrdoob/three.js/pull/14087#issuecomment-431003830
	const shadowIntensity = 0.25;

	lightPoint = new THREE.PointLight(0xffffff);
	lightPoint.position.set(-0.5, 0.5, 4);
	lightPoint.castShadow = true;
	lightPoint.intensity = shadowIntensity;
	scene.add(lightPoint);

	lightPoint = new THREE.PointLight(0xffffff);
	lightPoint.position.set(-0.5, 0.5, 4);
	lightPoint.castShadow = true;
	lightPoint.intensity = shadowIntensity;
	scene.add(lightPoint);

	const lightPoint2 = lightPoint.clone();
	lightPoint2.intensity = 1 - shadowIntensity;
	lightPoint2.castShadow = false;
	scene.add(lightPoint2);

	const mapSize = 1024; // Default 512
	const cameraNear = 0.5; // Default 0.5
	const cameraFar = 500; // Default 500
	lightPoint.shadow.mapSize.width = mapSize;
	lightPoint.shadow.mapSize.height = mapSize;
	lightPoint.shadow.camera.near = cameraNear;
	lightPoint.shadow.camera.far = cameraFar;

	group = new THREE.Group();

	scene.add(group);

	const modelLoader = new GLTFLoader().setPath('./resources/models/');

	modelLoader.load('donut.gltf', (gltf) => {
		donutModel = gltf.scene;

		donutModel.scale.set(0.012, 0.012, 0.012);
		donutModel.position.x = 2;

		const donutMat = new THREE.MeshPhongMaterial({ color: 0xdbbb3b });

		interface gltfMesh extends THREE.Object3D<THREE.Event> {
			material: THREE.Material;
		}

		donutModel.traverse((child: THREE.Object3D<THREE.Event>) => {
			console.log(child);
			console.log(child.type === 'Mesh');
			if (child.type === 'Mesh') {
				(child as gltfMesh).material = donutMat;
			}
		});

		group.add(donutModel);
	});

	modelLoader.load('cube.gltf', (gltf) => {
		cubeModel = gltf.scene;
		console.log(cubeModel);

		cubeModel.scale.set(0.01, 0.01, 0.01);

		const cubeMat = new THREE.MeshPhongMaterial({ color: 0x2fbfae });

		interface gltfMesh extends THREE.Object3D<THREE.Event> {
			material: THREE.Material;
		}

		cubeModel.traverse((child: THREE.Object3D<THREE.Event>) => {
			console.log(child);
			console.log(child.type === 'Mesh');
			if (child.type === 'Mesh') {
				(child as gltfMesh).material = cubeMat;
			}
		});

		group.add(cubeModel);
	});

	modelLoader.load('pyramid.gltf', (gltf) => {
		pyramidModel = gltf.scene;
		console.log(pyramidModel);

		pyramidModel.scale.set(0.01, 0.01, 0.01);
		pyramidModel.position.x = -2;

		const pyramidMat = new THREE.MeshPhongMaterial({ color: 0xb70381 });

		interface gltfMesh extends THREE.Object3D<THREE.Event> {
			material: THREE.Material;
		}

		pyramidModel.traverse((child: THREE.Object3D<THREE.Event>) => {
			console.log(child);
			console.log(child.type === 'Mesh');
			if (child.type === 'Mesh') {
				(child as gltfMesh).material = pyramidMat;
			}
		});
		group.add(pyramidModel);
	});

	// Add a plane
	const geometryPlane = new THREE.PlaneBufferGeometry(10, 10, 1, 1);
	const materialPlane = new THREE.MeshPhongMaterial({
		color: 0x2fbfae,
		side: THREE.DoubleSide,
		flatShading: true,
	});

	const uniforms = {
		u_time: { type: 'f', value: 1.0 },
		u_resolution: { type: 'v2', value: new THREE.Vector2(800, 800) },
	};

	shaderMat = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		side: THREE.DoubleSide,
	});

	planeShaderMat = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: planeVertexShader,
		fragmentShader: planeFragmentShader,
		side: THREE.DoubleSide,
	});

	plane = new THREE.Mesh(geometryPlane, planeShaderMat);
	plane.rotateX(Math.PI / 2);
	plane.position.y = -3;
	scene.add(plane);

	// // Init animation
	animate();
}

function initListeners() {
	window.addEventListener('resize', onWindowResize, false);

	window.addEventListener('keydown', (event) => {
		const { key } = event;

		switch (key) {
			case 'e':
				const win = window.open('', 'Canvas Image');

				const { domElement } = renderer;

				// Makse sure scene is rendered.
				renderer.render(scene, camera);

				const src = domElement.toDataURL();

				if (!win) return;

				win.document.write(`<img src='${src}' width='${domElement.width}' height='${domElement.height}'>`);
				break;

			default:
				break;
		}
	});
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame(() => {
		animate();
	});

	const vertArray = plane.geometry.attributes.position;

	for (let i = 0; i < vertArray.count; i++) {
		vertArray.setZ(
			i,
			Math.sin(clock.getElapsedTime() + i - vertArray.count / 2) * 0.1 + Math.cos(clock.getElapsedTime() + i - vertArray.count / 2) * 0.1
		);
	}
	plane.geometry.attributes.position.needsUpdate = true;

	if (stats) stats.update();

	if (controls) controls.update();

	renderer.render(scene, camera);
}

main();
