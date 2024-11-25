import { Schema, model } from "mongoose";


const productSchema = new Schema({
    name: String,
    brand: String,
    gender: String,
    sizes: {
        type: Array
    },
    price: {
        type: Number,
        min: 0
    },
    colorway: String,
    style:String,
    info: String,
    images: {
        type: Array,
        min: 4
    },
    likes: Array
});

const Product = model('Product', productSchema);

export default Product;