import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getUsers, sendEmail, changePassword } from "../redux/feature/authSlide";
import {PopOfSpinner} from '../components/PopOfSpinner';
import {toast} from 'react-toastify';

export const ForgotPassword = () => {
    // const {error} = useSelector((state) => ({...state.auth}));
    const {user, loading, code, users} = useSelector((state) => ({...state.auth}));
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const [email, setEmail] = useState("");
    const [checkable, setCheckable] = useState(null);
    const [sendedCode, setSendedCode] = useState("");
    const [checkedAuthor, setCheckedAuthor] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
      // "document.documentElement.scrollTo" is the magic for React Router Dom v6
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // Optional if you want to skip the scrolling animation
      });
    }, [pathname]);
  
    const redirectPage = () => {
      if(user?.result){
        return (
          <>
            <Navigate to="/" />
          </>
        )
      }
    
    const sendCode = (e) => {
      e.preventDefault();
      if(email === ""){
        toast.error("You must enter your email address");
        return;
      }
      dispatch(sendEmail({receivedEmail: email}));
      dispatch(getUsers());
      setCheckable(false);
      console.log(code);
    }

    const verify = (e) => {
      e.preventDefault();
      if(sendedCode === ""){
        toast.error("You must enter your code");
        return;
      }
      const author = users?.find(user => user?.email === email);
      // sendedCode variable alternate for password variable and email variable alternate for confirm password
      if(sendedCode === author?.code[author?.code?.length-1]){
        setCheckedAuthor({...author});
        setCheckable(true);
        toast.success("Your code is correctly checked");
        setEmail("");
        setSendedCode("");
      }
      else {
        toast.error("Your code is not correctly");
      }
    }
    
    const resetPassword = (e) => {
      e.preventDefault();
      if(sendedCode === email){
        dispatch(changePassword({formValue:{password: sendedCode, id: checkedAuthor?._id}, toast, navigate}));
      }
      else {
        toast.error("Your code is not correctly");
      }
    }
      
      return (
        <>
          <div class="container d-flex flex-column">
            <div class="row align-items-center justify-content-center
                min-vh-100 g-0">
                <div class="col-12 col-md-8 col-lg-4 border-top border-3 border-primary">
                <div class="card shadow-sm">
                    <div class="card-body">
                    <div class="mb-4">
                        <h5>Forgot Password?</h5>
                        <p class="mb-2">Enter your registered email ID to reset the password
                        </p>
                    </div>
                    <form>
                        {checkable === null && (
                          <>
                            <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" class="form-control" name="email" placeholder="Enter Your Email"
                                required=""/>
                            </div>
                          </>
                        )}
                        {checkable === false && (
                          <>
                            <div class="mb-3">
                            <label for="email" class="form-label">Code</label>
                            <input value={sendedCode} onChange={(e) => setSendedCode(e.target.value)} type="number" id="code" class="form-control" name="code" placeholder="Enter Your Code"
                                required=""/>
                            </div>
                          </>
                        )}
                        {checkable === true && (
                          <>
                            <div class="mb-3">
                            <label for="email" class="form-label">Password</label>
                            <input value={sendedCode} onChange={(e) => setSendedCode(e.target.value)} type="password" id="code" class="form-control" name="code" placeholder="Enter your password"
                                required=""/>
                            </div>
                            <div class="mb-3">
                            <label for="email" class="form-label">Confirm Password</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="password" id="code" class="form-control" name="code" placeholder="Enter your confirm password"
                                required=""/>
                            </div>
                          </>
                        )}
                        <div class="mb-3 d-grid">
                        {loading ? (
                          <PopOfSpinner/>
                        ): (
                          <>
                            {checkable === null && (
                              <button onClick={sendCode} type="submit" class="btn btn-primary">
                                  SendCode
                              </button>

                            )}
                            {checkable === false && (
                              <button onClick={verify} type="submit" class="btn btn-primary">Veriry</button>
                            )}
                            {checkable === true && (
                              <button onClick={resetPassword} type="submit" class="btn btn-primary">Reset Password</button>
                            )}
                          </>
                        )}
                        </div>
                        <span>Don't have an account? <small style={{cursor: 'pointer'}} className="text-info" onClick={() => navigate('/register')}>sign in</small></span>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
      )
    }
  
    return (
      <>
        {redirectPage()}
      </>
    )
}