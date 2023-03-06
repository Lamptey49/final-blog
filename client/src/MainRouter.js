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
import Account from './components/admin/Profile/Account'
import { EditProfile } from './components/admin/Profile/EditProfile'
export default function MainRouter() {
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
            <Route path='/blogs/:id' element={<SinglePage />} />
            <Route path='/blog/:id' element={<Blog />} />
            {/**Admin Dashboard routes */}
            <Route path='/admin/'  element={<Dashboard />}>
              <Route path='blogs' element={<AdminBlogs />} />
            </Route>
              <Route path='/admin/edit/blog/:id' element={<EditBlog />} />
              {/* <Route path='/admin/delete/blog/:id' element={<DeleteBlog />} /> */}
              <Route path='/admin/profile' element={<Account />} />
              <Route path='/user/edit/:id' element={<EditProfile />}/>
              <Route path='/admin/new/blog'  element={<CreateBlog />}/>
           
        </Routes>
        
        {/* <Footer  /> */}
    </>
  )
}
