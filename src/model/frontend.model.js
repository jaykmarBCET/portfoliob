import mongoose from 'mongoose'

const frontendSchema = new mongoose.Schema({
    technology:{
        type:String,
        required:true,
        trim:true,

    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    image:{
        type:String,
        trim:true,
    }
})

const Frontend = mongoose.model("frontend", frontendSchema)

export {Frontend}