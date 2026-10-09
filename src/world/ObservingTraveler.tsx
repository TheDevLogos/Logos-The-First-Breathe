import { Billboard, Float } from '@react-three/drei';

export function ObservingTraveler() {
  return (
    <group position={[0, 0, 1.2]}>
      <Float speed={0.7} rotationIntensity={0.025} floatIntensity={0.04}>
        <Billboard follow lockX lockZ>
          <group position={[0, 0.98, 0]}>
            <mesh castShadow position={[0, 0.42, 0]}>
              <sphereGeometry args={[0.22, 8, 6]} />
              <meshStandardMaterial color="#c58c61" roughness={0.88} />
            </mesh>
            <mesh castShadow position={[0, -0.05, 0]}>
              <coneGeometry args={[0.39, 0.92, 7]} />
              <meshStandardMaterial color="#e6d6b6" roughness={1} />
            </mesh>
            <mesh castShadow position={[0, 0.38, 0.18]}>
              <coneGeometry args={[0.28, 0.22, 7]} />
              <meshStandardMaterial color="#604a3b" roughness={1} />
            </mesh>
            <mesh castShadow position={[-0.34, -0.08, 0]} rotation={[0, 0, -0.13]}>
              <capsuleGeometry args={[0.07, 0.52, 3, 5]} />
              <meshStandardMaterial color="#c58c61" roughness={0.9} />
            </mesh>
            <mesh castShadow position={[0.34, -0.08, 0]} rotation={[0, 0, 0.13]}>
              <capsuleGeometry args={[0.07, 0.52, 3, 5]} />
              <meshStandardMaterial color="#c58c61" roughness={0.9} />
            </mesh>
            <mesh position={[0, -0.54, 0.015]}>
              <sphereGeometry args={[0.55, 12, 8]} />
              <meshBasicMaterial color="#e5c588" transparent opacity={0.13} depthWrite={false} />
            </mesh>
          </group>
        </Billboard>
      </Float>
    </group>
  );
}
