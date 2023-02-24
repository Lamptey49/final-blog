import React, {useEffect, useState} from 'react'
import auth from '../../auth/auth-helper'
// import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
// import CreateBlog from './blog/CreateBlog'
import sidebar_menu from './constants/sidebar-menu'


export default function Dashboard({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const checkUserToken = () => {
    if(!auth.isAuthenticated()){
      setIsLoggedIn(false)
      
    } else{
      setIsLoggedIn(true)
    }
  }
  useEffect(() => {
    checkUserToken()
  }, [isLoggedIn])

  return (
    <React.Fragment>
 
    <div className='dashboard-container'>
        <Sidebar  menu={sidebar_menu}/>
      <div className='dashboard-body'>
        {children}
      </div>
    </div>
    </React.Fragment>
    
  )
}
