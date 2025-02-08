import User from "../models/user.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export function getUser(req,res){

  User.find().then(
    
    (userList)=>{

      res.json({
        list : userList
      })

    }
  )

}

export function createUser(req,res){
  
  const newuserData = req.body
  newuserData.password = bcrypt.hashSync(newuserData.password, 10)


  const user = new User(newuserData)
  user.save().then(()=>{
    res.json({
      message: "User is created Sucessfully"
    })
  }).catch(()=>{
    res.json({
      message: "User not created"
    })
  })

}

export function deleteUser(req,res){
  User.deleteOne({name : req.body.name}).then(
    ()=>{
      res.json(
        {
          message : "User deleted successfully"
        }
      )
    }
  )
}


export function loginUser (req,res){
   
  User.find({email :req.body.email}

  ).then((users)=>{

   if(users.length == 0) {
      res.json({
        message : "User not found"
      })

   }else{
    const user = users[0]
    const isPasswordCorrect = bcrypt.compareSync
      (req.body.password,user.password)

      if(isPasswordCorrect){
       const token = jwt.sign({
        email : user.email,
        firstName : user.firstName,
        lastName : user.lastName,
        isBlocked : user.isBlocked,
        type : user.type,
        profilePicture : user.profilePicture
       }, "cbc-secret-key-9806")

       res.json({
          message : "User logged in successfully",
          token : token
       })
        
      }else{
        res.json({
          message : "User not logged & Password is incorrect"
        })
      }
   }
    
  }
 )

}

