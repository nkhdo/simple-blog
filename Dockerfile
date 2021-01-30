FROM node:14.15.4-alpine AS builder
RUN apk add --no-cache git gcc make libc-dev python g++
RUN yarn global add node-pre-gyp
WORKDIR /simple-blog
COPY package.json yarn.lock ./
RUN yarn install
RUN yarn install --production --modules-folder ./tmp/node_modules
COPY . .
RUN yarn build
RUN mv ./tmp/node_modules ./build/

FROM node:14.15.4-alpine
WORKDIR /simple-blog
COPY --from=builder /simple-blog/build ./
EXPOSE 3333
CMD yarn start
