FROM node:lts

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

# Update and upgrade packages, and install poppler dependencies
RUN apt-get -q update && \
    apt-get -qy dist-upgrade && \
    apt-get clean && \
    apt-get install poppler-data poppler-utils -y

# Create unprivileged user to run app and prevent
# privilege escalation attacks
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

WORKDIR /usr/app
RUN mkdir logs && chown -R appuser:appgroup logs
COPY package.json .
COPY yarn.lock .
COPY .env.${NODE_ENV} .
COPY ./src ./src
RUN mkdir ./src/server/temp/ && chown -R appuser:appgroup ./src/server/temp/

RUN if [ "${NODE_ENV}" = "production" ] ; then yarn install --production ; else yarn install ; fi && yarn cache clean
RUN yarn docs
USER appuser
CMD ["yarn", "start"]