import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter  from './routes/userRouter.js';
import jwt from "jsonwebtoken";
import productRouter from './routes/productRouter.js';
import dotenv from "dotenv";
import orderRouter from './routes/orderRouter.js';

dotenv.config()

const app = express();

const mongoUrl = process.env.MONGO_DB_URI;


mongoose.connect(mongoUrl,{})

const connection = mongoose.connection;

connection.once("open",()=>{
  console.log("Database connected");
})


app.use(bodyParser.json())

app.use((req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Fix: Use JWT_SECRET
      req.user = decoded;
    } catch (error) {
      console.log("Invalid token:", error.message);
    }
  }

  next();
});

app.use("/api/users",userRouter)
app.use("/api/products",productRouter)
app.use ("/api/orders",orderRouter)


app.listen(
  5000,
  ()=>{
    console.log('Server is running on port 5000');
  }
)
