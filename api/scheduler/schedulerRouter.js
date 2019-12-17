const router = require("express").Router();
const { sendSmsAndPushNotifications } = require("./scheduler_functions");
const restricted = require("../../auth/restricted-middleware.js");

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

  await sendSmsAndPushNotifications();
});


router.get("/triggerSMS", restricted, async (req, res) => {
  const user_id = req.jwt.user_id;
  console.log(user_id);

  await sendSmsAndPushNotifications(user_id, true, false);
});

router.get("/triggerPush", restricted, async (req, res) => {
  const user_id = req.jwt.user_id;
  console.log(user_id);

  await sendSmsAndPushNotifications(user_id, false, true);
});

module.exports = router;