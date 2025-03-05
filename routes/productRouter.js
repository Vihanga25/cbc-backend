import express from 'express';
import { createProduct, getProducts } from '../controllers/productControllers.js';

const productRouter = express.Router();

productRouter.post("/",createProduct)
productRouter.get("/",getProducts)
productRouter.delete("/:productId",deleteProduct)


export default productRouter;