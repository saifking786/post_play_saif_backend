import mongoose from 'mongoose';

export const postSchema=new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true,
    },
    imageUrl: {
        type: String, // Assuming the image URL is a string
        required: true,
    },
    desc:{
        type:String,
        required:true,
        maxlength: 25, // Maximum length of 25 characters
        minlength: 5,
    }
});