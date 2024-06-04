import otpGenerator from 'otp-generator';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { OtpRepository } from "./otp.repository.js";
import sendOtpInmail from '../../utils/mailsender.js';
import userRepository from '../user/user-repository.js';
import { userSchema } from '../user/user-schema.js';

const UserModel=mongoose.model('User',userSchema);
export class OtpController{
    static globalVar=false;
    constructor(){
        this.otpRepository=new OtpRepository();
        this.userRepository=new userRepository();
       
    }
    async createOtp(req,res,next){
        try{
            const {email}=req.body;

            const isUserExist= await UserModel.findOne({ email });
            if(!isUserExist){
                return res.status(400).send('Email is not registered!!!');
            }
            const otp=otpGenerator.generate(6,{upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,})
                console.log('otp',otp);
                const isCreated=await this.otpRepository.createOtp(email,otp);
                const mailResponse=await sendOtpInmail(email,otp);
                if(mailResponse.success&&isCreated){
                    return res.status(200).json({success:true,message:"please check your email!!!,OTP sent successfully on your app registered  email"})
                }
                else{
                    return res.status(400).send("email is not valid or it is not registered.")
                }
        }
        catch(err){
            console.log(err);
            next(err);
        }
       



    }
    async verifyOtp(req,res,next){
        try{
            const {otp,email}=req.body;
            // const usersEmail=req.userEmail;
            const result=await this.otpRepository.verifyOtp(otp,email);
            if(result){
                return res.status(200).send("OTP has been verified successfully");
              
            }
           else{
            return res.status(400).send("OTP is not valid!!!");
           }
        }
        catch(err){
            next(err);
        }

    }

    async resetPassword(req,res,next){
        const {newPassword,email,userid}=req.body;
        try{
            const isExistedOtpDeleted=await this.otpRepository.checkDbOtpExist(email);
            if(!isExistedOtpDeleted){
                return res.status(400).send("To reset password,first verify your registered email!!!")
            }
            else{
                console.log(userid);
                const hashedPassword=await bcrypt.hash(newPassword,12);
                const resultObject=await this.userRepository.resetPassword(hashedPassword,userid);
                if(resultObject){
                    return res.status(200).send(resultObject);
                }
                else{
                    return res.status(401).send("password reset failed!!!");
                }
            }


        }
        catch(err){
            next(err)
        }
    }
   
}