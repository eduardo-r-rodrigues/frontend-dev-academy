FROM node:22

WORKDIR /app

RUN npm install -g @angular/cli@latest
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Limpa cache antigo e reinstala corretamente
RUN rm -rf node_modules package-lock.json && npm install

CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000"]

EXPOSE 4200
