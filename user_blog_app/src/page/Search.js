/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { Sub_Article } from '../components/Sub_Article';
import { getComments } from '../redux/feature/commentSlide';
import { clearUserPosts, getPost, getPostsByUser, getSearchPosts, updatedViewPost } from '../redux/feature/postSlide';

function Search() {
    const {userPosts, user} = useSelector((state) => ({...state.post}));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
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
        navigate(`/post/${id}`);
        dispatch(getPost(id));
        dispatch(clearUserPosts());
        dispatch(getPostsByUser(name));
        dispatch(getComments(id));
        dispatch(updatedViewPost({id, name: user.result.name}));
    }
    
    const handleEnterKey = (e) => {
        if(e.key === "Enter") {
            dispatch(getSearchPosts(searchText));
            setSearchText("")
        }
    }
    return (
        <div className='mt-5'>
            <div class="form-outline mb-4">
                <input value={searchText} onKeyDown={handleEnterKey} onChange={(e) => setSearchText(e.target.value)} type="search" class="form-control" id="datatable-search-input border"/>
                <label class="form-label" for="datatable-search-input">Search</label>
            </div>
            <div id="datatable">
            </div>
            <div>
                {userPosts?.map((post) => post?.state_article === "done" && post?.deleted === false && (
                    <Sub_Article post={post} user={user} directIntoDetail={handleClickItem} separate={"search"}/>               
                ))}
            </div>
        </div>
    )
}

export default Search