import React, { createContext, useReducer, useState} from 'react';
import auth from './auth-helper';
import axios from 'axios';
import { signin } from './api-auth';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [user, setUser] = useState(() => {
      let userProfile = auth.isAuthenticated()
      if(userProfile){
        return JSON.parse(userProfile)
      }
      return null
    })
    const login = signin(user).then(data =>
        setUser(data),
        localStorage.setItem('user', JSON.stringify(response.data))    
    )

    return (
        <>
            <AuthContext.Provider value={{ user, login}}>
                {children}
            </AuthContext.Provider>
        </>
    )
  }
  
  