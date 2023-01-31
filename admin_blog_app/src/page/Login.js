import { useEffect, useState } from "react";
import {toast} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/features/authSlice';
import { Navigate, useNavigate } from "react-router-dom";


function Login(){
    const dispatch = useDispatch();  
    const {error, admin} = useSelector((state) => ({...state.auth}));

    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({
        email: "",
        password: ""
    })

    const {email, password} = formValue;

    const changeToValue = (e) => {
        setFormValue({...formValue, [e.target.name]: e.target.value})
    }

    useEffect(() => {
      error && toast.error(error);
    }, [error]);

    const loginSubmition = (e) => {
        e.preventDefault();
        
        if(email && password){
          dispatch(login({formValue, navigate, toast}));
        }
        else{
            toast.error("Password and Email not empty")
        }
    }

    const directComponents = () => {
      if(admin?.result){
        return (
          <>
            <Navigate to='/'/>
          </>
        )
      }

      return (
        <div class="container-fluid login_form">
        <div class="row">
          <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card border-0 shadow rounded-3 my-5">
              <div class="card-body p-4 p-sm-5">
                <h5 class="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                <form>
                  <div class="form-floating mb-3">
                    <input name="email" value={email} onChange={changeToValue} type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                    <label for="floatingInput">Email address</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input name="password" value={password} onChange={changeToValue} type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                    <label for="floatingPassword">Password</label>
                  </div>
    
                  <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" value="" id="rememberPasswordCheck"/>
                    <label class="form-check-label" for="rememberPasswordCheck">
                      Remember password
                    </label>
                  </div>
                  <div class="d-grid">
                    <button onClick={loginSubmition} class="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign
                      in</button>
                  </div>
                  <hr class="my-4"/>
                  <div class="d-grid mb-2">
                    <button class="btn btn-google btn-login text-uppercase fw-bold" type="submit">
                       You should be registered from user interface
                    </button>
                  </div>
                  <div class="d-grid">
                    <button class="btn btn-facebook btn-login text-uppercase fw-bold" type="submit">
                       Admin account will be demanded from other admin
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    }

    return (
      <>
        {directComponents()}
      </>
    )
}

export default Login;