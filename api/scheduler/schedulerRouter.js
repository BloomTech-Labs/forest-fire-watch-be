const router = require("express").Router();
const { sendSmsAndPushNotifications } = require("./scheduler_functions");
const restricted = require("../../auth/restricted-middleware.js");

router.get("/", async (req, res) => {
  await sendSmsAndPushNotifications();
});

router.get("/user", restricted, async (req, res) => {
  const user_id = req.jwt.user_id;
  console.log(user_id);

  await sendSmsAndPushNotifications(user_id);
});

module.exports = router;