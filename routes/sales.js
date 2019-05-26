import express from 'express';
import Sales from '../models/Sales';
import Ticket from '../models/Ticket';
import Voyage from '../models/Voyage';
import Train from '../models/Train';
import Passenger from '../models/Passenger';
const router = express.Router();

/* GET trains listing. */
router.get('/', (req, res) => {
    Sales.find({})
        .then(sales => {
            res.json(sales);
        })
        .catch(err => res.json(err));
});

/* GET newSales page */
router.get('/newSales', (req, res) => {
    res.render('newSales', { title: 'New Sales' });
});

/* POST add new train */
router.post('/newSales', (req, res) => {
    if(req.body.passengerId && (req.body.passengerId !== '' && req.body.passengerId != undefined)){
        Passenger.findById(req.body.passengerId, (err, passenger) => {
            if(err) throw err;
            if(passenger){
                Sales.find(
                    {
                        ticketId: req.body.ticketId,
                        classType: req.body.classType
                    },
                    (err, sales) => {
                        if(sales && sales.length > 0){
                            if(err) throw err;
                            sales.forEach(() => {
                                Ticket.findById(req.body.ticketId, (err, ticket) => {
                                    if(err) throw err;
                                    if(ticket){
                                        Voyage.findById(ticket.voyageId, (err, voyage) => {
                                            if(err) throw err;
                                            Train.findById(voyage.trainId, (err, train) => {
                                                if(err) throw err;
                                                let classType = (sales.classType === 1) ? 'firstClassPassengerCapacity' : 'secondClassPassengerCapacity';
                                                if(sales.length < train[classType]){
                                                    const newSales = new Sales(req.body); // Define a new ticket with data from req.body
                                                    const promise = newSales.save(); // Save ticket to database
        
                                                    promise
                                                        .then(() => {
                                                            let data = {
                                                                passengerName: passenger.passengerName,
                                                                passengerSurname: passenger.passengerSurname,
                                                                departure: voyage.departure,
                                                                arrival: voyage.arrival,
                                                                platform: voyage.platform,
                                                                trainName: train.trainName,
                                                                carriage: req.body.carriage,
                                                                classType: req.body.classType,
                                                                seat: req.body.seat,
                                                                journeyDate: voyage.date
                                                            };
    
                                                            res.json(data);
                                                        })
                                                        .catch(err => {
                                                            res.json(err);
                                                        });
                                                }else res.json(`The tickets for ${req.body.classType}. class are exhausted!`);
                                            });
                                        });
                                    }else res.json({message: 'The ticket was not found!', code: 1001});
                                });
                            });
                        }else{
                            const newSales = new Sales(req.body); // Define a new ticket with data from req.body
                            const promise = newSales.save(); // Save ticket to database
            
                            promise
                                .then(() => {
                                    Ticket.findById(req.body.ticketId, (err, ticket) => {
                                        if(err) throw err;
                                        if(ticket){
                                            Voyage.findById(ticket.voyageId, (err, voyage) => {
                                                if(err) throw err;
                                                Train.findById(voyage.trainId, (err, train) => {
                                                    if(err) throw err;
                                                    let data = {
                                                        passengerName: passenger.passengerName,
                                                        passengerSurname: passenger.passengerSurname,
                                                        departure: voyage.departure,
                                                        arrival: voyage.arrival,
                                                        platform: voyage.platform,
                                                        trainName: train.trainName,
                                                        carriage: req.body.carriage,
                                                        classType: req.body.classType,
                                                        seat: req.body.seat,
                                                        journeyDate: voyage.date
                                                    };
                                                    
                                                    res.json(data);
                                                });
                                            });
                                        }else res.json({message: 'The ticket was not found!', code: 1001});
                                    });
                                })
                                .catch(err => res.json(err));
                        }
                    }
                );
            }else{
                res.json({message: 'First Passenger Register Please!'});
            }
        });
    }else res.json({message: 'Enter a passengerId please!'});
});

//This codes /GET 404 page
router.get('*', function(req, res){
    res.json({title: '404 Not Found', code: 404});
});

module.exports = router;