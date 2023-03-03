import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { render } from 'react-dom';
import './index.css';
import '../../node_modules/@fortawesome/fontawesome-svg-core/styles.css'

import App from './App';

const container = document.getElementById('root');
let renderMethod = module.hot ? createRoot : hydrateRoot

const root = renderMethod(container);
root.render(<App />)
