// import post from './post-model.js';
import { ApplicationError } from '../error-handler1/application-error.js';
import PostRepository from './post-resiporatory.js';
export default class postcontroller{
    constructor(){
        this.postRepository = new PostRepository();
      }

      async getPostById(req,res){
        const id=req.params.id;
        const result= await this.postRepository.getPostbyId(id);
        if(result){
            return res.status(200).send(result);
        }else{
            throw new ApplicationError("userid not found", 404);
        }
    } 
    async getPostByUserId(req,res){
        const{userid}=req.body;
        const result= await this.postRepository.getPost(userid);
        if(result){
            return res.status(200).send(result);
        }else{
            throw new ApplicationError("userid not found", 404);
        }
    }

    async createpost(req,res){
        const{userid,title,desc}=req.body;
         
        const imageUrl = req.file.filename;
        console.log(userid,title,imageUrl,desc,"king");
        const ans=await this.postRepository.newpost(userid,title,imageUrl,desc);
        return res.status(201).send(ans);
    }
    async updatepost(req,res){
        const id = req.params.id;
        const userid = req.userid;
        const {desc,title} = req.body;  
        const imageUrl = req.file.filename;
        await this.postRepository.updatePost(id,userid,title, imageUrl,desc);
        const result= await this.postRepository.getPostbyId(id);
        res.status(200).send(result);
    }
    async deletepost(req,res){
        let id=req.params.id;
        // const {userid}=req.body;
        const result=await this.postRepository.deletePost(id);
            res.status(200).send("post deleted");
        }
}