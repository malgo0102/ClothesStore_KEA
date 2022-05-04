# Documentation

Welcome to the ClothesStore_KEA documentation. The application is not finished yet and is being gradually updated.

## Setup instructions

**Prerequisites**
- npm
- node.js
- mysql
- create .env file under server directory

**.env file contents**
- DB={name}
- DB_HOST={host} (e.g., localhost)
- DB_USER={user} (e.g., admin or root, etc.)
- DB_PASS={password}
- DB_DIALECT={database_dialect} (e.g., mysql or postgres)
- PORT={port} (e.g. we use 8080)

**Creating database**
1. 001_create_clothes_store_db.sql: Contains all scripts to create new database and add a new user to it
2. 002_create_clothes_store_triggers.sql: Contains scripts to create triggers for database tables
3. 003_populate_clothes_store_db.sql: Contains scripts to populate the database with data
4. 004_reset_clothes_store_db.sql: Contains scripts to delete db content and repopulate it

**Running the app**
1. Navigate to the folder server folder
2. Run `npm install` to install all dependencies
3. Run `npm run start` to start the backend API server 
4. Navigate to http://localhost:8080 for the api (e.g. http://localhost:8080/api/users to GET all users)
5. Navigate to http://localhost:4200 for the client application

**Testing the API**
1. Navigate to http://localhost:8080/api-docs
2. Use the Swagger API development tool to test the API CRUD endpoints

**Sign in - things to note**\
To sign in after the database was populated use credentials:  
- sign in as ADMIN with rights to do all operations (role ID 1)\
    email: jamesjimick@mystore.com 
    password: JaJiPass
- sign in as EMPLOYEE (role ID 2)\
    email: bobbayes@mystore.com
    password: BoBaPass
- sign in as CUSTOMER (role ID 3)\
    email: jamiejoe@mystore.com
    password: JaJo
- To sign up, add a new user with Swagger or Postman API testing application

**Data to use with Postman to sign up as a CUSTOMER**
1. POST a new user to the API route http://localhost:8080/api/users
    - {
        "role_id": 3,
        "first_name": "new",
        "last_name": "user",
        "email": "newuser@email.com",
        "password": "newpass"
       }
    
2. POST sign in credentials to sign in with the new user at http://localhost:8080/api/users/signin
    - {
        "email": "newuser@email.com",
        "password": "newpass"
       }   
