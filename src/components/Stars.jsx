import { useMemo, useRef } from 'react';
import { Points, PointMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function Stars() {
    const ref = useRef();

    const starPositions = useMemo(() => {
        const positions = [];
        const spread = 3000; // Increase the spread to cover the entire road area
        for (let i = 0; i < 50000; i++) {
            positions.push(Math.random() * spread - spread / 2); // X-axis
            positions.push(Math.random() * 500 - 250); // Y-axis: limit the height
            positions.push(Math.random() * spread - spread / 2); // Z-axis
        }
        return new Float32Array(positions);
    }, []);

    useFrame(() => {
        if (ref.current) {
            // Simple twinkling effect by randomizing sizes
            ref.current.rotation.y += 0.0005; // Rotates the entire stars field
            const positions = ref.current.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += (Math.random() - 0.5) * 0.1; // Slightly move stars in x-axis
                positions[i + 1] += (Math.random() - 0.5) * 0.1; // Slightly move stars in y-axis
                positions[i + 2] += (Math.random() - 0.5) * 0.1; // Slightly move stars in z-axis
            }
            ref.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <Points ref={ref} positions={starPositions}>
            <PointMaterial color="#ffffff" size={0.5} />
        </Points>
    );
}
