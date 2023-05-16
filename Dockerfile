FROM node:lts-alpine

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home

WORKDIR /home/node/api

COPY package.json yarn.* ./

USER node

RUN yarn install

COPY --chown=node:node . .

RUN yarn build

RUN yarn prisma generate

EXPOSE 3000

CMD [ "yarn", "start" ]