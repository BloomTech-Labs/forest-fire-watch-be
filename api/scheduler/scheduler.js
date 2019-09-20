const cron = require("node-cron");
const Locations = require("../../models/locations/locations-model");
const Users = require("../../models/users/users-model");
const { alertMessage } = require("../../sms/twilio");
const push = require("../../push/helper");

const scheduler_functions = require("./scheduler_functions");

// Add settings to user profile as to whether they want to recieve alerts via SMS or push notifications

// Add new geocoding into the add location api call.

cron.schedule("0 * * * *", async function() {
  console.log("Running Cron Scheduler");

  let USAfires = await scheduler_functions.getAmericaFires();

  const locations = await Locations.findAll();

  let alertLocations = [];
  locations.forEach(location => {
    if (location.latitude && location.longitude) {
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

  alertLocations.forEach(async alertLoc => {
    const body = `There is an active fire within ${alertLoc.radius} miles of ${alertLoc.address}`;
    if (alertLoc.notification_timer === 0) {
      if (alertLoc.receive_sms) {
        alertMessage(alertLoc.cell_number, body);
      }
      if (alertLoc.receive_push) {
        push(alertLoc.user_id, {
          title: "Wildfire Notification",
          body: body
        });
      }
    }

    if (alertLoc.notification_timer === 12) {
      await Locations.update(alertLoc.id, { notification_timer: 0 });
    } else {
      await Locations.update(alertLoc.id, {
        notification_timer: alertLoc.notification_timer + 1
      });
    }
  });
});

module.exports = cron;
