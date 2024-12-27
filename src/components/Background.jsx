import { Environment, Sphere } from "@react-three/drei";
import { Gradient, LayerMaterial } from "lamina";
import * as THREE from 'three';
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Function to create the background
export const Background = ({ backgroundColors }) => {

    const start = 0.2;
    const end = -0.5;

    const gradientRef = useRef();
    const gradientEnvRef = useRef();

    useFrame(() => {
        if (gradientRef.current && gradientEnvRef.current) {
            gradientRef.current.colorA = new THREE.Color(backgroundColors.current.colorA);
            gradientRef.current.colorB = new THREE.Color(backgroundColors.current.colorB);
            gradientEnvRef.current.colorA = new THREE.Color(backgroundColors.current.colorA);
            gradientEnvRef.current.colorB = new THREE.Color(backgroundColors.current.colorB);
        }
    });

    return (
        <>
            <Sphere scale={[500, 500, 500]} rotation-y={Math.PI / 2}>
                <LayerMaterial color={"#ffffff"} side={THREE.BackSide}>
                    <Gradient ref={gradientRef} axes={"y"} start={start} end={end} />
                </LayerMaterial>
            </Sphere>

            {/* To make the background impact the lighting of the scene */}
            <Environment resolution={256} frames={Infinity}>
                <Sphere scale={[100, 100, 100]} rotation-y={Math.PI / 2} rotation-x={Math.PI}>
                    <LayerMaterial color={"#ffffff"} side={THREE.BackSide}>
                        <Gradient ref={gradientEnvRef} axes={"y"} start={start} end={end} />
                    </LayerMaterial>
                </Sphere>
            </Environment>
        </>
    );
};
