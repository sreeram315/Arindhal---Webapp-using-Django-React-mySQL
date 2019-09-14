import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import HomeView from './home_page/HomeView'
// import TesterView2 from './tester_page/TesterView2'
import CamperRouter from './camper/CamperRouter'
import Tester4 from './tester_page/Tester4'
import StudentsMPRouter from './StudentsMP/StudentsMPRouter'
import RegisterView from './camper/RegisterView'
import TwitterRouter from './twitter/TwitterRouter'
import ShortenUrlRouter from './shorten_url/ShortenUrlRouter'
import ArindhalRouter from './arindhal/ArindhalRouter'
import BlogRouter from './Blog/BlogRouter'
import WeatherMonitor from './weather_monitor/WeatherMonitor'
import Error404 from './Error404'

class RouterMain extends React.Component {
  render () {
    const supportsHistory = 'pushState' in window.history
    return (
      <div>
        <BrowserRouter forceRefreah={!supportsHistory}>
          <Switch>
            <Route exact path='/' component={HomeView} />
            <Route path='/tester/' component={Tester4} />
            <Route path='/smp/' component={StudentsMPRouter} />
            <Route path='/user/' component={CamperRouter} />
            <Route path='/twitter/' component={TwitterRouter} />
            <Route path='/s/' component={ShortenUrlRouter} />
            <Route path='/arindhal/' component={ArindhalRouter} />
            <Route path='/blog/' component={BlogRouter} />
            <Route path='/twm/' component={WeatherMonitor} />
            <Route component={Error404} />
          </Switch>
        </BrowserRouter>

      </div>
    )
  }
}
export default RouterMain
