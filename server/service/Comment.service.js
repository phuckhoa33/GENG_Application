import CommentModel from "../models/Comment.model.js";


class CommentService {
    async createComment(comment, user_id, post_id) {
        const saved_comment = new CommentModel({
            userId: user_id,
            pageId: post_id,
            content: comment,
        });
        saved_comment.save();
    }

    async getComments(pageId, page) {
        const limit = 4;
        const startIndex = (Number(page) - 1)*limit;
        const total = await CommentModel.countDocuments({pageId});
        const comments = await CommentModel.find({pageId, dependId: ""}).limit(limit).skip(startIndex);
        return {comments, pages:Math.round(total/limit)};
    }
}

export default CommentService;