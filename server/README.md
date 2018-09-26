## Prerequisite
* Install NodeJS LTS version(current is v8.12.0)
* Install and run MongoDB(v3.6.3)


## MongoDB
Insure MongoDB is running, create specific user and compound index for UpRecord collection

```shell
mongo> use admin
mongo> db.auth('<admin-username>', '<admin-password'>)
mongo> db.createUser({ user: 'pns', pwd: 'badpwd', roles:[{ role: "readWrite", db: "pns" }] })
mongo> use pns
mongo> db.UpRecord.createIndex({ userId: 1, lightningTalkId: 1 }, { unique: true })
```


## API Service
```shell
$ cd server && npm install

# Creating MongoDB collections for built-in models
$ cd server && node create-lb-tables.js

# run server
$ node .
```


