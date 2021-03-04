var express = require('express');
var router = express.Router();
const Item = require('../models/item');

/* GET index listing. */
router.get('/:uid', function(req, res, next) {
    let id = req.params.uid;
    console.log(id);

    Item.findOne({_id: id})//.populate('accessories')
    .then((thisItem) => {

        res.render('editItemPage', { title: 'Edit Item Page', item: thisItem, loggedInUser: req.user});
    });
});

router.post('/:uid', function(req, res, next) {
    let id = req.params.uid;
    console.log(id);

    Item.updateOne(
        { _id: id },
        {
            "name": req.body.name,
            "description": req.body.description,
            "imageUrl": req.body.imageUrl,
            "category": req.body.category
        },
        (err) => console.log(err)
    );
    res.redirect('/');
})
module.exports = router;