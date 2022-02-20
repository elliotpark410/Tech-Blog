// define and import dependencies 
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// Import the connection object
const sequelize = require('./config/connection');

// import connect sessions sequelize so sequelize can store user session data
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Set up the express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// sessions use case is to capture log in and log out user information
const sess = {
  secret: 'Super secret secret',
  // expiration date of the session
  cookie: { maxAge: 86400 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// have express app use sessions
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up express app to use controller directory for routes
app.use(routes);

// Sequelize.sync is used to synchronize your Sequelize model with your database tables
// force: false means that if the table exists, then any CRUD actions won't be executed
// initialize portwith app.listen
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}`));
});
