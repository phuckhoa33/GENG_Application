const accountScorePost = async (views, comment) => {
  const viewsScored = views.length*0.7;
  const commentsScored = comment.length*0.3;
  const result = viewsScored+commentsScored;
  return result;//This function will maintain priciple account scrore in the future;
}

// const getTop5Posts = async (posts) => {
//   if (posts.length<2) return posts;
//   const pivotIndex = posts.length-1; // settled;
//   const pivot = posts[pivotIndex];
//   const pivotScored = await accountScorePost(posts[pivotIndex].views, posts[pivotIndex].comment);
//   const left = [];// settled;
//   const right = [];// settled;

//   let currentScore;
//   for(let i = 0; i < pivotIndex; i++) {
//     currentScore = accountScorePost(posts[i].views, posts[i].comment);
//     if (pivotScored>currentScore){
//       right.push(posts[i]);
//     }
//     else{
//       left.push(posts[i]);
//     }
//   }

//   return [...(await getTop5Posts(left)), pivot, ...(await getTop5Posts(right))];
// }
const swap = (posts, current, convert) => {
  let temp;
  temp = posts[current];
  posts[current] = posts[convert];
  posts[convert] = temp;
  return posts;
}

const getTop5Posts = async (posts) => {
  let currentScored;
  let tempScored;

  for(let i = 0; i < posts.length; i++) {
    currentScored = accountScorePost(posts[i].views, posts[i].comment);
    for (let j = i+1; j < posts.length; j++) {
      tempScored = accountScorePost(posts[j].views, posts[j].comment);
      if(currentScored<tempScored){
        posts = swap(posts, i, j);
      }
    }
  }
  return posts;
}

const posts = [
  {
    id: 8,
    views: [3,4,5,3,2],
    comment: [3,2,5,1,4,3]
  },
  {
    id: 2,
    views: [3,4,2],
    comment: [32,1,4,3]
  },
  {
    id: 10,
    views: [3,4,2],
    comment: [3,2,5,1,4,3]
  },
  {
    id: 3,
    views: [3,4,5,3,2],
    comment: [3,2,5,1]
  },
  {
    id: 11,
    views: [3,4,5,3,2, 3,4,2,5,3],
    comment: [3,2,5,1,4,3]
  },
  {
    id: 18,
    views: [3,4,5],
    comment: [3,2,23,2,5,1,4,3]
  },
]
// // console.log(await getTop5Posts(posts));
// const temp = posts.filter(post => post.comment.indexOf(32) !== -1);
// console.log(temp);

import nodemailer from 'nodemailer';
import AccountModel from "../models/Account.model.js";

export const setRadomizedIdCode = ()=> {
  try {
    const code = Math.floor(Math.random()*999999);
    return code;
  } catch (error) {
    console.log(error);
  }
}

const sendMailForgotPassword = async() => {
  var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c46168ffa54413",
      pass: "d51fdc2ff88c7e"
    }
  });
  var mailOptions = {
    from: 'mphuc8671@gmail.com',
    to: 'phuckhoa81@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'Do you want to reset your password for account of GENG? If yes, you must click below button',
    html: `Your code: ${Math.floor(Math.random()*999999)}`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
sendMailForgotPassword()