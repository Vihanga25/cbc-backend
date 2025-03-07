import Product from "../models/product.js";
import { isAdmin } from "./userController.js";


export function createProduct (req,res){

    console.log("User data in request:", req.user);

 if(!isAdmin(req)){
        res.json({
            message: "Please log in as an administrator to create a product."

        })
        return
     }    

        const newProductData = req.body

        const product = new Product (newProductData)

        product
        .save()
        .then(()=>{
            res.json({
                message: "Product created"
            });

        })
        .catch((error)=>{
            res.status(403).json({
                message: error
            });
        });
    }

export function getProducts(req,res){
    Product
    .find({})
    .then((products)=>{
        res.json(products)
    })
}

export function deleteProduct(req,res){
    if(!isAdmin(req)){
        res.json({
            message: "Please log in as an administrator to delete a product."
        })
        return
    }

    const productId = req.params.productId

    Product
    .deleteOne({
        productId: productId})
    .then(
        ()=>{
        res.json({
            message: "Product deleted"
        })
    })
    .catch((error)=>{
        res.status(403).json({
            message: error
        })
    })
}

export function updateProduct (req,res){

    if(!isAdmin(req)){
        res.status(403).json({
            message: "Please log in as an administrator to update a product."
        })
        return
    }

    const productId = req.params.productId
    const newProductData = req.body

    Product.updateOne(
        {productId : productId},
        newProductData
    )
    .then (()=>{
        res.json({
            message: "Product Updated"
        })
    })
    .catch((error)=>{
        res.status(403).json({
            message: error
        })
    })

}

export async function getProductById(req,res){

    try{
        const productId = req.params.productId
        const product = await Product.findOne({productId: productId})
        
        res.json(product)

    } catch(e){
        res.status(500).json({
            e
        })
    }
}