import { MDBBadge } from "mdb-react-ui-kit";
import moment from "moment";
import { useEffect } from "react";
import { Accordion, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTop5Posts } from "../redux/feature/postSlide";

export const Top5Posts = ({directIntoDetail, user}) => {
    const {top5} = useSelector((state) => ({...state.post}));
    const {users} = useSelector((state) => ({...state.auth}));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getTop5Posts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const displayedStar = (id) => {
        const arr_star = new Array(id).fill(0);
        return (
            <>
                {arr_star.map(star => (
                    <>
                        <i class="fa-solid fa-star"></i>
                    </>
                ))}
            </>
        )
    }

    return (
        <div style={{cursor: 'pointer'}} className="container ml-3 mb-2">
            <h1>
                All Ranking Series
                <MDBBadge className='ms-2'>RANK</MDBBadge>
            </h1>
            <Accordion className="bg-dark" defaultActiveKey="0" flush>
                {top5?.map((post, id) =>  (
                    <Accordion.Item className="bg-dark" eventKey={id}>
                        
                        <Accordion.Header>{`Rank ${id+1} `}{displayedStar(id+1)}</Accordion.Header>
                        <Accordion.Body>
                        <Card className="bg-dark text-white">
                        <Card.Img src={post.imageFile} alt="Card image" />
                        <Card.ImgOverlay>
                            <Card.Title onClick={() => navigate(`/profile/${users?.find((user) => user?._id===post?.author)?._id}`)}>
                                <img style={{width: '2rem', borderRadius: '50%'}} src={users?.find(user => user._id === post?.author)?.avatar} class="card-img-top h-50" alt="..."/>
                                {users?.find(user => user?._id === post?.author)?.name}
                            </Card.Title>
                            <Card.Text onClick={() => directIntoDetail(post._id, user.result._id)}>
                            <small onClick={() => navigate(`/post/${post._id}`)} className="text-dark fw-bold fs-3">
                                {post.title}
                            </small>
                            </Card.Text>
                            <Card.Text>{moment(post.createdAt).fromNow()}</Card.Text>
                        </Card.ImgOverlay>
                        </Card>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    )
}