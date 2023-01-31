/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUsers, setLogout, setState } from '../redux/feature/authSlide';
import { getComments } from '../redux/feature/commentSlide';
import { clearUserPosts, getPost, getPostsByUser, updatedViewPost } from '../redux/feature/postSlide';
import { experpt } from '../ulitity';

function Header() {
  const {user} = useSelector((state) => ({...state.auth}));
  const {posts} = useSelector((state) => ({...state.post}));
  const dispatch = useDispatch();
  const navigate = useNavigate(0);
  const handleClickItem = (id, name) => {
    dispatch(getPost(id));
    dispatch(clearUserPosts());
    dispatch(getPostsByUser(name));
    dispatch(getComments(id));
    dispatch(updatedViewPost({id, name: user.result.name}));
    navigate(`/post/${id}`);
  }
  return (
    <nav style={{zIndex: '10'}} class="navbar navbar-expand-sm navbar-light bg-info position-fixed w-100">
    <div class="container-fluid">
        <a style={{cursor: 'pointer'}} class="navbar-brand text-dark fs-4 fw-bold text-decoration-underline" onClick={() => navigate('/')}>GenG</a>
        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#elementPage">
          <i class="fa-solid fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="elementPage">
          <ul style={{cursor: 'pointer'}} class="navbar-nav me-auto text-light">
            <li class="nav-item"><small onClick={() => navigate('/tag/webDev')} class="nav-link">WebDev</small></li>
            <li class="nav-item"><small onClick={() => navigate('/tag/education')} class="nav-link">Education</small></li>
            <li class="nav-item"><small onClick={() => navigate('/tag/sports')} class="nav-link">Sports</small></li>
          </ul>
          <div className='d-flex me-5'>
          
            <ul className=' navbar-nav'>
              {user && (
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle text-primary fw-bold" href="#" data-bs-toggle="dropdown" role="button">
                    <i class="fa-sharp fa-solid fa-bell"></i>
                    <span class="badge rounded-pill badge-notification bg-danger w-0">{user?.result?.notification?.length}</span>
                  </a>
                  <ul class="dropdown-menu">
                    {user?.result?.notification?.map((notifi)  => posts?.find(post => post?._id === notifi)?.state_article === 'done' && (
                      <li style={{cursor: 'pointer'}} className='nav-item d-flex me-3 me-lg-0'>
                        <img className='w-25' src={posts?.find(post => post._id === notifi)?.imageFile}/>
                        <small onClick={() => handleClickItem(posts?.find(post => post._id === notifi && post?.state_article === "done")?._id, user?.result?.name)}  style={{fontSize: '0.5rem'}}>{experpt(posts?.find(post => post._id === notifi)?.title, 20)}</small><br/>
                      </li>
                    ))}
                  </ul>                
                </li>
              )}
              <li>
                
              </li>
              <li class="nav-item">
                <button className='btn btn-info w-auto'>
                  <small onClick={() => navigate('/search')} class="fa-sharp fa-solid fa-magnifying-glass"></small>
                </button>
              </li>
              {user ? (
                <>
                  <li style={{cursor: 'pointer'}} className='dropdown nav-item'>
                    <img style={{width: '3rem', height: '2.4rem'}} src={user?.result?.avatar} className='btn btn-transparent dropdown-toggle' id='drownDownAccount' data-bs-toggle='dropdown' aria-expanded="false"/>
                    <ul  className='dropdown-menu'>
                      <li><small onClick={() => navigate(`/profile/${user?.result?._id}`)} class="dropdown-item">Profile</small></li>
                      <li><small onClick={() => navigate("/dashboard")} class="dropdown-item">DashBoard</small></li>
                      <li><hr/></li>
                      <li onClick={() => {
                            dispatch(setState("Register"));
                            dispatch(clearUsers());
                            dispatch(setLogout());
                      }}><small onClick={() => navigate('/login')} class="dropdown-item">Logout</small></li>
                    </ul>
                  </li>
                  <li className='nav-item'>
                    <small onClick={() => navigate('/createPost')}>
                      <button className='btn btn-warning w-100'>Post</button>
                    </small>
                  </li>
                </>
              ): (
                  <button className='btn btn-warning'>
                    <small onClick={() => navigate('/login')}>
                      Login
                    </small>
                  </button>
              )}
            </ul>
          </div>
        </div>
    </div>
  </nav>
  )
}

export default Header