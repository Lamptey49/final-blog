import React, { StrictMode } from 'react';
import { BrowserRouter,  } from 'react-router-dom';
import MainRouter from './MainRouter'
import 'react-quill/dist/quill.snow.css'
import './App.css';

function App() {

  return (
    <div>
    
          <BrowserRouter>
              <MainRouter />
          </BrowserRouter>
     
    </div>
  );
}

export default App;
