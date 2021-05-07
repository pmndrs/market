import commonr3fCode from '../common/r3f'

export const createCode = async (files) => {
  const getName = (image) => {
    const parts = image.split('/')
    const name = parts[parts.length - 1]

    return name
  }
  const getImages = async () => {
    const images = Object.values(files)
    const promises = images.map(async (image) => {
      const name = getName(image)
      const data = await fetch(image).then((a) => a.blob())

      return { filename: `public/${name}`, code: data }
    })

    const all = await Promise.all(promises)

    return all
  }

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

    ...(await getImages()),
  ]
}
