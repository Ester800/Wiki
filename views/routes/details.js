var express = require('express');
var router = express.Router();
const Item = require('../models/item');

// GET users listing
router.get('/:uid', function(req, res, next) {
    let id = req.params.uid;
    console.log(id);
    
    Item.findOne({ _id: id }).populate('categories')
        .then((thisItem) => {
            //console.log('The single item results are ', results)
            //console.log('the categories are ', results.categories)
            res.render('details', { title: 'BCVerified', item: thisItem, blockchains: thisItem.blockchains, isCreator: true, loggedInUser: req.user });
        });

    console.log('the id is ', id);
});



module.exports = router;