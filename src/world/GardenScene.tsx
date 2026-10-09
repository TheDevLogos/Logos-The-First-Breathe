import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Sparkles } from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';
import { Suspense } from 'react';
import { ControllableTraveler } from './ControllableTraveler';

function Tree({ position, size = 1, fallen }: { position: [number, number, number]; size?: number; fallen: boolean }) {
  return (
    <group position={position} scale={size}>
      <mesh castShadow position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.12, 0.2, 1.5, 6]} />
        <meshStandardMaterial color={fallen ? '#594b42' : '#70523b'} roughness={1} />
      </mesh>
      <mesh castShadow position={[0, 1.75, 0]}>
        <icosahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial color={fallen ? '#6d6155' : '#587958'} roughness={1} flatShading />
      </mesh>
      <mesh castShadow position={[0.42, 1.47, 0.12]}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial color={fallen ? '#7a6657' : '#7c9567'} roughness={1} flatShading />
      </mesh>
    </group>
  );
}

function Garden({ fallen }: { fallen: boolean }) {
  return (
    <>
      <color attach="background" args={[fallen ? '#9a8b82' : '#b7cbb9']} />
      <fog attach="fog" args={[fallen ? '#9a8b82' : '#b7cbb9', fallen ? 8 : 11, fallen ? 29 : 34]} />
      <ambientLight intensity={fallen ? 0.92 : 1.3} color={fallen ? '#dac7ba' : '#fff0d4'} />
      <directionalLight castShadow position={[-5, 9, 4]} intensity={fallen ? 1.25 : 2.1} color={fallen ? '#c79d8c' : '#ffddb0'} shadow-mapSize={[1024, 1024]} />
      <Environment preset="forest" environmentIntensity={fallen ? 0.24 : 0.45} />

      <Physics gravity={[0, -9.81, 0]}>
        <RigidBody type="fixed" colliders="cuboid">
          <mesh receiveShadow position={[0, -0.18, -6]} scale={[80, 0.3, 80]}>
            <boxGeometry />
            <meshStandardMaterial color={fallen ? '#71655c' : '#829376'} roughness={1} />
          </mesh>
        </RigidBody>
      </Physics>

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, -6]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color={fallen ? '#817568' : '#8d9c79'} roughness={1} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.15, 0.01, -4.8]}>
        <ringGeometry args={[1.4, 2.25, 32]} />
        <meshStandardMaterial color={fallen ? '#95877d' : '#9eb6a4'} roughness={0.22} metalness={0.06} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.15, 0.016, -4.8]}>
        <circleGeometry args={[1.4, 32]} />
        <meshStandardMaterial color={fallen ? '#9a8d82' : '#adc0b0'} roughness={0.18} metalness={0.04} />
      </mesh>
      <Float speed={0.55} rotationIntensity={0.12} floatIntensity={0.18}>
        <mesh position={[0.15, 0.7, -4.8]}>
          <octahedronGeometry args={[0.28, 0]} />
          <meshBasicMaterial color="#f2dfac" />
        </mesh>
      </Float>
      <Sparkles count={12} position={[0.15, 0.8, -4.8]} scale={[1.3, 1.8, 1.3]} size={2.6} speed={0.22} color="#f2dfac" opacity={0.78} />

      <Tree position={[-4.2, 0, -6.4]} size={1.35} fallen={fallen} />
      <Tree position={[4.5, 0, -7.2]} size={1.7} fallen={fallen} />
      <Tree position={[-7.5, 0, -11]} size={2.25} fallen={fallen} />
      <Tree position={[8.2, 0, -12]} size={2.5} fallen={fallen} />
      <Tree position={[-2.5, 0, -13]} size={2.1} fallen={fallen} />
      <Tree position={[2.3, 0, -14]} size={2.4} fallen={fallen} />

      <Float speed={0.4} rotationIntensity={0.05} floatIntensity={0.1}>
        <mesh castShadow position={[-1.85, 0.32, -3.9]} rotation={[0.12, 0.3, 0.2]}>
          <dodecahedronGeometry args={[0.48, 0]} />
          <meshStandardMaterial color="#bc9976" roughness={1} flatShading />
        </mesh>
      </Float>
      <Sparkles count={24} scale={[12, 3, 10]} size={2.2} speed={0.18} color="#f2dfac" opacity={0.48} />
      <ContactShadows position={[0, 0.02, 0]} scale={18} blur={2.4} opacity={0.32} far={7} />
    </>
  );
}

interface GardenSceneProps {
  active: boolean;
  fallen: boolean;
  onEchoInteract: () => void;
  onEchoNearby: (nearby: boolean) => void;
}

export function GardenScene({ active, fallen, onEchoInteract, onEchoNearby }: GardenSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 2.8, 9.7], fov: 42, near: 0.1, far: 90 }}
      gl={{ antialias: true, alpha: false }}
      aria-label="Escenario 3D del jardín inicial"
    >
      <Suspense fallback={null}>
        <Garden fallen={fallen} />
      </Suspense>
      <ControllableTraveler active={active} onEchoInteract={onEchoInteract} onEchoNearby={onEchoNearby} />
    </Canvas>
  );
}
