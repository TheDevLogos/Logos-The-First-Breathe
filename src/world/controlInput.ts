export type GameControl = 'up' | 'down' | 'left' | 'right' | 'interact';

const activeControls = new Set<GameControl>();

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
