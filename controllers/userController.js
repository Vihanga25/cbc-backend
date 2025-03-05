import User from "../models/user.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()


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

  if(newuserData.type == "admin"){

    if (req.user == null){
      res.json ({
        message: "Please loging as administrator to create an admin account"
      })

      return 
    }

    if (req.user.type != "admin"){
      res.json({
        message: "Please loging as administrator to create an admin account"
      })
      return
    }
  }

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
        profilePictur : user.profilePictur
       }, 
       process.env.JWT_SECRET,
      
      );

       res.json({
          message : "User logged in successfully",
          token : token,
          user :{
            firstName : user.firstName,
            lastName : user.lastName,
            type : user.type,
            profilePictur : user.profilePictur,
            email : user.email
          }
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

export function isAdmin(req){
  if(req.user == null){
    return false
  }

  if(req.user.type.toLowerCase() != "admin"){
    return false
  }

  return true
}

export function isCustomer(req){
  if(req.user == null){
    return false
  }

  if(req.user.type.toLowerCase() != "Customer"){
    return false
  }

  return true
}



//admin = john.admintest2@example.com - Admin123
// User =  john.newuserdoe@example.com - User123