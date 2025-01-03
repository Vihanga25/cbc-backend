import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    id   : Number,
    name : String,
    email: String, 
    password : String,
})

const User = mongoose.model("user",userSchema)

export default User