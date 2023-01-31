import React from 'react';
import moment from 'moment';
import {experpt} from '../ulitity/index';

function RelatedPost({ posts ,top, handleClickItem}) {
  return (
    <div 
        style={{width: "20%", 
                height: "45%", 
                backgroundColor: "white", 
                position:"fixed", 
                top: `${top}rem`, 
                right: "6rem",
                borderRadius: "5px",
                paddingBottom: "3rem"
        }}
    >
        <h6 style={{marginLeft: "1rem", marginTop: "1rem"}}>Recently Posts</h6>
        <hr/>
        {posts.map(post => (
          <div className='related' style={{display: "flex", marginBottom: '1rem', marginLeft: "1rem"}}>
            <img alt='' src={post.imageFile}  style={{borderRadius: "50%", width: "2rem", height: "2rem", marginTop: '0.5rem', marginRight: '0.5rem'}}/>
            <div style={{fontSize: "1rem"}}>
                <div>{moment(post.createdAt).fromNow()}</div>
                <div onClick={() => handleClickItem(post._id, post.creator)}>{experpt(post.title, 24)}</div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default RelatedPost