FROM elaijuh/node
ENV PROJECT_NAME manf
MAINTAINER hjl <jiale@implustech.com>

RUN mkdir /manf
WORKDIR /manf

COPY package.json yarn.lock /manf/
RUN yarn --ignore-optional && yarn cache clean

COPY . /manf

EXPOSE 8080

RUN yarn run build:client:prod
RUN yarn run build:server:prod
CMD sleep 5s && yarn run start:prod

