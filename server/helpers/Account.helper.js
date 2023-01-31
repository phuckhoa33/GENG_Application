export const assignAvatarIntoPosts = (posts, users) => {
    for(let i = 0; i < posts.length; i++) {
        for(let j = 0; j < users.length; j++) {
            if (posts[i].creator === users[j]._id){
                posts[i]['avatar'] = users[j].avatar;
                break;
            }
        }
    }
    return posts;
}

// Follow
export const checkUserOnFollowerList = (follower_array, check_user) => {
    for(let i = 0; i < follower_array.length; i++) {
        if(follower_array[i].toString() === check_user.toString()){
            return false;
        }
    }
    return true;
    
}

export const unfollowAndDeleteInList = async (follower_array, follow_user) => {
    let temp_array = follower_array;
    const id_follower = follower_array.indexOf(follow_user.toString());
    follower_array = temp_array.slice(0, id_follower).concat(temp_array.slice(id_follower + 1, temp_array.length));
    return follower_array;
}

// Change Role
// Send Email
import nodemailer from 'nodemailer';
export const send_email_helper = async(receivedEmail) => {
    const code = Math.floor(Math.random()*999999);
    const usernameMailTrap = process.env.usernameMailTrap;
    const passwordMailTrap = process.env.passwordMailTrap;
    console.log(usernameMailTrap+" "+passwordMailTrap);
    var transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: `${usernameMailTrap}`,
          pass: `${passwordMailTrap}`,
        }
    });
    var mailOptions = {
        from: `${receivedEmail}`,
        to: `mphuc8671@gmail.com`,
        subject: 'Sending Email using Node.js',
        text: 'Do you want to reset your password for account of GENG? If yes, you must click below button',
        html: `Your code: ${code}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    return code;
}