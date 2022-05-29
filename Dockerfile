FROM node:lts-alpine

# Install bash because I like bashing into containers if I want to...
RUN apk update && apk add bash

# make the 'app' folder the current working directory
WORKDIR /app

COPY . .

RUN npm install

# build app for production with minification
RUN npm run build

EXPOSE 8080