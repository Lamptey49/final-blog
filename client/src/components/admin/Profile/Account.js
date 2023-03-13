import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import DeleteUser from './DeleteUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUser } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import SideBar from '../Sidebar/Sidebar';
import sidebar_menu from '../constants/sidebar-menu';
import Footer from '../../core/Footer';

const Account = () => {
   
    const navigate = useNavigate()
    const {userId} = useParams()
    const [user, setUser] = useState({})
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const [open, setOpen] = useState(false)

    const clickButton = () => {
        setOpen(true)
      }

    const getId = ()=> {
        let id = sessionStorage.getItem('jwt')
       return JSON.parse(id)
       
    }
    useEffect(() => {
        document.title = 'Account Profile'
        fetch(`/api/users/${getId().user._id}`,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer '+getId().token
            }
        }).then((response)=>{ return response.json()})
        .then((data) =>{
            if(data && data.error){
                setRedirectToSignin(true)
            } else {
                setUser(data)
            }
        })
       
    }, [userId])

    if(redirectToSignin){
        return navigate('/auth/signin')
    }
    return (
        <React.Fragment>
           
            <div className='dashboard-container'>
                <SideBar menu={sidebar_menu} />
                <div className='dashboard-body'>
                    <div className='dashboard-content'>
                    
                        <div className='dashboard-content-container'>
                        <div className='dashboard-content-header'>
                                <h2 className='text-center'>Account Profile</h2>
                        </div>
                           
                        <div className="card">
                            <div className="grid">
                                { user && 
                                
                                    <div className="">
                                        <FontAwesomeIcon icon={faUser} className='fa-3x'/>
                                        <h5>{user.fullname}<br /> {user.email}</h5>
                                        <p>Joined: { (new Date(user.created)).toDateString()}</p>
                                        {getId().user && getId().user._id == user._id && 
                                        (
                                        <div><Link to={'/user/edit/'+user._id}>
                                            <FontAwesomeIcon icon={faEdit} className='fa-2x'/>
                                        </Link> &nbsp;&nbsp;
                                        <DeleteUser userId={user._id} open={open} onClick={clickButton} />
                                        </div>
                                            )
                                        }
                                    </div>
                                    
                              
                                }
                            </div>
                        </div>
                            
                        
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
};



export default Account;
