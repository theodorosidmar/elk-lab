FROM node:8.7.0-alpine

ENV WORKDIR /app

WORKDIR ${WORKDIR}

COPY package.json ${WORKDIR}
COPY package-lock.json ${WORKDIR}

RUN npm install --production --silent --progress=false

COPY . ${WORKDIR}

CMD ["npm", "start"]