
                                   ███▄ ▄███▓▓██   ██▓ ▄▄▄█████▓ ▄▄▄        ██████  ██ ▄█▀  ██████       ██▓ ▒█████  
                                  ▓██▒▀█▀ ██▒ ▒██  ██▒ ▓  ██▒ ▓▒▒████▄    ▒██    ▒  ██▄█▒ ▒██    ▒      ▓██▒▒██▒  ██▒
                                  ▓██    ▓██░  ▒██ ██░ ▒ ▓██░ ▒░▒██  ▀█▄  ░ ▓██▄   ▓███▄░ ░ ▓██▄        ▒██▒▒██░  ██▒
                                  ▒██    ▒██   ░ ▐██▓░ ░ ▓██▓ ░ ░██▄▄▄▄██   ▒   ██▒▓██ █▄   ▒   ██▒     ░██░▒██   ██░
                                  ▒██▒   ░██▒  ░ ██▒▓░   ▒██▒ ░  ▓█   ▓██▒▒██████▒▒▒██▒ █▄▒██████▒▒ ██▓ ░██░░ ████▓▒░
                                  ░ ▒░   ░  ░   ██▒▒▒    ▒ ░░    ▒▒   ▓▒█░▒ ▒▓▒ ▒ ░▒ ▒▒ ▓▒▒ ▒▓▒ ▒ ░ ▒▓▒ ░▓  ░ ▒░▒░▒░ 
                                  ░  ░      ░ ▓██ ░▒░      ░      ▒   ▒▒ ░░ ░▒  ░ ░░ ░▒ ▒░░ ░▒  ░ ░ ░▒   ▒ ░  ░ ▒ ▒░ 
                                  ░      ░    ▒ ▒ ░░       ░        ░   ▒   ░  ░  ░  ░ ░░ ░ ░  ░  ░   ░    ▒ ░░ ░ ░ ▒  
                                         ░    ░ ░                    ░  ░      ░  ░  ░         ░    ░   ░      ░ ░  
                                              ░ ░                                                   ░               
# Task-handler

This is a well structurized task-handling API. A new user can create his profile and login to enter all his tasks to track if completed or not.

## About The Project
1. For this API, mongodb, a type of NOSQL is used.

2. In order to maintain user data safety passwords are hashed through <i>Bcrypt's hash() function</i> and session tokens are generated with the help of <i>Jsonwebtoken</i> although there is a major drawback to it i.e once token has been alloted to user on login then the token won't be black listed unless user logs out.

3.  Once the user creates their account a mail is sent to them via SendGrid. Similar function is performed once they delete their account.

4.  Go through the [env](https://github.com/AMGOcyber123/Task-handler-API/blob/main/.env) file and accordingly configure your environment variables.

5.  Developers are expected to have an account in [SendGrid](https://app.sendgrid.com/), in order to get API key.


### A user once logins in, only then, can access their tasks and perfom all CRUD operations. 


## Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
* [Node js](https://nodejs.dev/)
* [SendGrid](https://app.sendgrid.com/)


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
   
### NPM modules used:
> Express js <br>
> Jsonwebtoken <br>
> Bcrypt <br>
> Mongoose <br>
> Sharp <br>
> DOTENV <br>
> Multer <br>
> SendGrid

Since this is a public repository, DEVS coming up with new updation or addition features to current API would be higly appreciated 😁 
