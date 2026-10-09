import { createActor } from 'xstate';
import { describe, expect, it } from 'vitest';
import { storyMachine } from './storyMachine';

describe('storyMachine', () => {
  it('leads from the prologue into the garden, a choice, and its epilogue', () => {
    const actor = createActor(storyMachine).start();

    expect(actor.getSnapshot().value).toBe('title');
    actor.send({ type: 'BEGIN' });
    expect(actor.getSnapshot().value).toBe('garden');
    actor.send({ type: 'CONTINUE' });
    expect(actor.getSnapshot().value).toBe('garden');
    actor.send({ type: 'INTERACT' });
    expect(actor.getSnapshot().value).toBe('echo');
    actor.send({ type: 'CONTINUE' });
    expect(actor.getSnapshot().value).toBe('fall');
    actor.send({ type: 'CONTINUE' });
    expect(actor.getSnapshot().value).toBe('decision');
    actor.send({ type: 'CHOOSE', choice: 'share' });

    expect(actor.getSnapshot().value).toBe('epilogue');
    expect(actor.getSnapshot().context.choice).toBe('share');
    actor.stop();
  });

  it('can restart the experience and clear the transient story choice', () => {
    const actor = createActor(storyMachine).start();
    actor.send({ type: 'BEGIN' });
    actor.send({ type: 'INTERACT' });
    actor.send({ type: 'CONTINUE' });
    actor.send({ type: 'CONTINUE' });
    actor.send({ type: 'CHOOSE', choice: 'keep' });
    actor.send({ type: 'RESTART' });

    expect(actor.getSnapshot().value).toBe('title');
    expect(actor.getSnapshot().context.choice).toBeNull();
    actor.stop();
  });
});
