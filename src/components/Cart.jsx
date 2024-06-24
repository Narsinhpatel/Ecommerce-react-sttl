import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // Use useNavigate for navigation
const dispatch=useDispatch()
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const handleCartChange = (e, itemIndex) => {
    const newCartItems = [...cartItems];
    const quantity = parseInt(e.target.value, 10); // Parse quantity as integer

    // Handle invalid quantity (e.g., negative or non-numeric)
    if (isNaN(quantity) || quantity < 0) {
      return; // Prevent invalid updates
    }

    newCartItems[itemIndex].quantity = quantity;
    setCartItems(newCartItems); 
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };

  const handleDeleteCartItem = (itemIndex) => {
    const newCartItems = cartItems.filter((_, index) => index !== itemIndex);
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    toast.info("Product Removed From Cart");
  };

  const totalAmount = cartItems.reduce((amount, item) => item.price * item.quantity + amount, 0);
  const totalItems = cartItems.reduce((total, item) => item.quantity + total, 0);

  const handleCheckout = () => {
    const userId = user?.user?.data?.user?._id;

    if (userId) {
      // Dispatch addToCart action to store cartItems in the database
      cartItems.forEach(item => {
        dispatch(addToCart(userId, item.product, item.price));
      
      });
   
    
      setCartItems([]); 
      navigate('/checkout'); // Navigate to checkout or success page
    } else {
      toast.warning("Please Login ToPlace Order");
      navigate('/login'); // Redirect to login page if user is not logged in
    }
  };

  // Display cart contents if there are items
  if (cartItems.length === 0) {
    return (
      <div className="mx-auto mt-12 mr-12 ml-12 mb-8 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        Your cart is empty!
        <Link to="/" className="text-indigo-600 hover:text-indigo-900">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-12 mr-12 ml-12 mb-8 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2>Your Cart</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left px-4 py-2">Product</th>
            <th className="text-left px-4 py-2">Image</th>
            <th className="text-right px-4 py-2">Price</th>
            <th className="text-right px-4 py-2">Quantity</th>
            <th className="text-right px-4 py-2">Subtotal</th>
            <th className="text-right px-4 py-2" /> {/* Remove button column */}
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={item.id} className="border-b border-gray-200 shadow-md">
              <td className="text-left px-4 py-2">{item.product.name}</td>
              <td className="text-left px-4 py-2">
                <img src={item.product.image} alt={item.product.name} className="h-12 w-12 object-contain" />
              </td>
              <td className="text-right px-4 py-2">{item.price.toFixed(2)}</td>
              <td className="text-right px-4 py-2">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleCartChange(e, index)}
                  className="border px-2 py-1"
                />
              </td>
              <td className="text-right px-4 py-2">
                {(item.price * item.quantity).toFixed(2)}
              </td>
              <td className="text-right px-4 py-2">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteCartItem(index)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <p className="text-right">
          Total Items: {totalItems}
        </p>
        <p className="text-right ml-4">
          Total Amount: {totalAmount.toFixed(2)}
        </p>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleCheckout}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
