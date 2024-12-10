FROM node:16 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install node-fetch  # Install node-fetch

COPY . .

FROM node:16

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

CMD ["npm", "start"]
