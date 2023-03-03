import React, {useState, useEffect} from "react";
import {   useNavigate } from "react-router-dom";
import auth from "../../auth/auth-helper";
function ProtectedRoute(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  const checkUserToken = () => {
    if(!auth.isAuthenticated()){
      setIsLoggedIn(false)
      return navigate('/auth/signin')
    } 
      setIsLoggedIn(true)
    
  }
  useEffect(() => {
    checkUserToken()
  }, [isLoggedIn])

    return (
    <React.Fragment>
      {  isLoggedIn ? props.children :  null}
    </React.Fragment>
      )
  }
  
  export default ProtectedRoute;