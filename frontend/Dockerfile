FROM node:latest as build-stage
WORKDIR /home/movie-time
COPY package*.json ./
RUN npm install

FROM nginx:1.21-alpine as production-stage
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
