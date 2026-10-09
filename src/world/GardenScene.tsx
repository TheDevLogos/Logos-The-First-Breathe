import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Sparkles } from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';
import { Suspense } from 'react';
import { ObservingTraveler } from './ObservingTraveler';

function Tree({ position, size = 1 }: { position: [number, number, number]; size?: number }) {
  return (
    <group position={position} scale={size}>
      <mesh castShadow position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.12, 0.2, 1.5, 6]} />
        <meshStandardMaterial color="#70523b" roughness={1} />
      </mesh>
      <mesh castShadow position={[0, 1.75, 0]}>
        <icosahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial color="#587958" roughness={1} flatShading />
      </mesh>
      <mesh castShadow position={[0.42, 1.47, 0.12]}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial color="#7c9567" roughness={1} flatShading />
      </mesh>
    </group>
  );
}

function Garden() {
  return (
    <>
      <color attach="background" args={['#b7cbb9']} />
      <fog attach="fog" args={['#b7cbb9', 11, 34]} />
      <ambientLight intensity={1.3} color="#fff0d4" />
      <directionalLight castShadow position={[-5, 9, 4]} intensity={2.1} color="#ffddb0" shadow-mapSize={[1024, 1024]} />
      <Environment preset="forest" environmentIntensity={0.45} />

      <Physics gravity={[0, -9.81, 0]}>
        <RigidBody type="fixed" colliders="cuboid">
          <mesh receiveShadow position={[0, -0.18, -6]} scale={[80, 0.3, 80]}>
            <boxGeometry />
            <meshStandardMaterial color="#829376" roughness={1} />
          </mesh>
        </RigidBody>
      </Physics>

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, -6]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#8d9c79" roughness={1} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.15, 0.01, -4.8]}>
        <ringGeometry args={[1.4, 2.25, 32]} />
        <meshStandardMaterial color="#9eb6a4" roughness={0.22} metalness={0.06} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.15, 0.016, -4.8]}>
        <circleGeometry args={[1.4, 32]} />
        <meshStandardMaterial color="#adc0b0" roughness={0.18} metalness={0.04} />
      </mesh>

      <Tree position={[-4.2, 0, -6.4]} size={1.35} />
      <Tree position={[4.5, 0, -7.2]} size={1.7} />
      <Tree position={[-7.5, 0, -11]} size={2.25} />
      <Tree position={[8.2, 0, -12]} size={2.5} />
      <Tree position={[-2.5, 0, -13]} size={2.1} />
      <Tree position={[2.3, 0, -14]} size={2.4} />

      <Float speed={0.4} rotationIntensity={0.05} floatIntensity={0.1}>
        <mesh castShadow position={[-1.85, 0.32, -3.9]} rotation={[0.12, 0.3, 0.2]}>
          <dodecahedronGeometry args={[0.48, 0]} />
          <meshStandardMaterial color="#bc9976" roughness={1} flatShading />
        </mesh>
      </Float>
      <Sparkles count={24} scale={[12, 3, 10]} size={2.2} speed={0.18} color="#f2dfac" opacity={0.48} />
      <ContactShadows position={[0, 0.02, 0]} scale={18} blur={2.4} opacity={0.32} far={7} />
      <ObservingTraveler />
    </>
  );
}

export function GardenScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 2.8, 9.7], fov: 42, near: 0.1, far: 90 }}
      gl={{ antialias: true, alpha: false }}
      aria-label="Escenario 3D del jardín inicial"
    >
      <Suspense fallback={null}>
        <Garden />
      </Suspense>
    </Canvas>
  );
}
