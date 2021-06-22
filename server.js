const express = require('express')

const app = express()

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// add routes folder
app.use(require('./routes'))

// bring in db connection
require('./db')
  // use 3001 instead of 3000 so it doesn't interfere with React
  .then(() => app.listen(process.env.PORT || 3001))
  .catch(err => console.log(err))
