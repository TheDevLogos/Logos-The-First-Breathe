export function SceneLoading() {
  return (
    <div className="scene-loading" role="status" aria-live="polite">
      <span className="scene-loading-mark" aria-hidden="true">✳</span>
      <span>Preparando el jardín…</span>
    </div>
  );
}
