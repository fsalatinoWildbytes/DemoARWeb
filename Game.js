import * as THREE from "three";
import { MindARThree } from "mindar-image-three";
import { GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import { createLights } from "./lights.js";
import { gameScene} from './gameAssets.js';
import Stats from 'https://unpkg.com/three@0.125.2/examples/jsm/libs/stats.module.js'
import config from './config.json' assert { type: 'json' };

var anchorsAR = [];
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


    //Read config file
    var markerARPath = config.marker_ar;//.mind can include multiple markers ( = anchors )
    console.log(config.marker_ar);

     //Init MindAR
    this.mindarThree = new MindARThree({
      container: containerAR,
      imageTargetSrc: markerARPath,
      filterMinCF: 0.0005,
      filterBeta: 0.0001,
      warmupTolerance: 3,
      missTolerance: 20,
      maxTrack: 2,
    });




    const {renderer,scene,camera} = this.mindarThree;
    this.renderer = renderer;
    this.scene = scene; 
    this.camera = camera;

    console.log(this.mindarThree)

    for(var i = 0; i < config.total_ar_markers; i++){
      var anchor = this.mindarThree.addAnchor(i);
    }

    anchorsAR = this.mindarThree.anchors;
    console.log(anchorsAR)

    /*var anchor = this.mindarThree.addAnchor(1);
    var anchor1 = this.mindarThree.addAnchor(0);


    console.log(this.mindarThree.anchors);
    anchorsAR = this.mindarThree.anchors;*/

    //Add light
    //const ambientLight = createLights();
    //this.scene.add(ambientLight);
  }


  async init() {

    //---- AR CONTENT -----------------------------
    const geometryCubeHook = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const materialCubeHook = new THREE.MeshBasicMaterial({
      color: 0x00ffff
    });

    cubeHook = new THREE.Mesh(geometryCubeHook, materialCubeHook);
    cubeHook.position.z = 2;

    const geometryContainer = new THREE.BoxGeometry(1, 1, 1);
    const materialContainer = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.2,
    });
    const cubeContainer = new THREE.Mesh(geometryContainer, materialContainer);
    //cubeContainer.position.z = 1.5;

    const geometry = new THREE.PlaneGeometry( 2, 2 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    plane.position.set(0,0,0);
    //anchor.group.add(plane);

    for(var i = 0; i < config.total_ar_markers; i++){
      console.log("ADD plane to Anchor = " + i);
      anchorsAR[i].group.add(plane);
    }

      console.log("plane added!!");

     console.log(anchorsAR)

    //Add content to AR scene
    //anchor.group.add(cubeHook);
    cubeContainer.position.set(0,0,0);
    //anchor.group.add(cubeContainer);

    for(var i = 0; i < config.total_ar_markers; i++){
      anchorsAR[i].group.add(cubeContainer);
    }

    const {bottleCoke, machine, cube} = await gameScene();
    //machine.position.set(0,0,0);
    //machine.scale.set(2,2,2);

    //anchor.group.add(machine);

    //Add elements to AR scene
    //bottleCoke.scale.set(3, 3, 3); 
    cube.position.set(0,0,0);

    //anchor.group.add(cube);
    for(var i = 0; i < config.total_ar_markers; i++){
      anchorsAR[i].group.add(cube);
    }


    /*var cokeInstances = [];

    var posXClone = 0;
    var posYClone = 0;

    var cokeIndex = 0;

    for(var x = 0; x < 3.5; x += 0.5){
      for(var y = 0; y < 3.5; y += 0.5){
        cokeInstances[cokeIndex] = bottleCoke.clone();
        posXClone = x;
        posYClone = y;
        cokeInstances[cokeIndex].position.set(posXClone,posYClone,0);
        anchor.group.add(cokeInstances[cokeIndex]);

        cokeIndex++;
      }
    }*/
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