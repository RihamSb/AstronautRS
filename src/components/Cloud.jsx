import { useGLTF } from "@react-three/drei";
import React from "react";
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";


export function Cloud({ opacity, ...props }) {
  const { nodes, materials } = useGLTF("./models/cloud/model.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mball001.geometry}>
        <meshStandardMaterial
        onBeforeCompile={fadeOnBeforeCompile}
        // onBeforeCompile={(shader)=>{
        //   // console.log(shader.fragmentShader)
        //   //there is a lot of includes but what we interest is the intensity
        //   // shader.fragmentShader = shader.fragmentShader.replace(
        //   //   `vec4 diffuseColor = vec4( diffuse, opacity );`,
        //   //   `float fadeDist =200.0;
        //   //   float dist = length(vViewPosition);
        //   //   float fadeOpacity = smoothstep(fadeDist, 0.0, dist);
        //   //   vec4 diffuseColor = vec4( diffuse, fadeOpacity * opacity );`
        //   // )
        // }}
          envMapIntensity={2}
          transparent
          opacity={opacity}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("./models/cloud/model.gltf");