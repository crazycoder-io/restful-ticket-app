import express from 'express';
import Train from '../models/Train';
var router = express.Router();

/* GET trains listing. */
router.get('/', (req, res) => {
  Train.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

/* GET newTrain Definition Page */
router.get('/newTrain', (req, res) => {
  res.render('newTrain', { title: 'New Train Definition' });
});

/* POST add new train */
router.post('/newTrain', (req, res) => {
  const newTrain = new Train(req.body); // Define a new train with data from req.body
  const promise = newTrain.save(); // Save train to database
  
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

//This codes /GET 404 page
router.get('*', function(req, res){
  res.json({title: '404 Not Found', code: 404});
});

module.exports = router;