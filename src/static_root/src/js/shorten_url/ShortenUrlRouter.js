import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ShortenUrlHomeView from './ShortenUrlHomeView'
import ShortenUrlRedirect from './ShortenUrlRedirect'

import Error404 from '../Error404'

class ShortenUrlRouter extends React.Component {
  render () {
    const supportsHistory = 'pushState' in window.history
    return (
      <div>
        <BrowserRouter forceRefreah={!supportsHistory}>
          <Switch>
            <Route exact path='/s/:slug' component={ShortenUrlRedirect} />
            <Route exact path='/s/' component={ShortenUrlHomeView} />
            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
export default ShortenUrlRouter
