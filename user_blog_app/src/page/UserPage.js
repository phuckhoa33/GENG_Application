import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { clearUserPosts, getPost, getPostsByUser, updatedViewPost } from '../redux/feature/postSlide';
import { experpt } from '../ulitity';
import { getComments } from '../redux/feature/commentSlide';
import moment from 'moment';

function UserPage() {
    const {userPosts, user} = useSelector((state) => ({...state.post}));
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
    const handleClickItem = (id, name) => {
        dispatch(getPost(id));
        dispatch(clearUserPosts());
        dispatch(getPostsByUser(name));
        dispatch(getComments(id));
        dispatch(updatedViewPost({id, name: user.result.name}));
      }

    return (
        <div className='home'>
            <div style={{marginTop: "1.4rem", marginLeft: "1rem"}}>
                {userPosts?.map((post) =>  post?.deleted === false && (
                <Card style={{ width: '45rem', height: '32rem', marginBottom: "1.2rem" }}>
                    <Card.Img variant="top" style={{width: "95.4%", height: "14rem", marginTop: "1rem", marginLeft: "1rem", border: "2px solid black"}} src={post.imageFile} />
                    <Card.Body>
                    <Card.Title style={{textAlign: "center"}}>{post.title}</Card.Title>
                    <Card.Title style={{display: "flex", alignItems: "center", marginLeft: "14rem", marginTop: "1rem", marginBottom: "1rem"}}>
                        <img width={'23'} style={{borderRadius: "50%", marginRight: "4px"}} src={post.account} alt=''/>
                        <Card.Title style={{fontSize: "10px", paddingTop: "4px"}}>{post.creator}</Card.Title>
                        <small style={{marginLeft: "3rem", color: "", textAlign: "center"}}>{moment(post.createdAt).fromNow()}</small>
                        <small style={{fontSize: "0.6rem", marginLeft: "10rem", marginRight: "1rem"}}>{`${post.comment.length} ${post.comment.length>1?"comments":"comment"}`}</small>
                        <small style={{fontSize: "0.6rem"}}>{`${post.views.length} ${post.comment.length>1?"views":"view"}`}</small>
                    </Card.Title>
                    <Card.Text  style={{textAlign: "center"}}>
                        {experpt(post.description, 200)}
                    </Card.Text>
                        <Button  onClick={(e) => {
                            navigate(`/post/${post._id}`);
                            handleClickItem(post._id, post.creator)}
                        } style={{backgroundColor: "rgb(217, 0, 255)", width: "10rem", borderRadius: "2rem", marginLeft: "16rem", marginBottom: "0"}}>Continue Reading</Button>
                    </Card.Body>
                </Card>
                ))}
            </div>
        </div>
    )
}

export default UserPage