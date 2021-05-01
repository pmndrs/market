import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { useState, useEffect, Suspense, useRef, useLayoutEffect } from 'react'

import { GLTFLoader, DRACOLoader, MeshoptDecoder } from 'three-stdlib'
import { useControls } from 'leva'

const Model = ({ buffer }) => {
  const [scene, setScene] = useState()
  const ref = useRef()
  const controls = useControls(
    {
      autoRotate: true,
      contactShadow: true,
      intensity: {
        value: 1,
        min: 0,
        max: 2,
        step: 0.1,
        label: 'light intensity',
      },
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
    },
    { collapsed: true }
  )

  useLayoutEffect(() => {
    scene &&
      scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.castShadow = obj.receiveShadow = true
          obj.material.envMapIntensity = 0.8
        }
      })
  }, [scene])

  const getModel = async () => {
    const gltfLoader = new GLTFLoader()
    const dracoloader = new DRACOLoader()
    dracoloader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
    gltfLoader.setDRACOLoader(dracoloader)
    gltfLoader.setMeshoptDecoder(MeshoptDecoder)
    const result = await new Promise((resolve, reject) =>
      gltfLoader.parse(buffer, '', resolve, reject)
    )
    console.log(result)
    setScene(result.scenes[0])
  }

  useEffect(() => {
    getModel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (!scene) return null
  return (
    <>
      <ambientLight intensity={0.25} />
      <Suspense fallback={null}>
        <Stage
          controls={ref}
          preset={controls.preset}
          intensity={controls.intensity}
          contactShadow={controls.contactShadow}
          shadows
          adjustCamera
          environment={controls.environment}
        >
          <sphereGeometry />
          <primitive object={scene} />
        </Stage>
      </Suspense>
      <OrbitControls ref={ref} autoRotate={controls.autoRotate} />
    </>
  )
}

export default function ModelComponent(props) {
  return (
    <>
      {' '}
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 150], fov: 50 }}
      >
        <Model {...props} />
      </Canvas>
    </>
  )
}
