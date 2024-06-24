import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../actions/productAction';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Navbar from './Navbar';
import { addToCart, addToCartLocal } from '../actions/cartActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.products);
  const user = useSelector((state) => state.auth);
  const cart=useSelector((state)=>state.cart.items)

 

  useEffect(() => {
    dispatch(fetchProducts());
   
  }, [dispatch]);

  const handleAddToCart = (product, price) => {
  
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItemIndex = cart.findIndex(item => item.product._id === product._id);

      if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += 1;
      } else {
        cart.push({ product, price, quantity: 1 });
      }
      dispatch(addToCartLocal(product));
      localStorage.setItem('cart', JSON.stringify(cart));
     
      toast.success('Product Added into Cart')
    
  };

  if (!productState.products.data) {
    return <Loader />;
  }

  if (productState.error) {
    return <p>{productState.error}</p>;
  }

  return (
    <>
   
      <div className="lg:col-span-3">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {productState.products.data.map((product) => (
                <div key={product._id} className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                  <img className="object-cover" src={product.image} alt={product.name} />
                  <div className="bg-white p-6 rounded shadow flex flex-col gap-2">
                    <h4 className="text-xl font-medium text-gray-900">{product.name}</h4>
                    <h4 className="text-lg font-medium text-gray-700">${product.price}</h4>
                    <div className="flex justify-between items-center gap-2">
                      <Link to={`/productdetail/${product._id}`} className="inline-flex items-center px-4 py-2 bg-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        View Details
                      </Link>
                      <button onClick={() => handleAddToCart(product, product.price)} className="inline-flex items-center px-4 py-2 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
