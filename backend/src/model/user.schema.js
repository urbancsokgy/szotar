const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },    
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required : true
    },
    avatar:  
    {
        type : String,
        default: "default_avatar-webp"
    
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
}, {
    timestamps: true
},
{ versionKey: false});

// automatically adds { password: String }
UserSchema.plugin(require('mongoose-bcrypt'));

const User = mongoose.model('User', UserSchema, 'users');

// ----------------------
// User.createCollection().then(function(collection) {
//     collection.name='users'
//     console.log('Collection is created!');
//     console.log('Collection name!', collection.name);
//   });
// ---------------------
module.exports = User;