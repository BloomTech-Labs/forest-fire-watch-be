const DSbaseURL = "https://wildfirewatch.herokuapp.com";
const axios = require("axios");
const Locations = require("../../models/locations/locations-model");
const { alertMessage } = require("../../sms/twilio");
const push = require("../../push/helper");

const getAmericaFires = () => {
  return axios.get(`${DSbaseURL}/fpfire`).then(res => {
    let USAfires = res.data;
    return USAfires;
  });
};

/**
 * Calculates the haversine distance between point A, and B.
 * @param {number[]} latlngA [lat, lng] point A
 * @param {number[]} latlngB [lat, lng] point B
 * @param {boolean} isMiles If we are using miles, else km.
 */

const haversineDistance = (latlngA, latlngB, isMiles) => {
  const toRadian = angle => (Math.PI / 180) * angle;
  const distance = (a, b) => (Math.PI / 180) * (a - b);
  const RADIUS_OF_EARTH_IN_KM = 6371;

  let lat1 = latlngA[0];
  let lat2 = latlngB[0];
  const lon1 = latlngA[1];
  const lon2 = latlngB[1];

  const dLat = distance(lat2, lat1);
  const dLon = distance(lon2, lon1);

  lat1 = toRadian(lat1);
  lat2 = toRadian(lat2);

  // Haversine Formula
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.asin(Math.sqrt(a));

  let finalDistance = RADIUS_OF_EARTH_IN_KM * c;

  if (isMiles) {
    finalDistance /= 1.60934;
  }

  return finalDistance;
};


async function sendSmsAndPushNotifications(user_id = null) {
  try {
    console.log("Running Scheduler");

    let USAfires = await getAmericaFires();

    var locations = [];

    if (user_id === null) {
      locations = await Locations.findAll();
    } else {
      locations = await Locations.findByNotif(location => location.user_id == user_id);
    }

    let alertLocations = [];

    locations.forEach(location => {

      var nrFires = 0;
      var closestFireName = '';
      var closestDistance = -1;

      if (location.latitude && location.longitude) {
        USAfires.forEach(fireObj => {
          const fireLocation = fireObj.location;
          const fireName = fireObj.name;

          let distance = haversineDistance(
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
        })

        if (nrFires > 0) {
          alertLocations.push([location, closestFireName, closestDistance, nrFires]);
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

      var body = '';

      if (nrFires === 1) {
        body = `There is ${nrFires} fire within ${alertLoc.radius} miles of ${alertLoc.address}. The fire, ${closestFireName}, is ${closestDistance} miles from your location.`;
      } else {
        body = `There are ${nrFires} fires within ${alertLoc.radius} miles of ${alertLoc.address}. The closest fire, ${closestFireName}, is ${closestDistance} miles from your location.`;
      }

      // const body = `There are ${nrFires} fires within ${alertLoc.radius} miles of ${alertLoc.address}. The closest fire, ${closestFireName}, is ${closestDistance} miles from your location.`;
      console.log(`notification_timer: ${alertLoc.notification_timer}`)

      console.log("User id: " + alertLoc.user_id);
      console.log("receive_sms: " + alertLoc.receive_sms);
      console.log("receive_push: " + alertLoc.receive_push);

      // if (alertLoc.notification_timer === 0) {
      if (alertLoc.receive_sms) {
        alertMessage(alertLoc.cell_number, body);
      }

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
}


module.exports = {
  getAmericaFires,
  haversineDistance,
  sendSmsAndPushNotifications
};
