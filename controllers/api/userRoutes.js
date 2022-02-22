// require express router which helps us create router handlers like get, post, delete, and put
const router = require('express').Router();

// export User model
const { User } = require('../../models');

// api/user/signup post route so user can add user to the database 
router.post('/signup', async (req, res) => {
  try {
    // include a newUser variable to store the new user data
    // include new User object and use Sequelize's create() method to add a row of data to the table
     // req.body allows you to access data in a string or JSON object from the client side
      /*
      User model:
      id
      username
      email
      password
      */
    const newUser = await User.create(req.body);

    // Saves the user session data in browser session
    // information in req.session.save() expires at logout
    req.session.save(() => {
      // creates methods user_id and logged_in = true when a user's session is saved
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

    // res.status(200) sets the HTTP status to a successful response (OK)
    // sends a JSON response with newUser data when the client side calls route
      res.status(200).json(newUser);
    });
  } catch (err) {
    // if there's an error with the route, res.status(400) sets the HTTP status to a client error response (Bad Request)
    res.status(400).json(err);
  }
});

// api/user/login post route so user can login 
router.post('/login', async (req, res) => {
  try {
    // include a userData variable to store the userData
    // include a new User object and use Sequelize's findOne() method to retrieve user data by email
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      // res.status(400) sets the HTTP status to a client error response (Bad Request)
      res
        .status(400)
        .json({ message: 'Email not found, please try again' });
      return;
    }

    // See User model for the creation of checkPassword method
    // method is a property containing a function definition
    // checkPassword compares bcrypted password that user enters (req.body.password) and password in User model
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      // if passwords do not match, res.status(400) sets the HTTP status to a client error response (Bad Request)
      res
        .status(400)
        .json({ message: 'Incorrect password, please try again' });
      return;
    }

    // information in req.session.save() expires at logout
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      // When user logs in, send a JSON response with user data and message when the client side calls route 
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    // when there's an error, res.status(400) sets the HTTP status to a client error response (Bad Request)
    res.status(400).json(err);
  }
});

// api/user/logout post route so user can logout 
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // destroys user session when they call logout route
    req.session.destroy(() => {
      // res.status(204) sets the HTTP status to a successful response (No Content) and ends the response process
      res.status(204).end();
    });
  } else {
    // res.status(404) sets the HTTP status to a client error response (Not Found) and ends the response process
    res.status(404).end();
  }
});

// module.exports are instructions for Node.js to export this code so that other files are allowed to access this code
module.exports = router;
