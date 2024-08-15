const Book=require("../Models/BookModel");

const cloudinary = require('cloudinary').v2;



const getBooks =  async(request, response)=> {
  
  console.log("Frontend API");
  const result= await Book.find();
  console.log(result);
  response.send(result);

};


async function getBooksBySellerId(request, response) {

  try {
    const sellerId = request.params.id;

    console.log("Frontend API - Get Books by Seller ID");
    console.log("seller id", sellerId);
    const result = await Book.find({ sellerId });
    console.log(result);

    response.send(result);
  } catch (error) {
    console.error("Error fetching books by seller ID:", error);
    response.status(500).send("Internal Server Error");
  }
}


const getBookById =  async (request, response) => {

  const id = request.params.id;
  console.log(id);
  try {
      const result = await Book.findById(id);
      console.log("Book Found");
      if (!result) {
          return response.status(404).send("Book not found");
      }
      response.send(result);
  } catch (error) {
      console.error(error);
      response.status(500).send("Internal Server Error");
  }
};


const addBooks = async(request, response)=> {
  console.log("Backend API");
  const product= new Book(request.body);
  const result= product.save();
  console.log(result.data);
  response.send(result);
}

const getAllBooks =  async(request, response)=> {

  console.log("All Books Removed");
  
  console.log("Frontend API");
  const result= await Book.find();
  // console.log(result);
  response.send(result);

};

const getBook = async (request, response) => {
  const id = request.params.id;
  console.log("id in backend",id);
  try {
      const result = await Book.findById(id);
      if (!result) {
          return response.status(404).send("Book not found");
      }
      // Send book data with a message
      response.json({
          message: "Book fetched successfully",
          book: result
      });
  } catch (error) {
      console.error(error);
      response.status(500).send("Internal Server Error");
  }
};

const deleteBooks = async (request, response) => {
  const id = request.params.id;
  console.log(id)
  try {
      const result = await Book.findByIdAndDelete(id);
      if (!result) {
          return response.status(404).send("Book not found");
      }
      response.send("Book deleted successfully");
  } catch (error) {
      console.error(error);
      response.status(500).send("Internal Server Error");
  }
};

const updateBookDetails = async (request, response) => {
  const id = request.params.id;
  const newData = request.body;
  try {
     
      const result = await Book.findByIdAndUpdate(id, newData, { new: true });
      if (!result) {
          return response.status(404).send("Book not found");
      }
      response.send(result);
  } catch (error) {
      console.error(error);
      response.status(500).send("Internal Server Error");
  }
}


//Admin Section Controllers

const approval= async (req, res) => {
  const bookId = req.params.bookId;
  const { isApproved } = req.body;

  try {
    // Find the book by ID and update the isApproved field
    const updatedBook = await Book.findByIdAndUpdate(bookId, { isApproved:true }, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Return the updated book object
    res.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Server error' });
  }
}



const rejection= async (req, res) => {
  const bookId = req.params.bookId;
  const { isRejected } = req.body;

  try {
    // Find the book by ID and update the isApproved field
    const updatedBook = await Book.findByIdAndUpdate(bookId, { isRejected:true }, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Return the updated book object
    res.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Server error' });
  }
}


const getApprovedBooks =  async (req, res) => {
  try {
    const approvedBooks = await Book.find({ isApproved: true});
    res.status(200).json(approvedBooks);
  } catch (error) {
    console.error('Error fetching approved books:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getPendingBooks=  async (req, res) => {
  try {
    const pendingBooks = await Book.find({ isApproved: false, isRejected: false});
    res.status(200).json(pendingBooks);
  } catch (error) {
    console.error('Error fetching pending books:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const getBookDetailsById= async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.json(book);
  } catch (error) {
    res.status(500).send('Server error');
  }
}


  
const getBooksforAdmin = async (req, res, next) => {
    try {
      // Query all documents from the book collection
      const books = await Book.find();
  
      // If there are no books found, return a 404 response
      if (books.length === 0) {
        return res.status(404).json({ message: "No books found" });
      }
  
      // Return the retrieved books in the response
      return res.status(200).json({ books });
    } catch (error) {
      // Handle errors
      console.error('Error fetching books:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };


  const booksByGenre= async (req, res) => {
    
    try {
      const genreCounts = await Book.aggregate([
        {
          $group: {
            _id:  { $toLower: "$genre" },
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            genre:{ $toLower: "$_id" },
            count: 1
          }
        }
      ]);
  
      res.json(genreCounts);
    } catch (error) {
      res.status(400).json('Error: ' + error);
    }
  };


  const booksCount= async (req, res, next) => {
    try {
      // Use the countDocuments() method to get the total count
      const totalCount = await Book.countDocuments();
  
      // Return the total count in the response
      return res.status(200).json({ totalCount });
    } catch (error) {
      // Handle errors
      console.error('Error fetching total count:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  //Buyer Section Controllers 


  const updateBookQuantities=  async (req, res) => {
    const booksToUpdate = req.body;
  
    try {
      // Update quantities for each book
      for (const book of booksToUpdate) {
        await Book.updateOne({ _id: book.bookId }, { $inc: { quantity: -book.quantity } });
      }
  
      res.status(200).json({ message: 'Book quantities updated successfully' });
    } catch (error) {
      console.error('Error updating book quantities:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  const updateFavStatus=  async (req, res) => {
    const { bookId } = req.params;
    const userId = req.body.userId; // Assuming the user's ID is sent in the request body
  
    try {
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).send('Book not found');
      }
      // Check if user is already in the favOf array
      if (!book.favOf.includes(userId)) {
        book.favOf.push(userId);
        await book.save();
        res.status(200).send('User added to favorites successfully');
      } else {
        res.status(200).send('User already added to favorites');
      }
    } catch (error) {
      res.status(500).send('Server error');
    }
  }

  const removeFav= async (req, res) => {
    const { bookId } = req.params;
    const userId = req.body.userId; // Assuming the user's ID is sent in the request body
  
    try {
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).send('Book not found');
      }
  
      // Check if user is already in the favOf array
      const userIndex = book.favOf.indexOf(userId);
      if (userIndex === -1) {
        // User not found in favOf array
        return res.status(404).send('User not found in favorites');
      }
  
      // Remove the user from favOf array
      book.favOf = book.favOf.filter(id => id !== userId);
  
      // Save the updated book
      await book.save();
      
      res.status(200).send('User removed from favorites successfully');
    } catch (error) {
      console.error('Error removing user from favorites:', error);
      res.status(500).send('Server error');
    }
  }

  const checkisFav=async (req, res) => {
    const { bookId, userId } = req.params;
  
    try {
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json(false); // Book not found, return false
      }
  
      // Directly return true or false based on the check
      const isFav = book.favOf.includes(userId);
      res.status(200).json(isFav);
    } catch (error) {
      console.error(error);
      res.status(500).json(false); // On error, return false
    }
  }

  module.exports = { getAllBooks,getBooksBySellerId,getBooks,getBooksforAdmin, getBookById,approval,rejection , deleteBooks, updateBookDetails , addBooks,getBook, getApprovedBooks, getBookDetailsById, getPendingBooks, updateBookQuantities, booksByGenre, booksCount, updateFavStatus, checkisFav, removeFav};
