/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react'
import { MDBTabs, MDBTabsContent, MDBTabsItem, MDBTabsLink, MDBTabsPane } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deletePost, getPostsByUser } from '../redux/feature/postSlide';
import {toast} from 'react-toastify';
import { Sub_Article } from '../components/Sub_Article';
import { useLocation } from 'react-router-dom';
function DashBoard() {
    const {userPosts, user} = useSelector((state) => ({...state.post}));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [basicActive, setBasicActive] = useState('tab1');
    const [checkable, setCheckable] = useState("");

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
        const user = JSON.parse(localStorage.getItem("profile"));
        dispatch(getPostsByUser(user?.result?._id))
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    const handleBasicClick = (value) => {
      if (value === basicActive) {
        return;
      }
  
      setBasicActive(value);
    };
  
    const handleDelete = (id) => {
        dispatch(deletePost({id: id, toast}));
        navigate("/dashboard");
    }


    const handleClick = (id, name=null) => {
      setCheckable(id);
    }

    return (
      <>
      <MDBTabs className='mb-3'>
        <MDBTabsItem >
          <MDBTabsLink className='text-success' onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
            Done
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink className='text-warning' onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
            Pending
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink className='text-danger' onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
            Failure
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent   style={{overflowY: 'scroll'}}>
        <MDBTabsPane show={basicActive === 'tab1'}>
          {userPosts?.filter(post => post?.state_article==="done")?.length === 1 ? (
            <Sub_Article post={userPosts?.filter(post => post?.state_article==="done" && post?.deleted === false)[0]} user={user} separate={2} directIntoDetail={handleClick}/>            
          ): (
            <>
              {userPosts.filter(post => post.state_article === "done" && post?.deleted === false).length < 1 ? (
                <div>
                  <h5 className='text-center'>If you have posted, I must wait a little time. Else if you never post, you should <small className='text-info fw-bold text-decoration-underline' onClick={() => navigate('/createPost')}>Post new Articles</small></h5>            
                </div>
              ): (
                <>
                  {userPosts?.filter(post => post?.state_article==="done" && post?.deleted === false).map((post,id) =>  (id+1)%2===0 && (
                    <Sub_Article post={userPosts?.filter(post => post?.state_article==="done").slice(id-1, id+1)} user={user} separate={'dash'} directIntoDetail={handleClick}/>
                  ))}
                </>  
              )}
            </>

          )}
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === 'tab2'}>
        {userPosts?.filter(post => post?.state_article==="pending" && post?.deleted === false)?.length === 1 ? (
            <Sub_Article post={userPosts?.filter(post => post?.state_article==="pending")[0]} user={user} separate={2}/>            
          ): (
            <>
              {userPosts.filter(post => post.state_article === "pending" && post?.deleted === false).length < 1 ? (
                <div>
                  <h5 className='text-center'>If you have posted, I must wait a little time. Else if you never post, you should <small className='text-info fw-bold text-decoration-underline' onClick={() => navigate('/createPost')}>Post new Articles</small></h5>            
                </div>
              ): (
                <>
                  {userPosts?.filter(post => post?.state_article==="pending" && post?.deleted === false).map((post,id) =>  (id+1)%2===0 && (
                    <Sub_Article post={userPosts?.filter(post => post?.state_article==="pending").slice(id-1, id+1)} user={user} separate={'dash'}/>
                  ))}
                </>  
              )}
            </>

          )}
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === 'tab3'}>
        {userPosts?.filter(post => post?.state_article==="fail" && post?.deleted === false)?.length === 1 ? (
            <Sub_Article post={userPosts?.filter(post => post?.state_article==="fail")[0]} user={user} separate={2} directIntoDetail={handleClick}/>            
          ): (
            <>
              {userPosts.filter(post => post.state_article === "fail" && post?.deleted === false).length < 1 ? (
                <div>
                  <h5 className='text-center'>If you have posted, I must wait a little time. Else if you never post, you should <small className='text-info fw-bold text-decoration-underline' onClick={() => navigate('/createPost')}>Post new Articles</small></h5>            
                </div>
              ): (
                <>
                  {userPosts?.filter(post => post?.state_article==="fail" && post?.deleted === false).map((post,id) =>  (id+1)%2===0 && (
                    <Sub_Article post={userPosts?.filter(post => post?.state_article==="fail").slice(id-1, id+1)} user={user} separate={'dash'} directIntoDetail={handleClick}/>
                  ))}
                </>  
              )}
            </>

          )}
        </MDBTabsPane>
      </MDBTabsContent>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              What do you want to execute behavior?
            </div>
            <div class="modal-footer">
              <button type="button"  data-bs-dismiss="modal" onClick={() => navigate(`/updatePost/${checkable}`)} class="btn btn-secondary">Update</button>
              <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"  class="btn btn-danger">Delete</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Are you sure ???
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" onClick={() => handleDelete(checkable)} data-bs-dismiss="modal">Yes</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">No</button>
            </div>
          </div>
        </div>
      </div>
    </>
    )
}

export default DashBoard