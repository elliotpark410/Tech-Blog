// require express router which helps us create router handlers like get, post, delete, and put
const router = require('express').Router();

// export User, Post, and Comment models
const { User, Post, Comment } = require('../models');

// / homepage get route so user can have access to ALL blog posts, user data, and comment data that is in the database 
router.get('/', async (req, res) => {
  try {
    // Get all Post data and JOIN with user data and comment data
    const postData = await Post.findAll({
          // join username data in User model
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        // join comment_content, user_id, post_id data in Comment model
        {
          model: Comment,
          attributes: ['comment_content', 'user_id', 'post_id', 'user.username'],
        },
      ],
    });


    /// create posts variable to store serialized data
    // .map method creates a new array with the results of a function
    // we only get the data we want instead of a huge object with .get ({ plain: true })
    // Serialize is the process of formatting an object so it is suitable for transfer
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized posts data and session flag and render homepage.handlebars template
    res.render('homepage', { 
      /*
      id
      title
      post_content
      user_id
      [User.username]
      [Comment.comment_content, Comment.user_id, Comment.post_id]
      */
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    // res.status(500) sets the HTTP status to a server error response (Internal Server Error)
    res.status(500).json(err);
  }
});


// /login get route so user can be redirected to homepage or if user needs to login, render login.handlebars template
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  // else render login.handlebars template
  res.render('login');
});


// /signup get route so user can be taken to sign up page with render signup.handlebars template
router.get('/signup', (req, res) => {
  res.render('signup');
});



router.get('/post/:id', async (req, res) => {
  try {
    // Get one blog post data by id that user created
    // find blog posts by req.session.user_id which is equal to User id
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      include: [
        // join username data in User model
        {
          model: User,
          attributes: ['username'],
        },
        // join comment_content, user_id, post_id data in Comment model
        {
          model: Comment,
          attributes: ['comment_content', 'user_id', 'post_id'],
          include: {
            model: User,
            attributes: ['username']
        }
        },
      ],
    });

    // Serialize is the process of an object is formatted so it is suitable for transfer
    // Serialize data so the template can read it
    const post = postData.get({ plain: true });

    // Pass serialized posts data and session flag and render single-post.handlebars template
    res.render('single-post', {
      // spread operator removes the curly brackets from an object and square brackets from an array
      // post will send data in a string or JSON object when the client side calls route
      /*
      Post model:
      id
      title
      post_content
      user_id
      [User.username]
      [Comment.comment_content, Comment.user_id, Comment.post_id]
      */
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    // res.status(500) sets the HTTP status to a server error response (Internal Server Error)
    res.status(500).json(err);
  }
});



router.get('/post-comments', async (req, res) => {
  try {
    // Get one blog post data by id that user created
    // find blog posts by req.session.user_id which is equal to User id
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      include: [
        // join username data in User model
        // {
        //   model: User,
        //   attributes: ['username'],
        // },
        // join comment_content, user_id, post_id data in Comment model
        {
          model: Comment,
          attributes: ['comment_content', 'user_id', 'post_id'],
          include: {
            model: User,
            attributes: ['username']
        }
        },
      ],
    });

    // Serialize is the process of an object is formatted so it is suitable for transfer
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized posts data and session flag and render post-comments.handlebars template
    res.render('posts-comments', {
      // spread operator removes the curly brackets from an object and square brackets from an array
      // post will send data in a string or JSON object when the client side calls route
      /*
      Post model:
      id
      title
      post_content
      user_id
      [User.username]
      [Comment.comment_content, Comment.user_id, Comment.post_id]
      */
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    // res.status(500) sets the HTTP status to a server error response (Internal Server Error)
    res.status(500).json(err);
  }
});


// module.exports are instructions for Node.js to export this code so that other files are allowed to access this code
module.exports = router;
