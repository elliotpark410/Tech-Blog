// require express router which helps us create router handlers like get, post, delete, and put
const router = require('express').Router();

// export User, Post, and Comment models
const { User, Post, Comment } = require('../models');

// require withAuth which is custom middleware to verify that a user has a logged in session i.e. only logged in users will be able to access functions that have withAuth
const withAuth = require('../utils/auth');


// /dashboard/:id get route so user can have access to one of their specific blog posts and include user and comment data that is in the database 
router.get('/', withAuth, async (req, res) => {
  console.log('userid: ', req.session.user_id)
  try {
    // Get one blog post data by id that user created
    // find blog posts by req.session.user_id which is equal to User id
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },  
      include: [
        // join username data in User model
        {
          model: User,
          attributes: ['username'],
        },
        {
        // join comment_content, user_id, post_id data in Comment model
          model: Comment,
          attributes: ['comment_content', 'user_id', 'post_id'],
        },
      ],
    });
    
    console.log('postData: ', postData)
    // Serialize is the process of an object is formatted so it is suitable for transfer
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    console.log('posts: ', posts)

    // Pass serialized posts data and session flag and render dashboard.handlebars template
    res.render('dashboard', {
      // spread operator removes the curly brackets from an object and square brackets from an array
      // post will send data in a string or JSON object when the client side calls route
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


// /dashboard/newPost get route so user can add a newPost
router.get('/newPost',  (req, res) => {
  res.render('new-post', {
    logged_in: req.session.logged_in,
  })
});


// /dashboard/edit/:id get route so user can have edit one of their specific blog posts and include user and comment data that is in the database 
router.get('/edit/:id', async (req, res) => {
  try {
    // Get one blog post data by id that user created
    // find blog posts by req.session.user_id which is equal to User id
    const postData = await Post.findByPk(req.params.id, {
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
        },
      ],
    });

    // Serialize is the process of an object is formatted so it is suitable for transfer
    // Serialize data so the template can read it
    const posts = postData.get({ plain: true });

    // Pass serialized posts data and session flag and render edit-post.handlebars template
    res.render('edit-post', {
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
      ...posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    // res.status(500) sets the HTTP status to a server error response (Internal Server Error)
    res.status(500).json(err);
  }
});


// module.exports are instructions for Node.js to export this code so that other files are allowed to access this code
module.exports = router;
