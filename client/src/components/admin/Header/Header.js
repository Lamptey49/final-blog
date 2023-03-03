import React, { useEffect} from 'react';
import auth from '../../../auth/auth-helper'
import profileImage from '../../../assets/images/profile-pic.jpg'
import logo from '../../../assets/images/logo.png'
import { Navigate} from 'react-router-dom';
const Header = ()=> {

    
    return(
       
<nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
    <a className="navbar-brand logo" href="/admin">
        <img src={logo}  alt='scopaf' />
    </a>
  
   
   
    {
        auth.isAuthenticated  &&
        (
          
                <div className='nav-item'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <img  className='dashbord-header-avatar' src={profileImage} />
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' style={{cursor:'pointer'}} 
                            onClickCapture={auth.clearJWT()}>Logout</a> 
                        </li>
                    </ul>
                </div>
         
        )
    }
  </div>
</nav>
    )
}

export default Header;