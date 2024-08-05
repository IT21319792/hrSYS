import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please provide a username"],
        unique: [true,"Username already exists"]
    },
    email: {
        type: String,
        required: [true,"Please provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true,"Please provide a password"],
        unique: false,
    },

    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    mobile: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },  
    profile: {
        type: String,
        required: false
    },
});

export default mongoose.model.Users || mongoose.model("User", UserSchema);