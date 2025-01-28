import Product from "../models/product.js";

export function getProduct(req,res){

  Product.find().then(
    
    (productList)=>{
      res.json({
        list : productList
      })

    }
  ).catch(
    (err)=>{
      res.json({
        message : "Error "
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

export function editProduct(req,res){
  Product.update  ({name: req.body.name}, {price: req.body.price}).then(
    ()=>{
      res.json(
        {
          message : "Product updated successfully"
        }
      )
    }
  )
}