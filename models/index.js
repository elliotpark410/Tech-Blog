// require User, Post, and Comment models and give file path
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define relationships between User, Post, and Comment tables

// User has many posts
User.hasMany(Post, {
  foreignKey: 'user_id'
});

// Posts belong to one user
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// User has many comments
User.hasMany(Comment, {
  foreignKey: 'user_id'
});

// Comments belong to one user
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

// Post has many comments
Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

// Comments belong to one Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };
