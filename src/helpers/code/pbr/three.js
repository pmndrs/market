import commonThreeCode, {
  lightsAndSceneSetup,
  renderSetUp,
} from '../common/three'
import { getImages, getName } from './common'

/* eslint-disable no-useless-escape */
export const createCode = async (files) => [
  ...commonThreeCode,

  {
    filename: 'src/index.js',
    code: `
    import * as THREE from "three";
    import {
      WebGLRenderer,
      Scene,
      PerspectiveCamera,
      PointLight,
      AmbientLight,
    } from "three";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
    import { preloader } from "./loader";
    import { TextureResolver } from "./loader/resolvers/TextureResolver";
    ${lightsAndSceneSetup}
    /* Preloader */
    preloader.init(new TextureResolver());
    preloader
      .load([
${Object.keys(files).map(
  (key) => `{
  id: "${key}",
  type: "texture",
  url: "assets/${getName(files[key])}",
}`
)}
      ])
      .then(([${Object.keys(files).join(',')}]) => {
        onResize();
        animate();
        const sphere = new THREE.Mesh(
          new THREE.SphereBufferGeometry(3, 200, 200),
          new THREE.MeshStandardMaterial({${Object.keys(files).map(
            (key) => `
            "${[key]}": ${key}.texture`
          )},
            displacementScale: 0.3,
          })
        );
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        scene.add(sphere);
    
        const plane = new THREE.Mesh(
          new THREE.PlaneBufferGeometry(100, 100),
          new THREE.MeshStandardMaterial({ color: "white" })
        );
        plane.receiveShadow = true;
    
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -4;
    
        scene.add(plane);
      });
    
  ${renderSetUp}
`,
  },
  ...(await getImages(files, 'src/assets')),
]
