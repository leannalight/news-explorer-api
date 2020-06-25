const mongoose = require('mongoose');
const usersValidator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => usersValidator.isEmail(email),
      message: (props) => `${props.value} is not valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
})

module.exports = mongoose.model('user', userSchema);