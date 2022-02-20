# Fullstack

This repository holds my submission for the test-fullstack assignment from Wiredcraft.

This project was built with NestJS/Postgresql as an API server with React as the frontend framework. Other key technologies include Jest for testing, eslint for code style and type error correction.

### Online Version

The online version of this submission can be found at:
- Backend API Documentation: https://stefan-wc-test.herokuapp.com/api/docs
- Frontend: https://swawrzyn.github.io/test-fullstack

**Be aware: the backend is running on a free Heroku dyno, so it make take a while to warm up and show talks. If it times out on first try, please reload.**

### Running this Repository Locally

#### Requirements

- Docker
- Docker Compose

#### Instructions

1. Clone the repo and enter directory:
```
$ git clone git@github.com:swawrzyn/test-fullstack.git
$ cd test-fullstack
```

2. Copy the .env.example to .env and add key variables. You need a github client_id and client_secret to start, and set the
callback url in your github application to http://127.0.0.1:3000/auth/github.
```
$ cp .env.example .env
$ nano .env                 # or whatever editor you prefer
```

3. Init the docker-compose stack:
```
$ ./init.sh
```

4. Start up the docker-compose stack:
```
docker-compose up
```

5. The stack will serve the docker images at:
    - Frontend (React) at http://localhost:3000
    - API (NestJS) at http://localhost:3001

5. To run tests:
```
$ ./test.sh
```

### Logging

This project uses [GlitchTip](https://glitchtip.com) for unified error reporting and logging. In order to take advantage, add your backend/frontend DSNs to the .env file.



## Context

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

#### Functionality

* The frontend part should be a single page application rendered in the frontend and load data from a RESTful API \(not rendered from backend\).
* The API should follow typical RESTful API design pattern.
* Provide proper unit test.

#### Tech stack

* Use React for the frontend.
* Do not use any scaffolding tool such as `create-react-app`, or any CSS framework, but try to use some JS frameworks such as React-Router, and packing tools such as Webpack or Parcel etc.
* Use any backend framework as you like. Use any DB for storing the data, or if you prefer, only using the memory \(with no permanent storage\) could just work.

#### Advanced requirements

_These are used for some further challenges. You can safely skip them if you are not asked to do any, but feel free to try out._

* Make it responsive.
* Provide a form validation strategy.
* Provide an error handling strategy, such as the UI/UX, and different handling for different errors etc.
* Provide a complete user auth \(authentication/authorization/etc\) strategy, such as OAuth.
* Provide a complete logging \(when/how/etc\) strategy.
