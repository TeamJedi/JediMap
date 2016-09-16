all: node_modules/.bin
	@echo "Now look at the Makefile in the src/ folder for the build targets"

node_modules/.bin:
	npm config set loglevel http
	npm install
