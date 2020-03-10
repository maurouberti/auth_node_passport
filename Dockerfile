FROM node:13-alpine

WORKDIR /node-app
RUN npm install --quiet
EXPOSE 3000   
CMD ["node", "server.js"]
