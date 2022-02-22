// require sequelize for creating model with datatypes
const { Model, DataTypes } = require('sequelize');

// export to config/connection to connect to database
const sequelize = require('../config/connection');

// Create a new Sequelize model for posts
class Post extends Model {}

Post.init(
   // Define fields/columns on Post model
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_content: {
      type: DataTypes.TEXT,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    // link to database connection
    sequelize,
    // Set to false to remove `created_at` and `updated_at` fields
    timestamps: false,
    // Prevent sequelize from renaming the table
    freezeTableName: true,
    //Everything returned in snake_case
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
