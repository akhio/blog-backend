const BlogPostSchema = require("../models/BlogPost");
const path = require("path");

module.exports = async (req, res) => {
  try {
    const {title, body} = req.body;
    const image = req.files.image;
    await BlogPostSchema.create({ title, body, image: "img/" + image.name });
    image.mv(path.resolve(__dirname, "..", "public/assets/img", image.name));
    res.redirect("/");
  } catch (error) {
    console.log(error)
    req.flash('data', req.body)
    //const validationErrors = Object.keys(error.errors).map((key) => error.errors[key].properties.message)
    req.flash('validateErrorsBlog', error)
    res.redirect("/posts/store");
  }
};
