var express = require('express');
var router = express.Router();
const Item = require("../models/item");
const User = require('../models/user');
const { check, validationResult } = require('express-validator');


/* GET create listing. */
router.get('/', function(req, res, next) {
    res.render('create', { title: 'Create Item Page', loggedInUser: req.user });
});

router.post('/', function(req, res, next) {
    console.log('create post');
    console.log('~req', req.user);
    
    let data = req.body;

    let item = new Item({
        name: data.name, 
        description: data.description, 
        imageUrl: data.imageUrl, 
        category: data.category,
        blockchains: [],
        creator: req.user._id
    });

    console.log(item);

    let validationErrors = item.validateSync();
    //console.log(validationErrors);
    //console.log(Object.values(validationErrors.errors));


    if (validationErrors === undefined) {
        //save the item, no errors, render screen without errors
        item.save()
        .then((response) => {
            User.findOneAndUpdate(
                {_id: req.user._id}, 
                { $push: {"items": response._id}}, 
                { upsert: true }, 
                function(err) {if (err) console.log(err);}
            );
            res.redirect('/');
        });
        
    } else {
        //not valid, render screen with error messages
        let values = Object.values(validationErrors.errors);
        console.log('~Validation Errors:');
        values.forEach(err => {
            console.log(err.properties.path);
            console.log(err.properties.message);
            console.log('');
        });

        let displayErrors = values.map((err) => err.properties.path.charAt(0).toUpperCase() + err.properties.path.slice(1) + " " + err.properties.message);
        res.render('create', {errors: displayErrors});
    }

});

module.exports = router;