import express from 'express';
import Passenger from '../models/Passenger';
var router = express.Router();

/* GET trains listing. */
router.get('/', (req, res) => {
    Passenger.find({})
        .then(data => res.json(data))
        .catch(err => console.log(err));
});

/* GET trains */
router.get('/newPassenger', (req, res) => {
    res.render('newPassenger', { title: 'New Passenger Definition' });
});

/* POST add new train */
router.post('/newPassenger', (req, res) => {
    Passenger.findOne(
        {
            contact: req.body.contact
        },
        (err, passenger) => {
            if(err) throw err;
            if(!passenger){
                const newPassenger = new Passenger(req.body); // Define a new train with data from req.body
                const promise = newPassenger.save(); // Save ticket to database

                promise
                    .then(data => {
                        res.json(data);
                    })
                    .catch(err => {
                        res.json(err);
                    });
            }else{ res.json(passenger); }
        }
    );
});

//This codes /GET 404 page
router.get('*', function(req, res){
    res.json({title: '404 Not Found', code: 404});
});

module.exports = router;