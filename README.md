# Contrived Web Application for Wiredcraft Full-stack Developer Test

Live demo available at [45.76.253.20](http://45.76.253.20).

## Install on Local Machine

### Prerequisites

- Not a too old version of Node.js which already implemented the `Object Rest/Spread Properties` proposal;
- PostgreSQL version >= 9, installation guide see below;
- Of course clone the repo and run `npm install` first.

### Init Database

```
$ psql -f api/definition.sql
```

### Run API Server

```
$ node api
```

It will print information about how to access it.

### Run Development Web Server

```
$ make dev
```

It will:
- Copy required vendor scripts to `dist/` directory;
- Start a Node.js server for server side rendering (React SSR) which can hot reload itself when any dependencies in `src` directory changes;
- Start `rollup.watch` to build assets required by client to `dist/` dir and auto rebuild them.

Pay attention to its stdout for better use of it.

## PostgreSQL Installation Guide

On latest MacOS:

```
$ brew update
$ brew install postgresql
```

You will have a `postgres` command to start the PostgreSQL server. It must know where to find the data directory it is supposed to use. This is done with the -D option:

```
$ postgres -D /usr/local/var/postgres
```

which is the default path where Homebrew has automatically created the data directory for you.

You can then use `psql` interactive tool to access and manage your database.

NOTE: All default values including those the Node.js PostgreSQL driver (npm: `pg`) is using should **just work** when nothing is changed. If you have more specific requirements (e.g. your machine already have a PostgreSQL database in other use), you have to resolve them on your own.
