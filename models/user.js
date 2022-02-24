// require sequelize for creating model with datatypes
const { Model, DataTypes } = require('sequelize');

// requires bcrypt to hash password so user's password does not display in table
const bcrypt = require('bcrypt');

// export to config/connection to connect to database
const sequelize = require('../config/connection');

// Method id a property containing a function definition
// Create a checkPassword method for the User object
// checkPassword compares bcrypted password that user entered and password in User model
class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
   // Define fields/columns on User model
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  },
  {
    // When adding hooks via the init() method, they go below
    hooks: {
      // Use the beforeCreate hook to work with data before a new instance is created
      beforeCreate: async (newUserData) => {
        // take the new user's password and hash it before adding it to the database
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        // tkae user's updated password and hash it before adding it to the database
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    // link to database connection
    sequelize,
    // Set to false to remove `created_at` and `updated_at` fields
    timestamps: false,
    // Prevent sequelize from renaming the table
    freezeTableName: true,
    //Everything returned in snake_case
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
