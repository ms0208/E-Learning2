import mongoose from "mongoose";
// Schema
const userSchema = new mongoose.Schema({
    fullName: {
         type: String,
          required: true
        },
    phoneNumber:{
        type:Number,
        required:true},
    email: {
         type: String,
          required: true },
    password: { 
        type: String,
        required: true },
})

// Model
const UserModel = mongoose.model("user", userSchema);

export default UserModel