const Locations = require("./locations-model.js");
module.exports = async (req, res, next) => {
  try {
    let userLocations = await Locations.findBy({
      user_id: req.jwt.user_id
    });

    console.log("userLocations", userLocations, "\n\n\n");

    let status = false;

    for (let location of userLocations) {
      if (location.address === req.body.address) {
        console.log("duplicate", location.address);
        res.status(409).json({ message: "This is a duplicate address" });
        status = true;
        console.log("res", res);
      }
    }
    if (!status) {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
