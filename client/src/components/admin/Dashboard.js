import React, {useEffect, useState} from 'react'
import auth from '../../auth/auth-helper'
import Sidebar from './Sidebar/Sidebar'
import sidebar_menu from './constants/sidebar-menu'
import AdminBlogs from './pages/Blogs/AdminBlogs'

export default function Dashboard() {
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
        <div className=' grid-3' style={{display:'flex'}}>
          <div className='card'>
            <h2>Total Blogs</h2>
          </div>
          <div className='card'>
            <h2>Total Users</h2>
          </div>
          <div className='card'>
            <h2>Total Blogs Published</h2>
          </div>
        </div>
        <AdminBlogs />
      </div>
    </div>
    </React.Fragment>
    
  )
}
