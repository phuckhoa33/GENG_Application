import express from 'express';
import {changePassword, followingAuthor, getUsers, login, register, sendEmail, updateAvatar} from '../controller/Account.controller.js';
import auth from '../middleware/Auth.middleware.js';

const router = express.Router();

router.post("/login", login);
router.patch('/changePassword', changePassword);
router.patch('/following/:id/:state', auth, followingAuthor);
router.post("/register", register);
router.patch("/:id", updateAvatar);
router.get("/", getUsers);
router.post('/sendEmail/:receivedEmail', sendEmail);

export default router;