import express from 'express';
import likeController from './like-controller.js';
import jwtAuth from '../middleware/jwt.middleware.js';
// 2. Initialize Express router.
const likeRouter = express.Router();

const likecontroller = new likeController();


likeRouter.get('/:id',jwtAuth,(req,res)=>{
    likecontroller.getLikes(req,res);
});
likeRouter.get('/toggle/:id',jwtAuth,(req,res)=>{
    likecontroller.toggleLike(req,res);
});

export default likeRouter;


