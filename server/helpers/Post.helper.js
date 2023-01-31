import fs from 'fs';
import nodemailer from 'nodemailer';
// --> POST
export const setRadomizedIdImage = (author) => {
    try {
      const idOfImage = author + Math.floor(Math.random()*101);
      return idOfImage;
    } catch (error) {
      console.log(error);
    }
}

export const writeContentToFile = async(data, name) => {
  const nameFile = await setRadomizedIdImage(name);
  fs.writeFileSync(`library/${nameFile}.txt`, data, function(err) {
    fs.readFile(`library/${nameFile}.txt`, function(err, contents) {
      console.log(contents.toString());
    });
  });
  return nameFile;
}

// UPDATE 
export const updateContentToFile = async(data, name) => {
  fs.writeFileSync(`library/${name}.txt`, data, function(err) {
    fs.readFile(`library/${name}.txt`, function(err, contents) {
      console.log(contents.toString());
    });
  });
}

// -> GET
export const assignInformationForPosts = async (posts, users) => {
  for(let i = 0; i < posts.length; i++){
    for(let j = 0; j < users.length; j++) {
      if(posts[i].author.toString()===users[j]._id.toString()){
        posts[i].author = users[j].name;
        posts[i].description = users[j].avatar;
        break;
      }
    }
  }
  return posts;
}

export const assignInformationForPost = async (post, user) => {
  post.author = user.name;
  post.description = await readFileAndTransferContent(post.description);
  return {...post._doc, avatar: user.avatar};
}

const readFileAndTransferContent =async(nameFile) => {
  const data = fs.readFileSync(`library/${nameFile}.txt`,'utf-8');
  return data; 
}

// --> GET Top 5

const accountScorePost = async (views, comment) => {
  const viewsScored = await views?.length*0.7;
  const commentsScored = await comment?.length*0.3;
  const  result = viewsScored+commentsScored;
  return result;//This function will maintain priciple account scrore in the future;
}

export const getTop5Posts = async (posts) => {
  if (posts.length<2) return posts;
  const pivotIndex = posts.length-1; // settled;
  const pivot = posts[pivotIndex];
  const pivotScored = await accountScorePost(posts[pivotIndex]?.views, posts[pivotIndex]?.comment);
  const left = [];// settled;
  const right = [];// settled;

  let currentScore;
  for(let i = 0; i < pivotIndex; i++) {
    currentScore = accountScorePost(posts[i].views, posts[i].comment);
    if (pivotScored>currentScore){
      right.push(posts[i]);
    }
    else{
      left.push(posts[i]);
    }
  }
  // await timeout(1000);
  return [...(await getTop5Posts(left)), pivot, ...(await getTop5Posts(right))];
}

// const swap = (posts, current, convert) => {
//   let temp;
//   temp = posts[current];
//   posts[current] = posts[convert];
//   posts[convert] = temp;
//   return posts;
// }

// export const getTop5Posts = async (posts) => {
//   let currentScored;
//   let tempScored;
//   let result;

//   for(let i = 0; i < posts.length; i++) {
//     currentScored = await accountScorePost(posts[i].views, posts[i].comment);
//     for (let j = i+1; j < posts.length; j++) {
//       tempScored = await accountScorePost(posts[j].views, posts[j].comment);
//       if(currentScored<tempScored){
//         result = await swap(posts, i, j);
//       }
//     }
//   }
//   return result;
// }

// ---------> Send mail forgot password
export const sendMailForgotPassword = () => {

}