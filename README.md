# Logos: The First Breathe

An original 3D narrative RPG prototype about the first echoes of human history.

## Requirements

- Node.js 20.19+ or 22.12+
- npm 10+

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and add the Supabase publishable key.
3. Start the Vite development server with `npm run dev`.

Run the narrative state tests with `npm test`. After creating a production build, run the browser flow with `npm run test:e2e` (Playwright Chromium must be installed).

The initial garden scene can run without Supabase credentials. The Supabase client is only initialized when both public environment variables are present. Never put a Supabase secret or `service_role` key in this browser application.

## Structure

- `src/app`: application shell and presentation.
- `src/world`: Three.js scene, environment, and characters.
- `src/narrative`: story copy and XState flow.
- `src/state`: serializable gameplay preferences and choices in Zustand.
- `src/services`: integrations such as Supabase.

The protagonist, Aren, is a later witness to preserved echoes of the beginning. He observes those memories without entering or changing the events described in Scripture. The spiritual presence is represented through light and atmosphere, never as an anthropomorphic character.

## Current slice

The first playable slice introduces the garden, its witness, and a small decision about what to do with a memory. Move Aren with WASD or the arrow keys, approach the golden echo, and press E to interact. Touch controls appear on narrow screens. The choice affects Aren's response to the memory, not the historical event itself.
