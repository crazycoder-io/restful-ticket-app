import express from 'express';
import Ticket from '../models/Ticket';
import Voyage from '../models/Voyage';
import Train from '../models/Train';
var router = express.Router();

/* GET trains listing. */
router.get('/', (req, res) => {
    Ticket.find({})
        .then(tickets => {
            tickets.forEach(ticket => {
                Voyage.findById(ticket.voyageId, (err, voyage) => {
                    if(err) throw err;
                    Train.findById(voyage.trainId, (err, train) => {
                        if(err) throw err;
                        let data = {
                            trainName: train.trainName,
                            firstClassTicketCount: train.firstClassPassengerCapacity,
                            secondClassTicketCount: train.secondClassPassengerCapacity,
                            voyageDate: voyage.date,
                            firstClassTicketPrice: ticket.firstClassTicketPrice,
                            secondClassTicketPrice: ticket.secondClassTicketPrice
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

/* PUT trains */
router.put('/editTicket', (req, res) => {
    // The put codes will come here...
});

/* POST add new train */
router.post('/newTicket', (req, res) => {
    Voyage.findById(req.body.voyageId, (err, voyage) => {
        if(err) throw err;
        if(voyage){
            if(voyage.voyage === false){
                const newTicket = new Ticket(req.body); // Define a new ticket with data from req.body
                const promise = newTicket.save(); // Save ticket to database

                promise
                    .then(data => {
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
});

module.exports = router;