//TODO: CHECK TO MAKE SURE MODEL IS CENTERED?!@?!?!?!?
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier.js';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

//waits for three scene to be fully loaded before adding dom elements


let camera, scene, renderer, effect;
let controls;
let model, mixer;
let loadingText;
let rotatingLight;
let ambientLight;

function initThreeScene() {

    //set up camera, lighting, renderer, and effect
    
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.005 , 1000);
    camera.lookAt(0 , 0 , 0);
    camera.position.set(0 , 0 , 0.15);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0 , 0 , 0);

    rotatingLight= new THREE.DirectionalLight(0xffffff , 1);
    scene.add(rotatingLight);

    ambientLight= new THREE.AmbientLight(0x404040 , 1);
    scene.add(ambientLight);

    //render and ascii effect

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth , window.innerHeight);

    effect = new AsciiEffect(renderer, ' .:-+*=%@#' , {
        invert: true,
        resolution: 0.2
    });

    effect.setSize(window.innerWidth , window.innerHeight);
    effect.domElement.style.color = 'white';
    effect.domElement.style.backgroundColor = 'black';

    //append to container when container is available
    const container = document.getElementById('three-js-container');
    if (container) {
        container.appendChild(effect.domElement);
    } else {
        console.warn('three js container not found appending to body instead');
        document.body.appendChild(effect.domElement);
    }

    controls = new OrbitControls(camera , effect.domElement);
    
    window.addEventListener('resize' , onWindowResize);

    // Add helpers (if needed)
    // const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);

    // const gridHelper = new THREE.GridHelper(10, 10);
    // scene.add(gridHelper);

    //setup loading text
    createLoadingText();

    //load loading text and model
    // loadModel();
    loadModelBasic();

    //start animation loop
    animate();

}

function initDOMControls() {

    const slider = document.getElementById('light-rotation-slider');
    updateLightPosition(0);
    slider.addEventListener('input', updateLightPosition);

        // Set up ambient light switch
        const ambientLightSwitch = document.getElementById('ambient-light-toggle');
        ambientLight.visible = true;
        if (ambientLightSwitch) {
            ambientLightSwitch.addEventListener('change', () => {
                ambientLight.visible = ambientLightSwitch.checked;
            });
            // Set initial state
            ambientLight.visible = ambientLightSwitch.checked;
        } else {
            console.warn('Ambient light switch not found');
        }
    }

function createLoadingText() {
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
    
}

    function updateLightPosition() {
        const slider = document.getElementById('light-rotation-slider');
        const angle = slider.value * (Math.PI / 180);
        rotatingLight.position.x = Math.cos(angle) * 2;
        rotatingLight.position.z = Math.sin(angle) * 2;
    }

// //camera position in case needed
// function logCameraPosition(event) {
//     // Log camera position when 'L' key is pressed
//     if (event.key.toLowerCase() === 'l') {
//         console.log('Camera position:', camera.position);
//         console.log('Camera rotation:', camera.rotation);
//         console.log('Controls target:', controls.target);
//     }
// }


// //old code (i hope the new one works) (it does i need to remove this soon, leaving it here for the time being sicne it is not harming anyone)
// function loadModel() {
//     const loader = new GLTFLoader();

//     //simple material to use for all meshes instead of bundled materials:
//     const simpleMaterial = new THREE.MeshPhongMaterial({
// color: 0xcccccc,  // Light gray color
// flatShading: true  // This gives a more polygon-like appearance
// });

//     loader.load(
//         //full size (full poly count) model:
//         //'models/scene.gltf',
//         // //low poly model (load times a bit better and alot less system intensive, might lower model count more, also please change this file name lmfao):
//         //'res/models/lowpoly_textures/test3/test0.2then0.5then0.25.gltf',
//         //model with no "backpack" since the backpack was interfering when I wanted to mesh it with a blank mesh:
//         'res/models/NEW ANGEL MODEL NO BACKPACK/no backpack.gltf',
//         function(gltf) {
//             console.log('Model loaded successfully');
//             model = gltf.scene;

