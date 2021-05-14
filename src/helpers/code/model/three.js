import commonThreeCode, {
  lightsAndSceneSetup,
  renderSetUp,
} from '../common/three'

/* eslint-disable no-useless-escape */
export const createCode = (model) => [
  ...commonThreeCode,

  {
    filename: 'src/index.js',
    code: `
    import * as THREE from "three";
    import { WebGLRenderer, Scene, PerspectiveCamera, PointLight, AmbientLight } from "three";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
    import { preloader } from "./loader";
    import { GLTFResolver } from "./loader/resolvers/GLTFResolver";
    
   ${lightsAndSceneSetup}
    
    
    /* Preloader */
    preloader.init(new GLTFResolver());
    preloader
      .load([{ id: "model", type: "gltf", url: "assets/${
        model.id.split('model/')[1]
      }.gltf" }])
      .then(([model]) => {
        onResize();
        animate();
        const obj = model.scene.scene;
        obj.traverse((obj) => {
          if (obj.isMesh) {
            obj.castShadow = obj.receiveShadow = true;
          }
        });
        scene.add(obj);

        const plane = new THREE.Mesh(
          new THREE.PlaneBufferGeometry(100, 100),
          new THREE.MeshStandardMaterial({ color: "white" })
        );
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane);
      });

    
   ${renderSetUp}
`,
  },
  {
    filename: `src/assets/${model.id.split('model/')[1]}.gltf`,
    code: model.buffer,
  },
]
