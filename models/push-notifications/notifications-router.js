const router = require("express").Router();
const Notifications = require("./notifications-model.js");
const restricted = require("../../auth/restricted-middleware.js");
const pusher = require("../../push/helper.js");

//register the push worker to our database
router.post('/register',restricted, async (req,res)=>{
    try {
        //get data and change to string, save to db
        const subscription=req.body
        let sub = JSON.stringify(subscription)
        let userSub = await Notifications.add({subscription:sub, type:'web',user_id:req.jwt.user_id})
        if(userSub)
            res.status(201).json({});
        else
            res.status(400).json({message:'information not saved'})

    console.log("user subscription recorded", req.jwt.user_id);
    //send to pusher in helper to save
    await pusher(req.jwt.user_id, {
      title: "Saved",
      body:
        "Your subscription has been saved. You will now recieve Fire Data based on your location when it is an emergency"
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Server error while saving"
    });
  }
});

//Save ios data to database
router.post("/saveios", restricted, async (req, res) => {
//decode data and check to make sure we have the device id
  const subscription = req.body;
  if (!"deviceId" in subscription) {
    res.status(400).json({ message: "deviceId not included" });
    return;
  }
  try {
    //get id and add to db
    let sub = subscription.deviceId;
    let userSub = await Notifications.add({
      subscription: sub,
      type: "ios",
      user_id: req.jwt.user_id
    });
    if (userSub) res.status(201).json({});
    else res.status(400).json({ message: "information not saved properly" });
  } catch (err) {
    console.error("error :", err.message);
  }
// push reponse removed on request of IOS
});

module.exports = router;
