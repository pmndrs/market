import commonr3fCode from '../common/r3f'
import { getImages, getName } from './common'

export const createCode = async (files) => {
  return [
    ...commonr3fCode,
    {
      filename: 'src/Model.js',
      code: `
      import React from "react";
      import { Sphere, useTexture } from "@react-three/drei";
      
      const Model = () => {
        const [${Object.keys(files).join(',')}] = useTexture([
        ${Object.values(files)
          .map((file) => `"${getName(file)}"`)
          .join(',')}
        ]);
        return (
          <Sphere args={[1, 200, 200]} positionY={2}>
            <meshPhysicalMaterial
              aoMap={aoMap}
              map={map}
              displacementMap={displacementMap}
              normalMap={normalMap}
              roughnessMap={roughnessMap}
              displacementScale={0.1}
            />
          </Sphere>
        );
      };
      
      export default Model;
        
`,
    },
    ...(await getImages(files, 'public')),
  ]
}
