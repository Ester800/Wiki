var express = require('express');
var router = express.Router();
const Blockchain = require('../models/blockchain');

/* Get create listing */
router.get('/', function(req, res, next) {
    res.render('createBlockchain', { title: 'Create Blockchain Page', loggedInUser: req.user });
});

router.post('/', function(req, res, next) {
    console.log('create blockchain post');
    console.log('~req', req.body);
    let data = req.body;

    let blockchain = new Blockchain({
        name: data.name,
        description: data.description,
        items: []
    });
    blockchain.save()
    .then((response) => {
        console.log(response);
        res.redirect('/');
    });
});

module.exports = router;