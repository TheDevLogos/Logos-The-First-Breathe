import { Billboard, Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useCallback, useEffect, useRef } from 'react';
import type { Group } from 'three';
import { clearControls, isControlPressed, setControl, type GameControl } from './controlInput';

const keyControls: Record<string, GameControl> = {
  ArrowUp: 'up', w: 'up', W: 'up',
  ArrowDown: 'down', s: 'down', S: 'down',
  ArrowLeft: 'left', a: 'left', A: 'left',
  ArrowRight: 'right', d: 'right', D: 'right',
  e: 'interact', E: 'interact',
};

const echoPosition = { x: 0.15, z: -4.8 };

interface ControllableTravelerProps {
  active: boolean;
  onEchoInteract: () => void;
  onEchoNearby: (nearby: boolean) => void;
}

export function ControllableTraveler({ active, onEchoInteract, onEchoNearby }: ControllableTravelerProps) {
  const traveler = useRef<Group>(null);
  const interacted = useRef(false);
  const callback = useRef(onEchoInteract);
  const rangeCallback = useRef(onEchoNearby);
  const nearEcho = useRef(false);
  callback.current = onEchoInteract;
  rangeCallback.current = onEchoNearby;

  useEffect(() => {
    const handleKey = (event: KeyboardEvent, pressed: boolean) => {
      const control = keyControls[event.key];
      if (!control) return;
      if (control !== 'interact') event.preventDefault();
      setControl(control, pressed);
    };
    const onKeyDown = (event: KeyboardEvent) => handleKey(event, true);
    const onKeyUp = (event: KeyboardEvent) => handleKey(event, false);
    const onBlur = () => clearControls();

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
      clearControls();
    };
  }, []);

  useEffect(() => {
    if (active) {
      interacted.current = false;
      nearEcho.current = false;
    } else {
      clearControls();
      if (nearEcho.current) rangeCallback.current(false);
      nearEcho.current = false;
    }
  }, [active]);

  const onInteract = useCallback(() => callback.current(), []);

  useFrame((_, delta) => {
    const body = traveler.current;
    if (!active || !body) return;

    const horizontal = Number(isControlPressed('right')) - Number(isControlPressed('left'));
    const vertical = Number(isControlPressed('down')) - Number(isControlPressed('up'));
    const length = Math.hypot(horizontal, vertical) || 1;
    const distance = Math.min(delta, 0.05) * 2.7;

    body.position.x = Math.max(-9.3, Math.min(9.3, body.position.x + horizontal / length * distance));
    body.position.z = Math.max(-10, Math.min(3.5, body.position.z + vertical / length * distance));

    const inRange = Math.hypot(body.position.x - echoPosition.x, body.position.z - echoPosition.z) <= 1.45;
    if (inRange !== nearEcho.current) {
      nearEcho.current = inRange;
      rangeCallback.current(inRange);
    }
    if (inRange && isControlPressed('interact') && !interacted.current) {
      interacted.current = true;
      onInteract();
    }
  });

  return (
    <group ref={traveler} position={[0, 0, 1.2]}>
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
