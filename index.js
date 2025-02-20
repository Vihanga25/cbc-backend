import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter  from './routes/userRouter.js';
import jwt from "jsonwebtoken";

const app = express();

const mongoUrl = "mongodb+srv://admin:admin123@cluster0.aiywr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl,{})

const connection = mongoose.connection;

connection.once("open",()=>{
  console.log("Database connected");
})


app.use(bodyParser.json())

app.use((req,res,next) =>{

  const token = req.header("Authorization")?.replace("Bearer ","")
  console.log(token)

  if (token != null){
    jwt.verify(token,"cbc-secret-key-9806", (error,decoded)=>{
      if (!error){
      
        req.user = decoded
      }
    })
  }

  next ()

}

)

app.use("/api/users",userRouter)


app.listen(
  5000,
  ()=>{
    console.log('Server is running on port 5000');
  }
)