import { useEffect } from 'react'
import { Color } from 'three'
import * as THREE from 'three'

export const useUpdateScene = ({ materialsEditor, scene }) => {
  useEffect(() => {
    if (Object.keys(materialsEditor).length) {
      scene.traverse((obj) => {
        if (obj.isMesh && obj.material && materialsEditor[obj.material.name]) {
          const currentMaterial = materialsEditor[obj.material.name]
          const color = new Color(currentMaterial.color.value)

          obj.material.color = color
          obj.material.roughness = currentMaterial.roughness.value
          obj.material.metalness = currentMaterial.metalness.value

          obj.material.transparent = currentMaterial.opacity !== 1
          obj.material.side = THREE[currentMaterial.side.value]

          obj.material.opacity = currentMaterial.opacity.value
        }
      })
    }
  }, [materialsEditor, scene])
}
