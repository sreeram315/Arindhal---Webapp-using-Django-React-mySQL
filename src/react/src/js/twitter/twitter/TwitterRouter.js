import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import TwitterHomeView from './TwitterHomeView'
import Error404 from '../Error404'

class TwitterRouter extends React.Component {
  render () {
    const supportsHistory = 'pushState' in window.history
    return (
      <div>
        <BrowserRouter forceRefreah={!supportsHistory}>
          <Switch>
            <Route exact path='/twitter/' component={TwitterHomeView} />
            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
export default TwitterRouter
