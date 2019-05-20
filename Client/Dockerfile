# build environment
FROM node:9.6.1
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent
COPY . /usr/src/app
RUN chmod 755 env2js.sh
RUN chmod 755 docker-start.sh
EXPOSE 3000
CMD ["./docker-start.sh"]
