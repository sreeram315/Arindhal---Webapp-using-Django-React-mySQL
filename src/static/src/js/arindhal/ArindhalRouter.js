import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ArindhalHome from './ArindhalHome'
import Error404 from '../Error404'

class ArindhalRouter extends React.Component {
  render () {
    const supportsHistory = 'pushState' in window.history
    return (
      <div>
        <BrowserRouter forceRefreah={!supportsHistory}>
          <Switch>
            <Route exact path='/arindhal/' component={ArindhalHome} />
            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
export default ArindhalRouter
