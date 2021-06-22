const router = require('express').Router()
const { Media } = require('../models')
// get all media
router.get('/media', (req, res) => {
  Media.find()
    .then(media => res.json(media))
    .catch(err => console.log(err))
})

// post all media
router.post('/media', (req, res) => {
  Media.create(req.body)
    .then(media => res.json(media))
    .catch(err => console.log(err))
})

// put media
router.put('/media/:id', (req, res) => {
  Media.findByIdAndUpdate(req.params.id, req.body)
    .then(media => res.json(media))
    .catch(err => console.log(err))
})

// delete media
router.delete('/media/:id', (req, res) => {
  // normal delete method
  // Media.findByIdAndDelete(req.params.id)
  // using this method to delete so we can get back info about the item deleted
  Media.findById(req.params.id)
    .then(media => media.remove())
    .then(media => res.json(media))
    .catch(err => console.log(err))
})

module.exports = router
