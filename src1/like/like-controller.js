// import like from './like-model.js';
import { ApplicationError } from '../error-handler1/application-error.js';
import LikeRepository from './like-resiporatory.js'
export default class likecontroller{
  constructor(){
    this.likeRepository = new LikeRepository();
  }
   getLikes = async (req, res, next) => {
    try {
        const { id } = req.params;
        const likes = await this.likeRepository.getLikes(id, req.body.onModel);
        res.status(200).json(likes);
    } catch (error) {
        next(error);
    }
};

  toggleLike = async (req, res) => {
    try {
        const { id } = req.params;
        
        const { userId } = req.user;
        console.log("chal",userId); // Assuming you have a middleware to extract user information
        const result = await this.likeRepository.toggleLike(userId, id, req.body.onModel);
        res.status(200).json(result);
    } catch (error) {
      console.log(error);
       throw new ApplicationError("cant toggle",500);
    }
};
}