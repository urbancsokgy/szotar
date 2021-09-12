const mongoose = require('mongoose')
const User = require ('../model/user.schema')

const CollectionSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true       
    },
    name: {
        type: String,
        required: true,        
    },
    englishName: {
        type: String,
        required: true,
        default: 'Nincs angol megfelelő társítva.'
        
    },image_name: {
        type: String,
        required: true,        
    },
},
    {
        timestamps: true
    })

const Collection = mongoose.model('Collection', CollectionSchema, 'collections');
// ----------------------
Collection.createCollection().then(function(collection) {
    collection.name='collections'
    console.log('Collection is created!');
    console.log('Collection name!', collection.name);
  });
//---------------------
module.exports = Collection;
