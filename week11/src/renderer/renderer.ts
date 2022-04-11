import './style.css';
import * as THREE from 'three';
import { Raycaster, Scene, ShaderMaterial, Shading, Vector2 } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as DAT from 'dat.gui';

import vertexShader from './assets/shaders/shader.vert';
import fragmentShader from './assets/shaders/shader.frag';
import planeFragmentShader from './assets/shaders/plane.frag';
import planeVertexShader from './assets/shaders/plane.vert';

import { ViewOne } from './Views/ViewOne';
import { BaseView } from './Views/BaseView';
import { ViewTwo } from './Views/ViewTwo';

import cubePath from './assets/models/cube.gltf';
import donutPath from './assets/models/donut.gltf';
import pyramidPath from './assets/models/pyramid.gltf';

let model = {
	groupX: 0,
	groupY: 0,
	groupAngle: 0,
	activeView: 0,
	vertexShader: vertexShader,
	fragmentShader: fragmentShader,
};

let renderer: THREE.WebGLRenderer;
let clock = new THREE.Clock();
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: OrbitControls;
let stats: any;
let raycaster: THREE.Raycaster;
let pointerPosition: THREE.Vector2;
let viewOne: ViewOne;
let viewTwo: ViewTwo;
let views: BaseView[] = [];

let lightAmbient: THREE.AmbientLight;
let lightPoint: THREE.PointLight;

let plane: THREE.Mesh;
let group: THREE.Group;
let cubeModel: THREE.Group;
let donutModel: THREE.Group;
let pyramidModel: THREE.Group;

let shaderMat: ShaderMaterial;
let planeShaderMat: ShaderMaterial;

function main() {
	// loadShaders()
	initScene();
	initStats();
	initListeners();
}

function initStats() {
	stats = new (Stats as any)();
	document.body.appendChild(stats.dom);
}

function initGUI() {
	const gui = new DAT.GUI();
	gui.add(model, 'groupX', -4, 4, 0.1);
	gui.add(model, 'groupY', -3, 3, 0.1);
	gui.add(model, 'groupAngle', -Math.PI, Math.PI, 0.1).listen();
}

function initScene() {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
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

	let modelLoader = new GLTFLoader();

	modelLoader.load(donutPath, (gltf) => {
		donutModel = gltf.scene;

		donutModel.scale.set(0.012, 0.012, 0.012);
		donutModel.position.x = 0;

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
	window.electronAPI.handleBackground((event: any, value: any) => {
		console.log(event);
		console.log(value);
		scene.background = new THREE.Color(value);
	});

	window.electronAPI.updatePositionX((event: any, value: any) => {
		console.log(event);
		console.log(value);
		group.position.z = value * -Math.PI;
	});

	window.addEventListener('resize', onWindowResize, false);
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
	if (stats) stats.update();

	if (controls) controls.update();

	renderer.render(scene, camera);
}

main();

interface MeshObj extends THREE.Object3D<THREE.Event> {
	material: THREE.MeshPhongMaterial;
}

interface gltfMesh extends THREE.Object3D<THREE.Event> {
	material: THREE.Material;
}

interface ColorMaterial extends THREE.Material {
	color: THREE.Color;
}

export interface IElectronAPI {
	handleBackground: (callback: (event: any, value: any) => void) => void;
	updatePositionX: (callback: (event: any, value: any) => void) => void;
}

declare global {
	interface Window {
		electronAPI: IElectronAPI;
	}
}
