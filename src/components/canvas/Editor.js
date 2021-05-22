import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { Html, OrbitControls, Stage, useGLTF } from '@react-three/drei'
import { Suspense, useRef, useLayoutEffect, useEffect } from 'react'
import { useControls } from 'leva'
import { lightControls, defaultControls } from './controls'
import { useState } from 'react'
import { ChromePicker } from 'react-color'
import { saveAs } from 'file-saver'
import classNames from '@/helpers/classNames'
import Button from '../Button'
import { GLTFExporter } from 'three-stdlib'

function rgbToHex({ r, g, b }) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

const Model = ({ file, portalRef }) => {
  const [materialsEditor, setMaterialsEditor] = useState({})
  const { scene } = useGLTF(file)

  useEffect(() => {
    scene.traverse((object) => {
      if (object.material && object.isMesh) {
        setMaterialsEditor((a) => ({
          ...a,
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

  useEffect(() => {
    if (Object.keys(materialsEditor).length) {
      scene.traverse((obj) => {
        if (obj.isMesh && obj.material && materialsEditor[obj.material.name]) {
          const color = new THREE.Color(
            materialsEditor[obj.material.name].color.value
          )
          obj.material.color = color
          obj.material.roughness =
            materialsEditor[obj.material.name].roughness.value
          obj.material.metalness =
            materialsEditor[obj.material.name].metalness.value
        }
      })
    }
  }, [materialsEditor, scene])
  const [activeTab, setActiveTab] = useState(Object.keys(materialsEditor)[0])
  const exporter = new GLTFExporter()
  return (
    <>
      <primitive object={scene} />
      <Html portal={portalRef}>
        <div className='flex mt-10 background-white'>
          <nav className='mr-5 space-y-1'>
            {Object.keys(materialsEditor).map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item)}
                className={classNames(
                  activeTab === item
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md'
                )}
              >
                <span className='capitalize truncate'>{item}</span>
              </button>
            ))}
          </nav>
          {Object.keys(materialsEditor).map((material) => (
            <div
              key={material}
              className={`${activeTab === material ? '' : 'hidden'}`}
            >
              {Object.keys(materialsEditor[material]).map((property) => {
                const val = materialsEditor[material][property]
                if (val.type === 'range') {
                  return (
                    <div className='mt-2'>
                      <label
                        className='block font-medium text-gray-800 capitalize'
                        htmlFor={material}
                      >
                        {property}
                      </label>
                      <input
                        className='w-full'
                        type='range'
                        id={material}
                        name={material}
                        min={0}
                        step={0.01}
                        max={1}
                        defaultValue={val.value.toString()}
                        onChange={(e) => {
                          setMaterialsEditor((materials) => {
                            return {
                              ...materials,
                              [material]: {
                                ...materials[material],
                                [property]: {
                                  type: 'range',
                                  value: parseFloat(e.target.value),
                                },
                              },
                            }
                          })
                        }}
                      />
                    </div>
                  )
                }
                if (val.type === 'color') {
                  return (
                    <>
                      <span className='block mb-2 font-medium text-gray-800 capitalize'>
                        Color
                      </span>
                      <ChromePicker
                        key={property}
                        color={val.value}
                        onChange={(val) => {
                          val.hex &&
                            setMaterialsEditor((m) => ({
                              ...m,
                              [material]: {
                                ...m[material],
                                color: {
                                  type: 'color',
                                  value: val.hex,
                                },
                              },
                            }))
                        }}
                      />
                    </>
                  )
                }

                return null
              })}
            </div>
          ))}
        </div>
        <Button
          className='fixed bottom-5 left-5'
          onClick={() => {
            exporter.parse(scene, function (gltf) {
              var blob = new Blob([JSON.stringify(gltf)], {
                type: 'application/gltf; charset=us-ascii',
              })
              saveAs(blob, 'model.gltf')
            })
          }}
        >
          Download Model
        </Button>
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
    <div className='min-h-screen'>
      <div className='portal-ref' ref={portal}></div>
      <Canvas
        style={{ height: '100vh' }}
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
