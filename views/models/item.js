const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[\w\d][\w\d\s]*[\w\d]$/.test(v);       //starts with any number or english letter; includes only numbers, letters, and spaces; and ends with any number or english letter
            },
            message: `must be only letters/numbers/spaces and not start or end with a space!`
        },
        minlength: [3, 'must be at least 3 characters!'],
        required: [true, 'must have a name!']
    },
    description: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[\w\d][\w\d\s]*[\w\d]$/.test(v);       //starts with any number or english letter; includes only numbers, letters, and spaces; and ends with any number or english letter
            },
            message: `must be only letters/numbers/spaces and not start or end with a space!`
        },
        minlength: [10, 'must be at least 10 characters!'],
        required: [true, 'must have a description!']
    },
    imageUrl: {
        type: String,
        validate: {
            validator: function(v) {
                return /^https?:\/\/\X*/.test(v);       //starts with https://
            },
            message: `must start with "http(s)://"!`
        },
        required: [true, 'must have an image path!']
    },
    category: {
        type: String,
        required: true
    },
    blockchains: [{ type: Schema.Types.ObjectId, ref: 'Blockchain'}],
    creator: { type: Schema.Types.ObjectId, ref: 'User'}
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;