var express = require('express');
var router = express.Router();
const Item = require('../models/item');

/* GET home page. */
router.get('/', function(req, res, next) {
    Item.find()
      .then((response) => {
      res.render('index', { title: 'BCVerified', item: response, loggedInUser: req.user });
    })
      .catch((err) => console.log(err));
});

router.get('/ping', async function(req, res) {
  res.status(200).send('pong');
});

module.exports = router;
