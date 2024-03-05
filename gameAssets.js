import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

async function gameScene() {
  const loader = new GLTFLoader();

  const [bottleCokeData, machineData, cubeData] = await Promise.all([
    loader.loadAsync('./assets/3d_models/botella.glb'),
    loader.loadAsync('./assets/3d_models/claw_machine_50.glb'),
    loader.loadAsync('./assets/3d_models/cubo_referencia_1m.glb'),
  ]);

  //console.log('Squaaawk!', bottleCokeData);

  const bottleCoke = bottleCokeData.scene;
  const machine = machineData.scene;
  const cube = cubeData.scene;

  return { bottleCoke, machine, cube,};

}

export { gameScene };

