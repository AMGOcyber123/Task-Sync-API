# Task-handler

This is a well structurized task-handling API. A new user can create his profile and login to enter all his tasks to track if completed or not.


## Installation
````npm install ````
### Npm modules used:
> Express js <br>
> Jsonwebtoken <br>
> Bcrypt <br>
> Mongoose <br>
> Sharp <br>
> DOTENV <br>
> Multer

For this API, mongodb, a type of NOSQL is used and a default database connection link is already present unless, you have your personal connection link for the database.

In order to maintain user data safety passwords are hashed through <i>Bcrypt's hash() function</i> and session tokens are generated with the help of <i>Jsonwebtoken</i> although there is a major drawback to it i.e a system of access token and refresh token hasnt been employeed yet, gradually they will be put to use.

A user once logins in only then can access their tasks and perfom all CRUD operations. These operations can even be performed on user data. Once the user logs out tokens expire and are deleted.
