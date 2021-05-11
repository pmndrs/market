import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import {
  CubeTexture,
  CubeTextureLoader,
  Texture,
  PMREMGenerator,
  Scene,
} from 'three'
import { RGBELoader } from 'three-stdlib'
import {
  OrbitControls,
  useGLTF,
  Stage,
  useTexture,
  Sphere,
  Environment,
} from '@react-three/drei'
import React, { Suspense, useRef } from 'react'
import { useControls } from 'leva'
import { API_ENDPOINT } from '@/helpers/constants/api'

export default function MaterialComponent(props) {
  const ref = useRef()
  const controls = useControls(
    {
      autoRotate: true,
      contactShadow: true,
    },
    { collapsed: true }
  )
  return (
    <Canvas
      shadows
      gl={{ alpha: false }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 10], fov: 50 }}
    >
      <Suspense fallback={null}>
        <>
          <React.Suspense fallback={null}>
            <Environment
              background={true}
              path={''}
              files={API_ENDPOINT + props.file}
            />
            <mesh>
              <sphereBufferGeometry args={[2, 128, 32]} />
              <meshStandardMaterial metalness={1} roughness={0} />
            </mesh>
          </React.Suspense>
          <OrbitControls ref={ref} autoRotate={controls.autoRotate} />
        </>
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('/suzanne.gltf')
