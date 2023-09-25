const User = require("../models/User");

module.exports = async (req, res) => {
    try {
        await User.create(req.body);
        res.render("login");
      } catch (err) {
        res.redirect('/auth/register')
      }
};
