FROM npm
RUN npm -v
RUN node -v

RUN npm install
RUN npm run start