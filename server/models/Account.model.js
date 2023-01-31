import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {
        type: String, 
        default: "https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8="
    },
    followers: {
        type: [String],
        default: []
    },
    notification: {
        type: [String],
        default: []
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    level_admin: {
        type: Number,
        enum: [0,1,2,3,4,5],
        default: 0
    },
    ban: {
        type: Boolean,
        default: false
    },
    id_admin_change: {
        type: [String],
        default: []
    },
    code: {
        type: [String], 
        default: []
    }
});

export default mongoose.model("User", userSchema);