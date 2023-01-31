import mongoose from 'mongoose';
import PostModal from '../models/Post.model.js';
import UserModal from '../models/Account.model.js';
import { assignInformationForPost,  assignInformationForPosts,  updateContentToFile,  writeContentToFile } from '../helpers/Post.helper.js';
import PostServive from '../service/Post.service.js';

const service = new PostServive();

export const getPosts = async(req, res) => {
    // const {page} = req.query;
    try {

        // const limit = 4;
        // --> Pagination 
        // const startIndex = (Number(page) - 1)*limit;
        // const total = await PostModal.countDocuments({});
        // const posts = await PostModal.find().limit(limit).skip(startIndex);
        // --> End Pagination
        const result = await service.getPosts();
        res.json({
            result
        });
    } catch (error) {
        res.status(500).json({message: "Interval Server Error", error});
    }
}

export const getTop5Posts = async(req, res) => {
    try {
        const posts = await service.getTop5Posts();
        return res.json({posts})
    } catch (error) {
        res.status(500).json({message: "Interval Server Error", error});
    }
}

export const getPostsSlice = async(req, res) =>{
    try {
        const limit = 8;
        const posts = await PostModal.find({}).limit(limit);
        res.json({posts});
    } catch (error) {
        res.status(500).json({message: "Interval Server Error"});
    }
}

export const getPost = async(req, res) => {
    const {id} = req.params;
    try {
        const called_post = await PostModal.findById(id);
        const user = await UserModal.findById(called_post.author);
        const post = await assignInformationForPost(called_post, user);
        res.status(200).json({post});
    } catch (error) {
        res.status(500).json({message: "Interval Server Error"});
    }
}

export const getRelatedAdd = async(req, res) => {
    try {
        const posts = await PostModal.find();
        const postWrap = [];
        for(let a = posts.length-1; a > posts.length-4; a--){
            postWrap.push(posts[a]);
        }
        res.json({posts: postWrap});
    } catch (error) {
        res.status(500).json({message: "Interval Server Error"});
    }
}

export const createPost = async(req, res) => {
    const {description, title, imageFile, tags} = req.body;
    try {
        const user = await UserModal.findById(req.author);
        const description_id = await writeContentToFile(description, user.name);
        const newPost = await PostModal.create({
            title,
            description: description_id,
            imageFile,
            tags,
            author: req.author
        })
        
        await service.addNotification(req.author.toString(), newPost._id.toString());
        const posts = await UserModal.find({});
        res.status(201).json({posts});
    } catch (error) {
        res.status(500).json({message: "Interval Server Error"});
    }
}

export const getPostsByUser = async(req, res) => {
    const {id} = req.params;
    try {
        const user = await UserModal.findById(id);
        if(!user){
            return res.status(404).json({message: "User is not exists"})
        }
        const posts = await PostModal.find({author: id, deleted: false});
        res.json({posts});
    } catch (error) {
        res.status(500).json({message: "Interval Server Error"});
    }
}

export const getPostsByTag = async(req, res) => {
    const {tag} = req.params;
    try {
        const posts = await service.getByTags(tag);
        res.json({posts});
    } catch (error) {
        res.status(500).json({message: "Interval Server Error"});
    }
}

export const deletePost = async(req, res) => {
    const {id} = req.params;
    try {
        const updatedPost = await PostModal.findById(id);
        updatedPost.deleted = true;
        await PostModal.findByIdAndUpdate(id, updatedPost, {new: true});
        res.json({message: "Post have deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Interval Server Error"});
    }
}

export const updatePost = async(req, res) => {
    const {id} = req.params;
    const {title, description, tags, imageFile} = req.body;
    try {
        const user = await UserModal.findById(req.author);
        const updatePost = await PostModal.findById(id);
        await updateContentToFile(description, updatePost.description_id);
        updatePost.state_article = 'pending';
        updatePost.title = title;
        updatePost.tags = tags;
        updatePost.imageFile = imageFile;
        await PostModal.findByIdAndUpdate(id, updatePost, {new: true});
        res.json({message: "Update Post is successfully"});
    } catch (error) {
        res.status(500).json({message: "Interval Server Error"});
    }
}

export const updatedViewPost = async(req, res) => {
    const {id, name} = req.params;
    try {

        const post = await PostModal.findById(id);

        if(post.creator !== name){
            post.views.push(name);
        }
        const viewer = await UserModal.findOne({name});
        await service.viewedNotifications(id, viewer._id.toString());
        await PostModal.findByIdAndUpdate(id, post, {new: true});
        const posts = await UserModal.find({});
        res.json({posts});
    } catch (error) {
        res.status(500).json({message: "Interval Server Error"});
    }
}

export const updatedCommentPost = async(req, res) => {
    try {
        const {id} = req.params;
        const {name} = req.query;

        const post = await PostModal.findById(id);

        post.comment.push(name);

        const updatedPost = await PostModal.findByIdAndUpdate(id, post, {new: true});
        res.json({updatedPost});
    } catch (error) {
        res.status(500).json({message: "Interval Server Error"});
    }
}

export const updateCreator = async(req, res) => {
    try {
        const {id} = req.params;
        const {name} = req.query;

        const post = await PostModal.findById(id);

        post.account = name;
        
        const updatePost = await PostModal.findByIdAndUpdate(id, post, {new: true});
        res.json({message: updatePost});
    } catch (error) {
        res.status(500).json({message: "Interval Server Error"});
    }
}

export const getSearchPost = async(req, res) => {
    const {searchQuery} = req.query;
    try {
        const title = new RegExp(searchQuery, "i");
        const posts = await PostModal.find({title});
        res.json({posts});
    } catch (error) {
        res.status(500).json({message: "Interval Server Error"});
    }
}