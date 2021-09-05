# Nicolas de Lima application

#### Hey there! First of all, thanks for this opportunity, I'm going to introduce you to some core ideas of this PR, this way it will be easier to review the project. You can imagine this is a conversation, just like a meeting in which I'm briefing you about the project you are about to review.

#### You can access the application here: https://d3r1pzif4nr1c9.cloudfront.net
#### It's Using Heroku Free Version for hosting, so depending on the time, you can face some cold start issues 😞

#### To run it locally just use docker-compose up -d command, but keep in mind that you'll need the .env file in the server/ folder

```
GITHUB_URL=https://github.com
GITHUB_GET_EMAIL_URL=https://api.github.com/user
GITHUB_CLIENT_ID=OAUTH_CLIENT_ID
GITHUB_CLIENT_SECRET=OAUTH_SECRET

JWT_PRIVATE_KEY=this_is_private_hihi
JWT_EXPIRES_IN=1d

CLIENT_URL=http://localhost:3000

MONGO_URL=mongodb://localhost:27017/talk
```

#### Also, you'll need a env.ts file inside client/ folder

```
export const REACT_APP_GIT_URL = "https://github.com/login/oauth/authorize?client_id=CLIENT_ID";
export const REACT_APP_API_URL = "http://localhost:5000";
```

#### ...Let's start with the Backend then

# Backend

- Typescript 
- Testing: Jest
- Database: MongoDB
- Auth: Github

#### In Summary:
#### I choose Typescript to have a more scalable code, with type checking helping me in situations like the form values validation in the service-side 
#### MongoDB because this is an initial phase project, so several things can still change with time, this way I can leverage the NoSql features, without losing control, since MongoDB/Typescript/Jest has a unique combo together when it comes to testing and type checking

####  I can create the Mongoose Schemas using the Typescript interfaces, this way I can return validation errors using Mongo validator. You can check the behavior inside the tests folder.

#### Also, I run a Mongo binary during the execution of the tests, this way I'm able to really test database calls and validate my queries in a real case scenario!

#### Github OAuth because I 'm assuming  the person reviewing my code has access to a Github account, so it is a fast way to implement some auth concepts

### Project Structure

![project folder](https://nicrepoimg.s3.amazonaws.com/Screenshot+from+2021-09-05+09-21-42.png)

#### As you can see it's quite simple, after all why it needs to be complicated right? I believe I don't have to explain the architecture since it is a very common way to organize small Rest APIs, that's why I'm going to show you only some important parts that  have some key concepts to understand the code

 ### App.ts One of the two classes in this code

![Application Manager](https://nicrepoimg.s3.amazonaws.com/Screenshot+from+2021-09-05+09-27-21.png)
#### The Application Manager is responsible for configuring everything our application needs to start running. You can notice that we are instantiating the database, middlewares, and asl routes, everything abstract into this entity that exports the server object so we can really start listening to HTTP requests

#### It's important to say that separating the application from the server like this, allows us to test all the application flows by really calling the endpoints using libraries such as supertest, which uses the application configuration to simulate an API during the tests execution time.
Also, since the class is configurable by dependency injection, the code is not coupled, so we can control the state of the application the way we'd like for testings purposes, from easily creating a new database connection rule to applying new routes with new handlers. 

### Routes

#### Another important part of the application is the way we use routes, this is a plug and play method to initiate Routes. As soon as you created your controller function, you just need to go to the router/routes-config.ts and create a new object like the following one

![Router](https://nicrepoimg.s3.amazonaws.com/Screenshot+from+2021-09-05+09-37-49.png)

#### And another cool thing, the logic behind this abstraction is also using ![Pino](https://github.com/pinojs/pino) to log info about the routes. And this is a choice I made in case we want to have more control of our logging system in the future, maybe different behaviors per environment? storing them into Kafka? One thousand possibilities, but now, we are on the right way to afford all of them.

![Routes info](https://nicrepoimg.s3.amazonaws.com/Screenshot+from+2021-09-05+09-46-37.png)

### Compose Generator

#### Basically it encapsulates our controller functions and generates a common service layer for all of them, responsible for logging info about the request, defining a common interface for Server Responses, and also being a cool way to centralize error handling in our application, reducing significantly the number of Try Catch in the code.

![ComposeGenerator](https://nicrepoimg.s3.amazonaws.com/Screenshot+from+2021-09-05+09-58-31.png)

### Error Handling the other class I mentioned

#### It will log info about the error, containing the error message to send to the client, the error message for the backend developer, and also the function name where the error occurred.

![Error Handling](https://nicrepoimg.s3.amazonaws.com/Screenshot+from+2021-09-05+10-07-11.png)

# Frontend

####  I decided to keep it as simple as possible as well, I worked as a full-stack engineer but my focus always was on the backend and DevOps. And because of the lack of time for this test (I'm currently launching a new release in my current project), I couldn't afford to follow one of the rules of this test "Do not use any scaffolding tool such as create-react-app".

#### But I also didn't use create-react-app, I decided to go with ![VITE](https://vitejs.dev/)
- #### As I said before, frontend is not my focus, but I did some research and it seems like Vite is a faster and lighter option when compared to react-create-app and even to Webpack. 

- #### It serves files over native ES modules and has a Hot Module Replacement feature, so it doesn't need to rebuild the entire bundle when something is updated.
- #### It supports .ts files out of the box
- #### Follows the Svelte logic, where the code is compiled

##### In short, I had to make this decision because of time, but I tried to cover all the bad parts of using some tool as creat-react-app

### Project Structure

#### There is only one page in this application, I decided to do it like that because I think this way I could show that I understand the main concepts without investing too much time. After all, we all already implemented routes a million times in frontend applications. For the frontend, I'm betting on showing my knowledge regarding contexts and data flow than design/basic features.

![Frontend structure](https://nicrepoimg.s3.amazonaws.com/Screenshot+from+2021-09-05+10-54-22.png)


#### Basically I have the AuthContext providing info to its children regarding the user being authorized 
#### The TalksContext, that centralizes the reload of new talks, this way we can trigger the refresh at any place of our code
### Example of the AUth context being easily requested:

![AuthCOntext example](https://nicrepoimg.s3.amazonaws.com/Screenshot+from+2021-09-05+11-09-32.png)

### React Hooks forms for validating

![Forms](https://nicrepoimg.s3.amazonaws.com/Screenshot+from+2021-09-05+11-04-39.png)

#### You can check the ![lib](https://react-hook-form.com/), it's an easy way to create forms and control their error state. The JSX code looks so clean now that we don't have to worry about mapping errors.


### Bonus point
 - CICD Running for Frontend
 - Frontend infra wrote using terraform
