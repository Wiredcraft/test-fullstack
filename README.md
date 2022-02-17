# Summary

- Hack News web app

# Todo
> Base requirements
- [x] Can submit topic, ordered by rating
- [x] Encourage the users to submit their own talks,if there's no lighting talk yet.
- [x] Can vote ,and rerender talk list.
- [x] Uses can submit new lighting talks anytime.
- [x] System should also save the submit time and user.

> Advanced  
- [ ] Responsive
- [x] Validation (Both frontend and backend)
- [x] Error Handing
- [x] Authentication (JWT Base)
- [x] Logging (AWS logging strategy)


# About Frontend
## Install dependancy and start serve
```bash
yarn install
yarn serve
```



# About Backend

## DB init

User MySQL 8+

```sql
-- create database 
CREATE DATABASE hack_news;
CREATE user 'hack_news_admin'@'%' identified BY 'hack_news2022';
GRANT ALL ON hack_news.* TO 'hack_news_admin'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

## Table schema and import seed data
```bash
cd ./backend
./init_db.sh
```

## Install dependancy and start serve
```bash
cd ./backend
go mod tidy -compat=1.17
go run main.go
```

## Test
```bash
cd ./backend
./run_test.sh

# the coverage report will output under ./coverage
```
