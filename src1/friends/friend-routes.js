import express from 'express';
import friendController from './friend-controller.js';

const friendRouter=express.Router();

const friendcontroller=new friendController();

friendRouter.get('/get-friends/:userId',(req,res)=>{
    friendcontroller.getfriends(req,res);
});
friendRouter.get('/get-pending-requests',(req,res)=>{
    friendcontroller.getpendingreq(req,res);
});
friendRouter.put('/toggle-friendship/:friendId',(req,res)=>{
    friendcontroller.togglefriend(req,res);
});
friendRouter.get('/response-to-request/:friendid',(req,res)=>{
    friendcontroller.responsetofriend(req,res);
});
export default friendRouter;