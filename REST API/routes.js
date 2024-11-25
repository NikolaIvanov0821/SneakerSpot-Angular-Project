import { Router } from "express";
import productController from "./controllers/productsController";


const routes = Router();

routes.use('/products', productController)

export default routes;