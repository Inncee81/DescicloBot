FROM node:latest
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm -v
RUN node -v

RUN npm install
RUN npm ci --only=production

COPY . .

EXPOSE 8000

CMD ["npm", "run", "start"]
