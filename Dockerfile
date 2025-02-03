FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN apk add --no-cache openssl
#RUN npx prisma generate
COPY . .
CMD ["npm", "run", "dev"]