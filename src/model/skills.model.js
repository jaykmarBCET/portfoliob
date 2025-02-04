import mongoose from 'mongoose'

const skillsSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        maxLength:50,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        trim:true,
        minLength:20,
        required:true,
    },
    image:{
        type:String,
        trim:true,
    }

},{timestamps:true})

const Skills = mongoose.model("skills",skillsSchema)
export {Skills}