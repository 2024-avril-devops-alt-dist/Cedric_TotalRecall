This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# API Total Recall

## Description

This is an API with NextJS, TypeScript on a MangoDB database managed with Prisma.

## Requirement

To run this API we need to have :
* Docker installed

## Run the project
* Clone this repo and go to the folder
* Run docker compose up --build -d
* Configure Mongo container :
    * Go to the mongo container : ```docker exec -it mongo mongosh```
    * ```rs.initiate()```
    * To configure the host : ```rs.reconfig({ _id: 'rs0', members: [ { _id: 0, host: 'mongo:27017' }] }, { force: true });```
    * To show the config ```rs.status()```
    * Exit the container ```exit```


## test commands
docker exec -it mongo mongosh
rs.initiate()
rs.reconfig({ _id: 'rs0', members: [ { _id: 0, host: 'mongo:27017' }] }, { force: true });
rs.status()



use totalRecall
show collections
db.station.insertMany([{ name: 'Mars' }]);
db.users.insertMany([{ mail: 'ced@ced.fr' }]);
db.users.find().pretty()

Corriger 
failed to solve: failed to prepare  xxx as xxx: max depth exceeded --> a tester :
docker builder prune