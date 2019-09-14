import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class BlogExpandComments extends React.Component {
  render () {
    let { slug } = this.props
    return (
      <div className='pt-1 pb-5'>
        <div className='lead blog_comments_head'>Comments</div>
        <hr className='py-1' />
        <div className='monaco_font ac_re'>No comments to display</div>
      </div>
    )
  }
}
export default BlogExpandComments
