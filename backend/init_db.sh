#! /bin/bash

echo "initialize tables"
mysql -uroot -D hack_news < ./db/schemas/hacknews_db.sql

echo "import data"
mysql -uroot -D hack_news < ./db/schemas/seed.sql