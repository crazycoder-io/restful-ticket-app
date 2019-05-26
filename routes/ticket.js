import express from 'express';
import Ticket from '../models/Ticket';
import Voyage from '../models/Voyage';
import Train from '../models/Train';
var router = express.Router();

/* GET tickets listing. */
router.get('/', (req, res) => {
    Ticket.find({})
        .then(tickets => {
            tickets.forEach(ticket => {
                Voyage.findById(ticket.voyageId, (err, voyage) => {
                    if(err) throw err;
                    Train.findById(voyage.trainId, (err, train) => {
                        if(err) throw err;
                        let data = {
                            ticketId: ticket._id,
                            trainName: train.trainName,
                            firstClassTicketCount: train.firstClassPassengerCapacity,
                            secondClassTicketCount: train.secondClassPassengerCapacity,
                            departure: voyage.departure,
                            arrival: voyage.arrival,
                            platform: voyage.platform,
                            firstClassTicketPrice: ticket.firstClassTicketPrice,
                            secondClassTicketPrice: ticket.secondClassTicketPrice,
                            voyageDate: voyage.date
                        };

                        res.json(data);
                    });
                });
            });
        })
        .catch(err => {
            res.json(err);
        });
});

/* GET newTicket page */
router.get('/newTicket', (req, res) => {
    res.render('newTicket', { title: 'New Ticket Definition' });
});

/* POST add new ticket */
router.post('/newTicket', (req, res) => {
    if(req.body.voyageId && (req.body.voyageId !== '' && req.body.voyageId != undefined)){
        Voyage.findById(req.body.voyageId, (err, voyage) => {
            if(err) throw err;
            if(voyage){
                if(voyage.voyage === false){
                    const newTicket = new Ticket(req.body); // Define a new ticket with data from req.body
                    const promise = newTicket.save(); // Save ticket to database
    
                    promise
                        .then(ticket => {
                            let data = {
                                departure: voyage.departure,
                                arrival: voyage.arrival,
                                platform: voyage.platform,
                                firstClassTicketPrice: ticket.firstClassTicketPrice,
                                secondClassTicketPrice: ticket.secondClassTicketPrice,
                                date: voyage.date
                            };

                            res.json(data);
                        })
                        .catch(err => {
                            res.json(err);
                        });
                }else{
                    res.json({message: 'This voyage is done you can not define a ticket!'});
                }
            }else{
                res.json({message: 'The voyage was not found!', code: 1001});
            }
        });
    }else res.json({message: 'Please enter a voyageId!', code: 1001});
});

//This codes /GET 404 page
router.get('*', function(req, res){
    res.json({title: '404 Not Found', code: 404});
});

module.exports = router;