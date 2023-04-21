const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
// const path = require('path');

const errorMiddleware = require('./middleware/error');

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// routes imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const category = require('./routes/categoryRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');

app.use('/api/v1', user);
app.use('/api/v1', category);
app.use('/api/v1', product);
app.use('/api/v1', order);
app.use('/api/v1', payment);

app.get('*', (req, res) => {
  res.send('Page Not Found');
});

app.use(errorMiddleware);

module.exports = app;
