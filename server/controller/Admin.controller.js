import AuthService from "../service/Auth.service.js"
import PostServive from "../service/Post.service.js";

const service = new AuthService();
const servicePost = new PostServive();

export const login = async(req, res) => {
    const {email, password} = req.body;
    try {
        const finalResult = await service.login(email, password);   
        if(finalResult.finalResult.result.role === 'user'){
            return res.status(500).json({message: "You are not allowed to login this page"})
        }

        return res.status(finalResult.status).json(finalResult.finalResult);;
    } catch (error) {
        res.status(500).json({message: "Interval server error"});
    }
}

export const broweringPosts = async(req, res) => {
    const {id_article, action} = req.params;
    try {
        const id_admin = req.author;
        const post = await servicePost.getPost(id_article);
        if(post.author.toString() === id_admin.toString()){
            return res.status(500).json({message: 'You are not allowed to browe this article'});
        }
        const admin = await service.getUser(id_admin); 
        if(admin.role === 'user'){
            return res.status(500).json({message: "You are not allowed to login this page"})
        }
        const posts = await service.browserArticle(post, admin, action);

        return res.status(200).json({posts});
    } catch (error) {
        res.status(500).json({message: "Interval server error af"});
    }
}

export const changeRole = async(req, res) => {
    const {amountOfChange, ban, change} = req.body;
    try {
        const admin = await service.getUser(req.author); 
        if(admin.role === 'user'){
            return res.status(500).json({message: "You are not allowed to login this page"})
        }

        let message;

        if(change === 0 && ban === null){
            // Change admin into user
            message = await service.changeRole(amountOfChange, req.author, "user", change);
        }
        else if (change > 0 && ban === null){
            // Change to admin level
            message = await service.changeRole(amountOfChange, req.author, "admin", change);
        }
        else if(change === null){
            // Ban user or admin 
            message = await service.ban(amountOfChange, req.author, ban);
        }
        
        res.status(200).json({message});
    } catch (error) {
        res.status(500).json({message: "Interval server error"});
    }
}

export const restoreArticles = async (req, res) => {
    const {amountRestoreArticles} = req.body;
    try {
        const admin = await service.getUser(req.author); 
        if(admin.role === 'user'){
            return res.status(500).json({message: "You are not allowed to login this page"})
        }

        const message = await service.restore(amountRestoreArticles, req.author);
        res.status(200).json({message});
    } catch (error) {
        res.status(500).json({message: "Interval server error"});
    }
}