/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, setState } from '../redux/feature/authSlide';
import { clearUserPosts, getPost, getPosts, getPostsByUser, getPostsSlice, updatedViewPost } from '../redux/feature/postSlide';
import { useLocation, useNavigate } from 'react-router-dom';
import { getComments } from '../redux/feature/commentSlide';
import { Sub_Article } from '../components/Sub_Article';
import { Container} from 'react-bootstrap';
import { Banner } from '../components/Banner';
import { PopOfSpinner } from '../components/PopOfSpinner';
import { Top5Posts } from '../components/Top5Posts';
import { MDBBadge } from 'mdb-react-ui-kit';
import { LayoutPosts } from '../components/LayoutPosts';


function Home() {
  const {posts} = useSelector((state) => ({...state.post}));
  const [loading, setLoading] = useState(false);
  const {user} = useSelector((state) => ({...state.auth}));
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    dispatch(setState("Login"));
    dispatch(getPosts());
    dispatch(getPostsSlice());
    dispatch(getUsers());
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleClickItem = (id, name) => {
    dispatch(getPost(id));
    dispatch(clearUserPosts());
    dispatch(getPostsByUser(name));
    dispatch(getComments(id));
    dispatch(updatedViewPost({id, name: user.result.name}));
    navigate(`/post/${id}`);
  }
  


  return (
    <div className='home'>
      {!loading?(
        <>
          {posts?.length > 0 ? (
            <div>
              <div style={{}}>
                <Container style={{cursor: 'pointer'}}>
                <h1>
                  All The Newest Posts
                  <MDBBadge className='ms-2'>NEW</MDBBadge>
                </h1>
                <div class="card-group">
                  {posts.filter(post => post?.state_article === "done").map((post, id) => id <2 && (
                    // eslint-disable-next-line react/jsx-pascal-case
                    <>
                      <Sub_Article post={post} directIntoDetail={handleClickItem} user={user} width={30} height={19} separate={2}/>
                    </>
                  ))}
                </div>
                <div class="card-group mb-3">
                {posts.filter(post => post?.state_article === "done").map((post,id) => id>1 && id<6 && post?.state_article === "done" && (
                      <Sub_Article post={post} directIntoDetail={handleClickItem} user={user} width={16} height={8} separate={3}/>
                    ))}
                </div>
              </Container>
              <Banner/>
              
              <Top5Posts directIntoDetail={handleClickItem} user={user}/>
              <Banner/>
              <h1 className='mt-3 container'>
                  All The Web Developer Articles
                  <MDBBadge className='ms-2'>WebDev</MDBBadge>
                </h1>
              <LayoutPosts posts={posts.filter(post => post?.tags?.indexOf('webDev') !== -1 && post?.state_article === "done")} user={user} directIntoDetail={handleClickItem}/>
              <h1 className='mt-3 container'>
                  All The Education Articles
                  <MDBBadge className='ms-2'>Education</MDBBadge>
              </h1>
              <LayoutPosts posts={posts.filter(post => post?.tags?.indexOf('education') !== -1 && post?.state_article === "done")} user={user} directIntoDetail={handleClickItem}/>
              <Banner/>
              </div>
            </div>
          ): (
            <></>
          )}
        </>
      ):(
        <PopOfSpinner/>
      )}
    </div>
  )
}

export default Home
