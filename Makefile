BIN ?= node_modules/.bin

build:
	@mkdir -p dist
	@cp node_modules/react/umd/react.development.js dist/react.js
	@cp node_modules/react-dom/umd/react-dom.development.js dist/react-dom.js
	@$(BIN)/rollup -c

watch:
	@$(BIN)/rollup -c -w

production:
	@cp node_modules/react/umd/react.production.min.js dist/react.js
	@cp node_modules/react-dom/umd/react-dom.production.min.js dist/react-dom.js
	@NODE_ENV=production $(BIN)/rollup -c

.PHONY: build watch production
