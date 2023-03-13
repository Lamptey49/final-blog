import React, {useEffect, useState} from 'react'
import auth from '../../auth/auth-helper'
import Sidebar from './Sidebar/Sidebar'
import sidebar_menu from './constants/sidebar-menu'
import AdminBlogs from './pages/Blogs/AdminBlogs'
import PropTypes from 'prop-types'
export default function Dashboard(props) {
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
        
        <AdminBlogs />
      </div>
    </div>
    </React.Fragment>
    
  )
}
Dashboard.propTypes = {
  title: PropTypes.string.isRequired
}
