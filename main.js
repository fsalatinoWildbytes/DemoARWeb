import * as THREE from "three";
import { MindARThree } from "mindar-image-three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { createLights } from "./lights.js";

//Init MindAR
const mindarThree = new MindARThree({
  container: document.querySelector("#container"),
  imageTargetSrc:
    "./assets/targets.mind",
});

// ------------------- INIT SCENE ---------------------

const { renderer, scene, camera } = mindarThree;
const anchor = mindarThree.addAnchor(0);

console.log(camera);

//Add light
const ambientLight = createLights();
scene.add(ambientLight);

//-----------------------------------------------------

//---- AR CONTENT -----------------------------
const geometryCubeHook = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const materialCubeHook = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const cubeHook = new THREE.Mesh(geometryCubeHook, materialCubeHook);
cubeHook.position.z = 2;

const geometryContainer = new THREE.BoxGeometry(1, 1, 3);
const materialContainer = new THREE.MeshBasicMaterial({
  color: 0x000000,
  transparent: true,
  opacity: 0.2,
});
const cubeContainer = new THREE.Mesh(geometryContainer, materialContainer);
cubeContainer.position.z = 1.5;

//Add content to AR scene
anchor.group.add(cubeHook);
anchor.group.add(cubeContainer);

const loader = new GLTFLoader();

loader.load(
  "./assets/3d_models/botella.gltf",
  async function (gltf) {
    const model = gltf.scene;
    //console.log( gltf.scene);
    model.scale.set(5, 5, 5);
    anchor.group.add(model);



    // wait until the model can be added to the scene without blocking due to shader compilation
    /*await renderer.compileAsync(model, camera, scene);
    console.log("model loaded!");
    model.position.set(0, 0, 0);
    model.scale.set(5, 5, 5);
      
    anchor.group.add(model);*/
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const start = async () => {
  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
};

//------LISTENER EVENTS----

//Start - Stop AR Camera
const startButton = document.querySelector("#startButton");
startButton.addEventListener("click", () => {
  start();
});

const stopButton = document.querySelector("#stopButton");
stopButton.addEventListener("click", () => {
  mindarThree.stop();
  mindarThree.renderer.setAnimationLoop(null);
});

//Claw movement
const upButton = document.querySelector("#moveUp");
upButton.addEventListener("click", () => {
  console.log("Move up!!!");
  cubeHook.position.y -= 0.09;
});

const downButton = document.querySelector("#moveDown");
downButton.addEventListener("click", () => {
  console.log("Move down!!!");
  cubeHook.position.y += 0.09;
});

const leftButton = document.querySelector("#moveLeft");
leftButton.addEventListener("click", () => {
  console.log("Move left!!!");
  cubeHook.position.x += 0.09;
});

const rightButton = document.querySelector("#moveRight");
rightButton.addEventListener("click", () => {
  console.log("Move right!!!");
  cubeHook.position.x -= 0.09;
});

const grabButton = document.querySelector("#grab");
grabButton.addEventListener("click", () => {
  console.log("Grab!!!");
  console.log(cubeHook.position.z);
  render();
});

//Claw grab animation
// define an animation loop
var render = function () {
  // rotate the cube
  if (cubeHook.position.z > 0) {
    requestAnimationFrame(render);
    // rotate the cube
    cubeHook.position.z -= 0.01;

    renderer.render(scene, camera);
  }
};
