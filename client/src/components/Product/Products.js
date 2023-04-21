import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Products.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../Layout/Loader';
import ProductCard from '../Home/ProductCard';
import Pagination from 'react-js-pagination';
import { toast } from 'react-hot-toast';
import { Slider } from '@mui/material';
import { Typography } from '@mui/material';
import MetaData from '../Layout/MetaData';

const Products = ({ categories = [] }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { keyword = '' } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState('');
  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredProductsCount;
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'PRODUCTS -- ECOMMERCE'} />
          <div className='filterBox'>
            <Typography className='th'>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider'
              min={0}
              max={25000}
            />
            <Typography className='th'>Categories</Typography>
            <ul className='categoryBox'>
              {categories.map((category) => (
                <li
                  className='category-link'
                  key={category._id}
                  onClick={() => setCategory(category._id)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component='legend' className='th'>
                Ratings Above
              </Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => setRatings(newRating)}
                aria-labelledby='continous-slider'
                valueLabelDisplay='auto'
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          <div className='products'>
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            {products?.length === 0 && <h1>No Items Yet</h1>}
          </div>
          {resultPerPage < count && (
            <div className='paginationBox'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText='Next'
                prevPageText='Prev'
                firstPageText='1st'
                lastPageText='Last'
                itemClass='page-item'
                linkClass='page-link'
                activeClass='pageItemActive'
                activeLinkClass='pageLinkActive'
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
