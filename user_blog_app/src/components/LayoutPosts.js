import moment from "moment";
import { experpt } from "../ulitity";

export const LayoutPosts = ({posts, user, directIntoDetail}) => {
    return (
        <div style={{cursor: 'pointer'}} class="container mt-3 mb-3">
             <div class="row">
                <div class="col-sm-8">
                    <div class="main-content">
                        <div class="card bg-dark text-white">
                        <img src={posts[0]?.imageFile} class="card-img h-25" alt="..."/>
                        <div class="card-img-overlay">
                            <h5 onClick={() => directIntoDetail(posts[0]?._id, user?.result?._id )} class="card-title">{posts[0]?.title}</h5>
                            <p class="card-text">

                            </p>
                            <p class="card-text">{moment(posts[0]?.createdAt).fromNow()}</p>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                <div class="row">
                    <div class="col-12">
                        <div class="sidebar-content">
                        <div class="card bg-dark text-white">
                        <img src={posts[1]?.imageFile} class="card-img h-25" alt="..."/>
                        <div class="card-img-overlay">
                            <h5 onClick={() => directIntoDetail(posts[1]?._id, user?.result?._id )} class="card-title">{posts[1]?.title}</h5>
                            <p class="card-text">

                            </p>
                            <p class="card-text">{moment(posts[1]?.createdAt).fromNow()}</p>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="sidebar-content">
                        <div class="card bg-dark text-white">
                        <img src={posts[2]?.imageFile} class="card-img h-25" alt="..."/>
                        <div class="card-img-overlay">
                        <small onClick={() => directIntoDetail(posts[2]?._id, user?.result?._id )} class="card-title">{experpt(posts[2]?.title, 10)}</small>                            <p class="card-text">

                            </p>
                        </div>
                        </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="sidebar-content">
                            
                        <div class="card bg-dark text-white">
                        <img src={posts[3]?.imageFile} class="card-img h-25" alt="..."/>
                        <div class="card-img-overlay">
                            <small onClick={() => directIntoDetail(posts[3]?._id, user?.result?._id )} class="card-title">{experpt(posts[3]?.title, 10)}</small>
                        </div>
                        </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}