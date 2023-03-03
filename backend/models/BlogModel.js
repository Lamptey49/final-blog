import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema

const blogSchema = new  mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    slug:{
        type:String,
        required: true,
    },
    body:{
        type:String,
        required: true,
        min: 20    
    },
    image:{
        type:String,
        required:true
       
    },
    categories:{type:String},
    tags:{type: String},
    postedBy:{
        type:ObjectId,
        ref:'User'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
},
    {timestamps: true}
)

export default mongoose.model('Blog', blogSchema)