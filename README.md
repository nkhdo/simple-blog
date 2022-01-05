# simple-blog
A simple and lightweight blog engine. [Demo](https://realhuy.com/blog)

## Prerequisite
You will need
- `nodejs` (version 14 recommended)
- `yarn`

## Getting started
- Clone this repo
```bash
git clone git@github.com:nkhdo/simple-blog.git
```
- Setup dependencies
```bash
yarn install
```
- Copy `.env` file
```bash
cp .env.example .env
```
- Generate `APP_KEY` and set it inside `.env` file
```bash
node ace generate:key
```
- Run database migrations
```bash
node ace migration:run
```
- Run database seeds
```bash
node ace db:seed
```

## Development
- Start dev server
```bash
yarn dev
```
- Play around with the code

## Production
The fastest way is use [docker-compose](https://docs.docker.com/compose/)
```bash
docker-compose up
```
**Notes**: remember to set `NODE_ENV` to `production` before starting a production instance
