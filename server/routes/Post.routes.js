import express from 'express';
import { createPost,
         deletePost, 
         getPost, 
         getPosts, 
         getPostsByUser, 
         getPostsSlice, 
         getRelatedAdd, 
         updatePost, 
         updatedViewPost,
         updatedCommentPost,
         getPostsByTag,
         updateCreator,
         getSearchPost, 
         getTop5Posts
        } 
from '../controller/Post.controller.js';
import auth from '../middleware/Auth.middleware.js';

const router = express.Router();

router.get("/search", getSearchPost);
router.get("/", getPosts);
router.get('/top5', getTop5Posts);
router.get("/slice", getPostsSlice);
router.get("/relatedAdd", getRelatedAdd);
router.get("/:id", getPost);
router.get("/userPosts/:id", getPostsByUser);
router.get("/tag/:tag", getPostsByTag);
router.post("/", auth, createPost);
router.delete("/:id", auth, deletePost);
router.patch("/:id", auth, updatePost);
router.patch("/views/:id/:name", updatedViewPost);
router.patch("/comment/:id", updatedCommentPost);
router.patch("/avatar/:id", updateCreator);

export default router;