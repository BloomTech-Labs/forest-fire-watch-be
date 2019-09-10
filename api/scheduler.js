const cron = require("node-cron");
const Locations = require("../models/locations/locations-model");
const Users = require("../models/users/users-model");

// Add settings to user profile as to whether they want to recieve alerts via SMS or push notifications

// Add new geocoding into the add location api call.

cron.schedule("* * * * *", function() {
  console.log("running a task every minute");

  // Step 1: loop through all users
  // Step 2: loop through each users locations
  // Step 3: send each location through the DS server
  // Step 4: determine if location has fire data True / False
  // Step 5: send alert via push notification / sms message if alert is true
});

module.exports = cron;
