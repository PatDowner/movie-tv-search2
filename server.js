const express = require('express')
const { join } = require('path')
const app = express()

// static middleware for Heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, 'client', 'build')))
}

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// add routes folder
app.use(require('./routes'))

// for Heroku, catch all route
if (process.env.NODE_ENV === 'production') {
  app.get('/*', (req, res) => {
    res.sendFile(join(__dirname, 'client', 'build', 'index.html'))
  })
}

// bring in db connection
require('./db')
  // use 3001 instead of 3000 so it doesn't interfere with React
  .then(() => app.listen(process.env.PORT || 3001))
  .catch(err => console.log(err))
