import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import React, { Suspense, useRef } from 'react'
import { useControls } from 'leva'

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
            <Environment background={true} path={''} files={props.file} />
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
