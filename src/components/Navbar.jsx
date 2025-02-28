import React, { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, addToCartLocal } from '../actions/cartActions'; // Import addToCartLocal action
import { logoutUser } from '../actions/authActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const user = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
console.log(cartCount)
  useEffect(() => { 
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(localCart.length);

    // Dispatch action to save local cart items into Redux state
    if (localCart.length > 0) {
      dispatch(addToCartLocal(localCart));
    }
  }, [dispatch, user]);

  useEffect(() => {
    // Update cartCount based on cartItems length
    setCartCount(cartItems.length);
  }, [cartItems]);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.info("Logout successfull");
    navigate('/login');
  };

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to="/">
                        <img
                          className="h-8 w-8"
                          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                          alt="Your Company"
                        />
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        <Link
                          to="/"
                          className={classNames(
                            'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                        >
                          Home
                        </Link>
                        <Link
                          to="/login"
                          className={classNames(
                            'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          className={classNames(
                            'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                        >
                          Register
                        </Link>
                        <button
                          onClick={handleLogout}
                          className={classNames(
                            'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <Link to="/cart">
                        <button
                          type="button"
                          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="sr-only">View cart</span>
                          <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                          {/* {cartCount > 0 && (
                            <span className="absolute bottom-4 left-4 inline-flex items-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                              {cartCount}
                            </span>
                          )} */}
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  <Disclosure.Button
                    as={Link}
                    to="/"
                    className={classNames(
                      'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                  >
                    Home
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/login"
                    className={classNames(
                      'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                  >
                    Login
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/register"
                    className={classNames(
                      'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                  >
                    Register
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="button"
                    onClick={handleLogout}
                    className={classNames(
                      'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                  >
                    Logout
                  </Disclosure.Button>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
};

export default Navbar;
