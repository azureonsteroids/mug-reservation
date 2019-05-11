# build environment
FROM node:9.6.1 as builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent
COPY . /usr/src/app
EXPOSE 3000
CMD ["npm", "start"]
