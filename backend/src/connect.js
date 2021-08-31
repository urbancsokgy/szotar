const mongoose = require('mongoose')
require('dotenv').config()

const connectionString =
`mongodb+srv://${process.env.DB_USER_REMOTE}:${process.env.DB_PASSWORD_REMOTE}@cluster0.jzldu.mongodb.net/szotarDB?retryWrites=true&w=majority`
 // `mongodb://localhost:27017/szotarDB?retryWrites=true&w=majority`

const options = {
  useNewUrlParser: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

exports.connect = mongoose.connect(connectionString, options)
  .then(() => console.log('MongoDB connection has been established successfully.'))
  .catch(err => {
    console.error(err)    
    process.exit(-1);
  });

