import { Schema, model } from "mongoose";

const ReviewSchema = new Schema({
    user: String,
    name: String,
    title: String,
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    content: String
});

const Review = model('Review', ReviewSchema);

export default Review;