ARG NODE_VERSION=18.13.0
FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

WORKDIR /app

COPY . .
RUN npm install

EXPOSE 3000

CMD npm run build