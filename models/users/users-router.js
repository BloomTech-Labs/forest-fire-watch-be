const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get('/session', restricted, (req, res) => {
  console.log(req.jwt)
  res.status(200).json(req.jwt)
});

router.put('/', async (req, res) => {
  try {
    const user = await Users.update(req.jwt.user_id, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error updating the user',
    });
  }
});

router.delete('/', async (req, res) => {
  try {
    const count = await Users.remove(req.jwt.user_id);
    if (count > 0) {
      res.status(200).json({ message: 'The user has been nuked' });
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error removing the user',
    });
  }
});

module.exports = router;
