import React, { useEffect, useRef, useState } from 'react'; 
import { Card, Form, InputGroup, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {toast} from 'react-toastify';
import JoditEditor from 'jodit-react';
import { createPost, getPost, getPostsByUser, getPostsSlice, getRelatedAdd, updatePost } from '../redux/feature/postSlide';
const AddEditPage = () => {
  const {user} = useSelector((state) => ({...state.auth}));
  const {loading, error, post} = useSelector((state) => ({...state.post}));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState();
  const [formValue, setFormValue] = useState({
    title: "",
    tags: ""
  })
  const { pathname } = useLocation();

  useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, [pathname]);
  
  const {title, tags} = formValue;
  const {id} = useParams();

  const changeToValue = (e) => {
    setFormValue({...formValue, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    if(id){
      dispatch(getPost(id));
      setFormValue({...post});
      setContent(post?.description);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
      error && toast.error(error);
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(title && tags){
      formValue['description'] = content;
      if(!id){
        formValue['tags'] = tags?.split(',');
        const updatedPostData = {...formValue, name: user?.result?.name};
        dispatch(createPost({updatedPostData, navigate, toast}));
        dispatch(getPostsSlice());
        dispatch(getRelatedAdd());
      }else {
        const updatedPostData = {...formValue, name: user?.result?.name};
        dispatch(updatePost({id, updatedPostData, toast, navigate}));
        dispatch(getPostsByUser(user?.result?.name));
      }
    }
    else{
      toast.error("Please enter all information");
    }
  }
  
  return (
    <div className='' style={{}}>
      <div style={{width: '100%'}}>
        <h3>Post Article</h3>
        <Form noValidate className='add_edit'>
          <Card className='' style={{
            marginLeft: "20px",
            width: "100%",
          }}>
            <Card.Body>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Title"
                  type='text'
                  name='title'
                  value={title}
                  onChange={changeToValue}
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              {/* <InputGroup className="mb-3" style={{
                height: '400px'
              }}>
              </InputGroup> */}
              <JoditEditor
                className='editor'
                ref={editor}
                value={content}
                // config={config}
                tabIndex={10} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => {setContent(newContent)}}
              />
                
            </Card.Body>
          </Card>
          <div className='' style={{marginLeft: '2rem', marginTop: '1rem', marginBottom: "1rem"}}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder='Tags' 
                as="textarea" 
                name='tags'
                value={tags}
                onChange={(e) => changeToValue(e)}
              />
            </InputGroup>
            <FileBase
              type='file' 
              multiple={false} 
              onDone={({base64}) => 
                setFormValue({...formValue, imageFile: base64})
              }
            />
            <div className='foot bg-primary'
              
            >
              {loading ? (
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              ): (
                <>
                  {id ? (
                    <button className='btn btn-primary' onClick={e => e.preventDefault()} data-bs-toggle="modal" data-bs-target="#staticBackdrop">Update</button>
                  ) : (
                    <button onClick={handleSubmit} className='btn btn-primary'>Post</button>
                  )}
                </>
              )}
            </div>
          </div>
        </Form>
      </div>  
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Are you sure you want to update this article ??
            </div>
            <div class="modal-footer">
              <button type="button" onClick={handleSubmit} class="btn btn-secondary" data-bs-dismiss="modal">Yes</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEditPage;