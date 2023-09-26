const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        req.session.userID = user._id;
        res.redirect("/");
      } else {
        res.redirect("/auth/login");
      }
    } else {
      res.redirect("/auth/login");
    }
  } catch (error) {
    console.error("Error:", error);
    res.redirect("/auth/login");
  }
};
