import moment from 'moment';
import React from 'react'
import { Card } from 'react-bootstrap';
import Slider from 'react-slick';

function UserSlice({posts}) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider
      className='user-item' 
      {...settings}
    >
      {posts?.map(post => post?.state_article === "done" && (
        <Card style={{}}>
        <Card.Img className='w-100'  variant="top" src={post.imageFile} />
        <div className='cover'></div>
        <Card.Body className='slider-body'>
          <small style={{marginLeft: "3rem", color: "", textAlign: "center"}}>{moment(post.createdAt).fromNow()}</small>
          <a href={`${post?._id}`}>
            <Card.Title  style={{fontSize: "13px", marginTop: "0.5rem", marginLeft: "3rem" ,width: "8rem"}}>{post.title}</Card.Title>
          </a>
          <Card.Text style={{display: "flex", alignItems: "center", position: "absolute", bottom: '0.4rem', left: "4rem"}}>
            <img width={'23'} style={{borderRadius: "50%", marginRight: "4px"}} src={post.account} alt=''/>
            <Card.Title style={{fontSize: "10px", paddingTop: "4px"}}>{post.creator}</Card.Title>
          </Card.Text>
        </Card.Body>
      </Card>
      ))}
    </Slider>
  )
}

export default UserSlice