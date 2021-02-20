const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blockchainSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

const Blockchain = mongoose.model('Blockchain', blockchainSchema);

module.exports = Blockchain;