# Wiredcraft Full-stack Developer test

Make sure you read the whole document carefully and follow the guidelines in it.

## Context

Build a [Hacker News](https://news.ycombinator.com/) like App but for lightning talk polling.

A lightning talk is a very short presentation lasting only a few minutes, given at a conference or a meetup etc.

Polling is often needed for the organizers to understand what is more interesting, or for people to decide what should go on stage.

## Requirements

### User Stories

1. When a user opens the page, he/she should see a list of lighting talks submitted by the users, ordered by rating (poll amount).
2. If there's no lighting talk yet, there should be some description and some text to encourage the users to submit their own talks.
3. For each of the talks in the list, the user could vote it by clicking a button.
4. After voting it, the user should see an updated version of the list, eg. with new talks and new sorting order etc.
5. The users should be able to submit new lighting talks anytime. The required information is the title and description, while the system should also save the submit time and user.
6. After submitting a topic, the user should see an updated version of the list.

### Functionality

- The **frontend** part should be a single page application rendered in the frontend and load data from a RESTful API (**not** rendered from backend).
- The API should follow typical RESTful API design pattern.
- Provide proper unit test.

### Tech stack

- Backend oriented
    - Use [Loopback](http://loopback.io/) for the backend. Use any DB for storing the data.
    - Use any **frontend** framework as you like.
- Frontend oriented
    - Use any **backend** framework as you like. Use any DB for storing the data, or if you prefer, only using the memory (with no permanent storage) could just work.
    - Use React for the frontend.

### Bonus

- Write clear documentation on how it's designed and how to run the code.
- Write good in-code comments.
- Write good commit messages.
- An online demo is always welcome.

### Advanced requirements

*These are used for some further challenges. You can safely skip them if you are not asked to do any, but feel free to try out.*

- **Backend**:
    - Provide a complete user auth (authentication/authorization/etc) strategy, such as OAuth.
    - Provide a complete logging (when/how/etc) strategy.
    - Use a NoSQL DB and build a filter feature that can filter records with some of the attributes such as username. Do not use query languages such as MongoDB Query or Couchbase N1QL.
- **Frontend**:
    - Do not use any scaffolding tool such as `create-react-app`, or any CSS framework,
        - but try to use some JS frameworks such as React-Router, and packing tools such as Webpack or Parcel etc.
    - Provide an error handling strategy, such as the UI/UX, and different handling for different errors etc.
    - Provide a form validation strategy.
    - Make it responsive.

## What We Care About

Feel free to use any open-source library as you see fit, but remember that we are evaluating your coding skills and problem solving skills.

Here's what you should aim for:

- Good use of current HTML, CSS, and JavaScript best practices.
- Good testing approach.
- Extensible code.

## FAQ

> Where should I send back the result when I'm done?

Fork this repo and send us a pull request when you think it's ready for review. You don't have to finish everything prior and you can continue to work on it. We don't have a deadline for the task.

> What if I have a question?

Create a new issue in the repo and we will get back to you shortly.
=======
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
