import express from 'express';
import {getProduct, createProduct, deleteProduct, editProduct} from '../controllers/productController.js';


const productRouter = express.Router();

productRouter.get('/',getProduct);
productRouter.post('/',createProduct);
productRouter.delete('/',deleteProduct);
productRouter.put('/',editProduct);

export default productRouter;
