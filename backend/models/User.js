const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
   
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: function () {
   return this.authType === 'local'
    },
  },

  authType: {
    type: String,
    enum: ['local','google'],
    default: 'local'
  },

  googleId: {
    type: String,
    unique: true,
    sparse: true,
  }
 
},{timestamps: true})

const User = mongoose.model('User',userSchema);

module.exports = User;