import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { Suspense, useRef, useLayoutEffect } from 'react'
import { GLTFLoader, DRACOLoader, MeshoptDecoder } from 'three-stdlib'
import { useControls } from 'leva'
import { useAsset } from 'use-asset'

const Model = ({ buffer }) => {
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

  const scene = useAsset(
    async ([buffer]) => {
      const gltfLoader = new GLTFLoader()
      const dracoloader = new DRACOLoader()
      dracoloader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
      gltfLoader.setDRACOLoader(dracoloader)
      gltfLoader.setMeshoptDecoder(MeshoptDecoder)
      const result = await new Promise((resolve, reject) =>
        gltfLoader.parse(buffer, '', resolve, reject)
      )
      return result.scenes[0]
    },
    [buffer]
  )

  useLayoutEffect(() => {
    void scene.traverse(
      (obj) => obj.isMesh && (obj.castShadow = obj.receiveShadow = true)
    )
  }, [scene])

  return (
    <>
      <Stage
        controls={ref}
        preset={controls.preset}
        intensity={controls.intensity}
        contactShadow={controls.contactShadow}
        environment={controls.environment}
        shadowBias={-0.001}
      >
        <primitive object={scene} />
      </Stage>
      <OrbitControls ref={ref} autoRotate={controls.autoRotate} />
    </>
  )
}

export default function ModelComponent(props) {
  return (
    <Canvas
      shadows
      gl={{ alpha: false }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 150], fov: 50 }}
    >
      <color attach='background' color='white' />
      <ambientLight intensity={0.25} />
      <Suspense fallback={null}>
        <Model {...props} />
      </Suspense>
    </Canvas>
  )
}
