import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import Home from './components/Home/Home';
import Login from './components/User/Login';
import Register from './components/User/Register';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './actions/userAction';
import ProtectedRoute from './components/Route/ProtectedRoute';
import Dashboard from './components/Admin/Dashboard';
import Profile from './components/User/Profile';
import UpdateProfile from './components/User/UpdateProfile';
import ProductList from './components/Admin/ProductList';
import NewProduct from './components/Admin/NewProduct';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Cart from './components/Cart/Cart';
import OrderList from './components/Admin/OrderList';
import UpdateProduct from './components/Admin/UpdateProduct';
import Shipping from './components/Cart/Shipping';
import MyOrders from './components/Orders/MyOrders';
import OrderSuccess from './components/Cart/OrderSuccess';
import OrderDetails from './components/Orders/OrderDetails';
import ConfirmOrder from './components/Orders/ConfirmOrder';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import store from './store';
import Payment from './components/Cart/Payment';
import NotFound from './components/Layout/NotFound/NotFound';
import ProcessOrder from './components/Admin/ProcessOrder';
import UsersList from './components/Admin/UsersList';
import UpdateUser from './components/Admin/UpdateUser';
import ProductReviews from './components/Admin/ProductReviews';

const App = () => {
  const { isAuthenticated, user = {} } = useSelector((state) => state.user);
  /* 
  const [stripeApiKey, setStripeApiKey] = useState('');
  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey');
    setStripeApiKey(data.stripeApiKey);
    // console.log(stripeApiKey);
    // loadStripe(stripeApiKey);
  }
  */

  useEffect(() => {
    store.dispatch(loadUser());
    // getStripeApiKey();
  }, []);
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route
            path='/process/payment'
            element={<ProtectedRoute></ProtectedRoute>}
          >
            <Route path='' element={<Payment />} />
          </Route>
          {/* )} */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route exact path='/product/:id' element={<ProductDetails />} />
          <Route exact path='/products' element={<Products />} />
          <Route path='/products/:keyword' element={<Products />} />
          <Route exact path='/cart' element={<Cart />} />

          <Route path='/shipping' element={<ProtectedRoute />}>
            <Route path='' element={<Shipping />} />
          </Route>
          <Route path='/success' element={<ProtectedRoute />}>
            <Route path='' element={<OrderSuccess />} />
          </Route>
          <Route path='/orders' element={<ProtectedRoute />}>
            <Route path='' element={<MyOrders />} />
          </Route>
          <Route path='/order' element={<ProtectedRoute />}>
            <Route path='confirm' element={<ConfirmOrder />} />
            <Route path=':id' element={<OrderDetails />} />
          </Route>

          <Route path='/me/update' element={<ProtectedRoute />}>
            <Route path='' element={<UpdateProfile />} />
          </Route>
          <Route exact path='/profile' element={<ProtectedRoute />}>
            <Route path='' element={<Profile />} />
          </Route>

          <Route path='/admin' element={<ProtectedRoute isAdmin={true} />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='products' element={<ProductList />} />
            <Route path='product' element={<NewProduct />} />
            <Route path='product/:id' element={<UpdateProduct />} />
            <Route path='orders' element={<OrderList />} />
            <Route path='order/:id' element={<ProcessOrder />} />
            <Route path='users' element={<UsersList />} />
            <Route path='user/:id' element={<UpdateUser />} />
            <Route path='reviews' element={<ProductReviews />} />
          </Route>

          <Route
            element={
              window.location.pathname === '/process/payment' ? null : (
                <NotFound />
              )
            }
          />
        </Routes>

        <Footer />
        <Toaster />
      </Router>
    </div>
  );
};

export default App;
