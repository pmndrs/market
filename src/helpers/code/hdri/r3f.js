import commonr3fCode from '../common/r3f'

export const createCode = (hdri, tab) => [
  ...commonr3fCode,
  {
    filename: 'src/App.js',
    code: `
  import React, { Suspense, useRef } from "react";
  import { Canvas } from "@react-three/fiber";
  import { OrbitControls, Stage, Environment } from "@react-three/drei";
  
  export default function App() {  
    return (
      <Canvas
      shadows
      gl={{ alpha: false }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 10], fov: 50 }}
    >
      <Suspense fallback={null}>
        <Environment background={true} files={'${hdri.file}'} />
        <mesh>
          <sphereBufferGeometry args={[2, 128, 32]} />
          <meshStandardMaterial metalness={1} roughness={0} />
        </mesh>
        <OrbitControls />
      </Suspense>
    </Canvas>
    );
  }    
`,
  },
]
