  
var express = require('express');
var router = express.Router();
const Item = require('../models/item');

/* GET search results page. */
router.get('/', function(req, res, next) {
    console.log('search get');
    let searchQuery = req.query;
    console.log('search text:', searchQuery.search);
    console.log('from', searchQuery.category);
    let text = searchQuery.search;       //.toLowerCase();

    if (text == '') {
            res.redirect('/');
    } else {
        
        console.log('name:', text);
        Item.find({'name': new RegExp(text, "i"), 'category': { text }}) //
        .then((items) => {
            console.log(items);
            res.render('search', { title: 'Search Results', item: items, loggedInUser: req.user });
        })
        .catch((err) => console.log(err));
    }
});

module.exports = router;