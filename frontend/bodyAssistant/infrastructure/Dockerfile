FROM node:18.16.1-alpine AS builder

RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

RUN apk update && apk upgrade
RUN apk add git

COPY . /usr/src/nuxt-app/
RUN npm install
RUN npm run build

FROM node:18.16.1-alpine

RUN apk update && apk upgrade
RUN apk add --no-cache git

COPY --from=builder /usr/src/nuxt-app /usr/src/nuxt-app

WORKDIR /usr/src/nuxt-app

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "start" ]