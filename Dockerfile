FROM node
WORKDIR /app
COPY ./app/package.json /app
RUN npm install --build-from-source bcryptjs
COPY ./app /app
CMD ["node", "app.js"]