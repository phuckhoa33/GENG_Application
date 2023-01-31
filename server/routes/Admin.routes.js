import express from 'express';
import { broweringPosts, changeRole, login, restoreArticles } from '../controller/Admin.controller.js';
import auth from '../middleware/Auth.middleware.js';

const router = express.Router();

router.post('/login', login);
router.patch('/broweringPost/:id_article/:action', auth, broweringPosts);
router.patch('/changeRole', auth, changeRole);
router.patch('/restore', auth, restoreArticles);

export default router;