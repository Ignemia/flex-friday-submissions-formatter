FROM node:21.1-alpine3.17

WORKDIR /usr/temp/build/

COPY . ./

RUN ["yarn", "install"]

CMD ["yarn", "build"]
