# Wiredcraft Full-stack Developer test

How to use:

In terminal navigate to working directory --> <br>

1. clone repo
   ```sh
   git clone https://github.com/ugglr/test-fullstack/
   ```
   move into the folder
   
   ```sh
   cd test-fullstack
   ```
   
   confirm that you see my working branch: 
   
   
   ```sh
   git branch -a
   ```
   
   you should see something similar to: 
   
      ```sh
   C:\*YOUR DIR*\test-fullstack>git branch -a
   * master
    remotes/origin/HEAD -> origin/master
   remotes/origin/carl-w-application-code
   remotes/origin/master
      ```
   
   Checkout the branch "carl-w-application-code" by running
   
```sh
git checkout carl-w-application-code
```
       
confirm that you want to work on that branch:
       
```sh
git branch
```
             
You should see something like this: 

```sh
C:\*YOUR DIR*\test-fullstack>git branch
* carl-w-application-code
  master
```

Since you are now on the right branch, you can start installing dependencies. Make sure you have a new version of Node+npm installed. 
   
   
2. Install dependencies:
   Let's start with the backend, so change folder into /server:
   
```sh
cd server && npm install   
```
   
3. deploy prisma database API
   Install prisma globally on machine: 
   
```sh
npm i -g prisma
```
   
still inside of /server run: 
   
```sh
prisma deploy
```
   
Then, follow these steps in the interactive CLI wizard:

step 1. Select Demo server <br>
step 2. Authenticate with Prisma Cloud in your browser (if necessary).<br>
Use the arrow keys to select. <br>
- choose location of the cloud server.
- hit enter for the name of service. (You can also enter what you want) 
- hit enter for the name for stage. (You can also enter what you want)

step 3. Back in your terminal, confirm that the endpoint was written: everything will look something like this:<br>

```sh
? Set up a new Prisma server or deploy to an existing server? Demo server + MySQL d
atabase
? Choose the region of your demo server carl-w-45d845/demo-us1
? Choose a name for your service server
? Choose a name for your stage dev

Written endpoint `https://us1.prisma.sh/carl-w-45d845/server/dev` to prisma.yml

Deploying service `server` to stage `dev` to server `prisma-us1` 2.7s
Service is already up to date.

post-deploy:

Generating schema... 76ms
Saving Prisma Client (JavaScript) at C:\YOUR-DIR\test-fullstack\server\src\generated\prisma-client

Running prisma generate √
```


then start the server: 

```sh
node src/index.js
```

the server should now be running on http:/localhost:4000 , you can
confirm it by navigating to the address in a browser where you will see the GraphQL Playground.

4. Run the frontend development server
   in a new terminal window navigate to the root folder
   run:

```sh
npm install
```

and then:

```sh
npm run start
```

The webpack development server should now be running on http://localhost:8080

Known Bugs:

- Voting: when casting a vote the user has to reload the page for the new vote count to show. It is some type of problem with the Apollo store cache, which is supposed to update, but thus far, I have not been able to get it to work. I think it is because the request to the database takes too long time.


Make sure you read **all** of this document carefully, and follow the guidelines in it.

## Context

Build a [Hacker News](https://news.ycombinator.com/) like App but for lightning talk polling.

A lightning talk is a very short presentation lasting only a few minutes, given at a conference or a meetup etc.

Polling is often needed for the organizers to understand what is more interesting, or for people to decide what should go on stage.

## Requirements

### User Stories

1. When a user opens the page, he/she should see a list of lighting talks submitted by the users, ordered by rating (poll amount).
- OK!

2. If there's no lighting talk yet, there should be some description and some text to encourage the users to submit their own talks.
- OK! Added motivational text!

3. For each of the talks in the list, the user could vote it by clicking a button.
- OK!

4. After voting it, the user should see an updated version of the list, eg. with new talks and new sorting order etc.
- Kind of OK, I have implemeted an uggly page reload fix function for this. There's a bug in the apollo cache/prisma server response thing that I need to figure out for it to be a better solution. 

5. The users should be able to submit new lighting talks anytime. The required information is the title and description, while the system should also save the submit time and user.
- OK, logged in users can submit new talks at any time, and the required information is the title and description. Time and user is saved into the post. 

6. After submitting a topic, the user should see an updated version of the list.
- OK, after submitting the talk the page navigates to the front page. 

### Functionality

- The **frontend** part should be a single page application rendered in the frontend and load data from a RESTful API (**not** rendered from backend). 
 ### I used GraphQL Hope that is ok!

- The API should follow typical RESTful API design pattern.
- Provide proper unit test.

### Tech stack

- Backend oriented
  - Use [Loopback](http://loopback.io/) for the backend. Use any DB for storing the data.
  - Use any **frontend** framework as you like.

I am frontend oriented!

- Frontend oriented
  - Use any **backend** framework as you like. Use any DB for storing the data, or if you prefer, only using the memory (with no permanent storage) could just work.
  - Use React for the frontend.

### Bonus

- Write clear **documentation** on how it's designed and how to run the code.
- Write good in-code comments.
- Write good commit messages.
- An online demo is always welcome.

### Advanced requirements

_These are used for some further challenges. You can safely skip them if you are not asked to do any, but feel free to try out._

- **Backend**:
  - Provide a complete user auth (authentication/authorization/etc) strategy, such as OAuth.
  ----------------> OK, I have authentication with password hashing and storage of token in local storage
  
  - Provide a complete logging (when/how/etc) strategy.
  - Use a NoSQL DB and build a filter feature that can filter records with some of the attributes such as username. Do not use query languages such as MongoDB Query or Couchbase N1QL.
- **Frontend**:

  - Do not use any scaffolding tool such as `create-react-app`, or any CSS framework,
    - but try to use some JS frameworks such as React-Router, and packing tools such as Webpack or Parcel etc.
    ----------------> I setup the project from scratch using Webpack+Babel, react, react-router, etc. 
    
  - Provide an error handling strategy, such as the UI/UX, and different handling for different errors etc.
  - Provide a form validation strategy.
  - Make it responsive.

## What We Care About

Feel free to use any open-source library if you see a good fit, but also remember that we're more interested in finding out your code skill and problem solving skill.

Here's what you should aim for:

- Good use of current HTML, CSS, and JavaScript best practices.
- Solid testing approach.
- Extensible code.

## FAQ

> Where should I send back the result when I'm done?

Fork this repo and send us a pull request when you think it's ready for review. You don't have to finish everything prior and you can continue work on it. We don't have a deadline for the task.

> What if I have a question?

Create a new issue in the repo and we will get back to you quickly.
