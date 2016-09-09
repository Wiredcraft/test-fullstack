Wiredcraft Full-stack Developer test
-------------------------

This is a simple implementation of user authentication and topic (title, description, postedBy) system.
## About
This is a code test from [Wiredcraft](https://github.com/Wiredcraft/) for full-stack web developer.

## Getting started
### Run and test the backend
**(1)** Install backend dependencies
```shell
$ cd test-fullstack/backend
test-fullstack/backend$ npm install
```
**(2)** Before running the backend, make sure your OS with mongodb installed. Run the **mongod** and save the documents in your chosen directory. For example, save db docs to the **data** directory.
```shell
mongod --dbpath=data
``` 
**(3)** Update backend config file with your mongodb url.
```shell
test-fullstack/backend$ vi config/main.js
````
```JavaScript
module.exports = {
    'secret': 'Wa9Gq33yv27q6wyS77J860227vkHpcR4',
    'database': 'mongodb://localhost:27017/simple-hacker-news',
    'host': 'http://localhost:3000'
};
```

**(4)** Run the backend
```shell
test-fullstack/backend$ npm start
```

**(5)** Open another terminal and run the unit tests for backend APIs
```shell
test-fullstack/backend$ npm test
```

**(6)** The backend now is running on http://localhost:3000 

### Run the frontend
**(1)** Install frontend dependencies
```shell
$ cd test-fullstack/frontend
test-fullstack/frontend$ npm install
```

**(2)** Build and run a web server to host the frontend
```
test-fullstack/frontend$ gulp watch
```

**(3)** Open browser. The frontend now is running on http://localhost:8000/build

## Implemented Features
1. User authentication system
   - registration
   - login
   - logout
2. Talk Features
   - Get a list of talks (title, description, by, rating)
   - Create a new talk by a logged-in user
   - Rate a specific talk (+1 or -1). One user cannot rate the same talk multiple times.

## Missing Features
To simplify (and to quickly build) the project, I skipped some basic features.
- Get user info
- Update user/talk
- Delete user/talk
- Pagination
- comments for talks

## Techs
The primary techs/libs/frameworks used in this project
- Express 4
- AngularJS 1
- Bootstrap 3
- Json-Web-Token based authentication
- Mongodb

For detailed dependencies, refer to the following files.
```
test-fullstack/backend/package.json
test-fullstack/frontend/bower.json
test-fullstack/frontend/package.json (used only for gulp build tool)
```

## Help or Suggestion
Open issues to this project
