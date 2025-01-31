FROM node:20.6.1

WORKDIR /usr/src/app
COPY client/package*.json ./

RUN rm -rf node_modules && npm install

COPY client/ .
EXPOSE 5173

CMD ["sh", "-c", "if [ \"$APP_ENV\" = \"development\" ]; then npm run dev; else npm run build; fi"]