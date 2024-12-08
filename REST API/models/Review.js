import { Schema, model } from "mongoose";

const ReviewSchema = new Schema({
    user: String,
    productId: String,
    title: String,
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    comment: String
});

const Review = model('Review', ReviewSchema);

export default Review;