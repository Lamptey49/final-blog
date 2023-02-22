import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import auth from './auth-helper'
export default function PrivateRoute({ props, children }) {
    // <Route {...rest} render={props => (
    //     auth.isAuthenticated() ? (<Component {...props} /> )
    //     : (<Navigate to='/auth/signin' state={{ from: props.location }} />)
    // )} />
    return (auth.isAuthenticated() ? <Outlet /> : <Navigate to='/auth/signin' state={{ from: props.location }} />)
}
