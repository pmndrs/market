import commonThreeCode, {
  lightsAndSceneSetup,
  renderSetUp,
} from '../common/three'

/* eslint-disable no-useless-escape */
export const createCode = (hdri) => [
  ...commonThreeCode,

  {
    filename: 'src/index.js',
    code: `
    import * as THREE from "three";
    import { WebGLRenderer, Scene, PerspectiveCamera, PointLight, AmbientLight } from "three";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
    import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
    
   ${lightsAndSceneSetup}
    
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    new RGBELoader().load("${hdri.file}", (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      scene.background = envMap;
      scene.environment = envMap;
      texture.dispose();
      pmremGenerator.dispose();

      onResize();
      animate();

      const sphere = new THREE.Mesh(
        new THREE.SphereBufferGeometry(2, 64, 32),
        new THREE.MeshStandardMaterial({ metalness: 1, roughness: 0 })
      );
      scene.add(sphere);
    });
    
   ${renderSetUp}
`,
  },
]
