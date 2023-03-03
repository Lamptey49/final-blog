import React, { StrictMode } from 'react';
import { BrowserRouter,  } from 'react-router-dom';
import MainRouter from './MainRouter'
import './App.css';

function App() {

  return (
    <div>
      <StrictMode>
          <BrowserRouter>
              <MainRouter />
          </BrowserRouter>
      </StrictMode>
    </div>
  );
}

export default App;
