import express from 'express';
import UserController from './user-controller.js';
import jwtAuth from '../middleware/jwt.middleware.js';
// 2. Initialize Express router.
const userRouter = express.Router();

const userController = new UserController();

// All the paths to controller methods.

userRouter.post('/signup', (req, res, next)=>{
    userController.signUp(req, res, next)
});
userRouter.post('/signin', (req, res)=>{
    userController.signIn(req, res)
});
userRouter.put('/resetPassword', jwtAuth, (req, res, next)=>{
    userController.resetPassword(req, res, next)
});
userRouter.delete('/logout', jwtAuth, (req, res, next)=>{
    userController.logOut(req, res, next)
});
userRouter.get('/get-details/:id', jwtAuth, (req,res,next)=>{
    userController.getDetails(req,res,next);
});
userRouter.get('/get-all-details', jwtAuth, (req,res,next)=>{
    userController.getAllDetails(req,res,next);
});
userRouter.put('/update-details/:id', jwtAuth,(req,res,next)=>{
    userController.updateDetails(req,res,next);
});
export default userRouter;