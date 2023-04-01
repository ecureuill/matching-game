import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/settings/colors.css';
import './styles/settings/spacings.css';
import './styles/settings/fonts.css';

import './styles/generics/normalize.css';
import './styles/generics/generic.css';
import './styles/elements/base.css';

import App from './pages/App';
import { GameProvider } from './contexts/GameContext';

if (process.env.NODE_ENV !== 'production') {
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
  <GameProvider>
    <App />
  </GameProvider>
  </React.StrictMode>
);
