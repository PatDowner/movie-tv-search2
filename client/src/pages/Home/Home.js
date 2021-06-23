import React, { useState } from 'react'

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
    </>
  )
}

export default Home
