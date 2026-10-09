import { useMachine } from '@xstate/react';
import { lazy, Suspense, useEffect, useState, type PointerEvent } from 'react';
import { storyMachine } from '../narrative/storyMachine';
import { useGameStore } from '../state/gameStore';
import { bindKeyboardControls, setControl, tapControl, type GameControl } from '../world/controlInput';
import { SceneLoading } from './SceneLoading';

const GardenScene = lazy(() => import('../world/GardenScene').then(({ GardenScene: scene }) => ({ default: scene })));

const chapterLabel = 'Prólogo · Los ecos del principio';

export function GameApp() {
  const [story, send] = useMachine(storyMachine);
  const reducedMotion = useGameStore((state) => state.reducedMotion);
  const setReducedMotion = useGameStore((state) => state.setReducedMotion);
  const setChoice = useGameStore((state) => state.setChoice);
  const [nearEcho, setNearEcho] = useState(false);
  const [sceneEnabled, setSceneEnabled] = useState(false);
  const stage = story.value;

  useEffect(() => {
    if (stage !== 'garden') return;
    return bindKeyboardControls();
  }, [stage]);

  const stepNumber = stage === 'title' ? '01'
    : stage === 'garden' ? '02'
      : stage === 'echo' ? '03'
        : stage === 'fall' ? '04'
          : stage === 'decision' ? '05' : '06';

  const choose = (choice: 'share' | 'keep') => {
    setChoice(choice);
    send({ type: 'CHOOSE', choice });
  };

  const begin = () => {
    setSceneEnabled(true);
    send({ type: 'BEGIN' });
  };

  const holdControl = (control: GameControl, pressed: boolean) => (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setControl(control, pressed);
  };

  return (
    <main className={`game-shell${reducedMotion ? ' reduced-motion' : ''}${stage === 'fall' ? ' chapter-fall' : ''}`}>
      <div className="world-layer">
        {sceneEnabled ? (
          <Suspense fallback={<SceneLoading />}>
            <GardenScene active={stage === 'garden'} fallen={stage === 'fall'} onEchoInteract={() => send({ type: 'INTERACT' })} onEchoNearby={setNearEcho} />
          </Suspense>
        ) : <SceneLoading />}
      </div>
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
        <span>{stage === 'fall' ? '02 — LAS CONSECUENCIAS' : '01 — EL JARDÍN'}</span>
      </div>

      <section className={`story-card story-${stage}`} aria-live="polite" aria-atomic="true">
        {stage === 'title' && (
          <>
            <p className="eyebrow">Una memoria que no altera la historia</p>
            <h1>Antes del<br /><em>primer silencio.</em></h1>
            <p className="story-copy">Eren viene de un futuro quebrado por la violencia. Una grieta en el tiempo lo arrojó ante una memoria del principio. Puede recorrerla y enfrentar sus ecos, pero no cambiar lo ocurrido.</p>
            <button className="primary-button" type="button" onClick={begin}>
              Entrar en el jardín <span aria-hidden="true">↗</span>
            </button>
            <p className="button-note">Una experiencia narrativa · 4 min</p>
          </>
        )}

        {stage === 'garden' && (
          <>
            <p className="eyebrow">El mundo aún respira en armonía</p>
            <h2>Todo tenía<br /><em>un lugar.</em></h2>
            <p className="story-copy">La luz tocaba el agua sin romperla. Guía a Eren hasta el halo dorado y escucha el primer eco; esta memoria puede contemplarse, jamás reescribirse.</p>
            <p className="control-hint">{nearEcho ? <>Estás junto al eco · pulsa <span>E</span> para escucharlo</> : <><span>W A S D</span> o flechas para acercarte al halo</>}</p>
          </>
        )}

        {stage === 'echo' && (
          <>
            <p className="eyebrow">El primer eco ha sido encontrado</p>
            <h2>La memoria<br /><em>del principio.</em></h2>
            <p className="story-copy">Eren escuchó el silencio que precedió a su propia historia. El recuerdo permanece intacto; lo que nazca de él dependerá de quien lo guarda.</p>
            <button className="primary-button" type="button" onClick={() => send({ type: 'CONTINUE' })}>
              Seguir el eco <span aria-hidden="true">↗</span>
            </button>
          </>
        )}

        {stage === 'fall' && (
          <>
            <p className="eyebrow">La caída · un eco preservado</p>
            <h2>La confianza<br /><em>se quebró.</em></h2>
            <p className="story-copy">Eren no presencia el acto ni lo transforma. El eco guarda sus consecuencias: vergüenza, distancia de Dios y una tierra que ahora exige trabajo doloroso. Él solo puede contemplar esta memoria; no cruzarla ni cambiar su curso.</p>
            <button className="primary-button" type="button" onClick={() => send({ type: 'CONTINUE' })}>
              Responder al testimonio <span aria-hidden="true">↗</span>
            </button>
          </>
        )}

        {stage === 'decision' && (
          <>
            <p className="eyebrow">Una decisión para quien escucha</p>
            <h2>¿Qué harás<br /><em>con esta memoria?</em></h2>
            <p className="story-copy">El recuerdo no cambia. Lo que cambia es la manera en que Eren lo llevará consigo.</p>
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
            <p className="story-copy">Eren volvió a su tiempo con una pregunta distinta. El origen seguía intacto; ahora su testimonio tenía un rumbo.</p>
            <button className="text-button" type="button" onClick={() => send({ type: 'RESTART' })}>Volver al inicio <span aria-hidden="true">↺</span></button>
          </>
        )}
        <div className="card-footer"><span>LOGOS · THE FIRST BREATHE</span><span>{stepNumber} / 06</span></div>
      </section>

      <footer className="bottom-bar">
        <span>Una historia original, inspirada en los relatos de los orígenes.</span>
        <span className="coordinates">EDÉN · MEMORIA I</span>
      </footer>
      <div className="focus-hint" aria-hidden="true"><span>✧</span> OBSERVA · RECUERDA · ELIGE</div>
      {stage === 'garden' && (
        <div className="touch-controls" aria-label="Controles de movimiento">
          <button type="button" aria-label="Mover hacia adelante" onPointerDown={holdControl('up', true)} onPointerUp={holdControl('up', false)} onPointerLeave={holdControl('up', false)} onPointerCancel={holdControl('up', false)}>↑</button>
          <button type="button" aria-label="Mover a la izquierda" onPointerDown={holdControl('left', true)} onPointerUp={holdControl('left', false)} onPointerLeave={holdControl('left', false)} onPointerCancel={holdControl('left', false)}>←</button>
          <button type="button" aria-label="Interactuar con el eco" onClick={() => tapControl('interact')}>E</button>
          <button type="button" aria-label="Mover a la derecha" onPointerDown={holdControl('right', true)} onPointerUp={holdControl('right', false)} onPointerLeave={holdControl('right', false)} onPointerCancel={holdControl('right', false)}>→</button>
          <button type="button" aria-label="Retroceder" onPointerDown={holdControl('down', true)} onPointerUp={holdControl('down', false)} onPointerLeave={holdControl('down', false)} onPointerCancel={holdControl('down', false)}>↓</button>
        </div>
      )}
    </main>
  );
}
