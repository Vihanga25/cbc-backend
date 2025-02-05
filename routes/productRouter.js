import express from 'express';
import {getProduct, createProduct, deleteProduct, editProduct, getProductByName} from '../controllers/productController.js';


const productRouter = express.Router();

productRouter.get('/',getProduct);
productRouter.get("/:name" ,getProductByName);
productRouter.post('/',createProduct);
productRouter.delete('/:name',deleteProduct);
productRouter.put('/',editProduct);

export default productRouter;
