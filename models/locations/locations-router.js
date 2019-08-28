const router = require('express').Router();

const Locations = require('./locations-model.js');
const restricted = require('../../auth/restricted-middleware.js');


router.get('/', restricted, async (req, res) => {
    try {
        let userLocations = await Locations.findBy({ user_id: req.jwt.user_id })
        if (userLocations.length ) {
            res.json(userLocations);
        } else {
            res.send(err);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error getting locations for the user',
        });
    }
});

router.post('/', restricted, async (req, res) => {
    try {
        const location = await Locations.add({...req.body, user_id: req.jwt.user_id });

        if (location) {
            res.status(200).json(location);
        } else {
            res.status(404).json({ message: `You're missing data from a required field` });
        }
    } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
            message: 'Error adding the location',
        });
    }
});

router.put('/:id', restricted, async (req, res) => {
    try {

      let locToUpdate = await Locations.findBy({ user_id: req.jwt.user_id, id: req.params.id }).first();
      
      if (locToUpdate) {
        
        const location = await Locations.update(req.params.id, req.body);
      
        res.status(200).json({ message: "The location has been updated "});
      } else {
        res.status(404).json({ message: 'The location could not be found' });
      }
    } catch (error) {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error updating the location',
      });
    }
  });

router.delete('/:id', restricted, async (req, res) => {
    try {

        let locToDelete = await Locations.findBy({ user_id: req.jwt.user_id, id: req.params.id }).first();

        if (locToDelete) {
            const count = await Locations.remove(req.params.id);
            res.status(200).json({ message: 'The location has been nuked' });
        } else {
            res.status(404).json({ message: `This user doesn't have a location with that ID` });
        }
    } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
            message: 'Error removing the location',
        });
    }
});

module.exports = router;
