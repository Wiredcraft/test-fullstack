# Hacker Talks

A simple React application for submitting lightning talks.



## Requirements and running the app

To run the app locally you need Node and MongoDB installed. And also an instance of MongoDB running on your computer.



To install dependencies run the following in the root folder of the project:

```
> npm install
```



To run the app type:

```
> npm run dev
```

This will startup a server on http://localhost:3000 that connects to your local MongoDB instance via port 27017 and also serve the React app on http://localhost:3001.



## Testing the React app

Tests for the React app are written using Jest and Enzyme and you can run them with:

```
> npm test
```

