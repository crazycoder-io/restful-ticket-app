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
                        voyageId: voyage._id,
                        departure: voyage.departure,
                        arrival: voyage.arrival,
                        platform: voyage.platform,
                        trainName: train.trainName,
                        capacity: train.firstClassPassengerCapacity + train.secondClassPassengerCapacity,
                        date: voyage.date,
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
router.get('/newVoyage', (req, res) => {
    res.render('newVoyage', { title: 'New Voyage Definition' });
});

/* POST add new train */
router.post('/newVoyage', (req, res) => {
    if(req.body.trainId && (req.body.trainId !== '' && req.body.trainId != undefined)){
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
                                    voyageId: voyage.voyageId,
                                    departure: voyage.departure,
                                    arrival: voyage.arrival,
                                    platform: voyage.platform,
                                    trainName: train.trainName,
                                    capacity: train.firstClassPassengerCapacity + train.secondClassPassengerCapacity,
                                    date: voyage.date
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
    }else res.json({message: 'Please enter a trainId!', code: 1001});
});

//This codes /GET 404 page
router.get('*', function(req, res){
    res.json({title: '404 Not Found', code: 404});
});

module.exports = router;