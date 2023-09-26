const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const BlogPostSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide title"],
  },
  body: {
    type: String,
    required: [true, "Please provide description"],
  },
  username: String,
  datePosted: {
    type: Date,
    default: new Date(),
  },
  image: {
    type: String,
    required: [true, "Please provide image"],
  },
});

BlogPostSchema.plugin(uniqueValidator);
const BlogPost = mongoose.model("BlogPost", BlogPostSchema);
module.exports = BlogPost;
