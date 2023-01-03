### STAGE 1: Build ###
# FROM node:12.14-alpine AS build
# WORKDIR /usr/src/app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx-templates/nginx.conf /etc/nginx
COPY nginx-templates/app.conf /etc/nginx/conf.d
COPY dist/costEstimator /usr/share/nginx/html