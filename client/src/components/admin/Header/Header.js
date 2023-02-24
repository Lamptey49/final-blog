import React from 'react';
import auth from '../../../auth/auth-helper'
import profileImage from '../../../assets/images/profile-pic.jpg'
import logo from '../../../assets/images/logo.png'
import { Navigate} from 'react-router-dom';
const Header = ()=> {
   
    return(
        <div className='navbar'>
            <div className='container flex'>
                <p className='logo'>
                <img src={logo} alt='scopaf' />
                </p>
                <nav>
                    <ul>
                       
                        <p style={{color:'whitesmoke'}}>{auth.isAuthenticated().fullname}</p>
                        <img className='dashbord-header-avatar' alt=''
                            src={profileImage} />
                            &nbsp;
                        
                        {/* <img 
                            src={LogoutIcon}
                            alt='icon-logout'
                            className='sidebar-item-icon'
                             /> */}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Header;