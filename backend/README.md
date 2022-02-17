# Summary

- Hack News web app

# Preparation

## DB init

User MySQL 8+

```sql
-- create database 
CREATE DATABASE hack_news;
CREATE user 'hack_news_admin'@'%' identified BY 'hack_news2022';
GRANT ALL ON hack_news.* TO 'hack_news_admin'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

## Table schema and seed data
```bash
./init_db.sh
```

## Start serve