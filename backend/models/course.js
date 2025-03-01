import mongoose from 'mongoose'

const CourseSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true, 
    },
    programming:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"language",
    },
    price:{
        type:Number,
        require:true,
    },
    duration:{
        type:String,
        require:true
    }
});
const CourseModel = mongoose.model('course',CourseSchema);

export default CourseModel;