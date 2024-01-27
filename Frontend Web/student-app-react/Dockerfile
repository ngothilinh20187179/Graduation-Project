FROM node:21-alpine3.18 AS base
WORKDIR /app
EXPOSE 80

FROM base as build
ENV NODE_ENV production
COPY package*.json .
RUN npm install
COPY . .
ARG REACT_APP_ENP
ENV REACT_APP_ENP=$REACT_APP_ENP
RUN npm run build

FROM base AS publish
RUN npm install -g serve
COPY --from=build /app/build .
ENTRYPOINT [ "serve", "-l", "80" ]