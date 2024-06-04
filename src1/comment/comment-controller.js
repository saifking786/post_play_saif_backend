// import comment from './comment-model.js';
import { ApplicationError } from '../error-handler1/application-error.js';
import CommentRepository from './comment-resiporatory.js';
export default class commentcontroller{
    constructor(){
        this.CommentRepository = new CommentRepository();
      }
    async getcommentById(req,res){
       const postid=req.params.id;
       const result=await this.CommentRepository.getCommentbyid(postid);
       if(result){
        return res.status(200).send(result);
    }else{
          throw new ApplicationError("User not found", 404); 
    }
    }
    async createcomment(req,res){
        const postid=req.params.id;
        const{desc}=req.body;
        const ans=await this.CommentRepository.newcomment(postid,desc);
        return res.status(200).send(ans);
    }
    async updatecomment(req,res){
        try{
       let id=req.params.id;
        const{desc}=req.body;
        const upcomment=await this.CommentRepository.updatecomment(id,desc);
        if(upcomment){
            return res.status(200).send(upcomment);
        }
    }catch(err){
        console.log(err);
        throw new ApplicationError("cant update comment", 404); ; 
    }
    }
    async deletecomment(req,res){
        let id=req.params.id;
        const result= await this.CommentRepository.deletecomment(id);
         return res.status(200).send("comment deleted");
    }

}