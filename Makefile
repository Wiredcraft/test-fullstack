BIN ?= node_modules/.bin

build:
	@$(BIN)/rollup -c

watch:
	@$(BIN)/rollup -c -w

.PHONY: build watch
