const User = require("../models/User");

module.exports = (req, res, next) => {
  const userId = req.session.userId;  // Use the session's userId directly

  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.redirect("/auth/login");
      }
      next();  // Proceed to the next middleware
    })
    .catch(error => {
      console.error("Error finding user by ID:", error);
      res.redirect("/auth/login");
    });
};
