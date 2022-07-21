# Lightning Talks Polling Web App

Good day Wiredcraft team, this is the test result for the fullstack JS developer position.

# Table of Content

1. [Test the website online](#test-the-website-online)
2. [Test the website on a local machine](#test-the-website-on-a-local-machine)
3. [Tech stack](#tech-stack)
4. [Software architecture overview](#software-architecture-overview)
5. [Frontend setup](#frontend-setup)
6. [Backend setup](#backend-setup)
7. [Database and schema](#database-and-schema)
8. [Deployment](#deployment)
9. [Functions implementation](#functions-implementation)
   - [Auth flow](#auth-flow)
   - [Atomic update of votes counts explained](#atomic-update-of-votes-counts-explained)
   - [Sorting polls by number of votes explained](#sorting-polls-by-number-of-votes-explained)
10. [Code writing style](#code-writing-style)
11. [Final notes](#final-notes)

___

## Test the website online

The website is hosted on AWS servers. Please use the link below to test it:

```
https://master.d2ykot21kiyxwq.amplifyapp.com/
```

Please use the credentials below for quick testing. However, **you are encouraged to create a new account** to test the auth flow functionality.

```
username: bilal
password: 12345678
```

## Test the website on a local machine

Install dependencies

```
yarn install
```

Run the website

```
yarn start
```

Open in your browser

```
http://localhost:3000/
```

## Tech stack

This is a macro overview of the tech stack. In the following sections, we will discuss more details at the micro level.

- [React](https://reactjs.org/)
- [AWS](https://aws.amazon.com/)
- [Node.js](https://nodejs.dev/)

## Software architecture overview

I used serverless architecture. Below is an overview of the software architecture.

![Software architecture overview](https://bilal-cloud.s3.ap-northeast-1.amazonaws.com/assets/software-architecture-overview.jpg)

Here you can find more details about each AWS service I used in this project.

- [AWS Amplify](https://docs.amplify.aws/)
- [AWS S3](https://aws.amazon.com/s3/)
- [AWS Cognito](https://aws.amazon.com/cognito/)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [AWS AppSync](https://aws.amazon.com/appsync/)
- [AWS DynamoDB](https://aws.amazon.com/dynamodb/)

## Frontend setup

The frontend was manually configured, and no scaffolding tool was used. Some of the essential libraries are:

- [react](https://reactjs.org/)
- [aws-amplify](https://docs.amplify.aws/)
- [react-router-dom](https://reactrouter.com/)
- [babel](https://babeljs.io/)
- [webpack](https://webpack.js.org/)
- [react-hook-form](https://react-hook-form.com/)
- [yup](https://github.com/jquense/yup)
- [date-fns](https://date-fns.org/)

## Backend setup

I used serverless architecture to set up the backend. The configuration and management of the backend are done by using Amplify CLI. The business logic, when needed, is written in Node.js.

## Database and schema

Tow tables were used, `LightningTalksPoll` to store aligning talks polls, and `VotingRecord` to keep users' voting records. This is the database and schema I used for this project. It is a GraphQL schema.

```
  id: ID!
  type: String!
    @default(value: "Poll")
    @index(
      name: "lightningTalksByType"
      queryField: "getLightningTalksByType"
      sortKeyFields: ["numberOfVotes"]
    )
  title: String!
  description: String!
  username: String!
  numberOfVotes: Int! @default(value: "0")
```

```
  id: ID!
  lightningTalkPollID: ID!
  username: ID!
  upvote: Boolean @default(value: "true")
  hasVotedBefore: Boolean @default(value: "true")
```

## Deployment

AWS Amplify provides a CI/CD option to deploy the website to AWS S3 storage (website). I configured AWS Amplify CLI to deploy new updates online every time I push to the GitHub repository.

## Functions implementation

### Auth flow

I used AWS Cognito to implement user authentication. The following functions are used in the auth flow:

- Sign in
- Sign up
- Confirm sign up

Each form comes with a validation and error messages schema, using `react-hook-form` and `yup` libraries.

### Atomic update of votes counts explained

One important aspect of the app is how to handle concurrent voting. For example, what if 1000 users submitted their votes at the same time. All the votes must be counted.

For that, I used an atomic update on the backend. For more details, please refer to:

```
cd ./amplify/backend/function/updateNumberOfVotesCountAtomicallyResolver/src/index.js
```

or the following link:

[DynamoDB Atomic update](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithItems.html)

[AWS Amplify Resolver](https://docs.amplify.aws/cli-legacy/graphql-transformer/resolvers/)

## Sorting polls by number of votes explained

AWS AppSync provides a way to return sorted items. The sorting is done on the the backend. It save us time to sort the items on the frontend.

## Code writing style

I used ESLint and Prettier to enforce code writing style. Plus `imports` sorting tool. The package I used for code styling is called [@imaginary-cloud/prettier-config](https://www.npmjs.com/package/@imaginary-cloud/prettier-config). It is pre-configured and ready to use as is.

# Final notes

I didn't have a chance to work on unit testing, also I don't have much experience with unit testing, to be honest. So I decided to focus on what I know best. For the best optimal outcome.

Thank you for the opportunity, I look forward to your feedback.
