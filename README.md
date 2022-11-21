# Introduction

A simple implementation of Lightning Talk Polling for full-stack testing. 
Each people can only poll once though sessionId

# Info
- Framework:  React + Nest .
- Datsebase: MySql+ Redis. Mysql can structured query easily, such as orderBy date. Use Redis to save polling count that can avoid concurrency request problem, prevent repeated polling. And redis is easy to expand some feature like "hottest K" ;
- Use `yarn worksapce to mangage`


# Envirment
- macOS / windows 10
- node v16.14
- yarn v1.22.19


# How to start
Just run below nn the root folder.
- make sure install dependencies
```
yarn
```

- Use docker to start database

```
docker-compose -f dev-docker-compose.yml up -d --build
```

- init datebase schema
```
yarn workspace server db:init
```
- start local dev
```
yarn start:dev
```

# Testing
Only did service test, ideally could add some front-end testing.
```
yarn workspace server test
``` 

# Need to Improve
- talk detail page
- add pagination 
- use less or cssMoule to manage css namespace and common style
- need scheduled task to save Redis data into MySql, keep data consistency
- handle deploy 
- people can clear cookie to poll many times, so need add auth system
