FROM node:14-alpine3.14

WORKDIR /home/app
COPY . .

RUN npm i nodemon -g
RUN npm i

CMD npm start