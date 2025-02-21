import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    orderId : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true
    },
    orderedItems : [
        {
            name : {
                type : String,
                required : true
            },
            price : {
                type : Number,
                required : true
            },
            quantity : {
                type : Number,
                required : true
            },
            image : {
                type : String,
                required : true
            }
        }
    ],
    date : {
        type : Date,
        default : Date.now
    },
    paymentId : {
        type : String,
        required : true
    },
    status :{
        type : String,
        default : "preparing"
    },
    note : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phone :{
        ype : String,
        required : true
    }

})

const Oredr = mongoose.model("orders", orderSchema);