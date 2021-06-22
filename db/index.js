module.exports = require('mongoose').connect('mongodb://localhost/media_db', {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true
})
