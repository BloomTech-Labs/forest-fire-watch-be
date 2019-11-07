const cron = require("node-cron");
const { sendSmsAndPushNotifications } = require("./scheduler_functions");

// Add settings to user profile as to whether they want to recieve alerts via SMS or push notifications

// Add new geocoding into the add location api call.

cron.schedule("30 * * * *", async function () {
  console.log("Running Cron Scheduler");
  await sendSmsAndPushNotifications();
});

module.exports = cron;