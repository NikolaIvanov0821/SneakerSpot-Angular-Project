import { Schema, model } from "mongoose";


const productSchema = new Schema({
    name: {
        type: String
    },
    brand: {
        type: String
    },
    gender: {
        type: String
    },
    sizes: {
        type: String
    },
    price: {
        type: Number,
        min: 0
    },
    colorway: {
        type: String
    },
    style:{
        type: String
    },
    info: {
        type: String
    },
    // images: {
    //     type: Array,
    //     min: 4
    // },
    // likes: Array
});

const Product = model('Product', productSchema);

export default Product;