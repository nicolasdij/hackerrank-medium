FROM node:10.16.0-alpine

RUN apk add --no-cache --virtual .gyp python make g++ && apk del .gyp

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 2401
CMD [ "npm", "run", "start" ]