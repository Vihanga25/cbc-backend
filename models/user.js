import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    email :{
        type : String,
        required : true, //email cann't save in empty
        unique : true, //email must unique, 1 mail have 1 domain
    },
    firstName :{
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    isBlocked :{
        type : Boolean,
        default : false,
    },
    type :{
        type : String,
        default : "customer"
    },
    profilePictur: {
        type :String,
        default : "https://www.freepik.com/free-vector/blue-circle-with-white-user_145857007.htm#fromView=keyword&page=1&position=30&uuid=0a984adc-95a8-4e89-a4b9-a10d33dfbb2a&query=User"
    }
})

const User = mongoose.model("user",userSchema)

export default User;