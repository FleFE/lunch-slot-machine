FROM node:14-alpine AS build-container
WORKDIR /app
COPY package.json yarn.lock ./
RUN npm i yarn -g --force
RUN yarn install
COPY . .
RUN yarn build


FROM node:14-alpine
WORKDIR /app
COPY package.json next.config.js ./
COPY --from=build-container /app/node_modules ./node_modules/
COPY --from=build-container /app/.next ./.next/
CMD ["npm", "run", "start"]
EXPOSE 3000