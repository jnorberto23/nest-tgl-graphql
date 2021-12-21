FROM node:16-alpine

WORKDIR /usr/tgl/

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start:dev"]