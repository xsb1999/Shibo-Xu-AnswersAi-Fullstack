FROM node:18-alpine

WORKDIR /app

COPY package.json /app/
COPY server.js /app/
COPY routes /app/routes/
COPY models /app/models/
COPY middleware /app/middleware/

RUN npm install

CMD [ "node", "server.js" ]
