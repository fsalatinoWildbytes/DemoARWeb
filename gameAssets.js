import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

async function gameScene() {
  const loader = new GLTFLoader();

  const [bottleCokeData, machineData, cubeData] = await Promise.all([
    loader.loadAsync('./assets/3d_models/botella.glb'),
    loader.loadAsync('./assets/3d_models/claw_machine_50.glb'),
    loader.loadAsync('./assets/3d_models/CUBE_1m.glb'),
  ]);

  //console.log('Squaaawk!', bottleCokeData);

  const bottleCoke = bottleCokeData.scene;
  const machine = machineData.scene;
  const cube = cubeData.scene;

  return { bottleCoke, machine, cube,};

}

export { gameScene };





  /*const [parrotData, flamingoData, storkData] = await Promise.all([
    loader.loadAsync('/assets/models/Parrot.glb'),
    loader.loadAsync('/assets/models/Flamingo.glb'),
    loader.loadAsync('/assets/models/Stork.glb'),
  ]);

  console.log('Squaaawk!', parrotData);

  const parrot = setupModel(parrotData);
  parrot.position.set(0, 0, 2.5);

  const flamingo = setupModel(flamingoData);
  flamingo.position.set(7.5, 0, -10);

  const stork = setupModel(storkData);
  stork.position.set(0, -2.5, -10);

  return {
    parrot,
    flamingo,
    stork,
  };*/

