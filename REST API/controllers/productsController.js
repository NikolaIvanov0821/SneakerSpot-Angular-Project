import { Router } from "express";
import productService from "../services/productService.js";

const productController = Router();

productController.get('/', async (req, res) => {
    const query = req.query;

    const products = await productService.getAll(query);

    res.json(products);
})

productController.post('/', async (req, res) => {
    //const userId = req.user._id;
    const productData = req.body;

    try {
        const product = await productService.create(productData);
        res.json(product)
    } catch (error) {
        res.status(400).json({ message: getErrorMessage(err) })
    }
});

productController.get('/:productId', async (req, res) => {
    const product = await productService.getOne(req.params.productId);

    res.json(product);
});

export default productController;