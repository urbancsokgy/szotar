const mongoose = require('mongoose')

const AddressSchema = mongoose.Schema({
    country: {
        type: String,
        required: true,
        default: 'Magyarország'
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    building: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    })

const Address = mongoose.model('Address', AddressSchema, 'adresses');
// ----------------------
// Address.createCollection().then(function(collection) {
//     collection.name='addresses'
//     console.log('Collection is created!');
//     console.log('Collection name!', collection.name);
//   });
//---------------------
module.exports = Address;
