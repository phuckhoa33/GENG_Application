/* eslint-disable react-hooks/exhaustive-deps */
import JoditEditor from 'jodit-react';
import { useEffect, useState } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import { browerArticle, getPost, removeProduct } from '../redux/features/articleSlice';
function BrowserArticle() {
    const [content, setContent] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const {post, success} = useSelector((state) => ({...state.article}));
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
        if(success !== ""){
            toast.success(success);
        }
    }, [success])

    useEffect(() => {
        if(id){
            dispatch(getPost(id));
            setContent(post?.description);
        }
    }, [id])

    const browerArticleSubmit = (id_article, action) => {
        dispatch(browerArticle({id_article, action}));
        dispatch(removeProduct(id_article));
        navigate('/article');
    }

    return (
        <>
            <JoditEditor
                className='editor'
                // ref={editor}
                value={content}
                // config={config}
                tabIndex={10} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => {setContent(newContent)}}
              />
            <div>
                <button onClick={(e) => {
                    e.preventDefault();
                    browerArticleSubmit(post?._id, 'accept')
                }} type="button" class="btn btn-outline-primary">Accept</button>
                <button onClick={(e) => {
                    e.preventDefault();
                    browerArticleSubmit(post?._id, 'refuse');
                }} type="button" class="btn btn-outline-danger ">Refuse</button>
            </div>
        </>
    )
}

export default BrowserArticle;