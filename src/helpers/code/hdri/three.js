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
    import { preloader } from "./loader";
    
   ${lightsAndSceneSetup}
    
    /* Add HRDI sample here */
    
   ${renderSetUp}
`,
  },
]
