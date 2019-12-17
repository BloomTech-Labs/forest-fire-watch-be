# Wildfire Watch - API Documentation

You can find the deployed project at [wildfirewatchapp.com](https://wildfirewatchapp.com/).

The backend is deployed at [Heroku](https://wildfire-watch.herokuapp.com/) <br>

## Getting started

To get the server running locally:

- Clone this repo
- **yarn install** to install all required dependencies
- **yarn start** to start the local server
- **knex migrate:latest --env=testing** To set up the testing database.
- **yarn test** to start server using testing environment
- **yarn knex migrate:latest** to create the tabes in the dev environment
- **yarn knex seed:run** to clear the DB and populate it with seed data \***\* Password for all seed users is "password" \*\***

## Tech Stack

### Backend built using:

- NodeJS
- ExpressJS - fast and un-opinionated
- Twilio
- Firebase: used for front-end for authentication and upon successful login/register, backend is passed a UID associated with that user which then generates a JSON Web Token
- KnexJS: management of database structure
- JWT: handling authorizations
- PostgreSQL
- Axios

## Dependencies

```
  apn: ^2.2.0,
  axios: ^0.19.0,
  bcryptjs: ^2.4.3,
  child_process: ^1.0.2,
  circular-json: ^0.5.9,
  cors: ^2.8.5,
  cross-env: ^5.2.0,
  dotenv: ^8.0.0,
  express: ^4.17.1,
  helmet: ^3.20.0,
  heroku: ^7.33.3,
  jest: ^24.8.0,
  jsonwebtoken: ^8.5.1,
  knex: ^0.19.2,
  knex-cleaner: ^1.3.0,
  node-cron: ^2.0.3,
  pg: ^7.12.1,
  request-ip: ^2.1.3,
  sqlite3: ^4.1.0,
  supertest: "^4.0.2,
  twilio: ^3.34.0,
  validator: ^11.1.0,
  web-push: ^3.3.5"
```

Dev-depencies:

```
nodemon: ^1.19.1
```

## Endpoints

#### Auth Routes

| Method | Endpoint             | Access Control | Description                                                                                       |
| ------ | -------------------- | -------------- | ------------------------------------------------------------------------------------------------- |
| POST   | `/api/auth/register` | all users      | Takes in a JSON with email and password keys. Returns a JSON Web Token (string) as res.token      |
| POST   | `/api/auth/login`    | all users      | Generates and returns a token that will be used for all future calls that require authentication. |

#### User Routes

| Method | Endpoint                | Access Control | Description                                                                  |
| ------ | ----------------------- | -------------- | ---------------------------------------------------------------------------- |
| GET    | `/api/users/session`    | all users      | Returns info for the logged in user.                                         |
| PUT    | `/api/users/`           | all users      | Takes in a JSON like this: { username: "newName" } and updates the username. |
| DELETE | `/api/users/`           | all users      | Deletes the logged in user.                                                  |
| PUT    | `/api/users/update/:id` | signed in      | Updates the requested user associated with the ID                            |
| GET    | `/api/users/ip-address` | all users      | Takes the clients IP and returns the location data associated with it        |

#### Location Routes

| Method | Endpoint             | Access Control | Description                                                                                                                            |
| ------ | -------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/locations/`    | all users      | Returns a list of locations for the logged in user.                                                                                    |
| POST   | `/api/locations/`    | all users      | Takes in a JSON with "latitude", "longitude", "address", and a FOREIGN KEY called "user_id" and adds a location to the logged in user. |
| PUT    | `/api/locations/:id` | all users      | Updates the location with the ID provided (only if the user owns that location).                                                       |
| DELETE | `/api/locations/:id` | all users      | Deletes the location with the ID provided (only if the user owns that location).                                                       |

# Data Model

#### Users

---

```
{
  id: UUID
  first_name: STRING
  last_name: STRING
  email: STRING
  cell_number: INTEGER
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
  notifications: BOOLEAN

}
```

#### Notifications

```
{
type: STRING
subscription: TEXT
}
```

## Actions

### Users

`find()` -> Returns all users. _Not really used in this application_

`findBy(filter)` -> Returns a single user by the passed in filter.

`add(user)` -> Adds a new user. Returns the ID of the created user.

`findById(id)` -> Returns the user with the matching ID.

`remove(id)` -> Delete a user by ID. _Not used in this application_

`update(id, changes)` -> Updates user based on passed in `changes`. Returns the user with the changes.

`updateEmail(UID, changes)` -> Finds the user based on UID and updates the user's email based on passed in `changes`. Returns the user with the changes.
<br>

### Locations

`find()` -> Returns locations filtered by ID and address.

`findAll()` -> Returns Locations and the user's preferences.

`findBy(filter)` -> Returns locations based on the passed in filter.

`findByNotif(filter)` -> Returns Locations and the user's preferences based on the passed in filter.

`add(location)` -> Adds a location. Returns the new location's ID.

`findById(id)` -> Returns a location based on the passed in ID.

`remove(id)` -> Removes location based on the passed in ID. Returns the number of locations deleted.

`update(id, changes)` -> Updates the location based on the passed in ID. Returns the location with the changes.
<br>

### Push notifications

`find()` -> Returns all notifications filtered by ID and subscription.

`findBy(filter)` -> Returns notifications based on the passed in filter.

`findBy(filter)` -> returns notifications based on the passed in filter.

`add(subscription)` -> Adds a subscription. Returns the new subscription's ID.

`findById(id)` -> Returns a subscription based on the passed in ID.

`remove(id)` -> Removes a subscription based on the passed in ID. Returns the number of subscriptions deleted.

`removeWebNotificationsForUser(user_id)` -> Removes a web subscription based on the passed in user_id.

`update(id, changes)` -> Updates the subscription based on the passed in ID. Returns the subscription with the changes.
<br>

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

    *  NODE_ENV - set to "development" for local development, and to "staging" or "production" in Heroku
    *  TWILIO_ID - This app uses Twilio to send text messages. You can get your own keys by going to [Twilio.com](https://twilio.com)
    *  TWILIO_AUTH -  see above.
    *  VAPID_PRIVATE - `yarn global add web-push` then `web-push generate-vapid-keys` or https://tools.reactpwa.com/vapid
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
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

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

See [Frontend Documentation](https://github.com/labs15-forest-fire/frontend) for details on the frontend of our project.

<!-- See [iOS Documentation](https://github.com/labs15-forest-fire/iOS) for details on the mobile iOS version of our project. -->

See [Data Science Documentation](https://github.com/labs15-forest-fire/Data-Science) for details on the data science behind our application.
