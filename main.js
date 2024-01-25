import * as THREE from "https://unpkg.com/three/build/three.module.js";
import {ARButton} from "https://unpkg.com/three/examples/jsm/webxr/ARButton.js";

document.addEventListener("DOMContentLoaded", () => {
    

    const createModel = (scene) => {
        // create geometries to repeat building form
        const geometry = new THREE.BoxGeometry(0.15, 0.02, 0.01);
        const geometry1 = new THREE.BoxGeometry(0.05, 0.02, 0.01);
        const geometry3 = new THREE.BoxGeometry(0.02, 0.06, 0.01);
        const geometry2 = new THREE.BoxGeometry(0.02, 0.04, 0.01);
        const geometry4 = new THREE.BoxGeometry(0.04, 0.04, 0.05);
        
        // Load texture
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('./brick_diffuse.jpg');
        // create materiaal
        const material = new THREE.MeshBasicMaterial({ map: texture });

        // create rectangles using geometries and material to create a building model
        const rectangle1 = new THREE.Mesh(geometry, material);
        const angle = Math.PI / 32; 
        rectangle1.position.set(0.02, 0.1, -0.5);
        rectangle1.rotation.z = angle;
        scene.add(rectangle1);

        const rectangle2 = new THREE.Mesh(geometry1, material);
        rectangle2.position.set(-0.03, 0.025, -0.5);
        scene.add(rectangle2);

        const rectangle3 = new THREE.Mesh(geometry2, material);
        rectangle3.position.set(0.085, 0.08, -0.5);
        scene.add(rectangle3);

        const rectangle4 = new THREE.Mesh(geometry3, material);
        rectangle4.position.set(-0.045, 0.065, -0.5);
        scene.add(rectangle4);

        const rectangle5 = new THREE.Mesh(geometry4, material);
        rectangle5.position.set(0.015, 0.035, -0.5);
        scene.add(rectangle5);
    }

    const initialize = async() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
        camera.far = 3000;
        const renderer = new

        THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        
        document.body.appendChild(renderer.domElement);
        createModel(scene);
        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);
        renderer.xr.enabled = true;
        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
        const arButton = ARButton.createButton(renderer, {
            optionalFeatures: ["dom-overlay"],
            domOverlay: {root: document.body}
        });
        document.body.appendChild(arButton);
    }
    initialize();
});
