const mongoose = require('mongoose')

// delete mongoose.connection.models['Wordclass'];
const WordSchema = mongoose.Schema({
    hungarian: {
        type: String,
        required: true,        
    },
    english: {
        type: String,
        required: true,        
    },
    example: {
        type: String,
        default: "Example missing."
    },
    example_hungarian: {
        type: String,
        default: "Nincs példamondat."
    },

    image_name: {
        type: String,
        required: true,        
    },
    wordclass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wordclass',
        required : true
    },
    collection_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
        required : true
    },
},
    {
        timestamps: true
    })

const Word = mongoose.model('Word', WordSchema, 'words');
// ----------------------
// Word.createCollection().then(function(collection) {
//     collection.name='words'
//     console.log('Collection is created!');
//     console.log('Collection name!', collection.name);
//   });
//---------------------
module.exports = Word;
