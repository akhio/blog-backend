const User = require("../models/User");

module.exports = (req, res, next) => {
  const userId = req.session.userID; // Use the session's userId directly

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.redirect("/");
      }
      next(); // Proceed to the next middleware
    })
    .catch((error) => {
      return res.redirect("/");
    });
};
