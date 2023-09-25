module.exports = (req, res, next) => {
  const user_id = req.session.userID;
  if (user_id) {
    return res.redirect("/");
  }
  next();
};
