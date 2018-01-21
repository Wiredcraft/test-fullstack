# Hacker Talks

Simple app enabling viewing a list of lightning talks, adding to it and upvoting talks

Online demo: https://hacker-talks.herokuapp.com/ //TODO: enable data update

## Getting Started

To get your copy of the project and have it up and running follow the installing instruction

### Installing

Clone the repository

```
git clone https://github.com/natvet/test-fullstack.git
```

In the root directory install dependencies

```
npm install
```

Navigate to the client catalogue and install dependencies

```
cd client
npm install
```

To run the code for developement navigate to the root directory and use npm run dev script.

```
npm run dev
```

Great! The app is up and running on port 

To build static files run npm run build inside client catalogue

```
npm run build
```

## API Reference

API returns JSON format data

Available endpoints:

```
GET /api/talks
POST /api/new
POST /api/upvote
```

## Built With

* React
* Redux
* Express
* Axios
* Sass
* Bootstraped with [Create React App](https://github.com/facebookincubator/create-react-app)

Enjoy!