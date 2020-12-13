FROM nginx:latest
COPY public /usr/share/nginx/html
COPY conf.d /etc/nginx/conf.d