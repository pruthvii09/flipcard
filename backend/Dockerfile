FROM node:18-alpine

WORKDIR /app

COPY package*.json .
COPY prisma ./prisma/


RUN npm install

RUN npx prisma generate ./prisma/schema.prisma
COPY . .

EXPOSE 4000

CMD [ "node", "index.js" ]