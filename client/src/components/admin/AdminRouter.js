import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Header from './Header/Header'
import Dashboard from './Dashboard'
import CreateBlog from './blog/CreateBlog'
import AdminBlogs from './pages/Blogs'
import { EditBlog } from './blog/EditBlog'
import ProtectedRoute from './ProtectedRoute'

 const AdminRouter = () => {
  return (
    <>
        {/* <Header /> */}
        <Routes>
        
            <Route path='/admin/new/blog' element={<CreateBlog />}>
              {/* <Route path='' element={
                <ProtectedRoute isLoggedIn >
                  <CreateBlog/>
                </ProtectedRoute>} /> */}
            </Route>
           <Route path='/admin/blogs' element={<AdminBlogs />}>
              {/* <Route path='' element={
                <ProtectedRoute isLoggedIn>
                  <AdminBlogs/>
                </ProtectedRoute>} /> */}
            </Route>
            <Route path='/admin/edit/:id' element={<EditBlog />}>
              {/* <Route path='' element={
                <ProtectedRoute isLoggedIn>
                  <EditBlog/>
                </ProtectedRoute>} /> */}
            </Route>
              
        </Routes>
    </>
  )
}

export default AdminRouter