FROM mhart/alpine-node:10

WORKDIR /app

COPY package.json .

RUN apk add --no-cache make gcc g++ python

RUN yarn

COPY . .

CMD [ "yarn", "start" ]