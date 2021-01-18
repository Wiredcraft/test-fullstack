# Goal

Build a Hacker News like App but for lightning talk polling。

# Getting Started

## Prerequisites

* node ^v15.5.0
* npm ^ v6.4.0
* mongoDB

## Install

`# Server Side
 cd ./server && npm install
`

`# Client Side
 cd ./client && npm install
`

## Build

`# Client Side
 cd ./client && npm build
`

## Start the Server
<!-- ## Running the tests -->

`# Server Side
 cd ./server && npm start
 # http://localhost:9000/api
`

`# Client Side
 cd ./client && npm start
 # http://localhost:3000/
`

## API list

Name        |Method| Url
------------|------|-----------------------------------------------
Base        | GET  | http://localhost:9000/api
Register    | POST | http://localhost:9000/api/register
Login       | POST | http://localhost:9000/api/login
List Page   | GET  | http://localhost:9000/api/polls
Create Poll | POST | http://localhost:9000/api/poll/create
Vote Poll   | PUT  | http://localhost:9000/api/poll/:pollId/vote

## issues

1. Need CSS decoration, using SCSS and Styled-Component
2. CORS problem
3. Adding Unit Testing (Jest)

# Achieved with

## Server

* Node.js - (Web Server)

* Express - (Web App Server)

* Passport - (Authentication)

* Mongoose / MongoDB

* JWT

## Front End

* React - (UI Framework)

* Redux / React-Redux / Redux-Saga

* Webpack - (Module Bundler)

* LocalStorage

# Author

# Test Requirements

- [x] Home (List) Page
- [x] Login/Register Page (OAuth Required)
- [x] Form Section (Combine with Home Page) (OAuth Required)
- [x] Vote a topic (OAuth Required)
- [ ] Sorting by updating/vote
- [x] A RESTful API service
- [ ] Unit Testing

##### Advanced

- [ ] Responsive Page
- [x] Form Validation Strategy
- [x] UI/UX error handling
- [x] Authentication Strategy
- [x] Logging Strategy
- [ ] \*Ranking Algorithms

# Future Improvements (if)
- [ ] Lambda Function AWS
- [ ] CDN
- [ ] Docker
- [ ] SSR
- [ ] Scaling
- [ ] SQL Efficient Pagination
