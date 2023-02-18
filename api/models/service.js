const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    category: {
        type: String,// required: true
    },
    subCategory: {
        type: String,// required: true
    },
    serviceDescription: {
        type: String,// required: true
    },
    labourCharge: {
        type: Number,// required: true
    },
    serviceTime: {
        type: Number,// required: true
    },
    contractor_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contractor'
    },
    customer_ids:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        }
    ],
    reviews: [String],
    stars: [ Number]

}, {
  timestamps: true
})

module.exports = mongoose.model('Service', serviceSchema);
