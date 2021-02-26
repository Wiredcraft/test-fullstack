-- create and assign privalages to dev user
-- may not work
CREATE USER 'user'@'%' IDENTIFIED BY 'password';
GRANT All PRIVILEGES ON feedx.* TO 'user'@'%';
