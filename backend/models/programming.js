import mongoose from 'mongoose'

const programmingScehma = new mongoose.Schema({
    languagename:{
        type:String,
        require:true
    }
});
const programmodle = mongoose.model('language',programmingScehma);

export default programmodle;