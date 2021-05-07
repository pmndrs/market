import commonr3fCode from '../common/r3f'

export const createCode = (suzanne, filename, matcap) => [
  ...commonr3fCode,
  {
    filename: 'src/Model.js',
    code: `
    import React, { useRef } from "react";
    import { useGLTF, useTexture } from "@react-three/drei";
    
    const Model = () => {
      const [matcap] = useTexture(["${filename}"]);
      const group = useRef();
      const { nodes } = useGLTF("/suzanne.gltf");
      return (
        <group ref={group} dispose={null}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Suzanne.geometry}
            position={[0, 0.19, -0.04]}
            attach="material"
          >
            <meshMatcapMaterial matcap={matcap} />
          </mesh>
        </group>
      );
    };
    
    useGLTF.preload("/suzanne.gltf");
    
    export default Model;    
`,
  },
  {
    filename: 'public/suzanne.gltf',
    code: suzanne,
  },
  {
    filename: `public/${filename}`,
    code: matcap,
  },
]
