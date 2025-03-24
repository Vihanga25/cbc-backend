import Order from "../models/order.js";
import Product from "../models/product.js";
import { isCustomer } from "./userController.js";

export async function createOrder(req, res) {
    try {
        
        if (!isCustomer(req))
             {
            return res.status(403).json({
                message: "Please login as customer to create orders"
            })
          }

        const latestOrder = await Order.find().sort({ date: -1 }).limit(1) 

        let orderId

        if (latestOrder.length == 0) {
            orderId = "CBC000"
        } else {
            const currentOrderId = latestOrder[0].orderId
            const numberString = currentOrderId.replace("CBC", "")
            const number = parseInt(numberString)
            const newNumber = (number + 1).toString();
           
            orderId = "CBC" + newNumber
        }

        const newOrderData = req.body;
        
        const newProductArray = []; 

        for (let i = 0; i < newOrderData.orderedItems.length; i++) {
            const product = await Product.findOne({ 
                productId: newOrderData.orderedItems[i].productId
            });

            if (!product) 
                { 
                res.status(404).json({
                    message: `Product with the id ${newOrderData.orderedItems[i].productId} is not found` 
                });
                return;
            }

            if (product.stock < newOrderData.orderedItems[i].quantity) 
                { 
                res.status(400).json({
                    message: `Insufficient stock for product: ${product.productName}. Only ${product.stock} items are available.`
                });
                return;
            }

            product.stock -= newOrderData.orderedItems[i].quantity; 
            await product.save(); 

            newProductArray[i] = { 
                name: product.productName,
                price: product.price,
                quantity: newOrderData.orderedItems[i].quantity,
                image: product.images[0]
            };
        }

        newOrderData.orderedItems = newProductArray;

        newOrderData.orderId = orderId 
        newOrderData.email = req.user.email

        const order = new Order(newOrderData) 

        

        res.status(200).json({
            message: "Order created successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

    export async function getOrders(req, res) {
        try {
            const orders = await Order.find({ email: req.user.email }) 
            res.status(200).json(orders)
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    export async function getQuote(req, res) {
        try {
        const newOrderData = req.body;
        const newProductArray = [];
        let total = 0;
        let labeledTotal = 0;
    
        for (const item of newOrderData.orderedItems) {
            const product = await Product.findOne({ productId: item.productId });
            if (!product) {
            return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
            }
    
            labeledTotal += product.price * item.qty;
            total += product.lastPrice * item.qty;
    
            newProductArray.push({
            name: product.productName,
            price: product.lastPrice,
            labeledPrice: product.price,
            quantity: item.qty,
            image: product.images[0],
            });
        }
        return res.json({ orderedItems: newProductArray, total, labeledTotal });
        } catch (error) {
        console.error("Error in getQuote:", error);
        return res.status(500).json({ message: error.message });
        }
    }  