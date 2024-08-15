
const order = require('../Models/OrdersModel');

 const saveOrderToDatabase = async (request, response) => {
    try {
        
      // Create a new Order instance with the provided data
      const newOrder = new order(request.body);
      console.log(newOrder);
  
      // Save the order to the database
      const savedOrder = await newOrder.save();
  
      console.log('Order saved successfully:', savedOrder);
      response.send("Order Added Successfully");
      return savedOrder; // Return the saved order document
    } catch (error) {
      console.error('Error saving order:', error);
      throw error; // Throw error if saving fails
    }
  };

  const getOrders= async (req, res) => {
    try {
      const orders = await order.find();
  
      if (!orders) {
        return res.status(404).json({ message: 'No orders found' });
      }
  
      res.json(orders);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  const getOrdersBySellerId = async (req, res) => {
    const  sellerId  = req.params.id;
    console.log(sellerId);
  
    try {
      const orders = await order.find({ 'orderItems.sellerId': sellerId });
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for this seller' });
      }
      console.log("in component",orders);
      res.json(orders);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  }
  


  const getBuyerOrders= async (req, res) => {
    const {userId}= req.params
    try {
      const orders = await order.find({"userId": userId });
      res.json(orders);
    } catch (error) {
      console.error('Error fetching orders by userId:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  const updateOrderStatus = async (req, res) => {
    const { orderId, bookId } = req.params;
    console.log(orderId);
    console.log(bookId);
    const  {orderStatus}  = req.body;
    console.log(orderStatus);

    try {
        const updatedOrder = await order.findOneAndUpdate(
            { _id: orderId, 'orderItems.bookId': bookId },
            { $set: { 'orderItems.$.orderStatus': orderStatus } },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const ordersCount= async (req, res, next) => {
  try {
    // Use the countDocuments() method to get the total count
    const totalCount = await order.countDocuments();

    // Return the total count in the response
    return res.status(200).json({ totalCount });
  } catch (error) {
    // Handle errors
    console.error('Error fetching total count:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const ordersByStatus= async (req, res) => {
    
  try {
    const orderCounts = await order.aggregate([
      {
        $unwind: "$orderItems" // Unwind the orderItems array
      },
      {
        $group: {
          _id:  { $toLower: "$orderItems.orderStatus" },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          status:{ $toLower: "$_id" },
          count: 1
        }
      }
    ]);

    res.json(orderCounts);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};


  module.exports = {saveOrderToDatabase, getOrders, getBuyerOrders,getOrdersBySellerId,updateOrderStatus, ordersCount, ordersByStatus};