/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import ListSpinner from "../component/ListSpinner";
import { setLogout } from "../redux/features/authSlice";

function Home(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {admin} = useSelector((state) => ({...state.auth}));
    const {loading, waitedPosts} = useSelector((state) => ({...state.article}));

    const logout = () => {
        dispatch(setLogout());
        navigate('/login');
    }
    return (
        <div class="container-fluid">
            <div class="row flex-nowrap">
                <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span class="fs-5 d-none d-sm-inline">Menu</span>
                        </a>
                        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li>
                                <a onClick={() => navigate('/')} href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                                    <i class="fa-solid fa-table-columns"></i> <span class="ms-1 d-none d-sm-inline">Dashboard</span> </a>
                                
                            </li>
                            <hr className="w-100 m-y-1"/> 
                            <li>Service</li>  
                            <li className="m-y-1">
                                <a onClick={() => navigate('/article')} href="#submenu3" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                                    <i class="fa-brands fa-product-hunt"></i> <span class="ms-1 d-none d-sm-inline">Products</span> </a>
                                    <ul class="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                                    {waitedPosts?.map(post => (
                                        <li style={{cursor: 'pointer'}} class="w-100">
                                            <span onClick={() => navigate(`/broweringPosts/${post?._id}`)}  class="nav-link px-0"> <span class="d-none d-sm-inline">{post?.author}</span></span>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li>
                                <a onClick={() => navigate('/user')} href="#" class="nav-link px-0 align-middle">
                                    <i class="fa-brands fa-intercom"></i> <span class="ms-1 d-none d-sm-inline">Customers</span> </a>
                            </li>
                            <hr className="w-100 m-y-1"/> 
                            <li>
                                <a onClick={() => navigate('/trash')} href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                                    <i class="fa-solid fa-trash"></i> <span class="ms-1 d-none d-sm-inline">Trash</span> </a>
                                
                            </li>
                        </ul>
                        <hr/>
                        <div class="dropdown pb-4">
                            <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={admin?.result?.avatar} alt="hugenerd" width="30" height="30" class="rounded-circle"/>
                                <span class="d-none d-sm-inline mx-1">{admin?.result?.name}</span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                                
                                <li onClick={logout}><a class="dropdown-item" href="#">Sign out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col py-3" style={{overflowY: 'scroll', height: '36rem'}}>
                    
                    <Outlet/>
                    {loading && <ListSpinner/>}
                </div>
            </div>
        </div>
    )
}

export default Home;