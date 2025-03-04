let mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
  console.log('MONGODB_URI:', process.env.MONGODB_URI);
}).catch((err) => {
  console.log('Error: ', err);
});

let userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  date:{
    type: Date,
    default: Date.now
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', userSchema); // 'User' is the name of the collection