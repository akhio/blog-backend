module.exports = (req, res) => {
  if (req.session.userID) {
    return res.render("create", {
      errors: req.flash("validateErrorsBlog"),
    });
  }
  res.redirect("/auth/login");
};
