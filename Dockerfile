FROM node:10

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

CMD [ "yarn", "start" ]