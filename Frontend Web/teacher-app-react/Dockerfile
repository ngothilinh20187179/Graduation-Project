FROM node:21-alpine3.18 AS base
WORKDIR /app
EXPOSE 80

FROM base as build
ENV NODE_ENV production
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM base AS publish
ENV NODE_ENV production
RUN npm install -g serve
COPY --from=build /app/build .
ENTRYPOINT [ "serve", "-s", ".", "-l", "80" ]
