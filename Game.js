import * as THREE from "three";
import {MindARThree} from "mindar-image-three";
import { GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {createLights} from "./lights.js";
import { gameScene} from './gameAssets.js';
import Stats from 'https://unpkg.com/three@0.125.2/examples/jsm/libs/stats.module.js'


var anchor = "";
var stats = "";

var cubeHook; //hook 3d model

var renderClawAnim = function() {
  // rotate the cube
  if (cubeHook.position.z > 0) {
    requestAnimationFrame(renderClawAnim);
    // rotate the cube
    cubeHook.position.z -= 0.01;
    console.log("loop anim claw!!");
  }
};

class Game {

  constructor(containerAR) {
   //Debug FPS
    stats = new Stats()
    document.body.appendChild(stats.dom)

     //Init MindAR
    this.mindarThree = new MindARThree({
      container: containerAR,
      imageTargetSrc: "./assets/targets.mind",
    });

    const {renderer,scene,camera} = this.mindarThree;
    this.renderer = renderer;
    this.scene = scene; 
    this.camera = camera;

    anchor = this.mindarThree.addAnchor(0);

    //Add light
    const ambientLight = createLights();
    this.scene.add(ambientLight);
  }


  async init() {

    //---- AR CONTENT -----------------------------
    const geometryCubeHook = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const materialCubeHook = new THREE.MeshBasicMaterial({
      color: 0x00ffff
    });

    cubeHook = new THREE.Mesh(geometryCubeHook, materialCubeHook);
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

    const {bottleCoke} = await gameScene();

    //Add elements to AR scene
    bottleCoke.scale.set(3, 3, 3); 
    anchor.group.add(bottleCoke);


    var cokeInstances = [];
    var totalClone = 10; 
    var posXClone = -0.8;

    for(var i = 0; i < totalClone; i ++){

      cokeInstances[i] = bottleCoke.clone();
      posXClone -= 0.8;
      cokeInstances[i].position.set(posXClone,0,0);
      anchor.group.add(cokeInstances[i]);
    }
    


  }


  async start() {
    console.log("START PRESSED");
    await this.mindarThree.start();

    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera);
      stats.update();

      //console.log("RENDER AR LOOP");
    });
  }

  stop(){

      this.mindarThree.stop();
      this.mindarThree.renderer.setAnimationLoop(null);
  }


  moveHookLeft(){
    console.log("Move left!!!");
    cubeHook.position.x += 0.09;
  }

   moveHookRight(){
    console.log("Move right!!!");
    cubeHook.position.x -= 0.09;
  }

  moveHookUp(){
    console.log("Move up!!!");
  cubeHook.position.y -= 0.09;
  }

  moveHookDown(){
    console.log("Move down!!!");
    cubeHook.position.y += 0.09;
  }

  grab(){
    console.log("Grab!!!");
    console.log(cubeHook.position.z);
    renderClawAnim();

  }

}




export { Game };

/*


//------LISTENER EVENTS----

//Claw movement





const grabButton = document.querySelector("#grab");
grabButton.addEventListener("click", () => {

});

//Claw grab animation
// define an animation loop
var renderClawAnim = function() {
  // rotate the cube
  if (cubeHook.position.z > 0) {
    requestAnimationFrame(renderClawAnim);
    // rotate the cube
    cubeHook.position.z -= 0.01;
    console.log("loop anim claw!!");
  }
};*/