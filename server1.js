import express from 'express';
import commentRouter from './src1/comment/comment-routes.js';
import likeRouter from './src1/like/like-routes.js';
import postRouter from './src1/post/post-routes.js';
import friendRouter from './src1/friends/friend-routes.js';
import userRouter from './src1/user/user-routes.js';
import otpRouter from './src1/otp/otp.routes.js'; // Import the OTP routes
import jwtAuth from './src1/middleware/jwt.middleware.js';
import loggerMiddleware from './src1/middleware/logger.middleware.js';
import { ApplicationError } from './src1/error-handler1/application-error.js';
import { upload } from './src1/middleware/fileupload.middleware.js';
import mongoose from 'mongoose';
import { connectUsingMongoose } from './src1/config/mongooseConfig.js';
const server = express();
server.use(express.json());
server.use(loggerMiddleware);

// Your existing routes
server.use('/api/users', userRouter);
server.use('/api/likes', jwtAuth, likeRouter);
server.use('/api/posts', jwtAuth, postRouter);
server.use('/api/comment', jwtAuth, commentRouter);
server.use('/api/friend',jwtAuth,friendRouter)
// Include the OTP routes
server.use('/api/otp',jwtAuth, otpRouter);

server.get('/', (req, res) => {
    res.send('Welcome to Ecommerce APIs');
});

// Error handling middleware
server.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof ApplicationError) {
        res.status(err.code).send(err.message);
    }
    res
        .status(500)
        .send('Something went wrong, please try later');
});

// 404 Not Found middleware
server.use((req, res) => {
    res.status(404).send("API not found. Please check our documentation for more information at localhost:3200/api-docs")
});

server.listen(3200, ()=>{
    console.log('Server is running at 3200');
    // connectToMongoDB();
    connectUsingMongoose();
  });
  