## Back-end port:3001

1. flat-file-db need a local file to persist data. Once it changes(file I/O) it will trigger nodemon watch. It leads to infinity watch...
solution: nodemon.json -> field 'ignore'

2. For the simplicity of data stock, flat-file-db just store in the Map<meetingID: Number, meeting: Meeting>, that's why back-end api all use meetingID as the unique param, and pass other info within body.

## Front-end port:3000

1. webpack-dev-server not works
solution: update node and npm (10.15 -> 16.14)

2. Why not use .ts in front-end?
for saving time and avoiding the risk of compability with react eco-system. (Yes, l mean vue, vuex, vuetify etc...)

3. Migrate front-end into ts.....Fine, l fell into the habit of typescript so l compromised.

  - [ ] types adding

  - [ ] images module declaration "./cutom.d.ts"

  - [x] webpack config

4. React router useNavigate in class component
  wrap with a functional component...and pass navigate from props.. cons!

## Known defaults

1. front-end polling with Etag still 200 instead of 304 (issued on my github)

   request from postman returns 304 correctely but front-end always 200. 

   []: https://github.com/Wiredcraft/test-fullstack/issues/70	"github issue"

   multiple meeting on the same time will cause back-end pressure. comet/long polling | SSE | webSocket can avoid this problem.

2. lacks of auth security

3. Router guard - If user has not logged in yet, he/she visit the /meeting route should be redirect to homepage.

4. Webpack dev server hot reload will lost state, and not works for route.

## Todo List

1. Differ Organizer and other normal users

2. User can cancel his vote.
3. Touch existed talks
4. online/offline user may be interesting
5. etc...

## Choice justification

1. API Data Format

   As mentioned above in the Back-end point 2, meetingID is necessary, once create and update success, return updated meeting.

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

