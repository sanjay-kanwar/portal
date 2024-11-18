FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-*.json ./

RUN rm -rf package-lock.json && rm -rf node_modules

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000:3000

CMD ["npm", "dev", "--", "scope", "app"]
