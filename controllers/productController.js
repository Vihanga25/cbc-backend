
import Product from "../models/product.js";

export function getProducts(req,res){

  Product.find().then(
    
    (productList)=>{

      res.json({
        list : productList
      })

    }
  )

}

export function createProduct(req,res){
  
  const product = new Product(req.body)
  product.save().then(()=>{
    res.json({
      message: "Product was created"
    })
  }).catch(()=>{
    res.json({
      message: "Product not created"
    })
  })

}

export function deleteProduct(req,res){
  Product.deleteOne({name : req.body.name}).then(
    ()=>{
      res.json(
        {
          message : "Product deleted successfully"
        }
      )
    }
  )
}