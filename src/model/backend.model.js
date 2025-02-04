import mongoose from 'mongoose'


const backenSchema = new mongoose.Schema({
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

const Backend = mongoose.model("backend", backenSchema)

export {Backend}