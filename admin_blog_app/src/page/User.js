import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { changeAndBan, getUsers } from "../redux/features/authSlice";
import ListSpinner from "../component/ListSpinner";
import {toast} from 'react-toastify';

function User() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {posts} = useSelector((state) => ({...state.article}));
    const {users, admin, loading} = useSelector((state) => ({...state.auth}));
    const [amountOfChecked, setAmountOfChecked] = useState([]); 
    const [levelOfAdmin, setLevelOfAdmin] = useState(0);
    const { pathname } = useLocation();

    useEffect(() => {
        // "document.documentElement.scrollTo" is the magic for React Router Dom v6
        document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // Optional if you want to skip the scrolling animation
        });
    }, [pathname]);

    const increaseOrDecreaseAmountChecked = (e) => {
        if(e.target.checked === true){
            setAmountOfChecked(() => {
                const index = amountOfChecked.find(id_user => id_user === e.target.value);
                if(index === undefined){
                    amountOfChecked.push(e.target.value);
                    console.log(amountOfChecked);
                    return amountOfChecked;
                }
                return amountOfChecked;
            });
        }
        else {
            setAmountOfChecked(() => {
                const removedUser = amountOfChecked.filter(id_user => id_user !== e.target.value);
                console.log(removedUser);
                return removedUser;
            });
        }
    }

    const changeToAdmin = (level) => {
        const formValue = {
            amountOfChange: amountOfChecked,
            change: level,
            ban: null
        }

        dispatch(changeAndBan({formValue, navigate, toast}))
        dispatch(getUsers())
    }

    const banUser = (ban) => {
        const formValue = {
            amountOfChange: amountOfChecked,
            change: null,
            ban
        }

        dispatch(changeAndBan({formValue, navigate, toast}))
        dispatch(getUsers())
    }
    return (
        <>
            {loading ? (
                <ListSpinner/>
            ) : (
                <>
                    <h1>All User</h1>
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Followers</th>
                            <th scope="col">Amount of Articles</th>
                            <th scope="col">Amount of Views</th>
                            <th scope="col">Amount of Comments</th>
                            </tr>
                        </thead>
                        <tbody style={{cursor: 'pointer'}}>
                            {users?.filter(user => user?._id !== admin?.result?._id && user.ban === false && user.role === 'user')?.length === 0 && (
                                <h1>Don't have any user on this page</h1>
                            )}
                            {users?.filter(user => user?._id !== admin?.result?._id && user.ban === false && user.role === 'user').map((user, id) => (
                                <tr>
                                <th scope="row"><input value={user?._id} onClick={increaseOrDecreaseAmountChecked} type={'checkbox'}/>{id+1}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user?.followers?.length}</td>
                                <td>{posts?.filter(post => post?.author === user?.name)?.length}</td>
                                <td>{posts?.filter(post => post?.author === user?.name)?.reduce((total, post) => {
                                    return total + post?.views?.length
                                }, 0)}</td>
                                <td>{posts?.filter(post => post?.author === user?.name)?.reduce((total, post) => {
                                    return total + post?.comment?.length
                                }, 0)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        <button onClick={() => changeToAdmin(1)} disabled={amountOfChecked?.length===0?true:false} type="button" class="btn btn-outline-primary me-3">Change To Admin</button>
                        <button onClick={() => banUser(true)} disabled={amountOfChecked?.length===0?true:false} type="button" class="btn btn-outline-danger">Ban</button>
                    </div>
                    <hr/>
                    <hr/>
                    <h1>All Admin</h1>
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Followers</th>
                            <th scope="col">Amount of Articles</th>
                            <th scope="col">Amount of Views</th>
                            <th scope="col">Amount of Comments</th>
                            </tr>
                        </thead>
                        <tbody style={{cursor: 'pointer'}}>
                            {users?.filter(user => user?._id !== admin?.result?._id && user.ban === false && user.level_admin < admin?.result?.level_admin && user.role === "admin")?.length === 0 && (
                                <h1>Don't have any user on this page</h1>
                            )}
                            {users?.filter(user => user?._id !== admin?.result?._id && user.ban === false && user.level_admin < admin?.result?.level_admin).map((user, id) => (
                                <tr>
                                <th scope="row"><input value={user?._id} onClick={increaseOrDecreaseAmountChecked} type={'checkbox'}/>{id+1}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user?.followers?.length}</td>
                                <td>{posts?.filter(post => post?.author === user?.name)?.length}</td>
                                <td>{posts?.filter(post => post?.author === user?.name)?.reduce((total, post) => {
                                    return total + post?.views?.length
                                }, 0)}</td>
                                <td>{posts?.filter(post => post?.author === user?.name)?.reduce((total, post) => {
                                    return total + post?.comment?.length
                                }, 0)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        <input disabled={amountOfChecked?.length===0?true:false} value={levelOfAdmin} onChange={(e) => {
                            if(e.target.value > admin?.result?.level_admin){
                                toast.error("Your power is not enought to increase");
                                return;
                            }
                            setLevelOfAdmin(e.target.value);

                        }} type="number" id="quantity" name="quantity" min='0' max="5"/>
                        <button onClick={() => changeToAdmin(levelOfAdmin)} disabled={amountOfChecked?.length===0?true:false} type="button" class="btn btn-outline-primary me-3">Change To Admin</button>
                        <button onClick={() => banUser(true)} disabled={amountOfChecked?.length===0?true:false} type="button" class="btn btn-outline-danger">Ban</button>
                    </div>
                    <hr/>
                    <hr/>
                    <h1>All Banned Username</h1>
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Followers</th>
                            <th scope="col">Amount of Articles</th>
                            <th scope="col">Amount of Views</th>
                            <th scope="col">Amount of Comments</th>
                            </tr>
                        </thead>
                        <tbody style={{cursor: 'pointer'}}>
                            {users?.filter(user => user?._id !== admin?.result?._id && user.ban === false && user.role === 'user')?.length === 0 && (
                                <h1>Don't have any user on this page</h1>
                            )}
                            {users?.filter(user => user?._id !== admin?.result?._id && user.ban === true).map((user, id) => (
                                <tr>
                                <th scope="row"><input value={user?._id} onClick={increaseOrDecreaseAmountChecked} type={'checkbox'}/>{id+1}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>{user?.followers?.length}</td>
                                <td>{posts?.filter(post => post?.author === user?.name)?.length}</td>
                                <td>{posts?.filter(post => post?.author === user?.name)?.reduce((total, post) => {
                                    return total + post?.views?.length
                                }, 0)}</td>
                                <td>{posts?.filter(post => post?.author === user?.name)?.reduce((total, post) => {
                                    return total + post?.comment?.length
                                }, 0)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        <button onClick={() => banUser(false)} disabled={amountOfChecked?.length===0?true:false} type="button" class="btn btn-outline-danger">UnBan</button>
                    </div>
                    <hr/>
                    <hr/>
                </>
            )}
        </>
    )
}

export default User;