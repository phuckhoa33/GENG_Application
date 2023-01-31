import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getPosts, restoreArticles } from "../redux/features/articleSlice";

function Trash (){
    const {posts} = useSelector((state) => ({...state.article}));
    const dispatch = useDispatch();
    const [amountRestore, setAmountRestore] = useState([]);
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
        dispatch(getPosts());
    }, [])

    const clickRestore = (e) => {
        e.preventDefault();
        const formValue = {
            amountRestoreArticles: amountRestore
        }
        dispatch(restoreArticles({formValue}));
        dispatch(getPosts());
    }

    const increaseOrDecreaseAmountChecked = (e) => {
        if(e.target.checked === true){
            setAmountRestore(() => {
                const index = amountRestore.find(id_user => id_user === e.target.value);
                if(index === undefined){
                    amountRestore.push(e.target.value);
                    console.log(amountRestore);
                    return amountRestore;
                }
                return amountRestore;
            });
        }
        else {
            setAmountRestore(() => {
                const removedUser = amountRestore.filter(id_user => id_user !== e.target.value);
                console.log(removedUser);
                return removedUser;
            });
        }
    }

    return (
        <>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">TITLE</th>
                    <th scope="col">AUTHOR</th>
                    </tr>
                </thead>
                <tbody>
                    {posts?.filter(post => post?.deleted === true)?.map((post, id) =>  (
                        <tr style={{cursor: 'pointer'}}>
                        <th scope="row"><input value={post?._id} onClick={increaseOrDecreaseAmountChecked} type={'checkbox'}/>{id+1}</th>
                        <td>{post?._id}</td>
                        <td>{post?.title}</td>
                        <td>{post?.author}</td>
                        </tr>
                    ))}
                </tbody>    
            </table>
            <button disabled={amountRestore.length===0?true:false} className="btn btn-info" onClick={clickRestore}>Restore</button>
        </>
    )
}

export default Trash;