FROM node:18-alpine AS base

RUN npm install -g pnpm
RUN npm install -g @angular/cli

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]