FROM node:20.11.1-alpine

WORKDIR /app-pap-backend

COPY package* .

RUN npm install

COPY . . 

ENTRYPOINT [ "npm" , "run"]

CMD [ "dev" ]