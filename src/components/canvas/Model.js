import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stage, useGLTF } from '@react-three/drei'
import { Suspense, useRef, useLayoutEffect, useEffect } from 'react'
import { useControls } from 'leva'
import { AnimationMixer } from 'three'
import { lightControls, defaultControls } from './controls'

const Model = ({ file }) => {
  const ref = useRef()
  const controls = useControls({
    ...defaultControls,
    wireframe: false,
    ...lightControls,
  })

  const { animations,scene } = useGLTF(file)
  const content = scene || scenes[0];
  const mixer = new AnimationMixer( content );
  const animationsClip = []
  let defaultAnimationsControls = {}

  for (let a of animations){
    let action = mixer.clipAction(a);
    animationsClip[a.name] = action
    defaultAnimationsControls[a.name] = false
  }
  const [controlsAnim,setControlsAnim] = useControls('Animations',()=>(
    defaultAnimationsControls
  ))

  for(let clipName in animationsClip){
    if(controlsAnim[clipName]){
      animationsClip[clipName].play();
    }else{
      animationsClip[clipName].stop();
    }
  }

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

    if(animations[0]){
      defaultAnimationsControls[animations[0].name] = true
    }
    setControlsAnim(defaultAnimationsControls)
  }, [scene, controls.wireframe])
  
  useFrame((state, delta) => {
    mixer.update(delta)
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
      <Suspense fallback={null}>
        <Model {...props} />
      </Suspense>
    </Canvas>
  )
}
