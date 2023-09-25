const BlogPostSchema = require("../models/BlogPost");
const path = require('path')

module.exports = (req, res) => {
  let image = req.files.image;
  image.mv(
    path.resolve(__dirname,'..', "public/assets/img", image.name),
    async (error) => {
      await BlogPostSchema.create({ ...req.body, image: "img/" + image.name });
      res.redirect("/");
    }
  );
};
