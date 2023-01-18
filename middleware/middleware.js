function passDataToView(req, res, next) {
  res.locals.user = req.user ? req.user : null
  res.locals.googleClientID = process.env.GOOGLE_CLIENT_ID
  next()
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}

function isManager(req, res, next) {
  if( res.locals.user?.profile.level >= 900) return next()
  res.redirect('/')
}

export {
  passDataToView,
  isLoggedIn,
  isManager,
}
