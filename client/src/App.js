import React from 'react';
import { BrowserRouter,  } from 'react-router-dom';
import MainRouter from './MainRouter'
import './App.css';
// import AuthProvider from './auth/AuthProvider'
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
