import mongoose from 'mongoose'


const feedBackSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    message:{
        type:String,
        trim:true,
    },
    issus:{
        type:String,
        trim:true
    }
},{timestamps:true})

const FeedBack = mongoose.model("FeedBack",feedBackSchema)

export {FeedBack}
