This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# API Total Recall

## Description

This is an API with NextJS, TypeScript on a MangoDB database managed with Prisma.

## Requirement

To run this API we need to have :
* Docker installed

## Configure the project
* Clone this repo and go to the folder
* add a **.env** file with your environement variables
```
DATABASE_URL="mongodb://mongo:27017/<yourDatabase>" 
PRISMA_STUDIO_PORT=5555 #or other

AUTH_URL='http://localhost:3000/api/auth'

```
* Run docker compose up --build -d
* Configure Mongo container :
    * Go to the mongo container : ```docker exec -it mongo mongosh```
    * ```rs.initiate()```
    * To configure the host : ```rs.reconfig({ _id: 'rs0', members: [ { _id: 0, host: 'mongo:27017' }] }, { force: true });```
    * To show the config ```rs.status()```
    * Exit the container ```exit```


### Commands to test MongoDB database
```
docker exec -it mongo mongosh

rs.initiate()
rs.reconfig({ _id: 'rs0', members: [ { _id: 0, host: 'mongo:27017' }] }, { force: true });
rs.status()

use <DBName>
show collections
db.<collections>.find().pretty()
```

### Edit your 

## Run the project

```
docker compose up -d
```
Go to :
* http://localhost:3000/ 
* http://localhost:5555/ to see Prisma Studio collections

## Other dependencies
### Swagger
On this project Swagger is implement with Postman routes

To have a documentation : 
* Add all your routes in a Postman collection
* Clic on °°° (view more action) and Export
* Export your collection as json file
* Go to https://metamug.com/util/postman-to-swagger/ and paste your code
* Copy Swagger(Open AI) code
* Paste in \public\swagger.yaml

You can see your Swagger doc on this url : http://localhost:3000/doc

### Auth.js

To test protected routes
* Go on a protected route (http://localhost:3000/api/v1/stations for exemple)
* You have a error	"Unauthorized"
* Add an user in Prisma Studio
* Go to http://localhost:3000/api/auth/signin and sign in
* Go back on your protected route, the access is ok 

### Zod
Zod is configured only with the register route : POST /api/v1/users

and only with email and password for the moment

### bcryptjs
bcryptjs is use to hash password in database