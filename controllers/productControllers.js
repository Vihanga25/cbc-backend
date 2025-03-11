import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req, res) {
    console.log("User data in request:", req.user);

    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Please log in as an administrator to create a product." });
    }

    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.json({ message: "Product created", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getProducts(req, res) {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getProductById(req, res) {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function deleteProduct(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Please log in as an administrator to delete a product." });
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function updateProduct(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Please log in as an administrator to update a product." });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
