# Implementation

## Envrionment

- node v16.14.0
- npm 8.5.4

## Choice justification

1. API Data Format - in-memory DB

   For the simplicity of data stock, flat-file-db just store in the Map<meetingID: Number, meeting: Meeting>, that's why back-end api all use meetingID as the unique param, and pass other info within body.

2. Frankly speaking React and fetch are out of my confort zone, l think it's a good chance to practice.

3. Error Handling

   Due to the fetch method in front-end, it only throw the connection error, which means 4XX 5XX response will also be resolved, so back-end return status code + error info json. Front-end parse whether response has field "error" to do the following logic.

4. Logging strategies

   Lightning talk is light. So in my opinion it should be fast and easy to use. That's why has no password. But l hope this application can hold up several meetings at the same times.

   - If meetingID has existed and user has been joined into the meeting,  user just directly connected.
   - If meetingID has existed but user has not been joined into the meeting,  user will be added and connected.

   - If meetingID has not existed yet, user will be the organizer and the only one user in the newly-created meeting.

5. Input field validation

   Disable *check button* in the login page and *submit button* while adding new talk. Regex could be used in the future. MeetingID hopes to be formatted as 4bits-number string.

6. Sorry for the unit test, l have to admit that l'm not so familiar with react eco-system, so l have no time and no idea on that for right now. But l have related experience in automatic integrate test and e2e test in cypress.

## Back-end port:3001

```bash
npm i;
npm run start;
```



1. flat-file-db need a local file to persist data. Once it changes(file I/O) it will trigger nodemon watch. It leads to infinity watch...
   solution: nodemon.json -> field 'ignore'

## Front-end port:3000

```bash
npm i;
npm run start;
```



1. webpack-dev-server doesn't work
   solution: update node and npm (10.15 -> 16.14)

2. Migrate front-end into ts.

  - [x] types adding

  - [x] images module declaration "./cutom.d.ts"

  - [x] webpack config

4. React router useNavigate in class component
   wrap with a functional component...and pass navigate from props.. cons...

## Known defaults

1. front-end polling with Etag still 200 instead of 304 (issued on github)

   request from postman returns 304 correctely but front-end always 200. 

   [github issue]: https://github.com/Wiredcraft/test-fullstack/issues/70

   multiple meeting on the same time will cause back-end pressure. comet/long polling | SSE | webSocket can avoid this problem, but this project is based on restful with http 1.1

2. Router guard - If user has not logged in yet, he/she visit the */meeting* route should be redirect to homepage.

3. Webpack dev server hot reload will lost state, and not works for route.

## Todo List

1. Differ Organizer and other normal users

2. User can cancel his vote.
3. Touch existed talks
4. online/offline user may be interesting
5. etc...

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

* The frontend part should be a single page application rendered in the frontend and load data from a RESTful API \(not rendered from backend\).
* The API should follow typical RESTful API design pattern.
* Provide proper unit test.

#### Tech stack

* Use React for the frontend.
* Do not use any scaffolding tool such as `create-react-app`, or any CSS framework, but try to use some JS frameworks such as React-Router, and packing tools such as Webpack or Parcel etc.
* Prefer TypeScript related backend frameworks. Use any DB for storing the data, or if you prefer, in-memory DBs could just work.

#### Advanced requirements

_These are used for some further challenges. You can safely skip them if you are not asked to do any, but feel free to try out._

* Make it short and expressive, don't spend too much time just give it your best shot in a few hours, say, less than 3 hours if possible.
* Make it aesthetically pleasant (not complex).
* Explain  / prototype form validation, Error handling strategy, Auth, Logging strategies. Don't have to implement it if you are short on time
* Justify your choice of tech.
