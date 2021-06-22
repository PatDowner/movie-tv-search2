const router = require('express').Router()
const axios = require('axios')
const { Media } = require('../models')

router.get('/omdb/:search', (req, res) => {
  axios.get(`http://www.omdbapi.com/?apikey=trilogy&s=${req.params.search}`)
    // not using this b/c the omdb data is capitalized keys not lowercase
    // .then(({ data }) => {
    //   res.json(data)
    // })
    // instead, map over the Search terms to fix the keys
    .then(({ data }) => data.Search.map(media => ({
      title: media.Title,
      year: media.Year,
      imdbID: media.imdbID,
      type: media.Type,
      poster: media.Poster
    })))
    // this filters out anything already in our database from API search results
    .then(apiMedia => Media.find()
      // data = data from the API, dbData = data from our database and will prevent us from seeing duplicates
      .then(media => apiMedia.filter(data =>
        media.every(dbData => dbData.imdbID !== data.imdbID))))
    .then(media => res.json(media))
    .catch(err => console.log(err))
})

module.exports = router
