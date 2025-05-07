FROM node:22

WORKDIR /app

RUN npm install -g @angular/cli@latest
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000"]

EXPOSE 4200
