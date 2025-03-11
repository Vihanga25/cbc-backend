import express from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/productControllers.js';

const productRouter = express.Router();

productRouter.post("/", createProduct);  // Create a product
productRouter.get("/", getProducts);     // Get all products
productRouter.get("/:productId", getProductById); // Get a single product by ID
productRouter.delete("/:productId", deleteProduct); // Delete a product by ID
productRouter.put("/:productId", updateProduct);    // Update a product by ID

export default productRouter;
