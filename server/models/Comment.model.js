import mongoose, { Schema } from 'mongoose';

const commentSchema = mongoose.Schema({
    userId: Schema.Types.ObjectId,
    pageId: Schema.Types.ObjectId,
    content: String,
    dependId: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

export default mongoose.model("Comment", commentSchema);