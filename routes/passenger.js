import express from 'express';
import Passenger from '../models/Passenger';
var router = express.Router();

/* GET trains listing. */
router.get('/', (req, res) => {

});

/* PUT trains */
router.put('/editPassenger', (req, res) => {
    // The put codes will come here...
});

/* POST add new train */
router.post('/newPassenger', (req, res) => {
    const newPassenger = new Passenger(req.body); // Define a new train with data from req.body
    Passenger.findOrCrate(
        {
            contact: req.body.contact
        },
        {
            passengerName: req.body.passengerName,
            passengerSurname: req.body.passengerSurname,
            contact: req.body.contact
        },
        (err, passenger) => {
            if(err) throw err;
            res.json(passenger);
        }
    );
});

module.exports = router;