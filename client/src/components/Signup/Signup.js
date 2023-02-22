import React, {  useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { create } from '../../auth/api-user'
import Footer from '../core/Footer';
import Header from '../core/Header';
export default function Signup(props) {
    
    const [values, setValues] = useState({
      fullname:'',
      email:'',
      password:'',
      error:'',
      redirectToRefer:false
    })
   
    const navigate = useNavigate();
    const handleChange =  event => {
      const value =  event.target.value 
      setValues({  value:value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
          fullname:values.fullname || undefined,
          email:values.email || undefined,
          password: values.password || undefined
        }
        create(user).then((data) => {
          if(data && data.error){
            setValues({ ...values, error:data.error, redirectToRefer: false})
          } else{
            setValues({...values,  redirectToRefer:true })
          }
        })
        
    };
    
    const { from } = props.location || {
      from:{
        pathname:'/auth/signin'
      }
    }
    const { redirectToRefer } = values
    if(redirectToRefer){
      navigate(from)
    }
    const gotoLoginPage = () => navigate("/auth/signin");
      return (
        <>
        <Header />
        <section  className='container flex'>
  
          <div className='signup__container'>
          <h2 className="text-center">Sign up </h2>
          <form className='signup__form' onSubmit={handleSubmit}>
              
                <label htmlFor='email'>Email Address</label>
                <input
                    className="form-control"
                    type='email'
                    name='email'
                    id='email'
                    value={values.email}
                    required
                    onChange={handleChange}
                    style={{width:'250px'}}
                />
           
            
                <label htmlFor='fullname'>Name</label>
                <input
                    className="form-control"
                    type='text'
                    id='fullname'
                    name='fullname'
                    value={values.fullname}
                    required
                    onChange={handleChange}
                    style={{width:'250px'}}
                />
             
              
                <label htmlFor='password'>Password</label>
                <input
                    className="form-control"
                    type='password'
                    name='password'
                    id='password'
                    minLength={6}
                    required
                    value={values.password}
                    onChange={handleChange}
                    style={{width:'250px'}}
                />
              <br />
              <button  type="submit" className='btn btn-primary'>Sign Up</button>
              <p style={{color:'green'}}>
                  Already have an account?{" "}
                  <span className='link'  style={{color:'red', cursor:'pointer'}} onClick={gotoLoginPage}>
                      Login
                  </span>
              </p>
              &nbsp;&nbsp;
          </form>
          </div>
        </section>
        <Footer />
        </>
      )
  }
