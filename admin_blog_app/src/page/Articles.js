import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ListSpinner from "../component/ListSpinner";

function Articles() {
    const navigate = useNavigate();
    const {waitedPosts, loading} = useSelector((state) => ({...state.article}));
    const { pathname } = useLocation();

    useEffect(() => {
        // "document.documentElement.scrollTo" is the magic for React Router Dom v6
        document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // Optional if you want to skip the scrolling animation
        });
    }, [pathname]);

    return (
      <>
        {loading ? (
          <ListSpinner/>
        ): (
          <>
          <div>
              <div class="row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                      <div class="card">
                      <div class="card-body">
                          <h5 class="card-title">All Products</h5>
                          <p class="card-text">You are missed serveral articles</p>
                          <a onClick={() => navigate('/article')} href="#" class="btn btn-primary">Go Products</a>
                      </div>
                      </div>
                  </div>
                  <div class="col-sm-6">
                      <div class="card">
                      <div class="card-body">
                          <h5 class="card-title">All users and authors</h5>
                          <p class="card-text">You can manage amount of users and authors</p>
                          <a onClick={() => navigate('/user')} href="#" class="btn btn-primary">Go Customers</a>
                      </div>
                      </div>
                  </div>
              </div>
            </div>
            <table class="table">
              <thead>
                <tr className='text-info fw-bold'>
                  <th scope="col">ID_ARTICLE</th>
                  <th scope="col">TITLE_ARTICLE</th>
                  <th scope="col">AUTHOR_ARTICLE</th>
                  <th scope="col">AMOUNT_ACCEPT</th>
                </tr>
              </thead>
              <tbody style={{cursor: 'pointer', overflowY: 'scroll'}}>
                {waitedPosts?.length === 0 ? (
                  <>              <h1>Don't have any article on products!!!</h1>
                  </>
                ): (
                  <>
                    {waitedPosts?.filter(post => post?.state_article === 'pending').map(post => (
                      <tr>
                        <th onClick={() => navigate(`/broweringPosts/${post?._id}`)} scope='col'>{post?._id}</th>
                        <th scope='col'>{post?.title}</th>
                        <th scope='col'>{post?.author}</th>
                        <th scope='col'>{post?.acceptedAdmins}</th>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </>
        )}
      </>
    )
}

export default Articles;