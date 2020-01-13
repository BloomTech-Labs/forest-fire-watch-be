const router = require("express").Router();
const requestIp = require("request-ip");
const axios = require('axios')
const CircularJSON = require('circular-json');

const Users = require("./users-model.js");
const restricted = require("../../auth/restricted-middleware.js");

// Removed /users GET because it allowed any user with a valid token/UID
// to get all information on all users, including email, phone number and UID

// router.get("/", restricted, (req, res) => {
//   Users.find()
//     .then(users => {
//       res.json(users);
//     })
//     .catch(err => {
//       console.log(err);
//       res.send(err);
//     });
// });

router.get("/ip-address", (req, res) => {
  const clientIp = requestIp.getClientIp(req);
  axios.get(`http://ip-api.com/json/${clientIp}?fields=61439`).then(result => {
    console.log("IP location", result)
    const ipLocation = result
    res.send(CircularJSON.stringify(ipLocation.data))
  })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err })
    })

});

router.get("/user", restricted, (req, res) => {
  Users.findById(req.jwt.user_id)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.log("user route", err);
      res.send(err);
    });
});

router.get("/session", restricted, (req, res) => {
  console.log("session route", req.jwt);
  res.status(200).json(req.jwt);
});

router.put("/", restricted, async (req, res) => {
  try {
    const user = await Users.update(req.jwt.user_id, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "The user could not be found" });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: "Error updating the user"
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    const count = await Users.remove(req.jwt.user_id);
    if (count > 0) {
      res.status(200).json({ message: "The user has been nuked" });
    } else {
      res.status(404).json({ message: "The user could not be found" });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: "Error removing the user"
    });
  }
});

router.put("/update/:id", restricted, (req, res) => {
  const uid = req.params.id;
  Users.updateEmail(uid, req.body)
    .then(updated => {
      res.status(204).json(updated);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
