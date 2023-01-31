import PostModel from "../models/Post.model.js";
import AccountModel from "../models/Account.model.js";
import { assignInformationForPosts, getTop5Posts, writeContentToFile } from "../helpers/Post.helper.js";

class PostServive {
    async getPosts() {
        const posts = await PostModel.find({});
        const users = await AccountModel.find({});
        const result = await assignInformationForPosts(posts, users);
        return result.reverse();
    }

    async getPost(id){
        const post = await PostModel.findById(id);
        return post;
    }

    async createPost(description, title, imageFile, tags, author) {
        const user = await UserModel.findById(author);
        const description_id = await writeContentToFile(description, user.name);
        const newPost = new PostModel({
            title,
            description: description_id,
            imageFile,
            tags,
            author
        })

        await newPost.save();
        return newPost
    }

    async getTop5Posts(){
        const posts = await PostModel.find({state_article: "done"});
        const sortedPosts = await getTop5Posts(posts);
        if(posts.length>5){
            return sortedPosts.slice(0, 5);
        }
        return sortedPosts;
    }

    async addNotification(id, id_post) {
        const author = await AccountModel.findById(id);
        for (let i = 0; i < author.followers.length; i++) {
            const follower = await AccountModel.findById(author.followers[i]);
            follower.notification.push(id_post);
            await AccountModel.findByIdAndUpdate(author.followers[i], follower, {new: true});
        }
    }

    async getByTags(tag) {
        const posts = await PostModel.find({tags: {$in: tag}});
        const users = await AccountModel.find({});
        const result = await assignInformationForPosts(posts, users);
        return result;
    }

    async viewedNotifications(id, id_author) {
        const author = await AccountModel.findById(id_author);
        const index_viewer = author.notification.indexOf(id);
        if(index_viewer > -1){
            author.notification = author.notification.slice(0, index_viewer).concat(author.notification.slice(index_viewer+1, author.notification.length));
        }
        await AccountModel.findByIdAndUpdate(id_author, author, {new: true});
    }
}

export default PostServive;