/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {addProduct, getPosts} from '../redux/features/articleSlice';
import { getUsers } from '../redux/features/authSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {posts} = useSelector((state) => ({...state.article}));
  const {users, admin} = useSelector((state) => ({...state.auth}));
  const { pathname } = useLocation();

  useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, [pathname]);
  
  useEffect(() => {
    dispatch(getPosts());
    dispatch(getUsers());
  }, [])

  const addWaitedArticles = (id) => {
    const article = posts?.find(post => post?._id === id);
    dispatch(addProduct(article));
    navigate(`article`);
  }

  return (
    <>
        <div>
          <div class="row">
              <div class="col-sm-6 mb-3 mb-sm-0">
                  <div class="card">
                  <div class="card-body">
                      <h3 className='text-danger'>{posts?.length} Article</h3>
                      <h5 class="card-title">All Articles</h5>
                      <p class="card-text">All Articles have posted on this page</p>
                  </div>
                  </div>
              </div>
              <div class="col-sm-6">
                  <div class="card">
                  <div class="card-body">
                      <h3 className='text-danger'>{users?.length} People</h3>
                      <h5 class="card-title">All users and authors</h5>
                      <p class="card-text">ALl User have joined on this page</p>
                  </div>
                  </div>
              </div>
          </div>
        </div>
          <h1>All Pending Posts</h1>
        <table class="table">
          <thead>
            <tr className='text-info fw-bold'>
              <th scope="col">ID_ARTICLE</th>
              <th scope="col">TITLE_ARTICLE</th>
              <th scope="col">AUTHOR_ARTICLE</th>
              <th scope="col">EMAIL_AUTHOR</th>
            </tr>
          </thead>
          <tbody style={{cursor: 'pointer', overflowY: 'scroll'}}>
            {posts?.filter(post => post?.state_article === 'pending' && post?.author !== admin?.result?.name).length === 0 ? (
              <h1>Don't have any article on dashboard!!!</h1>
            ): (
              <>
                {posts?.filter(post => post?.state_article === 'pending' && post?.author !== admin?.result?.name).map(post => (
                  <tr>
                    <th onClick={() => addWaitedArticles(post?._id)} scope='col'>{post?._id}</th>
                    <th scope='col'>{post?.title}</th>
                    <th scope='col'>{post?.author}</th>
                    <th scope='col'>{users?.find(user => user?.name === post?.author)?.email}</th>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
        
    </>
    )
}

export default Dashboard;