# FullStackTest - Lightning Talk Polling APP
Author: Mark Ma

## QuickStart
1. I used EggJS framework for backend and use MySQL/MariaDB. Please install it and import the database from the directory: `/DB/lighting_talk.sql`, and run `npm i` to initial the required modules.
2. Edit the configuration files:
    /config/config.local.js (For Development)
	/config/config.prod.js (For Depoly)
	In them, please make sure the DB's name/host/username/password are the same as what you installed
	If you want to change the web service's listening port, please edit the file /config/config.default.js and you can find it.
3. The React Source directory is /app/public/reactAppSrc
4. Please use `$npm run build` command to generate package file for the React by Webpack 
5. Finally, you can run it use the command  `npm run dev` (development mode) or `npm start`

### Development

```bash
$ npm i
$ npm run build
$ npm run dev
$ open http://localhost:8080/ or http://127.0.0.1:8080/
```

### Deploy

```bash
$ npm i
$ npm run build
$ npm start/stop (Make Start or Stop)
$ open http://localhost:8080/ or http://127.0.0.1:8080/
```

### npm scripts

- Use `npm run build` to use Webpack.
- Use `npm run dev` to run the system with development mode
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.
