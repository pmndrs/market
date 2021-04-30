import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { useState, useEffect, Suspense, useRef } from 'react'
import { GLTFLoader, DRACOLoader, MeshoptDecoder } from 'three-stdlib'

const Model = ({ buffer }) => {
  const [code, setCode] = useState()
  const ref = useRef()

  // useLayoutEffect(() => {
  //   code &&
  //     code.traverse((obj) => {
  //       if (obj.isMesh) {
  //         obj.castShadow = obj.receiveShadow = true
  //         obj.material.envMapIntensity = 0.8
  //       }
  //     })
  // }, [code])

  const getModel = async () => {
    const gltfLoader = new GLTFLoader()
    const dracoloader = new DRACOLoader()
    dracoloader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
    gltfLoader.setDRACOLoader(dracoloader)
    gltfLoader.setMeshoptDecoder(MeshoptDecoder)
    const result = await new Promise((resolve, reject) =>
      gltfLoader.parse(buffer, '', resolve, reject)
    )
    setCode(result)
    console.log('a')
  }

  useEffect(() => {
    getModel()
  }, [])

  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true }}
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 150], fov: 50 }}
    >
      <sphereGeometry />
      <ambientLight intensity={0.25} />
      <Suspense fallback={null}>
        <Stage
          controls={ref}
          preset={'rembrandt'}
          intensity={1}
          contactShadow
          shadows
          adjustCamera
          environment={'city'}
        >
          <sphereGeometry />
          {/* {code && <primitive object={code} />} */}
        </Stage>
      </Suspense>
      <OrbitControls ref={ref} autoRotate />
    </Canvas>
  )
}

export default Model
