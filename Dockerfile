FROM nginx:alpine

COPY /docs/.vitepress/dist /app

COPY /config/default.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
