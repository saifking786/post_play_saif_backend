import mongoose from 'mongoose';
import { postSchema } from './post-schema.js';
import { ApplicationError } from '../error-handler1/application-error.js';
import { userSchema } from '../user/user-schema.js';

const UserModel=mongoose.model('User',userSchema);
const postModel=mongoose.model('Post',postSchema);

export default class PostRepository{
    async getPostbyId(id){
       try{
          const post=await postModel.findById(id);
          if(!post){
            throw new ApplicationError("post id is not found", 404);
          }
          return post;
       }catch(err){
        console.log(err);
            throw new ApplicationError("cant get post by id", 500);  
       }
    }
    async getPost(userid){
        try{
            const posts = await postModel.find({ userId: userid }).exec();
            return posts;
        }catch(err){
            console.log(err);
                throw new ApplicationError("cant get post by userid", 500);  
           }
        }
    async updatePost(id,userid,title,
        imageUrl,desc){
            try {
                const post = await postModel.findById(id);
                if (!post) {
                    throw new Error('Post not found');
                }
                if(post.userId!==userid){
                    throw new Error('userid is not able to update');
                }
                post.title=title;
                post.imageUrl=imageUrl;
                post.desc=desc;
                const updatedPost = await post.save();
        return updatedPost;
    }catch(err){
        console.log(err);
        throw new ApplicationError("cant update post", 500);    
    }
}

    async deletePost(id){
        try {
            const post = await postModel.findOneAndDelete({ _id: id});
    
            if (!post) {
                throw new Error('Post not found or user is not authorized to delete');
            }
    
            return post;
    }catch(err){
        console.log(err);
        throw new ApplicationError("cant delete post", 500);    
    }
}
    async newpost(userid,title,
        imageUrl,desc){
            try{
                const newPost = new postModel({
                    userId: userid,
                    title: title,
                    imageUrl: imageUrl,
                    desc: desc,
                });
        
                await newPost.save();
        
                return newPost;
    }catch(err){
        console.log(err);
        throw new ApplicationError("cant create new post", 500);    
    }
}
};