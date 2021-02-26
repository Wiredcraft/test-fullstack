-- create db
-- may not work
CREATE DATABASE dbname
    WITH 
    OWNER = touch_me_not
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
