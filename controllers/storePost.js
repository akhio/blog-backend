const BlogPost = require("../models/BlogPost");
const path = require("path");

module.exports = async (req, res) => {
  let image = req.files.image;
  image.mv(path.resolve(__dirname, "public/img", image.name), async () => {
    await BlogPost.create({
      ...req.body,
      image: "/img/" + image.name,
      userid: req.session.userID
    });
    res.redirect("/");
  });
};
// await BlogPost.create({ title, body, image: imagePath });
// image.mv(path.resolve(__dirname, "..", "public/assets/img", image.name));
