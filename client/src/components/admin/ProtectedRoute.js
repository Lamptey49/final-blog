import React from "react";
import {  Navigate } from "react-router-dom";
import auth from "../../auth/auth-helper";
function ProtectedRoute(Component) {

    return auth.isAuthenticated() ? <Component /> :  <Navigate to='/auth/signin' />
  }
  
  export default ProtectedRoute;