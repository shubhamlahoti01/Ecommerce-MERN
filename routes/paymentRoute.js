const express = require('express');
const {
  sendStripeApiKey,
  processPayment,
} = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middleware/auth');
const router = express.Router();

router.route('/payment/process').post(isAuthenticatedUser, processPayment);

router.route('/stripeapikey').post(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
