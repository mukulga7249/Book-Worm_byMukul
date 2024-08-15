const Cart = require('../Models/CartModel');


const addToCart = async(request, response)=> {
    console.log("Backend API");
    const cart= new Cart(request.body);
    const result= cart.save();
    console.log(result.data);
    response.send(result);
  }

  

  const getCartBookDetailsById = async (req, res) => {
    const { user_id } = req.params.id;
    try {
        const cartItems = await Cart.find({ user_id: user_id });
        res.json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

  const updateQuantity = async(request, response)=> {
    console.log("Into Update Quantity");
    const { id } = request.params; 
    console.log(id);
    
    const { quantity } = request.body;
    console.log("========================",quantity);

    try {
      const result = await Cart.updateOne(
          { _id: id }, 
          { $set: { orderquantity: parseInt(quantity) } } 
      );
      
      if (result.nModified === 0) {
          return response.status(404).json({ error: 'Cart item not found' });
      }

      response.json({ message: 'Quantity updated successfully' });
  } catch (error) {
      console.error('Error updating quantity:', error);
      response.status(500).json({ error: 'Internal server error' });
  }
  }

const getCart =  async (req, res) => {
    const { user_id } = req.params;
    console.log("user id in get cart",user_id);
    try {
        console.log(user_id);
        const cartItems = await Cart.find({ "user_id": user_id });
        console.log("In get Cart");
        console.log(cartItems);
        res.json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getCartBook =  async (req, res) => {
    // const { user_id } = req.params;
    try {
        // console.log(user_id);
        const cartItems = await Cart.find();
        console.log("In get All Cart");
        console.log(cartItems);
        res.json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const deleteCartBooks = async (request, response) => {
    const id = request.params.id;
    console.log(id)
    try {
        const result = await Cart.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).send("Book not found");
        }
        response.send("Book deleted successfully");
    } catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
  };

  const deleteCartBooksByUserId = async (request, response) => {
    const  user_id  = request.params.id;

    console.log("user ide for delete cart ",user_id)
    try {
        const result = await Cart.deleteMany({ user_id: user_id });
        response.send(`${result.deletedCount} items deleted successfully`);
    } catch (error) {
        console.error(error);
        response.status(500).send("Internal Server Error");
    }
};

module.exports = {getCart, deleteCartBooks,addToCart,getCartBook,updateQuantity,getCartBookDetailsById, deleteCartBooksByUserId};