FROM node:lts

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

RUN groupadd -r appgroup && useradd -r -g appgroup appuser
WORKDIR /usr/app
RUN mkdir logs && chown -R appuser:appgroup logs
COPY package.json .
COPY yarn.lock .
COPY .env.${NODE_ENV} .
COPY ./src ./src
RUN mkdir ./src/server/temp/ && chown -R appuser:appgroup ./src/server/temp/

RUN apt-get -y update
RUN apt-get clean
RUN apt-get install poppler-data poppler-utils -y

RUN if [ "${NODE_ENV}" = "production" ] ; then yarn install --production ; else yarn install ; fi && yarn cache clean
RUN yarn docs
USER appuser
CMD ["yarn", "start"]