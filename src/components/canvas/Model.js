import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { Suspense, useRef, useLayoutEffect, useEffect } from 'react'
import { GLTFLoader, DRACOLoader, MeshoptDecoder } from 'three-stdlib'
import { useControls } from 'leva'
import { useAsset } from 'use-asset'
import useStore from '@/helpers/store'
import { lightControls, defaultControls } from './controls'

const Model = ({ buffer }) => {
  const ref = useRef()
  const controls = useControls({
    ...defaultControls,
    wireframe: false,
    ...lightControls,
  })

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
      useStore.setState({ parsedBuffer: result })
      return result.scenes[0]
    },
    [buffer]
  )

  useLayoutEffect(() => {
    void scene.traverse(
      (obj) => obj.isMesh && (obj.castShadow = obj.receiveShadow = true)
    )
  }, [scene])

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        obj.material.wireframe = controls.wireframe
      }
    })
  }, [scene, controls.wireframe])

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
