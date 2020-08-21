FROM nginx:mainline-alpine

WORKDIR /usr/share/nginx/html

COPY ./dist .

EXPOSE 80