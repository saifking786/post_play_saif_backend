import mongoose from 'mongoose';
import { commentSchema } from './comment-schema.js';
import { ApplicationError } from '../error-handler1/application-error.js';
import { postSchema} from '../post/post-schema.js';
import { userSchema } from '../user/user-schema.js';

const UserModel=mongoose.model('User',userSchema);
const postModel=mongoose.model('Post',postSchema);
const commentModel=mongoose.model('Comment',commentSchema);

export default class CommentRepository{
    async getCommentbyid(postid){
    try {
        const comments = await commentModel.find({ postId: postid }).exec();
        return comments;
    } catch (error) {
        console.error(error);
        throw new ApplicationError('Unable to fetch comments', 500);
    }
}
   async newcomment(postid,desc){
    try{
        const newComment = new commentModel({
            postId: postid,
            desc: desc,
        });
        await newComment.save();
    }catch(error){
        console.error(error);
        throw new ApplicationError('Unable to post comments', 500);
    }
   }
   async updatecomment(id,desc){
    try{
       const comment=await commentModel.findById(id);
       if(!comment){
         throw new Error("comment not find");
       }
       comment.desc=desc;
       console.log("yahan",comment);
       return comment;
    }catch(err){
        console.error(err);
        throw new ApplicationError('Unable to update comments', 500);
    }
   }
   async deletecomment(id){
    try{
        return await commentModel.findByIdAndDelete(id);
        
    }catch(err){
        console.error(err);
        throw new ApplicationError('Unable to delete comments', 500); 
    }
   }
}