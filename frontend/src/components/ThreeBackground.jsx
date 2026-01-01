import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Text } from '@react-three/drei';
import * as random from 'maath/random';

const Stars = (props) => {
    const ref = useRef();
    const [sphere] = useState(() => random.inSphere(new Float32Array(5001), { radius: 1.5 }));

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#f472b6"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const FloatingMath = ({ count = 30 }) => {
    const symbols = useMemo(() => [
        // Basic Math & Operators
        'π', 'e', '∞', '√', '∫', '∑', '∏', '±', '÷', '×', '=', '≈', '≠',

        // Algebra & Calculus
        '∂', '∇', '∆', 'dx', 'dy', 'lim', 'f(x)', 'log', 'ln',

        // Set Theory & Logic
        '∀', '∃', '∈', '∉', '⊂', '⊃', '∪', '∩', '∧', '∨', '¬', '⇒', '⇔',

        // Greek Letters (Physics/Math)
        'α', 'β', 'γ', 'theta', 'λ', 'μ', 'ρ', 'σ', 'τ', 'φ', 'ψ', 'Ω', 'ω',

        // Geometry
        '∠', '⊥', '∥', '°',

        // Coding & Brackets
        '{ }', '</>', '[]', '()', '=>', '&&', '||', '!=', '==', '++', '--',
        // 'const', 'let', 'var', 'func', 'return', 'if', 'else', 'for', 'while', 'import', 'export', 'class', 'await', 'async'
    ], []);

    // Generate random positions and symbols
    const items = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            ],
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
            scale: 0.5 + Math.random() * 0.5,
            color: Math.random() > 0.5 ? '#db2777' : '#8b5cf6' // Pink or Purple
        }));
    }, [count, symbols]);

    return (
        <>
            {items.map((item, i) => (
                <Float
                    key={i}
                    speed={1 + Math.random()}
                    rotationIntensity={1}
                    floatIntensity={2}
                    floatingRange={[-0.5, 0.5]}
                >
                    <Text
                        position={item.position}
                        color={item.color}
                        fontSize={item.scale * 0.4}
                        fillOpacity={0.4}
                        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {item.symbol}
                    </Text>
                </Float>
            ))}
        </>
    );
};

const TorusAnimation = () => {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} position={[0, 0, -5]} scale={2.5}>
                <torusKnotGeometry args={[1, 0.3, 128, 16]} />
                <meshStandardMaterial
                    color="#db2777"
                    wireframe
                    transparent
                    opacity={0.15}
                    roughness={0}
                    metalness={0.5}
                />
            </mesh>
            <mesh ref={meshRef} position={[0, 0, -5]} scale={2.52}>
                <torusKnotGeometry args={[1, 0.3, 128, 16]} />
                <meshBasicMaterial
                    color="#8b5cf6"
                    wireframe
                    transparent
                    opacity={0.05}
                />
            </mesh>
        </Float>
    );
};

const ThreeBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] bg-transparent pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#f472b6" />
                <Stars />
                <FloatingMath />
                <TorusAnimation />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
