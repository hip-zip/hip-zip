# Stage 1: Build dependencies
FROM node:20-buster-slim as dependencies

WORKDIR /usr/src/app

COPY package.json .env ./

RUN yarn set version stable
RUN apt-get update
RUN apt-get install -y python3 build-essential
RUN npm install

# Stage 2: Build application
FROM node:20-alpine as builder

WORKDIR /usr/src/app

COPY . .

COPY --from=dependencies /usr/src/app/node_modules ./node_modules

RUN npm run build

# Stage 3: Final image
FROM node:20-alpine as runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/next.config.js ./next.config.js
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/.env ./.env

# Expose ports
EXPOSE 80
EXPOSE 443

CMD ["yarn", "start"]
