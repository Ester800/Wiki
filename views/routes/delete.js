var express = require('express');
var router = express.Router();
const Item = require('../models/item');
const Blockchain = require('../models/blockchain');

router.get('/:uid', function(req, res, next) {
    let id = req.params.uid;
    console.log(id);    //works

    Item.findOne({_id: id})//.populate('accessories')
    .then((thisItem) => {
        res.render('deleteItemPage', { title: 'Delete Item Page', item: thisItem, isCreator: true, loggedInUser: req.user});
    });
    
});

router.post('/:uid', function(req, res, next) {
    console.log('testing post');
    let itemId = req.params.uid;
    console.log('deleting this', itemId);    //works

    Blockchain.updateMany(
        { "items": itemId },
        { $pull: {"items": itemId}}, 
        function(err, accs) {
            if (err) console.log(err);
            else console.log('Updated blockchains:', accs);
        }
    );

    Item.deleteOne({_id: itemId})
    .then(function() {console.log('Deleted item with id', itemId);})
    .catch(function(err) {console.log(err);});

    res.redirect('/');
});

module.exports = router;