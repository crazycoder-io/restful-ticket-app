import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Train Ticket Automation' });
});

//This codes /GET 404 page
// router.get('*', function(req, res){
//   res.json({title: '404 Not Found', code: 404});
// });

module.exports = router;