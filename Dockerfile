FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npx prisma generate
COPY . /app
CMD ["npm", "run", "dev"]