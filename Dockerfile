FROM node:alpine

WORKDIR /app

# Copiar os arquivos de instalação
# COPY package.json .
# COPY package-lock.json .
COPY package*.json ./

RUN npm install

# Copiar os arquivos .ts
COPY . .

EXPOSE 3333
# Comando que vai rodar o nosso programa
# ENTRYPOINT [ "echo", "Revisao backend" ]
CMD [ "npm", "run", "start:dev" ]