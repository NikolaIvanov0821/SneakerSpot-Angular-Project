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
        const product = await Product.findById(productId)
        console.log(product);
        const likes = product.likes
        console.log(likes);
        return likes
    },

    async likeProduct(productId, userId) {
        const product = await Product.findById(productId); 
        
        if (!product.likes.includes(userId)) {
            product.likes.push(userId); 
            await product.save(); 
        }

        return product.likes; 
    }
}

export default productService;