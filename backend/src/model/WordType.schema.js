const mongoose = require('mongoose')

delete mongoose.connection.models['Wordclass'];
const WordClassSchema = mongoose.Schema({
    hungarianName: {
        type: String,
        required: true,        
    },
    englishName: {
        type: String,
        required: true,
        default: 'Nincs angol megfelelő társítva.'
        
    }
},
    {
        timestamps: true
    })

const Wordclass = mongoose.model('Wordclass', WordClassSchema, 'wordclasses');
// ----------------------
Wordclass.createCollection().then(function(collection) {
    collection.name='wordclasses'
    console.log('Collection is created!');
    console.log('Collection name!', collection.name);
  });
//---------------------
module.exports = Wordclass;
