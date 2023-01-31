import UserModal from '../models/Account.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import AuthService from '../service/Auth.service.js';

const service = new AuthService();

export const login = async(req, res) => {
    const {email, password} = req.body;
    try {
        const finalResult = await service.login(email, password);   
        res.status(finalResult.status).json(finalResult.finalResult);
    } catch (error) {
        res.status(500).json({message: "Interval server error"});
    }
}

export const register = async (req, res) => {
    const {email, password, firstName, lastName} = req.body;
    try {

        const oldUser = await UserModal.findOne({email});

        if(oldUser) return res.status(500).json({message: "User had had in database"})

        const hashPassword = await bcrypt.hash(password, 12);

        const result = await UserModal.create({
            email,
            password: hashPassword,
            name: `${firstName}${lastName}`
        })

        const accessToken = jwt.sign({email: result.email, id: result._id}, process.env.ACCESS_TOKEN, {expiresIn: "1h"});
        res.status(201).json({result,  accessToken});
    } catch (error) {
        res.status(500).json({message: "Interval server error"});
    }
}

export const getUsers = async(req, res) => {
    try {
        const users = await UserModal.find({});
        res.json({users});
    } catch (error) {
        res.status(500).json({message: "Interval server error"});
    }
}

export const updateAvatar = async(req, res) => {
    const {id} = req.params;
    const {name, password, email, avatar} = req.body;
    try {
        
        const user = await UserModal.findById(id);
        if(!user) {
            return res.status(404).json({message: "User is not exists"});
        }

        let hashPassword;
        user.name = name;
        if(password!==""){
            hashPassword = await bcrypt.hash(password, 12);
        }
        user.password = hashPassword;
        user.email = email;
        user.avatar = avatar;
        

        const updatedUser = await UserModal.findByIdAndUpdate(id, user, {new: true});

        res.json({updatedUser});
    } catch (error) {
        res.status(500).json({message: "Interval server error"});
    }
}

export const followingAuthor = async(req, res) => {
    const {id, state} = req.params;
    try {
        const users = await service.following(req.author, id, state);
        res.status(400).json({users});
    } catch (error) {
        res.status(500).json({message: "Interval server error", error});
    }
}

export const sendEmail = async(req, res) => {
    const {receivedEmail} = req.params;
    try {
        const code = await service.send_email(receivedEmail);
        res.status(400).json({code});
    } catch (error) {
        res.status(500).json({message: "Interval server error s", error});
    }
};

export const changePassword = async(req, res) => {
    const {password, id} = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 12);
        const author = await UserModal.findById(id);
        author.password = hashPassword;
        await UserModal.findByIdAndUpdate(author._id, author, {new: true});
        res.status(200).json({message: "This changing is successful"});
    } catch (error) {
        res.status(500).json({message: "Interval server error s", error});
    }
}