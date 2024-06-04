import mongoose from 'mongoose'; // Adjust the path based on your project structure
import { likeSchema } from './like-schema.js';

const LikeModel=mongoose.model('Like',likeSchema);

export default class LikeRepository {
    async getLikes(likeableId, onModel) {
        try {
            const likes = await LikeModel.find({ likeable: likeableId, onModel: onModel }).exec();
            return likes;
        } catch (error) {
            console.error(error);
            throw new ApplicationError('Unable to fetch likes', 500);
        }
    }

    async toggleLike(userId, likeableId, onModel) {
        try {
            const existingLike = await LikeModel.findOne({ user: userId, likeable: likeableId, onModel: onModel });

            if (existingLike) {
                // If like exists, remove it (toggle off)
                await existingLike.remove();
                return { success: true, message: 'Like removed' };
            } else {
                // If like doesn't exist, add it (toggle on)
                const newLike = new LikeModel({
                    user: userId,
                    likeable: likeableId,
                    onModel: onModel,
                });
                await newLike.save();
                return { success: true, message: 'Like added' };
            }
        } catch (error) {
            console.error(error);
            throw new ApplicationError('Unable to toggle like', 500);
        }
    }
};
