const cron = require("node-cron");
const Locations = require("../../models/locations/locations-model");
const Users = require("../../models/users/users-model");
const { alertMessage } = require("../../sms/twilio");

const scheduler_functions = require("./scheduler_functions");

// Add settings to user profile as to whether they want to recieve alerts via SMS or push notifications

// Add new geocoding into the add location api call.

cron.schedule("10,20,30,40,59 * * * * *", async function() {
  console.log("running a task every minute");

  // Step 1: Get all the fires in the USA.

  let USAfires = await scheduler_functions.getAmericaFires();

  // console.log(USAfires);
  //  - Store in an array.

  // Step 2: loop through locations
  const locations = await Locations.findAll();
  // console.log(locations);
  // console.log(
  //   scheduler_functions.haversineDistance(
  //     [33.8947204, -117.292743],
  //     [33.901772799999996, -118.1220864],
  //     true
  //   )
  // );

  let alertLocations = [];
  locations.forEach(location => {
    if (location.latitude && location.longitude) {
      // console.log(location);
      USAfires.forEach(fire => {
        let distance = scheduler_functions.haversineDistance(
          [location.latitude, location.longitude],
          [fire[1], fire[0]],
          true
        );

        if (distance <= location.radius) {
          alertLocations.push(location);
        }
      });
    }
  });

  alertLocations = new Set(alertLocations);
  // console.log(alertLocations);

  // Step 3: compare each location to the array of fire data
  // Step 4: determine if location has fire data True / False
  // Step 5: if true push the location name and user id into a separate array
  //    - loop through the array to get each locations user information.

  alertLocations.forEach(async alertLoc => {
    if (alertLoc.receive_sms && alertLoc.notification_timer === 0) {
      alertMessage();
      
    }
    // console.log(alertLoc.notification_timer)
    if (alertLoc.notification_timer === 12) {
      await Locations.update(alertLoc.id, {notification_timer: 0})
    } else {
    await Locations.update(alertLoc.id, {notification_timer: alertLoc.notification_timer + 1})
    }
  });

  // Step 6: send alert via push notification / sms message if alert is true
});

module.exports = cron;
