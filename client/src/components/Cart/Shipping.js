import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Shipping.css';
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingInfo } from '../../actions/cartAction';
import MetaData from '../Layout/MetaData';
import {
  PinDrop,
  Home,
  LocationCity,
  Public,
  Phone,
  TransferWithinAStation,
} from '@mui/icons-material';
import { Country, State } from 'country-state-city';
import { toast } from 'react-hot-toast';
import CheckoutSteps from '../Cart/CheckoutSteps';

const Shipping = () => {
  return (
    <Fragment>
      <MetaData title='Shipping Details' />

      <CheckoutSteps activeStep={0} />
    </Fragment>
  );
};

export default Shipping;
