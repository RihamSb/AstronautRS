import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { Experience } from "./components/Experience";

function App() {
  return (
    <>
      <Canvas>
        <color attach="background" args={["#ececec"]} />
        {/* Scroll animation 
         damping : the smoothness and responsiveness of the interaction
        */}
        <ScrollControls 
        pages={20}
        damping={0.5}
        >
        <Experience />
        </ScrollControls>
        <EffectComposer>
          <Noise opacity={0.3} />
        </EffectComposer>
      </Canvas>
    </>
  );
}

export default App;
