import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter  from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';

const app = express();

const mongoUrl = "mongodb+srv://admin:admin123@cluster0.aiywr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl,{})

const connection = mongoose.connection;

connection.once("open",()=>{
  console.log("Database connected");
})


app.use(bodyParser.json())

app.use("/api/users",userRouter)
app.use("/api/products",productRouter)

app.listen(
  5000,
  ()=>{
    console.log('Server is running on port 5000');
  }
)