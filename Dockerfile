FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-*.json ./
COPY packages ./packages
COPY plugins ./plugins
RUN rm -rf package-lock.json && rm -rf node_modules

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

EXPOSE 3000:3000

CMD ["npm", "start"]
