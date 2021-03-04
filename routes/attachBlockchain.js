var express = require('express');
var router = express.Router();
const Item = require('../models/item');
const Blockchain = require('../models/blockchain');

/* GET create listing */
router.get('/:uid', function(req, res, next) {
    console.log('~get attachBlockchain');
    
    let id = req.params.uid;
    console.log(id);

    // get all accessories which are not attached to thisCube already
    Item.findOne({ _id: id }).populate('blockchains')
        .then((thisItem) => {
            console.log(thisItem);

            // create array which has the ids of the attached accessories
            let idArr = thisItem.blockchains.map(a => {return a._id;});

            console.log('idArr', idArr);

            Blockchain.find()
                .then((foundBlockchains) => {
                    //get all accessories, then filter out any which were already attached
                    let dropdownBlockchains = foundBlockchains.filter(acc => !idArr.includes(acc._id));

                    console.log('all blockchains', foundBlockchains);

                    console.log('blockchains to add to dropdown', dropdownBlockchains);
                    res.render('attachBlockchain', { title: 'Attach Blockchain Page', item: thisItem, dropdownBlockchains: dropdownBlockchains, loggedInUser: req.user});
                });
        });
});

router.post('/:uid', function(req, res, next) {
    let selAccId = req.body.blockchain;
    let itemId = req.params.uid;

    Item.findOneAndUpdate(
        { _id: itemId },
        { $push: {"blockchains": selAccId}},
        { upsert: true },
        function(err) { if (err) console.log(err);}
    );
    Blockchain.findOneAndUpdate(
        { _id: selAccId },
        { $push: {"items": itemId}},
        { upsert: true },
        function(err) { if (err) console.log(err);
        });

        res.redirect(`/details/${itemId}`);
});

module.exports = router;