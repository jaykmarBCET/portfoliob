import mongoose from 'mongoose'


const programingSchema = new mongoose.Schema({
    language:{
        type:String,
        required:true,
        trim:true,
    },
    start:{
        type:Date,
        default:Date.now()
    },
    end:{
        type:Date,
        default:Date.now()
    }
})


const Programing = mongoose.model("programings", programingSchema)

export {Programing}