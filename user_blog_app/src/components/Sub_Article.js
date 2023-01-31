import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from "mdb-react-ui-kit"
import moment from "moment"
import { Card } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { experpt } from "../ulitity"

export const Sub_Article = ({post, directIntoDetail, user, separate, dash}) => {
  const {users} = useSelector((state) => ({...state.auth}));
  const navigate = useNavigate();
  const checkPage = () => {
    if(user===null){
      toast.error('You must login so that to view this article');
      return;
    }
    directIntoDetail(post?._id, user?.result?._id)
  }
  const setCardDisplay = () => {
      if(separate==="profile"){
        return (
          <>
            {post.map((postItem, id) => (id+1)%2===0 && (
              <MDBRow>
                {post.slice(id-1, id+1).map((postkey) => (
                  <MDBCol style={{cursor: 'pointer'}} className="mb-2 card">
                      <MDBCardImage src={postkey?.imageFile}
                      alt="image 1" className="w-100 rounded-3 card-img" />
                      <small onClick={() => directIntoDetail(post?._id, user?.result?._id )} className="card-img-overlay fw-bold">
                        <small onClick={() => navigate(`/post/${postkey?._id}`)}>
                          {postkey?.title}
                        </small>
                      </small>
                  </MDBCol>
                ))}
              </MDBRow>
            ))}
          </>
        )
      }
      if(separate===1){
        return (
          <MDBCard className="container ml-5 mb-2 me-2" style={{ maxWidth: '540px',cursor: 'pointer'}}>
            <MDBRow className='g-0'>
              <MDBCol md='4'>
                <MDBCardImage src={post?.imageFile} alt='...' fluid />
              </MDBCol>
              <MDBCol md='8'>
                <MDBCardBody>
                  <MDBCardTitle onClick={() => directIntoDetail(post?._id, user?.result?._id )}>{experpt(post.title, 20)}</MDBCardTitle>
                  <MDBCardText>
                    <small onClick={() => navigate(`/profile/${users?.find((user) => user?.name===post?.author)?._id}`)} className="fw-bold text-info">
                      <img style={{width: '2rem'}} src={users?.find(user => user.name === post?.author)?.avatar} class="card-img-top h-50" alt="..."/>
                      {post?.author}
                    </small>
                  </MDBCardText>
                  <MDBCardText>
                    {moment(post?.createdAt).fromNow()}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        )
      }
      if(separate===2){
          return (
              <>
              <Card className="border border-light" style={{cursor: 'pointer'}} bg={'black'} text='white'>
                <Card.Img style={{height: '13rem'}} variant="top" src={post?.imageFile}/>
                <Card.Body>
                  <Card.Text>
                    <small data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                      directIntoDetail(post?._id);
                      checkPage();
                    }} className="text-light fw-bold me-2">
                      {experpt(post?.title, 30)}
                    </small>
                    <small onClick={() => navigate(`/profile/${users?.find((user) => user?.name===post?.author)._id}`)} className="fw-bold text-info">{users?.find(user => user?._id === post?.author)?.name}</small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </>
          )
      }
      if(separate===3){
          return (
            <div style={{cursor: 'pointer'}} class="card">
            <img src={post?.imageFile} class="card-img-top h-50" alt="..."/>
            <div class="card-body">
              <h5 onClick={() => directIntoDetail(post?._id, user?.result?._id )} class="card-title">{experpt(post?.title, 30)}</h5>
              <p onClick={() => navigate(`/profile/${users?.find((user) => user?.name===post?.author)._id}`)} class="card-text text-info fw-bold">
                <img style={{width: '2rem'}} src={users?.find(user => user.name === post?.author)?.avatar} class="card-img-top h-50" alt="..."/>
                {`${post?.author}`}
              </p>
              <p class="card-text"><small class="text-muted">{moment(post?.createdAt).fromNow()}</small></p>
            </div>
          </div>
          )
      }
      if(separate==="search"){
        return (
          <div style={{cursor: 'pointer'}} class="card">
          <img src={post?.imageFile} class="card-img-top h-50" alt="..."/>
          <div class="card-body">
            <h5 onClick={() => directIntoDetail(post?._id, user?.result?._id )} class="card-title">{experpt(post?.title, 30)}</h5>
            <p onClick={() => navigate(`/profile/${users?.find(user => user._id === post?.author)?._id}`)} class="card-text text-info fw-bold">
              <img style={{width: '2rem'}} src={users?.find(user => user._id === post?.author)?.avatar} class="card-img-top h-50" alt="..."/>
              {`${users?.find(user => user._id === post?.author)?.name}`}
            </p>
            <p class="card-text"><small class="text-muted">{moment(post?.createdAt).fromNow()}</small></p>
          </div>
        </div>
        )
      }
      if(separate==='dash'){
        return (
          <MDBRow style={{cursor: 'pointer'}} className='row-cols-1 row-cols-md-2 g-4'>
            {post.map(postItem => (
              <MDBCol>
                <MDBCard style={{ maxWidth: '540px' }}>
                <MDBRow className='g-0'>
                  <MDBCol md='4'>
                    <MDBCardImage src={postItem?.imageFile} alt='...' fluid />
                  </MDBCol>
                  <MDBCol md='8'>
                    <MDBCardBody>
                      <MDBCardTitle>
                      <a data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => directIntoDetail(postItem?._id)} className="text-dark fw-bold" href="#!">
                        {postItem?.title}
                      </a>
                      
                      </MDBCardTitle>
                      <MDBCardText>
                        This is a wider card with supporting text below as a natural lead-in to additional content. This
                        content is a little bit longer.
                      </MDBCardText>
                      <MDBCardText>
                        <small className='text-muted'>{moment(post?.createdAt).fromNow()}</small>
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        )
      }
  }
  return (
      <>
          {setCardDisplay()}
      </>
  )
}