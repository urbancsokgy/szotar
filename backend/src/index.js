const express = require('express')
const app = express()
bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = require('./connect')
require('dotenv').config()

const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.use(express.static('public'));
app.get('/', (req, res) => {res.send('Hello World!')})
app.use('/api/users',require('./router/user.route'))
app.use('/api/addresses',require('./router/address.route'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app