# API Documentation

####  Backend delpoyed at [🚫name service here](🚫add URL here) <br>

## Getting started

To get the server running locally:


- Clone this repo
- **yarn install** to install all required dependencies
- **yarn start** to start the local server
- **knex migrate:latest --env=testing** To set up the testing database.
- **yarn test** to start server using testing environment
- **yarn knex migrate:latest** to create the tabes in the dev environment
- **yarn knex seed:run** to clear the DB and populate it with seed data **** Password for all seed users is "password" ****


### Backend framework goes here

🚫 Why did you choose this framework?

-    We chose Express because it is fast an un-opinionated.  
-    Knex is just simple to use. It has good documentation for both SQLite and Postgresql. 
-    Axios is easy to use. It supports Promises. 

##  Endpoints


#### Auth Routes

| Method | Endpoint               | Access Control | Description                                  |
| ------ | ---------------------- | -------------- | -------------------------------------------- |
| POST   | `/api/auth/register`   | all users      | Takes in a JSON with username and password keys. Returns a JSON Web Token (string) as res.token |
| POST   | `/api/auth/login`      | all users      | Modify an existing organization.             |

#### User Routes

| Method | Endpoint             | Access Control | Description                                                                  |
| ------ | -------------------- | -------------- | ---------------------------------------------------------------------------- |
| GET    | `/api/users/session` | all users      | Returns info for the logged in user.                                         |
| PUT    | `/api/users/`        | all users      | Takes in a JSON like this: { username: "newName" } and updates the username. |
| DELETE | `/api/users/`        | all users      | Deletes the logged in user.                                                  |

#### Location Routes

| Method | Endpoint               | Access Control | Description                                                                                                                            |
| ------ | ---------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/locations/`      | all users      | Returns a list of locations for the logged in user.                                                                                    |
| POST   | `/api/locations/`      | all users      | Takes in a JSON with "latitude", "longitude", "address", and a FOREIGN KEY called "user_id" and adds a location to the logged in user. |
| PUT    | `/api/locations/:id`   | all users      | Updates the location with the ID provided (only if the user owns that location)                                                        |
| DELETE | `/api/locations/:id`   | all users      | Deletes the location with the ID provided (only if the user owns that location)                                                        |

# Data Model


#### Users

---

```
{
  id: UUID
  username: STRING
  password: STRING 
  cellphone: INTEGER
  receive_sms: BOOLEAN
  receive_push: BOOLEAN
}
```

#### Locations

---

```
{
  latitude: FLOAT
  longitued: FLOAT
  address: STRING
  address_label: STRING
  radius: INTEGER
  last_alert: INTEGER
  notification_timer: INTEGER
  
}
```
#### Notifications

```
{
type: STRING
subscriptions: TEXT
}
```
## Actions


### Users
`find()` -> Returns all users. *Not really used in this application*

`findBy(filter)` -> Returns a single user by the passed in filter.

`add(user)` -> Adds a new user. Returns the ID of the created user.

`findById(id)` -> Returns the user with the matching ID.

`remove(id)` -> Delete a user by ID. *Not used in this application*

`update(id, changes)` -> Updates user based on passed in `changes`. Returns the user with the changes.
<br>
<br>
<br>

### Locations

`find()` -> Returns locations filtered by ID and address.

`findAll()` -> Returns Users, their IDs and their Locatations.

`findBy(filter)` -> Returns locations based on the passed in filter.

`add(location)` -> Adds a location. Returns the new location's ID.

`findById(id)` -> Returns a location based on the passed in ID.

`remove(id)` -> Removes locatoin based in the passed in ID Returns the number of locations deleted.

`update(id, changes)` -> Updates the location based on the passed in ID. Returns the location with the changes.

<br>
<br>
<br>


### Push notifications
`find()` -> returns all notifications filtered by ID and  subscriptions.

`findBy(filter)` -> returns notifications based on the passed in filter.

`findBy(filter)` -> returns notifications based on the passed in filter.

##  Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:
    
    *  NODE_ENV - set to "development" until ready for "production"
    *  TWILIO_ID - This app uses twillio to send text messages. You can get your own keys by going to [Twillio.com](https://twilio.com)
    *  TWILIO_AUTH -  see above.
    *  VAPID_PRIVATE - `yarn global add web-push` then `web-push generate-vapid-keys`
    *  VAPID_PUBLIC - see above
    *  GEO_CODE_KEY - To get your own Geocode keys go to [opencagedata](https://opencagedata.com/users/sign_up)
    *  JWT_SECRET - "Fireflight Secret"  This is a terrible secret. Also, we should use a third-party auth library.*
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.
