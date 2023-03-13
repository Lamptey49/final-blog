import { faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import auth from '../../../auth/auth-helper'
import { read, update } from '../../../auth/api-user'
import { Navigate, useParams } from 'react-router-dom'
import SideBar from '../Sidebar/Sidebar';
import sidebar_menu from '../constants/sidebar-menu';
import Footer from '../../core/Footer'

export const EditProfile = () => {
    const [values, setValues] = useState({
        fullname: '',
        email: '',
        password: '',
        redirectToProfile: false,
        error: ''
    })
    const { id } = useParams()
    const getId = ()=> {
        let id = sessionStorage.getItem('jwt')
       return JSON.parse(id)
       
    }
    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
  
      read({
        userId: getId().user._id
      }, {t: getId().token}, signal).then((data) => {
        if (data && data.error) {
          setValues({...values, error: data.error})
        } else {
          setValues({...values, fullname: data.fullname, email: data.email})
        }
      })
      return function cleanup(){
        abortController.abort()
      }
  
    }, [])
  
    const authUserDetails = (user, cb) => {
      const authUser = JSON.parse(sessionStorage.getItem('jwt'))
      authUser.user = user 
      sessionStorage.setItem('jwt', JSON.stringify(authUser))
      cb()
    }
    const clickSubmit = () => {
      const userDetails = {
        fullname: values.fullname || undefined,
        email: values.email || undefined,
        password: values.password || undefined,
      }
      update({
        userId: getId().user._id
      }, {
        t: getId().token
      }, userDetails).then((data) => {
        if (data && data.error) {
          setValues({...values, error: data.error})
        } else {
          authUserDetails(data, ()=>{
            setValues({...values, userId: data._id, redirectToProfile: true})
          })
           
        }
      })
    }
    const handleChange = name => event => {
      setValues({...values, [name]: event.target.value})
    }
   
  
    if (values.redirectToProfile) {
      return (<Navigate to={'/admin/profile'}/>)
    }
      return (
        <>
          <div className='dashboard-container'>
                  <SideBar menu={sidebar_menu} />
                  <div className='dashboard-body'>
                      <div className='dashboard-content'>
                      
                          <div className='dashboard-content-container'>
                          <div className='dashboard-content-header'>
                                  <h2 className='text-center'>Account Profile</h2>
                          </div>
                          <div className='card'>
                          
                              <h2>
                                Edit Profile
                              </h2>
                              <input id="fullname" label="Name" className={'form-control'} value={values.fullname} onChange={handleChange('fullname')} margin="normal"/><br/>
                              <input id="email" type="email" label="Email" className={'form-control'} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
                              <input id="password" type="password" label="Password" className={'form-control'} value={values.password} onChange={handleChange('password')} margin="normal"/>
                              
                            
                              <br/> {
                                values.error && (<p  className='alert-error'>
                                  <FontAwesomeIcon icon={faWarning} />
                                  {values.error}
                                </p>)
                              }
                              <Button color="primary" variant="contained" onClick={clickSubmit}>Submit</Button>
                          </div>
                          </div>
                      </div>
                  </div>
          </div>
          <Footer />
        </>
  )
}
