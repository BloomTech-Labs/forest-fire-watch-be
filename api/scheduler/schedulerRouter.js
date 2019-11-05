const router = require("express").Router();
const Locations = require("../../models/locations/locations-model");
const { alertMessage } = require("../../sms/twilio");
const push = require("../../push/helper");

const scheduler_functions = require("./scheduler_functions");

router.get("/", async (req, res) => {
  try {
    console.log("Running Scheduler");

    let USAfires = await scheduler_functions.getAmericaFires();

    const locations = await Locations.findAll();

    let alertLocations = [];

    locations.forEach(location => {
      var nrFires = 0;
      var closestFireName = "";
      var closestDistance = -1;

      if (location.latitude && location.longitude) {
        USAfires.forEach(fireObj => {
          const fireLocation = fireObj.location;
          const fireName = fireObj.name;

          let distance = scheduler_functions.haversineDistance(
            [location.latitude, location.longitude],
            [fireLocation[1], fireLocation[0]],
            true
          );

          if (distance <= location.radius) {
            nrFires += 1;

            if (closestDistance === -1 || distance < closestDistance) {
              closestFireName = fireName;
              closestDistance = distance;
            }
          }
        });

        if (nrFires > 0) {
          alertLocations.push([
            location,
            closestFireName,
            closestDistance,
            nrFires
          ]);
        }
      }
    });

    // console.log(`Found ${alertLocations.length} location / fire instances`);

    // alertLocations = new Set(alertLocations);
    console.log(`Going to send ${alertLocations.length} alerts`);

    alertLocations.forEach(async alertLocation => {
      const alertLoc = alertLocation[0];
      const closestFireName = alertLocation[1];
      const closestDistance = Math.round(alertLocation[2]);
      const nrFires = alertLocation[3];

      const body = `There are ${nrFires} fires within ${alertLoc.radius} miles of ${alertLoc.address}. The closest fire, ${closestFireName}, is ${closestDistance} miles from your location.`;
      console.log(`notification_timer: ${alertLoc.notification_timer}`);

      // if (alertLoc.notification_timer === 0) {
      // if (alertLoc.receive_sms) {
      //   alertMessage(alertLoc.cell_number, body);
      // }

      console.log("receive_push: " + alertLoc.receive_push);
      console.log("user_id: " + alertLoc.user_id);
      console.log("user_id: " + Object.keys(alertLoc));

      if (alertLoc.receive_push) {
        push(alertLoc.user_id, {
          title: "Wildfire Notification",
          body: body
        });
      }
      // }

      if (alertLoc.notification_timer === 12) {
        await Locations.update(alertLoc.id, { notification_timer: 0 });
      } else {
        await Locations.update(alertLoc.id, {
          notification_timer: alertLoc.notification_timer + 1
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
