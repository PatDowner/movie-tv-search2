// build API
import axios from 'axios'

const API = {
  // custom wrapper methods for each of the things we're trying to do that will make our front end code more readable

  // GET
  // OMDB data
  getMedia: search => axios.get(`/api/omdb/${search}`),
  // our local saved data
  getSavedMedia: () => axios.get('/api/media'),

  // POST
  saveMedia: media => axios.post('/api/media', media),

  // DELETE
  deleteMedia: id => axios.delete(`/api/media/${id}`)
}

export default API
