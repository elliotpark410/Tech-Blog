// require express router which helps us create router handlers like get, post, delete, and put
const router = require('express').Router();

// export Comment model
const { Comment } = require('../../models');

// require withAuth which is custom middleware to verify that a user has a logged in session i.e. only logged in users will be able to access functions that have withAuth
const withAuth = require('../../utils/auth');

// api/comment post route so user can add comment to the database 
// async/await is an easier way to write promises
// promise objects are for asynchronous tasks that take time to resolve or finish
// a promise is a placeholder for an asynchronous task which is yet to be completed
// when you define a promise object, instead of returning a value, it returns a promise
router.post('/', withAuth, async (req, res) => {
  // try/catch statement is a form of error handling so programmers can define how an error is handled
  try {
    // include a newComment variable to store the new comment data
    // include new Comment object and use Sequelize's create() method to add a row of data to the table
    const newComment = await Comment.create({
      // spread operator removes the curly brackets from an object and square brackets from an array
      // req.body allows you to access data in a string or JSON object from the client side
      /*
      Comment model:
      id
      comment_content
      user_id
      post_id
      */
      ...req.body,
      // user_id equal to req.session.user_id which sould equal true. See user routes
      user_id: req.session.user_id,
    });
    // res.status(200) sets the HTTP status to a successful response (OK)
    // sends a JSON response with newComment data when the client side calls route
    res.status(200).json(newComment);
  } catch (err) {
    // if there's an error with the route, res.status(400) sets the HTTP status to a client error response (Bad Request)
    res.status(400).json(err);
  }
});


// api/comment delete route so user can delete comment by comment id in the database
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // include a commentData variable to store the to be deleted comment data
    // include new Comment object and use Sequelize's destroy() method to delete a row of data filtered by id in the table
    const commentData = await Comment.destroy({
      comment_content: req.body.comment_content
      }, 
      {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      // res.status(404) sets the HTTP status to a client error response (Not Found)
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    // res.status(200) sets the HTTP status to a successful response (OK)
    // sends a JSON response with updated comment data (excluding deleted comment) when the client side calls route
    res.status(200).json(commentData);
  } catch (err) {
    // res.status(500) sets the HTTP status to a server error response (Internal Server Error)
    res.status(500).json(err);
  }
});

// api/comment put route so user can update comment by comment id in the database
router.put('/:id', withAuth, async (req, res) => {
  try {
    // include a commentData variable to store the to be updated comment data
    // include new Comment object and use Sequelize's update() method to update a row of data filtered by id in the table
    const commentData = await Comment.update({
      comment_content: req.body.comment_content
      }, 
      {
        where: {
            id: req.params.id,
            user_id: req.session.user_id, 
        }
    });

    if (!commentData) {
      // res.status(404) sets the HTTP status to a client error response (Not Found)
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    // res.status(200) sets the HTTP status to a successful response (OK)
    // sends a JSON response with updated comment data (with updated comment) when the client side calls route
    res.status(200).json(commentData);
  } catch (err) {
    // res.status(500) sets the HTTP status to a server error response (Internal Server Error)
    res.status(500).json(err);
  }
});

// module.exports are instructions for Node.js to export this code so that other files are allowed to access this code
module.exports = router;
