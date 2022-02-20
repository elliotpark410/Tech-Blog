// custom middleware function to verify that user session logged_in = true to access function 
// e.g. only users withAuth can access function to edit posts
const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    // if user session.logged_in not true, then redirect to login.handlebars template
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
