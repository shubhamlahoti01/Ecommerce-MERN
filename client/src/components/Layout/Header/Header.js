import React, { useEffect, useState } from 'react';
import { HiShoppingCart } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, logout } from '../../../actions/userAction';
import { toast } from 'react-hot-toast';
import Loader from '../Loader';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const [keyword, setKeyword] = useState('');
  const searchSubmitHandler = () => {
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate('/products');
    }
    setKeyword('');
  };
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='flex justify-between items-center border-4 w-full px-2 py-1 text-gray border-b-gray-400 bg-gray-100'>
          {/* Logo */}
          <Link
            to='/'
            className='sm:hidden flex justify-center items-center w-1/5 font-medium text-4xl text-gray-700'
          >
            STORE
          </Link>
          {/* Account menu */}
          <div className='hidden sm:block flex items-center w-1/5 justify-around sm:w-0.5/4 relative'>
            <img
              className='inline-block h-12 w-12 rounded-full ring-2 ring-white'
              src={`${'/Profile.png'}`}
              alt='{user.handle}'
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            />
            {/* -----Drop down---- */}
            <div
              onMouseLeave={() => setIsOpenMenu(false)}
              className={`${
                isOpenMenu ? 'block' : 'hidden'
              } absolute border-2 border-black bg-white`}
            >
              <ul>
                <li>Login/Logout</li>
                <li>Dashboard</li>
              </ul>
            </div>
          </div>
          {/* search */}
          <div className='flex justify-center w-3/5 sm:w-2.5/4'>
            <div className='w-4/5'>
              <div className='relative flex w-full flex-wrap items-stretch'>
                <input
                  type='search'
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder='Search a Product...'
                  className='relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-400 bsg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-700 dark:text-neutral-500 dark:placeholder:text-neutral-300 dark:focus:border-primary'
                  aria-label='Search'
                  aria-describedby='button-addon3'
                />

                {/* <!--Search button--> */}
                <button
                  className='relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 sm:px-2 sm:py-0.5 sm:font-normal'
                  type='button'
                  id='button-addon3'
                  data-te-ripple-init
                  onClick={searchSubmitHandler}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          {/* cart and account menu */}
          <div className='flex items-center w-1/5 justify-around sm:w-0.5/4'>
            {/* cart */}
            <Link to='/cart' className='relative'>
              <span className='absolute text-white text-sm bg-red-700 rounded-lg px-1 right-0.5 -top-1.5 font-semibold'>
                {cartItems ? cartItems.length : 0}
              </span>
              <HiShoppingCart size={38} color='grey' />
            </Link>
            {/* Account menu */}
            <div className='sm:hidden relative'>
              <img
                className='inline-block h-12 w-12 rounded-full ring-2 ring-white'
                src={`${user?.avatar?.url || '/Profile.png'}`}
                alt='{user.handle}'
                onClick={() => setIsOpenMenu(!isOpenMenu)}
              />
              {/* -----Drop down---- */}
              <div
                onMouseLeave={() => setIsOpenMenu(false)}
                className={`${
                  isOpenMenu ? 'block' : 'hidden'
                } absolute border-2 border-black bg-white -left-full`}
              >
                <ul>
                  {isAuthenticated ? (
                    <>
                      {user?.role === 'admin' && (
                        <li>
                          <Link to='/admin/dashboard'>Dashboard</Link>
                        </li>
                      )}
                      <li>
                        <Link to='/profile'>Profile</Link>
                      </li>
                      <li className='border-blue-800 p-0.5 my-1'>
                        <button
                          onClick={() => {
                            dispatch(logout());
                            toast.success('Logout Successfull');
                          }}
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className='border-blue-800 p-0.5 my-1'>
                        <Link to='/login'>Login</Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* -------------- */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
