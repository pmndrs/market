import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { useState, useEffect, Suspense, useRef, useLayoutEffect } from 'react'

import { GLTFLoader, DRACOLoader, MeshoptDecoder } from 'three-stdlib'

const Model = ({ buffer }) => {
  const [code, setCode] = useState()
  const ref = useRef()
  const controls = {
    preset: {
      value: 'rembrandt',
      options: ['rembrandt', 'portrait', 'upfront', 'soft'],
    },
    environment: {
      value: 'city',
      options: [
        '',
        'sunset',
        'dawn',
        'night',
        'warehouse',
        'forest',
        'apartment',
        'studio',
        'city',
        'park',
        'lobby',
      ],
    },
  }
  useLayoutEffect(() => {
    code &&
      code.traverse((obj) => {
        if (obj.isMesh) {
          obj.castShadow = obj.receiveShadow = true
          obj.material.envMapIntensity = 0.8
        }
      })
  }, [code])

  const getModel = async () => {
    const gltfLoader = new GLTFLoader()
    const dracoloader = new DRACOLoader()
    dracoloader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
    gltfLoader.setDRACOLoader(dracoloader)
    gltfLoader.setMeshoptDecoder(MeshoptDecoder)
    const result = await new Promise((resolve, reject) =>
      gltfLoader.parse(buffer, '', resolve, reject)
    )
    setCode(result.scenes[0])
  }

  useEffect(() => {
    getModel()
  }, [])
  if (!code) return null
  return (
    <>
      <ambientLight intensity={0.25} />
      <Suspense fallback={null}>
        <Stage
          controls={ref}
          preset={controls.preset.value}
          intensity={1}
          contactShadow
          shadows
          adjustCamera
          environment={controls.environment.value}
        >
          <sphereGeometry />
          <primitive object={code} />
        </Stage>
      </Suspense>
      <OrbitControls ref={ref} autoRotate />
    </>
  )
}

export default function ModelComponent(props) {
  return (
    <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 0, 150], fov: 50 }}>
      <Model {...props} />
    </Canvas>
  )
}
