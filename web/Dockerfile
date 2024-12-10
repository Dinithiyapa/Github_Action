FROM node:16 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:16

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

CMD ["npm", "start"]
