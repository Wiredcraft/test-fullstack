# Light Talks

## Intro
Front-end tech stack: React.js + Redux.js + Typescript

API: Koa.js + SQLite3 + Knex.js

### Prerequisite
Node.js version 8+

Install npm packages for our front-end, in your command line tool run:  **yarn**

Install npm packages for our api server, command `cd src/api` then `yarn`
For database, I used the SQLite since this is just a small project, I have already initialized the database which its directory is in `/api/data`,  there are some test data.

If you want a clean database, please just delete this database file `dev.sqlite3`, then in your command line run `npm run db:migrate`

### Start front-end dev server
Just in root directory of the project run `gulp` (make sure you have gulp-cli installed globally)

### Start API server
Enter /src/api directory, run `npm run start`. If you have nodemon installed globally and  you can also try `npm run dev` which will automatically restart when there is a change.

### Testing for front-end
In root directory run command `npm run test`, Since a full coverage will take too much time so for this example I only wrote test units mainly for components and utilitiy.

#### Issues
Please contact me if you have any problems to start the server or some other difficulties
