/* eslint-disable jsx-a11y/img-redundant-alt */
import { MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { login } from '../redux/feature/authSlide';


const Login = () => {
  const {error} = useSelector((state) => ({...state.auth}));
  const {user} = useSelector((state) => ({...state.auth}));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  })
  const { pathname } = useLocation();

  useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, [pathname]);

  const {email, password} = formValue;

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const changeToValue = (e) => {
    setFormValue({...formValue, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email && password){
      dispatch(login({formValue, navigate, toast}));
    }
    else{
      toast.error("Password and Email not empty")
    }
  }

  const redirectPage = () => {
    if(user?.result){
      return (
        <>
          <Navigate to="/" />
        </>
      )
    }
    
    return (
      <>
        <MDBContainer fluid>
          <MDBRow>

            <MDBCol sm='6'>

              <div className='d-flex flex-row ps-5 pt-5'>
                <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }}/>
                <span className="h1 fw-bold mb-0">Blog_App</span>
              </div>

              <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

                <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>

                <MDBInput placeholder="Email"
                  type='email'
                  name='email'
                  value={email}
                  onChange={changeToValue}
                  wrapperClass='mb-4 mx-5 w-100' 
                  label='Email address' 
                  id='formControlLg' 
                  size="lg"
                />
                <MDBInput 
                  placeholder="Password"
                  type='password'
                  name='password'
                  onChange={changeToValue}
                  value={password}
                  wrapperClass='mb-4 mx-5 w-100' 
                  label='Password' 
                  id='formControlLg' 
                  size="lg"
                />

                <MDBBtn onClick={handleSubmit} className="mb-4 px-5 mx-5 w-100" color='info' size='lg'>Login</MDBBtn>
                <p style={{cursor: 'pointer'}} className="small mb-5 pb-lg-3 ms-5"><small  onClick={() => navigate('/forgotPassword')} class="text-muted" >Forgot password?</small></p>
                <p style={{cursor: 'pointer'}} className='ms-5'>Don't have an account? <small onClick={() => navigate('/register')} class="link-info">Register here</small></p>

              </div>

            </MDBCol>

            <MDBCol sm='6' className='d-none d-sm-block px-0'>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                alt="Login image" className="w-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
            </MDBCol>

          </MDBRow>

        </MDBContainer>
      </>
    )
  }

  return (
    <>
      {redirectPage()}
    </>
  )
}

export default Login