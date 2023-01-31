import React, { useEffect } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';
import {ToastContainer} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, setUser } from './redux/feature/authSlide';
import AddEditPage from './page/AddEditPage';
import NotFound from './page/NotFound';
import { getRelatedAdd } from './redux/feature/postSlide';
import TagPage from './page/TagPage';
import Profile from './page/Profile';
import DashBoard from './page/DashBoard';
import UserPage from './page/UserPage';
import Search from './page/Search';
import Article from './page/Article';
import { Banner } from './components/Banner';
import { Footer } from './components/Footer';
import { EditProfile } from './page/EditProfile';
import { ForgotPassword } from './page/ForgotPassword';
import { ProtectedRoutes } from './components/ProtectedRoute';
import { AdminPage } from './page/AdminPage';

const App = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => ({...state.auth}));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));
    dispatch(setUser(user));
    dispatch(getUsers());
    dispatch(getRelatedAdd());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    // -multi/data/form
    <div className='app'>
      <Router>
        <ToastContainer/>
        <Header/>
        <Banner/>
        <Routes>
          <Route path='admin' element={<AdminPage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/forgotPassword' element={<ForgotPassword/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/' element={<Home/>}/>
          <Route />
          <Route element={<ProtectedRoutes auth={user?.result}/>}>
            <Route path='/createPost' element={<AddEditPage/>}/>
            <Route path='/updatePost/:id' element={<AddEditPage/>}/>
            <Route path='/editProfile' element={<EditProfile/>}/>
            <Route path='/userpage' element={<UserPage/>}/>
            <Route path='/dashboard' element={<DashBoard/>}/>
          </Route>
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/post/:id' element={<Article/>}/>
          <Route path='/tag/:tag' element={<TagPage/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Router>
      <Footer/>
    </div>
  )
}

export default App