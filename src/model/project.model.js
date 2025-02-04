import mongoose from 'mongoose'


const projectSchema = new mongoose.Schema({
    technology:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        maxLength:50,
    },
    description:{
        type:String,
        required:true,
        minLength:20,
        unique:true,
        trim:true,
    },
    image:{
        type:[String],
        trim:true,
    },
    start:{
        type:Date,
        default : Date.now(),

    },
    end:{
        type:Date,
        default:Date.now()
    },
    link:{
        type:String,
        required:true
    }
},{timestamps:true})

const Projects = mongoose.model("projects",projectSchema)

export {Projects}