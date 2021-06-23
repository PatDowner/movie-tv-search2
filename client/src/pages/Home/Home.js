import React, { useState } from 'react'
import API from '../../utils/API'
// instead of importing the whole API folder ^, pull off just the part we're using "getMedia"
// actually this \/ didn't work, caused error
// import { getMedia } from '../../utils/API'

const Home = () => {
  const [mediaState, setMediaState] = useState({
    // track search typing into the input. Needs to have the same name as the name attribute on our input
    search: '',
    // array to hold all the media data that comes back
    media: []
  })

  mediaState.handleInputChange = event => {
    setMediaState({ ...mediaState, [event.target.name]: event.target.value })
  }

  // this connects front end and back end.
  mediaState.handleSearchOMDB = event => {
    event.preventDefault()
    API.getMedia(mediaState.search)
      .then(({ data }) => {
        // what we do with the data returned by the search
        console.log(data)
        // spread mediaState, set media as the data we just received, then clear out the search field
        setMediaState({ ...mediaState, media: data, search: '' })
      })
      .catch(err => console.log(err))
  }

  // get movie by its imdbID
  mediaState.handleSavedMedia = imdbID => {
    // make a saveMedia object where we look in the media array on mediaState and filter through each item x where x.imdbID is equal to the imdbID passed to this function ^. This will create a media array with one item in it, so let's grab it with index item 0.
    const saveMedia = mediaState.media.filter(x => x.imdbID === imdbID)[0]
    console.log(saveMedia)
    // execute the API saveMedia command and pass it the saveMedia we just created
    API.saveMedia(saveMedia)
      .then(() => {
        // remove the saveMedia from the search results, filter mediaState's media array for all of the ones that do NOT match the imdbID of what we saved
        const media = mediaState.media.filter(x => x.imdbID !== imdbID)
        // update mediaState with the new filtered version of media from previous line
        setMediaState({ ...mediaState, media })
      })
  }

  return (
    <>
      <h1>Search for Movies & TV Shows</h1>
      <form>
        <p>
          <label htmlFor='search'>Search</label>
          <input
            type='text'
            name='search'
            value={mediaState.search}
            onChange={mediaState.handleInputChange}
          />
        </p>
        <p>
          <button onClick={mediaState.handleSearchOMDB}>Search OMDB</button>
        </p>
      </form>
      {
        // ternary check: if media length is greater than zero do thing in parens, otherwise do nothing (null)
        mediaState.media.length > 0
          ? (
            // for each piece of media, create the div
            mediaState.media.map(media => (
              // add key prop bit to get rid of that unique key warning you get
              <div key={media.imdbID}>
                <img src={media.poster} alt={media.title} />
                <h3>{media.title}</h3>
                <h4>Type: {media.type}</h4>
                <h4>Year: {media.year}</h4>
                <h5>imdbID: {media.imdbID}</h5>
                <button onClick={() => mediaState.handleSavedMedia(media.imdbID)}>Save</button>
              </div>
            ))
          )
          : null
      }
    </>
  )
}

export default Home
