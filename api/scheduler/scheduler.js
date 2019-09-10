const cron = require("node-cron");
const Locations = require("../../models/locations/locations-model");
const Users = require("../../models/users/users-model");

const scheduler_functions = require("./scheduler_functions")

// Add settings to user profile as to whether they want to recieve alerts via SMS or push notifications

// Add new geocoding into the add location api call.

cron.schedule("20,40,59 * * * * *",async function() {
  console.log("running a task every minute");

// Step 1: Get all the fires in the USA.

    let USAfires = await scheduler_functions.getAmericaFires()

    console.log(USAfires)
//  - Store in an array.

// Step 2: loop through locations
// Step 3: compare each location to the array of fire data
// Step 4: determine if location has fire data True / False
// Step 5: if true push the location name and user id into a separate array
//    - loop through the array to get each locations user information.
// Step 6: send alert via push notification / sms message if alert is true
});

module.exports = cron;
