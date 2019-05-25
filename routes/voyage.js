import express from 'express';
import Voyage from '../models/Voyage';
import Train from '../models/Train';
var router = express.Router();

/* GET voyages listing. */
router.get('/', (req, res) => {
    Voyage.find({})
        .then(voyages => {
            voyages.forEach(voyage => {
                Train.findById(voyage.trainId, (err, train) => {
                    if(err) throw err;
                    let data = {
                        date: voyage.date,
                        departure: voyage.departure,
                        arrival: voyage.arrival,
                        platform: voyage.platform,
                        trainName: train.trainName,
                        capacity: train.firstClassPassengerCapacity + train.secondClassPassengerCapacity
                    };
                    res.json(data);
                });
            });
        })
        .catch(err => {
            res.json(err);
        });
});

/* PUT voyages */
router.put('/editVoyage', (req, res) => {
    // The put codes will come here...
});

/* POST add new train */
router.post('/newVoyage', (req, res) => {
    Train.findById(req.body.trainId, (err, train) => {
        if(err) throw err;
        if(train){
            if(train.lock != true){
                const newVoyage = new Voyage(req.body); // Define a new voyage with data from req.body
                const promise = newVoyage.save(); // Save voyage to database

                promise
                    .then(voyage => {
                        Train.findByIdAndUpdate(voyage.trainId, { lock: true }, (err, train) => {
                            if(err) throw err;
                            let data = {
                                date: voyage.date,
                                departure: voyage.departure,
                                arrival: voyage.arrival,
                                platform: voyage.platform,
                                trainName: train.trainName,
                                capacity: train.firstClassPassengerCapacity + train.secondClassPassengerCapacity
                            };
                            res.json(data);
                        });
                    })
                    .catch(err => {
                        res.json(err);
                    });
            }else{
                res.json({message: 'The train is locked for another voyage!'});
            }
        }else{
            res.json({message: 'The train was not found!', code: 1001});
        }
    });
});

module.exports = router;