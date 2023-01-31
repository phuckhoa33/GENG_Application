/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Comment from '../components/Comment';
import { getPost, getPosts, getPostsByTag} from '../redux/feature/postSlide';
import UserSlice from '../components/UserSlice';
import { randomizedContent } from '../ulitity/adjustContent';
import { PopOfSpinner } from '../components/PopOfSpinner';
import { toast } from 'react-toastify';



function SinglePage() {
  const {post, relatedAdd} = useSelector((state) => ({...state.post}));
  const {users} = useSelector((state) => ({...state.auth}));
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const [banner, setBanner] = useState("");
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
    const value = randomizedContent();
    setBanner(value);
    dispatch(getPost(id));
    dispatch(getPosts());
    setLoading(true);
    setTimeout(() => {
      dispatch(getPost(id));
      if(post?.state_article !== "done"){
        navigate('/');
        toast.error("This article is not exist");
      }
      setLoading(false);
    }, 1000);
  }, [])
  
  const handleTag = (tag) => {
    dispatch(getPostsByTag(tag));
    navigate(`/tag/${tag}`);
  }
  return (
    <div style={{marginTop: "5rem"}}>
      {!loading ? (
        <>
          <Card>
          <Card.Img variant="top" src={post.imageFile} />
          <Card.Body>
            <h1>{post.title}</h1>
            <div style={{display: 'flex'}}>
              {post?.tags?.map(tag => (
                <Card.Title onClick={() => handleTag(tag)} className='tag-live' style={{marginBottom: "0.5rem",fontWeight: "bold",color: "white",width: "9rem", backgroundColor: "black", borderRadius: "10px", textAlign: "center", marginRight: "1rem"}}>{tag}</Card.Title>
              ))}
            </div>
            <Card.Title bg='primary' style={{marginLeft: "1rem", marginTop: "0.1rem"}}>{moment(post.createdAt).fromNow()}</Card.Title>
            <hr/>
            <Card.Text dangerouslySetInnerHTML={{__html: post?.description}}>
              
            </Card.Text>
          </Card.Body>
        </Card>
          <Card style={{cursor: 'pointer'}} className="bg-dark text-white">
          <Card.Img style={{height:'15rem'}} src={banner} alt="Card image" />
          <Card.ImgOverlay>
            <Card.Title onClick={() => navigate(`/profile/${users?.find((user) => user?.name===post?.author)._id}`)}>{post?.author}</Card.Title>
            <Card.Text>
            {`The purpose of ${post.author} is to help improve your skill and knowledge of you into ${post?.tags?.map((tag) => `${tag}, `)} help your better slill`}
            </Card.Text>
            <Card.Title>{post.account}</Card.Title>
          </Card.ImgOverlay>
        </Card>
          <UserSlice posts={relatedAdd}/>
          <Comment post={post}/>
        </>
      ): (
        <PopOfSpinner/>
      )}
    </div>
  )
}

export default SinglePage