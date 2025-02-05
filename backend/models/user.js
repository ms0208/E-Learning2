import mongoose from "mongoose";

// Schema

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    phoneno:{type:Number,required:true,trim:true},
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
})

// Model
const UserModel = mongoose.model("user", userSchema);

export default UserModel