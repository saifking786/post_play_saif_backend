import mongoose from 'mongoose';

export const commentSchema=new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    desc:{
        type:String,
        required:true,
        maxlength: 25, 
        minlength: 5,
    }
});