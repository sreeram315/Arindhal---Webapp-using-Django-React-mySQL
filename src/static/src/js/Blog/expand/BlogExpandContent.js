import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class BlogExpandContent extends React.Component {
  render () {
    let { content } = this.props
    return (
      <div className='lead blog_content_p pb-5' dangerouslySetInnerHTML={{ __html: content }} />
    )
  }
}
export default BlogExpandContent
