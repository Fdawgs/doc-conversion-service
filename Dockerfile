FROM node:lts

WORKDIR /usr/app
COPY package.json .
COPY yarn.lock .
COPY .env.production .
COPY ./src ./src

RUN apt-get -y update
RUN apt-get clean
RUN apt-get install poppler-data poppler-utils -y


RUN yarn install
RUN yarn docs
EXPOSE 3000
CMD ["yarn", "start"]