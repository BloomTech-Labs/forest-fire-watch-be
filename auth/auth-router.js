const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../models/users/users-model.js");

// Load error handling and validation for inputs
const validateRegisterInput = require("../validation/register");

// for endpoints beginning with /api/auth
router.post("/register", (req, res) => {
  // The validation function returns an object with a string that describes the error and a boolean that says if there is or isn't an error

  const { errors, isValid } = validateRegisterInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.findBy({ username: user.username })
    .first()
    .then(user1 => {
      if (user1) {
        res
          .status(409)
          .json({ username: "A user with that name already exists" });
      } else {
        Users.add(user).then(saved => {
          Users.findBy({ username: user.username })
            .first()
            .then(user => {
              const token = generateToken(user);
              console.log(token);
              res.status(201).json({
                message: `Welcome ${user.username}!`,
                token
              });
            })
            .catch(error => {
              res.status(500).json(error);
            });
        });
      }
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        console.log(token);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  console.log("user: ", user);
  const jwtPayload = {
    subject: user.id,
    username: user.username
  };

  const jwtSecret = process.env.JWT_SECRET || "Spoofmail Secret!";
  const jwtOptions = {
    expiresIn: "1d"
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
}

module.exports = router;
