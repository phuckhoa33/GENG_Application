/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import React, {useEffect, useState } from 'react';
import {Alert, Button, FloatingLabel, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createComment, getComments} from '../redux/feature/commentSlide';
import PaginationSlice from './PaginationSlice';
import { PopOfSpinner } from './PopOfSpinner';
import { toast } from 'react-toastify';

function Comment({post}) {
  const {comment, amount} = useSelector((state) => ({...state.comment}));
  const {user} = useSelector((state) => ({...state.auth}));
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [alert, setAlert] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments({id: post._id, page}));
  }, [page])

  const handleClick = (e) => {
    if(user?.result){

      if(newComment===""){
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 1000);
        return;
      }
      const formValue = {newComment};
      setNewComment("");
      e.preventDefault();
      const id = post._id;
      dispatch(createComment({id: id, name: user.result._id, formValue}))
      dispatch(getComments({id, page}));
  
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    else {
      toast.error("You must login!!!!");
      navigate('/login');
    }
  }

  return (
    <div className='comment'>
      <div className='dialog'>
        <div style={{marginLeft: "2rem"}}>
          <h5 style={{paddingTop: "1rem"}}>Leave with a comment</h5>
          <hr style={{width: "94%", height: "1rem"}}/>
          <FloatingLabel style={{width: "94%"}} controlId="floatingTextarea2" label="Comments">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </FloatingLabel>
          <Button onClick={handleClick} style={{width: "10rem", borderRadius: "10rem", margin: "2rem 0", backgrounColor: "red"}}>Post Comment</Button>
        </div>
      </div>
      {alert&&(
        <Alert key={"warning"} variant={'warning'}>
          This is a {'warning'} alert—check it out!
        </Alert>
      )}
      <div className='number'>
        <div style={{marginLeft: "2rem"}}>
          <div style={{display: 'flex'}}>
              <h5 style={{paddingTop: "1rem"}}>{`${comment.length} ${comment.length===1||comment.length===0?"Comment":"Comments"}`}</h5>
              <PaginationSlice numberOfPages={amount} setPage={setPage}/>
          </div>
          <hr style={{width: "94%", height: "1rem"}}/>
            {!loading ? (
              <>
                {comment?.map(com => (
                  <div style={{backgroundColor: "rgb(210, 201, 201)", marginTop: "3rem", width: "94.5%", borderRadius: "1rem"}}>
                    <div style={{display: "flex", marginTop: "-1.1rem", marginBottom: "1rem"}}>
                      <img width={'30'} alt='' src={user?.result?.avatar}/>
                      <div style={{marginTop: "0.2rem", fontWeight: "bold"}}>{com.nameComment}</div>
                      <div style={{marginLeft: "1rem", marginTop: "0.2rem"}}>{moment(com.createdAt).fromNow()}</div>
                    </div>
                    <div style={{marginLeft: "0.4rem"}}>
                      {com.content}
                    </div>
                  </div>
                ))}
              </>
            ): (
              <PopOfSpinner/>
            )}
        </div>
      </div>
    </div>
  )
}

export default Comment