module.exports = (req, res) => {
  var username = ''
  const data = req.flash('data')[0];

  if(typeof data != undefined) {
    username = data.username;
  }
  
  
  res.render('register', {
    errors: req.flash('validationErrors'),
    username: username,
  });
};
