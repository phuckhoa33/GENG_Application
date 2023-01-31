import UserModal from "../models/Account.model.js";
import PostModal from "../models/Post.model.js";
import CommentService from "../service/Comment.service.js";

const service = new CommentService();

export const createComment = async (req, res) => {
  const { id } = req.params;
  const { name } = req.query;
  const { newComment } = req.body;
  try {

    const user = await UserModal.findById(name);
    const post = await PostModal.findById(id);
    if (!user || !post) {
      return res.status(404).json({
        message: "This information is not exists",
      });
    }

    service.createComment(newComment, user._id, post._id);
    
    const comment = await service.getComments(post._id);
    res.json({comment});
  } catch (error) {
    res.status(500).json({ message: "Interval Server", error });
  }
};

export const getComments = async (req, res) => {
  const { id, page } = req.params;
  try {
    const comment = await service.getComments(id, page);
    res.json({comment});
  } catch (error) {
    res.status(500).json({ message: "Interval Server", error });
  }
};

