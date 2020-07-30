const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    username: {
        type: String,
        require: true,
        trim: true
    },
    balance: {
        type: Number,
        default: 0
    }
});

CustomerSchema.plugin(timestamp)
const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;