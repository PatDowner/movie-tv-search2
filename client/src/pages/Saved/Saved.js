import React, { useState, useEffect } from 'react'
import API from '../../utils/API'

const Saved = () => {
  const [savedState, setSavedState] = useState({
    saved: []
  })

  // have function receive the id of the item deleting
  savedState.handleDeleteSaved = id => {
    // delete from database
    API.deleteMedia(id)
      // then, clean up the front end to reflect that
      .then(() => {
        // filter out the item whose id was passed to this function from the saved array in savedState
        let saved = savedState.saved.filter(media => media._id !== id)
        // hand the filtered saved back to savedState
        setSavedState({ ...savedState, saved })
      })
  }

  // get something to happen immediately on the page
  useEffect(() => {
    // run method from API folder
    API.getSavedMedia()
      // returns data of the movies we have saved
      .then(({ data }) => {
        console.log(data)
        // pass the data from the API to the saved array on savedState
        setSavedState({ ...savedState, saved: data })
      })
  }, [])

  return (
    <>
      <h1>Your saved Movies/TV</h1>
      {
        savedState.saved.length > 0
          ? (
            savedState.saved.map(media => (
              // add key prop bit to get rid of that unique key warning you get
              <div key={media.imdbID}>
                <img src={media.poster} alt={media.title} />
                <h3>{media.title}</h3>
                <h4>Type: {media.type}</h4>
                <h4>Year: {media.year}</h4>
                <h5>imdbID: {media.imdbID}</h5>
                <button onClick={() => savedState.handleDeleteSaved(media._id)}>Delete</button>
              </div>
            ))
          )
          : null
      }
    </>
  )
}

export default Saved
