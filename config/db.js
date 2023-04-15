const mongoose = require('mongoose');
const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`error in connectDB: ${error}`);
    process.exit(1);
  }
};
module.exports = connectDatabase;