import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import BlogHome from './BlogHome'
import NewBlog from './NewBlog'
import BlogExpand from './BlogExpand'
import Error404 from '../Error404'

class BlogRouter extends React.Component {
  render () {
    const supportsHistory = 'pushState' in window.history
    return (
      <div>
        <BrowserRouter forceRefreah={!supportsHistory}>
          <Switch>
            <Route exact path='/blog/' component={BlogHome} />
            <Route exact path='/blog/new-blog/' component={NewBlog} />

            <Route path='/blog/:slug' component={BlogExpand} />
            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
export default BlogRouter
