import Product from "../models/Product";
import querystring from "querystring";


const productService = {
    create(productData) {
        return Product.create({ productData });
    },
    
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
    }
}

export default productService;