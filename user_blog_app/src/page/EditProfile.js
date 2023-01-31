import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUsers, setLogout, updateAvatar } from "../redux/feature/authSlide";

export const EditProfile = () => {
    const {user} = useSelector((state) => ({...state.auth}));
    const { pathname } = useLocation();
    const inputFile = useRef(null);
    const confirmDialog = useRef(null);
    const [avatarPath, setAvatarPath] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmPassword, setComfirmPassword] = useState("");
    const [formValue, setFormValue] = useState({
        firstname: "",
        surname: "",
        password: "",
        email: ""
    })

    useEffect(() => {
        if(user){
            setFormValue({
                firstname: user?.result?.name.substring(0, 4),
                surname: user?.result?.name.substring(4, user?.result?.name?.length),
                password: "",
                email: user?.result?.email,
                avatar: user?.result?.avatar
            })
            setComfirmPassword("");
        }
    }, [user]); 

    useEffect(() => {
      // "document.documentElement.scrollTo" is the magic for React Router Dom v6
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // Optional if you want to skip the scrolling animation
      });
    }, [pathname]);
    const {firstname, surname, password, email, avatar} = formValue;

    const changeToValue = (e) => {
        setFormValue({...formValue, [e.target.name]: e.target.value})
    }

    const changeAvatar = (event) => {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setAvatarPath(reader.result);
        }
    }

    const saveProfile = () => {
        if(confirmPassword !== password){
            confirmDialog.current.style.backgroundColor = 'blue';
            toast.error("Confirm password is not suitable!!!");
            return;
        }
        
        const formPatch = {
            name: firstname+surname,
            password,
            email,
            avatar: avatarPath
        }

        dispatch(updateAvatar({id: user?.result?._id, formValues: formPatch}));
        dispatch(getUsers());
        dispatch(setLogout());
        navigate('/login');
    }

    return (
        <>
            <div class="container rounded bg-white mt-5 mb-5">
                <div class="row">
                    <div class="col-md-3 border-right">
                        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                        <div class="card text-bg-dark">
                        <input onChange={changeAvatar} type='file' id='file' ref={inputFile} style={{display: 'none'}}/>
                        <img src={avatar} class="card-img" alt="..."/>
                        <div style={{cursor: 'pointer'}} onClick={() => inputFile.current.click()} class="card-img-overlay">
                            <i class="fa-solid fa-user-pen text-dark d-flex justify-content-end"></i>
                        </div>
                        </div>
                        <span class="font-weight-bold">{`${firstname+surname}`}</span><span class="text-black-50">{email}</span><span> </span></div>
                    </div>
                    <div class="col-md-5 border-right">
                        <div class="p-3 py-5">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h4 class="text-right">Profile Settings</h4>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-6"><label class="labels">Name</label><input type="text" class="form-control" placeholder="firstname" name="firstname" onChange={changeToValue} value={firstname}/></div>
                                <div class="col-md-6"><label class="labels">Surname</label><input type="text" class="form-control" onChange={changeToValue} value={surname} placeholder="surname" name="surname"/></div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-12"><label class="labels">Password</label><input type="password" class="form-control" placeholder="New or Old Password" name="password" onChange={changeToValue} value={password}/></div>
                                <div class="col-md-12"><label class="labels">Confirm Password</label><input ref={confirmDialog} onChange={(e) => setComfirmPassword(e.target.value)} type="password" class="form-control" placeholder="Confirm New or Now Password" value={confirmPassword}/></div>
                            </div>
                            <div class="mt-5 text-center"><button onClick={saveProfile} class="btn btn-primary profile-button" type="button">Save Profile</button></div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="p-3 py-5">
                            <div style={{cursor: 'pointer'}} class="d-flex justify-content-between align-items-center experience"><span>Edit Gmail</span><span class="border px-3 p-1 add-experience"><i class="fa fa-plus"></i>&nbsp;Change Gmail</span></div><br/>
                            <div class="col-md-12"><label class="labels">Gmail</label><input type="text" class="form-control" placeholder="Gmail want to change" name="email" value={email}/></div> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}