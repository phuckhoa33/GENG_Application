import React from 'react'
import { Card } from 'react-bootstrap';
import Slider from 'react-slick';
import moment from 'moment';

function SliderPost({posts, handleClickItem, handleAccount}) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2
    };
    return (
        <Slider className='slider' {...settings}>
        {posts && posts.map((post) => (
          <Card className='slider-item'>
            <Card.Img className='w-100'  variant="top" src={post.imageFile} />
            <div className='cover'></div>
            <Card.Body className='slider-body'>
              <small style={{marginLeft: "3rem", color: "", textAlign: "center"}}>{moment(post.createdAt).fromNow()}</small>
              <Card.Title  onClick={() => handleClickItem(post._id, post.creator)} style={{fontSize: "13px", marginTop: "0.5rem", marginLeft: "3rem" ,width: "8rem"}}>{post.title}</Card.Title>
              <Card.Text style={{display: "flex", alignItems: "center", position: "absolute", bottom: '0.4rem', left: "4rem"}}>
                <img width={'23'} style={{borderRadius: "50%", marginRight: "4px"}} src={post.account} alt=''/>
                <Card.Title onClick={() => handleAccount(post?.creator)} style={{fontSize: "10px", paddingTop: "4px"}}>{post.creator}</Card.Title>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Slider>
    )
}

export default SliderPost