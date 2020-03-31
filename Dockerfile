FROM node:12.16.1

# set node environment variables
ENV NODE_ENV production
ENV PORT 9000
EXPOSE 9000

# copy relevant files over to app directory
RUN mkdir /app
WORKDIR /app

COPY package-lock.json /app
COPY package.json /app

RUN npm install 

COPY . /app

RUN npm run build

CMD [ "node", "./build/index.js" ]
