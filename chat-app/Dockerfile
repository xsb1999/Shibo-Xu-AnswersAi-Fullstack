FROM node:18-alpine

WORKDIR /app

COPY package.json /app/
COPY postcss.config.js /app/
COPY tailwind.config.js /app/
COPY src /app/src/
COPY public /app/public/

RUN npm install

CMD [ "npm", "start" ]
