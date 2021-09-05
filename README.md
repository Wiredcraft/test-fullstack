# Nicolas de Lima application

#### Hey there! First of all, thanks for this opportunity, I'm going to introduce you to some core ideas of this PR, this way it will be easier to review the project. You can imagine this is a conversation, just like a meeting in which I'm briefing you about the project you are about to review.

#### ...Let's start with the Backend then

## Backend

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

