import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import UserRepository from './user-repository.js';
import { ApplicationError } from '../error-handler1/application-error.js';
export default class Usercontroller{

  constructor(){
    this.userRepository = new UserRepository();
  }

     async signUp(req,res){
       const{name ,email,password,gender}=req.body;
       try{
       const user={
        name,
        email,
        password,
        gender,
       }
       await this.userRepository.signUp(user);
     res.status(201).send(user);
      }catch(error){
        console.log(error);
        throw new ApplicationError("sigup can't be done in controller", 500);  
      }
    }

   async signIn(req,res){

        const{email,password}=req.body;
        const user=await this.userRepository.signIn(email,password);
        if(!user){
          throw new ApplicationError("cant find user", 404);
        }else{
            const token = jwt.sign(
                {
                  userId: user.id,
                  email: user.email,
                },
                'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
                {
                  expiresIn: '9h',
                }
              );
              res.status(200).send(token);
        }
    }
  async resetPassword(req,res,next){
     const {userId,password}=req.body;
     try{
      await this.userRepository.resetPassword(userId,password);
      res.status(200).send("password id reset");
     }catch(error){
      console.log(err);
      console.log("Passing error to middleware");
      next(err);
     }
  }
  async logOut(req,res,next){
    const {userid}=req.body;
    console.log('yahan',userid);
    try{
      console.log("chal");
      await this.userRepository.logOut(userid);
      res.status(200).send("logout successfully");
    }catch(error){
      next(error);
    }
  }
   getDetails = async (req, res, next) => {
    console.log("nikal",req.params);
    const { id } = req.params;
     console.log("nikal",id);
    try {
      const userProfile = await this.userRepository.getDetails(id);
      res.status(200).json(userProfile);
    } catch (error) {
      next(error);
    }
  };
  
  getAllDetails = async (req, res, next) => {
    try {
      const allUserProfiles = await this.userRepository.getAllDetails();
      res.status(200).json(allUserProfiles);
    } catch (error) {
      next(error);
    }
  };
  
   updateDetails = async (req, res, next) => {
    const { userId } = req.params;
    const updates = req.body;
  
    try {
      const updatedProfile = await this.userRepository.updateDetails(userId, updates);
      res.status(200).json(updatedProfile);
    } catch (error) {
      next(error);
    }
}
};