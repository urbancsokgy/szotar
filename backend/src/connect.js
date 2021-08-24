const mongoose = require('mongoose')

const connectionString =
  `mongodb://localhost:27017/szotarDB?retryWrites=true&w=majority`
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
