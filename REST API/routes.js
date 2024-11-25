import { Router } from "express";
import productController from "./controllers/productsController.js";


const routes = Router();

routes.use('/products', productController)

export default routes;