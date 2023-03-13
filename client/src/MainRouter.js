import React, {useState, useEffect}from 'react'
import { Routes, Route} from 'react-router-dom'
import auth from './auth/auth-helper'
import Home from './components/core/Home'
import { Contact } from './components/core/Contact'
import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'
import Blog from './components/Blogs/Blog'
import Dashboard from './components/admin/Dashboard'
import { SinglePage } from './components/Blogs/SinglePage'
import CreateBlog from './components/admin/blog/CreateBlog'
import AdminBlogs from './components/admin/pages/Blogs/AdminBlogs'
import { EditBlog } from './components/admin/blog/EditBlog'
import {DeleteBlog} from './components/admin/blog/DeleteBlog'
import Account from './components/admin/Profile/Account'
import { EditProfile } from './components/admin/Profile/EditProfile'
import PageNotFound from './components/PageNotFound'
export default function MainRouter(props) {
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
    <>
          
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/auth/signin' element={<Signin/>} />
            <Route path='/user/signup' element={<Signup/>} />
            <Route path='/blogs/:id/:slug' element={<SinglePage />} />
            <Route path='/blog/:id/slug' element={<Blog />} />
            <Route path='*' element={<PageNotFound />} />
            {/**Admin Dashboard routes */}
            <Route path='/admin/'  element={<Dashboard title={'Dashboard'} />}>
              <Route path='blogs' element={<AdminBlogs title='Admin' />} />
            </Route>
              <Route path='/admin/edit/blog/:id' element={<EditBlog />} />
              <Route path='/api/blog/:blog_id/:user_id' element={<DeleteBlog />} />
              <Route path='/admin/profile' element={<Account />} />
              <Route path='/user/edit/:id' element={<EditProfile />}/>
              <Route path='/admin/new/blog'  element={<CreateBlog />}/>
           
        </Routes>
        
        {/* <Footer  /> */}
    </>
  )
}
