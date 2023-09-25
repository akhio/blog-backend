module.exports = (req, res, next) => {
  loggedIn = req.session.userID;

  next();
};
