const User = require("../models/User");

module.exports = async (req, res) => {
  try {
    await User.create(req.body);
    res.render("login");
  } catch (err) {
    const errors = [
      err.errors.username.properties.message,
      err.errors.password.properties.message,
    ];
    req.session.validationError = errors;

    //Object.keys(err.errors.properties).map(key => err.errors.properties[key].message)
    res.redirect("/auth/register");
  }
};
