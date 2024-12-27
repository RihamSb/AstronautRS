/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 ./public/models/airplane/airplane_a380.glb 
Author: Imaginecraft14 (https://sketchfab.com/Imaginecraft14)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/airplane-a380-30f25592643a4543851132aad96bd767
Title: Airplane A380
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/airplane_a380.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="Root">
            <group name="Camera" position={[-8.363, -6.854, 2.772]} rotation={[1.101, -0.857, -0.386]} />
            <group name="Lamp" position={[4.076, 1.005, 5.904]} rotation={[-0.268, 0.602, 1.931]}>
              <group name="Lamp_1" />
            </group>
            <group name="Circle">
              <mesh name="Circle_0" geometry={nodes.Circle_0.geometry} material={materials.plane} />
            </group>
            <group name="Cube">
              <mesh name="Cube_0" geometry={nodes.Cube_0.geometry} material={materials.wings} />
            </group>
            <group name="Cube001" position={[0.071, -3.743, 1.46]} scale={[0.05, 0.417, 0.417]}>
              <mesh name="Cube001_0" geometry={nodes.Cube001_0.geometry} material={materials.plane} />
            </group>
            <group name="Cube002" position={[0.07, -3.598, 1.39]} scale={[0.05, 0.417, 0.417]}>
              <mesh name="Cube002_0" geometry={nodes.Cube002_0.geometry} material={materials.wings} />
            </group>
            <group name="Cylinder" position={[0, 1.488, -5.935]} rotation={[Math.PI / 2, 0, 0]} scale={[0.392, 0.253, 0.392]}>
              <mesh name="Cylinder_0" geometry={nodes.Cylinder_0.geometry} material={materials.Material} />
            </group>
            <group name="Sun" position={[-4.524, -1.233, 0.495]}>
              <group name="Sun_1" />
            </group>
            <group name="Cylinder001" position={[0, 1.488, -5.935]} rotation={[Math.PI / 2, 0, 0]} scale={[0.392, 0.253, 0.392]}>
              <mesh name="Cylinder001_0" geometry={nodes.Cylinder001_0.geometry} material={materials.engines} />
              <mesh name="Cylinder001_1" geometry={nodes.Cylinder001_1.geometry} material={materials['Material.001']} />
              <mesh name="Cylinder001_2" geometry={nodes.Cylinder001_2.geometry} material={materials['Material.002']} />
            </group>
            <group name="Cylinder002" position={[0.07, 4.736, -6.028]} rotation={[Math.PI / 2, 0, 0]} scale={[0.392, 0.253, 0.392]}>
              <mesh name="Cylinder002_0" geometry={nodes.Cylinder002_0.geometry} material={materials.engines} />
              <mesh name="Cylinder002_1" geometry={nodes.Cylinder002_1.geometry} material={materials['Material.001']} />
              <mesh name="Cylinder002_2" geometry={nodes.Cylinder002_2.geometry} material={materials['Material.002']} />
            </group>
            <group name="Point" position={[0, 0, 0.395]}>
              <group name="Point_1" />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/airplane_a380.glb')