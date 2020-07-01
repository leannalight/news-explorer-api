const mongoose = require('mongoose');
const articlesValidator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => articlesValidator.isURL(link),
      message: (props) => `${props.value} is not valid link!`,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (linkImage) => articlesValidator.isURL(linkImage),
      message: (props) => `${props.value} is not valid image link!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

articleSchema.methods.omitPrivate = function omitPrivate() {
  const obj = this.toObject();
  delete obj.owner;
  return obj;
};
module.exports = mongoose.model('article', articleSchema);
