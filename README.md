# Documentation

Welcome to the ClothesStore_KEA documentation. The application is not finished yet and is being gradually updated.

## Setup instructions

**Prerequisites**
- npm
- node.js
- mysql
- create .env file under server directory

**.env file contents**
DB={name}
DB_HOST={host} (e.g., localhost)
DB_USER={user} (e.g., admin or root, etc.)
DB_PASS={password}
DB_DIALECT={database_dialect} (e.g., mysql or postgres)

**Creating database**
1. create_clothes_store_db.sql: Contains all scripts to create new database and add a new user to it
2. populate_clothes_store_db.sql: Contains scripts to populate the database with data

**Running the app**
1. Navigate to the folder server folder
2. Run `npm install` to install all dependencies
3. Run `npm run start` to start the backend API server 
4. Navigate to http://localhost:8080 for the api (e.g. http://localhost:8080/api/users to GET all users)
5. Navigate to http://localhost:4200 for the client application
¨

**Things to note**
- Trying to sign in with a user created from the population scripts will not work due to the password hashing mechanism of the API user creation controller
- To sign in, add a new user with the Postman API testing application

**Data to use with Postman to sign in**
1. POST a new user to the API route http://localhost:8080/api/users
    {
        "role_id": 3,
        "first_name": "new",
        "last_name": "user",
        "email": "newuser@gmail.com",
        "password": "newpass"
    }
2. POST sign in credentials to sign in with the new user at http://localhost:8080/api/users/signin
    {
        "email": "newuser@gmail.com",
        "password": "newpass"
    }
