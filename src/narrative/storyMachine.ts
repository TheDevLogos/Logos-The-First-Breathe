import { assign, createMachine } from 'xstate';

export type StoryEvent =
  | { type: 'BEGIN' }
  | { type: 'INTERACT' }
  | { type: 'CONTINUE' }
  | { type: 'CHOOSE'; choice: 'share' | 'keep' }
  | { type: 'RESTART' };

export const storyMachine = createMachine({
  types: {} as {
    context: { choice: 'share' | 'keep' | null };
    events: StoryEvent;
  },
  id: 'logosStory',
  initial: 'title',
  context: { choice: null },
  states: {
    title: { on: { BEGIN: 'garden' } },
    garden: { on: { INTERACT: 'echo' } },
    echo: { on: { CONTINUE: 'fall' } },
    fall: { on: { CONTINUE: 'decision' } },
    decision: {
      on: {
        CHOOSE: {
          target: 'epilogue',
          actions: assign({ choice: ({ event }) => event.choice }),
        },
      },
    },
    epilogue: { on: { RESTART: { target: 'title', actions: assign({ choice: null }) } }, },
  },
});
