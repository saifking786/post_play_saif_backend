import mongoose from 'mongoose';
import { friendSchema } from "./friend-schema.js";

const FriendModel=mongoose.model('Friend',friendSchema);

export default class friendReposatory{
    async getFriends(userid){
        try{
    const friends = await FriendModel.find({
        user: userid,
        status: 'accepted',
      }).exec();
      return friends;
}catch(err){
    console.error(err);
    throw new ApplicationError('Unable to fetch friends', 500);
}
}
async getPendingreq(userid){
    try{
        const friends = await FriendModel.find({
            user: userid,
            status: 'pending',
          }).exec();
          return friends;
    }catch(err){
        console.error(err);
        throw new ApplicationError('Unable to fetch friends', 500);
    }
}
async toggleFriend(userid, friendid) {
  console.log("kya",userid,friendid);
    try {
      const friendExists = await FriendModel.exists({ user: userid, friend: friendid });
  
      if (friendExists) {
        const updatedFriend = await FriendModel.findOneAndUpdate(
          { user: userid, friend: friendid },
          { status: 'rejected' },
          { new: true }
        );
        return updatedFriend;
      }
  
      const newFriend = new FriendModel({
        user: userid,
        friend: friendid,
        status: 'accepted'
      });
  
      await newFriend.save();
      return newFriend;
    } catch (err) {
      console.error(err);
      throw new ApplicationError('Unable to toggle friendship status', 500);
    }
  }
  async responseToFriend(userid, friendid, status) {
    try {
      const friendExists = await FriendModel.exists({ user: userid, friend: friendid });
      if (friendExists) {
        const updatedFriend = await FriendModel.findOneAndUpdate(
          { user: userid, friend: friendid },
          { status: status },
          { new: true }
        );
        return updatedFriend;
      }
      const newFriend = new FriendModel({
        user: userid,
        friend: friendid,
        status: status
      });
  
      await newFriend.save();
      return newFriend;
    } catch (err) {
      console.error(err);
      throw new ApplicationError('Unable to update friendship status', 500);
    }
  }
}