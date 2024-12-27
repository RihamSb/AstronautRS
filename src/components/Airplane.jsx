import { useGLTF } from "@react-three/drei";
import React from "react";

export function Airplane(props) {
  const { nodes, materials } = useGLTF("./models/airplane/astronaut.glb");

  console.log(nodes)
  console.log(materials)

  return (
    <group {...props} dispose={null}>
      {Object.keys(nodes).map((key) => {
        const node = nodes[key];
        // Check if the node is a Mesh
        if (node.isMesh) {
          // Try to get the corresponding material
          const material = materials[node.material?.name];
          return (
            <mesh key={node.uuid} geometry={node.geometry} material={material}>
              {!material && <meshStandardMaterial color={"white"} />}
            </mesh>
          );
        }
        return null;
      })}
    </group>
  );
}

useGLTF.preload("./models/airplane/astronaut.glb");

// /**
//  * import { useGLTF } from "@react-three/drei";
// import React, { useEffect } from "react";

// export function Airplane(props) {
//   const { nodes, materials } = useGLTF("./models/airplane/airplane_a380.glb");

//   useEffect(() => {
//     console.log("Nodes: ", nodes);
//     console.log("Materials: ", materials);
//   }, [nodes, materials]);

//   return (
//     <group {...props} dispose={null}>
//       {/* Placeholder for the mesh */}
//       {/* Replace "YourMeshName" and "YourMaterialName" with actual names */}
//       </group>
//     );
//   }
  
//   useGLTF.preload("./models/airplane/airplane_a380.glb");
  
//  */