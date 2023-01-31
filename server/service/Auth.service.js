import { checkUserOnFollowerList, unfollowAndDeleteInList, send_email_helper } from "../helpers/Account.helper.js";
import AccountModel from "../models/Account.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import PostModel from "../models/Post.model.js";


class AuthService {
    async following(id_folower, id_author, state){
        const author = await AccountModel.findById(id_author);
        if(checkUserOnFollowerList(author.followers, id_folower)){
            if(state==="plus"){
                author.followers.push(id_folower);
            }
        }
        else {
            if(state=== "minus"){
                author.followers = await unfollowAndDeleteInList(author.followers, id_folower);
            }
        }
        await AccountModel.findByIdAndUpdate(id_author, author, {new: true});
        const users = await AccountModel.find({});
        return users;
    }

    async getUser(id){
        const admin = await AccountModel.findById(id);
        return admin;
    }

    async login(email, password) {
        const user = await AccountModel.findOne({email});

        if(!user) return {finalResult:{message: "Email kk or password is invalid"}, status: 500};

        const isPassword = await bcrypt.compare(password, user.password);

        if(!isPassword) return {finalResult: {message: "Email or password is invalid"}, status: 500};
        
        const accessToken = jwt.sign({email: user.email, id: user._id}, process.env.ACCESS_TOKEN, {expiresIn: "1h"});

        return {finalResult:{result: user, accessToken}, status: 200}
    }

    async browserArticle(article, admin, action){
        
        if(action === 'refuse'){
            article.state_article = 'fail';
            article.acceptedAdmins = [];
            await PostModel.findByIdAndUpdate(article._id, article, {new: true});
            return "This article has been refused by the admin";
        }
        article.acceptedAdmins.push(admin._id);
        await PostModel.findByIdAndUpdate(article._id, article, {new: true});
        const admins = await AccountModel.find({role: 'admin'});
        if(article.acceptedAdmins.length === admins.length){
            article.state_article = 'done';
            await PostModel.findByIdAndUpdate(article._id, article, {new: true});
        }

        return "This article has been accepted";
    }

    async changeRole(array_user, id_admin, changedRole, change){
        for(let i = 0; i < array_user.length; i++){
            const user = await AccountModel.findById(array_user[i]);
            user.role = changedRole;
            user.level_admin = change;
            user.id_admin_change.push(id_admin);
            await AccountModel.findByIdAndUpdate(user._id, user, {new: true});
        }
        return "Change role is successfully changed";
    }

    async ban(array_user, id_admin, ban){
        for(let i = 0; i < array_user.length; i++){
            const user = await AccountModel.findById(array_user[i]);
            user.ban = ban;
            user.id_admin_change.push(id_admin);
            await AccountModel.findByIdAndUpdate(user._id, user, {new: true});
        }
        return "You have banned a account";
    }

    async restore(amountRestoreArticles, admin) {
        for(let i = 0; i < amountRestoreArticles.length; i++){
            const article = await PostModel.findById(amountRestoreArticles[i]);
            article.deleted = false;
            article.acceptedAdmins.push(amountRestoreArticles[i]);
            await PostModel.findByIdAndUpdate(article._id, article, {new: true});
        }
        return "You have successfully restored";
    }

    async send_email(receivedEmail){
        const code = await send_email_helper(receivedEmail);
        const user = await AccountModel.findOne({email: receivedEmail});
        user.code.push(code);
        await AccountModel.findByIdAndUpdate(user._id, user, {new: true});
    }
}

export default AuthService;