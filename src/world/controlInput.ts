export type GameControl = 'up' | 'down' | 'left' | 'right' | 'interact';

const activeControls = new Set<GameControl>();
const keyControls: Record<string, GameControl> = {
  ArrowUp: 'up', w: 'up', W: 'up',
  ArrowDown: 'down', s: 'down', S: 'down',
  ArrowLeft: 'left', a: 'left', A: 'left',
  ArrowRight: 'right', d: 'right', D: 'right',
  e: 'interact', E: 'interact',
};

export function setControl(control: GameControl, pressed: boolean) {
  if (pressed) activeControls.add(control);
  else activeControls.delete(control);
}

export function isControlPressed(control: GameControl) {
  return activeControls.has(control);
}

export function tapControl(control: GameControl) {
  setControl(control, true);
  window.setTimeout(() => setControl(control, false), 110);
}

export function clearControls() {
  activeControls.clear();
}

export function bindKeyboardControls() {
  const handleKey = (event: KeyboardEvent, pressed: boolean) => {
    const control = keyControls[event.key];
    if (!control) return;
    if (control !== 'interact') event.preventDefault();
    setControl(control, pressed);
  };
  const onKeyDown = (event: KeyboardEvent) => handleKey(event, true);
  const onKeyUp = (event: KeyboardEvent) => handleKey(event, false);

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('blur', clearControls);

  return () => {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    window.removeEventListener('blur', clearControls);
    clearControls();
  };
}
