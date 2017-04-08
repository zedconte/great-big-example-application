FROM dancancro/node
ENV PROJECT_NAME manf
MAINTAINER dan <dan.cancro@gmail.com>

RUN mkdir /manf
WORKDIR /manf

COPY package.json yarn.lock /manf/
RUN yarn --ignore-optional && yarn cache clean

EXPOSE 3130

CMD yarn run start:hmr
