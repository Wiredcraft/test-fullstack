# Fullstack
this is a fullstack demo. 

### Context

Build a [Hacker News](https://news.ycombinator.com/) like App but for lightning talk polling.

A lightning talk is a very short presentation lasting only a few minutes, given at a conference or a meetup etc.

Polling is often needed for the organizers to understand what is more interesting, or for people to decide what should go on stage.

### Requirements

#### User Stories

1. When a user opens the page, he/she should see a list of lighting talks submitted by the users, ordered by rating \(poll amount\).
2. If there's no lighting talk yet, there should be some description and some text to encourage the users to submit their own talks.
3. For each of the talks in the list, the user could vote it by clicking a button.
4. After voting it, the user should see an updated version of the list, eg. with new talks and new sorting order etc.
5. The users should be able to submit new lighting talks anytime. The required information is the title and description, while the system should also save the submit time and user.
6. After submitting a topic, the user should see an updated version of the list.

### Technology stack
- server: nestjs
- web: react
- db: typegoose
- auth: passport-local, passport-jwt
- test: jest
  
### how to start it
```
    brew install mongodb-community@4.2
    brew services start mongodb-community@4.2
    npm install
    npm i -g @nestjs/cli
    cd server 
    nest start -w src

    cd web 
    npm run start
```
