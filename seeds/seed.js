// export to config/connection to connect to database
const sequelize = require('../config/connection');

// require User, Post, and Comment models
const { User, Post, Comment } = require('../models');

// require json objects with user, post, and comment seed data
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

// using async await for asynchronous function so JavaScript knows to wait for the promise to be fulfilled before moving on 
const seedDatabase = async () => {
  // force: true DROPS TABLE IF EXISTS
  await sequelize.sync({ force: true });

  // insert all user seed data with hooks
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // inserts all post seed data with a for/of loop
  for (const post of postData) {
    await Post.create({
      ...post,
    });
  }

  // inserts all comment seed data with a for/of loop
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
    });
  }

  process.exit(0);
};

seedDatabase();