//             // Set the material for all meshes in the model
//             model.traverse((child) => {
//                 if (child.isMesh) {
//                     // Remove any texture-related properties
//                     child.material = simpleMaterial.clone();  // Clone to allow for individual adjustments if needed
//                     child.material.map = null;
//                     child.material.normalMap = null;
//                     child.material.specularMap = null;
//                     child.material.alphaMap = null;
//                 }
//             });
            
//             scene.add(model);

//             // Center the model
//             const box = new THREE.Box3().setFromObject(model);
//             const center = box.getCenter(new THREE.Vector3());
//             model.position.sub(center);

//             // Scale the model if it's too small or too large
//             const scaleAdjustment = 6; // Adjust this value as needed
//             model.scale.multiplyScalar(scaleAdjustment);

//             console.log('Model position:', model.position);
//             console.log('Model scale:', model.scale);

//             model.position.y -=0.11; //moving the model down a bit

//             // Set up animation
//             if (gltf.animations && gltf.animations.length > 0) {
//                 mixer = new THREE.AnimationMixer(model);
//                 const action = mixer.clipAction(gltf.animations[0]);
//                 action.play();
//             }

//             // Remove loading text
//             if (loadingText) {
//                 scene.remove(loadingText);
//             }

//             // dispatch a custom event to trigger the text reveal
//             window.dispatchEvent(new Event('modelLoaded'));

//         },
//         function(xhr) {
//             console.log((xhr.loaded / xhr.total * 100) + '% loaded');
//         },
//         function(error) {
//             console.error('An error happened', error);
//         }
//     );
// }

function animate() {
    
    requestAnimationFrame(animate);

    if (loadingText) {
        loadingText.rotation.y += 0.005;
    }

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

document.addEventListener('DOMContentLoaded', () => {
    initThreeScene();
    initDOMControls();
});


function loadModelBasic() {
    const loader = new GLTFLoader();

    loader.load(
        'res/models/NEW ANGEL MODEL NO BACKPACK/no backpack.gltf',
        function(gltf) {
            console.log('Model loaded successfully');
            model = gltf.scene;

            // Log model structure without stringification
            console.log('Model scene:', model);
            console.log('Animations:', gltf.animations);

            // Log children of the model
            model.traverse((child) => {
                console.log('Child:', child.type, child.name);
                if (child.isMesh) {
                    console.log('- Geometry:', child.geometry.type, 'Vertices:', child.geometry.attributes.position.count);
                    console.log('- Material:', child.material.type);
                }
            });

            // Add model to scene without any modifications
            scene.add(model);

            // Center the model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);

            // Scale the model
            const scaleAdjustment = 6;
            model.scale.multiplyScalar(scaleAdjustment);

            model.position.y -= 0.11;

            // Apply material adjustments
            adjustModelMaterials();

            // Set up animation if available
            if (gltf.animations && gltf.animations.length > 0) {
                mixer = new THREE.AnimationMixer(model);
                const action = mixer.clipAction(gltf.animations[0]);
                action.play();
            }

            // Remove loading text
            if (loadingText) {
                scene.remove(loadingText);
            }

            // Dispatch a custom event to trigger the text reveal
            window.dispatchEvent(new Event('modelLoaded'));

            // Force a render after model is loaded
            effect.render(scene, camera);
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function(error) {
            console.error('An error happened during model loading:', error);
        }
    );
}

function adjustModelMaterials() {
    model.traverse((child) => {
        if (child.isMesh) {
            // Enable depth writing for transparent materials
            if (child.material.transparent) {
                child.material.depthWrite = true;
            }
            
            // Disable frustum culling for all meshes
            child.frustumCulled = false;
            
            // Optionally, adjust the rendering order
            child.renderOrder = 1;
        }
    });
}