import express from 'express';
import { createProduct, deleteProduct, getProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/',getProduct);
productRouter.post('/',createProduct);
productRouter.delete("/",deleteProduct);

export default productRouter;