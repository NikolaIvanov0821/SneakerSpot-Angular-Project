import Product from "../models/Product.js";
import querystring from "querystring";


const productService = {

    getAll(filter = {}) {
        const query = Product.find();

        if (filter.where) {
            const q = querystring.parse(filter.where.replaceAll('"', ''))
            query.find(q)
        }

        return query
    },

    getOne(productId) {
        return Product.findById(productId);
    },

    create(productData) {
        return Product.create(productData);
    },

    update(productId, productData) {
        return Product.findByIdAndUpdate(productId, productData)
    },

    delete(productId) {
        return Product.findByIdAndDelete(productId);
    },

    async getLikes(productId) {
        const likes = await fetch(`http://localhost:3030/products/${productId}/likes`)
        return likes
    },

    async likeProduct(productId, userId) {
        const response = await fetch(`http://localhost:3030/products/${productId}/likes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
        });

        const likes = await response.json();
        console.log(typeof likes, likes);
        return likes;
    }
}

export default productService;