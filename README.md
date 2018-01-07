# Wiredcraft Full-stack Developer test

## Old README

Old [README is there](SUBJECT.md) with an additional entry for this specific test.

## Specific notes

* Use React for frontend.
* Use any Node.js framework for backend, and any NoSQL DB.
* Please fork and send us a Pull Request.
* For any question please ask on Github or send an email.

## Environment

This has been developed under this environment:
* OS: Linux Mint 16
* NodeJS: v6.10.2
* MongoDB: v3.6.1

## Installation

1. After checkout of the sources, install dependencies using npm: 

`npm install`

2. If is possible to add some test data by running:

`nodejs addtestdata.js`

3. Start the server: 

`nodejs server.js`

4. Server listens on port 3001. Visit `http://localhost:3001`

## Development

Frontend is developed in LESS and JSX. To update the assets (Javascript and CSS), run:

`nodejs compile.js`