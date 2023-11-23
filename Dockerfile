# Docker para desarrollo
FROM node:21.1.0-alpine

ENV MONGO_URL mongodb://host.docker.internal/Levels
ENV AUTH_SERVICE_URL http://host.docker.internal:3000

ENV RABBIT_URL amqp://host.docker.internal

WORKDIR /app

# Puerto  Cart Service
EXPOSE 3003

CMD npm install && npm start
