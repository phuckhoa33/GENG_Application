import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './page/Home';
import Login from './page/Login';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import { ProtectedRoutes } from './component/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import Profile from './page/Profile';
import { useEffect } from 'react';
import { setUser } from './redux/features/authSlice';
import Dashboard from './page/Dashboard';
import Article from './page/Articles';
import User from './page/User';
import Orders from './page/Orders';
import BrowserArticle from './page/BrowserArticle';
import Trash from './page/Trash';

function App() {
  const {admin} = useSelector((state) => ({...state.auth}));
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));
    dispatch(setUser(user));
  }, []);

  return (
    <div className="App">
      <Router>
        <ToastContainer/>
        <Routes>
          <Route element={<ProtectedRoutes auth={admin?.result}/>}>
            <Route path='/' element={<Home/>}>
              <Route path='order' element={<Orders/>}/>
              <Route index path='' element={<Dashboard/>}/>
              <Route path='article' element={<Article/>}/>
              <Route path='user' element={<User/>}/>
              <Route path='broweringPosts/:id' element={<BrowserArticle/>}/>
              <Route path='trash' element={<Trash/>}/>
            </Route>
            <Route path='/profile' element={<Profile/>}/>
          </Route>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
