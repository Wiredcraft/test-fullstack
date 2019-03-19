BIN ?= node_modules/.bin

dev:
	@mkdir -p dist
	@cp node_modules/react/umd/react.development.js dist/react.js
	@cp node_modules/react-dom/umd/react-dom.development.js dist/react-dom.js
	@BABEL_ENV=server node server/index.js

build:
	@cp node_modules/react/umd/react.production.min.js dist/react.js
	@cp node_modules/react-dom/umd/react-dom.production.min.js dist/react-dom.js
	@NODE_ENV=production $(BIN)/rollup -c

prod_run:
	@nohup node api > api.out.log 2>api.err.log &
	@BABEL_ENV=server PORT=80 nohup node server > web.out.log 2>web.err.log &

.PHONY: dev build prod_run
