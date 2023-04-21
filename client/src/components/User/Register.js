import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../actions/userAction';

const Register = () => {
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState('/Profile.png');
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png');
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = user;
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('password', password);
    myForm.set('avatar', avatar);
    // console.log(myForm);
    dispatch(register(myForm));
  };
  const registerDataChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const inputclassstr =
    'mt-1 block w-3/5 sm:w-full md:w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-red-500 invalid:text-red-600 focus: invalid:border-red-500 focus:invalid:ring-red-500';

  return (
    <div className='min-h-screen flex w-full justify-center items-center sm:flex-col md:flex-col'>
      <div className='w-1/2 sm:w-2/3 md:w-2/3 border-2 border-white m-4'>
        <img
          src='https://img.freepik.com/free-vector/employer-meeting-job-applicant-pre-employment-assessment-employee-evaluation-assessment-form-report-performance-review-concept-illustration_335657-2058.jpg?w=996&t=st=1681664032~exp=1681664632~hmac=d959d3c62f917959fc33ccb16fa89d387f14acef04d73927bc9bb3d7878b5544'
          alt='register-image'
          className=''
        />
      </div>
      <div className='w-1/2 sm:w-2/3 md:w-2/3 m-4 flex flex-col'>
        <h1 className='w-full font-bold text-5xl pl-5 pb-4 text-black'>
          Register
        </h1>
        <form
          className='flex flex-col'
          encType='multipart/form-data'
          onSubmit={registerSubmit}
        >
          <input
            type='text'
            placeholder='Name'
            required
            name='name'
            value={name}
            onChange={registerDataChange}
            className={`${inputclassstr}`}
          />
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={registerDataChange}
            className={`${inputclassstr}`}
          />
          <input
            type='password'
            placeholder='Password'
            required
            name='password'
            value={password}
            onChange={registerDataChange}
            className={`${inputclassstr}`}
          />
          <div className='w-full flex items-center'>
            <img
              src={avatarPreview}
              className='w-1/5 rounded-full m-2'
              alt='Avatar Preview'
            />
            <input
              type='file'
              name='avatar'
              accept='image/*'
              onChange={registerDataChange}
            />
          </div>
          <button
            type='submit'
            className='lg:w-2/5 md:w-2/5 sm:w-2/5 rounded-lg my-2 py-1 w-1/5 text-lg text-white bg-purple-600 font-bold'
          >
            Register
          </button>
        </form>
        <p className=''>
          Already Registered?{' '}
          <button className='text-sky-600 font-bold text-lg'>
            <Link to={'/login'}>Login</Link>
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
