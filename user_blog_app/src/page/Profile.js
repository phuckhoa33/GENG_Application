/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import { following } from '../redux/feature/authSlide';
import { getPosts, getPostsByUser } from '../redux/feature/postSlide';
import { Sub_Article } from '../components/Sub_Article';
import { getUsers } from '../redux/api';
import { toast } from 'react-toastify';

function Profile() {
    const {user, users} = useSelector((state) => ({...state.auth}));
    const {userPosts, posts} = useSelector((state) => ({...state.post}));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [follow, setFollow] = useState("Follow");
    const [amountOfFollower, setAmountOfFollower] = useState(0);
    const [amount, setAmount] = useState(4);
    const {id} = useParams();
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
        dispatch(getPosts())
        dispatch(getPostsByUser(id));
    }, [])


    useEffect(() => {
        if(id && users){
            const followersNow = users.find(user => user._id === id)?.followers;
            if(followersNow?.length > 0){
                const index_follwers = followersNow.indexOf(user?.result?._id);
                if(index_follwers > -1){
                    setFollow("UnFollow")
                }
            }
            console.log(followersNow);
        }
    }, [id, users])

    const followingAuthor = (id) => {
        if(user?.result){
            if(follow === "Follow"){
                setFollow("UnFollow");
                if(amountOfFollower!==0){
                    setAmountOfFollower(0)
                }
                else {
                    setAmountOfFollower(1);
                }
                dispatch(following({id, state: "plus"}));
                dispatch(getUsers())
            }
            else {
                setFollow("Follow");
                if(amountOfFollower===0){
                    setAmountOfFollower(-1);
                }else {
                    setAmountOfFollower(0);
                }
                dispatch(following({id, state: "minus"}));
                dispatch(getUsers());
            }
        }
        else {
            toast.error("You must login!!!!!")
            navigate('/login');
        }
    }


    return (
        <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol lg="9" xl="7">
                    <MDBCard>
                    <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                        <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                        <MDBCardImage src={users?.find(user => user?._id === id)?.avatar}
                            alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                        <MDBBtn className='text-light' outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                            {users?.find(user => user?._id === id)?._id === user?.result?._id ? (
                                <small onClick={() => navigate('/editProfile')}>Edit</small>
                            ) : (
                                <small onClick={() => followingAuthor(id)}>
                                    {follow}
                                </small>
                            )}   
                        </MDBBtn>
                        </div>
                        <div className="ms-3" style={{ marginTop: '130px' }}>
                        <MDBTypography tag="h5">{users?.find(user => user?._id === id)?.name}</MDBTypography>
                        <MDBCardText>New York</MDBCardText>
                        </div>
                    </div>
                    <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="d-flex justify-content-end text-center py-1">
                        <div>
                            <MDBCardText className="mb-1 h5">{posts?.filter(post => users?.find(user => user.name === post.author)._id === id).length}</MDBCardText>
                            <MDBCardText className="small text-muted mb-0">Articles</MDBCardText>
                        </div>
                        <div className="px-3">
                            <MDBCardText className="mb-1 h5">{users?.find(user => user._id === id)?.followers.length+amountOfFollower}</MDBCardText>
                            <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                        </div>
                        </div>
                    </div>
                    <MDBCardBody className="text-black p-4">
                        <div className="mb-5">
                        <p className="lead fw-normal mb-1">About</p>
                        <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                            <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText>
                            <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
                            <MDBCardText className="font-italic mb-0">Photographer</MDBCardText>
                        </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                        <MDBCardText className="lead fw-normal mb-0">Recent Posts</MDBCardText>
                        <MDBCardText className="mb-0">
                            {users.find(user => user?._id === id)?._id === user?.result?._id ? (
                                <small style={{cursor: 'pointer'}} onClick={() => navigate('/dashboard')} className="text-muted">Go to Dashboard</small>
                            ): (
                                <a style={{cursor: 'pointer'}} onClick={() => setAmount(amount+4)} href="#?" className="text-muted">Show all</a>
                            )}
                        </MDBCardText>
                        </div>
                        {userPosts.length === 1 ? (
                            <MDBRow>
                              <MDBCol className="mb-2 card">
                                <MDBCardImage src={userPosts[0]?.imageFile}
                                alt="image 1" className="w-100 rounded-3 card-img" />
                                    <small className="card-img-overlay fw-bold">
                                        <small style={{cursor: 'pointer'}} onClick={() => navigate(`/post/${userPosts[0]._id}`)}>
                                        {userPosts[0]?.title}
                                        </small>
                                    </small>
                            </MDBCol>
                            </MDBRow>
                        ): (
                            <Sub_Article post={userPosts.slice(0, amount)} user={users?.find(user => user?._id === id)} width={30} height={19} separate={"profile"}/>
                        )}
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}


export default Profile