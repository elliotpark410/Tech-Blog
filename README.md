# Tech-Blog
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well.

The app follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package to store session data.

[Tech Blog](https://ep-tech-blog.herokuapp.com/)

<br>

<img src="Images\Tech Blog.gif" title="Tech Blog gif" width = 368px>

[https://drive.google.com/file/d/1XiuC8I3lHTCWGRM8otS_M1hiaoDsPoU5/view](https://drive.google.com/file/d/1XiuC8I3lHTCWGRM8otS_M1hiaoDsPoU5/view)

<br>

## Table of Contents
  * [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Technologies Used](#technologies-used)
  * [Screenshots](#screenshots)
  * [Code Snippets](#code-snippets)
  * [Learning Points](#learning-points)
  * [Authors](#authors)

<br>


## Getting Started

To begin the application, use the following in command line:

`
node server.js
`
<br>



## Prerequisites

1. [Download Node.js](https://nodejs.org/en/download/)

<br>

2. Install node package manager (npm)

`npm install -g npm`

<br>

3. Install dependencies inquirer, console.table, and mysql2

`npm install`

<br>

4. [Download mysql](https://www.mysql.com/downloads/)

<br>

5. [Download Insomnia](https://insomnia.rest/download)

<br>

## Technologies Used

* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Node.js](https://nodejs.org/en/)
* [Express](https://www.npmjs.com/package/express)
* [Express Session](https://www.npmjs.com/package/express-session)
* [Express Handlebars](https://www.npmjs.com/package/express-handlebars)
* [MySQL2](https://www.npmjs.com/package/mysql2)
* [Sequelize](https://www.npmjs.com/package/sequelize)
* [Connect Session Sequelize](https://www.npmjs.com/package/connect-session-sequelize)
* [dotEnv](https://www.npmjs.com/package/dotenv)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [MySQL](https://www.mysql.com/downloads/)
* [Insomnia](https://insomnia.rest/download)


<br>


## Screenshots

<br>
Homepage
<img src="Images\Homepage screenshot.png" title="Homepage screenshot" width = 700px>

<br>
<br>
Sign Up
<img src="Images\Sign Up screenshot.png" title="Sign Up screenshot" width = 700px>

<br>
<br>
Dashboard
<img src="Images\Dashboard screenshot.png" title="Dashbooard screenshot" width = 700px>

<br>
<br>
Submit a Comment
<img src="Images\Submit a Comment screenshot.png" title="Submit a Comment screenshot" width = 700px>

<br>
<br>
Edit Post
<img src="Images\Edit Post screenshot.png" title="Edit Post screenshot" width = 700px>

<br>
<br>


## Code Snippets

This code snippet shows how you can use Express routes, Sequelize ORM, and JavaScript to create a get route for the hompaage so users can have access to all blog post data

* router.get('filepath') to request data from a specified source e.g. blog data post

* try/catch statement for error handling

* async/await to for asynchronous promise-based behavior

* Sequelize .findAll() method to read the whole table from the database

* .map function to create a new array with a callback function for every array element. In this case, we wanted to use it to return a plain object

* res.render ('template.handlebars') to render a view with data

```
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['comment_content', 'user_id', 'post_id',],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
    });
  } catch (err) {
   (Internal Server Error)
    res.status(500).json(err);
  }
});
```

 <br>


## Learning Points

* How to use Sequelize ORM

* How to create handlebar templates

* How to deploy on Heroku with MySQL

* How to create API routes and models

* How to create sessions to capture cookies and user information

* How to use MySQL Workbench and Insomnia for testing API routes


<br>


## Authors
 **1. Elliot Park**

[Github](https://github.com/elliotpark410)

<br>

[LinkedIn](https://www.linkedin.com/in/elliot-park/)

<br>

[Email](mailto:elliotpark410@gmail.com)

<br>















