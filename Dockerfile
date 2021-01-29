FROM node:14.15.4-alpine AS builder
RUN apk add --no-cache git gcc make libc-dev python g++
WORKDIR /simple-blog
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
RUN cd build && yarn install --production

FROM node:14.15.4-alpine
WORKDIR /simple-blog
COPY --from=builder /simple-blog/build ./
EXPOSE 3333
CMD yarn start
