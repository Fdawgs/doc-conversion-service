FROM node:lts-alpine

WORKDIR /usr/app
COPY package.json .
COPY yarn.lock .
COPY .env.production .
COPY ./src ./src

RUN yarn install
RUN yarn docs
EXPOSE 3000
CMD ["yarn", "start"]