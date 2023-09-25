const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    await bcrypt.compare(req.body.password, user.password);
    res.render("index");
  } catch (error) {
    req.flash('validationErrorsLogin', 'Incorrect username or password')
    return res.redirect("/auth/login");
  }
};

// const { username, password } = req.body;

// try {
//   const user = await User.findOne({ username: username });
//   if (user) {
//     const same = await bcrypt.compare(password, user.password);
//     if (same) {
//       req.session.userID = user._id;
//       res.redirect("/");
//     } else {
//       res.redirect("/auth/login");
//     }
//   } else {
//     res.redirect("/auth/login");
//   }
// } catch (error) {
//   console.error(error);
// }
