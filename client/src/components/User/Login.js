import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, login } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import Loader from '../Layout/Loader';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate('/');
      toast.success('Login Successfully');
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='min-h-screen flex w-full justify-center items-center sm:flex-col md:flex-col'>
          <div className='w-1/2 sm:w-2/3 md:w-2/3 border-2 border-white mx-4'>
            <img
              src='https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=740&t=st=1681664206~exp=1681664806~hmac=67e4fb0eefeb4ca2382993e12303743cd0a99285594f516eb04e70cc8b4b3d0f'
              alt='login-image'
              className=''
            />
          </div>
          <div className='w-1/2 sm:w-2/3 md:w-2/3 m-4 flex flex-col'>
            <h1 className='w-full font-bold text-5xl pl-5 pb-4 text-black'>
              Login
            </h1>
            <form className='flex flex-col' onSubmit={loginSubmit}>
              <input
                type='email'
                placeholder='Email'
                name='email'
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className='mt-1 block w-3/5 sm:w-full md:w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-red-500 focus:invalid:ring-red-500
    '
              />
              <input
                type='password'
                placeholder='Password'
                name='password'
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className='mt-1 block w-3/5 sm:w-full md:w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-red-500 focus:invalid:ring-red-500
    '
              />
              <button
                type='submit'
                className='md:ml-auto sm:ml-auto rounded-lg my-2 py-1 w-1/5 text-lg text-white bg-sky-600 font-bold'
              >
                Login
              </button>
            </form>
            <p className=''>
              Don't have an account?{' '}
              <button className='text-purple-600 font-bold text-lg'>
                <Link to={'/register'}>Register</Link>
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
