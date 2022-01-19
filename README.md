# Fullstack

## Setup

### Requirements 

- MongoDB server
- Node.js

### Backend

In the backend folder:

1. Copy and rename `.env.sample` to `.env`.
2. Adjust the `.env` variables according to your configuration.

Those are the environment variables to configure the API.

| Variable Name                     | Description                    |
|-----------------------------------|--------------------------------|
| HOST                   | The hostname of the API.              |
| PORT                   | Port the API will listen to.          |
| JWT_SECRET                   | The secret used to sign the JWT.  |
| LOG_LEVEL                   | The log level of the application.  |
| MONGO_DB                   | The name of the MongoDB database.  |
| MONGO_HOST                   | The hostname of the MongoDB server.|
| MONGO_USER                   | The username of the MongoDB user. |
| MONGO_PASSWORD                   | The password of the MongoDB user.|
| NODE_ENV                   | The environment of the application. |

#### Install dependencies

Run `npm install` in the backend folder.

#### Start application

##### Development server

The backend can be started with the following command:

`npm run dev` 

##### Build

The backend can be build with the following command:

`npm run build` 

#### Testing

`npm run test`

### Frontend

In the frontend folder:

1. Copy and rename `.env.sample` to `.env`.
2. Adjust the `.env` variables according to your configuration.

Those are the environment variables to configure the API.


| Variable Name                     | Description                    |
|-----------------------------------|--------------------------------|
| API_ENDPOINT                   | The hostname of the API. (without trailing slash at the end, eg. `http://0.0.0.0:8080'`)              |

#### Install dependencies

Run `npm install` in the backend folder.

#### Start application

##### Development server

The application can be started with the following command:

`npm run dev` 

##### Build

The frontend can be build with the following command:

`npm run build:prod`

##### Serve

The frontend can be served with the following command after building:

`npm run serve`

### Context

Build a [Hacker News](https://news.ycombinator.com/) like App but for lightning talk polling.

A lightning talk is a very short presentation lasting only a few minutes, given at a conference or a meetup etc.

Polling is often needed for the organizers to understand what is more interesting, or for people to decide what should go on stage.

### Requirements

#### User Stories

- [x] 1. When a user opens the page, he/she should see a list of lighting talks submitted by the users, ordered by rating \(poll amount\).
- [x] 2. If there's no lighting talk yet, there should be some description and some text to encourage the users to submit their own talks.
- [x] 3. For each of the talks in the list, the user could vote it by clicking a button.
- [x] 4. After voting it, the user should see an updated version of the list, eg. with new talks and new sorting order etc.
- [x] 5. The users should be able to submit new lighting talks anytime. The required information is the title and description, while the system should also save the submit time and user.
- [x] 6. After submitting a topic, the user should see an updated version of the list.

#### Functionality

- [x] The frontend part should be a single page application rendered in the frontend and load data from a RESTful API \(not rendered from backend\).
- [x] The API should follow typical RESTful API design pattern.
- [x] Provide proper unit test. *backend

#### Tech stack

- [x] Use React for the frontend.
- [x] Do not use any scaffolding tool such as `create-react-app`, or any CSS framework, but try to use some JS frameworks such as React-Router, and packing tools such as Webpack or Parcel etc.
- [x] Use any backend framework as you like. Use any DB for storing the data, or if you prefer, only using the memory \(with no permanent storage\) could just work.

#### Advanced requirements

_These are used for some further challenges. You can safely skip them if you are not asked to do any, but feel free to try out._

- [x] Make it responsive. 
- [x] Provide a form validation strategy.
- [x] Provide an error handling strategy, such as the UI/UX, and different handling for different errors etc.
- [ ] Provide a complete user auth \(authentication/authorization/etc\) strategy, such as OAuth.
- [ ] Provide a complete logging \(when/how/etc\) strategy.
