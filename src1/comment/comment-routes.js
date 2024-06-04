import express from 'express';
import commentController from './comment-controller.js';
// 2. Initialize Express router.
const commentRouter = express.Router();

const commentcontroller = new commentController();

commentRouter.get('/:id',(req,res)=>{
    commentcontroller.getcommentById(req,res);
});
commentRouter.post('/create/:id',(req,res)=>{
    commentcontroller.createcomment(req,res);
});
commentRouter.put('/updatecomment/:id',(req,res)=>{
    commentcontroller.updatecomment(req,res);
});
commentRouter.delete('/delete/:id',(req,res)=>{
    commentcontroller.deletecomment(req,res);
});

export default commentRouter;
