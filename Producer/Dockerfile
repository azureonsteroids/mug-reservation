FROM node:10.15.3-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install --silent

# Bundle app source
COPY . /usr/src/app/

EXPOSE  8002
CMD ["npm", "start"]