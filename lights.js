import { DirectionalLight } from "three";

function createLights() {
  /*const ambientLight = new HemisphereLight(
    'white',
    'darkslategrey',
    5,
  );

  const mainLight = new DirectionalLight('white', 4);
  mainLight.position.set(10, 10, 10);*/
 
  const ambientLight = new DirectionalLight(0xffffff, 3);
  ambientLight.position.set(1, 1, 1).normalize();
  return  ambientLight;
}

export { createLights };
