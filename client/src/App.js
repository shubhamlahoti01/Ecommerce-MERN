import React, { useEffect } from 'react';
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

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user = {} } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <div>
      <Router>
        <Header />

        <Routes>
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
          <Route path='/orders' element={<ProtectedRoute />}>
            <Route path='' element={<MyOrders />} />
          </Route>
          {/* <ProtectedRoute exact path='/shipping' component={Shipping} /> */}
          {/* <ProtectedRoute exact path='/success' component={OrderSuccess} /> */}
          {/* <ProtectedRoute exact path='/orders' component={MyOrders} /> */}
          {/* <ProtectedRoute
            exact
            path='/order/confirm'
            component={ConfirmOrder}
          /> */}
          {/* <ProtectedRoute exact path='/order/:id' component={OrderDetails} /> */}

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
          </Route>

          {/*  */}
          {/* 

          <ProtectedRoute
            exact
            path='/admin/order/:id'
            isAdmin={true}
            component={ProcessOrder}
          />
          <ProtectedRoute
            exact
            path='/admin/users'
            isAdmin={true}
            component={UsersList}
          />

          <ProtectedRoute
            exact
            path='/admin/user/:id'
            isAdmin={true}
            component={UpdateUser}
          />

          <ProtectedRoute
            exact
            path='/admin/reviews'
            isAdmin={true}
            component={ProductReviews}
          /> */}
        </Routes>
        <button>
          <Link to='/shipping'>Shipping</Link>
        </button>
        <Footer />
        <Toaster />
      </Router>
    </div>
  );
};

export default App;
