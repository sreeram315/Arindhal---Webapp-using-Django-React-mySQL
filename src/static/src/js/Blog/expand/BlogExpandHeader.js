import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import './css.css'

class BlogExpandHeader extends React.Component {


  moreByAuthor = () => {
    let author = this.props.author.username
    window.location.href = `/blog/?author=${author}`
  }


  render () {
    let { headline, author, preview_points, date_created, date_updated, time_created, time_updated, genre } = this.props
    return (
      <div>
        <div className='headname_re headname_blog_expand'>{headline}</div>
        <div className='container_fluid disp_inline'>
          <Row>
            <Col md={{ size: 6 }} sm={{ size: 12 }}>
              <div className='al_re pt-2'>
                <span className='blog_By'>By:</span> <span className='blog_author_name'><a className='no_dec no_color' href={`/user/profile/${author.slug}`}>{author.name}</a><small className='small_font color_grey hover_pointer' onClick={this.moreByAuthor}> (more by the author)</small></span>
              </div>
            </Col>
            <Col md={{ size: 6 }} sm={{ size: 12 }}>
              <div className='ar_re'>
                <span className='blog_time_created'> {date_created} {time_created}</span><br />
                <span className='blog_time_left'>Last Updated:</span>
                <span className='blog_time_right'> {date_updated}</span>
              </div>
            </Col>
          </Row>
          <div className='lead pt-2'>
            {preview_points.length > 0 ? <ul>
              {preview_points.split('\n').splice(0, 3).map((p, index) => {
                return (<li>{p}</li>)
              })}
            </ul> : '' }
          </div>

          <div className='ar_re'><span className='genre_key'>Genre:&ensp;</span><span className='genre_value'>{genre}</span></div>

          <hr className='pt-1' />
        </div>

      </div>
    )
  }
}
export default BlogExpandHeader
