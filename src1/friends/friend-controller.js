import { ApplicationError } from "../error-handler1/application-error.js";
import friendReposatory from "./friend-repository.js";

export default class friendcontroller{
    constructor(){
        this.FriendRepository = new friendReposatory();
      }
    async getfriends(req,res){
        try{
           const {userId}=req.params;
           const returnfriends=await this.FriendRepository.getFriends(userId);
           res.status(200).send(returnfriends);
        }catch(err){
            console.error(err);
            throw new ApplicationError('Unable to getfriends', 500);
        }
    }
    async getpendingreq(req,res){
        try{
           const {user}=req.body;
           const returnfriends=await this.FriendRepository.getPendingreq(user);
           res.status(200).send(returnfriends);
        }catch(err){
            console.error(err);
            throw new ApplicationError('Unable to getfriends', 500);
        }
        }
    async togglefriend(req,res){
       try{
        // console.log("friendhai",req.params);
        const {friendId}=req.params;
        const {user}=req.body;
        console.log("friend",user,friendId);
        const returnfriends=await this.FriendRepository.toggleFriend(user,friendId);
        res.status(200).send(returnfriends);
       }catch(err){
        console.error(err);
            throw new ApplicationError('Unable to getfriends', 500);
        }
       }
    async responsetofriend(req,res){
        try{
            const {friendid}=req.params;
            const {user,status}=req.body;
            console.log("kya re",friendid,user,status)
            const returnfriends=await this.FriendRepository.responseToFriend(user,friendid,status);
            res.status(200).send(returnfriends);
        }catch(err){
            console.error(err);
            throw new ApplicationError('Unable to getfriends', 500);  
        }
    }
    }