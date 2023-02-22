import React from 'react'
// import auth from '../../auth/auth-helper'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
// import CreateBlog from './blog/CreateBlog'
import sidebar_menu from './constants/sidebar-menu'
// import Admin from './Admin'


export default function Dashboard() {
  return (
    <>
    {/* <Admin /> */}
    <div className='dashboard-container'>
      <Sidebar  menu={sidebar_menu}/>
      <div className='dashboard-body'>
        <Header btnText='Dashboard' />
      </div>
    </div>
    </>
    
  )
}
