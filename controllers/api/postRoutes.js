// require express router which helps us create router handlers like get, post, delete, and put
const router = require('express').Router();

// export Post model
const { Post } = require('../../models');

// require withAuth which is custom middleware to verify that a user has a logged in session i.e. only logged in users will be able to access functions that have withAuth
const withAuth = require('../../utils/auth');


// api/post post route so user can add blog post to the database 
router.post('/', withAuth, async (req, res) => {
  try {
    // include a newPost variable to store the new post data
    // include new Post object and use Sequelize's create() method to add a row of data to the table
    const newPost = await Post.create({
      // spread operator removes the curly brackets from an object and square brackets from an array
      // req.body allows you to access data in a string or JSON object from the client side
      /*
      Post model:
      id
      title
      post_content
      user_id
      */
      ...req.body,
      // user_id equal to req.session.user_id which sould equal true. See user routes
      user_id: req.session.user_id,
    });
    // res.status(200) sets the HTTP status to a successful response (OK)
    // sends a JSON response with newPost data when the client side calls route
    res.status(200).json(newPost);
  } catch (err) {
    // if there's an error with the route, res.status(400) sets the HTTP status to a client error response (Bad Request)
    res.status(400).json(err);
  }
});

// api/post delete route so user can delete post by post id in the database
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // include a postData variable to store the to be deleted post data
    // include new Post object and use Sequelize's destriy() method to delete a row of data filtered by id in the table
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      // res.status(404) sets the HTTP status to a client error response (Not Found)
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    // res.status(200) sets the HTTP status to a successful response (OK)
    // sends a JSON response with updated post data (excluding deleted post) when the client side calls route
    res.status(200).json(postData);
  } catch (err) {
    // res.status(500) sets the HTTP status to a server error response (Internal Server Error)
    res.status(500).json(err);
  }
});

// api/post put route so user can update post by post id in the database
router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      // res.status(404) sets the HTTP status to a client error response (Not Found)
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    // res.status(200) sets the HTTP status to a successful response (OK)
    // sends a JSON response with updated post data (with updated post) when the client side calls route
    res.status(200).json(postData);
  } catch (err) {
    // res.status(500) sets the HTTP status to a server error response (Internal Server Error)
    res.status(500).json(err);
  }
});

// module.exports are instructions for Node.js to export this code so that other files are allowed to access this code
module.exports = router;
