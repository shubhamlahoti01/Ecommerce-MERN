import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAllCategories } from '../../actions/categoryAction';
import Loader from '../Layout/Loader';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Products from '../Product/Products';
const CategoryCard = ({ imageUrl, imageAlt, title, message, categoryid }) => {
  const navigate = useNavigate();
  return (
    <div
      className='p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4'
      onClick={() => {
        navigate(`/categories/${categoryid}`);
      }}
    >
      <div className='shrink-0'>
        <img className='h-12 w-12' src={imageUrl} alt={imageAlt} />
      </div>
      <div>
        <div className='text-xl font-medium text-black'>{title}</div>
        <p className='text-slate-500'>{message}</p>
      </div>
    </div>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const [showProducts, setShowProducts] = useState(true);
  const { loading, categories, error } = useSelector((state) => state.category);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllCategories());
  }, [dispatch, error, showProducts]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='home-main'>
          <div className='banner-container'>
            <img
              src='https://static.vecteezy.com/system/resources/previews/004/299/815/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg'
              alt=''
            />
          </div>
          <div className='home-menu'>
            {/* <h1
              onClick={() => setShowProducts(false)}
              className={showProducts ? '' : 'show-me'}
            >
              CATEGORIES
            </h1> */}
            <h1
              onClick={() => setShowProducts(true)}
              className={showProducts ? 'show-me' : ''}
            >
              PRODUCTS
            </h1>
          </div>
          {showProducts ? (
            <div className='home-content'>
              <Products categories={categories} />
            </div>
          ) : (
            <div className='home-content' style={{ position: 'relative' }}>
              {categories?.length > 0 ? (
                <>
                  {categories.map((c) => (
                    <CategoryCard
                      key={c._id}
                      imageUrl={
                        'https://m.media-amazon.com/images/I/418tFshxkJL._SX300_SY300_QL70_FMwebp_.jpg'
                      }
                      imageAlt={'smart-watch'}
                      title={c.name}
                      message={c.slug}
                      categoryid={c._id.toString()}
                    />
                  ))}
                </>
              ) : (
                <h1>No Category Created Yet!!!</h1>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
