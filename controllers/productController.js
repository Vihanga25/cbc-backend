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

  console.log(req.user)

  if(req.user == null){
    res.json({
      message : "You are not logged in"
    })
    return   
  }
  
  if (req.user.type != "admin"){
    res.json({
      message: "You are not an Admin"
    })
    return
  }
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
  Product.deleteOne({name : req.params.name}).then(
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

export function getProductByName(res,req){
  const name = req.params.name;

  Product.find({name : name}) .then(
    (productList)=>{
      res.json({
        list : productList

      })
    }
  ).catch(
    ()=>{
      res.json({
        message : "Error"
      })
    }
  )
}