FROM node:latest
WORKDIR ~/proj/DescicloBot

COPY package*.json ./

RUN npm -v
RUN node -v

RUN npm install
RUN npm run start
