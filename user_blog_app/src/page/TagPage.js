/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { PopOfSpinner } from '../components/PopOfSpinner';
import { Sub_Article } from '../components/Sub_Article';
import { getComments } from '../redux/feature/commentSlide';
import { clearUserPosts, getPost, getPostsByTag, getPostsByUser, updatedViewPost } from '../redux/feature/postSlide';

function TagPage() {
    const {tagPosts, loading} = useSelector((state) => ({...state.post}));
    const {user} = useSelector((state) => ({...state.auth}));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [amount, setAmount] = useState(6);
    const { pathname } = useLocation();

    useEffect(() => {
        // "document.documentElement.scrollTo" is the magic for React Router Dom v6
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", // Optional if you want to skip the scrolling animation
        });
        const index = location.pathname.lastIndexOf('/');
        const tag = location.pathname.substring(index+1, location.pathname.length);
        dispatch(getPostsByTag(tag));
    }, [pathname]);

    const handleClickItem = (id, name) => {
        navigate(`/post/${id}`);
        dispatch(getPost(id));
        dispatch(clearUserPosts());
        dispatch(getPostsByUser(name));
        dispatch(getComments(id));
        dispatch(updatedViewPost({id, name: user.result.name}));
    }

    const addMore = () => {
        setAmount(amount+6);
    }
    
    return (
        <>
            {loading === false ? (
                <div className='home container'>
                    <div style={{marginTop: "1.4rem", marginLeft: "1rem", display: 'flex', flexWrap: 'wrap'}}>
                        {tagPosts && tagPosts.slice(0, amount).map((post) => post?.state_article === "done" && post?.deleted === false && (
                            <Sub_Article directIntoDetail={handleClickItem} post={post} user={user} separate={1}/>
                        ))}
                    </div>
                    <div>
                        <p class="text-center">
                            <button onClick={addMore} className='w-auto btn-outline-info btn-info'>
                                Show More
                            </button>
                        </p>
                    </div>
                </div>
            ): (
                <PopOfSpinner/>
            )}
        </>
    )
}

export default TagPage