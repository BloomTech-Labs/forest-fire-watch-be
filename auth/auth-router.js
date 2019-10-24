const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../models/users/users-model.js");

// Load error handling and validation for inputs
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// for endpoints beginning with /api/auth
router.post("/register", (req, res) => {
  // INPUT VALIDATION EXPLANATION
  // We pass { username: "username", password: "password"} into the validation function.
  // Inside the validation function it checks that the username and password meets certain criteria.
  // If there are no errors then isValid is returned as true and we continue on with the rest of the post request.
  // If there is an error, we return a status 400 along with the errors object that includes all the error descriptions that were encountered

  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    // return res.status(400);
    return res.status(400).json({ message: errors.message });
  }

  const user = req.body;

  Users.findBy({ email: user.email })
    .first()
    .then(user1 => {
      if (user1) {
        res
          .status(409)
          .json({ email: "A user with that email already exists" });
      } else {
        Users.add(user).then(saved => {
          Users.findBy({ email: user.email })
            .first()
            .then(user => {
              const token = generateToken(user);
              console.log("user", user);
              res.status(201).json({
                message: `Welcome ${user.first_name}!`,
                token
              });
            })
            .catch(error => {
              res.status(500).json(error);
              console.log(error);
            });
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: error.message });
    });
});

router.post("/login", (req, res) => {
  // const { errors, isValid } = validateLoginInput(req.body);

  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  let { UID } = req.body;

  Users.findBy({ UID })
    .first()
    .then(user => {
      if (user) {
        const token = generateToken(user);
        console.log("login token", token);
        res.status(200).json({
          message: `Welcome ${user.first_name}!`,
          token
        });
      } else {
        // if (!user) {
          return res.status(404).json({ message: "User does not exist" });
        // }
        // if (user && !bcrypt.compareSync(password, user.password)) {
        //   errors.password = "Login failed";
        // }
        // return res.status(400).json(errors);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: error.message });
    });
});

function generateToken(user) {
  const jwtPayload = {
    subject: user.id,
    email: user.email
  };

  const jwtSecret = process.env.JWT_SECRET || "FireFlight Secret!";

  const jwtOptions = {
    expiresIn: "1d"
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

module.exports = router;
