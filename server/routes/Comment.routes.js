import express from 'express';
import { createComment, getComments } from '../controller/Comment.controller.js';

const router = express.Router();

router.get("/:id/:page", getComments);
router.post("/:id", createComment);

export default router;