import { useMachine } from '@xstate/react';
import { storyMachine } from '../narrative/storyMachine';
import { useGameStore } from '../state/gameStore';
import { GardenScene } from '../world/GardenScene';

const chapterLabel = 'Prólogo · Los ecos del principio';

export function GameApp() {
  const [story, send] = useMachine(storyMachine);
  const reducedMotion = useGameStore((state) => state.reducedMotion);
  const setReducedMotion = useGameStore((state) => state.setReducedMotion);
  const setChoice = useGameStore((state) => state.setChoice);
  const stage = story.value;

  const choose = (choice: 'share' | 'keep') => {
    setChoice(choice);
    send({ type: 'CHOOSE', choice });
  };

  return (
    <main className={`game-shell${reducedMotion ? ' reduced-motion' : ''}`}>
      <div className="world-layer" aria-hidden="true"><GardenScene /></div>
      <div className="atmosphere" aria-hidden="true" />

      <header className="topbar">
        <a className="wordmark" href="#inicio" aria-label="Logos, inicio">
          <span className="wordmark-symbol">✳</span>
          <span>LOGOS</span>
        </a>
        <div className="chapter-name"><span className="chapter-dot" />{chapterLabel}</div>
        <button
        className="motion-toggle"
          type="button"
          aria-pressed={reducedMotion}
          onClick={() => setReducedMotion(!reducedMotion)}
        >
          <span aria-hidden="true">◌</span><span>Movimiento suave</span>
        </button>
      </header>

      <div className="scene-caption" aria-hidden="true">
        <span>UN RELATO SOBRE EL ORIGEN</span>
        <span className="caption-line" />
        <span>01 — EL JARDÍN</span>
      </div>

      <section className={`story-card story-${stage}`} aria-live="polite" aria-atomic="true">
        {stage === 'title' && (
          <>
            <p className="eyebrow">Una memoria que no altera la historia</p>
            <h1>Antes del<br /><em>primer silencio.</em></h1>
            <p className="story-copy">Mucho después, Aren encontró un eco bajo la piedra. No era una puerta al pasado, sino una memoria del mundo que fue.</p>
            <button className="primary-button" type="button" onClick={() => send({ type: 'BEGIN' })}>
              Entrar en el jardín <span aria-hidden="true">↗</span>
            </button>
            <p className="button-note">Una experiencia narrativa · 4 min</p>
          </>
        )}

        {stage === 'garden' && (
          <>
            <p className="eyebrow">El mundo aún respira en armonía</p>
            <h2>Todo tenía<br /><em>un lugar.</em></h2>
            <p className="story-copy">La luz tocaba el agua sin romperla. Aren escuchó aquel orden con reverencia: una historia que podía contemplar, jamás reescribir.</p>
            <button className="primary-button" type="button" onClick={() => send({ type: 'CONTINUE' })}>
              Seguir el eco <span aria-hidden="true">↗</span>
            </button>
          </>
        )}

        {stage === 'decision' && (
          <>
            <p className="eyebrow">Una decisión para quien escucha</p>
            <h2>¿Qué harás<br /><em>con esta memoria?</em></h2>
            <p className="story-copy">El recuerdo no cambia. Lo que cambia es la manera en que Aren lo llevará consigo.</p>
            <div className="choice-list">
              <button className="choice-button" type="button" onClick={() => choose('share')}>
                <span className="choice-index">01</span><span><strong>Compartirla</strong><small>Que otros encuentren esperanza.</small></span><span className="choice-arrow">↗</span>
              </button>
              <button className="choice-button" type="button" onClick={() => choose('keep')}>
                <span className="choice-index">02</span><span><strong>Guardarla</strong><small>Proteger lo que aún no comprendes.</small></span><span className="choice-arrow">↗</span>
              </button>
            </div>
          </>
        )}

        {stage === 'epilogue' && (
          <>
            <p className="eyebrow">La memoria permanece</p>
            <h2>{story.context.choice === 'share' ? <>Una luz<br /><em>compartida.</em></> : <>Un silencio<br /><em>custodiado.</em></>}</h2>
            <p className="story-copy">Aren volvió al mundo de piedra con una pregunta distinta. El origen seguía intacto; ahora su testimonio tenía un rumbo.</p>
            <button className="text-button" type="button" onClick={() => send({ type: 'RESTART' })}>Volver al inicio <span aria-hidden="true">↺</span></button>
          </>
        )}
        <div className="card-footer"><span>LOGOS · THE FIRST BREATHE</span><span>01 / 06</span></div>
      </section>

      <footer className="bottom-bar">
        <span>Una historia original, inspirada en los relatos de los orígenes.</span>
        <span className="coordinates">EDÉN · MEMORIA I</span>
      </footer>
      <div className="focus-hint" aria-hidden="true"><span>✧</span> OBSERVA · RECUERDA · ELIGE</div>
    </main>
  );
}
