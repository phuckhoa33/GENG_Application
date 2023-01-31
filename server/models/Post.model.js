import mongoose, { Schema } from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    author: String,
    imageFile: String,
    tags: [String],
    state_article: {
        type: String,
        enum: ['pending', 'done', 'fail'],
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    comment: {
        type: [String],
        default: []
    },
    views: {
        type: [String],
        default: []
    },
    acceptedAdmins :{
        type: [String],
        default: []
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model("Post", postSchema);