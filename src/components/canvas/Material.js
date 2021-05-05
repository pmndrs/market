import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage, useTexture } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import { useControls } from 'leva'

const Model = ({ url, category }) => {
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
  const [matcap] = useTexture([url])
  const group = useRef()
  const { nodes } = useGLTF('/suzanne.gltf')
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
        <group ref={group} dispose={null}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Suzanne.geometry}
            position={[0, 0.19, -0.04]}
            attach='material'
          >
            {category === 'matcaps' && <meshMatcapMaterial matcap={matcap} />}
          </mesh>
        </group>
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
