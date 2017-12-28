# Lighting Talk Polling App

For the functional specification and requirement of this app, please refer to the [here](https://github.com/clho40/test-fullstack)

## Tech Stack
- Frontend
    - ReactJS
    - React Router
    - Semantic UI

- Backend
    - Loopback + NodeJS
    - MongoDB

## Requirement
1. Windows Operating System
2. MongoDB

## How to run
1. Navigate to /lighting-talk/server/datasources.json and update MongoDB your conenction details
2. Navigate to /lighting-talk/react_src and run **npm run build**
    - Modify/Update the react source code in this folder if needed
    - React will compile and the files will be copied to /lighting-talk/client
3. Navigate to /lighting-talk and run **node .**
    - Server will start
4. Browse http://localhost:3000/

## How to use
1. To add a new talk, click on the **Add** button and fill in the details and submit
2. To vote a talk, click on the **Stars** (eg: highlight 4 stars to vote 4) and confirm

## Explaination
- Frontend is built with ReactJS (under *react_src* folder)
- Backend is built with Loopback API
- ReactJS <-> Loopback API <-> MongoDB

## Custom Remote Method
### Vote API
url: /api/talks/vote
method: POST
arguments: {id: <talk-id (string)>, vote: <score (number)>}