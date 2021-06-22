const { model, Schema } = require('mongoose')

const Media = new Schema({
  title: String,
  year: String,
  imdbID: String,
  type: String,
  poster: String
})

module.exports = model('Media', Media)
