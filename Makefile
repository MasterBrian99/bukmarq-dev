BINARY_NAME=bukmarq
export GO111MODULE=on

.DEFAULT_GOAL := build

.PHONY: init-client
init-client:
	
	@echo "> Installing the client dependencies ..."
	@cd frontend && npm install

.PHONY: init-server
init-server:
	@echo "> Installing the server dependencies ..."
	@go mod tidy -v
	@go get -v ./...

.PHONY: build-client
build-client:
	@echo "> Building the client ..."
	@cd frontend && npm run build


.PHONY: build-server
build-server:
	@echo "> Building the server binary ..."
	@rm -rf bin && go build -o bin/${BINARY_NAME} .


.PHONY: dev-server
dev-server:
	nodemon --exec go run main.go --signal SIGTERM


.PHONY: dev-client
dev-client:
	@cd frontend && npm run dev


.PHONY: build
build: build-client build-server