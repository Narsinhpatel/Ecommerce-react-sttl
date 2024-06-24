import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../actions/productAction';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addToCart } from '../actions/cartActions';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { product, loading, error } = useSelector((state) => state.products);
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    const userId = user?.user?.data?.user?._id; // Get the user ID from the auth state

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.product._id === product.data._id);

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ product: product.data, price: product.data.price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success("Product Added into Cart");
  };

  if (loading) {
    return <p className="text-center mt-8">Loading product details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-8">Error: {error.message}</p>;
  }

  if (!product) {
    
    return <p className="text-center mt-8">Product not found</p>;
  }

  return (
    <>
     
      <div className="container mx-auto px-4 my-8 flex justify-center">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 w-1/2">
          <div className="flex flex-wrap justify-center md:flex-row gap-4 p-6">
            <img
              src={product.data.image}
              alt={product.data.name}
              className="w-full h-auto md:w-1/3 rounded-md object-cover border border-gray-300"
            />
            <div className="md:w-2/3 flex flex-col justify-center text-center p-4">
              <h2 className="text-3xl font-semibold mb-4">{product.data.name}</h2>
              <p className="text-gray-700 mb-4">{product.data.description}</p>
              <p className="text-lg font-semibold mb-4">Price: ${product.data.price}</p>
              <div className="flex items-center justify-center">
                <button
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
