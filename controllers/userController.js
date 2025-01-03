import User from "../models/user"
import user from "../models/user"

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
  
  const user = new User(req.body)
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


