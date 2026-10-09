import React from 'react';
import ReactDOM from 'react-dom/client';
import { GameApp } from './app/GameApp';
import './app/game.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GameApp />
  </React.StrictMode>,
);
