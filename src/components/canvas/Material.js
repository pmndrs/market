import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  useGLTF,
  Stage,
  useTexture,
  Sphere,
} from '@react-three/drei'
import { Suspense, useRef } from 'react'
import { useControls } from 'leva'
import { defaultControls, lightControls } from './controls'

const PBR = ({ maps, displacementScale }) => {
  const texturesLoader = useTexture([...Object.values(maps)])
  const textures = Object.keys(maps).reduce((acc, curr, i) => {
    acc[curr] = texturesLoader[i]

    return acc
  }, {})
  return (
    <Sphere args={[1, 200, 200]}>
      <meshPhysicalMaterial
        {...textures}
        side={THREE.DoubleSide}
        displacementScale={displacementScale}
        metalness={textures.metalnessMap ? 1 : 0}
      />
    </Sphere>
  )
}

const MatCap = ({ file }) => {
  const [matcap] = useTexture([file])
  const group = useRef()
  const { nodes } = useGLTF('/suzanne.gltf')

  return (
    <group ref={group} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Suzanne.geometry}
        position={[0, 0.19, -0.04]}
        attach='material'
      >
        <meshMatcapMaterial matcap={matcap} />
      </mesh>
    </group>
  )
}

const Material = ({ file, category, maps }) => {
  const ref = useRef()
  const otherControls =
    category === 'matcaps'
      ? {}
      : {
          displacement: {
            value: 0.02,
            min: 0,
            max: 1,
            step: 0.05,
            label: 'displacement scale',
          },
          ...lightControls,
        }
  const controls = useControls({
    ...defaultControls,
    ...otherControls,
  })

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
        {category === 'matcaps' ? (
          <MatCap file={file} />
        ) : (
          <PBR maps={maps} displacementScale={controls.displacement} />
        )}
      </Stage>
      <OrbitControls ref={ref} autoRotate={controls.autoRotate} />
    </>
  )
}

export default function MaterialComponent(props) {
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
        <Material {...props} />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('/suzanne.gltf')
