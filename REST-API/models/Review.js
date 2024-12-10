import { Schema, model } from "mongoose";

const ReviewSchema = new Schema({
    _id: String,
    username: String,
    userId: String,
    title: String,
    name: String,
    productId: String,
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    comment: String
});

const Review = model('Review', ReviewSchema);

export default Review;