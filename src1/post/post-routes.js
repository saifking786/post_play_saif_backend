import express from 'express';
import postController from './post-controller.js';
// 2. Initialize Express router.
import { upload } from '../middleware/fileupload.middleware.js';
const postRouter = express.Router();

const postcontroller = new postController();
postRouter.get('/post/:id',(req,res)=>{
    postcontroller.getPostById(req,res);
});
postRouter.get('/post',(req,res)=>{
    postcontroller.getPostByUserId(req,res);
});
postRouter.post('/create',upload.single('imageUrl'),(req,res)=>{
    postcontroller.createpost(req,res);
});
postRouter.put('/updatepost/:id',upload.single('imageUrl'),(req,res)=>{
    postcontroller.updatepost(req,res);
});
postRouter.delete('/delete/:id',(req,res)=>{
    postcontroller.deletepost(req,res);
});

export default postRouter;


