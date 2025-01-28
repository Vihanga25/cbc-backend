import express from 'express';
import {getProducts, createProduct, deleteProduct, editProduct} from '../controllers/productController.js';


const productRouter = express.Router();

productRouter.get('/',getProducts);
productRouter.post('/',createProduct);
productRouter.delete('/',deleteProduct);
productRouter.put('/',editProduct);

export default productRouter;
