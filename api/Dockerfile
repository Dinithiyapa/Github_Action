FROM node:6.17.1 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install node-fetch  # Install node-fetch


COPY . .

FROM node:6.17.1

WORKDIR /app

COPY --from=build /app /app

EXPOSE 4000

CMD ["npm", "start"]

