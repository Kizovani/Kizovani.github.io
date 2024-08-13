import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';


let camera, scene, renderer, effect;
let controls;
let model, mixer;
let loadingText;
let rotatingLight;

function init() {

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.03, 1000);
    //set camera 5.22 0 20722763520716875
    //Camera position: 
    // Object { x: -0.0026036433760515828, y: 0.019226904930842455, z: 0.13303919878904805 }

    camera.lookAt(0, 0, 0);
    camera.position.set(0.00, 0.00, 0.18);
    

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0, 0, 0);

    window.addEventListener('keydown', logCameraPosition);



    //ligthing incase you need to see everything

    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    // scene.add(ambientLight);

    // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    // directionalLight.position.set(5, 5, 5);
    // scene.add(directionalLight);

    // const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.7);
    // directionalLight.position.set(2, 0, 2);
    // scene.add(directionalLight2);

    // const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.7);
    // directionalLight.position.set(0, 0, 2);
    // scene.add(directionalLight3);

    // Add a rotating light
    rotatingLight = new THREE.DirectionalLight(0xffffff, 1);
    rotatingLight.position.set(2, 0, 0); // Start position
    scene.add(rotatingLight);

    // Add ambient light to ensure the scene isn't too dark
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const slider = document.getElementById('light-rotation-slider');
    slider.addEventListener('input', updateLightPosition);

    function updateLightPosition() {
        const slider = document.getElementById('light-rotation-slider');
        const angle = slider.value * (Math.PI / 180);
        rotatingLight.position.x = Math.cos(angle) * 2;
        rotatingLight.position.z = Math.sin(angle) * 2;
    }
    
        // Create loading text
        const loader = new FontLoader();
        loader.load('res/fonts/helvetiker_regular.typeface.json', function(font) {
            const geometry = new TextGeometry('LOADING', {
                font: font,
                size: 0.3,
                height: 0.1,
                curveSegments: 12,
                bevelEnabled: false,
            });
            
            // Center the geometry
            geometry.computeBoundingBox();
            const textWidth = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
            const textHeight = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
            geometry.translate(-textWidth / 2, -textHeight / 2, 0);

            const material = new THREE.MeshPhongMaterial({color: 0xffffff});
            loadingText = new THREE.Mesh(geometry, material);
            
            // Position the text in front of the camera
            loadingText.position.set(0, 0, -1);  // Adjust the z value as needed
            
            // Make the text face the camera
            loadingText.lookAt(camera.position);
            
            scene.add(loadingText);
        });

    // Add helpers
    // const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);

    // const gridHelper = new THREE.GridHelper(10, 10);
    // scene.add(gridHelper);


    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    //ascii effect:
    effect = new AsciiEffect(renderer, ' .:-+*=%@#', { 
        invert: true,
        //I wanted to use 0.235 but for some reason it gets cutoff the right side when I do, no clue why, 0.2 is the highest resolution I can use without getting cutoff at the right side
        resolution: 0.2
        
    });
    effect.setSize(window.innerWidth, window.innerHeight);
    effect.domElement.style.color = 'white';
    effect.domElement.style.backgroundColor = 'black';


    document.getElementById('three-js-container').appendChild(effect.domElement);

    controls = new OrbitControls(camera, effect.domElement);

    loadModel();

    window.addEventListener('resize', onWindowResize);
}

function logCameraPosition(event) {
    // Log camera position when 'L' key is pressed
    if (event.key.toLowerCase() === 'l') {
        console.log('Camera position:', camera.position);
        console.log('Camera rotation:', camera.rotation);
        console.log('Controls target:', controls.target);
    }
}

function loadModel() {
    const loader = new GLTFLoader();

    //simple material to use for all meshes instead of bundled materials:
    const simpleMaterial = new THREE.MeshPhongMaterial({
color: 0xcccccc,  // Light gray color
flatShading: true  // This gives a more polygon-like appearance
});

    loader.load(
        //full size (full poly count) model:
        //'models/scene.gltf',
        // //low poly model (load times a bit better and alot less system intensive, might lower model count more, also please change this file name lmfao):
        //'res/models/lowpoly_textures/test3/test0.2then0.5then0.25.gltf',
        //model with no "backpack" since the backpack was interfering when I wanted to mesh it with a blank mesh:
        'res/models/NEW ANGEL MODEL NO BACKPACK/no backpack.gltf',
        function(gltf) {
            console.log('Model loaded successfully');
            model = gltf.scene;

            // Set the material for all meshes in the model
            model.traverse((child) => {
                if (child.isMesh) {
                    // Remove any texture-related properties
                    child.material = simpleMaterial.clone();  // Clone to allow for individual adjustments if needed
                    child.material.map = null;
                    child.material.normalMap = null;
                    child.material.specularMap = null;
                    child.material.alphaMap = null;
                }
            });
            
            scene.add(model);

            // Center the model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);

            // Scale the model if it's too small or too large
            const scaleAdjustment = 6; // Adjust this value as needed
            model.scale.multiplyScalar(scaleAdjustment);

            console.log('Model position:', model.position);
            console.log('Model scale:', model.scale);

            model.position.y -=0.11; //moving the model down a bit

            // Set up animation
            if (gltf.animations && gltf.animations.length > 0) {
                mixer = new THREE.AnimationMixer(model);
                const action = mixer.clipAction(gltf.animations[0]);
                action.play();
            }

            // Remove loading text
            if (loadingText) {
                scene.remove(loadingText);
            }
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function(error) {
            console.error('An error happened', error);
        }
    );
}

function animate() {
    
    requestAnimationFrame(animate);

    if (loadingText) {
        loadingText.rotation.y += 0.005;
    }
    console.log('Camera position:', camera.position);

    if (mixer) {
        mixer.update(0.016);
    }

    controls.update();
    //renderer.render(scene, camera);
    //ascii effect below:
    effect.render(scene, camera)
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    effect.setSize(window.innerWidth, window.innerHeight);
}

export function initThreeScene() {
    init();
    animate();
}