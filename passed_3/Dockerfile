ARG APP_ENV=dev

FROM node:12-alpine as base
WORKDIR /usr/src/app

FROM base as setup
COPY package*.json ./
RUN npm ci
COPY . .

FROM setup as prod-build
RUN echo "Running Prod Build!"
EXPOSE 8080
CMD ["npm", "run", "build"]
RUN echo "Prod Build - Done!"

FROM setup as dev-build
RUN echo "Running Dev Build!"
EXPOSE 3000
CMD ["npm", "start"]
RUN echo "Dev Build - Done!"

FROM ${APP_ENV}-build as final
RUN echo "All Done!"