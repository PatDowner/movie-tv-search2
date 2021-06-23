import React from 'react'
import Home from './pages/Home'
import Saved from './pages/Saved'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/saved'>Saved</Link>
        </nav>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/saved' component={Saved} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
