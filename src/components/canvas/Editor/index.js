import { Canvas } from '@react-three/fiber'
import { Html, Loader, OrbitControls, Stage, useGLTF } from '@react-three/drei'
import { Suspense, useRef, useLayoutEffect, useEffect } from 'react'
import { useControls } from 'leva'
import { lightControls, defaultControls } from '../controls'
import { useState } from 'react'
import EditTools from './EditTools'
import Head from 'next/head'

function rgbToHex({ r, g, b }) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

const Model = ({ file, portalRef }) => {
  const [materialsEditor, setMaterialsEditor] = useState({})
  const { scene } = useGLTF(file)

  useEffect(() => {
    scene.traverse((object) => {
      if (object.material && object.isMesh) {
        setMaterialsEditor((oldMaterials) => ({
          ...oldMaterials,
          [object.material.name]: {
            color: {
              type: 'color',
              value: rgbToHex({
                r: parseInt(object.material.color.r * 255),
                g: parseInt(object.material.color.g * 255),
                b: parseInt(object.material.color.b * 255),
              }),
            },
            roughness: {
              type: 'range',
              value: object.material.roughness,
            },

            metalness: {
              type: 'range',
              value: object.material.metalness,
            },
            opacity: {
              type: 'range',
              value: object.material.opacity,
            },
            side: {
              type: 'select',
              value: object.material.side,
              options: ['FrontSide', 'BackSide', 'DoubleSide'],
            },
            emissive: {
              type: 'color',
              value: rgbToHex({
                r: parseInt(object.material.emissive.r * 255),
                g: parseInt(object.material.emissive.g * 255),
                b: parseInt(object.material.emissive.b * 255),
              }),
            },
            emissiveIntensity: {
              type: 'range',
              value: object.material.emissiveIntensity,
            },
          },
        }))
      }
    })
  }, [scene])

  useLayoutEffect(() => {
    void scene.traverse(
      (obj) => obj.isMesh && (obj.castShadow = obj.receiveShadow = true)
    )
  }, [scene])

  return (
    <>
      <primitive object={scene} />
      <Html portal={portalRef}>
        <EditTools
          materialsEditor={materialsEditor}
          scene={scene}
          setMaterialsEditor={setMaterialsEditor}
        />
      </Html>
    </>
  )
}

export default function ModelComponent(props) {
  const portal = useRef()
  const ref = useRef()
  const controls = useControls({
    ...defaultControls,
    ...lightControls,
  })

  return (
    <div className='min-h-screen grid grid-cols-4'>
      <Head>
        <title>Material Editor - market</title>
      </Head>
      <div className='portal-ref' ref={portal}></div>
      <Loader />
      <Canvas
        style={{ height: '100vh', gridColumnStart: 2, gridColumnEnd: -1 }}
        shadows
        gl={{ alpha: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 150], fov: 50 }}
      >
        <color attach='background' color='white' />
        <Suspense fallback={null}>
          <Stage
            controls={ref}
            preset={controls.preset}
            intensity={controls.intensity}
            contactShadow={controls.contactShadow}
            environment={controls.environment}
            shadowBias={-0.001}
          >
            <Model file={props.file} portalRef={portal} />
          </Stage>
          <OrbitControls ref={ref} autoRotate={controls.autoRotate} />
        </Suspense>
      </Canvas>
    </div>
  )
}
