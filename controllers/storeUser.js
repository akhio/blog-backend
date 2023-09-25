const User = require('../models/User');

module.exports = async (req, res) => {
  try {
    await User.create(req.body);
    res.render('login');
  } catch (err) {
    const validationErrors = Object.keys(err.errors).map(
      (key) => err.errors[key].properties.message
    );
    req.flash('validationErrors', validationErrors);
    return res.redirect('/auth/register');
  }
};
