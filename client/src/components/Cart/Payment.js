import React, { Fragment, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import CheckoutSteps from './CheckoutSteps';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../Layout/MetaData';
import { Typography } from '@mui/material';
import { toast } from 'react-hot-toast';
import { CreditCard, Event, VpnKey } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { createOrder, clearErrors } from '../../actions/orderAction';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import './payment.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  'pk_test_51MPmxBSB3toxmy32Ds9khTcMzeSQr04hn3oZ0D3iCrjrEV1hwAc1PK32f4JvAY2wE4kXomem2uPxp809nWiEIRfE00asl7LtHT'
);

const Payment = (props) => (
  <Elements stripe={stripePromise}>
    <MyComponentPayment {...props} />
  </Elements>
);

const MyComponentPayment = (props) => {
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/v1/payment/process',
        paymentData,
        config
      );
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate('/success');
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (err) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title='Payment' />
      <CheckoutSteps activeStep={2} />
      <div className='paymentContainer'>
        <form className='paymentForm' onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCard />
            <CardNumberElement className='paymentInput' />
          </div>
          <div>
            <Event />
            <CardExpiryElement className='paymentInput' />
          </div>
          <div>
            <VpnKey />
            <CardCvcElement className='paymentInput' />
          </div>

          <input
            type='submit'
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className='paymentFormBtn'
          />
        </form>
      </div>
    </Fragment>
  );
};
export default Payment;
