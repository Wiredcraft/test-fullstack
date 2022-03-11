# Introduction

This is a simple implementation of <a href="#fullstack">Lightning Talk Polling</a> for full-stack testing. The main purpose is to demonstrate the project development process and individual capabilities. As a result, details such as user experience, error handling, and testing may not be complete. But any suggestion is welcome.

More Info
- Instead of implementing a user system, the program uses a simple user field to represent users
- Unlimited click to increase the number of polls in order to test the sorting function
- The back end uses the `NestJS` framework and `SQLite` as the database

The program was tested in the following environment

- macOS Big Sur 11.2 / Ubuntu 20.04.4 LTS
- node v16.14.0
- yarn 1.22.17

### Get Started

To initialize and start the project, simply execute one command in the project root

```bash
make boot-dev
```

And wait on - until the server logs appear, then you should be able to open this address in your browser: http://localhost:3000

If there are no errors, you should see the home page of this program, which by default has no data. We can also initialize and start the project with some seed data, just use this command instead

```bash
make boot-seed-dev
```

After that, use the command below for daily development

```bash
make start-dev
```

For more commands, see the `Makefile` file in the root directory.

### Testing

In terms of testing, I did only the necessary testing required by the user story, and ideally the testing should cover all branches of logic.

To run all tests

```bash
make test
```

### Docker

Using Docker is also possible (require `docker-compose`)
```bash
# initialize and run the project in container, for dev mode only
docker-compose up
```
>  Due to docker file system conversion issue under macOS, project initialization could be slow and requires patience 😕


# Fullstack

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

#### Functionality

- The frontend part should be a single page application rendered in the frontend and load data from a RESTful API \(not rendered from backend\).
- The API should follow typical RESTful API design pattern.
- Provide proper unit test.

#### Tech stack

- Use React for the frontend.
- Do not use any scaffolding tool such as `create-react-app`, or any CSS framework, but try to use some JS frameworks such as React-Router, and packing tools such as Webpack or Parcel etc.
- Prefer TypeScript related backend frameworks. Use any DB for storing the data, or if you prefer, in-memory DBs could just work.

#### Advanced requirements

_These are used for some further challenges. You can safely skip them if you are not asked to do any, but feel free to try out._

* Make it short and expressive, don't spend too much time just give it your best shot in a few hours, say, less than 3 hours if possible.
* Make it aesthetically pleasant (not complex).
* Explain  / prototype form validation, Error handling strategy, Auth, Logging strategies. Don't have to implement it if you are short on time
* Justify your choice of tech.
