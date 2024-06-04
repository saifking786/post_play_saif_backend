import mongoose from "mongoose";
import { ApplicationError } from "../error-handler1/application-error.js";
import { otpSchema } from "./otp.schema.js";

const otpModel=mongoose.model("OTP",otpSchema);
export class OtpRepository{

    async createOtp(email,otp){
        try{
            const newOtp=new otpModel({email:email,otp:otp});
             const res=await newOtp.save();
             if(res){
                return true;
             }
             else{
                return false;
             }
        }
        catch(error){
            throw new ApplicationError("error while generating otp",500);
        }
    }

    async verifyOtp(otp,email){
        try{
            //return the most recent otp  stored in databse
            // console.log(email);
            const otpObject=await otpModel.findOne({email});
            // const otpObject = await otpModel.findOne({ email: email }).sort({ createdAt: -1 }).limit(1);
            console.log(otpObject);
      if (otpObject) {
    // Document found
    console.log("OTP Object:", otpObject);
     } else {
    // No matching document found
    console.log("No OTP found for the provided email.");
      }
            console.log("kya",otpObject);
            if(otpObject.otp==otp){
                console.log(true);
                return true;
            }
            return false;
            

        }
        catch(error){
            throw new ApplicationError("otp is not valid!!!",400);
        }


    }

    async checkDbOtpExist(email){
        try{
        //    const deleteAllOtp=await otpModel.deleteMany({email:email});
        const otpObject=await otpModel.findOne({email});
        console.log(otpObject);
                if(otpObject){
                    return true;  
                }
                else{
                    return false;
                }
          
        }
        catch(error){
            throw new ApplicationError("error while checking otp exist ot  not !!!",400);
        }
    }

   

}