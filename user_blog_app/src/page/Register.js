import { MDBBtn, MDBCard, MDBCardBody, MDBCheckbox, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../redux/feature/authSlide';

const Register = () => {
  const {error} = useSelector((state) => ({...state.auth}));
  const {user} = useSelector((state) => ({...state.auth}));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
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

  const { firstName, lastName, email, password} = formValue;

  useEffect(() => {
    error && toast.error(error);
  }, [error])

  const changeToValue = (e) => {
    setFormValue({...formValue, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email && password && firstName && lastName && email){
      dispatch(register({formValue, navigate, toast}));
    }
    else{
      toast.error("Information is not empty")
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
        <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

          <MDBRow>

            <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

              <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
                The best offer <br />
                <span style={{color: 'hsl(218, 81%, 75%)'}}>for your business</span>
              </h1>

              <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                quibusdam tempora at cupiditate quis eum maiores libero
                veritatis? Dicta facilis sint aliquid ipsum atque?
              </p>

            </MDBCol>

            <MDBCol md='6' className='position-relative'>

              <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

              <MDBCard className='my-5 bg-glass'>
                <MDBCardBody className='p-5'>

                  <MDBRow>
                    <MDBCol col='6'>
                      <MDBInput 
                        placeholder="First Name"
                        type='text'
                        name='firstName'
                        value={firstName}
                        onChange={changeToValue} 
                        wrapperClass='mb-4' 
                        label='First name' 
                        id='form1'
                      />
                    </MDBCol>

                    <MDBCol col='6'>
                      <MDBInput
                        placeholder="Last Name"
                        type='text'
                        name='lastName'
                        onChange={changeToValue}
                        value={lastName} 
                        wrapperClass='mb-4' 
                        label='Last name' 
                        id='form2'
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBInput              placeholder="Email"
                    type='email'
                    name='email'
                    onChange={changeToValue}
                    value={email} 
                    wrapperClass='mb-4' 
                    label='Email' 
                    id='form3'
                  />
                  <MDBInput              placeholder="Password"
                    type='password'
                    name='password'
                    onChange={changeToValue}
                    value={password} 
                    wrapperClass='mb-4' 
                    label='Password' 
                    id='form4'
                  />

                  <div className='d-flex justify-content-center mb-4'>
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                  </div>

                  <MDBBtn onClick={handleSubmit} className='w-70 mb-4' size='md'>sign up</MDBBtn>

                  <div className="text-center">


                  </div>

                </MDBCardBody>
              </MDBCard>

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

export default Register