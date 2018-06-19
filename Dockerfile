FROM node:alpine

EXPOSE 3000

WORKDIR /app

RUN npm install -g nodemon

# Bundle app
COPY src src/
COPY package.json .
COPY yarn.lock .

# Install app dependencies
RUN yarn install --production

CMD [ "yarn", "run", "dev"]