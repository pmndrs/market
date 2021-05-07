import commonThreeCode, {
  lightsAndSceneSetup,
  renderSetUp,
} from '../common/three'

/* eslint-disable no-useless-escape */
export const createCode = (suzanne, filename, matcap) => [
  ...commonThreeCode,

  {
    filename: 'src/index.js',
    code: `
    import * as THREE from "three";
    import { WebGLRenderer, Scene, PerspectiveCamera, PointLight } from "three";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
    import { preloader } from "./loader";
    import { TextureResolver } from "./loader/resolvers/TextureResolver";
    import { GLTFResolver } from "./loader/resolvers/GLTFResolver";
    
   ${lightsAndSceneSetup}
    
    /* Preloader */
    preloader.init(new GLTFResolver(), new TextureResolver());
    preloader
      .load([
        { id: "suzanne", type: "gltf", url: "assets/suzanne.gltf" },
        { id: "matcap", type: "texture", url: "assets/${filename}" },
      ])
      .then(([suzanne, matcap]) => {
        onResize();
        animate();
        const obj = suzanne.scene.scene;
        obj.scale.setScalar(2);
        const material = new THREE.MeshMatcapMaterial({ matcap: matcap.texture });
        obj.children.forEach((element) => {
          element.material = material;
          element.castShadow = true;
        });
    
        scene.add(obj);
    
        const plane = new THREE.Mesh(
          new THREE.PlaneBufferGeometry(100, 100),
          new THREE.MeshStandardMaterial({ color: "white" })
        );
        plane.receiveShadow = true;
    
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -1;
    
        scene.add(plane);
      });
    
   ${renderSetUp}
`,
  },
  {
    filename: 'src/assets/suzanne.gltf',
    code: suzanne,
  },
  {
    filename: `src/assets/${filename}`,
    code: matcap,
  },
]
