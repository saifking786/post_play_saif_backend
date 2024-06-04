import mongoose from "mongoose";
import { userSchema } from "./user-schema.js";
import { ApplicationError } from "../error-handler1/application-error.js";
// import { userProfileSchema } from "./user-profile-schema.js";
const UserModel=mongoose.model('User',userSchema);
// const userProfileModel=mongoose.model('UserProfile',userProfileSchema);
export default class userRepository{
    async signUp(user){
        try{
            // create instance of model.
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("cant sign up", 500);  
    }
}
    async signIn(email,password){
        try{
            return await UserModel.findOne({email, password});
        }catch(error){
            throw new ApplicationError("cant signin", 500);  
        }
    }

    async resetPassword(password,userId){
  try{
        const user=await UserModel.findById(userId)
        console.log("chal",user);
        if(user){
          user.password=password;
          await user.save();
        }else{
            throw new Error("user not found");
        }
        return user;
    }catch(error){
        throw new ApplicationError("cant reset password", 500);  
}
    }
   async logOut(userId){
    const user = await UserModel.findById(userId);
if (!user) {
  throw new Error("user not found during logout");
}
    return await UserModel.findByIdAndDelete(userId);
   }

   async getDetails(userId) {
    console.log("chal",userId)
    const t= await UserModel.findById(userId).select('-_id name email gender'); // Populate user details from the 'User' model
    console.log("kkk",t);
    return t;
  }
  
  async getAllDetails() {
    return await UserModel.find().select('-_id name email gender'); // Populate user details from the 'User' model
  }

  async updateDetails(userId, updates) {
    return await UserModel.findOneAndUpdate({ userId }, updates, { new: true });
  }
};